===================
edw.seleniumtesting
===================

Selenium based automated testing.


Installation
------------
This package requires **Python 3.5**!
::

    $ pip install -U https://github.com/eaudeweb/edw.seleniumtesting/archive/master.zip
    $ seleniumtesting -h



Usage
-----

By itself this product doesn't do anything. You must provide test suites to be run in the form of pkg_resource plugins.
The ``edw.seleniumtesting.sample`` suite is registered in such a way to provide an example.

In your own package, after writing the suite (refer to ``edw.seleniumtesting.sample``) you must the following to the
``setup.py`` of your package (the sample suite is registered in the same way): ::

    entry_points={
        'edw.seleniumtesting': [
            'my.package.test1 = my.package.test1:suite',
            'my.package.test2 = my.package.test2:suite',
            'my.package.test3 = my.package.test3:suite',
            [...]
        ]
    }

and ``pip install my.package``. Modifying the list of tests defined in the ``entry_points`` will require a
re-installation of your package (re-run pip/setuptools/buildout).


To run the ``my.package.test1``, ``my.package.test2`` and ``my.package.test3`` tests in Firefox,
specifying the path to ``geckodriver`` at the default ``1024x768`` resolution: ::

    $ seleniumtesting -v -B firefox -P /usr/bin/geckodriver https://localhost my.package.test1 my.package.test2 my.package.test3


To run all tests in phantomjs in glorious 4K resolution: ::

    $ seleniumtesting -v -B phantomjs -P /usr/bin/phantomjs -sw 3840 -sh 2160 https://localhost

Failed tests and tests that encounter an error will save a screenshot in the current working directory.



Extra arguments
---------------

Some test suites might make use of extra arguments (e.g. to provide user account credentials).
These can be given using the ``-ea`` or ``--extra-arg`` parameter. For example: ::

  seleniumtesting http://localhost ns.some.test -ea labels login "Login Button" -ea users testuser testuserpwd

The arguments will be passed to ``suite`` as extra_args. Make sure to instantiate your ``BrowserTestCase`` subclass with ``extra_args`` as well. You will then be able to read the args in the test from ``self.extra_args``.

For the example provided above, ``self.extra_args`` will look like this: ::

  {
      'labels': { 'login':    'Login Button' },
      'users':  { 'testuser': 'testuserpwd'  }
  }


Contribute
----------

- Issue Tracker: https://github.com/eaudeweb/edw.seleniumtesting/issues
- Source Code: https://github.com/eaudeweb/edw.seleniumtesting
- Documentation: https://github.com/eaudeweb/edw.seleniumtesting/wiki


License
-------

The project is licensed under the GPLv3.
