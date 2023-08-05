.. _bob.install:

***************************
 Installation Instructions
***************************

You can either compile bob or use the provided binary packages.

=====================
 Binary Installation
=====================

We offer pre-compiled binary installations of Bob using `conda`_.

Conda (Linux and MacOSX 64-bit)
-------------------------------

.. note::

   Please install and get familiar with `conda`_ first by referring to their
   website before getting started.

The commands below will you give you a minimal bob environment. Continue
reading for more detailed instructions.

.. code:: sh

   $ conda update -n root conda
   $ conda config --set show_channel_urls True
   $ conda config --add channels defaults
   $ conda config --add channels https://www.idiap.ch/software/bob/conda
   $ conda create -n bob_py27 --override-channels -c https://www.idiap.ch/software/bob/conda -c defaults python=2.7 bob
   $ source activate bob_py27
   $ python -c 'import bob.io.base'

.. warning::

   The packages in our channel are not API/ABI compatible with packages in
   other user/community channels (especially ``conda-forge``). We can only
   guarantee that the packages in our channel is compatible with the
   ``defaults`` channel.


Detailed installation instructions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

`Anaconda`_ is a python distribution which comes with `conda`_ as its package
manager besides ``pip``. `conda`_ can package every program and not just python
libraries. `conda`_ packages are usually compiled binary packages and you do
not need to compile them.

To get started install `Miniconda`_ (recommended) or `Anaconda`_ (Anaconda
comes with `Miniconda`_ and some extra packages already installed).

* Make sure that `conda`_ is in your path and get familiar with `conda`_ by
  reading their webpage:

.. code:: sh

   $ which conda
   $ conda update -n root conda

* Add our conda channel:

.. code:: sh

   $ conda config --add channels defaults
   $ conda config --add channels https://www.idiap.ch/software/bob/conda

* Create a new environment:

.. code:: sh

   $ conda create -n bob_py27 python=2.7 bob

.. note::

   you can specify the version of python and bob that you want to use here. For
   example, ``conda create -n bob-2.5.1_py35 python=3.5 bob=2.5.1``.

* Activate the environment:

.. code:: sh

   $ source activate bob_py27

.. warning::

   You **always** need to activate your environments using ``source activate
   environment_name`` before you start using them (each time you open a new
   terminal).

* Install other `conda`_ packages that you may want to use:

.. code:: sh

   $ conda install sphinx nose

* Bob has many `packages`_ but only the core packages get installed with bob
  (mainly the C++ packages). You can install the extra `packages`_ using
  ``pip``. For example, to install the ``bob.bio`` framework:

.. code:: sh

   $ pip install bob.bio.base bob.bio.face bob.bio.spear bob.bio.video bob.bio.gmm

* To see which bob packages are already installed:

.. code:: sh

   $ conda list bob

And now you are ready to run your programs.

.. doctest:: coretest
   :options: +NORMALIZE_WHITESPACE

   >>> import bob.io.base
   >>> ...

.. note:: 

   Now that you have all the dependencies and required Bob packages installed,
   it is a good idea to follow our :doc:`temp/bob.extension/doc/buildout` page
   to see how you can fine tune your installations. Remember to use the
   ``python`` that you installed with ``conda create -n ...`` earlier. Our
   ``zc.buildout`` scripts usually pulls some extra python libraries such as
   ``sphinx`` and ``nose``. You can install those with `conda`_ first to avoid
   their compilation on your pc.


==========================
 Stable bob installations
==========================

You can use the ``anaconda`` package to get super stable Bob installations.
However, you will end up with very large environments with a lot of packages
that you may not use. To create such an environment:

.. code:: sh

    export PY_VER="2.7"
    export BOB_VER="2.6.1"
    export ANACONDA_VER="4.3.0"
    export ENV_NAME="bob-$BOB_VER-$PY_VER"
    conda create --yes -n $ENV_NAME --override-channels -c https://www.idiap.ch/software/bob/conda -c defaults python=$PY_VER anaconda=$ANACONDA_VER bob=$BOB_VER
    source activate $ENV_NAME

There is only one compatible anaconda version for each version of Bob. For
example bob ``2.5.1`` works only with anaconda ``4.2.0`` (as far as we have
tested). Here is a table that lists compatible versions:

