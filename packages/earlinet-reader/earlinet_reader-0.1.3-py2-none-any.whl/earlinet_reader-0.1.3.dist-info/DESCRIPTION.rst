EARLINET file reader
====================

This package provides utilities to handle processed lidar data in one of EARLINET's NetCDF formats. Currently
it supports only data from EARLINET's Single Calculus Chain pre-processor.

Installation
------------

You can install the package using the ``pip`` command::

   pip install earlinet_reader

You can also install also directly from the `source code <http://bitbucket.org/iannis_b/earlinet-reader/src>`_. You should extract the code in a folder (e.g. ``earlinet-reader``)
and then run::

   pip install ./earlinet-reader

Command line interface
----------------------

The main way of using this package, is through the command line interface program called ``plotELPP``.

The usage of the ``plotELPP`` program is described bellow::

   usage: plotELPP [-h] [-v VARIABLE] [--grid] [--dpi DPI] [--html] [-d] [-s]
                   file_patter [rmin] [rmax]

   Command line tool to plot lidar pre-processed files from the SCC's ELPP.

   positional arguments:
     file_patter           The path to a file (possibly including glob patterns).
     rmin                  Minimum range to plot (in km)
     rmax                  Maximum range to plot (in km)

   optional arguments:
     -h, --help            show this help message and exit
     -v VARIABLE, --variable VARIABLE
                           Name of variable to plot
     --grid                Show grid on the plots
     --dpi DPI             DPI of the output image
     --html                Create an HTML report.
     -d, --debug           Print dubuging information.
     -s, --silent          Show only warning and error messages.

For example, let's assume you want to plot the content of the file ``20170216oh00_584.nc``.

* You can plot a single variable in the file using::

   plotELPP 20170216oh00_584.nc --variable elPR

* You can specify the minimum and maxi,um range of the plots e.g. from 0 to 5 km::

   plotELPP 20170216oh00_584.nc 0 5 --variable elPR

* You can tune few plotting parameters: turn the grid on and choose the output dpi::

   plotELPP 20170216oh00_584.nc --variable elPR --grid --dpi 200

* If you omit the variable parameter, you can show all variables in the netCDF file on a single plot::

   plotELPP 20170216oh00_584.nc

* You can see more info about the file by choosing the ``--html`` option::

   plotELPP 20170216oh00_584.nc --html

* You can perform the above operations for multiple files at once using ``*`` and ``?`` as wildcards::

   plotELPP `20170216oh00_*.nc` --html



Reporting bugs
--------------
If want to report a bug, ask for a new feature, or have an idea for an improvement fell free to contribute it through
the `bug tracking system <https://bitbucket.org/iannis_b/earlinet-reader/issues>`_.




