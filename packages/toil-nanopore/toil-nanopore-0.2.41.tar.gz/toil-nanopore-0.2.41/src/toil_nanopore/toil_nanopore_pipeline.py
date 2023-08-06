#!/usr/bin/env python2.7
from __future__ import print_function

import sys
import argparse
import os
import textwrap
import yaml
import uuid
from urlparse import urlparse

from bd2k.util.humanize import human2bytes

from toil.common import Toil
from toil.job import Job
from toil_lib import UserError, require
from toil_lib.files import generate_file
from toil_lib.programs import docker_call

from margin.toil.localFileManager import LocalFile, urlDownload, urlDownlodJobFunction, importToJobstore
from margin.toil.hmm import Hmm
from margin.toil.alignment import AlignmentStruct, AlignmentFormat, shardAlignmentByRegionJobFunction
from margin.toil.stats import collectAlignmentStatsJobFunction

from sample import Sample
from marginAlignToil import bwaAlignJobFunction, chainSamFileJobFunction
from marginCallerToil import marginCallerJobFunction


def getFastqFromBam(job, bam_sample, samtools_image="quay.io/ucsc_cgl/samtools"):
    # n.b. this is NOT a jobFunctionWrappingJob, it just takes the parent job as 
    # an argument to have access to the job store
    # download the BAM to the local directory, use a uid to aviod conflicts
    uid           = uuid.uuid4().hex
    work_dir      = job.fileStore.getLocalTempDir()
    local_bam     = LocalFile(workdir=work_dir, filename="bam_{}.bam".format(uid))
    fastq_reads   = LocalFile(workdir=work_dir, filename="fastq_reads{}.fq".format(uid))

    urlDownload(parent_job=job, source_url=bam_sample.URL, destination_file=local_bam)

    require(not os.path.exists(fastq_reads.fullpathGetter()), "[getFastqFromBam]fastq file already exists")

    # run samtools to get the reads from the BAM
    # TODO use DOCKER_DIR and clean this up. idea: make globls.py or something
    samtools_parameters = ["fastq", "/data/{}".format(local_bam.filenameGetter())]
    with open(fastq_reads.fullpathGetter(), 'w') as fH:
        docker_call(job=job, tool=samtools_image, parameters=samtools_parameters, work_dir=work_dir, outfile=fH)

    require(os.path.exists(fastq_reads.fullpathGetter()), "[getFastqFromBam]didn't generate reads")

    # upload fastq to fileStore
    return job.fileStore.writeGlobalFile(fastq_reads.fullpathGetter())


def marginAlignRootJobFunction(job, config, sample):
    def cull_sample_files():
        if sample.file_type == "fq":
            config["sample_FileStoreID"] = job.addChildJobFn(urlDownlodJobFunction, sample.URL, disk=sample.file_size).rv()
            return None
        elif sample.file_type == "bam":
            bwa_alignment_fid = job.addChildJobFn(urlDownlodJobFunction, sample.URL, disk=sample.file_size).rv()
            config["sample_FileStoreID"] = job.addChildJobFn(getFastqFromBam, sample, disk=(2 * sample.file_size)).rv()
            return bwa_alignment_fid
        else:
            raise RuntimeError("[marginAlignRootJobFunction]Unsupported sample file type %s" % sample.file_type)

    # download/import the reference
    config["reference_FileStoreID"] = job.addChildJobFn(urlDownlodJobFunction, config["ref"], disk=config["ref_size"]).rv()

    # cull the sample, which can be a fastq or a BAM this will be None if we are doing BWA alignment
    alignment_fid = cull_sample_files()

    # checks if we're doing alignments or variant calling
    if config["realign"] or config["caller"]:
        # download the input model, if given. Fail if no model is given and we're performing HMM realignment without
        # doing EM
        if config["hmm_file"] is not None:
            config["input_hmm_FileStoreID"] = job.addChildJobFn(urlDownlodJobFunction, config["hmm_file"], disk="10M").rv()
        else:
            if config["realign"]:
                require(config["EM"], "[marginAlignRootJobFunction]Need to specify an input model or "
                                      "set EM to True to perform HMM realignment")
            config["input_hmm_FileStoreID"] = None

        # initialize key in config for trained model if we're performing EM
        if config["EM"]:
            config["normalized_trained_model_FileStoreID"] = None

    config["sample_label"]    = sample.label
    config["reference_label"] = config["ref"]

    job.fileStore.logToMaster("[run_tool]Processing sample:{}".format(config["sample_label"]))
    job.fileStore.logToMaster("[run_tool]Chaining   :{}".format(config["chain"]))
    job.fileStore.logToMaster("[run_tool]Realign    :{}".format(config["realign"]))
    job.fileStore.logToMaster("[run_tool]Caller     :{}".format(config["caller"]))
    job.fileStore.logToMaster("[run_tool]Stats      :{}".format(config["stats"]))

    job.addFollowOnJobFn(marginAlignJobFunction, config, alignment_fid)


