# Git

#### SSH

```sh
ssh-keygen -t rsa -b 2048 -C "loveagri@qq.com"
```

#### Git global setup

```shell
git config --global user.name "loveagri"
git config --global user.email "282656050@qq.com"
```

#### 设置为中文字符

```shell
git config --global core.quotepath false
git config --global gui.encoding utf-8
git config --global i18n.commit.encoding utf-8
git config --global i18n.logoutputencoding utf-8
```

#### git bash 页面中文显示为数字,不是乱码

```shell
git config --global core.quotepath false
```

#### Create a new repository

```shell
git clone git@gitlab.com:loveagri/blank.git
cd blank
git switch -c main
touch README.md
git add README.md
git commit -m "add README"
git push -u origin main
```

#### Push an existing folder

```shell
cd existing_folder
git init --initial-branch=main
git remote add origin git@gitlab.com:loveagri/blank.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

#### Push an existing Git repository

```shell
cd existing_repo
git remote rename origin old-origin
git remote add origin git@gitlab.com:loveagri/blank.git
git push -u origin --all
git push -u origin --tags
```
