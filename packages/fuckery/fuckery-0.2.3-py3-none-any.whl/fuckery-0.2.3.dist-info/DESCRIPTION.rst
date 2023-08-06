========
Overview
========



Python Brainfuck implemention.

* Free software: BSD license

Installation
============

::

    pip install fuckery

Documentation
=============

https://pyFuckery.readthedocs.io/

Development
===========

To run the all tests run::

    tox

Note, to combine the coverage data from all the tox environments run:

.. list-table::
    :widths: 10 90
    :stub-columns: 1

    - - Windows
      - ::

            set PYTEST_ADDOPTS=--cov-append
            tox

    - - Other
      - ::

            PYTEST_ADDOPTS=--cov-append tox


Changelog
=========

0.2.3 (2017-03-27)
----------------------------------------
* Add a parse_and_run() function to the VirtualMachine class, to allow it to execute arbitrary brainfuck programs.
* Update docstrings considerably, and improve sphinx based autodoc usage.
* Add CircleCI testing

0.2.2 (2017-03-01)
-----------------------------------------
* Fix issue with doc generation.

0.2.1 (2017-03-01)
-----------------------------------------
* Fix issue with wheel's and trove classifiers on pypi.

0.2.0 (2017-03-01)
-----------------------------------------
* Working brainfuck interpreter available.
* Renamed package from pyfuckery to fuckery.


0.1.0 (2017-02-12)
-----------------------------------------

* First release on PyPI.


