Marbaloo Validators
===================

`validators <https://validators.readthedocs.io>`_ library support for cherrypy.



Installation
------------
::

    pip install marbaloo_validators

Usage
-----

::

    # app.py
    import cherrypy
    import marbaloo_validators
    import os

    marbaloo_validators.Plugin(cherrypy.engine).subscribe()
    cherrypy.tools.validators = marbaloo_validators.Tool()


    class Root(object):

        @cherrypy.expose
        def index(self):
            validators = cherrypy.request.validators
            if validators.email('example@site.com'):
                return 'TRUE'
            else:
                return 'FALSE'

    root_path = os.path.dirname(__file__)
    config = {
        '/': {
            'tools.validators.on': True
        }
    }
    cherrypy.quickstart(Root(), '/', config)


