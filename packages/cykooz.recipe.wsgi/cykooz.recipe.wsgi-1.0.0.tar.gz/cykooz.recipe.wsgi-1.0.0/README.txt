cykooz.recipe.wsgi
==================

This recipe for buildout_ creates a script that can be used as an entry
point for WSGI servers (mod_wsgi_, uwsgi_ and other).

Usage
-----

This is a minimal ``buildout.cfg`` file which creates a WSGI script mod_wsgi
can use::

    [buildout]
    parts = wsgi

    [wsgi]
    recipe = cykooz.recipe.wsgi
    eggs = myapplication
    app_fabric = myapplication.wsgi:get_app
    environ =
        CHAMELEON_CACHE=true
        CHAMELEON_STRICT=true
    initialization =
        import logging
        logging.info('Run myapplication')

This will create a small python script in the bin directory called ``wsgi``
which mod_wsgi can load. You can also use the optional ``extra-paths`` option
to specify extra paths that are added to the python system path.

You may also use the ``script-name`` option to specify the name of the
generated script file, if ``wsgi`` is unsuitable. Or you may use the ``target``
option to specify a full path of the generated script file.

.. _buildout: http://pypi.python.org/pypi/zc.buildout
.. _mod_wsgi: http://code.google.com/p/modwsgi/
.. _uwsgi: https://uwsgi-docs.readthedocs.io
