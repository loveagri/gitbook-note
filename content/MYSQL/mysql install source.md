# CentOS 7.2使用源码包编译安装MySQL 5.7.22及一些操作

[Link](https://blog.csdn.net/sssssscccccc/article/details/80919826)



使用`yum`安装的MySQL一般版本比较旧，但是运行稳定。如果想要尝试最新的功能或者需要指定特殊的功能的话，就需要手工进行编译安装了。

#### **一、下载安装包**

##### **(一)、先下载MySQL源码，网址为：https://dev.mysql.com/downloads/mysql/ :**

1. 在`Select Operationg System`中选择`Source Code`；
2. 在下面的`Select OS Version`选择`Generic Linux(Architecture Independent)`；
3. 然后再下面的部分可以看到`Compressed TAR Archive`，单击后面的`Download`；
4. 在弹出的界面中选择最下面的`No thanks, just start my download`就可以开始下载了。 
   下载完成后，使用`WinSCP`将文件复制到服务器的`/usr/local/src`目录下即可。

也可以使用下面的方法直接在Linux中下载源码包，在`/usr/local/src`目录下直接用`wget`进行下载：

```
cd /usr/local/src



wget https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.20.tar.gz
```

##### **(二)、下载 boost**

下载网址为：<http://www.boost.org/users/download/> 
这个版本的MySQL要求boost的版本是1.59，链接为： 
<http://www.boost.org/users/history/version_1_59_0.html> 
下面给出boost 1.59.0的链接，在`/usr/local/src`目录下直接用`wget`进行下载

```
wget --no-check-certificate http://sourceforge.net/projects/boost/files/boost/1.59.0/boost_1_59_0.tar.gz
```

#### **二、编译安装**

##### **(一)、安装必要的软件依赖：**

```
yum install -y cmake bison bison-devel libaio-devel gcc gcc-c++ git  ncurses-devel
```

##### **(二)、解压MySQL源文件：**

```
tar -zxvf mysql-5.7.20.tar.gz
```

将boost的压缩包移动至解压后的源文件目录内:

```
mv boost_1_65_1.tar.gz mysql-5.7.20
```

##### **(三)、进入MySQL源文件目录，新建configure做为编译目录，并进入该目录:**

```
cd mysql-5.7.20



mkdir configure



cd configure
```

##### **(四)、使用cmake进行生成编译环境：**

```
cmake .. -DBUILD_CONFIG=mysql_release \



-DINSTALL_LAYOUT=STANDALONE \



-DCMAKE_BUILD_TYPE=RelWithDebInfo \



-DENABLE_DTRACE=OFF \



-DWITH_EMBEDDED_SERVER=OFF \



-DWITH_INNODB_MEMCACHED=ON \



-DWITH_SSL=bundled \



-DWITH_ZLIB=system \



-DWITH_PAM=ON \



-DCMAKE_INSTALL_PREFIX=/var/mysql/ \



-DINSTALL_PLUGINDIR="/var/mysql/lib/plugin" \



-DDEFAULT_CHARSET=utf8 \



-DDEFAULT_COLLATION=utf8_general_ci \



-DWITH_EDITLINE=bundled \



-DFEATURE_SET=community \



-DCOMPILATION_COMMENT="MySQL Server (GPL)" \



-DWITH_DEBUG=OFF \



-DWITH_BOOST=..
```

如果编译出现错误，请先删除CMakeCache.txt后，再重新编译：

```
rm -rf CMakeCache.txt
```

如果出现下面的提示就表示成功生成了编译环境：

```
-- Configuring done



-- Generating done
```

##### **(五)、使用make进行编译：**

```
make
```

编译完成后，会出现如下信息：

```
[100%] Building CXX object sql/CMakeFiles/udf_example.dir/udf_example.cc.o



Linking CXX shared module udf_example.so



[100%] Built target udf_example



[100%] Built target my_safe_process
```

##### **(六)、安装MySQL:**

```
make install
```

#### **三、初始化数据库**

##### **(一)、添加mysql用户:**

```
useradd -s /sbin/nologin mysql
```

##### **(二)、新建数据库文件夹及日志文件夹，并更改用户为mysql:**

```
mkdir /mysql_data



mkdir /var/mysql/log



chown -R mysql:mysql /mysql_data/



chown -R mysql:mysql /var/mysql/log
```

\#建立文件

touch error.log

\#赋权限子目录及文件

chmod -R 777 /var/mysql/log



##### **(三)、修改配置文件**

```
vim /etc/my.cnf
```

将[mysqld]项下的内容替换为：

```
[mysqld]



port=3306



datadir=/mysql_data



log_error=/var/mysql/log/error.log



basedir=/var/mysql/







注意：my.cnf文件有以下配置



socket=/var/lib/mysql/mysql.sock



需要手动建立mysql.sock,并赋值读写执行权限



chmod -R 777 mysql.sock
```

##### **(四)、初始化数据库:**

```
/var/mysql/bin/mysqld  --initialize --user=mysql
```

查看数据文件是否生成:

```
[root@localhost configure]# ll /mysql_data/



总用量 110620



-rw-r-----. 1 mysql mysql       56 10月  2 19:44 auto.cnf



-rw-r-----. 1 mysql mysql      419 10月  2 19:44 ib_buffer_pool



-rw-r-----. 1 mysql mysql 12582912 10月  2 19:44 ibdata1



-rw-r-----. 1 mysql mysql 50331648 10月  2 19:44 ib_logfile0



-rw-r-----. 1 mysql mysql 50331648 10月  2 19:44 ib_logfile1



drwxr-x---. 2 mysql mysql     4096 10月  2 19:44 mysql



drwxr-x---. 2 mysql mysql     4096 10月  2 19:44 performance_schema



drwxr-x---. 2 mysql mysql    12288 10月  2 19:44 sys
```

查看日志文件是否生成：

```
[root@localhost mysql]# ll /var/mysql/log/



总用量 4



-rw-r-----. 1 mysql mysql 802 10月  2 19:47 error.log
```

#### **四、配置启动文件及环境变更**

##### **(一)、配置启动文件**

**1. 从模板文件中复制启动文件：**

```
cp /var/mysql/support-files/mysql.server /etc/init.d/mysqld
```

**2. 修改启动文件：**

```
vim /etc/init.d/mysqld
```

找到如下二行：

```
basedir=



datadir=
```

修改为：

```
basedir=/var/mysql/



datadir=/mysql_data
```

**3. 启动mysql:**

```
[root@localhost mysql]# /etc/init.d/mysqld start



Starting MySQL. SUCCESS!
```

可以看到提示，已经成功启动。当然你也可以使用systemctl来启动MySQL，但执行后，不会有任何提示。

```
[root@localhost ~]# systemctl start mysqld
```



注意：数据库如果是这样的提示

Failed to start mysqld.service: Unit not found

（有些文章说不需要这个，会冲突参考：[CentOS 7为什么放弃了MySQL，而改使用MariaDB？）](https://www.zhihu.com/question/41832866)

（https://www.cnblogs.com/progor/archive/2018/01/30/8387301.html）



解决方法如下:

　　首先需要安装mariadb-server

　　~]# yum install -y mariadb-server

　　启动服务

　　~]# systemctl start mariadb.service