def marginAlignJobFunction(job, config, input_alignment_fid):
    if config["realign"] or config["chain"]:  # perform EM/Alignment/chaining
        if input_alignment_fid is None:
            job.addChildJobFn(bwaAlignJobFunction, config)  # this passes on to the chainSam...
        else:
            aln_struct = AlignmentStruct(input_alignment_fid, AlignmentFormat.BAM)
            job.addChildJobFn(chainSamFileJobFunction, config, aln_struct, memory=(6 * input_alignment_fid.size))

    # TODO work out the logic here, we want to be able to get stats on an input alignment, but we don't want to
    # just get stats on the input if we're realigning...
    if config["caller"]:
        job.addFollowOnJobFn(callVariantsAndGetStatsJobFunction, config, input_alignment_fid)
        return
    if config["stats"]:
        job.addFollowOnJobFn(collectAlignmentStatsJobFunction, config, input_alignment_fid, config["sample_label"])


def callVariantsAndGetStatsJobFunction(job, config, input_alignment_fid):
    # handle downloading the error model, use the EM trained model, if we did EM
    if config["EM"] is not None and config["realign"] is not None:
        job.fileStore.logToMaster("[callVariantsAndGetStatsJobFunction]Using EM trained error model")
        config["error_model_FileStoreID"] = job.addChildJobFn(urlDownlodJobFunction,
                                                              Hmm.modelFilename(global_config=config, get_url=True),
                                                              disk="10M").rv()
    else:  # use the user provided one
        require(config["error_model"],
                "[callVariantsAndGetStatsJobFunction]Need to provide a error model if not performing EM")
        job.fileStore.logToMaster("[callVariantsAndGetStatsJobFunction]Using user-supplied error model "
                                  "from {}".format(config["error_model"]))
        config["error_model_FileStoreID"] = job.addChildJobFn(urlDownlodJobFunction,
                                                              config["error_model"],
                                                              disk="10M").rv()

    # if we're just variant calling a supplied BAM go here with the downloaded model
    if config["chain"] is None and config["realign"] is None:
        margin_label = "noMargin" if config["no_margin"] else "margin"
        job.fileStore.logToMaster("[callVariantsAndGetStatsJobFunction]Calling variants with model {model} "
                                  "no margin is {margin}".format(model=config["error_model"], margin=config["no_margin"]))
        sharded_alignments = job.addChildJobFn(shardAlignmentByRegionJobFunction,
                                               config["reference_FileStoreID"],
                                               input_alignment_fid,
                                               config["split_chromosome_this_length"]).rv()
        job.addFollowOnJobFn(marginCallerJobFunction, config, input_alignment_fid, sharded_alignments,
                             margin_label, disk=(3 * input_alignment_fid.size))
        return

    if config["chain"]:  # variant call the chained alignment
        chained_config              = dict(**config)  # copy constructor
        chained_config["no_margin"] = True
        chained_config["stats"]     = True
        chained_aln_url             = config["output_dir"] + "{}_chained.bam".format(config["sample_label"])
        chained_alignment_fid       = importToJobstore(job, chained_aln_url)
        sharded_chained_alignments  = job.addChildJobFn(shardAlignmentByRegionJobFunction,
                                                        config["reference_FileStoreID"],
                                                        chained_alignment_fid,
                                                        config["split_chromosome_this_length"]).rv()
        job.addFollowOnJobFn(marginCallerJobFunction, chained_config, chained_alignment_fid,
                             sharded_chained_alignments, "chained")
    else:  # variant call the input alignment
        sharded_alignments = job.addChildJobFn(shardAlignmentByRegionJobFunction,
                                               config["reference_FileStoreID"],
                                               input_alignment_fid,
                                               config["split_chromosome_this_length"]).rv()
        job.addFollowOnJobFn(marginCallerJobFunction, chained_config, input_alignment_fid, sharded_alignments, "")

    if config["realign"]:
        realigned_alignment_url      = config["output_dir"] + "{}_realigned.bam".format(config["sample_label"])
        realigned_alignment_fid      = importToJobstore(job, realigned_alignment_url)
        sharded_realigned_alignments = job.addChildJobFn(shardAlignmentByRegionJobFunction,
                                                         config["reference_FileStoreID"],
                                                         realigned_alignment_fid,
                                                         config["split_chromosome_this_length"]).rv()
        em_label         = "em" if config["EM"] else ""
        realign_em_label = em_label + "Realign" if config["chain"] else em_label + "RealignNoChain"
        job.addFollowOnJobFn(marginCallerJobFunction, config, realigned_alignment_fid, sharded_realigned_alignments,
                             realign_em_label)

        # handle the same alignment without marginalization
        no_margin_config              = dict(**config)
        no_margin_config["no_margin"] = True
        no_margin_config["stats"]     = False  # don't need to redo stats

        realign_noMargin_label = em_label + "RealignNoMargin" if config["chain"] else em_label + "RealignNoMarginNoChain"
        job.addFollowOnJobFn(marginCallerJobFunction, no_margin_config, realigned_alignment_fid,
                             sharded_realigned_alignments, realign_noMargin_label)


