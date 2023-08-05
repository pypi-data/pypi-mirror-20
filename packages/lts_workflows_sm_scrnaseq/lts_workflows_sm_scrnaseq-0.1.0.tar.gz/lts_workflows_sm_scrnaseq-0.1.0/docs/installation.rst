.. highlight:: shell

Installation
============


Stable release
--------------

To install lts_workflows_sm_scrnaseq, run this command in your terminal:

.. code-block:: console

    $ conda install lts-workflows-sm-scrnaseq

This is the preferred method to install lts_workflows_sm_scrnaseq, as it will
always install the most recent stable release.

From sources
------------

The sources for lts_workflows_sm_scrnaseq can be downloaded from the `Bitbucket repo`_.

.. code-block:: console

    $ git clone git@bitbucket.org:scilifelab-lts/lts-workflows-sm-scrnaseq.git

Once you have a copy of the source, you can install it with:

.. code-block:: console

    $ python setup.py install


.. _Bitbucket repo: https://bitbucket.org/scilifelab-lts/lts-workflows-sm-scrnaseq

Tests
======

If :mod:`lts_workflows_sm_scrnaseq` has been installed as a module, run

.. code-block:: console

   $ pytest -v -s --pyargs lts_workflows_sm_scrnaseq

In order to load the pytest options provided by the module, the full
path to the test suite needs to be given:

.. code-block:: console

   $ pytest -v -s -rs /path/to/lts_workflows_sm_scrnaseq/tests
   
