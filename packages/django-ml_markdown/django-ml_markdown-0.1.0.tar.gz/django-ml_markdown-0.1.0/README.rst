django-ml\_markdown
===================

This django app provides some features for handling markdown in yout
django based website:

-  template\_tags for parsing Markdown code to html and cleaning it
-  A form field for editing markdown code and preview the html output

Installation
------------

Dependencies
~~~~~~~~~~~~

This app use `misaka <https://github.com/FSX/misaka>`__, a binding for
hoedown that use CFFI. You may need to install some package in order to
build cffi

On fedora (adapt for your on system or the version of python you xant to
use)

.. code:: bash

    dnf install libffi-devel python3-devel
    # on fedora, you may need to install this
    dnf install redhat-rpm-config

The actual installation
~~~~~~~~~~~~~~~~~~~~~~~

Just install it with pip

.. code:: bash

    pip install django-ml_markdown

Usage
-----

settings.py
~~~~~~~~~~~

Add the path to the configuration class in INSTALLED\_APPS

.. code:: python

    INSTALLED_APP.append(
        'ml_markdown.apps.MlMarkdownConfig'
    )

you can also inherit this class for custom settings. See the
documentation for details.

Use in templates
~~~~~~~~~~~~~~~~

You can use one of this filters in your templates:

-  **to\_html**: parse markdown code to html without cleaning it.
-  **clean**: clean html code with the white list provides as arguments
   or in the class used for configuration
-  **to\_cleaned\_html**: shortcut for\ ``| to_html | clean``

Some over filter can be found in the documentation.
