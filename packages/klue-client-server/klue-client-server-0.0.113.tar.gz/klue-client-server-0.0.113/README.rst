Klue Client-Server
==================

Dynamically generate client libraries and Flask servers based on Swagger
specifications of REST apis.

Purpose
-------

A typical micro-service will expose a REST API on its server side, while making
client calls to a number of other services nearby.

Given a set of Swagger specifications describing the APIs of these services,
Klue Client-Server will populate a Flask app with auto-generated server
endpoints for all specified routes, as well as generate client libraries for
every client API. Both client and server stubs handle marshaling/unmarshaling
of json documents to and from objects modeled upon the Swagger definitions for
each API, as well as provide format verifications of these objects.

Klue Client-Server relies on bravado-core for marshaling/unmarshaling and
format validation.

Disclaimer
----------

Klue Client-Server is under active development. Its API is subject to
change. It has been tested only on python 2.7.

Asynchronous support based on grequests was dropped after version 0.0.92

Usage
-----

First, load the Swagger specifications of all the services your server will use:

.. code-block:: python

    from klue.swagger import ApiPool

    ApiPool.add('public', yaml_path='public.yaml')
    ApiPool.add('login', yaml_path='login.yaml')
    ApiPool.add('user', yaml_path='user.yaml', timeout=20)


Generating Server
=================

In the Swagger spec describing the server side, each endpoint that you want to
have auto-generated into the Flask app should have the 'x-bind-server'
attribute set to the path of a python method that will take as argument an
object modelled on the endpoint's argument, and return an object matching that
of the endpoint's reponses (See bravado-core for details):

.. code-block:: yaml

    /login:
      post:
        summary: Login a user.
        produces:
          - application/json
        x-bind-server: myserver.handlers.do_login
        parameters:
          - in: body
            name: body
            description: User login credentials.
            required: true
            schema:
              $ref: "#/definitions/Credentials"
        responses:
          200:
            description: API version
            schema:
              $ref: '#/definitions/Welcome'
          default:
            description: Error
            schema:
              $ref: '#/definitions/Error'


Populate a Flask app with server endpoints for the 'login' api:

.. code-block:: python

    app = Flask(__name__)
    ApiPool.login.spawn_api(app)

    # Optionaly: wrap all server endpoints with a decorator
    def analytics_wrapper(f):
        ...
    ApiPool.login.spawn_api(app, decorator=analytics_wrapper)

Implement the 'do_login' endpoint:

.. code-block:: python

    from flask import jsonify
    from klue.swagger import ApiPool
    from klue.exceptions import KlueExeption

    def do_login(credentials):
        if authenticate_user(credentials):
            # Get the class representing bravado-core Welcome objects
            Welcome = ApiPool.login.model.Welcome
            # Instantiate Welcome and return it
            return Welcome(message="Welcome!")
        else:
            # Rise an error in the API's error format, directly as
            # a Flask response object
            r = jsonify({'error': 'INVALID_CREDENTIALS'})
            r.status_code = 401
            return r


Generating Client
=================

In the Swagger spec describing the server you want to call, each endpoint that
you want to have auto-generated into the client library should have the
'x-bind-client' attribute set to the path of a python method that will take as
argument an object modelled on the endpoint's argument, and return an object
matching that of the endpoint's reponses (See bravado-core for details):

.. code-block:: yaml

    /version:
      get:
        summary: Return the API''s version.
        produces:
          - application/json
        x-bind-client: version
        responses:
          200:
            description: API version
            schema:
              $ref: '#/definitions/Version'

Calling that server now looks like (assuming the server api is called 'public'):

.. code-block:: python

    from klue.swagger import ApiPool

    # Call the /version endpoint on the host:port specified in the Swagger
    # spec, and return a Version object:
    version = ApiPool.public.client.version()

The client method passes path and query parameters as kwarg arguments. The POST request body is passed
as an instance of an ApiPool model. For example, to pass a request body:

.. code-block:: python

   # To call
   # 'POST v1/item' with the body {name: 'foo', surname: 'bar'}
   # where the endpoint was defined with:
   # /v1/user:
   #   post:
   #     parameters:
   #       - in: body
   #         name: body
   #         schema:
   #           $ref: "#/definitions/NameSurname"
   #   x-bind-client: create_user

   res = ApiPool.example.client.create_user(
       ApiPool.example.model.NameSurname(
           name='foo',
           surname='bar'
       )
   )

