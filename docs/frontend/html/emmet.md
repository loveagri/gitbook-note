# Emmet语法总结

> [Emmet语法总结 ](https://www.cnblogs.com/arrowolf/articles/16618526.html)

## 1 `Emmet`简介

`Emmet`是一个Web开发工具，用于加快HTML和CSS代码的编写速度。使用`Emmet`能够通过简短的[表达式](https://so.csdn.net/so/search?q=表达式&spm=1001.2101.3001.7020)生成HTML或CSS代码片段。另外，截至2022年，主流的编辑器工具如Visual Studio Code、WebStorm都已经集成了`Emmet`工具，无需手动安装即可使用。

如在Visual Studio Code中新建`index.html`，输入`div`，可以看到`Emmet Abbreviation`说明这是一个`Emmet`语法规则，如下图所示：

![在这里插入图片描述](https://gitlab.com/loveagri/pic/-/raw/main/2023-08-24/17/fba0f7a2bb6a434cbd0c0d468d92618c-20230824173139565_20230824173139.png)

此时点击`Emmet Abbreviation`或按`Tab`键即可生成代码片段，在这个例子中生成的是`div`标签：

![在这里插入图片描述](https://gitlab.com/loveagri/pic/-/raw/main/2023-08-24/17/a2a54a63c006447aadeca2c50c31e06a-20230824173146498_20230824173146.gif)

在`Emmet`中包括HTML语法和CSS语法两个部分，分别包含若干语法用于简化代码输入。

## 2 HTML语法

### 2.1 初始化HTML结构

输入`!`再按`Tab`键即可生成HTML初始化结构：

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

### 2.2 生成带有`id`的标签

使用操作符`#`即可生成一个带有`id`的标签，如输入`div#main`可生成如下代码片段：

```html
<div id="main"></div>
1
```

![在这里插入图片描述](https://gitlab.com/loveagri/pic/-/raw/main/2023-08-24/17/952cf153e7a24c39be0a80a63683a634_20230824173044_20230824173156.gif)

当标签为`div`时，还可以省略`div`标签，直接输入`#main`即可生成与上面相同的代码片段：

![在这里插入图片描述](https://img-blog.csdnimg.cn/19aa3f69991a4d1bb8096c66c35cfb9e.png#pic_center)

### 2.3 生成带有`class`的标签

使用操作符`.`即可生成一个带有`class`的标签，如输入`div.main`可生成如下代码片段：

```html
<div class="main"></div>
```

![在这里插入图片描述](https://gitlab.com/loveagri/pic/-/raw/main/2023-08-24/17/6076ae61068c4508903735c06bec36e1-20230824173322384_20230824173322.gif)

类似的，当标签为`div`时，还可以省略`div`标签，直接输入`.main`即可生成与上面相同的代码片段：

![在这里插入图片描述](https://gitlab.com/loveagri/pic/-/raw/main/2023-08-24/17/41df265c034243e2a514f0b4367fa013-20230824173324579_20230824173324.gif)

### 2.4 生成带有属性的标签

使用操作符`[]`即可生成一个带有属性的标签，如输入`div[name=syz age=18]`可生成如下代码片段：

```html
<div name="syz" age="18"></div>
```

![在这里插入图片描述](https://gitlab.com/loveagri/pic/-/raw/main/2023-08-24/17/9027641c940d4c0abf290aa640517630-20230824173327352_20230824173327.gif)

### 2.5 标签属性值数字编号

使用操作符`$`即可生成带有数字编号的标签属性值，如输入`ul>li.className$*3`可生成如下代码片段：

```html
<ul>
  <li class="className1"></li>
  <li class="className2"></li>
  <li class="className3"></li>
</ul>
```

![在这里插入图片描述](https://gitlab.com/loveagri/pic/-/raw/main/2023-08-24/17/c2e19969fe694cc693d3e12d87b5ebc7-20230824173329590_20230824173329.gif)

### 2.6 生成标签内文本

使用操作符`{}`即可生成带文本内容的标签，如输入`div{文本内容}`可生成如下代码片段：

```html
<div>文本内容</div>
```

![在这里插入图片描述](https://gitlab.com/loveagri/pic/-/raw/main/2023-08-24/17/a6d034eaff874a0fb218f189118bef2c_20230824173044_20230824173333.gif)

### 2.7 子节点生成

使用操作符`>`即可生成一对父子节点，如输入`div>span`可生成如下代码片段：

```html
<div><span></span></div>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/711f646488b145398490beab540a3a80.png#pic_center)

### 2.8 兄弟节点生成

使用操作符`+`即可生成一对兄弟节点，如输入`div+div`可生成如下代码片段：

```html
<div></div>
<div></div>
```

![在这里插入图片描述](https://gitlab.com/loveagri/pic/-/raw/main/2023-08-24/17/cc964560f96845b0bae7be6d3eefe9bb-20230824173335647_20230824173335.gif)

### 2.9 父级兄弟节点生成

使用操作符`^`即可生成一个父级兄弟节点，父级兄弟节点生成通常与子节点生成同时使用，如输入`div>span^p`可生成如下代码片段：

```html
<div><span></span></div>
<p></p>
```

![在这里插入图片描述](https://gitlab.com/loveagri/pic/-/raw/main/2023-08-24/17/5330bac8b97945ac8ecef48bb0f2eca5-20230824173339754_20230824173339.gif)

顾名思义，当使用子节点生成使当前上下文处于子节点时，可以通过`^`操作符使上下文回到父节点处：

![在这里插入图片描述](https://img-blog.csdnimg.cn/014aefd4a69440e18842d45361a03f79.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAc3l6ZGV2,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

还可以使用多个`^`操作符使语境处于多个父级中，如`div>ul>li^^p`可生成如下代码片段：

```html
<div>
  <ul>
    <li></li>
  </ul>
</div>
<p></p>
```

![在这里插入图片描述](https://gitlab.com/loveagri/pic/-/raw/main/2023-08-24/17/9a860d6793b34d0da21851d2509c143d-20230824173344137_20230824173344.gif)

在这个例子中使用两个`^`操作符来生成`div`的兄弟节点`p`。

### 2.10 重复节点生成

使用操作符`*`即可生成重复的节点，如输入`div*3`可生成如下代码片段：

```html
<div></div>
<div></div>
<div></div>
```

![在这里插入图片描述](https://gitlab.com/loveagri/pic/-/raw/main/2023-08-24/17/e085cc3a36194596aba1495f1d0222e9-20230824173346515_20230824173346.gif)

### 2.11 节点分组

使用操作符`()`即可将部分节点分组形成一个整体，将`()`内的节点与外面节点隔离，避免产生嵌套关系，如输入`div>(ul>li)+p`可生成如下代码片段：

```html
<div>
  <ul>
    <li></li>
  </ul>
  <p></p>
</div>
```

![在这里插入图片描述](https://gitlab.com/loveagri/pic/-/raw/main/2023-08-24/17/058e822a63bc4cabbd3ae56fceace9ef_20230824173044_20230824173349.gif)

在这个例子中`(ul>li)`可看作一个整体，这里用字母`A`表示，则表达式转换为`div>A+p`，这时`p`标签就为`A`的兄弟节点。若不加`()`，输入`div>ul>li+p`则生成的代码片段如下：

```html
<div>
  <ul>
    <li></li>
    <p></p>
  </ul>
</div>
```

可以发现`p`标签变成了`li`标签的兄弟节点。

## 3 CSS语法

本文对`Emmet`中的CSS语法部分仅做简单介绍并列举一些常用的方法，若读者想详细了解请参阅官方文档[CSS Abbreviations](https://docs.emmet.io/css-abbreviations/)。

### 3.1 `width`和`height`

输入`w100`即可生成`width: 100px`，输入`w100%`即可生成`width: 100%`；`height`同理。

![在这里插入图片描述](https://img-blog.csdnimg.cn/5aa3544ee9c244bb88114c2fc42f3cd8.png#pic_center)

### 3.2 `margin`和`padding`

输入`m10`即可生成`margin: 10px`，当要分别设置四个方向的属性值时，输入`m10px20px30px40px`即可生成代码片段`margin: 10px 20px 30px 40px`；`padding`同理。

![在这里插入图片描述](https://gitlab.com/loveagri/pic/-/raw/main/2023-08-24/17/2055fc49c25c4eb1b70101b4d39d915d-20230824173354995_20230824173355.gif)

### 3.3 属性值生成

1. 输入`fwb`即可生成代码片段`font-weight: bold`；
2. 输入`lh20px`即可生成代码片段`line-height: 20px`；
3. 输入`df`即可生成代码片段`display: flex`；
4. 输入`jcc`即可生成代码片段`justify-content: center`；
5. 输入`aic`即可生成代码片段`align-items: center`；
6. 输入`poa`即可生成代码片段`position: absolute`；
7. 输入`tac`即可生成代码片段`text-align: center`；
8. …

根据上面的例子，其实可以发现规律，`Emmet`中用首字母+具体值的形式生成CSS代码片段，这里就不一一列举了，读者可以在编辑器中自行尝试一下。
