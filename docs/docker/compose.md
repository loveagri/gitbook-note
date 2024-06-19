# Docker-compose

| 网址                                                         | 备注 |
| ------------------------------------------------------------ | ---- |
| [优秀示例](https://github.com/docker/awesome-compose?tab=readme-ov-file) |      |



## 安装

Windows和Mac在默认安装了docker desktop以后，docker-compose随之自动安装.

Linux用户需要自行[安装](https://github.com/docker/compose/releases)

直接安装：

```sh
# version=v2.27.1
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

### 示例：

#### app.py

```python
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

#### docker-compose.yml 文件如下

##### version 1

```yaml
version: '3.8'

services:
    redis-server:
        image: redis:latest
        networks:
            - demo-network

    flask-demo:
        image: flask-demo:latest
        environment:
            - REDIS_HOST=redis-server
        networks:
            - demo-network
        ports:
            - 8080:5000

networks:
    demo-network:

```

##### version 2

```yaml
version: '3.8'

services:
    redis-server:
        image: redis:latest
        networks:
            - demo-network

    flask-demo:
        container_name: my-flask-demo
        image: flask-demo:latest
        environment:
            - REDIS_HOST=redis-server
        networks:
            - demo-network
        ports:
            - 8080:5000

networks:
    demo-network:

```

##### Version 3

```yaml
version: '3.8'

services:
    redis-server:
        image: redis:latest
        networks:
            - demo-network

    flask-demo:
        build: './flask'
        container_name: my-flask-demo
        image: flask-demo:latest
        environment:
            - REDIS_HOST=redis-server
        networks:
            - demo-network
        ports:
            - 8080:5000

networks:
    demo-network:

```

##### Version 4

```yaml
version: '3.8'

services:
    redis-server:
        image: redis:latest
        networks:
            - demo-network

    flask-demo:
        build:
            context: ./flask
            dockerfile: Dockerfile
        container_name: my-flask-demo
        image: flask-demo:latest
        environment:
            - REDIS_HOST=redis-server
        networks:
            - demo-network
        ports:
            - 8080:5000

networks:
    demo-network:

```

#### 启动

```sh
# 前台服务运行
docker-compose up 

# 后台运行
docker-compose up -d 

# rebuild
docker-compose up -d --build 

# remove not used
docker-compose up -d --remove-orphans --build 

# 重启服务
docker-compose restart 

# 停止服务
docker-compose stop 

# 移除并停止服务
docker-compose down 

# 移除停止的服务
docker-compose rm 

# docker-compose 启动的服务，默认会加上文件夹的名字作为前缀，也可以通过 -p 指定服务名称前缀，并且以后所有相关操作都需要加 -p 选项
docker-composer -p myproject up -d 

# 查看变量的真实值,默认是.env,自定义的env需紧跟docker-compose后，包括config, up 命令全是需要要紧跟
docker-compose --env-file ./myenv config 


```

## 网络

```yaml
version: '3.8'

services:
    box1:
        image: xiaopeng163/net-box:latest
        command: /bin/sh -c "while true; do sleep 3600; done"
        networks:
            - mynetwork1
    box2:
        image: xiaopeng163/net-box:latest
        command: /bin/sh -c "while true; do sleep 3600; done"
        networks:
            - mynetwork1
            - mynetwork2

networks:
    mynetwork1:
    mynetwork2:

```



## 水平扩展

docker-compose.yaml

```yaml
version: '3.8'

services:
    flask:
        build:
            context: ./flask
            dockerfile: Dockerfile
        image: flask-demo:latest
        environment:
            - REDIS_HOST=redis-server

    redis-server:
        image: redis:latest

    client:
        image: xiaopeng163/net-box:latest
        command: sh -c "while true; do sleep 3600; done;"

```

#### 测试

```sh
# scale, load balance
docker-compose up -d --scale flask=3 

# cut short
docker-compose up -d --scale flask=1
```

### Nginx

docker-compose.yml

```yaml
version: "3.8"

services:
  flask:
    build:
      context: ./flask
      dockerfile: Dockerfile
    image: flask-demo:latest
    environment:
      - REDIS_HOST=redis-server
    networks:
      - backend
      - frontend

  redis-server:
    image: redis:latest
    networks:
      - backend

  nginx:
    image: nginx:stable-alpine
    ports:
      - 8000:80
    depends_on:
      - flask
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro # read only
      - ./var/log/nginx:/var/log/nginx
    networks:
      - frontend

networks:
  backend:
  frontend:

```

nginx.conf:

```nginx
server {
  listen  80 default_server;
  location / {
    proxy_pass http://flask:5000;
  }
}
```

测试同上，注意重启nginx `docker-compose restart nginx`。



## 环境[变量](https://docs.docker.com/compose/environment-variables/)

app.py

```py
from flask import Flask
from redis import StrictRedis
import os
import socket

app = Flask(__name__)
redis = StrictRedis(host=os.environ.get('REDIS_HOST', '127.0.0.1'),
                    port=6379, password=os.environ.get('REDIS_PASS'))


@app.route('/')
def hello():
    redis.incr('hits')
    return f"Hello Container World! I have been seen {redis.get('hits').decode('utf-8')} times and my hostname is {socket.gethostname()}.\n"

```

docker-compose.yml

```yaml
version: "3.8"

services:
  flask:
    build:
      context: ./flask
      dockerfile: Dockerfile
    image: flask-demo:latest
    environment:
      - REDIS_HOST=redis-server
      - REDIS_PASS=${REDIS_PASSWORD}
    networks:
      - backend
      - frontend

  redis-server:
    image: redis:latest
    command: redis-server --requirepass ${REDIS_PASSWORD}
    networks:
      - backend

  nginx:
    image: nginx:stable-alpine
    ports:
      - 8000:80
    depends_on:
      - flask
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - ./var/log/nginx:/var/log/nginx
    networks:
      - frontend

networks:
  backend:
  frontend:

```

其它文件nginx同上。



## 服务依赖和健康[检查](https://docs.docker.com/engine/reference/builder/#healthcheck)

### 简易演示

Dockerfile:

```dockerfile {20-22}
FROM python:3.9.5-slim

RUN pip install flask redis && \
    apt-get update && \
    apt-get install -y curl && \
    groupadd -r flask && useradd -r -g flask flask && \
    mkdir /src && \
    chown -R flask:flask /src

USER flask

COPY app.py /src/app.py

WORKDIR /src

ENV FLASK=app.py REDIS_HOST=redis

EXPOSE 5000

HEALTHCHECK --interval=30s \
            --timeout=3s \
            CMD curl -f http://localhost:5000 || exit 1

CMD ["flask", "run", "-h", "0.0.0.0"]

```

app.py：

```py
from flask import Flask
from redis import StrictRedis
import os
import socket

app = Flask(__name__)
redis = StrictRedis(host=os.environ.get('REDIS_HOST', '127.0.0.1'),
                    port=6379, password=os.environ.get('REDIS_PASS'))


@app.route('/')
def hello():
    redis.incr('hits')
    return f"Hello Container World! I have been seen {redis.get('hits').decode('utf-8')} times and my hostname is {socket.gethostname()}.\n"
```

#### 相关命令

```sh
# 启动容器
docker container run -d --network mybridge --env REDIS_PASS=abc123 flask-demo

# 检查容器检查过程
docker container inspect 70
```

### 完全演示

```yaml
version: '3.8'

services:
    flask:
        build:
            context: ./flask
            dockerfile: Dockerfile
        image: flask-demo:latest
        environment:
            - REDIS_HOST=redis-server
            - REDIS_PASS=${REDIS_PASSWORD}
        healthcheck:
            test: ['CMD', 'curl', '-f', 'http://localhost:5000']
            interval: 30s
            timeout: 3s
            retries: 3
            start_period: 40s
        depends_on:
            redis-server:
                condition: service_healthy
        networks:
            - backend
            - frontend

    redis-server:
        image: redis:latest
        command: redis-server --requirepass ${REDIS_PASSWORD}
        healthcheck:
            test: ['CMD', 'redis-cli', 'ping']
            interval: 1s
            timeout: 3s
            retries: 10
        networks:
            - backend

    nginx:
        image: nginx:stable-alpine
        ports:
            - 8000:80
        depends_on:
            flask:
                condition: service_healthy
        volumes:
            - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
            - ./var/log/nginx:/var/log/nginx
        networks:
            - frontend

networks:
    backend:
    frontend:

```

#### 相关命令

```sh
# 启动容器
docker-compose up -d
```

































































