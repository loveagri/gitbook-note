# laradock 问题

## 解决 laradock 中 Guzzle/Curl 出现 error [curl] 7

在使用 Guzzle 的时候，出现了 `[curl] 7: Failed to connect to xxx port 80: Connection refused` 这个问题，需要修改 `docker-compose.yml` 中关于 nginx 的配置。但是需要搞懂一下yaml语法

- 原来的配置文件是这样的：

<img src="https://gitlab.com/loveagri/pic/-/raw/main/2023-07-25/10/image-20230725103209596_20230725103209.png" alt="image-20230725103209596" style="zoom:50%;" />

- 修改后的配置文件是这样的：

<img src="https://gitlab.com/loveagri/pic/-/raw/main/2023-07-25/10/image-20230725103127239_20230725103127.png" alt="image-20230725103127239" style="zoom:50%;" />

最后重启laradock，或者nginx

```sh
//重启全部
docker-compose -d nginx mysql phpmyadmin redis workspace

重启NGINX
docker-compose stop nginx
docker-compose build --no-cache nginx
docker-compose up -d nginx
```
