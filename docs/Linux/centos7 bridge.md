# virtualbox下centos7的桥接模式下的联网配置

### 一、如果是nat：

> 1、将ONBOOT=NO 改为 yes
> 重启一下即可

### 二、选择Bridge Adaper:

> 然后进行对网络配置的相关文件进行配置

> 1、vi /etc/sysconfig/network-scripts/ifcfg-enp0s3

> 将ONBOOT=NO 改为 yes
> 将BOOTPROTO改为static

> 加上你的信息：

> IPADDR:
> NETMASK:
> GATEWAY:
>
> 

> 同时编辑你的/etc/resolv.conf，指定DNS服务器，一般可以使用
> nameserver 208.67.222.222
> nameserver 8.8.8.8



# [Virtualbox的centos7 nat和桥接网络配置](https://www.centos.bz/2017/08/virtualbox-centos7-nat-bridge/)

使用桥接网络也能够连通主机与虚拟机之间的网络，并且能够访问互联网

### 1. 设置桥接模式，virtualbox中设置

![img](https://www.centos.bz/wp-content/uploads/2017/08/11-9.png)

### 2. 配置centos的网卡地址

![img](https://www.centos.bz/wp-content/uploads/2017/08/12-10.png)

### 3. 测试

主机能ping通虚拟机：

![img](https://www.centos.bz/wp-content/uploads/2017/08/13-9.png)

虚拟机也能ping通主机：

![img](https://www.centos.bz/wp-content/uploads/2017/08/14-6.png)



##所有的一切就绪之后需要重新生成uuid(uuidgen)和Mac地址,替换之后重启网络(systemctl restart network)

