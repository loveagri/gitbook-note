# dorker

| 源                                              | 备注       |
| ----------------------------------------------- | ---------- |
| [国内docker hub](https://hub-stage.docker.com/) |            |
| [Quay](https://quay.io/signin/)                 | 红帽镜像源 |

## Docker 安装

| 网址                                                   | 备注 |
| ------------------------------------------------------ | ---- |
| [麦兜IT](https://dockertips.readthedocs.io/en/latest/) |      |

### Windows

1. download [docker](https://docs.docker.com/docker-for-windows/install/)

### Linux

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
# or
su root            # 切换到root用户
su ${USER}         # 再切换到原来的应用用户以上配置才生效
```

5. 切换或者退出当前账户再从新登入

```sh
docker ps # 如果当前用户执行无报错， 则表示用户已经加到docker组 
```

6. 如果执行docker ps还有报错

```sh
ls -al /var/run/docker.sock # 查看/var/run/docker.sock文件的权限
```

```sh
sudo chmod o+rw /var/run/docker.sock # 若是其他用户没有访问权限，则需要配置下权限
```

然后重新执行docker ps 无报错则可以了

### 设置镜像源

```json
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "registry-mirrors": [
    "https://ccr.ccs.tencentyun.com",
    "https://ustc-edu-cn.mirror.aliyuncs.com",
    "https://docker.m.daocloud.io",
    "https://ghcr.io",
    "https://mirror.baidubce.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://registry.docker-cn.com",
    "https://registry-1.docker.io",
    "https://hub-mirror.c.163.com",
    "https://registry.hub.docker.com"
  ]
}
```

### Windows上切换使用docker和虚拟机

```shell
# 详情访问https://docs.docker.com/desktop/troubleshoot/topics/#virtualization
bcdedit /set hypervisorlaunchtype auto
```
