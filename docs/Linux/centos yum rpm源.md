# CentOS nginx 从 安装 到 自配yum本地源

[CentOS nginx 从 安装 到 自配yum本地源](https://blog.csdn.net/qq_37913435/article/details/82470168)

## 安装

### 第一步

- 首先确认没有安装过nginx 

- yum info nginx

- 若显示为available 则没有安装

  

### 第二步

进入yum的配置文件夹中 
`[root@zbq yum.repos.d]# cd /etc/yum.repos.d/`



### 第三步

使用wget 安装ngnix到/etc/yum.repos.d/ 
wget http://nginx.org/packages/centos/6/noarch/RPMS/nginx-release-centos-6-0.el6.ngx.noarch.rpm

### 第四步

接下来安装nginx 
rpm -ivh nginx-release-centos-6-0.el6.ngx.noarch.rpm 
接下来会发现目录下多了一个 nginx.repo

```
[root@zbq yum.repos.d]# ll
total 36
-rw-r--r--. 1 root root 2523 Sep  6 09:23 ali-Base.repo
-rw-r--r--. 1 root root 1926 Sep  6 17:09 CentOS-Base.repo
-rw-r--r--. 1 root root  638 Nov 27  2013 CentOS-Debuginfo.repo
-rw-r--r--. 1 root root  576 Sep  6 17:07 CentOS-Media.repo
-rw-r--r--. 1 root root 3664 Nov 27  2013 CentOS-Vault.repo
-rw-r--r--. 1 root root 4311 Oct 14  2011 nginx-release-centos-6-0.el6.ngx.noarch.rpm
-rw-r--r--. 1 root root  113 Sep  6 17:26 nginx.repo
```

### 第五步

再把`ngnix.repo` 作为源 使用 `yum -l install nginx` 
安装完成之后ngnix就已经被安装完成了 版本为1.14 
使用`which nginx`来查看



