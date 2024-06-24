# Swarm

# 激活

```sh
docker info # 查看 Swarm: active

docker swarm init
```

相关命令

```sh
# 列出节点状态
docker node ls 

# leave
docker node leave

# 创建服务
docker service create nignx

# 查看service 
docker service ls

# 查看具体service
docker service ps <service_id>

# 删除具体service
docker service rm <service_id>
```



# 练习

相关脚本 setup.sh

```sh
#/bin/sh

# install some tools
sudo apt-get install -y git vim gcc build-essential telnet bridge-utils ipvsadm

# install docker
curl -fsSL https://gitee.com/loveagri/vagrant/raw/master/docker/get-docker.sh -o get-docker.sh
sudo sh get-docker.sh --mirror AzureChinaCloud

if [ ! -f /etc/docker/daemon.json ]; then
    sudo mkdir -p /etc/docker
    cat <<EOF | sudo tee /etc/docker/daemon.json
{
    "exec-opts": ["native.cgroupdriver=systemd"],
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "100m"
    },
    "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
    "storage-driver": "overlay2",
    "registry-mirrors": [
        "https://ccr.ccs.tencentyun.com",
        "https://ustc-edu-cn.mirror.aliyuncs.com",
        "https://docker.m.daocloud.io"
    ]
}
EOF
fi

sudo systemctl start docker
sudo systemctl enable docker

if [ ! $(getent group docker) ]; then
    sudo groupadd docker
else
    echo "docker user group already exists"
fi

sudo gpasswd -a $USER docker
sudo service docker restart

rm -rf get-docker.sh

# open password auth for backup if ssh key doesn't work, bydefault, username=vagrant password=vagrant
# sudo sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config
# sudo service sshd restart

```

Vagrantfile

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 1.6.0"

boxes = [
    {
        :name => "swarm-manager",
        :eth1 => "192.168.200.10",
        :mem => "1024",
        :cpu => "1"
    },
    {
        :name => "swarm-worker1",
        :eth1 => "192.168.200.11",
        :mem => "1024",
        :cpu => "1"
    },
    {
        :name => "swarm-worker2",
        :eth1 => "192.168.200.12",
        :mem => "1024",
        :cpu => "1"
    }
]

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/focal64"
  boxes.each do |opts|
    config.vm.define opts[:name] do |config|
      config.vm.hostname = opts[:name]
      config.vm.provider "vmware_fusion" do |v|
        v.vmx["memsize"] = opts[:mem]
        v.vmx["numvcpus"] = opts[:cpu]
      end
      config.vm.provider "virtualbox" do |v|
        v.customize ["modifyvm", :id, "--memory", opts[:mem]]
        v.customize ["modifyvm", :id, "--cpus", opts[:cpu]]
      end
      config.vm.network :private_network, ip: opts[:eth1]
    end
  end
  config.vm.provision "shell", privileged: false, path: "./setup.sh"
end

```

相关脚本

```sh
# 激活manager 中的swarm
docker swarm init --advertise-addr=192.168.200.10

# worker 中执行
docker swarm join --token SWMTKN-1-0mze9shr7wr228urjicco5waoma2h2xgrttvxuvin3sqwke53d-7antikyw5gxzlctdqci8psecu 192.168.200.10:2377

# 查看节点
docker node ls

# 创建服务
docker service create --name web nginx

# list service
docker service ls

# show service detail and show which node was created a web service
docker service ps web

# duplicate service 
docker service update web --replicas 3

# scale
docker service scale web=4

# logs
docker service logs web
```

### 网络相关

对于理解swarm的网络来讲，个人认为最重要的两个点：

- 第一是外部如何访问部署运行在swarm集群内的服务，可以称之为 `入方向` 流量，在swarm里我们通过 `ingress` 来解决
- 第二是部署在swarm集群里的服务，如何对外进行访问，这部分又分为两块:
  - 第一，`东西向流量` ，也就是不同swarm节点上的容器之间如何通信，swarm通过 `overlay` 网络来解决；
  - 第二，`南北向流量` ，也就是swarm集群里的容器如何对外访问，比如互联网，这个是 `Linux bridge + iptables NAT` 来解决的 

::: tip

overlay网络是节点之间进行通信的，bridge网络是对外通信

:::

```sh
# create overlay network
docker network create -d overlay mynet

# create service with overlay network
docker service create --network mynet --name test --replicas 2 busybox ping 8.8.8.8

# show ip route
ip route

default via 172.18.0.1 dev eth1 
10.0.1.0/24 dev eth0 scope link  src 10.0.1.3 
172.18.0.0/16 dev eth1 scope link  src 172.18.0.3

# grap the data package on node
sudo tcpdump -i enp0s8 port 4789

```

##  ingress网络

docker swarm的ingress网络又叫 `Ingress Routing Mesh`，实现把service的服务端口对外发布出去，让其能够被外部网络访问到。



```sh
# create service
docker service create --name web --network mynet -p 8080:80 --replicas 2 containous/whoami

# request on three nodes
curl 192.168.200.10:8080
curl 192.168.200.11:8080
curl 192.168.200.12:8080
```

#### ingress 数据包的走向

```sh
# show data flow
sudo iptables -nvL -t nat

