django-select2-tags
===================

|Build Status| |Coverage Status|

**django-select2-tags** provides a form class and form fields to handle storing new Django model
values created using Select2_ fields with tags enabled. This is a rough project at the moment;
it doesn't handle required fields well nor does form validation restore tags to inputs. It may
still help you out, and pull requests are welcome!

Tested on Python 2.7 and 3.5 with Django 1.10.

Like my work? Tip me! https://www.paypal.me/jessamynsmith


Installation
------------

The development version can be installed with:

::

    pip install -e git://github.com/jessamynsmith/django-select2-tags.git#egg=django-select2-tags

If you are developing locally, your version can be installed from the
working directory with:

::

    python setup.py.install


Usage
-----

The simplest way to use ``django-select2-tags`` is to use
``select2_tags.forms.Select2ModelChoiceField`` and
``select2_tags.forms.Select2ModelMultipleChoiceField`` in the ModelForm for
``django.db.models.ForeignKey`` and
``django.db.models.ManyToManyField`` model fields, respectively. These fields extend
their django equivalents and take the same arguments, along with the required ``value_field``
argument and an optional ``save_new`` keyword argument. Currently, this only works with
nullable model fields, and you must pass ``required=False`` to the choice fields.

If you use the ``select2_tags.forms.Select2ModelForm`` in place of a regular ModelForm and set
save_new=True on any Select2 choice fields, the new values will be saved for you.

Given the following models:

::

   class MyRelatedModel(models.Model):
       name = models.CharField(max_length=20)


   class MyModel(models.Model):
       my_fk_field = models.ForeignKey(MyRelatedModel, null=True, blank=True)
       my_m2m_field = models.ManyToManyField(MyRelatedModel)

You could create the following form to automatically save the select2 tag values:

::

   from select2_tags import forms


   class MyFkForm(forms.Select2ModelForm):
       class Meta:
           model = MyModel
           exclude = []

       my_fk_field = forms.Select2ModelChoiceField(
           'name', queryset=test_models.MyRelatedModel.objects.all(), required=False)
       my_m2m_field = forms.Select2ModelMultipleChoiceField(
           'name', queryset=test_models.MyRelatedModel.objects.all(), required=False)

You will be able to enter new values on the edit page and they will be saved to the database,
so long as select2 is set up with tags enabled:

::

    $("#id_my_fk_field").select2({
        tags: true
    });


Development
-----------

Fork the project on github and git clone your fork, e.g.:

::

    git clone https://github.com/<username>/django-select2-tags.git

Create a virtualenv and install dependencies:

::

    mkvirtualenv django-select2-tags
    pip install -r requirements/package.txt -r requirements/test.txt

Run tests with coverage (should be 100%) and check code style:

::

    coverage run manage.py test
    coverage report -m
    flake8

Verify all supported Python versions:

::

    pip install tox
    tox

Install your local copy:

::

    python setup.py install

.. |Build Status| image:: https://img.shields.io/circleci/project/github/jessamynsmith/django-select2-tags.svg
   :target: https://circleci.com/gh/jessamynsmith/django-select2-tags
   :alt: Build status
.. |Coverage Status| image:: https://img.shields.io/coveralls/jessamynsmith/django-select2-tags.svg
   :target: https://coveralls.io/r/jessamynsmith/django-select2-tags?branch=master
   :alt: Coverage status
.. _Select2: http://ivaynberg.github.com/select2/