+-------------+------------------+
| Bob version | Anaconda version |
+=============+==================+
| 2.5.1       | 4.2.0            |
+-------------+------------------+
| 2.6.2       | 4.3.0            |
+-------------+------------------+


=======================
 Compiling from Source
=======================

Following, you will find the software dependencies required for Bob's
compilation and instructions on how to install all the equivalent
software packages.


Dependencies
------------

This section describes software dependencies required for Bob's compilation
**and** runtime.

.. note::

   We keep here a comprehensive list of **all** packages you may need to
   compile most of the available Bob packages. You may not need all this
   software for special deployments. You should choose whatever suits you best.
   If you have problems or would like to report a success story, please use our
   `mailing list`_ for discussions.

+----------------+--------+-----------------------------+-------------------------+
| Library        | Min.   | License                     | Notes                   |
|                | Versio |                             |                         |
|                | n      |                             |                         |
+================+========+=============================+=========================+
| Std. C/C++     | any    | Depends on the compiler     | Required by all         |
| Libraries      |        |                             | packages with C/C++     |
|                |        |                             | bindings                |
+----------------+--------+-----------------------------+-------------------------+
| `Blitz++`_     | 0.10   | `Artistic-2.0`_ or LGPLv3+  | Required by all         |
|                |        | or GPLv3+                   | packages with C/C++     |
|                |        |                             | bindings                |
+----------------+--------+-----------------------------+-------------------------+
| `Lapack`_      | any    | BSD-style                   | Required by             |
|                |        |                             | ``bob.math``            |
+----------------+--------+-----------------------------+-------------------------+
| `Python`_      | 2.5    | `Python-2.0`_               | Required by all         |
|                |        |                             | packages                |
+----------------+--------+-----------------------------+-------------------------+
| `Boost`_       | 1.34   | `BSL-1.0`_                  | Required by all         |
|                |        |                             | packages with C/C++     |
|                |        |                             | bindings                |
+----------------+--------+-----------------------------+-------------------------+
| `HDF5`_        | 1.8.4  | `HDF5 License`_ (BSD-like,  | Required by all I/O     |
|                |        | 5 clauses)                  | operations (direct or   |
|                |        |                             | indirect dependencies   |
|                |        |                             | to ``bob.io.base``)     |
+----------------+--------+-----------------------------+-------------------------+
| `libpng`_      | 1.2.42 | `libpng license`_           | Required by all         |
|                | ?      |                             | packages that do image  |
|                |        |                             | I/O and manipulation    |
|                |        |                             | (depend directly or     |
|                |        |                             | indirectly on           |
|                |        |                             | ``bob.io.image``)       |
+----------------+--------+-----------------------------+-------------------------+
| `libtiff`_     | 3.9.2  | BSD-style                   | Required by all         |
|                |        |                             | packages that do image  |
|                |        |                             | I/O and manipulation    |
|                |        |                             | (depend directly or     |
|                |        |                             | indirectly on           |
|                |        |                             | ``bob.io.image``)       |
+----------------+--------+-----------------------------+-------------------------+
| `giflib`_      | 4.1.6- | `MIT`_                      | Required by all         |
|                | 9      |                             | packages that do image  |
|                |        |                             | I/O and manipulation    |
|                |        |                             | (depend directly or     |
|                |        |                             | indirectly on           |
|                |        |                             | ``bob.io.image``)       |
+----------------+--------+-----------------------------+-------------------------+
| `libjpeg`_     | 6.2?   | `GPL-2.0`_ or later (also   | Required by all         |
|                |        | commercial)                 | packages that do image  |
|                |        |                             | I/O and manipulation    |
|                |        |                             | (depend directly or     |
|                |        |                             | indirectly on           |
|                |        |                             | ``bob.io.image``)       |
+----------------+--------+-----------------------------+-------------------------+
| `FFMpeg`_ or   | 0.5    | `LGPL-2.1`_ or later, or    | Required by all         |
| `libAV`_       | (ffmpe | `GPL-2.0`_ or later         | packages that do video  |
|                | g)     |                             | I/O and manipulation    |
|                | or 0.8 |                             | (depend directly or     |
|                | (libav |                             | indirectly on           |
|                | )      |                             | ``bob.io.video``)       |
+----------------+--------+-----------------------------+-------------------------+
| `MatIO`_       | 1.3.3? | `BSD-2-Clause`_             | Required by all         |
|                |        |                             | packages that do Matlab |
|                |        |                             | I/O and manipulation    |
|                |        |                             | (depend directly or     |
|                |        |                             | indirectly on           |
|                |        |                             | ``bob.io.matlab``)      |
+----------------+--------+-----------------------------+-------------------------+
| `VLFeat`_      | 0.9.14 | `BSD-2-Clause`_             | Required by             |
|                |        |                             | ``bob.ip.base`` and all |
|                |        |                             | dependents              |
+----------------+--------+-----------------------------+-------------------------+
| `LIBSVM`_      | 2.89+  | `BSD-3-Clause`_             | Required by             |
|                |        |                             | ``bob.learn.libsvm``    |
|                |        |                             | and all dependents      |
+----------------+--------+-----------------------------+-------------------------+
| `CMake`_       | 2.8    | `BSD-3-Clause`_             | Required by all         |
|                |        |                             | packages with C/C++     |
|                |        |                             | bindings. **Use at      |
|                |        |                             | least CMake 2.8.12 on   |
|                |        |                             | Mac OS X**.             |
+----------------+--------+-----------------------------+-------------------------+
| `Dvipng`_      | 1.12?  | `GPL-3.0`_                  | Required by all         |
|                |        |                             | packages (documentation |
|                |        |                             | generation)             |
+----------------+--------+-----------------------------+-------------------------+
| `LaTeX`_       | any    | ?                           | Required by all         |
|                |        |                             | packages (documentation |
|                |        |                             | generation). You will   |
|                |        |                             | also need to install    |
|                |        |                             | the Extra-Latex fonts   |
|                |        |                             | package.                |
+----------------+--------+-----------------------------+-------------------------+
| `pkg-config`_  | any    | `GPL-2.0`_                  | Required to find        |
|                |        |                             | dependencies while      |
|                |        |                             | building bob packages.  |
+----------------+--------+-----------------------------+-------------------------+

