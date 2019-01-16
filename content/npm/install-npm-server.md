<center><h1>安装npm服务器</h1></center>

[npm 私服工具verdaccio 搭建(一)](https://blog.csdn.net/yyzzhc999/article/details/80097073) |
[npm 私服工具verdaccio 搭建(二)](https://blog.csdn.net/YYZZHC999/article/details/80114218) | 
[NodeJS学习：搭建私有NPM](http://www.cnblogs.com/HCJJ/p/9222826.html) | 
[pm2 status errored](https://blog.csdn.net/weixin_41451294/article/details/82791928) | 
[记录windows环境下用verdaccio搭建npm私有库](https://blog.csdn.net/weixin_43249693/article/details/84453017) | 
[gitlab之webhook自动部署](https://www.jianshu.com/p/00bc0323e83f) 


## 1.install node

下载最新的node环境，下载地址：[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

```shell
    #!/bin/bash
    wget https://nodejs.org/dist/v10.14.1/node-v10.14.1-linux-x64.tar.xz

    tar -zxvf node-v10.14.1-linux-x64

    cp node-v10.14.1-linux-x64 /usr/local/node

```

### 2.安装verdaccio
加上–unsafe-perm的原因是防止报grywarn权限的错。

```shell
npm install -g verdaccio --unsafe-perm
```

### 3. 配置
#### 3.1. 修改配置文件
verdaccio 的特点是，你在哪个目录运行，它的就会在对应的目录下创建自己的文件。目录下默认有两个文件：config.yaml和storage，htpasswd 是添加用户之后自动创建的；
由于第一次启动默认的config.xml文件是从原始文件default.yaml拷贝而来，可先修改verdaccio 原始的default.yaml。
地址：verdaccio 安装目录/conf/ default.yaml。
打开默认启动的config.yaml文件。

```
vim /home/admin/.config/verdaccio/config.yaml
```

在配置文件最后添加监听端口，配置文件详解请见文末尾

listen: 0.0.0.0:4873                    # listen on all addresses 
1
####3.2. 对外开放4873端口
verdaccio继承了sinopia，端口号4873依然不变。

firewall-cmd --state                # 先查看防火墙状态，
service firewalld start              # 开启防火墙:
firewall-cmd --zone=public --add-port=4873/tcp –permanent  #开放4873端口
firewall-cmd --reload              #重新载入
firewall-cmd --zone=public --query-port=4873/tcp    #查看是否添加成功
###4.启动verdaccio

4.1.verdaccio直接启动
命令：

verdaccio
1
// 显示信息，
第一句是配置文件的地址，
第二句，给了我们地址，访问便可以看到我们的私服已经搭建成功了。
目前还没有往上发布过包，所以没有任何包的信息。当我们打开页面还可以看到服务器这边有访问记录，控制台的日志一直在打。
verdaccio doesn‘t need superuser privileges. Don‘t run it und
warn — config file - /home/admin/.config/verdaccio/config.yaml
warn — http address - http://localhost:4873/ - verdaccio/


4.2 pm2守护verdaccio进程
利用第一种方法虽然可以正常启动和使用verdaccio，但不建议用这种方式启动verdaccio，我们可以用pm2来使用pm2对verdaccio进程进行托管启动。
安装pm2并使用pm2启动verdaccio，使用pm2托管的进程可以保证进程永远是活着的，尝试通过kill -9去杀verdaccio的进程发现杀了之后又自动启起来。推荐使用此种方式启动verdaccio.

#####4.2.1安装pm2

npm install -g pm2 --unsafe-perm
1
#####4.2.2使用pm2启动verdaccio

pm2 start verdaccio
1
####4.2.3 查看pm2 守护下的进程verdaccio的实时日志

pm2 show verdaccio          
1
通过这个命令我们可以从下图中看到所有verdaccio的所有信息，打开 out log path查看进程输出日志,出现错误时候也可以打开error log来查看错误日志。

实时查看该路径下的日志命令：

tail -f /home/admin/.pm2/logs/verdaccio-out-0.log     
1
添加用户
npm adduser --registry http://192.168.XX.XX:4873        //后面是我们的私服地址
类似如下：
Username: lk
Password: 
Email: (this IS public) lk@qq.com
Logged in as rong on http://192.168.XX.XX:4873/.
然后在verdaccion启动页面尝试登录即可，默认登录后有发布包的权限。(这里可以通过修改config.yaml配置文件来对权限进行设置)、

到这里服务器端的搭建就完毕了，下篇我们来介绍客户端如何使用。
