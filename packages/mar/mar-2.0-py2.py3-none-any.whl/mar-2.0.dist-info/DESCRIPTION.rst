========
Overview
========



Package for handling Mozilla Archive files. MAR file format is documented at https://wiki.mozilla.org/Software_Update:MAR

* Free software: MPL 2.0 license

Installation
============

::

    pip install mar

Documentation
=============

https://mar.readthedocs.io/

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

2.0 (2016-12-16)
-----------------------------------------

* First release on PyPI.


