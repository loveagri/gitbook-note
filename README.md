<center><h1>个人笔记</h1></center>

图片拼接地址：https://raw.githubusercontent.com/loveagri/note/master/ud-img/

代码拼接地址：https://raw.githubusercontent.com/loveagri/note/master/ud-code/

文件拼接地址：https://raw.githubusercontent.com/loveagri/note/master/ud-file/

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

4. 添加视频
```$xslt
{% raw %}
<video id="my-video" class="video-js" controls preload="auto" width="100%"
poster="https://zhangjikai.com/resource/poster.jpg" data-setup='{"aspectRatio":"16:9"}'>
  <source src="https://zhangjikai.com/resource/demo.mp4" type='video/mp4' >
  <p class="vjs-no-js">
    To view this video please enable JavaScript, and consider upgrading to a web browser that
    <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
  </p>
</video>
{% endraw %}
```

[更多关于Gitbook](http://gitbook.zhangjikai.com/)

[插件文档](http://gitbook.zhangjikai.com/plugins.html)



