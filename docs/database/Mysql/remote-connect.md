# 远程主机联机

[原文1](https://m.php.cn/faq/522146.html)

#### 创建MySQL用户

```sh
CREATE USER 'remoteuser'@'%' IDENTIFIED BY 'password';
```

#### 授予MySQL权限

```sh
# 授予remoteuser用户对test数据库的全部权限
GRANT ALL ON test.* TO 'remoteuser'@'%';
```

如果是阿里云，腾讯云用户需要修改一下安全组，暴露一个非3306的端口，并且修改mysql的配置文件my.cnf

<img src="https://gitlab.com/loveagri/pic/-/raw/main/2023-08-16/15/image-20230816154530205_20230816154531.png" alt="image-20230816154530205" style="zoom:50%;" />

最后重启MySQL服务