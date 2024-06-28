---
order: 1
---

# git 基本命令

## 工作区管理

```shell
# 命令用来从工作目录中删除所有没有跟踪（tracked）过的文件
git clean

# 是一次clean的演习, 告诉你哪些文件会被删除
git clean -n

# 删除当前目录下没有tracked过的文件，不会删除.gitignore指定的文件
git clean -f

# 删除当前目录下没有被tracked过的文件和文件夹
git clean -df

# 将没有放入到暂存区的所有文件恢复
git checkout .

#放弃指定文件的修改
git checkout file

# 暂存现在工作区的工作，然后恢复原来为编辑的状态，但是不包括未被跟踪的文件，也就是新建的文件
git stash

# 显示现在正在暂存的工作
git stash list

# 恢复stash暂存区的工作
git stash apply stash@{0}
```

## 暂存区管理

```shell
# 提交所有修改和新增的文件
git add .
git add -u

# 撤销暂存区的所有文件
git reset HEAD

# 撤销暂存区的指定文件
git reset HEAD file

# 查看暂存区文件列表
git ls-files -s

# 查看暂存区文件内容
git cat-file -p 6e9a94

# 提交一次版本
git commit -m ‘提交信息’

# 提交一次版本， 同git add . && git commit -m "message"
git commit -am ‘提交信息’

# 将误删除文件从上次版本库中恢复
git checkout HEAD -- deletedFile

# 将误删除文件从上上次提交的版本库中恢复
git checkout HEAD^ -- deletedFile

```

## 版本库管理

```shell
#使用reset恢复到历史提交点，重置暂存区与工作目录的内容。

# 保留工作区的内容，不保留暂存区 等同 git reset --mixed
git reset

# 保留工作区的内容，把文件差异放进暂存区，即保留暂存区
git reset --soft

# 清空工作区和暂存区的改动
git reset --hard

# 恢复前三个版本
git reset --hard HEAD^^^

# (同上)恢复前三个版本
git reset --hard HEAD~3

# 恢复到指定提交版本（先通过 git log 查看版本号)
git reset --hard b7b73147ca8d6fc20e451d7b36

# 放弃已经add 暂存区的文件hd.js
git reset HEAD hd.js

# 可以查询之前进行的 每一次 git 命令，即包括reset前的所有日志，即显示每一步操作信息
git reflog

```

## 分支管理 branch

```shell
#分支用于为项目增加新功能或修复Bug时使用。

# 创建分支
git branch dev

# 查看分支
git branch

# 切换分支
git checkout dev

# 创建并切换分支
git checkout -b feature/bbs

# 查看远程分支
git branch -r

# 将分支 main 更新为master
git branch -m main master

# 合并dev分支到master
git checkout master
git merge dev

# 删除分支
git branch -d dev

# 删除没有合并的分支
git branch -D dev

# 删除远程分支
git push origin :dev

# 查看未合并的分支(切换到master)
git branch --no-merged

# 查看已经合并的分支(切换到master)
git branch --merged

# 查看两个分支的变动
git diff branch-a..branch-b
```

## 日志查看 log

```shell
#查看日志
git log

# 查看最近2次提交日志并显示文件差异
git log -p -2

# 显示已修改的文件清单
git log --name-only

# 显示新增、修改、删除的文件清单
git log --name-status

# 一行显示并只显示SHA-1的前几个字符
git log --oneline

# 一行显示并只显示SHA-1的前几个字符及最近的5条信息
git log --oneline -5

# 过滤日志信息
git log --oneline --grep="filer info"

# 查看特定时间段日志
git log --before='1 day'
git log --after='1 day'
```

## 远程管理 git remote

```sh
# 添加远程分支
git remote add origin https://gitee.com/loveagri/blank.git

# 查看远程分支
git branch -r

# 查看远程分支关联地址
# origin  git@gitee.com:loveagri/blank.git (fetch)
# origin  git@gitee.com:loveagri/blank.git (push)
git remote -v
```

## 推送分支到远程 git push

```sh
# todo
```

## 远程拉取 git pull, git fetch, git merge

```sh
# 拉取远程分支但是不合并
git fetch

# 合并远程分支
git merge

#直接拉取远程分支
git pull
```

## git diff

```sh
# 查看两个分支的变动
git diff branch-a..branch-b
```
