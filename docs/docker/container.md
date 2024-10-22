# container



| 命令(全)                                                    | 示例                                            | 操作                             | 备注        |
| ----------------------------------------------------------- | ----------------------------------------------- | -------------------------------- | ----------- |
| docker container run &lt;image name &gt;                    |                                                 | 创建容器                         |             |
| docker container ls                                         |                                                 | 列出容器（up）                   |             |
| docker container ls -a                                      |                                                 | 列出容器（up & down）            |             |
| docker container ls -aq                                     |                                                 | 列出容器ID                       |             |
| docker container ps -aq                                     |                                                 | 列出容器ID                       |             |
| docker container stop &lt;name or ID&gt;                    |                                                 | 停止容器                         |             |
| docker container rm &lt;name or ID&gt;                      |                                                 | 删除容器                         | -f 强制删除 |
| docker container attach &lt; container id&gt;               |                                                 | 容器转为前台运行                 |             |
| docker container commit &lt;container id &gt; &lt; tag &gt; | docker container commit 2d34 loveagri/nginx:1.0 | 将一个停止的容器构建一个惊喜那个 |             |



## 批量删除或清理

```sh
docker container rm $(docker container ps -aq)

docker system prune -a -f # 可以快速对系统进行清理，删除停止的容器，不用的image，等等
```

## detach & attach模式

```sh
# attach
docker container run -p 80:80 nginx 

# detach 容器会在后台执行
docker container run -d -p 80:80 nginx
```

## 日志

```sh
docker container logs <container id>

# dynamic tracking logs
docker container logs -f <container id>
```

## 交互式进入container

```sh
# 直接进
docker container run -it busybox sh

# container detach模式进
docker container exec -it <container id> sh
```

