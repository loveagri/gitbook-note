# mac开机启动原理和关闭apachectl开机启动

cd  /System/Library/LaunchDaemons/     //可以看到所有自动启动的plist文件

想关掉mac下apache的开机启动

```
sudo launchctl unload -w /System/Library/LaunchDaemons/org.apache.httpd.plist
```

如果想再打开：

```
sudo launchctl load -w /System/Library/LaunchDaemons/org.apache.httpd.plist
```

**系统**的开机启动plist目录：/System/Library/LaunchDaemons/

**用户**的开启启动plist目录：/Library/LaunchDaemons/



# [mac 下nginx加入开机启动](https://www.cnblogs.com/daly2008/p/5367700.html)



通过brew install nginx后设置开机启动项

sudo cp /usr/local/opt/nginx/*.plist /Library/LaunchDaemons
sudo launchctl load -w /Library/LaunchDaemons/homebrew.mxcl.nginx.plist