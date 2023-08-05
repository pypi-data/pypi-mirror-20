Marbaloo Dogpile
================

`dogpile <https://bitbucket.org/zzzeek/dogpile.cache/>`_ support for cherrypy.



Installation
------------
::

    pip install marbaloo_dogpile

Usage
-----

::

    # app.py
    import cherrypy
    import marbaloo_dogpile
    import os

    marbaloo_dogpile.Plugin(cherrypy.engine).subscribe()
    cherrypy.tools.dogpile = marbaloo_dogpile.Tool()


    class Root(object):

        @cherrypy.expose
        def index(self):
            dogpile = cherrypy.request.dogpile
            counter = dogpile.get('counter')
            counter = 0 if isinstance(counter, int) is False else counter
            dogpile.set('counter', counter + 1)
            return str(counter)

    root_path = os.path.dirname(__file__)
    dogpile_dbm_path = os.path.join(root_path, 'dogpile.dbm')
    config = {
        'global': {
            'marbaloo_dogpile': {
                'backend': 'dogpile.cache.dbm',
                'expiration_time': 3600,
                'arguments': {'filename': dogpile_dbm_path},
            }
        },
        '/': {
            'tools.dogpile.on': True
        }
    }
    cherrypy.quickstart(Root(), '/', config)


