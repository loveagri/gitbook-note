# node环境实现console输出不同颜色

参考链接：

​ [ode环境实现console输出不同颜色](https://www.cnblogs.com/xsSystem/p/16540205.html)

​ [Nodejs控制台console输出颜色控制](https://blog.csdn.net/weixin_45716124/article/details/126690394)

## 一、输出规则分析

### 1、输出及打印如下：

```js
console.log('\x1B[31m%s\x1B[0m', '这是红色')

console.log('\x1B[36m%s\x1B[0m', '这是青色')
```

### 2、规则说明

- **`\x1B[31m` 是一个转义序列，它将被您的终端拦截并指示它切换到红色。`\x1B`是不可打印控制字符 的代码escape。仅处理颜色和样式的转义序列也称为 [ANSI转义码](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors) 并且是标准化的，因此它们（应该）可以在任何平台上工作。这里可以指定多种样式`\x1B[31m\x1B[42m`；**

- **`%s` 是字符串（第二个参数）被注入的位置；上述代码还可以这样写：**

  console.log('\x1B[31m这是红色\x1B[0m')

  console.log('\x1B[36m这是青色\x1B[0m')

- **`\x1B[0m` 表示重置终端颜色，使其在此之后不再继续成为所选颜色；**

## 二、颜色参考

1. 'bright' : '\x1B[1m', // 亮色
2. 'grey' : '\x1B[2m', // 灰色
3. 'italic' : '\x1B[3m', // 斜体
4. 'underline' : '\x1B[4m', // 下划线
5. 'reverse' : '\x1B[7m', // 反向
6. 'hidden' : '\x1B[8m', // 隐藏
7. 'black' : '\x1B[30m', // 黑色
8. 'red' : '\x1B[31m', // 红色
9. 'green' : '\x1B[32m', // 绿色
10. 'yellow' : '\x1B[33m', // 黄色
11. 'blue' : '\x1B[34m', // 蓝色
12. 'magenta' : '\x1B[35m', // 品红
13. 'cyan' : '\x1B[36m', // 青色
14. 'white' : '\x1B[37m', // 白色
15. 'blackBG' : '\x1B[40m', // 背景色为黑色
16. 'redBG' : '\x1B[41m', // 背景色为红色
17. 'greenBG' : '\x1B[42m', // 背景色为绿色
18. 'yellowBG' : '\x1B[43m', // 背景色为黄色
19. 'blueBG' : '\x1B[44m', // 背景色为蓝色
20. 'magentaBG' : '\x1B[45m', // 背景色为品红
21. 'cyanBG' : '\x1B[46m', // 背景色为青色
22. 'whiteBG' : '\x1B[47m' // 背景色为白色

## 三、colors-console插件下载使用

下载

```sh
npm i colors-console -D
```
