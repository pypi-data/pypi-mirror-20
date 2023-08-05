..
   .. include:: ../CONTRIBUTING.rst

Developer guide
===============

Summary
----------

- use the issue tracker
- create feature branches and submit pull requests


Setting up a local copy
-------------------------

See installation section :ref:`installation-from-sources`.

Branching/development model
----------------------------

The development model is based on a stable *master* branch and an
unstable *develop* branch. The *master* branch should be used in
production. Pushing to master/develop has been disabled; only pull
requests from feature branches are permitted.

Feature branches
^^^^^^^^^^^^^^^^^

When creating a feature branch, make sure you branch off develop:

.. code-block:: console
		
   $ git checkout develop
   $ git checkout -b "myfeature"


Once you've added the feature you want, push the branch to bitbucket
and create a pull request.

Hotfixes
^^^^^^^^^

Occasionally, things break on the master branch that require immediate
fixing. This is what hotfixes are for. Importantly, updates to master
must also be merged immediately with develop to keep it in sync.
gitflow (see following section) has builtin support for hotfixes.

Ideally, *all* hotfixes should be accompanied by a regression test, so
that the error doesn't pop up again.

Using gitflow
^^^^^^^^^^^^^^^^^

It may help to use `gitflow`_ to organise work. gitflow adds helper
commands to work with the `Vincent Driessen's branching model
<http://nvie.com/posts/a-successful-git-branching-model/>`_. The
commands simplify the task of creating feature branches and hotfixes.

To setup gitflow, issue the following in the source code directory:

.. code-block:: console
		
   $ git flow init

which produces (press ENTER at each question):

.. code-block:: console
		
   Which branch should be used for bringing forth production releases?
      - master
   Branch name for production releases: [master] 
   Branch name for "next release" development: [develop] 

   How to name your supporting branch prefixes?
   Feature branches? [feature/] 
   Bugfix branches? [bugfix/] 
   Release branches? [release/] 
   Hotfix branches? [hotfix/] 
   Support branches? [support/] 
   Version tag prefix? [] 
   Hooks and filters directory? [/path/to/source/.git/hooks] 


Then, to create a feature branch, simply type

.. code-block:: console

   $ git flow feature start test


which produces

.. code-block:: console
		
   Switched to a new branch 'feature/test'

   Summary of actions:
     - A new branch 'feature/test' was created, based on 'develop'
     - You are now on branch 'feature/test'

   Now, start committing on your feature. When done, use:

       git flow feature finish test



Issues
---------

For all problems, small or large, use the issue tracker instead of
sending emails! The main motivation is that all developers should be
able to follow the discussion and history of any issue of general
interest.

Adding a workflow
----------------------

.. note::

   WIP: Describe minimum requirements, including
   
   1. tests for all sample organizations
   2. example snakefiles and configurations

   

Continuous integration
-------------------------

As the number of collaborators on a project grows, code integration
problems frequently occur. `Continuous integration`_ is a method for
dealing with these issues. Typically, whenever a push is done to the
repository, tests are automatically run on a test server; `travis`_ is
a popular continuous integration service for github-hosted
repositories. Unfortunately, travis does not offer support for
bitbucket repositories. bitbucket has recently added a service called
*Pipelines* which gives some support for CI.
		
.. _gitflow: https://github.com/nvie/gitflow
.. _Continuous integration: https://en.wikipedia.org/wiki/Continuous_integration
.. _travis: https://travis-ci.org/
