========
Overview
========

.. start-badges

.. list-table::
    :stub-columns: 1

    * - docs
      - |docs|
    * - tests
      - | |travis| |appveyor| |requires|
        | |codecov|
    * - package
      - |version| |downloads| |wheel| |supported-versions| |supported-implementations|

.. |docs| image:: https://readthedocs.org/projects/djangocms-carousel/badge/?style=flat
    :target: https://readthedocs.org/projects/djangocms-carousel
    :alt: Documentation Status

.. |travis| image:: https://travis-ci.org/awesto/djangocms-carousel.svg?branch=master
    :alt: Travis-CI Build Status
    :target: https://travis-ci.org/awesto/djangocms-carousel

.. |appveyor| image:: https://ci.appveyor.com/api/projects/status/github/awesto/djangocms-carousel?branch=master&svg=true
    :alt: AppVeyor Build Status
    :target: https://ci.appveyor.com/project/rfleschenberg/djangocms-carousel

.. |requires| image:: https://requires.io/github/awesto/djangocms-carousel/requirements.svg?branch=master
    :alt: Requirements Status
    :target: https://requires.io/github/awesto/djangocms-carousel/requirements/?branch=master

.. |codecov| image:: https://codecov.io/github/awesto/djangocms-carousel/coverage.svg?branch=master
    :alt: Coverage Status
    :target: https://codecov.io/github/awesto/djangocms-carousel

.. |version| image:: https://img.shields.io/pypi/v/awesto-djangocms-carousel.svg?style=flat
    :alt: PyPI Package latest release
    :target: https://pypi.python.org/pypi/awesto-djangocms-carousel

.. |downloads| image:: https://img.shields.io/pypi/dm/awesto-djangocms-carousel.svg?style=flat
    :alt: PyPI Package monthly downloads
    :target: https://pypi.python.org/pypi/awesto-djangocms-carousel

.. |wheel| image:: https://img.shields.io/pypi/wheel/awesto-djangocms-carousel.svg?style=flat
    :alt: PyPI Wheel
    :target: https://pypi.python.org/pypi/awesto-djangocms-carousel

.. |supported-versions| image:: https://img.shields.io/pypi/pyversions/awesto-djangocms-carousel.svg?style=flat
    :alt: Supported versions
    :target: https://pypi.python.org/pypi/awesto-djangocms-carousel

.. |supported-implementations| image:: https://img.shields.io/pypi/implementation/awesto-djangocms-carousel.svg?style=flat
    :alt: Supported implementations
    :target: https://pypi.python.org/pypi/awesto-djangocms-carousel


.. end-badges

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
