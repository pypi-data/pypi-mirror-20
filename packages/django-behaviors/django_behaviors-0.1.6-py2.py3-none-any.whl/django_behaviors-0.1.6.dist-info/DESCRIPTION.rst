=============================
Django Behaviors
=============================

.. image:: https://badge.fury.io/py/django-behaviors.svg
    :target: https://badge.fury.io/py/django-behaviors

.. image:: https://travis-ci.org/audiolion/django-behaviors.svg?branch=master
    :target: https://travis-ci.org/audiolion/django-behaviors

.. image:: https://codecov.io/gh/audiolion/django-behaviors/branch/master/graph/badge.svg
    :target: https://codecov.io/gh/audiolion/django-behaviors

Common behaviors for Django Models, e.g. Timestamps, Publishing, Authoring/Editing and more.

Documentation
-------------

Quickstart
----------

Install Django Behaviors::

    pip install django-behaviors

Add it to your `INSTALLED_APPS`:

.. code-block:: python

    INSTALLED_APPS = (
        ...
        'behaviors.apps.BehaviorsConfig',
        ...
    )

Table of Contents
-----------------

- `Features`_
   - `Timestamped`_
   - `Authored`_
   - `Editored`_
   - `Published`_
- `Mixing in with Custom Managers`_
- `Mixing Multiple Behaviors`_

Features
---------

Timestamped Model
``````````````````
.. code-block:: python

    # models.py
    from behaviors.behaviors import Authored, Editored, Timestamped, Published


    class MyModel(Timestamped):
        name = models.CharField(max_length=100)

Provides ``MyModel`` with the fields ``created`` and ``modified``. ``modified`` is initially
blank and will be assigned after the next save of the object.

A property is added to the model ``changed``. By calling ``mymodel.changed`` you get a
``Boolean`` of whether or not the object has changed. After the second ``save()`` of
the object ``modified`` will be set and ``changed`` will return ``True``.

Authored Model
``````````````
.. code-block:: python

    # models.py
    from behaviors.behaviors import Authored, Editored, Timestamped, Published


    class MyModel(Authored):
        name = models.CharField(max_length=100)

Provides ``MyModel`` with the ``author`` field which is a `ForeignKey` on the _settings.AUTH_USER_MODEL. The author is a required field and must
be provided on initial ``POST`` requests that create an object.

A custom ``models.ModelForm`` is provided to automatically add the ``author``
on object creation:

.. code-block:: python

    # forms.py
    from behaviors.forms import AuthoredModelForm, EditoredModelForm
    from .models import MyModel


    class MyModelForm(AuthoredModelForm):
        class Meta:
          model = MyModel
          fields = ['name']

    # views.py
    from django.views.generic.edit import CreateView
    from .forms import MyModelForm
    from .models import MyModel


    class MyModelCreateView(CreateView):
        model = MyModel
        form = MyModelForm

        # add request to form kwargs
        def get_form_kwargs(self):
          kwargs = super(MyModelCreateView, self).get_form_kwargs()
          kwargs['request'] = self.request
          return kwargs

Now when the object is created the ``author`` will be added on the call
to ``form.save()``.

If you are using functional views or another view type you simply need
to make sure you pass the request object along with the form.

.. code-block:: python
    # views.py

    class MyModelView(View):
      template_name = "myapp/mymodel_form.html"

      def get(self, request, *args, **kwargs):
          context = {
            'form': MyModelForm(),
          }
          return render(request, self.template_name, context=context)

      def post(self, request, *args, **kwargs):
          # pass in request object to the request keyword argument
          form = MyModelForm(self.request.POST, request=request)
          if form.is_valid():
              form.save()
              return reverse(..)
          context = {
            'form': form,
          }
          return render(request, self.template_name, context=context)

If for some reason you don't want to mixin the ``AuthoredModelForm`` with your existing
form you can just add the user like so:

.. code-block:: python
    ...
    if form.is_valid()
        obj = form.save(commit=False)
        obj.author = request.user
        obj.save()
        return reverse(..)
    ...

But it isn't recommended, the ``AuthoredModelForm`` is tested and doesn't reassign the
author on every save.

Authored QuerySet
..................

The ``Authored`` behavior attaches a custom model manager to the default ``objects``
and to the ``authors`` variables on the model it is mixed into. If you haven't overrode
the ``objects`` variable with a custom manager then you can use that, otherwise the
``authors`` variable is a fallback.

To get all ``MyModel`` instances authored by people whose name starts with 'Jo'

