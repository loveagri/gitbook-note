<center><h1>Mac开机自启动NGINX和PHP</h1></center>

[Mac开机自启动NGINX和PHP](https://cn.aliyun.com/jiaocheng/696856.html)

1. 开机启动nginx:

在 /Library/LaunchDaemons/ 目录新建 org.macports.nginx.plist 文件:

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC -//Apple Computer//DTD PLIST 1.0//ENhttp://www.apple.com/DTDs/PropertyList-1.0.dtd ><plist version="1.0"><dict> <key>Label</key> <string>org.macports.nginx</string> <key>ProgramArguments</key> <array> <string>/usr/local/bin/nginx</string> </array> <key>KeepAlive</key> <true/></dict></plist>
```



加载配置:launchctl load -w /Library/LaunchDaemons/org.macports.nginx.plist

2. 开机启动php:

在 /Library/LaunchDaemons/ 目录新建 org.php.php-fpm.plist 文件:

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC -//Apple Computer//DTD PLIST 1.0//ENhttp://www.apple.com/DTDs/PropertyList-1.0.dtd ><plist version="1.0"><dict> <key>Label</key> <string>org.php.php-fpm</string> <key>ProgramArguments</key> <array> <string>/usr/sbin/php-fpm</string> </array> <key>KeepAlive</key> <true/></dict></plist>
```



加载配置:launchctl load -w /Library/LaunchDaemons/org.php.php-fpm.plist

Reference: launchd.plist-- System wide and per-user daemon/agent configuration files