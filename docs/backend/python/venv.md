# 安装Python虚拟环境



## 安装pip

```shell
sudo apt-get install python3-pip

#or

python3 -m pip install pip
```



## 创建虚拟环境

```shell
# 安装python3-venv
apt-get install python3-venv

# 创建虚拟环境
python3 -m venv env
```



## 激活虚拟环境

```shell
# Windows
./env/Script/activate

# Mac & Linux
source env/bin/activate
```

## 退出虚拟环境

```sh
deactivate
```



## Flask框架运行

```sh
# Mac & Linux
export FLASK_APP=app.py

# Windows
$env:FLASK_APP=app.py
```







