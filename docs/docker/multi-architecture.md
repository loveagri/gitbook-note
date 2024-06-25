# Docker 的多架构支持

Windows和Mac的桌面版Docker自带buildx命令，但是Linux环境下的Docker需要自行安装buildx （https://github.com/docker/buildx），[官方文档](https://docs.docker.com/buildx/working-with-buildx/)

```sh
docker login

# show buildx container
docker buildx ls

# create a build container
docker buildx create --name mybuilder --use

# create and push multi-image
docker buildx build --push --platform linux/arm/v7,linux/arm64/v8,linux/amd64 -t xiaopeng163/flask-redis:latest .

# remove build container
docker buildx rm mybuilder
```

