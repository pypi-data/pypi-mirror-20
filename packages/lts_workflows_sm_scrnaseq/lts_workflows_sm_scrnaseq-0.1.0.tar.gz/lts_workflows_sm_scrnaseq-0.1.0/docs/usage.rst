Usage
=====

The intended usage is to include the main workflow file in a
Snakefile. See the examples in the test directory. For information on
what the workflow does, see `workflow`_.

Running
--------

.. code-block:: console
		
   $ snakemake -s Snakefile -d /path/to/workdir --configfile config.yaml all

Example Snakefile
-------------------

A minimum Snakefile example is given here:

.. code-block:: python
		
   # -*- snakemake -*-
   from lts_workflows_sm_scrnaseq import WORKFLOW

   configfile: "config.yaml"

   include: WORKFLOW


Required configuration
-------------------------------

.. note:: The configuration key nomenclature hasn't been settled yet

The following options must be set in the configuration file:

.. code-block:: yaml

   settings:
     sampleinfo: sampleinfo.csv
     runfmt: "{SM}/{SM}_{PU}"
     samplefmt: "{SM}/{SM}"
   ngs.settings:
     db:
       ref: # Reference sequences
         - ref.fa
 	 - gfp.fa
	 - ercc.fa
       transcripts:
	 - ref-transcripts.fa
	 - gfp.fa
	 - ercc.fa
     annotation:
       sources:
         - ref-transcripts.gtf
	 - gfp.genbank
	 - ercc.gb

   # list of sample identifiers
   samples:
     - sample1
     - sample2

The configuration settings 'runfmt' and 'samplefmt' describe how your
data is organized. They represent `python miniformat strings
<https://docs.python.org/3/library/string.html#formatspec>`_, where
the entries correspond to columns in the sampleinfo file; hence, in
this case, the columns **SM**, **PU**, and **DT** must be present in
the sampleinfo file.



Example sampleinfo.csv
---------------------------

.. code-block:: text
		
   SM,PU,DT,fastq
   s1,AAABBB11XX,010101,s1_AAABBB11XX_010101_1.fastq.gz
   s1,AAABBB11XX,010101,s1_AAABBB11XX_010101_2.fastq.gz
   s1,AAABBB22XX,020202,s1_AAABBB22XX_020202_1.fastq.gz
   s1,AAABBB22XX,020202,s1_AAABBB22XX_020202_2.fastq.gz
   s2,AAABBB11XX,010101,s2_AAABBB11XX_010101_1.fastq.gz
   s2,AAABBB11XX,010101,s2_AAABBB11XX_010101_2.fastq.gz

Workflow specific configuration
-----------------------------------

In addition to the required configuration, there are some
configuration settings that affect the workflow itself.

.. code-block:: yaml
		
   workflow:
     quantification: # One or both of the following
       - rsem
       - rpkmforgenes


Application level configuration
------------------------------------

Individual applications (e.g. star) are located at the top level, with
sublevels corresponding to specific application rules. For instance,
the following configuration would affect settings in **star** and
**rsem**:

.. code-block:: yaml
		
   star:
     star_index:
       # The test genome is small; 2000000 bases. --genomeSAindexNbases
       # needs to be adjusted to (min(14, log2(GenomeLength)/2 - 1))
       options: --genomeSAindexNbases 10

   rsem:
     index: ../ref/rsem_index
     calculate-expression:
       options: --paired-end

Additional advice
---------------------

There are a couple of helper rules for generating spikein input files
and the transcript annotation file.

``dbutils_make_transcript_annot_gtf``
  For QC statistics calculated by RSEQC, the gtf annotation file
  should reflect the content of the alignment index. You can
  automatically create the file name defined in
  ``['ngs.settings']['annotation']['transcript_annot_gtf']`` from
  the list of files defined in
  ``['ngs.settings']['annotation']['sources']`` via the rule
  ``dbutils_make_transcript_annot_gtf``. gtf and genbank input format is
  accepted.

``ercc_create_ref``
  The `ERCC RNA Spike-In Mix
  <https://www.thermofisher.com/order/catalog/product/4456740>`_ is
  commonly used as spike-in. The rule ``ercc_create_ref`` automates
  download of the sequences in fasta and genbank formats.

Troubleshooting
--------------------

