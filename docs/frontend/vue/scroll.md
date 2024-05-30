# vue3中监听滚动条事件

```vue
import { onMounted, onUnmounted, reactive } from 'vue' const data=reactive({
oldScrollTop:0, }); const scrolling=()=>{ // 滚动条距文档顶部的距离 let
scrollTop =window.pageYOffset ||document.documentElement.scrollTop
||document.body.scrollTop; // 滚动条滚动的距离 let scrollStep = scrollTop -
data.oldScrollTop; console.log("header 滚动距离 ", scrollTop); //
更新——滚动前，滚动条距文档顶部的距离 data.oldScrollTop = scrollTop;
//变量windowHeight是可视区的高度 let windowHeight =
document.documentElement.clientHeight || document.body.clientHeight;
//变量scrollHeight是滚动条的总高度 let scrollHeight =
document.documentElement.scrollHeight || document.body.scrollHeight;
//滚动条到底部的条件 if (scrollTop + windowHeight == scrollHeight) {
//你想做的事情 console.log("header 你已经到底部了"); } if (scrollStep < 0) {
console.log("header 滚动条向上滚动了！"); } else { console.log("header
滚动条向下滚动了！"); } // 判断是否到了最顶部 if (scrollTop <= 0) {
console.log("header 到了最顶部") }; }; onMounted(()=>{
window.addEventListener("scroll", scrolling); }) onUnmounted(()=>{
window.removeEventListener("scroll", scrolling); })
```
