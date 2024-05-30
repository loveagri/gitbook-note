---
order: 0.5
---

# git加速

## 国内常用加速地址

[https://mirror.ghproxy.com/](https://mirror.ghproxy.com/)

[https://hub.yzuu.cf/](https://hub.yzuu.cf/)

[https://hub.nuaa.cf/](https://hub.nuaa.cf/)

## 加速clone

```sh
# 方法一：手动替换地址
#原地址
git clone https://github.com/xxx/xxx.git
#改为
git clone https://hub.yzuu.cf/xxx/xxx.git


# 方法二：配置git自动替换
git config --global url."ssh://git@ssh.github.com:443".insteadOf https://github.com
# 测试
git clone https://github.com/xxx/xxx.git
# 查看git配置信息
git config --global --list
git config --global -l
# 取消设置
$ git config --global --unset url."ssh://git@ssh.github.com:443".insteadOf
```

## 加速release

```sh
# 原地址
wget https://github.com/goharbor/harbor/releases/download/v2.0.2/harbor-offline-installer-v2.0.2.tgz
# 加速下载方法一
wget https://download.fastgit.org/goharbor/harbor/releases/download/v2.0.2/harbor-offline-installer-v2.0.2.tgz
# 加速下载方法二
wget https://hub.fastgit.org/goharbor/harbor/releases/download/v2.0.2/harbor-offline-installer-v2.0.2.tgz
```

## 加速 raw

```sh
# 原地址
wget https://raw.githubusercontent.com/xxx/xxx/master/README.md
# 加速下载方法一
wget https://raw.staticdn.net/xxx/xxx/master/README.md
# 加速下载方法二
wget https://raw.fastgit.org/xxx/xxx/master/README.md
# 加速下载方法
wget https://raw.gitmirror.com/xxx/xxx/master/README.md
```

## 全局设置（不推荐）

```sh
#使用http代理
git config --global http.proxy https://github.ur1.fun
git config --global https.proxy https://github.ur1.fun
#使用socks5代理
git config --global http.proxy socks5://github.ur1.fun
git config --global https.proxy socks5://github.ur1.fun
```

## 只对Github代理（推荐）

```bash
#使用socks5代理（推荐）
git config --global http.https://github.com.proxy socks5://github.ur1.fun
#使用http代理（不推荐）
git config --global http.https://github.com.proxy http://github.ur1.fun
```

## 取消代理

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```
