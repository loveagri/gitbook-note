# dorker

| 源                                              | 备注 |
| ----------------------------------------------- | ---- |
| [国内docker hub](https://hub-stage.docker.com/) |      |
|                                                 |      |

### 设置镜像源

```json
{
  "registry-mirrors": ["https://mirrors.tuna.tsinghua.edu.cn/"]
}
```

### 切换使用docker

```shell
# 详情访问https://docs.docker.com/desktop/troubleshoot/topics/#virtualization
bcdedit /set hypervisorlaunchtype auto
```
