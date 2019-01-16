[linux下编译安装最新版phalcon centos下PHP7添加phalcon扩展](https://blog.csdn.net/u010474681/article/details/78441468)



## linux下编译安装phalcon

### 1、下载源码包   

运行命令：  git clone --depth=1 git://github.com/phalcon/cphalcon.git


进入目录 
运行命令：  cd build


执行安装文件  提示需要指定PHP的配置文件


运行命令：  ./install --php-config /usr/local/php/bin/php-config --phpize /usr/local/php/bin/phpize


安装过程可能中断，提示需要re2c
然后去下载
运行命令：  wget https://jaist.dl.sourceforge.net/project/re2c/old/re2c-0.13.4.tar.gz
解压，编译安装。


然后重新再执行phalcon的
运行命令：  ./install --php-config /usr/local/php/bin/php-config --phpize /usr/local/php/bin/phpize


编译完成之后，提示安装成功。

### 2、修改php.ini 添加phalcon.so扩展

运行命令： vi /usr/local/php/etc/php.ini

![image-20190116155126097](/Users/intech/Library/Application Support/typora-user-images/image-20190116155126097.png)





添加内容： extension="phalcon.so"
然后保存，重启php。





### 3、测试是否安装成功

web目录里新建 test.php
<?php  
var_dump(get_loaded_extensions());
?>

![image-20190116155209383](/Users/intech/Library/Application Support/typora-user-images/image-20190116155209383.png)



运行后看到有 phalcon扩展被加载， 即是安装phalcon框架成功。