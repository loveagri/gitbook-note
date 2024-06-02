# dorker

| 源                                              | 备注       |
| ----------------------------------------------- | ---------- |
| [国内docker hub](https://hub-stage.docker.com/) |            |
| [Quay](https://quay.io/signin/)                 | 红帽镜像源 |

### 设置镜像源

```json
{
  "registry-mirrors": ["https://mirrors.tuna.tsinghua.edu.cn/"]
}
```

### Windows上切换使用docker和虚拟机

```shell
# 详情访问https://docs.docker.com/desktop/troubleshoot/topics/#virtualization
bcdedit /set hypervisorlaunchtype auto
```
