# 纯javascript前端实现base64图片下载(兼容IE10+)

在项目开发过程中，经常会有图片导出的需求，尤其是带有图表类的应用，通常需要将图表下载导出。

在chrome等新版浏览器中实现base64图片的下载还是比较容易的：

1. 创建一个a标签
2. 将a标签的href属性赋值为图片的base64编码
3. 指定a标签的download属性，作为下载文件的名称
4. 触发a标签的点击事件

但是这套逻辑在IE下是不行的，这样写会直接报错。

所以IE下需要单独处理，这里IE在处理这种文件的时候给提供了一个单独的方法：window.navigator.msSaveOrOpenBlob(blob, download_filename)调用这个方法可以直接触发IE的下载，还是比较方便的。具体做法如下：

```js
// 截取base64的数据内容（去掉前面的描述信息，类似这样的一段：data:image/png;base64,）并解码为2进制数据
var bstr = atob(imgUrl.split(',')[1]) 
// 获取解码后的二进制数据的长度，用于后面创建二进制数据容器
var n = bstr.length 
// 创建一个Uint8Array类型的数组以存放二进制数据
var u8arr = new Uint8Array(n) 
// 将二进制数据存入Uint8Array类型的数组中
while (n--) {
 u8arr[n] = bstr.charCodeAt(n) 
}
// 创建blob对象
var blob = new Blob([u8arr])
// 调用浏览器的方法，调起IE的下载流程
window.navigator.msSaveOrOpenBlob(blob, 'chart-download' + '.' + 'png')
```

**整体实现代码**

```js
// 这里是获取到的图片base64编码,这里只是个例子哈，要自行编码图片替换这里才能测试看到效果
const imgUrl = 'data:image/png;base64,...'
// 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
if (window.navigator.msSaveOrOpenBlob) {
 var bstr = atob(imgUrl.split(',')[1])
 var n = bstr.length
 var u8arr = new Uint8Array(n)
 while (n--) {
  u8arr[n] = bstr.charCodeAt(n)
 }
 var blob = new Blob([u8arr])
 window.navigator.msSaveOrOpenBlob(blob, 'chart-download' + '.' + 'png')
} else {
 // 这里就按照chrome等新版浏览器来处理
 const a = document.createElement('a')
 a.href = imgUrl
 a.setAttribute('download', 'chart-download')
 a.click()
}
```

