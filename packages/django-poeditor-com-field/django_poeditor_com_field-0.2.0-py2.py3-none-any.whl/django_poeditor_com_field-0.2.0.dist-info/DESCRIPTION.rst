=============================
Django poeditor.com Model Field
=============================

.. image:: https://badge.fury.io/py/django-poeditor-com-field.svg
    :target: https://badge.fury.io/py/django-poeditor-com-field

.. image:: https://travis-ci.org/runekaagaard/django-poeditor-com-field.svg?branch=master
    :target: https://travis-ci.org/runekaagaard/django-poeditor-com-field

.. image:: https://codecov.io/gh/runekaagaard/django-poeditor-com-field/branch/master/graph/badge.svg
    :target: https://codecov.io/gh/runekaagaard/django-poeditor-com-field

Translate your model data with poeditor.com.

Documentation
-------------

The full documentation is at https://django-poeditor-com-field.readthedocs.io.

Quickstart
----------

Install Django poeditor.com Model Field::

    pip install django-poeditor-com-field

Add it to your `INSTALLED_APPS`:

.. code-block:: python

    INSTALLED_APPS = (
        ...
        'poeditor_com_field.apps.PoeditorComFieldConfig',
        ...
    )

Add Django poeditor.com Model Field's URL patterns:

.. code-block:: python

    from poeditor_com_field import urls as poeditor_com_field_urls


    urlpatterns = [
        ...
        url(r'^', include(poeditor_com_field_urls)),
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




History
-------

0.1.0 (2017-02-07)
++++++++++++++++++

* First release on PyPI.


