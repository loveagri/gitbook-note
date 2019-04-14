# CentOS7.2编译安装PHP7.2.3之史上最详细步骤。

[Link](https://blog.csdn.net/sinat_30603081/article/details/80880820)

# 

首先，我们的CentOS版本信息如下：

![img](https://images2018.cnblogs.com/blog/978478/201803/978478-20180309105531791-1537898688.png)

开始我们的编译。

第一步：

将php安装包安装到/usr/src目录下。

```
`cd` `/usr/src` `&& wget http:``//cn2``.php.net``/distributions/php-7``.2.3.``tar``.gz`
```

![img](https://images2018.cnblogs.com/blog/978478/201803/978478-20180309105823117-516964063.png)

第二步:

加压这个压缩包

```
tar -xzxvf php-7.2.3.tar.gz
```

![img](https://images2018.cnblogs.com/blog/978478/201803/978478-20180309105938338-374859696.png)

第三步：

进入压缩后的文件目录。安装如下文件，如果已经安装也没问题,系统会提示已经安装，nothing to do。

```
cd php-7.2.3/

   yum install gcc gcc-c++ gcc-g77 
   yum install libxml2
   yum install libxml2-devel -y
   yum install openssl openssl-devel -y
   yum -y install curl-devel 
   yum install libjpeg.x86_64 libpng.x86_64 freetype.x86_64 libjpeg-devel.x86_64 libpng-devel.x86_64 freetype-devel.x86_64 -y
   yum install bzip2-devel.x86_64 -y
   yum install libXpm-devel -y
   yum install gmp-devel -y
   yum install -y icu libicu libicu-devel
   yum  install  php-mcrypt  libmcrypt  libmcrypt-devel -y
   yum install  postgresql-devel -y
   yum install libxslt-devel -y
   yum -y install libjpeg-devel
   yum install install autoconf automake libtool -y

```



第四步：

执行以下命令（编译的配置参数）

![复制代码](http://common.cnblogs.com/images/copycode.gif)

```
./configure --prefix=/usr/local/php --with-pdo-pgsql --with-zlib-dir --with-freetype-dir --enable-mbstring --with-libxml-dir=/usr --enable-soap --enable-calendar --with-curl --with-mcrypt --with-gd --with-pgsql --disable-rpath --enable-inline-optimization --with-bz2 --with-zlib --enable-sockets --enable-sysvsem --enable-sysvshm --enable-pcntl --enable-mbregex --enable-exif --enable-bcmath --with-mhash --enable-zip --with-pcre-regex --with-pdo-mysql --with-mysqli --with-jpeg-dir=/usr --with-png-dir=/usr --enable-gd-native-ttf --with-openssl --with-fpm-user=www-data --with-fpm-group=www-data --with-libdir=/lib/x86_64-linux-gnu/--enable-ftp --with-gettext --with-xmlrpc --with-xsl --enable-opcache --enable-fpm --with-iconv --with-xpm-dir=/usr
```

![复制代码](http://common.cnblogs.com/images/copycode.gif)



```
wget http://ftp.gnu.org/gnu/bison/bison-2.4.1.tar.gz
tar -zxvf bison-2.4.1.tar.gz
cd bison-2.4.1/
./configure
```

```
wget https://sourceforge.net/projects/re2c/files/0.16/re2c-0.16.tar.gz
tar zxf re2c-0.16.tar.gz && cd re2c-0.16
./configure
make && make install
```

```
#拿到安装包
wget http://ftp.gnu.org/pub/gnu/ncurses/ncurses-5.6.tar.gz
#解压
tar zxvf ncurses-5.6.tar.gz
#指向php的路径
./configure -prefix=/usr/src/php-7.2.3
#开始make
make && make install
```



此时，我们再去/usr/src/php-7.2.3目录下make && make install。

这时候 我们输入php -v可以看到php的版本。 

![img](https://images2018.cnblogs.com/blog/978478/201803/978478-20180309152826224-1196609914.png)

但是，我们一般还需要做一个配置。让php成为一个服务。并且开机自启。

但是却发现php-fpm不知道咋哪里。 那我们就应该安装php-fpm.

```
#找找php-fpm
find / -name php-fpm.conf
#没找到就安装
yum install php-fpm php-mysql
```

![img](https://images2018.cnblogs.com/blog/978478/201803/978478-20180309153101672-1698605975.png)

做如下的配置

```
mkdir -p /usr/local/php/etc/
touch /usr/local/php/etc/php-fpm.conf
cp /etc/php-fpm.conf /usr/local/php/etc/php-fpm.conf
```

同样道理

```
mkdir -p /usr/local/php/etc/php-fpm.d/
touch /usr/local/php/etc/php-fpm.d/www.conf
cp /etc/php-fpm.d/www.conf /usr/local/php/etc/php-fpm.d/www.conf
```

继续

```
mkdir -p /etc/init.d 
touch /etc/init.d/php-fpm
cp /usr/src/php-7.2.3/sapi/fpm/init.d.php-fpm.in /etc/init.d/php-fpm 
```

启动服务并查看

```
 service php-fpm start
 ps aux | grep php-fpm
```

此时我们的php编译就大功告成。

如下：

![img](https://images2018.cnblogs.com/blog/978478/201803/978478-20180309155702948-227815475.png)

 

---

# centos7.2+php7.2+nginx1.12.0+mysql5.7配置

[Link](https://blog.csdn.net/qq_32080545/article/details/78894792)

---



一. **源码安装php7.2**

1. 选择需要的php版本

- 从 php官网： <http://cn2.php.net/downloads.php> 选择需要的php版本，选择`.tar.gz` 的下载包，点击进入，选择中国的本地语言包，复制这个下载地址![比说说这里选择的是php7.2](https://img-blog.csdn.net/20171225155329325?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzIwODA1NDU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)![选择本地语言](https://img-blog.csdn.net/20171225155743371?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzIwODA1NDU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

最后得到的下载的地址就是：
<http://cn2.php.net/get/php-7.2.0.tar.gz/from/this/mirror>
（参照这个方法就可以随时获取最新版本的PHP了）
2.下载php源码

- 选择一个位置存放文件
  `cd /usr/src/`
- 下载刚刚选好的php压缩包
  `wget http://cn2.php.net/get/php-7.2.0.tar.gz/from/this/mirror`
  但是我们下载下来看到并不是我们要的`php-7.2.0.tar.gz` 类似的压缩文件，而是一个mirror的文件，很简单，我们给文件重命名就可以了
  `mv mirror php-7.2.0.tar.gz`

1. 安装php所需要的依赖

```
    yum install gcc
	yum install libxml2
	yum install libxml2-devel -y
    yum install openssl openssl-devel -y
	yum -y install curl-devel 
	yum install libjpeg.x86_64 libpng.x86_64 freetype.x86_64 libjpeg-devel.x86_64 libpng-devel.x86_64 freetype-devel.x86_64 -y
	yum install bzip2-devel.x86_64 -y
	yum install libXpm-devel -y
	yum install gmp-devel -y
	yum install -y icu libicu libicu-devel
	yum  install  php-mcrypt  libmcrypt  libmcrypt-devel -y
	yum install  postgresql-devel -y
	yum install libxslt-devel -y
	yum -y install libjpeg-devel
1234567891011121314
```

4.解压编译
`tar -xzxvf php-7.2.0.tar.gz`
`cd php-7.2.0`
设置编译需要加载的模块
`./configure --prefix=/usr/local/php --with-pdo-pgsql --with-zlib-dir --with-freetype-dir --enable-mbstring --with-libxml-dir=/usr --enable-soap --enable-calendar --with-curl --with-mcrypt --with-gd --with-pgsql --disable-rpath --enable-inline-optimization --with-bz2 --with-zlib --enable-sockets --enable-sysvsem --enable-sysvshm --enable-pcntl --enable-mbregex --enable-exif --enable-bcmath --with-mhash --enable-zip --with-pcre-regex --with-pdo-mysql --with-mysqli --with-jpeg-dir=/usr --with-png-dir=/usr --enable-gd-native-ttf --with-openssl --with-fpm-user=www-data --with-fpm-group=www-data --with-libdir=/lib/x86_64-linux-gnu/--enable-ftp --with-gettext --with-xmlrpc --with-xsl --enable-opcache --enable-fpm --with-iconv --with-xpm-dir=/usr`

编译：
`make clean && make && make install`
\5. 复制配置文件
`cp php.ini-development /usr/local/php/lib/php.ini`
\6. 设置全局的php命令
`vim /etc/profile`
在文件最后添加：

```
PATH=$PATH:/usr/local/php/bin
export PATH
12

ln -s /usr/local/php/bin/php /usr/bin/php
```

然后执行 命令 `source /etc/profile`
此时php就是全局命令了，可以通过`php -v` 查看php版本信息或者`php -m` 看看刚刚编译加载的模块了

1. 配置PHP-fpm

```
cp /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf
 
cp /usr/local/php/etc/php-fpm.d/www.conf.default /usr/local/php/etc/php-fpm.d/www.conf
 
cp /usr/src/php-7.2.0/sapi/fpm/init.d.php-fpm /etc/init.d/php-fpm
 
chmod +x /etc/init.d/php-fpm
1234567
```

新建www-data 用户组：

```
groupadd www-data
useradd -g www-data www-data  #对应configure里的用户组
12
```

启动php-fpm
`/etc/init.d/php-fpm start`
(可选)配置php-fpm自启动，如果存在这个文件，这步省略
创建php-fpm启动脚本

```
vim /etc/init.d/php-fpm
1
```

插入如下内容：

```
#!/bin/sh  
# chkconfig:   2345 15 95

# description:  PHP-FPM (FastCGI Process Manager) is an alternative PHP FastCGI implementation \

# with some additional features useful for sites of any size, especially busier sites.
# DateTime: 2016-09-20

# Source function library.  
. /etc/rc.d/init.d/functions  

# Source networking configuration.  
. /etc/sysconfig/network  

# Check that networking is up.  
[ "$NETWORKING" = "no" ] && exit 0  

phpfpm="/usr/local/php/sbin/php-fpm"  
prog=$(basename ${phpfpm})  

lockfile=/var/lock/subsys/phpfpm

start() {  
    [ -x ${phpfpm} ] || exit 5  
    echo -n $"Starting $prog: "  
    daemon ${phpfpm}
    retval=$?  
    echo  
    [ $retval -eq 0 ] && touch $lockfile  
    return $retval  
}  

stop() {  
    echo -n $"Stopping $prog: "  
    killproc $prog -QUIT  
    retval=$?  
    echo  
    [ $retval -eq 0 ] && rm -f $lockfile  
    return $retval  
}  

restart() {  
    configtest || return $?  
    stop  
    start  
}  

reload() {  
    configtest || return $?  
    echo -n $"Reloading $prog: "  
    killproc ${phpfpm} -HUP  
    RETVAL=$?  
    echo  
}  

force_reload() {  
    restart  
}  

configtest() {  
  ${phpfpm} -t
}  

rh_status() {  
    status $prog  
}  

rh_status_q() {  
    rh_status >/dev/null 2>&1  
}  

case "$1" in  
    start)  
        rh_status_q && exit 0  
        $1  
        ;;  
    stop)  
        rh_status_q || exit 0  
        $1  
        ;;  
    restart|configtest)  
        $1  
        ;;  
    reload)  
        rh_status_q || exit 7  
        $1  
        ;;  
    status)  
        rh_status  
        ;;  
    *)  
        echo $"Usage: $0 {start|stop|status|restart|reload|configtest}"  
        exit 2  
esac    
12345678910111213141516171819202122232425262728293031323334353637383940414243444546474849505152535455565758596061626364656667686970717273747576777879808182838485868788899091929394
```

添加到开机启动项
`chkconfig --add php-fpm`

此时也可以使用service来启动php-fpm了

```
service php-fpm start
service php-fpm stop
```



[码编译PHP7遇到的错误及解决方案 ](https://my.oschina.net/idufei/blog/1805961)



success

```
Installing shared extensions:     /usr/local/php/lib/php/extensions/no-debug-non-zts-20170718/
Installing PHP CLI binary:        /usr/local/php/bin/
Installing PHP CLI man page:      /usr/local/php/php/man/man1/
Installing PHP FPM binary:        /usr/local/php/sbin/
Installing PHP FPM defconfig:     /usr/local/php/etc/
Installing PHP FPM man page:      /usr/local/php/php/man/man8/
Installing PHP FPM status page:   /usr/local/php/php/php/fpm/
Installing phpdbg binary:         /usr/local/php/bin/
Installing phpdbg man page:       /usr/local/php/php/man/man1/
Installing PHP CGI binary:        /usr/local/php/bin/
Installing PHP CGI man page:      /usr/local/php/php/man/man1/
Installing build environment:     /usr/local/php/lib/php/build/
Installing header files:          /usr/local/php/include/php/
Installing helper programs:       /usr/local/php/bin/
  program: phpize
  program: php-config
Installing man pages:             /usr/local/php/php/man/man1/
  page: phpize.1
  page: php-config.1
Installing PEAR environment:      /usr/local/php/lib/php/
[PEAR] Archive_Tar    - installed: 1.4.3
[PEAR] Console_Getopt - installed: 1.4.1
[PEAR] Structures_Graph- installed: 1.1.1
[PEAR] XML_Util       - installed: 1.4.2
[PEAR] PEAR           - installed: 1.10.5
Wrote PEAR system config file at: /usr/local/php/etc/pear.conf
You may want to add: /usr/local/php/lib/php to your php.ini include_path
/usr/local/src/php-7.2.3/build/shtool install -c ext/phar/phar.phar /usr/local/php/bin
ln -s -f phar.phar /usr/local/php/bin/phar
Installing PDO headers:           /usr/local/php/include/php/ext/pdo/
```

