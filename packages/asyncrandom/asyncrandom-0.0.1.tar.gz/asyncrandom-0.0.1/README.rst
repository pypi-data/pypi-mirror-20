.. image:: https://travis-ci.org/YavorPaunov/asyncrandom.svg?branch=master
    :target: https://travis-ci.org/YavorPaunov/asyncrandom

Asyncrandom
===========

Utility for fetching one or more random numbers from the ANU Quantum Random Numbers Server by calling the endpoint at https://qrng.anu.edu.au/API/jsonI.php. 
Requests are executed asynchronously using the tornado networking framework.

More information about how the numbers are generated can be found on https://qrng.anu.edu.au/.

Requires tornado and its IOLoop to run.

Installation
------------
Download the source and run the setup file::

    python setup.py install

Usage
-----

A simple example of generating a single random ``uint8``::

    def handle_random_int(f):
        print(f.result())

    f = asyncrandom.fetch()
    f.add_done_callback(handle_random_int)

    tornado.ioloop.IOLoop.current()

Multiple numbers can be generated as well. In this example we generate 10::

    def handle_random_int(f):
        print(f.result())

    f = asyncrandom.fetch(10)
    f.add_done_callback(handle_random_int)

    tornado.ioloop.IOLoop.current().start()

By default, 8-bit unsigned integers are generated. Optionally, this can be changed to 16-bit. Example of generating 10 16-bit integers::
    
    def handle_random_int(f):
        print(f.result())
    
    f = asyncrandom.fetch(10, asyncrandom.IntegerType.UINT16)
    f.add_done_callback(handle_random_int)
    
    tornado.ioloop.IOLoop.current()

If called from the command, issues a synchronous call to the service. Optionally, ``--length`` and ``--type`` can be specified as arguments, with default values of ``1`` and ``"uint-8"`` respectively. 


Command line example::

    $ asyncrandom --int-type=uint8 --length=1
    105

