=============================
feincms_mailchimp
=============================

.. image:: https://badge.fury.io/py/feincms_mailchimp.svg
    :target: https://badge.fury.io/py/feincms_mailchimp

.. image:: https://travis-ci.org/paramono/feincms_mailchimp.svg?branch=master
    :target: https://travis-ci.org/paramono/feincms_mailchimp

.. image:: https://codecov.io/gh/paramono/feincms_mailchimp/branch/master/graph/badge.svg
    :target: https://codecov.io/gh/paramono/feincms_mailchimp

MailChimp integration for FeinCMS

Documentation
-------------

The full documentation is at https://feincms_mailchimp.readthedocs.io.

Quickstart
----------

Install feincms_mailchimp::

    pip install feincms_mailchimp

Add it to your `INSTALLED_APPS`:

.. code-block:: python

    INSTALLED_APPS = (
        ...
        'feincms_mailchimp.apps.FeincmsMailchimpConfig',
        ...
    )

Add feincms_mailchimp's URL patterns:

.. code-block:: python

    from feincms_mailchimp import urls as feincms_mailchimp_urls


    urlpatterns = [
        ...
        url(r'^', include(feincms_mailchimp_urls)),
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
