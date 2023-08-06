PyFBA
=====

A python implementation of flux balance analysis to model microbial
metabolism

About PyFBA
-----------

PyFBA is a Python flux-balance-analysis package that allows you to build
models from genomes, gapfill models, and run flux-balance-analysis on
that model. The aim of PyFBA is to provide an extensible, python-based
platform for FBA work.

PyFBA is being developed by Daniel Cuevas, Taylor O'Connell, and Rob
Edwards in Rob's bioinformatics group at San Diego State University
together with help from Janaka Edirisinghe, Chris Henry, Ross Overbeek
and others at Argonne National Labs.

Installing PyFBA
----------------

To use PyFBA you need Python 2.7 or greater, and you need to install the
GNU GLPK and a Python wrapper for that program, pyGLPK available from
github.

We also leverage the Model SEED GitHub repository with all the latest
biochemistry tables.

Our installation page has detailed instructions on installing PyFBA and
getting everything running.

Getting Started with PyFBA
--------------------------

Once you have installed GLPK, PyGLPK, and PyFBA, you will most likely
want to build a model from a genome, gap fill that model, and test it
for growth on different media. We have detailed instructions that walk
you through the step-by-step procedures that you need to use to run flux
balance analysis on your own genome.

Copyright and License

PyFBA is copyright Daniel Cuevas, Taylor O'Connell, and Rob Edwards, and
is released under the MIT license.
