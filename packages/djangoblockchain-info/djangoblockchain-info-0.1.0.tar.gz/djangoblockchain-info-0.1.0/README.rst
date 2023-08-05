=============================
djangoblockchain-info
=============================

.. image:: https://badge.fury.io/py/djangoblockchain-info.svg
    :target: https://badge.fury.io/py/djangoblockchain-info

.. image:: https://travis-ci.org/b3h3rkz/djangoblockchain-info.svg?branch=master
    :target: https://travis-ci.org/b3h3rkz/djangoblockchain-info

.. image:: https://codecov.io/gh/b3h3rkz/djangoblockchain-info/branch/master/graph/badge.svg
    :target: https://codecov.io/gh/b3h3rkz/djangoblockchain-info

django package to interact with blockchain.info api

Documentation
-------------

The full documentation is at https://djangoblockchain-info.readthedocs.io.

Quickstart
----------

Install djangoblockchain-info::

    pip install djangoblockchain-info

Add it to your `INSTALLED_APPS`:

.. code-block:: python

    INSTALLED_APPS = (
        ...
        'djangoblockchain_info.apps.DjangoblockchainInfoConfig',
        ...
    )

Add djangoblockchain-info's URL patterns:

.. code-block:: python

    from djangoblockchain_info import urls as djangoblockchain_info_urls


    urlpatterns = [
        ...
        url(r'^', include(djangoblockchain_info_urls)),
        ...
    ]

Features
--------

* TODO

Running Tests
-------------

Does the code actually work?

::

    source <YOURVIRTUALENV>/bin/activate
    (myenv) $ pip install tox
    (myenv) $ tox

Credits
-------

Tools used in rendering this package:

*  Cookiecutter_
*  `cookiecutter-djangopackage`_

.. _Cookiecutter: https://github.com/audreyr/cookiecutter
.. _`cookiecutter-djangopackage`: https://github.com/pydanny/cookiecutter-djangopackage
