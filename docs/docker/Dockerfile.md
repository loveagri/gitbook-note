# Dockerfile

| 网址                                                         | 备注 |
| ------------------------------------------------------------ | ---- |
| [Dockerfile](https://docs.docker.com/reference/dockerfile/)  |      |
| [官方镜像示例](https://github.com/docker-library/official-images) |      |

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

```dockerfile
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

```shell
root@09c6445b79a4:/# ipinfo version
2.0.1
```

## CMD & ENTRYPOINT

CMD可以用来设置容器启动时默认会执行的命令。

- 容器启动时默认执行的命令

- 如果docker container run启动容器时指定了其它命令，则CMD命令会被忽略

- 如果定义了多个CMD，只有最后一个会被执行。

  

ENTRYPOINT 也可以设置容器启动时要执行的命令，但是和CMD是有区别的。

- `CMD` 设置的命令，可以在docker container run 时传入其它命令，覆盖掉 `CMD` 的命令，但是 `ENTRYPOINT` 所设置的命令是一定会被执行的。
- `ENTRYPOINT` 和 `CMD` 可以联合使用，`ENTRYPOINT` 设置执行的命令，CMD传递参数

```dockerfile
FROM ubuntu:20.04
ENTRYPOINT ["echo","hello point"]
CMD []

# docker run -it --rm both echo test
# hello point echo test
```

### Shell格式

```dockerfile
CMD echo "hello docker"

ENTRYPOINT echo "hello docker"
```

### Exec格式

以可执行命令的方式

```dockerfile
ENTRYPOINT ["echo", "hello docker"]
CMD ["echo", "hello docker"]
```

`"sh", "-c"`执行带变量的命令

```dockerfile
FROM ubuntu:20.04
ENV NAME=docker
CMD echo "hello $NAME"

# hello docker
```

```dockerfile
FROM ubuntu:20.04
ENV NAME=docker
CMD ["echo", "hello $NAME"]

# hello $NAME
```

```dockerfile
FROM ubuntu:20.04
ENV NAME=docker
CMD ["sh", "-c", "echo hello $NAME"]

# hello docker
```

综合示例

```dockerfile
FROM python:3.9.5-slim

COPY app.py /src/

RUN pip install flask

WORKDIR /src

ENV FLASK=APP.PY

EXPOSE 5000

# CMD [ "flask", "run", "-h", "0.0.0.0"]
CMD [ "flask", "run", "--host=0.0.0.0"] 
```



## context

`docker image build -t demo .`中的`.`代表当前目录，也就是context

`.dockerignore` 文件类似`.gitignore`。



## 镜像的多阶段构建

```c
#include <stdio.h>

void main(int argc, char *argv[])
{
    printf("hello %s\n", argv[argc - 1]);
}
```

如下构建方式，镜像很大

```dockerfile
FROM gcc:9.4

COPY hello.c /src/hello.c

WORKDIR /src

RUN gcc --static -o hello hello.c

ENTRYPOINT [ "/src/hello" ]

CMD []
```

如下构建方式，镜像较小

```dockerfile
FROM gcc:9.4 AS builder

COPY hello.c /src/hello.c

WORKDIR /src

RUN gcc --static -o hello hello.c



FROM alpine:3.13.5

COPY --from=builder /src/hello /src/hello

ENTRYPOINT [ "/src/hello" ]

CMD []
```



## EXPOSE

更多的是是提示作用，是否暴露都可以使用端口， 在build完镜像后，可通过`docker image inspect <image id>` 查看暴露的端口，在config里查看。同时也可以定义类型，如

```dockerfile
EXPOSE 80/udp
EXPOSE 80/tcp
```











































