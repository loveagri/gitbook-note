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



















































































































