Here is a list of Python packages software that is also used by Bob. It is not
required that such software be installed at the moment you compile Bob. It will
be fetched automatically from PyPI otherwise.

+---------------+-----+-----------------+------------------------------------------+
| Library       | Min | License         | Notes                                    |
|               | .   |                 |                                          |
|               | Ver |                 |                                          |
|               | sio |                 |                                          |
|               | n   |                 |                                          |
+===============+=====+=================+==========================================+
| `NumPy`_      | 1.3 | `BSD-3-Clause`_ | Required by all packages. If not         |
|               |     |                 | installed natively on your machine, may  |
|               |     |                 | not correctly use *optimized* LaPACK or  |
|               |     |                 | BLAS implementations. Consequently,      |
|               |     |                 | ``bob.math`` will *not* either.          |
+---------------+-----+-----------------+------------------------------------------+
| `SciPy`_      | 0.7 | `BSD-3-Clause`_ | Required at least by ``bob.ap``,         |
|               | ?   |                 | ``bob.learn.boosting``,                  |
|               |     |                 | ``bob.ip.optflow.hornschunk`` and        |
|               |     |                 | ``facereclib``                           |
+---------------+-----+-----------------+------------------------------------------+
| `Matplotlib`_ | 0.9 | Based on        | Required for plotting                    |
|               | 9   | `Python-2.0`_   |                                          |
+---------------+-----+-----------------+------------------------------------------+
| `SQLAlchemy`_ | 0.5 | `MIT`_          | Required by all database accessor        |
|               |     |                 | packages (i.e., any that starts with     |
|               |     |                 | ``bob.db``)                              |
+---------------+-----+-----------------+------------------------------------------+
| `nose`_       | 1.0 | `LGPL-2.1`_     | For unit testing, on all packages        |
|               | ?   |                 |                                          |
+---------------+-----+-----------------+------------------------------------------+
| `Sphinx`_     | 0.6 | `BSD-2-Clause`_ | Required by all packages (documentation  |
|               |     |                 | generation)                              |
+---------------+-----+-----------------+------------------------------------------+
| `Setuptools`_ | 8.0 | `Python-2.0`_   | Required by all packages (Buildout and   |
|               |     |                 | package compilation)                     |
+---------------+-----+-----------------+------------------------------------------+
| `Pillow`_     | 1.7 | BSD-like        | Required by at least ``bob.io.video``    |
|               | .x? |                 | and ``bob.ip.optflow.liu``               |
+---------------+-----+-----------------+------------------------------------------+
| `IPython`_    | any | `BSD-3-Clause`_ | Recommended as interactive prompt        |
+---------------+-----+-----------------+------------------------------------------+


