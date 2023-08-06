=========
Changelog
=========


0.3.2 (2017-03-06)
==================

* Fixed setup.py issue
* Added locale files to MANIFEST.in


0.3.1 (2017-03-02)
==================

* Added translation system
* Added german translation


0.3.0 (2017-01-06)
++++++++++++++++++

* Allowed override AppHookConfigField attributes
* Drop Django 1.7 and below
* Drop django CMS 3.1 and below
* Add Django 1.10 support


0.2.7 (2016-03-03)
++++++++++++++++++

* Set namespace as readonly
* Add official Django 1.9 support
* Update readme
* Use path_info instead of path in resolve


0.2.6 (2015-10-05)
++++++++++++++++++

* Add support for Python 3.5
* Add support for Django 1.9a1
* Code style cleanup and tests


0.2.5 (2015-09-25)
++++++++++++++++++

* Add support for Django 1.8, django CMS 3.2
* AppHookConfigTranslatableManager.get_queryset should use queryset_class
* Skip overriding admin form if app_config field not present


0.2.4 (2015-04-20)
++++++++++++++++++

* Fixes issue where an apphook could not be changed, once set.
* Addes optional 'default' kwarg to namespace_url templatetag


0.1.0 (2014-01-01)
++++++++++++++++++

* First release on PyPI.
