#!/usr/bin/env python2.7
# Copyright 2016 Arjun Arkal Rao
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
from __future__ import absolute_import, print_function
from collections import defaultdict
from protect.common import docker_call, get_files_from_filestore, export_results, untargz, \
    docker_path

import os


def run_transgene(job, snpeffed_file, rna_bam, univ_options, transgene_options, fusion_calls=None):
    """
    This module will run transgene on the input vcf file from the aggregator and produce the
    peptides for MHC prediction

    ARGUMENTS
    1. snpeffed_file: <JSid for snpeffed vcf>
    2. univ_options: Dict of universal arguments used by almost all tools
         univ_options
                +- 'dockerhub': <dockerhub to use>
    3. transgene_options: Dict of parameters specific to transgene
         transgene_options
                +- 'gencode_peptide_fasta': <JSid for the gencode protein fasta>

    RETURN VALUES
    1. output_files: Dict of transgened n-mer peptide fastas
         output_files
                |- 'transgened_tumor_9_mer_snpeffed.faa': <JSid>
                |- 'transgened_tumor_10_mer_snpeffed.faa': <JSid>
                +- 'transgened_tumor_15_mer_snpeffed.faa': <JSid>

    This module corresponds to node 17 on the tree
    """
    job.fileStore.logToMaster('Running transgene on %s' % univ_options['patient'])
    work_dir = os.getcwd()
    rna_bam_key = 'rnaAligned.sortedByCoord.out.bam'  # to reduce next line size
    input_files = {
        'snpeffed_muts.vcf': snpeffed_file,
        'rna.bam': rna_bam[rna_bam_key]['rna_fix_pg_sorted.bam'],
        'rna.bam.bai': rna_bam[rna_bam_key]['rna_fix_pg_sorted.bam.bai'],
        'pepts.fa.tar.gz': transgene_options['gencode_peptide_fasta']}
    input_files = get_files_from_filestore(job, input_files, work_dir, docker=False)
    input_files['pepts.fa'] = untargz(input_files['pepts.fa.tar.gz'], work_dir)
    input_files = {key: docker_path(path) for key, path in input_files.items()}

    parameters = ['--peptides', input_files['pepts.fa'],
                  '--snpeff', input_files['snpeffed_muts.vcf'],
                  '--rna_file', input_files['rna.bam'],
                  '--prefix', 'transgened',
                  '--pep_lens', '9,10,15']

    if fusion_calls:
        fusion_files = {'fusion_calls': fusion_calls,
                        'transcripts.fa.tar.gz': transgene_options['gencode_transcript_fasta'],
                        'annotation.gtf.tar.gz': transgene_options['gencode_annotation_gtf'],
                        'genome.fa.tar.gz': transgene_options['genome_fasta']}

        fusion_files = get_files_from_filestore(job, fusion_files, work_dir, docker=False)
        fusion_files['transcripts.fa'] = untargz(fusion_files['transcripts.fa.tar.gz'], work_dir)
        fusion_files['genome.fa'] = untargz(fusion_files['genome.fa.tar.gz'], work_dir)
        fusion_files['annotation.gtf'] = untargz(fusion_files['annotation.gtf.tar.gz'], work_dir)
        fusion_files = {key: docker_path(path) for key, path in fusion_files.items()}
        parameters += ['--transcripts', fusion_files['transcripts.fa'],
                       '--fusions', fusion_files['fusion_calls'],
                       '--genome', fusion_files['genome.fa'],
                       '--annotation', fusion_files['annotation.gtf']]

    docker_call(tool='transgene:latest',
                tool_parameters=parameters, work_dir=work_dir,
                dockerhub='jpfeil')

    output_files = defaultdict()
    for peplen in ['9', '10', '15']:
        peptfile = '_'.join(['transgened_tumor', peplen, 'mer_snpeffed.faa'])
        mapfile = '_'.join(['transgened_tumor', peplen, 'mer_snpeffed.faa.map'])
        output_files[peptfile] = job.fileStore.writeGlobalFile(os.path.join(work_dir, peptfile))
        output_files[mapfile] = job.fileStore.writeGlobalFile(os.path.join(work_dir, mapfile))
        export_results(job, output_files[peptfile], peptfile, univ_options, subfolder='peptides')
        export_results(job, output_files[mapfile], mapfile, univ_options, subfolder='peptides')
    os.rename('transgened_transgened.vcf', 'mutations.vcf')
    export_results(job, job.fileStore.writeGlobalFile('mutations.vcf'), 'mutations.vcf',
                   univ_options, subfolder='mutations/transgened')
    return output_files
