```
cmake . -DCMAKE_INSTALL_PREFIX=/application/mysql-5.5.32 \
-DMYSQL_DATADIR=/application/mysql-5.5.32/data \
-DMYSQL_UNIX_ADDR=/application/mysql-5.5.32/tmp/msyql.sock \
-DDEFAULT_CHARSET=utf8 \
-DDEFAULT_COLLATION=utf8_general_ci \
-DEXTRA_CHARSETS=gbk,gb2312,utf8,ascii \
-DENABLED_LOCAL_INFILE=ON \
-DWITH_INNOBASE_STORAGE_ENGINE=1 \
-DWITH_FEDERATED_STORAGE_ENGINE=1 \
-DWITH_BLACKHOLE_STORAGE_ENGINE=1 \
-DWITHOUT_EXAMPLE_STORAGE_ENGINE=1 \
-DWITHOUT_RARTITION_STORAGE_ENGINE=1 \
-DWITH_FAST_MUTEXES=1 \
-DWITH_ZLIB=bundled \
-DENABLED_LOCAL_INFILE=1 \
-DWITH_PEADLINE=1 \
-DWITH_EMBEDDED_SERVER=1 \
-DWITH_DEBUG=0

```



#### create user and group

```
groupadd mysql
useradd mysql -s /sbin/nologin -M -g mysql

ln -s /application/mysql-5.5.32/ /application/mysql

cpm mysql-5.5.32/support-files/my-small.cnf /etc/my.cnf


echo 'export PATH=/application/mysql/bin:$PATH' >> /etc/profile
tail -l /etc/profile
source /etc/profile
echo $PATH

ln -s  /application/mysql-5.5.32 /application/mysql

cp mysql-5.5.32/support-files/my-small.cnf /etc/my.cnf

chown -R mysql.mysql /application/mysql/data

chmod -R 1777 /tmp

cd /application/mysql/scripts

➜  scripts ./mysql_install_db --basedir=/application/mysql/ --datadir=/application/mysql/data --user=mysql

Installing MySQL system tables...
OK
Filling help tables...
OK

To start mysqld at boot time you have to copy
support-files/mysql.server to the right place for your system

PLEASE REMEMBER TO SET A PASSWORD FOR THE MySQL root USER !
To do so, start the server, then issue the following commands:

/application/mysql//bin/mysqladmin -u root password 'new-password'
/application/mysql//bin/mysqladmin -u root -h VM_0_3_centos password 'new-password'

Alternatively you can run:
/application/mysql//bin/mysql_secure_installation

which will also give you the option of removing the test
databases and anonymous user created by default.  This is
strongly recommended for production servers.

See the manual for more instructions.

You can start the MySQL daemon with:
cd /application/mysql/ ; /application/mysql//bin/mysqld_safe &

You can test the MySQL daemon with mysql-test-run.pl
cd /application/mysql//mysql-test ; perl mysql-test-run.pl

Please report any problems with the /application/mysql//scripts/mysqlbug script!

~ cd /application
➜  /application cp mysql/support-files/mysql.server /etc/init.d/mysqld

chmod +x /etc/init.d/mysqld

netstat -ltnup | grep 3306

select user,host from mysql.user;

delete from mysql.user where user='';

grant all privileges on *.* to system@'localhost' identified by 'lodboy123' with grant option;

chkconfig mysql on

chkconfig --list mysqld


```

