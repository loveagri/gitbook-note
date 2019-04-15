

<center><h1>Npm使用npm-check选择升级所有可更新包(全局+局部) + 项目单个依 </h1></center> 

原文地址：[https://blog.csdn.net/pcaxb/article/details/81773475](https://blog.csdn.net/pcaxb/article/details/81773475)

## 1.安装npm-check： （全局目录安装）

```js
npm install -g npm-check
```

## 2.npm 全局更新包 (全局目录)

```js
npm-check -u -g
```

> 通过上下键可以移动光标，使用空格键可以选择需要处理的包，回车直接进行处理。

## 3.npm更新某个项目的包 （项目目录）

```js
npm-check -u
```

> 通过上下键可以移动光标，使用空格键可以选择需要处理的包，回车直接进行处理。
>
> 通过npm-check -u 就可以，不需要--save就可以直接更新package.json里面的内容

## 4.npm 更新单个全局包

```js
npm update <name> -g
```

## 5.npm 更新 项目 生产环境依赖包

```js
npm update <name> --save
```

## 6.npm 更新 项目 开发环境依赖包

```js
npm update <name> --save-dev
```

## 7.npm 查找全局安装过的包

```js

```

[原文地址](https://blog.csdn.net/zeping891103/article/details/84400954)

# 安装
```
    # 安装但不写入package.json； 
    $ npm install xxx

    # 安装并写入package.json的"dependencies"中；
    $ npm install xxx –S 

    # 安装并写入package.json的"devDependencies"中;
    $ npm install xxx –D

    # 全局安装
    $ npm install xxx -g

    # 安装特定版本
    $ npm install xxx@1.0.0
    (贴士)  -S（等同于--save）表示项目打包时会将该依赖包一并打包；-D（等同于--	save-dev）表示该依赖包仅在开发环境下使用，正式打包不会加到项目中。
```

# 删除
```
    # 删除xxx模块；
    $ npm uninstall xxx 

    # 删除全局模块xxx；
    npm uninstall -g xxx
```
# 更新
```
    检查可以更新的模块，可以使用命令行：

    $ npm outdated
    需要更新模块，首先得更新package.json文件，可使用npm-check-updates依赖包：

    # 安装"npm-check-updates"模块
    $ npm install -g npm-check-updates

    # 安装后，检查可更新的模块
    $ ncu
    # 或
    $ npm-check-updates

    # 更新package.json的依赖包到最新版本
    $ ncu -u
```


```
    # 可根据包作用范围在后面加上 -D、-S 或 -g
    $ npm update xxx
```
> 该更新命令，只能按照package.js中标注的版本号进行更新，故更新前记得先修改package.json中所需更新的依赖包版本号。

# 快速删除项目中node_modules目录
```
    # 安装"rimraf"模块
    $ npm install rimraf -g

    # 删除操作
    $ rimraf node_modules
```

















---------------------




