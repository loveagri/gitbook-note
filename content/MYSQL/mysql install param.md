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
```

