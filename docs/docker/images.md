# images

## 镜像导出

```sh
docker image save nginx:1.20.0 -o nginx.image
```

## 镜像导入

```sh
docker image load -i .\nginx.image
```

## 构建镜像

```sh
docker image build -t loveagri/hello:1.0 . # 在有Dockerfile的情况下
```

## 镜像构建历史

```sh
docker image history loveagri/hello:1.0 
```

## 打标签

```sh
docker image tag loveagri/hello:1.0 hello
```

## 发布镜像

```sh
docker image push loveagri/hello:1.0 # 需提前登录
```