def print_help():
    """run toil-nanopore generate and look at the config file for help.
    """
    return print_help.__doc__


def generateConfig():
    return textwrap.dedent("""
        # UCSC Nanopore Pipeline configuration file
        # This configuration file is formatted in YAML. Simply write the value (at least one space) after the colon.
        # Edit the values in this configuration file and then rerun the pipeline: "toil-nanopore run"
        #
        # URLs can take the form: http://, ftp://, file://, s3://, gnos://
        # Local inputs follow the URL convention: file:///full/path/to/input
        # S3 URLs follow the convention: s3://bucket/directory/file.txt
        #
        # some options have been filled in with defaults and examples

        ## Universal Options/Inputs ##
        # Required: Which subprograms to run, typically you run all 4, but you can run them piecemeal if you like
        # in that case the provided inputs will be checked at run time
        chain:   True
        realign: True
        caller:  True
        stats:   True
        EM:      True

        # Required: output directory for results to land in
        # Warning: S3 buckets must exist prior to upload or it will fail.
        output_dir: s3://arand-sandbox/

        # Required:
        #   ref:      URL for reference FASTA
        #   ref_size: the approx size of the input FASTA (used for resource allocation)
        ref:      s3://arand-sandbox/references.fa
        ref_size: 10M


        ##---------------------------##
        ## batching/sharding options ##
        ##---------------------------##
        # WARNING: only change the values below if you know what you're doing
        #   ---# These options change how the input alignment is broken up #---
        #   split_chromosome_this_length:  used by: marginCaller, devides the alignment into pieces that align to
        #                                  regions of the chromosome that are this long, the smaller this length the
        #                                  faster variant calling will be, but there will be more I/O to get there
        #   split_alignments_to_this_many: used by: marginAlign, shards the input alignment into
        #                                  smaller alignments that have this many AlignedSegments in them
        #   stats_alignment_batch_size:    used by: marginStats. same as `split_alignments_to_this_many` but
        #                                  for marginStats
        #
        #   --# These options change how the alignment jobs are spawned, used by marginAlign and marginCaller #---
        #   max_alignment_length_per_job:    used by: marginAlign and marginCaller, makes a batch of alignments when
        #                                    the total alignment length reaches this number
        #   max_alignments_per_job:          used by marginAlign and marginCaller, same as max_alignment_length_per_job,
        #                                    but for number of AlignedSegments
        #   cut_batch_at_alignment_this_big: makes a new batch then it reaches an AlignedSegment that is >= this length

        split_alignments_to_this_many:   1000
        split_chromosome_this_length:    1000000
        stats_alignment_batch_size:      100
        max_alignment_length_per_job:    700000
        max_alignments_per_job:          300
        cut_batch_at_alignment_this_big: 20000



        ##---------------------##
        ## MarginAlign Options ##
        ##---------------------##
        # all required options have default values
        gap_gamma:   0.5
        match_gamma: 0.0

        # Optional: Alignment Model, n.b. this is REQUIRED if you do not perform EM
        hmm_file: s3://arand-sandbox/last_hmm_20.txt

        #------------#
        # EM options #
        #------------#

        # Model-related options
        #                    model_type: if no input model is set, make this kind of model
        #                                choices: fiveState, fiveStateAsymmetric, threeState,
        #                                       threeStateAsymmetric
        #   max_sample_alignment_length: randomly sample this amount of bases for EM
        #                 em_iterations: number of full cycles to train on the given sample amount
        #       n.b random start with searching for best model is not *quite* implemented yet

        model_type: fiveState
        max_sample_alignment_length: 50000
        em_iterations: 5
        random_start:  False

        # set_Jukes_Cantor_emissions is of type Float or blank (None)
        set_Jukes_Cantor_emissions:
        # update the band NOT IMPLEMENTED
        update_band:     False
        gc_content:      0.5
        train_emissions: True

        ##----------------------##
        ## MarginCaller Options ##
        ##----------------------##
        # Required: Error model
        #   no_margin: disables marginalization when calling vairants, with/without are performed
        #              by default when all subprograms are run when 'caller' is run alone this
        #              option will be used
        error_model: s3://arand-sandbox/last_hmm_20.txt
        no_margin: False
        variant_threshold: 0.3

        ##---------------------##
        ## MarginStats Options ##
        ##---------------------##
        # all options are required, and have defaults except the output URL
        local_alignment:            False

        # Optional: Debug increasing logging
        debug: True
    """[1:])


