

# bootstrap组件和全局样式有什么区别

1、BootStrap指定的四种屏幕尺寸：①超大PC屏幕——lg（large）：w>=1200px；②中等PC屏幕——md（medium）：1200px>w>=992px；③Pad屏幕——sm（small）：992px>w>=768px；④Phone屏幕——xs(extra small)：768px>w；

2、BootStrap中的两种容器：①定宽容器：.container——1170px(lg)、970px(md)、750px(sm)、100%(xs)；②变宽容器：.container——100%；③两种容器都有:before和:after，可以清除子元素的margin和float造成的影响；

3、全局CSS样式——表格：.table——基础表格；.table-bordered——带边框的表格；.table-striped——隔行变色的表格；.table-hover——带鼠标悬停效果的表格；.table-responsive——响应式表格，必须使用在table的父元素div上；

4、全局CSS样式——栅格布局系统：①最外层必须是容器类：.container或.container-fluid；②容器中放置行：.row；③行中放置列：.col；④针对不同的屏幕使用不同的列：.col-lg-*：适用于超大PC屏幕；.col-md-*：适用于中等PC屏幕；.col-sm-*：适用于Pad屏幕；.col-xs-*：适用于Phone屏幕；一个div可以同时声明多个不同屏幕下的列宽：<div class="col-lg-* col-md-* col-sm-* col-xs-*">⑤一行均分为12份，每个列都需要指定自己所占的份数：<div class="col-lg-2 col-md-6 col-sm-8 col-xs-12">⑥每个列都可以指定向右的偏移量：，可以实现右错位的效果：<div class=".col-lg/md/sm/xs-offset-1/2/3/4/...">⑦不同的列在不同的屏幕下有不同的适用性：.col-lg-*：只适用于LG屏幕；.col-md-*：适用于MD/LG屏幕；.col-sm-*：适用于SM/MD/LG屏幕；.col-xs-*：适用于XS/SM/MD/LG屏幕