　　添加到开机启动

　　~]# systemctl enable mariadb.service

进行一些安全设置，以及修改数据库管理员密码

　　~]# mysql_sceure_installation

至此完成!

可以测试一下

　　~]#  mysql -u root -p





##### **(二)、设置MySQL开机自动启动：**

```
[root@localhost ~]# systemctl enable mysqld



mysqld.service is not a native service, redirecting to /sbin/chkconfig.



Executing /sbin/chkconfig mysqld on
```

##### **(三)、配置MySQL环境变量：**

```
vim /root/.bash_profile
```

找到下面一行：

```
PATH=$PATH:$HOME/bin
```

修改为：

```
PATH=$PATH:$HOME/bin:/var/mysql/bin
```

##### **(四)、修改root的初始密码**

**1. 查看root的初始密码** 
MySQL从5.7开始不支持安装后使用空密码进行登录，因此在这里需要先查询程序生成的临时密码：

```
[root@localhost ~]# cat /var/mysql/log/error.log |grep 'A temporary password'



2017-11-13T06:28:23.096812Z 1 [Note] A temporary password is generated for root@localhost: wa&sk371_,US
```

最后一行冒号后面的部分bkv,dy,)o7Ss就是初始密码。 
**2. 登录MySQL并修改初始密码：** 
使用初始密码登录MySQL:

```
[root@localhost ~]# mysql -uroot -p



Enter password:
```

登录后立即修改root密码：

```
mysql> alter user 'root'@'localhost' identified by 'your_password';



并不是期望的：



 Query OK, 0 rows affected (0.00 sec)



而是：



bash: alter: command not found...



mysql> update user set passsword="123456" where user="root";



也是：bash: alter: command not found.







解决方法：
```

1、修改 /etc/my.cnf，在 [mysqld] 小节下添加一行：skip-grant-tables=1



这一行配置让 mysqld 启动时不对密码进行验证



2、重启 mysqld 服务：systemctl restart mysqld