def generateManifest():
    return textwrap.dedent("""
        #   Edit this manifest to include information for each sample to be run.
        #
        #   Lines should contain three tab-seperated fields: file_type, URL,
        #   sample_label, and sample file size
        #   file_type options:
        #       fq-gzp gzipped file of read sequences in FASTQ format
        #           fq file of read sequences in FASTQ format
        #          bam alignment file in BAM format (sorted or unsorted)
        #       fa-gzp gzipped file of read sequences in FASTA format
        #           fa file of read sequences in FASTA format
        #       f5-tar tarball of MinION, basecalled, .fast5 files
        #   NOTE: as of 1/3/16 only fq implemented
        #   Eg:
        #   fq-tar  file://path/to/file/reads.tar           some_reads  10G
        #   f5-tar  s3://my-bucket/directory/tarbal..tar    some_tar    10G
        #   bam     file://path/to/giantbam.bam             some_bam_alignment 20G
        #   Place your samples below, one sample per line.
        """[1:])


def parseManifest(path_to_manifest):
    require(os.path.exists(path_to_manifest), "[parseManifest]Didn't find manifest file, looked "
            "{}".format(path_to_manifest))
    allowed_file_types = ["fq", "bam"]
    #allowed_file_types = ["fq-gzp", "fq", "fa-gzp", "fa", "f5-tar", "bam"]

    def parse_line(line):
        # double check input, shouldn't need to though
        require(not line.isspace() and not line.startswith("#"), "[parse_line]Invalid {}".format(line))
        sample = line.strip().split("\t")
        require(len(sample) == 4, "[parse_line]Invalid, len(line) != 4, offending {}".format(line))
        file_type, sample_url, sample_label, sample_filesize = sample
        # check the file_type and the URL
        require(file_type in allowed_file_types, "[parse_line]Unrecognized file type {}".format(file_type))
        require(urlparse(sample_url).scheme and urlparse(sample_url), "Invalid URL passed for {}".format(sample_url))
        return Sample(file_type=file_type, URL=sample_url, label=sample_label, file_size=human2bytes(sample_filesize))

    with open(path_to_manifest, "r") as fH:
        return map(parse_line, [x for x in fH if (not x.isspace() and not x.startswith("#"))])


def main():
    def parse_args():
        parser = argparse.ArgumentParser(description=print_help.__doc__,
                                         formatter_class=argparse.RawTextHelpFormatter)
        subparsers = parser.add_subparsers(dest="command")
        run_parser = subparsers.add_parser("run",
                                           help="runs nanopore pipeline with config on samples in manifest")
        subparsers.add_parser("generate", help="generates config and manifest files for your run, do this first")
        run_parser.add_argument("--config", default="config-toil-nanopore.yaml", type=str,
                                help='Path to the (filled in) config file, generated with "generate".')
        run_parser.add_argument('--manifest', default='manifest-toil-nanopore.tsv', type=str,
                                help='Path to the (filled in) manifest file, generated with "generate". '
                                     '\nDefault value: "%(default)s".')
        Job.Runner.addToilOptions(run_parser)

        return parser.parse_args()

    def exitBadInput(message=None):
        if message is not None:
            print(message, file=sys.stderr)
        sys.exit(1)

    if len(sys.argv) == 1:
        exitBadInput(print_help())

    cwd = os.getcwd()

    args = parse_args()

    if args.command == "generate":
        try:
            config_path = os.path.join(cwd, "config-toil-nanopore.yaml")
            generate_file(config_path, generateConfig)
        except UserError:
            print("[toil-nanopore]NOTICE using existing config file {}".format(config_path))
            pass
        try:
            manifest_path = os.path.join(cwd, "manifest-toil-nanopore.tsv")
            generate_file(manifest_path, generateManifest)
        except UserError:
            print("[toil-nanopore]NOTICE using existing manifest {}".format(manifest_path))

    elif args.command == "run":
        require(os.path.exists(args.config), "{config} not found run generate-config".format(config=args.config))
        # Parse config
        config  = {x.replace('-', '_'): y for x, y in yaml.load(open(args.config).read()).iteritems()}
        samples = parseManifest(args.manifest)
        for sample in samples:
            with Toil(args) as toil:
                if not toil.options.restart:
                    root_job = Job.wrapJobFn(marginAlignRootJobFunction, config, sample)
                    return toil.start(root_job)
                else:
                    toil.restart()


if __name__ == '__main__':
    try:
        main()
    except UserError as e:
        print(e.message, file=sys.stderr)
        sys.exit(1)
