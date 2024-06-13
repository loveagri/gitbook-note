# Docker 安装

## Windows

1. download [docker](https://docs.docker.com/docker-for-windows/install/)



## Linux

| 网址                                                         | 备注 |
| ------------------------------------------------------------ | ---- |
| [github docker install](https://github.com/docker/docker-install) |      |

```sh
# 更新yum缓存(centos)
sudo yum update -y
sudo yum makecache fast

# 更新apt缓存(ubuntu)
sudo apt update -y

# download script
curl -fsSL https://get.docker.com -o install-docker.sh

# Install docker through Aliyun
sudo sh install-docker.sh --mirror Aliyun

# 设置Docker守护进程配置（可选）
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
        "https://docker.m.daocloud.io",
    ]
}
EOF
fi

# 启动Docker服务，并设置为开机启动
sudo systemctl start docker
sudo systemctl enable docker

# 验证Docker是否安装成功
docker version
```



## 添加用户到docker组

1. 检查docker组是否存在, 创建docker用户组

```sh
# 检查docker组是否存在
grep docker /etc/group

# 不存在则创建docker用户组
sudo groupadd docker
```

2. 添加当前用户加入docker用户组

```sh
sudo usermod -aG docker ${USER}
```

3. 重启docker服务

```sh
sudo systemctl restart docker
```

4. 重新登录用户

```sh
 # 为了使修改生效，需要重新登录要添加到docker组的用户。可以使用以下命令注销并重新登录：
 logout
```