Chain DOCKER-INGRESS (2 references)
 pkts bytes target     prot opt in     out     source               destination         
    6   360 DNAT       tcp  --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:8080 to:172.18.0.2:8080
   41  2760 RETURN     all  --  *      *       0.0.0.0/0            0.0.0.0/0     
   
# 172.18.0.0/16　这个网段是 docker_gwbridge 的，所以这个地址肯定是连在了 docker_gwbridge 上。

# check docker_gwbridge
docker network inspect docker_gwbridge

"Containers": {
            "9da6f4b47253f34ca525ef207d2a67cfb3e8b326d006ce8ef1bc28445d20acd0": {
                "Name": "gateway_e67f8adcdcb6",
                "EndpointID": "b3ab9627a02842c10ad2e620aba01dcc06c00dc8dbbe2459c8b36dc6695c2494",
                "MacAddress": "02:42:ac:12:00:03",
                "IPv4Address": "172.18.0.3/16",
                "IPv6Address": ""
            },
            "ingress-sbox": {
                "Name": "gateway_ingress-sbox",
                "EndpointID": "e61832535044310758548272cc553b3f3f9c0f3c92d301b3ccff9830f6940f5b",
                "MacAddress": "02:42:ac:12:00:02",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            }
        },
        
# a network namespace -> ingress-sbox

# entry the network namespace with a container
docker run -it --rm -v /var/run/docker/netns:/netns --privileged=true nicolaka/netshoot nsenter --net=/netns/ingress_sbox sh

# into the container and check dest
iptables -nvL -t mangle

# show load balancing
ipvsadm
```





## 内部负载均衡和 VIP



```sh
# web
vagrant@swarm-manager:~$ docker network ls

vagrant@swarm-manager:~$ docker service create --name web --network mynet --replicas 2 containous/whoami

vagrant@swarm-manager:~$ docker service ls

vagrant@swarm-manager:~$ docker service ps web

# client
vagrant@swarm-manager:~$ docker service create --name client --network mynet xiaopeng163/net-box:latest ping 8.8.8.8

vagrant@swarm-manager:~$ docker service ls

vagrant@swarm-manager:~$ docker service ps client

# 找到client容器的部署节点 exec 进入,curl web 显示负载均衡的效果
/omd # curl web

```

这个虚拟IP在一个特殊的网络命令空间里，这个空间连接在我们的mynet这个overlay的网络上

```sh
# 通过 docker network inspect mynet 可以看到这个命名空间，叫lb-mynet
docker network inspect mynet

# show lb_viuh1fo7q network interface
vagrant@swarm-manager:~$ sudo ls /var/run/docker/netns/
1-14fy2l7a4m  1-lpirdge00y  dfb766d83076  ingress_sbox  lb_viuh1fo7q

# entry lb_lpirdge00 namespace
vagrant@swarm-manager:~$ sudo nsenter --net=/var/run/docker/netns/lb_viuh1fo7q sh

ip a
# console output
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
27: eth0@if28: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue state UP group default 
    link/ether 02:42:0a:00:01:08 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 10.0.1.8/24 brd 10.0.1.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet 10.0.1.5/32 scope global eth0
       valid_lft forever preferred_lft forever
    inet 10.0.1.10/32 scope global eth0
       valid_lft forever preferred_lft forever
       
       
iptables -nvL -t mangle

ipvsadm
```

## stack 部署多 service 应用

```sh
# install docker-compose
vagrant@swarm-manager:~$ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
vagrant@swarm-manager:~$ sudo chmod +x /usr/local/bin/docker-compose

# download flask script
git clone https://github.com/xiaopeng163/flask-redis

# 通过stack启动服务
vagrant@swarm-manager:~/flask-redis$ env REDIS_PASSWORD=ABC123 docker stack deploy --compose-file docker-compose.yml flask-demo

docker stack ls

docker stack services flask-demo

curl 127.0.0.1:8080
```

## swarm 中使用 secret

#### 从标准的收入读取

```sh
# create
echo abc123 | docker secret create mysql_pass -

# check
docker secret ls

# rm
docker secret rm mysql_pass
```

#### 从文件读取

```sh
vagrant@swarm-manager:~$ more mysql_pass.txt
abc123

docker secret create mysql_pass mysql_pass.txt
```

#### secret 的使用

```sh
# 一般在节点下容器中 /run/secrets/下
docker service create --name mysql-demo --secret mysql_pass --env MYSQL_ROOT_PASSWORD_FILE=/run/secrets/mysql_pass mysql:5.7
```

##   local volume

docker-compose.yml

```yaml
version: "3.8"

services:
  db:
    image: mysql:5.7
    environment:
      - MYSQL_ROOT_PASSWORD_FILE=/run/secrets/mysql_pass
    secrets:
      - mysql_pass
    volumes:
      - data:/var/lib/mysql

volumes:
  data:

secrets:
  mysql_pass:
    file: mysql_pass.txt
```

mysql_pass.txt

```sh
vagrant@swarm-manager:~$ more mysql_pass.txt
abc123
```



























































































































