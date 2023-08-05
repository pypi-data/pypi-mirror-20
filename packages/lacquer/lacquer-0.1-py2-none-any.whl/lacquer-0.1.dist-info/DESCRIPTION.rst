lacquer
-------

lacquer is a python port of Presto's SQL Parser.

Currently, it doesn't support all the same features as Presto's parser,
but it can parse most SELECT queries and produce the python-equivalent
syntax tree, as well as write the tree back out to SQL.

It was written for the `LSST project <http://lsst.org>`_ to enable
support for the Astronomical Data Query Language.

It has two dependencies, PLY and future.

It is tested with 2.7 and 3.5.

Links
`````
* `GitHub <http://github.com/slaclab/lacquer/>`_
* `development version
  <https://github.com/slaclab/lacquer/zipball/master#egg=lacquer-dev>`_



