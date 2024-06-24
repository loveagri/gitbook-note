# git 多远程仓库部署

本文主要讲述在平时开发中，一份代码可能有多份远程仓库的情况下，需要更新到不同的仓库 以及 同步更新到所有的仓库

## 多个远程仓库部署

1.本地创建好项目文件夹2.打开终端， cd进入 项目文件夹 ， 然后初始化

```shell
git init
```

3.添加仓库地址

```shell
git remote add  仓库名1  仓库地址
git remote add  仓库名2  仓库地址
git remote add  仓库名3  仓库地址
```

4.查看关联的仓库地址情况

```shell
git remote -v
```

5.add文件

```shell
git add .
```

6.commit

```shell
git commit -m"提交版本描述"
```

7.提交到仓库

```shell
git push 仓库名1 master
git push 仓库名2 master
git push 仓库名3 master
```

8.拉取代码

```shell
git pull 仓库名1 master
git pull 仓库名2 master
git pull 仓库名3 master
```

## 一套代码一次性提交到所有的仓库

1.删除其余的仓库

::: warning
[提示：这里举的例子在上面的基础上修改，也可在关联远程仓库时，跳到第二步]
:::

```shell
git remote rm  仓库名1
git remote rm  仓库名2
```

2.添加远程仓库

::: warning
提示：这里关联的仓库名称都是一样的
:::

```shell
git remote set-url --add 仓库名3  仓库地址1
git remote set-url --add 仓库名3  仓库地址2
```

3.查看关联的仓库地址情况

```shell
git remote -v .
```

4.一次性提交

```shell
git add .
git commit -m"提交版本描述"
git push 仓库名3 master
```
