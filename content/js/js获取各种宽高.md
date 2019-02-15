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



# [js获取页面元素距离浏览器工作区顶端的距离](https://www.cnblogs.com/fnz0/p/5510758.html)

[链接3](https://www.cnblogs.com/fnz0/p/5510758.html)

先介绍几个属性：（暂时只测了IE和firefox，实际上我工作中用到的最多的是chrome）

 **网页被卷起来的高度/宽度（即浏览器滚动条滚动后隐藏的页面内容高度）**

**(javascript)**        document.documentElement.scrollTop //firefox

**(javascript)**        document.documentElement.scrollLeft //firefox

**(javascript)**        document.body.scrollTop //IE

**(javascript)**        document.body.scrollLeft //IE

**(jqurey)**             $(window).scrollTop() 

**(jqurey)**             $(window).scrollLeft()

 **网页工作区域的高度和宽度**  

**(javascript)**       document.documentElement.clientHeight// IE firefox       

**(jqurey)**             $(window).height()

 **元素距离文档顶端和左边的偏移值**  

**(javascript)**        DOM元素对象.offsetTop //IE firefox

**(javascript)**        DOM元素对象.offsetLeft //IE firefox

**(jqurey)**             jq对象.offset().top

**(jqurey)**             jq对象.offset().left

## 获取页面元素距离浏览器工作区顶端的距离

 **页面元素距离浏览器工作区顶端的距离**  =  元素距离文档顶端偏移值  -   网页被卷起来的高度  

即：

 **页面元素距离浏览器工作区顶端的距离** =  DOM元素对象.offsetTop  **-**  document.documentElement.scrollTop 





# [获取任意元素距离页面顶部的距离 楼梯效果](https://www.cnblogs.com/ws-zhangbo/p/5806703.html)

```
HTMLElement.prototype.getElementTop=function(){
     var top = this.offsetTop;
     var cur = this.offsetParent;
     while(cur != null){
           top += cur.offsetTop;
           cur = cur.offsetParent;
    }
    return top;      
}
直接调用getElementTop()即可或得元素距离顶部的值

var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

```

```
window.addEventListener("load",function(){
    floor.init();
},false);
//为所有元素添加获得距页面顶部距离的方法，返回一个top值
HTMLElement.prototype.getElementTop=function(){
    //获得当前元素距父元素顶部的距离，保存在变量top中
    var top=this.offsetTop;
    //将当前元素的相对定位父元素对象保存在变量curr中
    var curr=this.offsetParent;
    //循环，只要curr不等于null，就继续获得父元素的父元素
    while(curr!=null){
    //    再次获得curr距它的父元素顶部的距离，累加到top中
        top+=curr.offsetTop;
    //    将curr再设置为curr的相对定位的父元素
        curr=curr.offsetParent;
    }
    return top;
}
var floor={
    init:function(){
        var self=this;
        window.addEventListener("scroll",function(){
            //获得页面滚动的高度
            var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
            //找到class为floor的div下的head下的所有span，保存在数组spans中
            var spans=$("div.floor>header>span");
            //遍历spans中每个span
            for(var i=0;i<spans.length;i++){
            //    获得当前span距页面顶部的距离，保存在变量spanTop中
                var spanTop=spans[i].getElementTop();
            //    如果spanTop刚好结余文档显示区范围内时
                if(spanTop>scrollTop+100&&spanTop<scrollTop+window.innerHeight-100){
            //        设置当前span的className为"hover"
                    spans[i].className="hover";
                }else{//  否则
            //        清除当前span的className
                    spans[i].className="";
                }
            }
            self.elevState();
        },false);
        $("#elevator>ul").addEventListener("mouseover",function(){
            var e=window.event||arguments[0];
            var target=e.srcElement||e.target;
            if(target.nodeName=="A"&&target.className!="etitle"){
                target.style.display="none";
                target.parentNode.$(".etitle").style.display="block";
            }
        },false);
        $("#elevator>ul").addEventListener("mouseout",function(){
            var e=window.event||arguments[0];
            var target=e.srcElement||e.target;
            if(target.nodeName=="A"&&target.className=="etitle"&&$(target.href.slice(-3)+">header>span").className!="hover"){
                target.style.display="none";
                target.parentNode.$("a:first-child").style.display="block";
            }
        },false);
    },
    elevState:function(){
        //判断elevator元素的显示状态
        $("#elevator").style.display=$("div.floor>header>span.hover").length!=0?"block":"none";
        //获得所有span的数组和所有li的数组
        var spans=$("div.floor>header>span");
        var lis=$("#elevator>ul>li");
        //遍历spans中每个span
        for(var i=0;i<spans.length;i++){
        //    在lis中找到相同位置的li
            var li=lis[i];
        //    如果当前span的class为hover
            if(spans[i].className=="hover"){
        //        在li下找第一个a，隐藏
            li.$("a:first-child").style.display="none";
        //        在li下找第二个a，显示
            li.$("a:first-child+a").style.display="block";
            }else{//    否则
        //        在li下找第一个a，显示
            li.$("a:first-child").style.display="block";
        //        在li下找第二个a，隐藏
            li.$("a:first-child+a").style.display="none";
            }
        }
    }
}
```





