
## 高效的分布式通讯和命令调用框架

特点：

1. 基于优秀的zerorpc和gevent框架
2. 支持心跳检测、rpc调用超时和命令调用超时
3. 完善的异常处理机制
4. 底层命令支持管道，同时支持多种调用方式
5. 异步IO，支持大量并发调用
6. 轻量级封装，使用简单方便

## 使用示例

实际使用时，为了让所有阻塞操作变成异步的，可在主程序入口先打patch:
``` python
from gevent import monkey
monkey.patch_all(thread=False)
```

### 使用协程
``` python
from xnrpc.common.thread import ServerThread
from xnrpc.common.log import get_log
_log = get_log(__name__)

class OperationThread(ServerThread):

    def __init__(self, counter = 1):
        super(OperationThread, self).__init__()
        self.counter = counter

    def work(self):
        _log.info('OperationThread, counter={}'.format(self.counter))
        _log.info('OperationThread, counter={}'.format(self.counter + 1))
        _log.info('OperationThread, counter={}'.format(self.counter + 2))

if __name__ == '__main__':
    t = OperationThread(counter=3)
    t.start()

    import time
    time.sleep(3)

    t.stop()
```

### rpc服务器和客户端使用
``` python
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
```
### 执行Linux系统命令
``` python
from xnrpc.subproc import proc_cmd
from xnrpc.common.log import get_log
_log = get_log(__name__)


if __name__ == '__main__':
    # 两种调用方法
    _log.info('Operation ls file, now is true')
    args = ['ls', '-l']
    retcode1, stdout1, stderr1 = proc_cmd(args, sudo=True, timeout=10)
    _log.info('Operation ls file, stdout1={}'.format(stdout1))
    args = 'ls -l'
    retcode2, stdout2, stderr2 = proc_cmd(args, sudo=True, timeout=10)
    _log.info('Operation ls file, stdout2={}'.format(stdout2))

    # 管道命令
    _log.info('Operation check ip, now is true')
    args = "hostname -I | awk '{print $1}'"
    retcode2, stdout3, stderr2 = proc_cmd(args, sudo=True, timeout=10)
    _log.info('Operation check ip, stdout3={}'.format(stdout3))
```

### 更复杂点情景
manager中有rpc server和多个thread，rpc interface实际执行方法中会调用manager中thread的方法
``` python
from xnrpc.server import RpcInterface, ServerManager
from xnrpc.client import open_client
from xnrpc.common.thread import ServerThread
from xnrpc.common.log import get_log
_log = get_log(__name__)


class OperationThread(ServerThread):

    def __init__(self, counter = 1):
        super(OperationThread, self).__init__()
        self.counter = counter

    def work(self):
        _log.info('OperationThread, counter={}'.format(self.counter))
        _log.info('OperationThread, counter={}'.format(self.counter + 1))
        _log.info('OperationThread, counter={}'.format(self.counter + 2))


class OperationRpcInterface(RpcInterface):

    def ls_file(self):
        """调用manager中另一个线程的方法"""
        _log.info('Operation ls file, now I call thread method')
        self._manager.opthread.work()
        return None

    def check_ip(self):
        """省略"""
        _log.info('Operation check ip, now I do nothing')
        return None


class OperationServerManager(ServerManager):
    def __init__(self, url, rpc_interface):
        super(OperationServerManager, self).__init__(
            url, rpc_interface, name='OperationServerManager')
        self.opthread = OperationThread(counter=100)

    def start(self):
        super(OperationServerManager, self).start()
        self.opthread.start()

    def stop(self):
        super(OperationServerManager, self).stop()
        self.opthread.stop()

    def join(self):
        super(OperationServerManager, self).join()
        self.opthread.join()

if __name__ == '__main__':
    # 启动RPC服务器
    rpc_interface = OperationRpcInterface
    url = 'tcp://127.0.0.1:7779'
    server = OperationServerManager(url, rpc_interface)
    server.start()

    # 建立一个客户端连接
    with open_client(url) as client:
        client.ls_file()
        client.check_ip()

    # 停止服务器
    server.stop()
```

注：

1. 所以测试通过日志打印结果，执行结果查看`/var/log/default.log`日志文件
2. 单元测试用例都写在test包中，可以通过执行最外层的main.py来执行所有单元测试

