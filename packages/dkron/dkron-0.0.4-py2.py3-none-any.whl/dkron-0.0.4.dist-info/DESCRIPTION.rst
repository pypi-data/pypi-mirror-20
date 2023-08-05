dkron-python
============

|Build Status|

Command line interface client and python library for
`Dkron <http://dkron.io/>`__.

Prerequisites
-------------

-  Pytnon 3

Installing
----------

To install use pip:

.. code:: console

    pip install dkron

Or clone the repo:

.. code:: console

    git clone https://github.com/Eyjafjallajokull/dkron-python.git
    python setup.py install

CLI Usage
---------

Before you begin, set environment variable ``DKRON_HOSTS`` to point
running dkron instance.

.. code:: console

    export DKRON_HOSTS=http://my-dkron.example.com,http://my-dkron-2.example.com:8080

Alternatively, you can instert ``--hosts`` argument to every invocation
of dkron-cli.

Fetch all jobs
^^^^^^^^^^^^^^

.. code:: console

    dkron-cli get jobs

It works well with ``jq``, to list all job names:

.. code:: console

    dkron-cli get jobs | jq '.[].name'

Fetch specific job
^^^^^^^^^^^^^^^^^^

.. code:: console

    dkron-cli get job [job_name]

Create or update job
^^^^^^^^^^^^^^^^^^^^

.. code:: console

    dkron-cli apply job [json_file] ...

You can pass multiple files at once.

Execute job
^^^^^^^^^^^

.. code:: console

    dkron-cli run [job_name]

Delete job
^^^^^^^^^^

.. code:: console

    dkron-cli delete job [job_name]

Cluster status
^^^^^^^^^^^^^^

.. code:: console

    dkron-cli get status
    dkron-cli get leader
    dkron-cli get members

Library Usage
-------------

.. code:: python

    from dkron import Dkron

    hosts = ['http://localhost:8080']
    api = Dkron(hosts)
    print(api.get_job('my-dkron-job')['error_count'])
    api.run_job('my-dkron-job')

Running tests
-------------

.. code:: console

    make test
    make coverage

.. |Build Status| image:: https://travis-ci.org/Eyjafjallajokull/dkron-python.svg?branch=master
   :target: https://travis-ci.org/Eyjafjallajokull/dkron-python


