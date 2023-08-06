HURUmap
=======

.. image:: https://badge.fury.io/py/wazimap.svg
    :target: http://badge.fury.io/py/wazimap

.. image:: https://travis-ci.org/Code4SA/wazimap.svg
    :target: http://travis-ci.org/Code4SA/wazimap

HURUmap is a Django application for exploring census and other similar data. It makes it easy to understand a place
through the eyes of the data, and to explore data across a range of places. It is most suited for census data
but can easily be used with other data that is similarly focused on places in a country.

Check out `HURUmap Tanzania <http://tanzania.hurumap.org>`_ and `HURUmap Kenya <http://kenya.hurumap.org>`_ to
get an idea of what HURUmap is about.

HURUmap is a fork of `Wazimap <https://github.com/Code4SA/wazimap>`_ and the excellent `Censusreporter <https://censusreporter.org>`_ project which was funded by a
`Knight News Challenge grant <http://www.niemanlab.org/2012/10/knight-funding-expands-ires-journalist-friendly-census-site/>`_.
You can also find `Censusreporter on GitHub <https://github.com/censusreporter/censusreporter>`_.


* Code for Africa is on Twitter as `@Code4Africa <https://twitter.com/@Code4Africa>`_.
* Read the `full Wazimap documentation <http://wazimap.readthedocs.org/en/latest/>`_.

Using HURUmap
=============

Read the `full Wazimap documentation <http://wazimap.readthedocs.org/en/latest/>`_ to get started.

Development
===========

Releasing a New Version
-----------------------

1. Run the tests::

    python manage.py test

2. Update VERSION appropriately
3. Update the CHANGES.rst
4. Commit and push to github
5. Release to PyPI::

    python setup.py sdist bdist_wheel upload

License and Copyright
=====================

HURUmap is licensed under the MIT License.

Other Licenses and Copyright
============================

Copyright (c) 2014 Census Reporter.

Wazimap is licensed under the MIT License.

The Wazimap name and branding is Copyright 2013-2017 Media Monitoring Africa (MMA) and may not be used without permission.

If you use this software, please provide attribution to Census Reporter, Code for Africa, HURUmap, Wazimap, Media Monitoring Africa and Code for South Africa.
