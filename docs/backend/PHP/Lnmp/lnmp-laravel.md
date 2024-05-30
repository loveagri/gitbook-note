# Lnmp之安装laravel应用

[原文](https://blog.csdn.net/bhjgyfyki/article/details/111867284) [官网](https://lnmp.org/install.html)

```sh
wget http://soft.vpser.net/lnmp/lnmp2.0.tar.gz -O lnmp2.0.tar.gz && tar zxf lnmp2.0.tar.gz && cd lnmp2.0 && ./install.sh lnmp
```

###### 配置切换Composer镜像源，先把默认的源禁用，再修改镜像源

```sh
# 禁用默认源命令：
composer config -g secure-http false
# 切换阿里云镜像源命令：
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
#查看配置
composer config -g -l
```

按官网步骤安装好后，接下来就回暴露一些问题，

###### Composer 创建laravel会出现问题

<img src="https://gitlab.com/loveagri/pic/-/raw/main/2023-08-16/14/image-20230816144559612_20230816145630.png" alt="image-20230816144559612" style="zoom:50%;" />

这个提示是需要修改配置文件php.ini，删掉需要的命令

```sh
vim /usr/local/php/etc/php.ini
```

![image-20230816145013398](https://gitlab.com/loveagri/pic/-/raw/main/2023-08-16/14/image-20230816145013398_20230816145635.png)

###### 命令行创建主机

```sh
lnmp vhost add #注意选择需要的模版，这里选择laravel,或者thinkphp
```

继续访问还会报错，这时就需要修改fastcgi.conf

![image-20230816150326090](https://gitlab.com/loveagri/pic/-/raw/main/2023-08-16/15/image-20230816150326090_20230816150327.png)

之后将项目所有目录用户和用户组修改为www

```sh
chown www.www project/ -R
```

###### 一切完事之后重启nginx

```sh
/usr/local/nginx/sbin/nginx -s reload
```
