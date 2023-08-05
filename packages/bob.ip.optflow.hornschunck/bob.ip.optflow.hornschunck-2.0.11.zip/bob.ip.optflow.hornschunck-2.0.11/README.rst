.. vim: set fileencoding=utf-8 :
.. Mon 15 Aug 2016 18:33:46 CEST

.. image:: http://img.shields.io/badge/docs-stable-yellow.svg
   :target: http://pythonhosted.org/bob.ip.optflow.hornschunck/index.html
.. image:: http://img.shields.io/badge/docs-latest-orange.svg
   :target: https://www.idiap.ch/software/bob/docs/latest/bob/bob.ip.optflow.hornschunck/master/index.html
.. image:: https://gitlab.idiap.ch/bob/bob.ip.optflow.hornschunck/badges/v2.0.11/build.svg
   :target: https://gitlab.idiap.ch/bob/bob.ip.optflow.hornschunck/commits/v2.0.11
.. image:: https://img.shields.io/badge/gitlab-project-0000c0.svg
   :target: https://gitlab.idiap.ch/bob/bob.ip.optflow.hornschunck
.. image:: http://img.shields.io/pypi/v/bob.ip.optflow.hornschunck.svg
   :target: https://pypi.python.org/pypi/bob.ip.optflow.hornschunck
.. image:: http://img.shields.io/pypi/dm/bob.ip.optflow.hornschunck.svg
   :target: https://pypi.python.org/pypi/bob.ip.optflow.hornschunck


==================================================================
 Implementation of Horn & Schunck's Optical Flow Framework for Bob
==================================================================

This package is part of the signal-processing and machine learning toolbox
Bob_. It contains a simple Python wrapper to an open-source Optical Flow
estimator based on the works by `Horn & Schunck`_::

  @article{Horn_Schunck_1981,
    author = {Horn, B. K. P. and Schunck, B. G.},
    title = {Determining optical flow},
    year = {1981},
    booktitle = {Artificial Intelligence},
    volume = {17},
    pages = {185--203},
  }


Installation
------------

Follow our `installation`_ instructions. Then, using the Python interpreter
provided by the distribution, bootstrap and buildout this package::

  $ python bootstrap-buildout.py
  $ ./bin/buildout


Contact
-------

For questions or reporting issues to this software package, contact our
development `mailing list`_.


.. Place your references here:
.. _bob: https://www.idiap.ch/software/bob
.. _installation: https://www.idiap.ch/software/bob/install
.. _mailing list: https://www.idiap.ch/software/bob/discuss
