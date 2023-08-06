==================
Django AppSettings
==================



Application settings helper for Django apps.

Why another *app settings* app?
Because none of the other suited my needs!

This one will be simple to use, and will work with unit tests overriding settings.

(Future) Usage
==============

This app is an alpha version. Development has just started. I want it to be something like that:

.. code:: python

    # in your application __init__.py

    from appsettings import AppSettingsHelper as Ash

    class AppSettings(Ash):
        always_use_ice_cream = Ash.BooleanSetting(default=True)
        attr_name = Ash.StringSetting(name='SETTING_NAME')

        # if you have complex treatment to do on setting
        complex_setting = Ash.Setting(getter=custom_method, checker=custom_checker)

        # if you need to import a python object (module/class/method)
        imported_object = Ash.ImportedObjectSetting(default='app.default.object')

        class Meta:
            settings_prefix = 'ASH'  # settings must be prefixed with ASH_


    AppSettings.check()  # will check every settings

    # then in your code

    from . import AppSettings

    app_settings = AppSettings()
    app_settings.load()  # to load every settings once and for all
    app_settings.attr_name == 'something'

    # or, and in order to work with tests overriding settings
    AppSettings.get_always_use_ice_cream()  # to get ASH_ALWAYS_USE_ICE_CREAM setting dynamically
    my_python_object = AppSettings.get_imported_object()

License
=======

Software licensed under `ISC`_ license.

.. _ISC: https://www.isc.org/downloads/software-support-policy/isc-license/

Installation
============

::

    pip install django-app-settings

Documentation
=============

`On ReadTheDocs`_

.. _`On ReadTheDocs`: http://django-appsettings.readthedocs.io/

Development
===========

To run all the tests: ``tox``

=========
Changelog
=========

0.1.0 (2017-03-23)
==================

* Alpha release on PyPI.


