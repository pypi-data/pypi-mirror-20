Navigate and manage Python VirtualEnvs
======================================

At its core, ``envie`` is a set of Bash functions aiming to increase your
productivity when dealing with mundane VirtualEnv tasks, like: creating,
destroying, listing, switching and activating environments.

But ``envie`` really shines when it comes to auto-discovery and auto-activation
of VirtualEnvs relevant to your project (or executable). Just say::

    ~/work/projectx$ envie manage.py migrate

    ~/work/projecty$ envie python tests.py

    ~$ envie python playground/plucky/tests/tests.py

or use it in a hash bang::

    #!/usr/bin/env envie
    import os
    print(os.getenv("VIRTUAL_ENV"))     # test we're running in project env

or, just import it at the beginning of your Python program::

    #!/usr/bin/python
    import envie.require

and in each of these cases the Python script will be executed in the closest
virtual environment (for the definition of the *closest environment* see below,
section `Change/activate environment`).


Summary
-------

- ``envie create`` / ``mkenv [-2|-3|-p <pyexec>] [<envdir>] -- [virtualenv opts]`` - Create virtualenv in ``<env>`` based on Python version ``<pyexec>``.
- ``envie remove`` / ``rmenv`` - Destroy the active environment.
- ``envie go`` / ``chenv [-1] [-q] [-v] [<keywords>]`` - Interactively activate the closest environment (looking down, then up, with ``lsupenv``), optionally filtered by a list of ``<keywords>``.
- ``envie list`` / ``lsenv [-f|-l] [<dir>|"." [<avoid>]]`` - List all environments below ``<dir>`` directory, skipping ``<avoid>`` subdir.
- ``envie find`` / ``lsupenv [-f|-l] [<dir>|"."]`` - Find the closest environments by first looking down and then dir-by-dir up the tree, starting with ``<dir>``.
- ``cdenv`` - ``cd`` to the base dir of the currently active virtualenv (``$VIRTUAL_ENV``).
- ``envie [<keywords>]`` - Activate the closest virtual environment (relative to cwd, filtered by KEYWORDS), but only if it's unambiguous; shortcut for ``envie go -1 -v <keywords>``.
- ``envie python <script>``, ``envie <script>`` - Run python ``script`` in the closest virtual environment.
- ``envie run <command>`` - Execute arbitrary ``command/builtin/file/alias/function`` in the closest virtual environment.
- ``envie index`` - (Re-)index virtual environments (for faster searches with ``locate``).
- ``envie config`` - Interactively configure envie.
- ``envie help`` - Print usage help. For details on a specific command use the '-h' switch (like ``envie go -h``).


Install
-------

For convenience, ``envie`` is packaged and distributed as a Python package. To
install, simply type::

    $ sudo pip install envie
    $ envie config

    # start clean
    $ . ~/.bashrc   # or, open a new shell

The second line above will run a short configuration/setup procedure. If in doubt,
go with the defaults.

By default, ``envie`` sourcing statement is added to your ``.bashrc`` file, ``locate`` 
index is set as a preferred source (it's set to be rebuilt every 15m, or on demand),
with all relevant environments' ancestor dir set to your ``$HOME`` directory.


Examples
--------

Create/destroy
..............

To create a new VirtualEnv in the current directory, just type ``mkenv <envname>``. 
This results with new environment created and activated in ``./<envname>``.
When done with this environment, just type ``rmenv`` to destroy the active env.

::

    stevie@caracal:~/demo$ ls
    stevie@caracal:~/demo$ mkenv env
    Creating python environment in 'env'.
    Using Python 2.7.9 (/usr/bin/python).
    (env)stevie@caracal:~/demo$ ls
    env
    (env)stevie@caracal:~/demo$ pip freeze
    argparse==1.2.1
    wsgiref==0.1.2
    (env)stevie@caracal:~/demo$ rmenv
    stevie@caracal:~/demo$ ls
    stevie@caracal:~/demo$


Change/activate environment
...........................

Use ``chenv`` to activate the closest environment, tree-wise. We first look 
down the tree, then up the tree. If a single Python environment is found,
it's automatically activated. In case the multiple environments are found,
a choice is presented to user.

::

    stevie@caracal:~/demo$ ls -F
    env/ project/ file1 file2 ...
    stevie@caracal:~/demo$ chenv
    (env)stevie@caracal:~/demo$

Assume the following tree exists::

    ~/demo
      |_ project1
      |  |_ env
      |  |  |_ ...
      |  |_ src
      |     |_ ...
      |_ project2
      |  |_ env
      |     |_ ...

Now, consider you work in ``~/demo/project1/src/deep/path/to/module``, but keep the environment
in the ``env`` parallel to ``src``. Instead of manually switching to ``env`` and activating it with 
something like ``source ../../../../../env/bin/activate``, just type ``chenv`` (``che<TAB>`` should
actually do it, if you use tab completion)::

    stevie@caracal:~/demo/project1/src/deep/path/to/module$ chenv
    (env)stevie@caracal:~/demo/project1/src/deep/path/to/module$ which python
    /home/stevie/demo/project1/env/bin/python

On the other hand, if there are multiple environments to choose from, you'll get a prompt::

    stevie@caracal:~/demo$ chenv
    1) ./project1/env
    2) ./project2/env
    #? 2
    (env)stevie@caracal:~/demo$ which python
    /home/stevie/demo/project2/env/bin/python


Search/list environments
........................

To search down the tree for valid Python VirtualEnvs, use ``lsenv``.
Likewise, to search up the tree, level by level, use ``lsupenv``.
``chenv`` uses ``lsupenv`` when searching for environment to activate.



Enable faster search
--------------------

By default, ``envie`` uses the ``find`` command to search for environments. That
approach is pretty fast when searching shallow trees. However, if you have a
deeper directory trees, it's often faster to use a pre-built directory index
(i.e. the ``locate`` command). To enable a combined ``locate/find`` approach to
search, run ``envie config``::

    $ envie config
    Add to ~/.bashrc (strongly recommended) [Y/n]?
    Use locate/updatedb for faster search [Y/n]?
    Common ancestor dir of all environments to be indexed [/]:
    Update index periodically (every 15min) [Y/n]?
    Refresh stale index before each search [Y/n]?
    Envie already registered in /home/stevie/.bashrc.
    Config file written to /home/stevie/.config/envie/envierc.
    Crontab updated.
    Indexing environments in '/'...Done.

>From now on, the combined approach is used by default (if not overriden with
``-f`` or ``-l`` switches). In the combined approach, if `find` doesn't finish
within 400ms, search via ``find`` is aborted and ``locate`` is allowed to finish
(faster).