.. code-block:: python

    # case is insensitive so 'joe' or 'Joe' matches
    MyModel.objects.authored_by('Jo')
    >>> [MyModel, MyModel, ...]

    # or use the authors manager variable
    MyModel.authors.authored_by('Jo')
    >>> [MyModel, MyModel, ...]

See `Mixing in with Custom Managers`_ for details on how
to mix in this behavior with a custom manager you have that overrides the ``objects``
default manager.


Editored Model
````````````````
.. code-block:: python

    # models.py
    from behaviors.behaviors import Authored, Editored, Timestamped, Published


    class MyModel(Editored):
        name = models.CharField(max_length=100)

The ``Editored`` behavior is the same as the ``Authored`` behavior except it provides
an ``editor`` field instead and the field is **not required**. By default the ``editor``
is blank and null, if a ``request`` object is supplied to the form it will assign a new
editor and erase the previous editor (or the null editor).

Instead of using the ``AuthoredModelForm`` use the ``EditoredModelForm`` as a mixin to
your form.

.. code-block:: python

    # forms.py
    from behaviors.forms import AuthoredModelForm, EditoredModelForm
    from .models import MyModel


    class MyModelForm(EditoredModelForm):
        class Meta:
          model = MyModel
          fields = ['name']

    # views.py
    from django.views.generic.edit import CreateView, UpdateView
    from .forms import MyModelForm
    from .models import MyModel


    MyModelRequestFormMixin(object):
        # add request to form kwargs
        def get_form_kwargs(self):
          kwargs = super(MyModelCreateView, self).get_form_kwargs()
          kwargs['request'] = self.request
          return kwargs


    class MyModelCreateView(MyModelRequestFormMixin, CreateView):
        model = MyModel
        form = MyModelForm


    class MyModelUpdateView(MyModelRequestFormMixin, UpdateView):
        model = MyModel
        form = MyModelForm


Now when the object is created or updated the ``editor`` will be updated
on the call to ``form.save()``.

If you are using functional views or another view type you simply need
to make sure you pass the request object along with the form.

.. code-block:: python
    # views.py

    class MyModelView(View):
      template_name = "myapp/mymodel_form.html"

      def get(self, request, *args, **kwargs):
          context = {
            'form': MyModelForm(),
          }
          return render(request, self.template_name, context=context)

      def post(self, request, *args, **kwargs):
          # pass in request object to the request keyword argument
          form = MyModelForm(self.request.POST, request=request)
          if form.is_valid():
              form.save()
              return reverse(..)
          context = {
            'form': form,
          }
          return render(request, self.template_name, context=context)

If for some reason you don't want to mixin the ``EditoredModelForm`` with your existing
form you can just add the user like so:

.. code-block:: python
    ...
    if form.is_valid()
        obj = form.save(commit=False)
        obj.editor = request.user
        obj.save()
        return reverse(..)
    ...

But it isn't recommended, the ``EditoredModelForm`` is tested and doesn't cause errors
if request.user is invalid.

Editored QuerySet
..................

The ``Editored`` behavior attaches a custom model manager to the default ``objects``
and to the ``editors`` variables on the model it is mixed into. If you haven't overrode
the ``objects`` variable with a custom manager then you can use that, otherwise the
``editors`` variable is a fallback.

To get all ``MyModel`` instances edited by people whose name starts with 'Jo'

.. code-block:: python

    # case is insensitive so 'joe' or 'Joe' matches
    MyModel.objects.edited_by('Jo')
    >>> [MyModel, MyModel, ...]

    # or use the editors manager variable
    MyModel.editors.edited_by('Jo')
    >>> [MyModel, MyModel, ...]

See `Mixing in with Custom Managers`_ for details on how
to mix in this behavior with a custom manager you have that overrides the ``objects``
default manager.

Published Model
````````````````

The ``Published`` behavior adds a field ``publication_status`` to your model. The status
has two states: 'Draft' or 'Published'.

.. code-block:: python

    # models.py
    from behaviors.behaviors import Authored, Editored, Timestamped, Published


    class MyModel(Published):
        name = models.CharField(max_length=100)

The ``publication_status`` field defaults to ``Published.DRAFT`` when you make new
models unless you supply the ``Published.PUBLISHED`` attribute to the ``publication_status``
field.

.. code-block:: python

    MyModel.objects.create(name='Jim-bob Cooter', publication_status=MyModel.PUBLISHED)

The attributes ``DRAFT`` and ``PUBISHED`` are inherited when you mix ``Published``
with your model so you can call your model to get them.

Published QuerySet
...................

The ``Published`` behavior attaches to the default ``objects`` variable and
the ``publications`` variable as a fallback if ``objects`` is overrode.

