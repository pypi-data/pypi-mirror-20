.. _Dandelion: https://dandelion.eu

Django Dandelion
=============================

.. image:: https://badge.fury.io/py/django-dandelion.svg
    :target: https://badge.fury.io/py/django-dandelion

.. image:: https://travis-ci.org/AlessioBazzanella/django-dandelion.svg?branch=master
    :target: https://travis-ci.org/AlessioBazzanella/django-dandelion

.. image:: https://codecov.io/gh/AlessioBazzanella/django-dandelion/branch/master/graph/badge.svg
    :target: https://codecov.io/gh/AlessioBazzanella/django-dandelion

Use the Dandelion_ API with Django

Documentation
-------------

The full documentation is at https://django-dandelion.readthedocs.io.

Quickstart
----------

Install Django Dandelion:

.. code-block:: bash

    $ pip install django-dandelion

Add ``django-dandelion`` to your ``INSTALLED_APPS``

.. code-block:: python

    INSTALLED_APPS = [
        # ...
        'django-dandelion',
    ]

Add the entry DANDELION_TOKEN. The recommended method is to setup your production keys using environment
variables. This helps to keep them more secure. Your test keys can be displayed in your code directly.

The following entry look for your DANDELION_TOKEN in your environment and, if it can’t find them,uses your test keys
values instead:

.. code-block:: python

    DANDELION_TOKEN = os.environ.get("DANDELION_TOKEN", "<your dandelion token>")

Register on dandelion_ to obtain your authentication keys and enrich your application with our semantic intelligence.

You can also change the url of the host and decide whether to use the cache:

.. code-block:: python

    DANDELION_HOST = 'api.dandelion.eu'  # Default 'api.dandelion.eu'
    DANDELION_USE_CACHE = True  # Default True

Running Tests
-------------

Does the code actually work?

::

    source <YOURVIRTUALENV>/bin/activate
    (myenv) $ pip install tox
    (myenv) $ tox
