Dorset remote agent library
========================================
.. image:: https://secure.travis-ci.org/DorsetProject/dorset-python.png?branch=master
	:target: https://travis-ci.org/DorsetProject/dorset-python

This library provides components for implementing the remote agent web service
API for `Dorset conversational interface project <https://github.com/DorsetProject/dorset-framework>`_.

Installation
============
Install using pip:

.. code-block:: bash

    $ pip install dorset

Usage
==============
This library handles the encoding and decoding of requests and
responses from a Dorset application. This supports the creation of
remote agents written in Python. Use this library with a python framework
for RESTful APIs like Flask, Bottle, or Django.

The web framework will handle HTTP requests and response and this
library will decode the request as an AgentRequest object and will encode
an AgentResponse.

With Flask, this will look like:

.. code-block:: python

   app = Flask("dorset_hello")

   # required endpoint for the application to test if the agent is alive
   @app.route('/ping', methods=['GET'])
   def ping():
       return json.dumps("pong")

   # primary endpoint
   @app.route('/request', methods=['POST'])
   def process():
       agent_request = Dorset.decode_request(request.data)

       print(agent_request.text)

       return Dorset.encode_response(text="hello, world!")


