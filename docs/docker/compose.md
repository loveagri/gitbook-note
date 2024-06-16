# Docker-compose

## 安装

Windows和Mac在默认安装了docker desktop以后，docker-compose随之自动安装.

Linux用户需要自行[安装](https://github.com/docker/compose/releases)

直接安装：

```sh
$ sudo curl -L "https://github.com/docker/compose/releases/download/<version>/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
$ docker-compose --version
```

pip去安装docker-Compose:

```sh
$ pip install docker-compose
```

## 语法

### 基本[语法](https://docs.docker.com/compose/compose-file/)

```yaml
version: "3.8"

services: # 一个或者多个容器
  servicename: # 服务名字，这个名字也是内部 bridge网络可以使用的 DNS name
  	container_name: new-container-name # 容器名字，默认为服务名字，同时会忽略项目名字和数字
    image: # 镜像的名字
    command: # 可选，如果设置，则会覆盖默认镜像里的 CMD命令
    environment: # 可选，相当于 docker run里的 --env
    volumes: # 可选，相当于docker run里的 -v
    networks: # 可选，相当于 docker run里的 --network
    ports: # 可选，相当于 docker run里的 -p
  servicename2:

volumes: # 可选，相当于 docker volume create

networks: # 可选，相当于 docker network create
```

示例：

```python
# app.py

from flask import Flask
from redis import Redis
import os
import socket

app = Flask(__name__)
redis = Redis(host=os.environ.get('REDIS_HOST', '127.0.0.1'), port=6379)


@app.route('/')
def hello():
    redis.incr('hits')
    return f"Hello Container World! I have been seen {redis.get('hits').decode('utf-8')} times and my hostname is {socket.gethostname()}.\n"
```

Dockerfile：

```dockerfile
FROM python:3.9.5-slim

RUN pip install flask redis && \
    groupadd -r flask && useradd -r -g flask flask && \
    mkdir /src && \
    chown -R flask:flask /src

USER flask

COPY app.py /src/app.py

WORKDIR /src

ENV FLASK_APP=app.py REDIS_HOST=redis

EXPOSE 5000

CMD ["flask", "run", "-h", "0.0.0.0"]
```



docker-compose.yml 文件如下:

```yaml
version: "3.8"

services:
  flask-demo:
    image: flask-demo:latest
    environment:
      - REDIS_HOST=redis-server
    networks:
      - demo-network
    ports:
      - 8080:5000

  redis-server:
    image: redis:latest
    networks:
     - demo-network

networks:
  demo-network:
```

启动：

```sh
docker-compose up # 前台服务运行

docker-compose up -d # 后台运行

docker-compose stop # 停止服务

docker-compose down # 移除并停止服务

docker-compose rm # 移除停止法服务

# docker-compose 启动的服务，默认会加上文件夹的名字作为前缀，也可以通过 -p 指定服务名称前缀，并且以后所有相关操作都需要加 -p 选项
docker-composer -p myproject up -d 
```



