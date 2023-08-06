takumi_thrift
=============

.. image:: https://travis-ci.org/elemepi/takumi-thrift.svg?branch=master
    :target: https://travis-ci.org/elemepi/takumi-thrift


Thriftpy instruments for passing metadata bidirectional.


Example
-------

.. code:: python

    from takumi_thrift import Processor, Response

    ping = load('ping.thrift')

    class Handler(object):
        def ping_api(self, **kwargs):
            return Response('pong', meta={'server_id': 'test_server'})

    # server
    from thriftpy.transport import TServerSocket
    from thriftpy.server import TSimpleServer

    sock = TServerSocket(host='localhost', port=1990)
    processor = Processor(ping.PingService, Handler())
    server = TSimpleServer(processor, sock)
    server.serve()

    # client
    from thriftpy.transport import TBufferedTransportFactory, TSocket
    from thriftpy.protocol import TBinaryProtocolFactory
    from takumi_thrift import Client

    sock = TScoket(host='localhost', port=1990)
    trans = TBufferedTransportFactory().get_transport(sock)
    proto = TBinaryProtocolFactory().get_protocol(trans)
    trans.open()
    client = Client(ping.PingService, proto)
    client.ping_api(meta={'hello': 'world', 'client_name': 'test_client'})


