# Dockerfile

| 网址                                                        | 备注 |
| ----------------------------------------------------------- | ---- |
| [Dockerfile](https://docs.docker.com/reference/dockerfile/) |      |

## FROM

- 官方镜像优于非官方的镜像，如果没有官方镜像，则尽量选择Dockerfile开源的

- 固定版本tag而不是每次都使用latest

- 尽量选择体积小的镜像

```dockerfile
FROM nginx:1.21.0-alpine
```

## RUN

尽量一个run命令，否则每一行的RUN命令都会产生一层image layer，导致臃肿。

```dockerfile
FROM ubuntu:20.04
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo/cli/releases/download/ipinfo-2.0.1/ipinfo_2.0.1_linux_amd64.tar.gz && \
    tar zxf ipinfo_2.0.1_linux_amd64.tar.gz && \
    mv ipinfo_2.0.1_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_2.0.1_linux_amd64.tar.gz
```

## ADD,COPY

```dockerfile
FROM python:3.9.5-alpine3.13
COPY hello.py /app/hello.py # copy and add can copy a file to dir
ADD hello.py /app/hello.py  
ADD hello.tar.gz /app/      # add can not only copy but uncompress
```

## WORKDIR

切换工作目录

## ARG vs ENV

### ENV

ENV 设置的变量可以在Image中保持，并在容器中的环境变量里，也就是说进到容器里执行`env`会显示`version`变量，更多关注镜像。

```dockerfile
FROM ubuntu:20.04
ENV VERSION=2.0.1
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo/cli/releases/download/ipinfo-${VERSION}/ipinfo_${VERSION}_linux_amd64.tar.gz && \
    tar zxf ipinfo_${VERSION}_linux_amd64.tar.gz && \
    mv ipinfo_${VERSION}_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_${VERSION}_linux_amd64.tar.gz
```

### ARG

ARG 可以在镜像build的时候动态修改value, 通过 `--build-arg`，更多关注构建

```
FROM ubuntu:20.04
ARG VERSION=2.0.1
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo/cli/releases/download/ipinfo-${VERSION}/ipinfo_${VERSION}_linux_amd64.tar.gz && \
    tar zxf ipinfo_${VERSION}_linux_amd64.tar.gz && \
    mv ipinfo_${VERSION}_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_${VERSION}_linux_amd64.tar.gz
```

进入容器可以查看版本

```sh
root@09c6445b79a4:/# ipinfo version
2.0.1
```