Setting up a Development Environment using Conda
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Please look at :download:`this script <from-scratch.sh>`
that lets you setup a `conda`_ environment for |project| development and
installs all the dependencies in one shot.


Installing |project| from source
--------------------------------

Once the dependecies are installed you can use buildout (for production) or pip
(for experts) to install |project| from source.

Using ``zc.buildout`` (for production)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Please read our :doc:`temp/bob.extension/doc/buildout` page for instructions on
how to install |project| packages. This is the recommended way to install bob
from PyPI instead of pip.


Using ``pip`` (for experts)
^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is also possible to install Bob packages using ``pip``, globally or on your
private ``virtualenv``, if that is the way you like your Python work
environments. Differently than with ``zc.buildout``, you will need to manually
install all packages you need (directly or indirectly), as
``pip``/``setuptools`` has presently no way to coherently install Python
packages that depend on each other *for building*, such as is the case of many
Bob packages.

For example, to install ``bob.io.image`` in a newly created virtual
environment, here is the sequence of commands to execute:

.. code:: sh

   $ pip install numpy
   $ pip install bob.extension
   $ pip install bob.blitz
   $ pip install bob.core
   $ pip install bob.io.base
   $ pip install bob.io.image

.. note::

   Each ``pip`` command must be executed separately, respecting the inter-
   package dependency.

   The following will **not** work as expected:

   .. code:: sh

      $ #Do not do this:
      $ pip install numpy bob.io.image

The dependency of |project| core packages can be summarized into 8 layers and
the following script can be used to install all core |project| packages using
``pip``:

.. code:: sh

   $ bash pip_install_bob.sh
   -------------------------
   #!/bin/bash
   set -e
   
   get_layer() {
   case $1 in
     1)
       packages=("bob.extension")
       ;;
     2)
       packages=("bob.blitz")
       ;;
     3)
       packages=("bob.core" "bob.ip.draw")
       ;;
     4)
       packages=("bob.io.base" "bob.sp" "bob.math")
       ;;
     5)
       packages=("bob.ap" "bob.measure" "bob.db.base" "bob.io.image" "bob.io.video" "bob.io.matlab" "bob.ip.base" "bob.ip.color" "bob.ip.gabor" "bob.learn.activation" "bob.learn.libsvm" "bob.learn.boosting")
       ;;
     6)
       packages=("bob.io.audio" "bob.learn.linear" "bob.learn.mlp" "bob.db.wine" "bob.db.mnist" "bob.db.atnt" "bob.ip.flandmark" "bob.ip.facedetect" "bob.ip.optflow.hornschunck" "bob.ip.optflow.liu")
       ;;
     7)
       packages=("bob.learn.em" "bob.db.iris")
       ;;
     8)
       packages=("bob")
       ;;
   esac
   }
   
   for layer in `seq 1 8`;
   do
     get_layer ${layer}
     for pkg in "${packages[@]}";
     do
       pip install $pkg
     done
   done


Hooking-in privately compiled externals
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you have placed external libraries outside default search paths, make sure
you set the environment variable ``BOB_PREFIX_PATH`` to point to the root of
the installation paths for those, **before** you run ``pip install...``:

.. code:: sh

    $ export BOB_PREFIX_PATH="/path/to/my-install:/path/to/my-other-install"
    $ pip install numpy
    $ pip install bob.io.image
    ...

Package development
~~~~~~~~~~~~~~~~~~~

You can develop your package as per-usual, no special restrictions apply. You
may refer to our :doc:`temp/bob.extension/doc/guide` for further hints and
tips. In this case, ignore ``zc.buildout`` setup instructions.

====================
 Available packages
====================

For a comprehensive list of packages that are either part of |project| or use
|project|, please visit `packages`_.

=====================
 Supported platforms
=====================

Currently our packages are being compiled and tested against Python 2.7, 3.4,
and 3.5 on Linux and MacOSX 64bit machines.


.. include:: links.rst
