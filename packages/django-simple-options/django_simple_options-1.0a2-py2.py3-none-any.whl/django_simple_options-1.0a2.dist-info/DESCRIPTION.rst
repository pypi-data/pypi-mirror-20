=====================
Django Simple Options
=====================

Simple app to add configuration options to a Django project.

Quick start
-----------

**1** Install using pip::

    $ pip install django-simple-options

**2** Add "options" to your INSTALLED_APPS settings like this::

    INSTALLED_APPS += ('options',)


Settings options
----------------

Use ``CONFIGURATION_DEFAULT_OPTIONS`` to set the default options::

    CONFIGURATION_DEFAULT_OPTIONS = {
        "sold_out": {
            "value": 0,
            "type": INT,
            "public_name": "Sets tickets as sold out"
        },
    }





History
-------

1.0a2 (2017-2-20)
+++++++++++++++++

* Add search options to admin.
* Export current options command.

1.0a1 (2017-2-20)
+++++++++++++++++

* First release on PyPI.


