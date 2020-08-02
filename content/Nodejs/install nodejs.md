# [在CentOS 7上安装Node.js的4种方法（yum安装和源码安装）](https://www.cnblogs.com/fps2tao/p/9956139.html)

CentOS 7上的安装方法，其中涵盖了源码安装，已编译版本安装，EPEL（Extra Packages for Enterprise Linux）安装和通过NVM（Node version manager）安装这四种方法，其中，前两种方法基本上都是Linux通用的安装方式，特别是前者，其优点自然是可以安装最新的版本，至于后两者，因为安装简单且管理方便

 

1. 源码安装 （非常推荐）
2. 使用已编译版本安装
3. 使用EPEL安装
4. 使用NVM安装

 

一、源码安装

源码安装，下载是源码包，要进行编译和安装，编译过程，可以进行参数设定。这种方式灵活性比较大，版本/参数可以自己选择。

1.去官网下载对应的安装包

 

 

![img](https://img2018.cnblogs.com/blog/548763/201811/548763-20181114085503088-2038349848.png)

2.下载解压 (我一般下载的是.gz的文件)

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
//下载(没有wget,运行yum install wget -y)
wget https://nodejs.org/dist/v9.8.0/node-v9.8.0-linux-x64.tar.xz
//解压
xz -d node-v9.8.0-linux-x64.tar.xz
tar -xvf node-v9.8.0-linux-x64.tar

//或下载
wget http://nodejs.org/dist/v0.10.30/node-v0.10.30.tar.gz
//解压
tar xzvf node-v*
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

3.进入目录编译安装 (有可能要安装相关依赖: sudo yum install gcc gcc-c++)

```
cd node-v*
./configure
make
sudo make install
```

 

4.查看版本（测试安装是否成功）

```
node -v
npm -v
```

 

二、使用EPEL安装 (yum安装方式)

0、了解linux版本

```
uname -a  命令查看到我的Linux系统位数是64位（备注：x86_64表示64位系统， i686 i386表示32位系统）
```

1、下载EPEL (第一步可能没用~,直接看第二步)

找的方法

```
Download the latest epel-release rpm from
http://dl.fedoraproject.org/pub/epel/7/，下载rpm文件
```

https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/

```
sudo rpm -ivh https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-7-11.noarch.rpm
```

2、安装完成，执行 

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
//https://github.com/nodesource/distributions

//更新node.js各版本yum源
//Node.js v8.x安装命令
#curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -

//Node.js v7.x安装命令
#curl --silent --location https://rpm.nodesource.com/setup_7.x | bash -

//Node.js v6.x安装命令
#curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -

//Node.js v5.x安装命令
#curl --silent --location https://rpm.nodesource.com/setup_5.x | bash -

//yum安装node.js
yum install -y nodejs
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

3、检查Node.js和npm版本

```
node -v
npm -v
```

 

我在yum安装的时候运行了第一步EPEL,导致epel源出错或版本不一致,最后删除了/etc/yum.repos.d/的相关node源,yum clean all  --> yum makecache ,后才可以正常安装nodejs 

 

 

三、使用已编译版本安装

1.下载已编译版本

最新版本可在官网获得：传送门

```
cd ~
wget http://nodejs.org/dist/v0.10.30/node-v0.10.30-linux-x64.tar.gz
```

2.解压

```
sudo tar --strip-components 1 -xzvf node-v* -C /usr/local
```

3.老样子，测试安装

```
node --version
```

 

 

四、通过NVM安装

NVM（Node version manager）顾名思义，就是Node.js的版本管理软件，可以轻松的在Node.js各个版本间切换，项目源码GitHub

1.下载并安装NVM脚本

```
curl https://raw.githubusercontent.com/creationix/nvm/v0.13.1/install.sh | bash

source ~/.bash_profile
```

2.列出所需要的版本

```
nvm list-remote
```

返回结果如下

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
. . .
v0.10.29
v0.10.30
 v0.11.0
 v0.11.1
 v0.11.2
 v0.11.3
 v0.11.4
 v0.11.5
 v0.11.6
 v0.11.7
 v0.11.8
 v0.11.9
v0.11.10
v0.11.11
v0.11.12
v0.11.13
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

3.安装相应的版本

```
nvm install v0.10.30
```

4.查看已安装的版本

```
nvm list
->  v0.10.30

system
```

5.切换版本

```
nvm use v0.10.30
```

6.设置默认版本

```
nvm alias default v0.10.30
```

 

 

 

淘宝镜像:

```
由于官方镜像比较慢，直接执行以下命令，将镜像地址改为淘宝的npm镜像地址
npm config set registry https://registry.npm.taobao.org
```

 