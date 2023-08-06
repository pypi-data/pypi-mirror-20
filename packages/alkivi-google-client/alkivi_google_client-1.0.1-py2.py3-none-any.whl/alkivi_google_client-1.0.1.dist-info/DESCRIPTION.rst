python-alkivi-google-client
===========================

|Build Status| |Requirements Status|

Google python client used at Alkivi

Package
-------

Example

.. code:: python

    from alkivi.google import client as google
    import logging

    scope = 'https://www.googleapis.com/auth/admin.directory.user.readonly'
    google_client = google.Client(scopes=[scope])

    # Get directory client for Admin SDK api
    impersonate = 'toto@alkivi.fr'
    directory_client = google_client.get_directory_client(impersonate)

Credentials are check from - ./google.conf - $HOME/.google.conf -
/etc/google.conf

Tests
-----

Testing is set up using `pytest <http://pytest.org>`__ and coverage is
handled with the pytest-cov plugin.

Run your tests with ``py.test`` in the root directory.

Coverage is ran by default and is set in the ``pytest.ini`` file. To see
an html output of coverage open ``htmlcov/index.html`` after running the
tests.

TODO

Travis CI
---------

There is a ``.travis.yml`` file that is set up to run your tests for
python 2.7 and python 3.2, should you choose to use it.

TODO

.. |Build Status| image:: https://travis-ci.org/alkivi-sas/python-alkivi-google-client.svg?branch=master
   :target: https://travis-ci.org/alkivi-sas/python-alkivi-google-client
.. |Requirements Status| image:: https://requires.io/github/alkivi-sas/python-alkivi-google-client/requirements.svg?branch=master
   :target: https://requires.io/github/alkivi-sas/python-alkivi-google-client/requirements/?branch=master


