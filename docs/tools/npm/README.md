# npm

# npm设置镜像的方法

> [nvm](https://github.com/nvm-sh/nvm) [nrm](https://github.com/Pana/nrm)

### 一.通过命令配置淘宝镜像

1. 切换为淘宝镜像命令（安装一些package容易报错）
   `npm config set registry https://registry.npm.taobao.org`
2. 查看当前使用的镜像地址命令
   `npm config get registry`

### 二、切换回原镜像（安装一些package不容易报错）

1. `npm config set registry https://registry.npmjs.org`

### 三、其他镜像地址查询

1. 安装nrm
   `npm install nrm -g`
2. 使用nrm查询其他镜像地址(出现报错，可能是因为安装了最新版本的nrm导致冲突)
   `nrm ls`
