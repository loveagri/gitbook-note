# dorker

| 源                                              | 备注       |
| ----------------------------------------------- | ---------- |
| [国内docker hub](https://hub-stage.docker.com/) |            |
| [Quay](https://quay.io/signin/)                 | 红帽镜像源 |

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
    "https://ustc-edu-cn.mirror.aliyuncs.com",
    "https://ccr.ccs.tencentyun.com",
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
