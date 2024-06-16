# Docker 网络

## Docker Bridge 网络

### 创建容器

```sh
docker container run -d --rm --name box1 busybox /bin/sh -c "while true; do sleep 3600; done"
docker container run -d --rm --name box2 busybox /bin/sh -c "while true; do sleep 3600; done"
```

### 创建docker网络

```sh
$ docker network create -d bridge mybridge

$ docker network ls                       
NETWORK ID     NAME       DRIVER    SCOPE
3d429aefb28d   bridge     bridge    local
4b38069e4550   host       host      local
bafb6e4b0700   mybridge   bridge    local
f97986836031   none       null      local

# 创建自定义网关和子网掩码的网络
$ docker network create -d bridge --gateway 172.200.0.1 --subnet 172.200.0.0/16 youbridge

# 创建容器，指定连接的网络
$ docker container run -d --rm --name box3 --network mybridge busybox /bin/sh -c "while true; do sleep 3600; done"

# 查看web3配置
$ docker container inspect box3
```

### 连接docker bridge 网络

```sh
docker network connect bridge box3
```

### 关闭docker bridge 网络

```sh
docker network disconnect bridge box3
```

### 查看网络

```sh
docker network ls

docker network inspect bridge
```

::: tip

`brctl` 显示Linux bridge信息，使用前需要安装, 对于CentOS, 可以通过 `sudo yum install -y bridge-utils` 安装. 对于Ubuntu, 可以通过 `sudo apt-get install -y bridge-utils`

:::

### 容器对外通信

```sh
# 查看路由
ip route

# result start
default via 10.0.2.2 dev eth0 proto dhcp src 10.0.2.15 metric 100 
10.0.2.0/24 dev eth0 proto kernel scope link src 10.0.2.15 metric 100 
10.0.2.2 dev eth0 proto dhcp scope link src 10.0.2.15 metric 100 
10.0.2.3 dev eth0 proto dhcp scope link src 10.0.2.15 metric 100 
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 
# result end

# iptable 转发规则
sudo iptables --list -t nat

# result start
Chain PREROUTING (policy ACCEPT)
target     prot opt source               destination         
DOCKER     all  --  anywhere             anywhere             ADDRTYPE match dst-type LOCAL

Chain INPUT (policy ACCEPT)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination         
DOCKER     all  --  anywhere            !localhost/8          ADDRTYPE match dst-type LOCAL

Chain POSTROUTING (policy ACCEPT)
target     prot opt source               destination         
MASQUERADE  all  --  172.17.0.0/16        anywhere            

Chain DOCKER (2 references)
target     prot opt source               destination         
RETURN     all  --  anywhere             anywhere 
# result end
```

::: warning

经过测试，新版docker，自定义的网络已经无法实现DNS功能，也就是说无法通过直接ping 容器的名字连接访问的主机。

```sh
# 在docker内
docker exec -it box1 ping box2 #从box1 ping box2 不通
```



:::

### 端口转发or映射

创建容器

```sh
# 创建容器
docker container run -d --rm --name web -p 8080:80 nginx 

# 查看内部地址
docker container inspect --format '{{.NetworkSettings.IPAddress}}' web

# 创建另一个容器访问NGINX
docker container run -d --rm --name client busybox /bin/sh -c "while true; do sleep 3600; done"
docker container inspect --format '{{.NetworkSettings.IPAddress}}' client
docker container exec -it client wget http://172.17.0.2
```

查看iptables的端口转发规则

```sh{23}
sudo iptables -t nat -nvxL

# result start
Chain PREROUTING (policy ACCEPT 0 packets, 0 bytes)
    pkts      bytes target     prot opt in     out     source               destination         
       5      220 DOCKER     all  --  *      *       0.0.0.0/0            0.0.0.0/0            ADDRTYPE match dst-type LOCAL

Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
    pkts      bytes target     prot opt in     out     source               destination         

Chain OUTPUT (policy ACCEPT 0 packets, 0 bytes)
    pkts      bytes target     prot opt in     out     source               destination         
       0        0 DOCKER     all  --  *      *       0.0.0.0/0           !127.0.0.0/8          ADDRTYPE match dst-type LOCAL

Chain POSTROUTING (policy ACCEPT 0 packets, 0 bytes)
    pkts      bytes target     prot opt in     out     source               destination         
      23     1532 MASQUERADE  all  --  *      !docker0  172.17.0.0/16        0.0.0.0/0           
       0        0 MASQUERADE  tcp  --  *      *       172.17.0.2           172.17.0.2           tcp dpt:80

Chain DOCKER (2 references)
    pkts      bytes target     prot opt in     out     source               destination         
       0        0 RETURN     all  --  docker0 *       0.0.0.0/0            0.0.0.0/0           
       0        0 DNAT       tcp  --  !docker0 *       0.0.0.0/0            0.0.0.0/0            tcp dpt:8080 to:172.17.0.2:80
#result end
```

## HOST 网络

host网络和主机共享同一个网络，也就是host网络是和宿主机在一个网络，如：

```sh
docker container run -d --rm --name box2 --network host busybox /bin/sh -c "while true; do sleep 3600; done"
```

host网络可以直接把端口暴露给宿主机，不需要做端口映射。





## none网络

不会分配网络地址，主要是服务于一些编排工具，通过编排工具分配网络

```sh
docker container run -d --rm --name box1 --network none busybox /bin/sh -c "while true; do sleep 3600; done"
```

































































































































