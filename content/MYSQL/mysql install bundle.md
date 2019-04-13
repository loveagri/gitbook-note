# [Centos7.3.1611安装mysql5.7.18 rpm教程 并设置datadir](https://www.cnblogs.com/zhangmingcheng/p/7115497.html)



### 一、卸载MariaDB

**CentOS7默认安装MariaDB而不是MySQL，而且yum服务器上也移除了mysql相关的软件包。因为MariaDB和MySQL可能会冲突，故先卸载MariaDB**。 
\1. 安装新版mysql之前，我们需要将系统自带的mariadb-lib卸载

```
[root@localhost ~]# rpm -qa | grep -i mariadb
 mariadb-libs-5.5.52-1.el7.x86_64
[root@localhost ~]# rpm -e --nodeps mariadb-libs-5.5.52-1.el7.x86_64
```

**注：详细卸载教程可自行百度，很简单。**

### 二、到mysql的官网下载最新版mysql的rpm集合包

```
mysql-5.7.18-1.el7.x86_64.rpm-bundle.tar
```

![img](http://i.imgur.com/6dq9mEx.jpg)

#### 1. 通过xshell的rz命令将*mysql-5.7.18-1.el7.x86_64.rpm-bundle.tar*上传到Linux系统中。

![img](http://i.imgur.com/OFpr8v2.jpg) 
**注：我上传到的路径 /usr/local/tools**

#### 2. 通过mkdir命令创建mysql目录，放入解压后的文件，为以后的安装做准备。

![img](http://i.imgur.com/kCMWtf9.jpg)

#### 3.解压压缩包到mysql目录

![img](http://i.imgur.com/HZ5MRip.jpg)

![img](http://i.imgur.com/GyDiOpo.jpg)

### 四.安装MySQL解压包

**注：所有解压包，不一定需要全部安装、注意安装顺序** 
**以下是安装顺序 这几个包由依赖关系。执行有先后其中，client依赖于libs，server依赖于common和client.**

```
rpm -ivh mysql-community-common-5.7.18-1.el7.x86_64.rpm // <br> 
rpm -ivh mysql-community-libs-5.7.18-1.el7.x86_64.rpm //<br>
rpm -ivh mysql-community-libs-compat-5.7.18-1.el7.x86_64.rpm<br>
rpm -ivh mysql-community-client-5.7.18-1.el6.x87_64.rpm //客户端安装包 <br>
rpm -ivh mysql-community-server-5.7.18-1.el6.x87_64.rpm //服务端安装包<br>
rpm -ivh mysql-community-devel-5.7.18-1.el7.x87_64.rpm //包含开发用的库头文件安装包<br>
```

**注: i-install安装；v-verbose进度条；h-hash哈希校验；安装过程中可能会出现 perl 环境等问题，按提示百度就行。**

![img](http://i.imgur.com/RSt2SAW.jpg)

### 五、数据库初始化

#### 1.为了保证数据库目录为与文件的所有者为 mysql 登陆用户，如果你的linux系统是以 root 身份运行 mysql 服务，需要执行下面的命令初始化

```
[root@localhost mysql]# mysqld --initialize --user=mysql
```

如果是以 mysql 身份登录运行，则可以去掉 –user 选项。
**注： –initialize 选项默认以“安全”模式来初始化，则会为 root 用户生成一个密码并将该密码标记为过期，登陆后你需要设置一个新的密码**
**这里演示使用的 –initialize 初始化的，会生成一个 root 账户密码，密码在log文件里，红色区域的就是自动生成的密码**

使用 `cat /var/log/mysqld.log` 命令打开日志文件

![img](http://i.imgur.com/dWpPS8b.jpg)

### 六、启动mysql数据库

**注：systemctl是Centos7特有的启动方式**

```
systemctl start mysqld.service
```

![img](http://i.imgur.com/NYKSWuj.jpg)

### 七、登录mysql数据库并创建Mysql新密码

#### 1.登录mysql，然后输入日志中的随机密码。

```
mysql -u root -p;
```

#### 2.设置你的密码。

```
set password = password('你的密码');
```

#### 3.设置授权(远程访问)

```
grant all privileges on *.* to 'root' @'%' identified by'你的密码';
```

#### 4.刷新权限

```
flush privileges;
```

![img](http://i.imgur.com/WamZsjq.jpg)

（转）

/charlie/software/[mysql](http://lib.csdn.net/base/mysql)/data是我新建的MySQL目录，修改文件夹权限：sudo chown -R mysql:msyql /charlie/software/mysql/data

修改/etc/my.cnf文件

[mysqld]

character_set_server=utf8
socket=/charlie/software/mysql/data/mysql.sock
datadir=/charlie/software/mysql/data
\#socket=/var/lib/mysql/mysql.sock
\#datadir=/var/lib/mysql

 

然后做一个mysql.sock 链接：
ln -s /charlie/software/mysql/data/mysql.sock /var/lib/mysql/mysql.sock

执行sudo systemctl start mysqld 会没有反应。然后在/var/log/mysqld.log查看日志，ERR错误会有一个

Can't start server : Bind on unix socket: Permission denied这样子的错误。

执行命令getenforce是不是出现的是Enforcing，如果是的话，执行setenforce 0 临时关闭，就可以启动MySQL。

然后执行sudo /usr/bin/mysql_secure_installation就可以设置了。

如果后面执行mysql相关命令出现：Can’t connect to local MySQL server through socket错误。

编辑/etc/my.cnf文件添加

 [mysql]
socket=/charlie/software/mysql/data/mysql.sock

主要还是对[Linux](http://lib.csdn.net/base/linux)不熟悉，找了很久才发现有可能是selinux的原因。

 

 