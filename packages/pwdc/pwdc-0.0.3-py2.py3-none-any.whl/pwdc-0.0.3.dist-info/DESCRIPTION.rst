pwd-cli
=========

*A simple python CLI for your on-premise instance of Play With Docker*


*Create a 5 node Cluster Swarm in 5 seconds!*


Purpose
-------

This is a CLI that allows you to create, connecte to, view, and delete 
instances of Play-With-Docker.

- You Need to have an instance of [Play-With-Docker](https://github.com/franela/play-with-docker) without the Capcha test.

The Goal of this project is to allow you or your users to quickly create ready to uses clusters swarm, and uses it without
leaving your terminal.

Installation
------------

The easiest way is to install from Pypi library::

    $ pip install pwdc


Usage
-----

You can just uses the following commands to create and use your cluster::

    $ pwdc init --pwd-url=http://<your-pwd-server>

Initialise the pwdc configuration file in ~/.pwdc.
You need to update the ~/.pwdc value with the url of your PWD instance if not given the `--pwd-url` parameter::

    $ pwdc create

This will uses the PWD instance from your `~/.pwdc` file, then :

- create a PWD session
- create 5 nodes
- init a swarm with a master on node1
- join the swarm from the node2 to node5
- provides informations on your cluster

The Cluster is ready to uses, just point your docker CLI on the new Swarm::


    $ eval $(pwdc env)
    $ docker info


>From then, you can manipulaite the swarm cluster with your docker or docker-compose CLI::

    $ pwdc info

Show you the informations about your PWD session.


You can have multiple PWD session, this is manage with the `--session_file` parameter, which locally store your PWD session informations.


After a while, the session will be aumatically deleted, but you can also delete it manually when you are done with your session::

    $ pwdc delete
    $ eval $(pwdc env -u)

the last eval if to reset your docker client config



Contribution
------------

If you've cloned this project, and want to install the library (*and all
development dependencies*), the command you'll want to run is::

    $ pip install -e .[test]

If you'd like to run all tests for this project (*assuming you've written
some*), you would run the following command::

    $ python setup.py test

This will trigger `py.test <http://pytest.org/latest/>`_, along with its popular
`coverage <https://pypi.python.org/pypi/pytest-cov>`_ plugin.

Lastly, if you'd like to cut a new release of this CLI tool, and publish it to
the Python Package Index (`PyPI <https://pypi.python.org/pypi>`_), you can do so
by running::

    $ python setup.py sdist bdist_wheel
    $ twine upload dist/*

This will build both a source tarball of your CLI tool, as well as a newer wheel
build (*and this will, by default, run on all platforms*).

The ``twine upload`` command (which requires you to install the `twine
<https://pypi.python.org/pypi/twine>`_ tool) will then securely upload your
new package to PyPI so everyone in the world can use it!



Crédit
------

This Works is based on the [skele-cli](https://github.com/rdegges/skele-cli) python cli project skeleton
and uses the powerfull opensource project [Play-With-Docker](https://github.com/franela/play-with-docker).



