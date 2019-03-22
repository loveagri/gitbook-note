# [mac php-fpm 守护进程运行](https://blog.csdn.net/weixin_36429334/article/details/83021052 )

问题是没有开启守护进程运行，php-fpm的时候出现 ready to handle connections … 关闭命令行窗口后又断开了 php-fpm ready to handle connections

解决方法：
1、首先要保证安装的PHP程序没有问题，因为我朋友启动php-fpm，网站的php文件依然可以解析，说明安装的程序没有任何问题。

2、查看php-fpm配置文件，因为php-fpm配置文件有一个选项是：

daemonize = yes

后台执行fpm，默认值为yes，如果为了调试可以改为no。在FPM中，可以使用不同的设置来运行多个进程池。 这些设置可以针对每个进程池单独设置。
vi /usr/local/etc/php/7.2/php-fpm.conf 这个是配置文件

但是我查看我朋友的php-fpm.conf配置文件，却发现它的“daemonize = no ”，因此只需要改过来就解决了！