For example, to pass query and path arguments:

.. code-block:: python

   # Assuming the endpoint:
   # /v1/user/<id>:
   #   get:
   #     parameters:
   #       - in: path
   #         name: id
   #         type: string
   #       - in: query
   #         name: uppercase
   #         type: boolean
   #   x-bind-client: get_user

   user = ApiPool.example.client.get_user(
       id='user_9327234',
       uppercase=True
   )

All client methods support the following extra kwarg parameters:

* max_attempts: how many times the client should try calling the server
  endpoint upon failure. Defaults to 3, with an increasing delay of .5 seconds,
  1.5, then 2.5, etc.

* read_timeout: the read timeout in seconds, passed to the requests module.

* connect_timeout: the connect timeout in seconds, passed to the requests module.

* request_headers: a dictionary of extra headers to add to the HTTP request
  (The request already contains 'Content-Type'='application/json' by default).

As in:

.. code-block:: python

    results = ApiPool.search.client.search(
        query=query_words,
        page=0,
        country=country,
        request_headers={
            'Authorization': 'Bearer %s' % token,
        },
        max_attempts=2
    )


Authentication
==============

TODO: describe the 'x-decorate-request' and 'x-decorate-server' attributes of
the swagger spec + give example of using them to add-on authentication support.


Handling Errors
===============

Klue-client-server may raise exceptions, for example if the server stub gets an
invalid request according to the swagger specification.

However klue-client-server does not know how to format internal errors into an
object model fitting that of the loaded swagger specification. Instead, you
should provide the apipool with a callback to format exceptions into whatever
object you wish to return instead. Something like:

.. code-block:: python

    from klue.swagger import ApiPool

    def my_error_formatter(e):
        """Take an exception and return a proper swagger Error object"""
        return ApiPool.public.model.Error(
            type=type(e).__name__,
            raw=str(e),
        )

    ApiPool.add('public', yaml_path='public.yaml', error_callback=my_error_formatter)

Internal errors raised by klue-client-server are instances of klue.exceptions.KlueException


Model persistence
=================

You can plug-in object persistence into chosen models by way of the swagger
file.

Specify the 'x-persist' attributes in the swagger definition of models to make
persistent, with as a value the package path to a custom class, like this:

.. code-block:: yaml

    definitions:
      Foo:
        type: object
        description: a foo
        x-persist: klue.test.PersistentFoo
        properties:
          foo:
            type: string
            format: foo
            description: bar


The persistence class must implement the static methods 'load_from_db' and
'save_to_db', like in:

.. code-block:: python

    class PersistentFoo():

        @staticmethod
        def load_from_db(*args, **kwargs):
            # Load object(s) from storage. Return a tupple
            pass

        @staticmethod
        def save_to_db(object, *args, **kwargs):
            # Put object into storage
            pass

klue-client-server will inject the methods 'save_to_db' and 'load_from_db' into
the corresponding model class and instances, so you can write:

.. code-block:: python

    # Retrieve instance Foo with id 12345 from storage
    f = api.model.Foo.load_from_db(id='12345')

    # Put this instance of Foo into storage
    f.save_to_db()

The details of how to store the objects, as well as which arguments to pass the
methods and what they return, is all up to you.


Call ID and Call Path
=====================

If you have multiple micro-services passing objects among them, it is
convenient to mark all responses initiated by a given call to your public
facing API by a common unique call ID.

Klue does this automagically for you, by way of generating and passing around a
custom HTTP header named 'KlueCallerID'.

In the same spirit, every subsequent call initiated by a call to the public
facing API registers a path via the 'KlueCallerPath' header, hence telling each
server the list of servers that have been called between the public facing API
and the current server.

Those are highly usefull when mapping the tree of internal API calls initiated
by a given public API call, for analytic purposes.

To access the call ID and call path:

.. code-block:: python

    try:
        from flask import _app_ctx_stack as stack
    except ImportError:
        from flask import _request_ctx_stack as stack

    if hasattr(stack.top, 'call_id'):
        call_id = stack.top.call_id
        # call_id is a uuid.uuid4 string

    if hasattr(stack.top, 'call_path'):
        call_path = stack.top.call_pat
        # call_path is a '.'-separated list of api names
        # For example 'public.user.login' indicates we are in server 'login',
        # by way of servers 'user' then 'public'.


Install
-------

.. code-block:: shell

    pip install klue-client-server