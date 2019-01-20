<center><h1>个人笔记</h1></center>

图片拼接地址：https://raw.githubusercontent.com/loveagri/note/master/ud-img/



## 前置准备

1. 安装gitbook：

```js
~$ npm install gitbook-cli -g
... 安装成功

# 直接执行命令，可正常使用。
~$ CLI version: 2.3.2
   GitBook version: 3.2.3
```

2. 为Gitbook创造软连接

```shell
ln -s /usr/local/Cellar/node/11.6.0/lib/node_modules/gitbook-cli/bin/gitbook.js /usr/local/bin/gitbook
```
or
```shell
echo alisa 'gitbook="/usr/local/Cellar/node/11.6.0/lib/node_modules/gitbook-cli/bin/gitbook.js"' >> ~/.bash_profile
source ~/.bash_profile
```

3. 编辑好文件后执行编译和上传
```$xslt
npm start
```

[更多关于Gitbook](http://gitbook.zhangjikai.com/)



