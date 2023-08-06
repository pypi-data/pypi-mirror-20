================
Barcode Splitter
================
A utility to split multiple sequence files using multiple sets of barcodes.

Copyright 2016 Lance Parsons <lparsons@princeton.edu>, Robert Leach <rleach@princeton.edu>

`BSD 2-Clause License <http://www.opensource.org/licenses/BSD-2-Clause>`_ - See ``LICENSE.txt``

Installation
============
1. Install Barcode Splitter::

    pip install barcode_splitter


barcode_splitter
================

Split multiple fastq files by matching barcodes in one or more of the sequence
files. Barcodes in the tab-delimited ``barcodes.txt`` file are matched against
the beginning (or end) of the specified index read(s). By default, barcodes must
match exactly, but ``--mistmatches`` can be set higher if desired. Compressed
input is read (from all files) if the first input file name ends in ``.gz``.
Reading of compressed input can be forced with the ``gzipin`` option.

Examples
--------

Split an Illumina paired-end run where the index read are in the second read
file (read 2), the forward read is the first read file (read 1), and the reverse
reads are in the third read file (read 3)::

    barcode_splitter --bcfile barcodes.txt read1.fastq read2_index.fastq read3.fastq --idxread 2 --suffix .fastq

UTF-8
-----

Sample names containing UTF-8 characters are allowed, however, outputting those
characters to STDOUT and piping to a file can be problematic. Ensure python
uses the proper encoding for STDOUT by setting ``PYTHONIOENCODING='utf-8'``.::

    PYTHONIOENCODING='utf-8' barcode_splitter --bcfile barcodes_utf8.txt read1.fastq read2_index.fastq read3.fastq --idxread 2 --suffix .fastq


Citation
========

Please use the following `BibTeX <http://www.bibtex.org/>`_ entry::

    @misc{leach_bcs_2016,
        address = {Princeton, {NJ}, {USA}},
        title = {Barcode Splitter, version 0.18.0 [Software]},
        url = {https://bitbucket.org/princeton_genomics/barcode_splitter},
        author = {Leach, Robert and
                  Parsons, Lance},
        year = {2017}
    }