.. code-block:: python

    MyModel.objects.published()
    MyModel.publications.published()
    # returns all MyModel.PUBLISHED

    MyModel.objects.draft()
    MyModel.publications.draft()
    # returns all MyModel.DRAFT


Mixing in with Custom Managers
------------------------------

If you have a custom manager on your model already:

.. code-block:: python

    # models.py
    from behaviors.behaviors import Authored, Editored, Published, Timestamped

    from django.db import models


    class MyModelCustomManager(models.Manager):

        def get_queryset(self):
            return super(MyModelCustomManager).get_queryset(self)

        def custom_manager_method(self):
            return self.get_queryset().filter(name='Jim-bob')

    class MyModel(Authored):
        name = models.CharField(max_length=100)

        # MyModel.objects.authored_by(..) won't work
        # MyModel.authors.authored_by(..) still will
        objects = MyModelCustomManager()

Simply add ``AuthoredManager`` from ``behaviors.managers`` as a mixin to
``MyModelCustomManager`` so they can share the ``objects`` variable.

.. code-block:: python

    # models.py
    from behaviors.behaviors import Authored, Editored, Published, Timestamped
    from behaviors.managers import AuthoredManager, EditoredManager, PublishedManager

    from django.db import models


    class MyModelCustomManager(AuthoredManager, models.Manager):

        def get_queryset(self):
            return super(MyModelCustomManager).get_queryset(self)

        def custom_manager_method(self):
            return self.get_queryset().filter(name='Jim-bob')

    class MyModel(Authored):
        name = models.CharField(max_length=100)

        # MyModel.objects.authored_by(..) now works
        objects = MyModelCustomManager()

Similarly if you are using a custom QuerySet and calling its ``as_manager()``
method to attach it to ``objects`` you can import from ``behaviors.querysets``
and mix it in.

.. code-block:: python

    # models.py
    from behaviors.behaviors import Authored, Editored, Published, Timestamped
    from behaviors.querysets import AuthoredQuerySet, EditoredQuerySet, PublishedQuerySet

    from django.db import models


    class MyModelCustomQuerySet(AuthoredQuerySet, models.QuerySet):

        def custom_queryset_method(self):
            return self.filter(name='Jim-bob')

    class MyModel(Authored):
        name = models.CharField(max_length=100)

        # MyModel.objects.authored_by(..) works
        objects = MyModelCustomQuerySet.as_manager()


Mixing in Multiple Behaviors
----------------------------

Many times you will want multiple behaviors on a model. You can simply mix in
multiple behaviors and, if you'd like to have all their custom ``QuerySet``
methods work on ``objects``, provide a custom manager with all the mixins.

.. code-block:: python
    # models.py
    from behaviors.behaviors import Authored, Editored, Published, Timestamped
    from behaviors.querysets import AuthoredQuerySet, EditoredQuerySet, PublishedQuerySet

    from django.db import models


    class MyModelQuerySet(AuthoredQuerySet, EditoredQuerySet, PublishedQuerySet):
        pass

    class MyModel(Authored, Editored, Published, Timestamped):
        name = models.CharField(max_length=100)

        # MyModel.objects.authored_by(..) works
        # MyModel.objects.edited_by(..) works
        # MyModel.objects.published() works
        # MyModel.objects.draft() works
        objects = MyModelQuerySet()

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

.. _`Timestamped`: #timestamped-model
.. _`Authored`: #authored-model
.. _`Editored`: #editored-model
.. _`Published`: #published-model
.. _`settings.AUTH_USER_MODEL`: https://docs.djangoproject.com/en/1.10/ref/settings/#std:setting-AUTH_USER_MODEL
.. _`Mixing in with Custom Managers`: #mixing-in-with-custom-managers
.. _`Mixing Multiple Behaviors`: #mixing-in-multiple-behaviors




History
-------

0.1.6 (2017-02-14)
++++++++++++++++++

* Drop python3.3 support for Django 1.8 because 1.8 no longer supports it

0.1.5 (2017-02-14)
++++++++++++++++++

* Fix import error for py2.7 builds

0.1.4 (2017-02-14)
++++++++++++++++++

* Fix Syntax Error

0.1.3 (2017-02-14)
++++++++++++++++++

* Fixed Circular Import

0.1.2 (2017-02-13)
++++++++++++++++++

* Travis CI Fixes

0.1.1 (2017-02-13)
++++++++++++++++++

* First release on PyPI
* Flake8 adherence fixes

0.1.0 (2017-02-13)
++++++++++++++++++

* First push of project


