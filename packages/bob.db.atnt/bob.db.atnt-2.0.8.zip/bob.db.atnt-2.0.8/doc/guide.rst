.. vim: set fileencoding=utf-8 :
.. @author: Manuel Guenther <Manuel.Guenther@idiap.ch>
.. @date:   Thu Dec  6 12:28:25 CET 2012

==============
 User's Guide
==============

This package contains the access API and descriptions for the `AT&T`_ database of faces, which is formerly known as the ORL database.
The actual raw data for the database should be downloaded from the original URL.

This package only contains the Bob_ accessor methods to use the DB directly from python, using a single self-designed evaluation protocol.


The Database Interface
----------------------

The :py:class:`bob.db.atnt.Database` provides an interface to access the data.
For more information, please refer to its documentation: :py:class:`bob.db.atnt.Database`


.. _at&t: http://www.cl.cam.ac.uk/research/dtg/attarchive/facedatabase.html
.. _bob: https://www.idiap.ch/software/bob
