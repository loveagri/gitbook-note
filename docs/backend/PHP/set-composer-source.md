# composer更换、恢复源相关命令

1、更新为阿里云源

```sh
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

2、更新为中国地区源

```sh
composer config -g repo.packagist composer https://packagist.phpcomposer.com
```

3、恢复默认源

```sh
composer config -g --unset repos.packagist
```

4、更新缓存

```sh
composer clearcache
```

5、查看当前composer版本（大写的V）

```
composer -V
```

6、当前composer更新为最新稳定版

```
composer self-update --stable
```

7、更新到指定版本

```
composer self-update 2.0.8
```
