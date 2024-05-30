# laravel模型提示及Debugbar使用
---

### 生成模型提示
---
```sh
# composer 安装
composer require barryvdh/laravel-ide-helper --dev

# 生成模型的工具：
php artisan ide-helper:models

# 生成_ide_helper.php文件 外观方法的代码提示：
php artisan ide-helper:generate

# 通过容器调用的类的代码提示：
php artisan ide-helper:meta
```
### Laravel框架开发调试工具Laravel Debugbar使用
---

[原文链接](https://www.dandelioncloud.cn/article/details/1531824649600266241)

1. 使用 Composer 安装该扩展包：

```sh
composer require barryvdh/laravel-debugbar --dev
```

2. 安装完成后，修改 `config/app.php` 在 `providers` 数组内追加 Debugbar 的 Provider

3. 关闭debugbar需要去.env里把`APP_DEBUG`设置为`false`