3、使用 root 用户登录到 mysql：mysql -u root 



4、切换到mysql数据库，更新 user 表：



update user set authentication_string = password('root'), password_expired = 'N', password_last_changed = now() where user = 'root';



在之前的版本中，密码字段的字段名是 password，5.7版本改为了 authentication_string



5、退出 mysql，（exit或者quit）编辑 /etc/my.cnf 文件，删除 skip-grant-tables=1 的内容



6、重启 mysqld 服务，再用新密码登录即可

```















```

``

##### **(五)、测试**

设置好以后，重新启动服务器，查看MySQL是否自动启动：

```
[root@localhost ~]# ps aux |grep mysqld



root       816  0.0  0.1 115388  1716 ?        S    14:45   0:00 /bin/sh /var/mysql//bin/mysqld_safe --datadir=/mysql_data --pid-file=/mysql_data/localhost.localdomain.pid



mysql     1034  1.0 17.6 1122908 179688 ?      Sl   14:45   0:00 /var/mysql/bin/mysqld --basedir=/var/mysql/ --datadir=/mysql_data --plugin-dir=/var/mysql//lib/plugin --user=mysql --log-error=/var/mysql/log/error.log --pid-file=/mysql_data/localhost.localdomain.pid --port=3306



root      1119  0.0  0.0 112676   984 pts/1    R+   14:46   0:00 grep --color=auto mysqld
```

出现以上信息就表示已经完成在CentOS7.2上手工编译、安装MySQL5.7.22全部过程)



##### (六)、远程连接

##### **1.用navicat远程连接，连接失败，解决方法**

先用telnet 192.168.***.*** 3306 ,连接不上，说明linux服务器，没有开启端口：

开启端口命令：

/sbin/iptables -I INPUT -p tcp --dport 3306 -j ACCEPT



