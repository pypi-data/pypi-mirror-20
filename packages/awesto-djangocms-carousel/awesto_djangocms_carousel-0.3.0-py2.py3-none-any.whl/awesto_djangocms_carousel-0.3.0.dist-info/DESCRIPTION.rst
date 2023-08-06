========
Overview
========



A carousel plugin for djangoCMS

* Free software: MIT license

This plugin was originally forked from
https://github.com/MagicSolutions/cmsplugin-carousel, but most of the
functionality has been replaced. This version is not compatible with the plugin
from Magic Solutions.

Installation
============

::

    pip install awesto-djangocms-carousel


Add ``cmsplugin_carousel`` to your ``INSTALLED_APPS``.

Usage
=====

Add a `Carousel` plugin to one of your placeholders. You can then add abritrary
child plugins which will be displayed as carousel items.

A `Carousel Caption` plugin is also provided.

A common scenario is:

- Carousel

  - Link

    - Image

    - Caption

        - Text

Documentation
=============

https://djangocms-carousel.readthedocs.io/

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

0.1.0 (2017-02-22)
-----------------------------------------

* First release on PyPI.


