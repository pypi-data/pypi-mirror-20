======
infmin
======

Input File Minimizer - a text file minimizing CLI tool.

Usage
    ``infmin [-h] [-f FILE] [-C DIRECTORY] [-r] [-s] in_file lines``

Arguments
=========

Positional arguments

#. ``in_file``: The file to minimize.
#. ``lines``: The number of lines to output.

At least one of the following arguments is required:

-f    Output file name.
-C    Output directory.

Optional arguments:

-r    Randomly skip lines while minimizing.
--silent    Suppress output messages while minimizing.
-h    Show help.
