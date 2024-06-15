# 存储Volume & Bind mount

Docker主要提供了两种方式做数据的持久化

- Data Volume, 由Docker管理，(/var/lib/docker/volumes/ Linux), 持久化数据的最好方式，是在特定目录设置别名，目录一般为`/var/lib/docker/volumes/<别名>/_data/`
- Bind Mount，由用户指定存储的数据具体mount在系统什么位置

## Volume

### 准备工作

::: warning

需要Linux系统的环境

:::

Dockerfile文件：

```dockerfile
FROM alpine:latest
RUN apk update
RUN apk --no-cache add curl
ENV SUPERCRONIC_URL=https://github.com/aptible/supercronic/releases/download/v0.1.12/supercronic-linux-amd64 \
    SUPERCRONIC=supercronic-linux-amd64 \
    SUPERCRONIC_SHA1SUM=048b95b48b708983effb2e5c935a1ef8483d9e3e
RUN curl -fsSLO "$SUPERCRONIC_URL" \
    && echo "${SUPERCRONIC_SHA1SUM}  ${SUPERCRONIC}" | sha1sum -c - \
    && chmod +x "$SUPERCRONIC" \
    && mv "$SUPERCRONIC" "/usr/local/bin/${SUPERCRONIC}" \
    && ln -s "/usr/local/bin/${SUPERCRONIC}" /usr/local/bin/supercronic
COPY my-cron /app/my-cron
WORKDIR /app

VOLUME ["/app"]

# RUN cron job
CMD ["/usr/local/bin/supercronic", "/app/my-cron"]
```

my-cron文件：

```sh
*/1 * * * * date >> /app/test.txt
```

构建镜像

```sh
docker image build -t my-cron .
```

### 创建容器(不指定-v参数)

Docker会自动创建一个随机名字的volume，去存储在Dockerfile定义的volume `VOLUME ["/app"]`。

```sh
docker run -d my-cron

docker volume ls # 随机名字的volume
```

### 创建容器(指定-v参数)

在创建容器的时候通过 `-v` 参数可以手动的指定需要创建Volume的名字，以及对应于容器内的路径，这个路径是可以任意的，不必需要在Dockerfile里通过VOLUME定义。

```sh
docker container run -d -v cron-data:/app my-cron # 固定名字cron-data
```

### 环境清理

强制删除所有容器，系统清理和volume清理

```sh
docker rm -f $(docker container ps -aq)
docker system prune -f # docker disk
docker volume prune -f
```

## Bind Mount

Bind Mount 是直接自定义同步目录

```sh
docker container run -d -v <local dir>:<container-dir> container

# for example
docker container run -d -v $(pwd)|${pwd}:/app container
```

::: warning

Windows需要将要同步的本地路径添加到允许路径

<img src="https://gitlab.com/loveagri/pic/-/raw/main/2024-06-15/14/70538_image-20240615143025838.png" alt="image-20240615143025838" style="zoom:33%;" />

:::







































































