# 知识点

## DEBIAN_FRONTEND

`DEBIAN_FRONTEND=noninteractive` 是一个环境变量，用于告诉APT在没有用户交互的情况下运行。

1. 自动更新系统：

```sh
sudo DEBIAN_FRONTEND=noninteractive apt-get -y upgrade
```

2. 安装新的软件包而不需要交互：

```sh
sudo DEBIAN_FRONTEND=noninteractive apt-get -y install package-name
```

3. 移除软件包而不需要交互：

```bash
sudo DEBIAN_FRONTEND=noninteractive apt-get -y remove package-name
```