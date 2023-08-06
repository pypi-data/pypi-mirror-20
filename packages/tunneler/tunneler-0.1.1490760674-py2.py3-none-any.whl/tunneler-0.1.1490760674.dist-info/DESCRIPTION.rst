tunneler: Connect to databases via ssh tunnel
=============================================

A command tool and library to connect to databases with minimal fuss.

To install:

.. code-block:: shell

    $ pip install tunneler

You will probably also need the database drivers for your preferred database. To install the postgres ones automatically when you install ``tunneler``, do this:

.. code-block:: shell

    $ pip install tunneler[pg]

To run:

.. code-block:: shell

    $ tunneler name_of_task name_of_connection

As the above command shows, there are two concepts to understand when running tunneler, ``connections`` and ``tasks``.

Define connections in a ``connections.yaml`` file in your current directory, as follows:

.. code-block:: yaml

    prod:
      remote_host: publicjumpboxservername
      ssh_username: username
      ssh_pkey: |
        -----BEGIN RSA PRIVATE KEY-----
        .......................................
        .......................................
        -----END RSA PRIVATE KEY-----
      private_dburl: postgres://username:password@privatedbservername/databasename
      local_port: 5433

    dev:
      .....

You can also specify an ssh_config variable in the config. ``tunneler`` will then use the values from that hosts ssh config. An example:

.. code-block:: yaml

    prod:
      ssh_config: prod-jumpbox
      private_dburl: postgres://username:password@privatedbservername/databasename
      local_port: 5433

    dev:
      .....

This will use the remote host/username/private key specified in your existing ssh config so you don't need to repeat them in the config file

Tunneler will use this information to set up a local tunneled post where you can access this database directly.

A connection URL to this local port will then be provided to each ``task``.

There are three inbuilt tasks:

  - test_connection (run this one to check your config is correct)
  - do_full_pg_dump (assumes you have pg_dump installed)
  - do_schema_pg_dump (also assumes you have pg_dump installed)

So for example to dump the production schema we'd run the following command:

.. code-block:: shell

    $ tunneler do_schema_pg_dump prod

Custom tasks
------------

Want to define your own tasks? Simply create a tasks.py file (or module) in the current directory.

Define a top level method in this file that accepts a connection url, and that method name will be available as a task.

For instance, the test connection task could be re-implemented as follows:

.. code-block:: python

    from sqlbag import S

    def test_connection_custom(dburl):
        with S(dburl) as s:
            s.execute('select 1')

You'd then run this as follows:

.. code-block:: shell

    $ tunneler test_connection_custom prod

Pretty simple.


