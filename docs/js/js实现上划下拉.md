# web和webApp如何实现上拉加载和下拉刷新

[链接](https://blog.csdn.net/kerryqpw/article/details/78169431)

实现思路：

1.后端提供分页接口

2.list页面打开默认显示第一页的列表

3.js监听到页面顶部下拉时，清除所有list显示，请求第一页列表显示

4.js监听到页面滚动到底部时，增量加载下一的列表进行列表显示

## 核心代码

```js
 $(document).scroll(function(){
		var bheight = $(document).height();//获取窗口高度
		var sheight = $("body")[0].scrollHeight;//获取滚动条高度，[0]是为了把jq对象转化为js对象
		var stop = getScrollTop();//滚动条距离顶部的距离
				
		console.log("bheight:"+bheight);
		console.log("sheight:"+sheight);
		console.log("stop:"+stop);
	console.log("document.body.scrollTop:"+document.body.scrollTop)
	console.log("window.screen.height:"+window.screen.height)
				

		if(stop==0){
//			alert("下拉刷新");
		}
		//滚动框到底部时加载更多
		if(stop-60>=sheight-window.screen.height){//当滚动条到顶部的距离等于滚动条高度减去窗口高度时
			//alert("加载更多");
			//加载更多新闻
			loadMoreNewList();
		}
	});
},
            

//获取滚动框到顶部的高度
function getScrollTop(){    
    var scrollTop=0;    
    if(document.documentElement&&document.documentElement.scrollTop){ 
            scrollTop=document.documentElement.scrollTop;    
    }else if(document.body){    
        scrollTop=document.body.scrollTop;    
    }    
    return scrollTop;    
} 

```



```js
/**
 * Created by Administrator on 2017/4/18.
 */
/**为元素增加类属性 */
function addClass(elements, value)
{
    if (!elements.className) {
        elements.className = value;
    }
    else
    {
        newClass = elements.className;
        newClass += " ";
        newClass += value;
        elements.className = newClass;
    }
}
 
/**获取根据参数名url的参数*/
 
function getParamsId(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
 
    var loc=decodeURI(window.location.search);
    // alert(r);
    var r = loc.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};
 
/**个人中心获取id值*/
 
function getParams(key) {
    var r = window.location;
    r=r.toString();
    var strArray=r.split('/');
 
    var pernalId=strArray[strArray.length-1];
 
    return pernalId;
 
}
 
 
 
 
/** 获取json数组的长度*/
 
function getJsonLength(json){
    var jsonLength=0;
    for (var i in json) {
        jsonLength++;
    }
    return jsonLength;
}
 
 
/**判断时间大小*/
function judgeTime(startTime,endTime) {
    var startTime =new Date(startTime.replace("//-/g", "//"));
    var endTime = new Date(endTime.replace("//-/g", "//"));
 
    return startTime<endTime;
}
 
 
/**判断时间间隔多少小时*/
function judgeTimeDiffer(startTime,endTime) {
    var startTime =new Date(startTime.replace("//-/g", "//"));
    var endTime = new Date(endTime.replace("//-/g", "//"));
 
    return parseInt((startTime.getTime() - endTime.getTime()) / 1000 / 60 / 60);
}
 
 
/**获取当前点击时的坐标位置*/
function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    //alert('x: ' + x + '\ny: ' + y);
    return { 'x': x, 'y': y };
}
 
/**获取屏幕中央的位置*/
 
function  getMiddleLocation(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
 
    var x = scrollX ;
    var y =  scrollY ;
    return { 'x': x, 'y': y };
}

```

