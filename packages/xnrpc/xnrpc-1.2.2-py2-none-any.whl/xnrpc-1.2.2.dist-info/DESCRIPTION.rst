xnrpc
=====

xnrpc is a light-weight, reliable and language-agnostic library for
distributed communication between server-side processes.
It builds on top of zerorpc and gevent, simple ,efficient and robust.

*features*

* support heartbeat and timeout
* graceful exceptions handler
* support pipeline commands
* asynchronous I/O, support large concurrency
* very simple to use

*demo*

a simple server and client example:

.. code-block:: python

    from xnrpc.server import RpcInterface, ServerManager
    from xnrpc.client import open_client
    from xnrpc.common.log import get_log
    _log = get_log(__name__)


    class OperationRpcInterface(RpcInterface):

        def ls_file(self):
            _log.info('Operation ls file')
            return None

        def check_ip(self):
            _log.info('Operation check ip')
            return None

    if __name__ == '__main__':
        # 启动RPC服务器
        rpc_interface = OperationRpcInterface
        url = 'tcp://127.0.0.1:7772'
        server = ServerManager(url, rpc_interface, name='Test Server')
        server.start()

        # 建立一个客户端连接
        with open_client(url) as client:
            client.ls_file()
            client.check_ip()

        # 停止服务器
        server.stop()


Resources
=========

* `GitHub repository <https://github.com/yidao620c/xnrpc>`_
* `Python User Guide <https://www.python.org/doc/>`_



