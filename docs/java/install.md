# centos安装jdk1.8的三种方法

[link](https://blog.csdn.net/dhr201499/article/details/81626466)

一、手动解压安装包：

1、在user目录下新建java文件夹：

# cd /usr/
# mkdir java
# cd java
2.下载jdk1.8，进入http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html，复制下载目录

# wget http://download.oracle.com/otn-pub/java/jdk/8u181-b13/96a7b8442fe848ef90c96a2fad6ed6d1/jdk-8u181-linux-x64.tar.gz?AuthParam=1534129356_6b3ac55c6a38ba5a54c912855deb6a22


3、解压：使用tar -zxvf 文件名进行解压。



解压之后：



4、配置环境变量：

# vi /etc/profile
将如下配置添加至文件中，然后保存退出。

#java
export JAVA_HOME=/usr/java/jdk1.8.0_181
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib
5、验证：



 

二、yum安装：

1、搜索jdk安装包

# yum search java|grep jdk


2、下载jdk1.8，下载之后默认的目录为： /usr/lib/jvm/

# yum install java-1.8.0-openjdk


3、配置环境变量及验证安装。

三、使用rpm安装：

1、下载rpm的安装包：

# wget http://download.oracle.com/otn-pub/java/jdk/8u181-b13/96a7b8442fe848ef90c96a2fad6ed6d1/jdk-8u181-linux-x64.rpm?AuthParam=1534132498_e541d098d71f6243516fa69cd17eba60


2、使用rpm命令安装：

# rpm -ivh jdk-8u181-linux-x64.rpm?AuthParam=1534132498_e541d098d71f6243516fa69cd17eba60


3、配置环境变量、验证安装。
--------------------- 
作者：难能可贵是梦想 
来源：CSDN 
原文：https://blog.csdn.net/dhr201499/article/details/81626466 
版权声明：本文为博主原创文章，转载请附上博文链接！