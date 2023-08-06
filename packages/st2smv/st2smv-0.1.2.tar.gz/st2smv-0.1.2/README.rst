Overview
========

``st2smv`` is a tool for converting programmable logic controller (PLC)
code to a formal model, and checking whether the model satisfies various
properties (e.g., temporal logic specifications). As its name implies,
``st2smv`` can process PLC code written in a subset of the Structured
Text (ST) programming language, and produces models in the SMV language.

Basic Use
=========

Run the command

.. code:: bash

    st2smv --help

to see a summary of how to use ``st2smv``.

Consider the following ST program with 3 boolean variables:

.. code:: text

    x1 := x2;
    x2 := NOT x1;
    x3 := NOT (x1 = x2);

and the specification

.. code:: text

    SPEC AG(x3);

To convert the file ``code.st`` to a model, run the command

.. code:: bash

    st2smv --convert --input code.st --output-directory outdir

where ``outdir`` is the directory where you want to save the output. You
should now have the following files:

.. code:: text

    .
    ├── code.st
    ├── outdir
    │   ├── ast.json
    │   └── model.json
    └── spec.smv

``ast.json`` contains the abstract syntax tree (AST) of the code, and
``model.json`` is the model, stored in an intermediate representation.

To produce an SMV model (including the specification), run the command

.. code:: bash

    st2smv --combine --input outdir/model.json spec.smv | tee outdir/model.smv

which will print the model and write it to the file
``outdir/model.smv``.

Finally, run the command

.. code:: bash

    NuSMV outdir/model.smv

to check the specification (which is true).

Structure of the Model
======================

In progress...

Advanced Use
============

In progress...

Installation
============

To install ``st2smv`` from the Python Package Index (PyPI), run the
command

.. code:: bash

    pip install st2smv

If you have instead obtained this package from another source and wish
to install that copy, run the command

.. code:: bash

    pip install st2smv_directory

where ``st2smv_directory`` is the location of this directory (i.e., the
directory that contains the file ``setup.py``).

Dependencies
------------

``st2smv`` converts PLC code to a formal model, which then must be
analyzed using a solver. The current version of ``st2smv`` produces
models that can be analyzed using
`SynthSMV <https://bitbucket.org/blakecraw/synthsmv>`__, which must be
installed separately. `NuSMV <http://nusmv.fbk.eu>`__ (which SynthSMV is
based on) can be used to check some, but not all, of the models that
``st2smv`` produces.

License
=======

`GPLv3+ <https://www.gnu.org/licenses/gpl.html>`__: The GNU General
Public License, version 3, or (at your option) any later version.