![img](https://img-blog.csdn.net/20180705095817853?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Nzc3Nzc2NjY2NjYw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

登录mysql授权：

grant all privileges on *.* to 'root'@'%' identified by '123456'；

flush privileges;

![img](https://img-blog.csdn.net/20180705101632107?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Nzc3Nzc2NjY2NjYw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)





在windows下，用navicat连接成功





##### 





##### 

##### **(七)、其它操作**

查看开机自启动的服务使用chkconfig命令，如下：

```python
#chkconfig --list
```



或是只查看MySQL服务

```python
#chkconfig --list mysqld
```

可以看到mysql的2~5为on，说明mysql服务会随机器启动而自动启动。



2、配置MySQL的开机自动启动

```cs

```

1. chkconfig --add mysql
2. chkconfig mysqld on

3、命令启动/关闭MySQL实例：

```sql

```

1. 在bin目录下：service mysqld start/stop
2. /etc/init.d/mysqld start/stop

4、命令关闭MySQL

```perl
mysqladmin -p -u root shutdown
```

5、检查mysql是否真正的启动



方法一：查询端口

```python
#netstat -tulpn
```

MySQL监控的是TCP的3306端口，图中命令操作结果的最后一行即是MySQL服务在运行中。

方法二：查询进程

```perl
ps -ef | grep mysqld
```

如果有mysqld_safe和mysqld两个进程，说明MySQL服务当前在启动状态。



**centos7.2 查看防火墙状态**

firewall-cmd --state #查看默认防火墙状态（关闭后显示notrunning，开启后显示running）

systemctl stop firewalld.service #停止firewall

systemctl disable firewalld.service #禁止firewall开机启动

init 6 或者 reboot #重启虚拟机，然后再输入第一条命令查看防火墙状态

**netstat 和ifconfig不可用**



yum search ifconfig

通过yum search 这个命令我们发现ifconfig这个命令是在net-tools.x86_64这个包里，接下来我们安装这个包就行了

运行  yum install net-tools  就OK了





---







# centos7编译安装MySQL5.7.23

[Link](https://www.jianshu.com/p/e689b8700f1a) 

关注

2018.09.02 17:57* 字数 1297 阅读 568评论 0喜欢 1

**一、安装准备**

​    源码包放在/usr/local/src 目录。我的软件安装目录统一指定在 /usr/local/'软件名'（如：/usr/local/nginx、/usr/local/mysql）

​    下载mysql安装包、boot安装包

> [root@study ~]# cd /usr/local/src/
>
> [root@study src]# wget https://sourceforge.net/projects/boost/files/boost/1.59.0/boost_1_59_0.tar.gz
>
> [root@study src]# wget http://cdn.mysql.com/Downloads/MySQL-5.7/mysql-5.7.23.tar.gz

**二、安装依赖包**

> [root@study src]# yum -y install gcc gcc-c++ ncurses ncurses-devel cmake bison

**三、新建MySQL用户和用户组**

> [root@study src]#groupadd -r mysql && useradd -r -g mysql -s /sbin/nologin -M mysql

**四、解压压缩包、预编译。创建MySQL数据库数据保存目录 /data/mysql**

> [root@study src]# tar -zxvf boost_1_59_0.tar.gz
>
> [root@study src]# tar -zxvf mysql-5.7.23.tar.gz
>
> [root@study src]# mkdir -p /data/mysql
>
> [root@study src]# cd mysql-5.7.23
>
> [root@study mysql-5.7.23]# cmake . -DCMAKE_INSTALL_PREFIX=/usr/local/mysql \
>
> -DMYSQL_DATADIR=/data/mysql \
>
> -DSYSCONFDIR=/etc \
>
> -DWITH_INNOBASE_STORAGE_ENGINE=1 \
>
> -DWITH_PARTITION_STORAGE_ENGINE=1 \
>
> -DWITH_FEDERATED_STORAGE_ENGINE=1 \
>
> -DWITH_BLACKHOLE_STORAGE_ENGINE=1 \
>
> -DWITH_MYISAM_STORAGE_ENGINE=1 \
>
> -DENABLED_LOCAL_INFILE=1 \
>
> -DENABLE_DTRACE=0 \
>
> -DDEFAULT_CHARSET=utf8mb4 \
>
> -DDEFAULT_COLLATION=utf8mb4_general_ci \
>
> -DWITH_EMBEDDED_SERVER=1 \
>
> -DDOWNLOAD_BOOST=1 \ 
>
> -DWITH_BOOST=/usr/local/src/boost_1_59_0

**五、编译安装，过程很漫长**

> [root@study mysql-5.7.23]# make -j `grep processor /proc/cpuinfo | wc -l`

​    \#编译很消耗系统资源，小内存可能编译通不过

​    如报错：c++: internal compiler error: Killed (program cc1plus)

​    主要原因大体上是因为内存不足。例如我用阿里云单核、1G内存就出现这样问题，网上找了办法。临时使用交换分区来解决

​    命令：

​    [root@ study mysql-5.7.23]# dd if=/dev/zero of=/swapfile bs=64M count=16

​    [root@ study mysql-5.7.23]# mkswap /swapfile

​    [root@ study mysql-5.7.23]# swapon /swapfile

​    [root@ study mysql-5.7.23]# swapon -s

​    完成后继续上面 make 命令

​    *注：安装完毕后，删除交换分区*

​    *[root@ study mysql-5.7.23]# swapoff /swapfile*

​    *[root@ study mysql-5.7.23]# rm -rf /swapfile*

> *[root@ study mysql-5.7.23]# make install*

**六、安装完毕后，设置启动脚本，开机自启动**

> [root@study mysql-5.7.23]# ls -lrt /usr/local/mysql
>
> [root@study mysql-5.7.23]# cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysqld
>
> [root@study mysql-5.7.23]# chmod +x /etc/init.d/mysqld
>
> [root@study mysql-5.7.23]# systemctl enable mysqld
>
> mysqld.service is not a native service, redirecting to /sbin/chkconfig.
>
> Executing /sbin/chkconfig mysqld on

**七、添加配置文件，设置项比较多，需要根据自己环境、硬件来设置，下面仅供参考。**

> vi /etc/my.cnf
>
> [client]
>
> port = 3306
>
> socket = /tmp/mysql.sock
>
> [mysqld]
>
> port = 3306
>
> socket = /tmp/mysql.sock
>
> basedir = /usr/local/mysql
>
> datadir = /data/mysql
>
> pid-file = /data/mysql/mysql.pid
>
> user = mysql
>
> bind-address = 0.0.0.0
>
> server-id = 1
>
> init-connect = 'SET NAMES utf8mb4'
>
> character-set-server = utf8mb4
>
> \#skip-name-resolve
>
> \#skip-networking
>
> back_log = 300
>
> max_connections = 1000
>
> max_connect_errors = 6000
>
> open_files_limit = 65535
>
> table_open_cache = 128
>
> max_allowed_packet = 4M
>
> binlog_cache_size = 1M
>
> max_heap_table_size = 8M
>
> tmp_table_size = 16M
>
> read_buffer_size = 2M
>
> read_rnd_buffer_size = 8M
>
> sort_buffer_size = 8M
>
> join_buffer_size = 8M
>
> key_buffer_size = 4M
>
> thread_cache_size = 8
>
> query_cache_type = 1
>
> query_cache_size = 8M
>
> query_cache_limit = 2M
>
> ft_min_word_len = 4
>
> log_bin = mysql-bin
>
> binlog_format = mixed
>
> expire_logs_days = 30
>
> log_error = /data/mysql/error.log
>
> slow_query_log = 1
>
> long_query_time = 1
>
> slow_query_log_file = /data/mysql/slow.log
>
> performance_schema = 0
>
> explicit_defaults_for_timestamp
>
> \#lower_case_table_names = 1
>
> skip-external-locking
>
> default_storage_engine = InnoDB
>
> \#default-storage-engine = MyISAM
>
> innodb_file_per_table = 1
>
> innodb_open_files = 500
>
> innodb_buffer_pool_size = 64M
>
> innodb_write_io_threads = 4
>
> innodb_read_io_threads = 4
>
> innodb_thread_concurrency = 0
>
> innodb_purge_threads = 1
>
> innodb_flush_log_at_trx_commit = 2
>
> innodb_log_buffer_size = 2M
>
> innodb_log_file_size = 32M
>
> innodb_log_files_in_group = 3
>
> innodb_max_dirty_pages_pct = 90
>
> innodb_lock_wait_timeout = 120
>
> bulk_insert_buffer_size = 8M
>
> myisam_sort_buffer_size = 8M
>
> myisam_max_sort_file_size = 10G
>
> myisam_repair_threads = 1
>
> interactive_timeout = 28800
>
> wait_timeout = 28800
>
> [mysqldump]
>
> quick
>
> max_allowed_packet = 16M
>
> [myisamchk]
>
> key_buffer_size = 8M
>
> sort_buffer_size = 8M
>
> read_buffer = 4M
>
> write_buffer = 4M

**八、添加mysql的环境变量**

> [root@study mysql-5.7.23]# echo -e '\n\nexport PATH=/usr/local/mysql/bin:$PATH\n' >> /etc/profile && source /etc/profile

**九、初始化数据库**

> [root@study mysql-5.7.23]# mysql_install_db --verbose --user=mysql --basedir=/usr/local/mysql --datadir=/data/mysql

**十、启动数据库，顺利的话，应该能正常启动**

> [root@study mysql-5.7.23]# systemctl start mysqld
>
> [root@study mysql-5.7.23]# systemctl status mysqld

**十一、设置数据库root用户密码**

> [root@study mysql-5.7.23]# mysql_secure_installation
>
> 一路往下 y ，提示输入密码的地方，输入自己需要设置的密码即可。 用户密码策略分成低级 LOW 、中等 MEDIUM 和超强 STRONG 三种，推荐使用中等 MEDIUM 级别！

**十二、将MySQL数据库的动态链接库共享至系统链接库**

一般MySQL数据库还会被类似于PHP等服务调用，所以我们需要将MySQL编译后的lib库文件添加至当前Linux主机链接库 /etc/ld.so.conf.d/下，这样MySQL服务就可以被其它服务调用了。

> [root@study mysql-5.7.23]# ldconfig | grep mysql
>
> [root@study mysql-5.7.23]# echo "/usr/local/mysql/lib" > /etc/ld.so.conf.d/mysql.conf
>
> [root@study mysql-5.7.23]# ldconfig
>
> [root@study mysql-5.7.23]# ldconfig -v | grep mysql
>
> ldconfig: Can't stat /libx32: No such file or directory
>
> ldconfig: Path `/usr/lib' given more than once
>
> ldconfig: Path `/usr/lib64' given more than once
>
> ldconfig: Can't stat /usr/libx32: No such file or directory
>
> /usr/lib64/mysql:
>
> libmysqlclient.so.18 -> libmysqlclient.so.18.0.0
>
> /usr/local/mysql/lib:
>
> libmysqlclient.so.20 -> libmysqlclient.so.20.3.10

**十三、安装完毕，使用root登录试一把**

> [root@study mysql-5.7.23]# mysql -u root -p
>
> Enter password:
>
> 此时，输入密码后，若提示：You must reset your password using ALTER USER statement before executing，则如下操作
>
> SET PASSWORD = PASSWORD('**your password**');
>
> ALTER USER ‘root‘@‘localhost‘ PASSWORD EXPIRE NEVER; 
>
> FLUSH PRIVILEGES;
>
> 完毕后，重新登录MySQL即可
>
> mysql> show databases; 
>
> +--------------------+
>
> | Database |
>
> +--------------------+
>
> | information_schema |
>
> | mysql |
>
> | performance_schema |
>
> | sys |
>
> +--------------------+
>
> 4 rows in set (0.00 sec)

