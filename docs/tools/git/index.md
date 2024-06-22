# Git

## 基本设置

### SSH

```sh
ssh-keygen -t rsa -b 2048 -C "loveagri@qq.com"
```

### global 设置

```shell
git config --global user.name "loveagri"
git config --global user.email "282656050@qq.com"

# 设置为中文字符
git config --global core.quotepath false
git config --global gui.encoding utf-8
git config --global i18n.commit.encoding utf-8
git config --global i18n.logoutputencoding utf-8

# git bash 页面中文显示为数字,不是乱码
git config --global core.quotepath false
```

```sh
# 查看git配置信息
git config --global --list
git config --global -l
```

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

## 加速

### 加速地址

| 加速地址                                                   | 备注                                                         |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| [加速地址获取网站](https://www.7ed.net/gitmirror/hub.html) | 查看最新加速地址 [反馈入口](https://github.com/7ednet/yard/discussions) |
| [加速地址获取网站](https://gitclone.com/)                  |                                                              |
| https://mirror.ghproxy.com/                                | 附加                                                         |
| https://hub.gitmirror.com/                                 | 附加                                                         |
| https://raw.staticdn.net                                   | 替换                                                         |

### 加速clone

```sh
# 方法一：手动替换地址
#原地址
git clone https://github.com/Laradock/laradock.git
#改为
git clone https://github.com/Laradock/laradock.git

# 将git::// 替换为 https://
git config --global url."ssh://git@ssh.github.com:443".insteadOf https://github.com
# 取消设置
$ git config --global --unset url."ssh://git@ssh.github.com:443".insteadOf

```

### 加速 raw

```sh
# 原地址
wget https://raw.githubusercontent.com/laradock/laradock/master/.github/home-page-images/documentation-button.png
# 加速下载方法一
wget https://raw.staticdn.net/laradock/laradock/master/.github/home-page-images/documentation-button.png
# 加速下载方法二
wget https://raw.gitmirror.com/laradock/laradock/master/.github/home-page-images/documentation-button.png
```

### 加速 Gist

```sh 
wget https://gist.githubusercontent.com/dimitardanailov/6acdd54ab67d5a25c0229b2fe5bbb42b/raw/397f0873922a6aa48895074cc28d7f71c8261b81/create_user.sh

wget https://gist.gitmirror.com/dimitardanailov/6acdd54ab67d5a25c0229b2fe5bbb42b/raw/397f0873922a6aa48895074cc28d7f71c8261b81/create_user.sh
```

### 全局设置（不推荐）

```sh
# 即所有git都使用代理

# 使用http代理
git config --global http.proxy https://gitclone.com
git config --global https.proxy https://gitclone.com
# 使用socks5代理
git config --global http.proxy socks5://gitclone.com
git config --global https.proxy socks5://gitclone.com
```

### 只对Github代理（推荐）

```bash
# 只有github使用代理

# 使用socks5代理（推荐）
git config --global http.https://github.com.proxy socks5://gitclone.com
# 使用http代理（不推荐）
git config --global http.https://github.com.proxy http://gitclone.com
```

### 取消代理

```bash
# 取消全局代理设置
git config --global --unset http.proxy
git config --global --unset https.proxy

# 取消github代理设置
git config --global --unset http.https://github.com.proxy
```

