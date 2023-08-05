========
datedown
========

.. image:: https://travis-ci.org/cpaulik/datedown.svg?branch=master
    :target: https://travis-ci.org/cpaulik/datedown

.. image:: https://coveralls.io/repos/github/cpaulik/datedown/badge.svg?branch=master
   :target: https://coveralls.io/github/cpaulik/datedown?branch=master

.. image:: https://badge.fury.io/py/datedown.svg
    :target: http://badge.fury.io/py/datedown

Small library to download files with date and time based filenames or folder
structures. In parallel using wget.

Recursive wget can be slow and result in cumbersome local folder structures.
This library downloads exact filenames based on exact dates or a range of dates.
Remote and local filenames and paths are built using the `Python strftime and
strptime format specification
<https://docs.python.org/2/library/datetime.html#strftime-and-strptime-behavior>`_

The library uses the Python multiprocessing module to start multiple wget
instances for possibly faster downloading. At the end of the download process it
verfies that all the files were downloaded. No support for checksums at the
moment.

Installation
============

* Install `wget <https://en.wikipedia.org/wiki/Wget>`_ if it is not already on
  your system.
* ``pip install datedown``

Usage
=====

The program can be used either as a library to be called from other Python
programs or as a stand alone command line program.

Use as a command line program
-----------------------------

After installation the ``datedown`` program should be available in your shell.
To get detailed instructions on how to use it run ``datedown -h``.

If it is impossible to know the exact filename on the server then also a
recursive version of the script is available under the name ``datedown_rec``.

Example
~~~~~~~

.. code::

    datedown 2000-01-01 2000-01-02 http://localhost:8888 file_%Y_%m_%d.txt /home/cpa/ --urlsubdirs test_data year_month_subfolders %Y %m

This would download the files

* http://localhost:8888/test_data/year_month_subfolders/2000/01/file_2000_01_01.txt
* http://localhost:8888/test_data/year_month_subfolders/2000/01/file_2000_01_02.txt

to

* /home/cpa/test_data/year_month_subfolders/2000/01/file_2000_01_01.txt
* /home/cpa/test_data/year_month_subfolders/2000/01/file_2000_01_02.txt


Use as a library
----------------

For use as a library the most important function is
:py:func:`datedown.interface.download_by_dt` or :py:func:`datedown.down.download`. The
first function takes functions that produce urls from Python datetime objects
whereas the second takes lists of urls and local filenames. Please see the
API Documentation for more details about these functions.

|Documentation Status|

.. |Documentation Status| image:: https://readthedocs.org/projects/datedown/badge/?version=latest
   :target: http://datedown.readthedocs.org/

Note
====

This project has been set up using PyScaffold 2.5.6. For details and usage
information on PyScaffold see http://pyscaffold.readthedocs.org/.
