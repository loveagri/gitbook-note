## 2019 年编写现代 JavaScript 代码的5个小技巧

[链接](https://mp.weixin.qq.com/s?__biz=MzAwNjI5MTYyMw==&mid=2651496983&idx=1&sn=bd97b20b8339e220aea4cff70056e5a5&chksm=80f1abdfb78622c9a594f8976b06b34aa7f4e300768c3ec7bd65fe6219395e1f4afbb4e09058&mpshare=1&scene=1&srcid=0123nJLprKuDMLJDPmTWVUDk&key=6e5e6d2df7d1a731c73d8fd8b1789dbb0c908e399bdc6791d4111b7ff55ac99bfd43fd1e9975720f3677d4173518b160cb644fc2787d58c69c9cea9af36b18cb140524b34dd431c471aa92ce6ee54844&ascene=1&uin=MTE3NjE0MDIwMg%3D%3D&devicetype=Windows-QQBrowser&version=6103000b&lang=zh_CN&pass_ticket=eDk827Faphrg%2F1YdPlMPz9u5k7juZyQPJ4mbKrp7Qy%2BhyqmoQO3B4VsU09ZqGIfR)

## 1 Array.includes 与条件判断

一般我们判断或用 ||

```
// conditionfunction test(fruit) {  if (fruit == "apple" || fruit == "strawberry") {    console.log("red");  }}
```

如果我们有更多水果

```
function test(fruit) {  const redFruits = ["apple", "strawberry", "cherry", "cranberries"];
  if (redFruits.includes(fruit)) {    console.log("red");  }}
```

## 2 Set 与去重

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。Set 本身是一个构造函数，用来生成 Set 数据结构。

数组去重

```
const arr = [3, 5, 2, 2, 5, 5];const unique = [...new Set(arr)];// [3,5,2]
```

Array.from 方法可以将 Set 结构转为数组。我们可以专门编写使用一个去重的函数

```
function unique(array) {  return Array.from(new Set(array));}
unique([1, 1, 2, 3]); // [1, 2, 3]
```

字符去重

```
let str = [...new Set("ababbc")].join("");console.log(str);// 'abc'
```

另外 Set 是如此强大，因此使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。

```
let a = new Set([1, 2, 3]);let b = new Set([4, 3, 2]);
// 并集let union = new Set([...a, ...b]);// Set {1, 2, 3, 4}
// 交集let intersect = new Set([...a].filter(x => b.has(x)));// set {2, 3}
// 差集let difference = new Set([...a].filter(x => !b.has(x)));// Set {1}
```

## 3 Map 与字典类型数据

一般而已，JavaScript 实现字典数据是基于 Object 对象。但是 JavaScript 的对象的键只能是字符串。对于编程来说有很多不便。 ES6 提供了 Map 数据结构。它类似于 Object 对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值，字符串、数值、布尔值、数组、对象等等都可以当作键。

```
const resultMap = new Map()  .set(-1, {text:'小于',color:'yellow')  .set(0, {text:'等于',color:'black')  .set(1, {text:'大于',color:'green')  .set(null,{text:'没有物品',color:'red'})
let state = resultMap.get(null)// {text:'没有物品',color:'red'}
```

Map 的遍历顺序就是插入顺序

```
const map = new Map([["F", "no"], ["T", "yes"]]);
for (let key of map.keys) {  console.log(key);}// "F"// "T"
for (let value of map.value()) {  console.log(value);}// "no"// "yes"
```

## 4 函数式的方式处理数据

按照我的理解，函数式编程主张函数必须接受至少一个参数并返回一个值。所以所有的关于数据的操作，都可以用函数式的方式处理。

假设我们有这样的需求，需要先把数组 foo 中的对象结构更改，然后从中挑选出一些符合条件的对象，并且把这些对象放进新数组 result 里。

```
let foo = [  {    name: "Stark",    age: 21  },  {    name: "Jarvis",    age: 20  },  {    name: "Pepper",    age: 16  }];
//我们希望得到结构稍微不同，age大于16的对象：let result = [  {    person: {      name: "Stark",      age: 21    },    friends: []  },  {    person: {      name: "Jarvis",      age: 20    },    friends: []  }];
```

从直觉上我们很容易写出这样的代码：

```
let result = [];
//有时甚至是普通的for循环foo.forEach(function(person){    if(person.age > 16){        let newItem = {            person: person,            friends: [];        };        result.push(newItem);    }})
```

使用函数式的写法，可以优雅得多

```
let result = foo  .filter(person => person.age > 16)  .map(person => ({    person: person,    friends: []  }));
```

数组求和

```
let foo = [1, 2, 3, 4, 5];
//不优雅function sum(arr) {  let x = 0;  for (let i = 0; i < arr.length; i++) {    x += arr[i];  }  return x;}sum(foo); // => 15
//优雅foo.reduce((a, b) => a + b); // => 15
```

## 5 compose 与函数组合

以下代码称为组合 compose

```
const compose = function(f, g) {  return function(x) {    return f(g(x));  };};
```

由于函数式编程大行其道，所以现在将会在 JavaScript 代码看到大量的箭头()=>()=>()=>的代码。

ES6 版本 compose

```
const compose = (f, g) => x => f(g(x));
```

在 compose 的定义中， g 将先于 f 执行，因此就创建了一个从右到左的数据 流。这样做的可读性远远高于嵌套一大堆的函数调用.

我们选择一些函数，让它们结合，生成一个崭新的函数。

reverse 反转列表， head 取列表中的第一个元素；

```
const head = arr => arr[0];const reverse = arr => [].concat(arr).reverse();
const last = compose(head, reverse);last(["jumpkick", "roundhouse", "uppercut"]);// "uppercut"
```

但是我们这个这个compose不够完善，只能处理两个函数参数。redux源码有个很完备的compose函数，我们借鉴一下。

```
function compose(...funcs){  if (funcs.length === 0){      return arg => arg  }
  if (funcs.length === 1 ){      return funcs[0]  }
  return funcs.reduce((a,b)=>(...args) => a(b(...args)))}
```

有了这个函数，我们可以随意组合无数个函数。现在我们增加需求，组合出一个lastAndUpper函数，内容是先reverse 反转列表， head 取列表中的第一个元素, 最后toUpperCase大写。

```
const head = arr => arr[0];const reverse = arr => [].concat(arr).reverse();const toUpperCase = str => str.toUpperCase();
const last = compose(head, reverse);
const lastAndUpper = compose(toUpperCase, head, reverse,);
console.log(last(["jumpkick", "roundhouse", "uppercut"]));// "uppercut"console.log(lastAndUpper(["jumpkick", "roundhouse", "uppercut"]))// "UPPERCUT"
```

## 6 获取Unicode码

```js
function getUnicode (charCode) {
    return charCode.charCodeAt(0).toString(16);//十六进制获取十进制
}
```

