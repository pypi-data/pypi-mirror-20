======================
Django ZXCVBN Password
======================



Back-end and Front-end password validation with ZXCVBN.

A combination of
`pirandig’s django-zxcvbn`_ and `aj-may’s django-password-strength`_ Django apps.
It combines back-end and front-end validation with strength meter display.

.. _pirandig’s django-zxcvbn: https://github.com/pirandig/django-zxcvbn
.. _aj-may’s django-password-strength: https://github.com/aj-may/django-password-strength

License
=======

Software licensed under `ISC`_ license.

.. _ISC : https://www.isc.org/downloads/software-support-policy/isc-license/

Installation
============

::

    pip install django-zxcvbn-password

Usage
=====

.. code:: python

    # settings.py

    AUTH_PASSWORD_VALIDATORS = [{
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    }, {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    }, {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    }, {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    }, {
        'NAME': 'zxcvbn_password.ZXCVBNValidator',
        'OPTIONS': {
            'min_score': 3,
            'user_attributes': ('username', 'email', 'first_name', 'last_name')
        }
    }]

.. code:: python

    # forms.py

    from django import forms
    from zxcvbn_password.fields import PasswordField, PasswordConfirmationField

    class RegisterForm(forms.Form):
        password1 = PasswordField()
        password2 = PasswordConfirmationField(confirm_with=’password1’)


.. note::

    Remember to include ``{{ form.media }}`` in your template.
    Please refer to the documentation of the two upstream repositories for more information.


By default, other inputs won't be used to compute the score, but you can enforce it
like this:

.. code:: python

    # forms.py

    from zxcvbn_password import zxcbnn

    # in your form class
    def clean():
        password = self.cleaned_data.get('password')
        other_field1 = ...
        other_field2 = ...

        if password:
            score = zxcvbn(password, [other_field1, other_field2])['score']
            # raise forms.ValidationError if needed

        return self.cleaned_data

Screen-shot
===========

.. image:: https://cloud.githubusercontent.com/assets/3999221/23079032/5ae1513a-f54b-11e6-9d66-90660ad5fb2d.png


Development
===========

To run all the tests: ``tox``

=========
Changelog
=========

2.0.0 (2017-02-17)
==================

* Drop Django 1.8 support in favor of AUTH_PASSWORD_VALIDATORS setting
  introduced in Django 1.9.
* Update zxcvbn to more recent version (dwolfhub/zxcvbn-python on GitHub).
* Update JavaScript code to latest version.
* Remove all settings (they now go in AUTH_PASSWORD_VALIDATOR options).
* Change license to ISC.

Thanks to Nick Stefan and Daniel Wolf.

1.1.0 (2016-10-18)
==================

* Cookiecutterize the project.

1.0.5 (2015-03-31)
==================

* I don't remember.

1.0.3 (2015-03-12)
==================

* Switch README to rst.
* Fix manifest rules.

1.0.2 (2015-03-12)
==================

* Change package name from django_zxcvbn_password to zxcvbn_password.

1.0.0 (2015-02-21)
==================

* Beta release on PyPI.

0.1.0 (2015-02-01)
==================

* Alpha release on PyPI.


