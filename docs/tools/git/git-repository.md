# 仓库推送

## github

### create a new repository 

```sh
echo "# blank" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/loveagri/blank.git
git push -u origin main
```

### push an existing repository 

```sh
git remote add origin https://github.com/loveagri/blank.git
git branch -M main
git push -u origin main
```

## gitee

### Git 全局设置:

```sh
git config --global user.name "loveagri"
git config --global user.email "282656050@qq.com"
```

### 创建 git 仓库:

```sh
mkdir blank
cd blank
git init 
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin git@gitee.com:loveagri/blank.git
git push -u origin "master"
```

### 已有仓库

```sh
cd existing_git_repo
git remote add origin git@gitee.com:loveagri/blank.git
git push -u origin "master"
```

## gitlab

### Create a new repository

```shell
git clone git@gitlab.com:loveagri/blank.git
cd blank
git switch -c main
touch README.md
git add README.md
git commit -m "add README"
git push -u origin main
```

### Push an existing folder

```shell
cd existing_folder
git init --initial-branch=main
git remote add origin git@gitlab.com:loveagri/blank.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Push an existing Git repository

```shell
cd existing_repo
git remote rename origin old-origin
git remote add origin git@gitlab.com:loveagri/blank.git
git push -u origin --all
git push -u origin --tags
```

