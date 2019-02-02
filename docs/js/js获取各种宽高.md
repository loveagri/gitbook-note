# js获取各种宽高	

[链接1](https://blog.csdn.net/qq_15626693/article/details/54618276)

[链接2](https://www.cnblogs.com/iflygofy/p/5209725.html)

### **显示器的屏幕信息**

1. screeen.height:屏幕分辨率的高
2. screen.width:屏幕分辨率的宽
3. 前面这两个数表示：屏幕宽高(屏幕像素) ---- 定值
4. screen.availHeight:屏幕可用高度（屏幕分辨率的高度-上下测任务栏的高度）
5. screen.availWidth:屏幕可用宽度（屏幕分辨率的宽度-左右侧任务栏的宽度）
6. 前面这两个数表示：屏幕可用宽高(像素) ---- 定值

![img](https://raw.githubusercontent.com/loveagri/note/master/ud-img/20170119173647334.png)

### **浏览器信息**

1. window.outerHeight:浏览器高度
2. window.innerHeight:浏览器可用高度
3. 工具栏高度=window.outerHeight-window.innerHeight;
4. 相应的还有window.outerWidth、window.innerWidth

![img](https://raw.githubusercontent.com/loveagri/note/master/ud-img/20170119175053609.png)

### **页面信息**

1. document.body.offsetHeight: body的总高度，也成为网页可见区域的高度（包括边框宽度）
2. document.body.offsetWidth: body的总宽度，也成为网页可见区域的宽度（包括边框宽度）\
3. document.body.clientHeight: body向用户展示的高度，也成为网页可见区域的高度（不包括边框宽度）
4. document.body.clientWidth: body向用户展示的宽度，也成为网页可见区域的宽度（不包括边框宽度）
5. offsetWidthh和clientWidth会随着浏览器窗口的大小变化而发生改变，而offsetHeight和clientHeight就不会发生变化，可以理解为一个定值
6. documwnt.body.scrollHeight=document.body.clientHeight：body的滚动高度
7. documwnt.body.scrollWidth: body的滚动宽度
8. scrollHeight：对象的滚动高度为对象的height值
9. scrollWidth：对象的滚动宽度为对象的width值

![img](https://raw.githubusercontent.com/loveagri/note/master/ud-img/20170119180615096.png)

总之：

clientWidth=width+padding

offsetWidth=clientWidth+border



