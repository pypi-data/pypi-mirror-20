========
Overview
========



A taxy Tox to tax your current site-packages. This is a variant of Tox that doesn't use virtualenvs at all - just
installs everything in the current environment. Use at your own peril.

* Free software: BSD license

Installation
============

::

    pip install tax

Documentation
=============

https://python-tax.readthedocs.io/

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

1.0.0 (2017-03-15)
------------------

* Add support for latest Tox and test with all the Tox versions since 2.2.

0.1.0 (2015-10-06)
------------------

* First release on PyPI.


