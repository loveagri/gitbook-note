图片引用路径：https://raw.githubusercontent.com/loveagri/note/master/ud-img

[使用npm成功安装命令后,执行时却报找不到命令的问题](https://blog.csdn.net/wirelessqa/article/details/53393248)

## **分析原因：**

安装成功了，但使用直接使用时确找不到命令，应该是环境变量问题，设置环境变量就可以了。

## **解决问题:**

```js
# 用一个通用的命令配置环境变量
~$ echo -e "export PATH=$(npm prefix -g)/bin:$PATH" >> ~/.bashrc && source ~/.bashrc

# 上面的命令中使用 npm prefix -g 获取node安装目录

# 再执行命令
~$ gitbook -V
2.3.0

```

再安装一个新的命令试试：

```js
~$ npm install gitbook-cli --global
... 安装成功

# 直接执行命令，可正常使用。
~$ gitbook -V
CLI version: 2.3.0
```

为Gitbook创造软连接

```shell
ln -s /usr/local/Cellar/node/11.6.0/lib/node_modules/gitbook-cli/bin/gitbook.js /usr/local/bin/gitbook
```



[文件](https://raw.githubusercontent.com/loveagri/note/master/ud-code/pack.php)

