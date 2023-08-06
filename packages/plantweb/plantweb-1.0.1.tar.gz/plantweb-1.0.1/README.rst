========
Plantweb
========

Plantweb is a project that provides a command line interface, Sphinx directives
and an API that allows to render powerful plain text UML diagrams, ASCII
diagrams and complex graphs.

It is a Python client for the PlantUML_ server and thus it can render
PlantUML_, Graphviz_ and Ditaa_ diagrams without the need to install them.

Plantweb features a local cache that prevents requesting the server for
previously rendered diagrams, speeding up building documentation with lots of
diagrams.

Finally, being pure Python, non-local rendering, Plantweb is an excellent way
to display and render PlantUML_, Graphviz_ and Ditaa_ diagrams in ReadTheDocs_
published documentation.

.. _PlantUML: http://plantuml.com/
.. _Graphviz: http://www.graphviz.org/
.. _Ditaa: http://ditaa.sourceforge.net/
.. _ReadTheDocs: http://readthedocs.org/


Documentation
=============

    https://plantweb.readthedocs.io/


Changelog
=========

1.0.1
-----

**Fixes**

- Fix #1 that caused diagrams rendering to fail with a 404 in Windows OSes.

1.0.0
-----

**New**

- Sphinx directives now support passing a source file as argument.

0.4.0
-----

**New**

- Added a set of Sphinx directives ``uml``, ``graph`` and ``diagram``.

0.3.0
-----

**New**

- Default options can now be overriden with a ``.plantwebrc`` file in the user
  home or in the git repository root.

0.2.0
-----

**Fixes**

- Fixed bug when calling ``render_cache`` that returned a non-tuple.

**Changes**

- Documentation was greatly improved.

0.1.0
-----

**New**

- Initial public release.


License
=======

::

   Copyright (C) 2016 Carlos Jenkins

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing,
   software distributed under the License is distributed on an
   "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
   KIND, either express or implied.  See the License for the
   specific language governing permissions and limitations
   under the License.
