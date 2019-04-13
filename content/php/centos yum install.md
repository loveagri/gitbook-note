# [Centos7Yum安装PHP7.2](https://www.cnblogs.com/lamp01/p/10101659.html)



1、安装源

安装`php72w`，是需要配置额外的`yum`源地址的，否则会报错不能找到相关软件包。

`php`高版本的`yum`源地址，有两部分，其中一部分是`epel-release`，另外一部分来自`webtatic`。如果跳过`epel-release`的话，安装`webtatic`的时候，会有错误爆出。

所以，这里需要的命令是：

```
rpm -Uvh https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-7-11.noarch.rpm
rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
```

当然，您也可以选择下面的这个命令，也是一样的效果。

```
yum install epel-release -y
rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
```

2、清除历史版本

为了防止`centos`上面发生`php`冲突，所以，这个命令还是先执行一下更好些。

```
yum -y remove php*
```

3、安装扩展包

事实上，这里面的对应扩展库很多，这里大家一定要注意`cli`和`fpm`这两个包，而其它的相关包就看您需要了。

```
yum -y install php72w php72w-cli php72w-fpm php72w-common php72w-devel 
```

还有比较豪华的版本：

```
yum -y install php72w php72w-cli php72w-fpm php72w-common php72w-devel php72w-embedded php72w-gd php72w-mbstring php72w-mysqlnd php72w-opcache php72w-pdo php72w-xml
```

4、安装完成以后，启动服务

```
systemctl enable php-fpm.service
systemctl start php-fpm.service
```

5、安装成功

![img](https://img2018.cnblogs.com/blog/1128628/201812/1128628-20181211133250649-26481438.png)

 