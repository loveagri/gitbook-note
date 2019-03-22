# DHCP服务的搭建

[DHCP服务的搭建](https://www.linuxidc.com/Linux/2016-06/132395.htm)

[centos7网卡报错解决办法总结FailedtostartLSB:Bringup/downnetworking ](http://blog.sina.com.cn/s/blog_6253d0970102xg3o.html)

[重启网络报错 Failed to start LSB: Bring up/down](http://www.raksmart.com/29.html?l=zh-cn)

[dhcp服务](https://blog.csdn.net/csdn_immortal/article/details/81068259)

配置dhcpd.conf

```
default-lease-time 600;
max-lease-time 7200;


subnet 192.168.1.0 netmask 255.255.255.0 {
  range 192.168.1.10 192.168.1.200;
  option domain-name-servers 203.167.97.66;
  option subnet-mask 255.255.255.0;
  option routers 192.168.1.1;
  option broadcast-address 192.168.1.255;
  default-lease-time 600;
  max-lease-time 7200;
}


```



```
> Subnet: 网段声明作用于整个子网段 
> range: 设置用于分配的IP地址池  起始IP 
> option domain-name-servers: 设置指定域名服务器
> option routers: 设置网关地址
> option broadcast-address: 设置广播地址
> option subnet-mask: 设置客户机的子网掩码 
> Host: 保留主机，作用于单个主机 ,(通常防止所在网段的subnet声明内) 
> default-lease-time: 设置默认的租约
> max-lease-time: 最大的租约时间
> hardware ethernet参数：指定对应主机的MAC地址
> fixed-address参数: 指定为该主机保留的IP地址

 - 说明一下，dhcp服务器如果想配置不同网段的IP，前提必须有一个和本地IP同网段的声明才可以。
```

- 启动DHCP服务，并设置为开机自起状态



enp0s3文件

```
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=dhcp
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=enp0s3
UUID=e92513bf-6b72-4384-81b6-a2b5d242d475
DEVICE=enp0s3
ONBOOT=yes
IPADDR=192.168.1.201
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
DNS1=203.167.97.66
DNS2=203.167.97.200
HWADDR=08:00:27:40:43:ca
```



vim /etc/sysconfig/network 主机名文件

```
NETWORKING=yes
HOSTNAME=localhost #可以修改
```



vim /etc/resolv.conf 配置DNS解析服务器

```
nameserver 203.167.97.66 ip ip
```

重点注意：开启动态DHCP获取ip前先执行静态static获取，然后在重启DHCP服务，接着重启network服务

## 问题描述:

我的vm中安装了一台虚拟机centos7,用着用着不知道为什么网络就不能用了.

解决:

查询了一下,好像是系统自带的NetworkManager这个管理套件有关系，关掉.

关掉方法:

**systemctl stop NetworkManager**

**systemctl disable NetworkManager**

重新启动网络：

**systemctl start network.service**

**ifconfig 如果网络可以那么你就走运了,问题已解决,但我这个时候还是有报错.**

**报错(**`Job ``for` `network.service failed because the control process exited with error code. See ``"systemctl status network.service"` `and ``"journalctl -xe"` `for` `details.`

**`[root@centos7 ~]``#`)**

**按照提示输入systemctl status network.service查看到有:**

**`Failed to start LSB: Bring up /down networking.`**

**`不是那么走运吧,继续解决.`**

**`下一步修改mac地址,这一步我没有做,好像也没关系.对应网络配置文件里的字段是`**HWADDR=00:0c:29:0c:15:49

再下一步,将7的网卡名改成了eth0（众所周知7的网卡名是eno后面随机 一串数字），生成菜单时没有生效，那么在此生效一下.

注意网卡配置名是已经修改成eth0以后执行下面操作，一共修改的地方有三处.

第一处网卡名：/etc/sysconfig/network-scripts/ifcfg-eth0 ，

第二处配置文件里面：NAME=eth0 ，

第三处也是配置文件里面：DEVICE=eth0

这里贴出一下我的ifcfg-eth0文件信息:

注:我的虚拟机网卡是配置的NAT模式

修改/etc/sysconfig/grub,添加net.ifnames=0 biosdevname=0

注意在/etc/sysconfig/grub文件的标红位置

```
GRUB_CMDLINE_LINUX=``"crashkernel=128M rd.lvm.lv=centos/root rhgb quiet net.ifnames=0 biosdevname=0"
```

下一步,生成菜单

grub2-mkconfig -o /boot/grub2/grub.cfg

最后reboot重启,我的网卡重启就好了

我的问题解决了,但愿你的问题也解决了.

最后贴上一些有用的命令:

重启网卡

systemctl restart network

给NetworkManager-wait-online服务设置开机自启动

```
systemctl enable NetworkManager-wait-online.service
```



停止关闭NetworkManager

```
systemctl stop NetworkManager
systemctl disable NetworkManager
```



