---
barName: 示例
order: 100
sidebar: false
---

# Model

## 目录

[[toc]]

## 外链

你可以通过 [StackBlitz](https://stackblitz.com/fork/vuepress) 在你的浏览器里直接使用 VuePress 。

## 自定义容器

::: warning
VuePress v2 目前仍处于
:::

::: tip

- 使用 [pnpm](https://pnpm.io/zh/) 时，你需要安装 `vue` 作为 peer-dependencies 。
- 使用 [yarn 2+](https://yarnpkg.com/) 时，你需要在 [`.yarnrc.yml`](https://yarnpkg.com/configuration/yarnrc#nodeLinker)
  文件中设置 `nodeLinker: 'node-modules'` 。
  :::

::: details 示例 `.gitignore` 文件

```
# VuePress 默认临时文件目录
.vuepress/.temp
# VuePress 默认缓存目录
.vuepress/.cache
# VuePress 默认构建生成的静态文件目录
.vuepress/dist
```

:::

::: tip 这是添加的标题

tip 后直接跟标题

:::

## 无序列表

- 当前工作目录 `cwd` 下：
  - `vuepress.config.ts`
  - `vuepress.config.js`
  - `vuepress.config.mjs`
- 源文件目录 `sourceDir` 下：
  - `.vuepress/config.ts`
  - `.vuepress/config.js`
  - `.vuepress/config.mjs`

---

- 红色
- 绿色
  - 红色
  - 绿色
- 蓝色

## 有序列表

1. 红色
2. 绿色
3. 蓝色

## 内置CodeGroup、CodeGroupItem

<CodeGroup>
<CodeGroupItem title="pnpm" active>

```bash
pnpm create vuepress vuepress-starter
```

</CodeGroupItem>

<CodeGroupItem title="yarn">

```bash
yarn create vuepress vuepress-starter
```

</CodeGroupItem>

<CodeGroupItem title="npm">

```bash
npm init vuepress vuepress-starter
```

</CodeGroupItem>
</CodeGroup>

## 引用文字

> 这是一个有两段的块引用。这是第一段。
> 这是第二段。Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> 这是另一个只有一个段落的块引用。有三个空行分隔两个块引用。

## 水平线

---

---

## 强调（斜体）

_单个星号_

_单个下划线_

\*这个文字被文字星号包围\*

> 要在用作强调分隔符的位置生成文字星号或下划线，可以用反斜杠转义

## 粗体

**双星号**

**双重下划线**

## 代码

使用`printf()`函数。

## 删除线

~~错误的文字。~~ 变成 错误的文字。

## 下划线

<u>下划线</u> 变成 下划线

## 表情符号

:smile:
:cry:

## HTML

<span style="color:red">this text is red</span>

<iframe height='265' scrolling='no' title='Fancy Animated SVG Menu' src='http://codepen.io/jeangontijo/embed/OxVywj/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>

## 表格

<table>
    <tr>
        <td>类别</td>
        <td>名称</td>
    </tr>
    <tr>
        <td rowspan="2">颜色</td>
        <td style="background-color: red">红色</td>
    </tr>
    <tr>
        <td>黄色</td>
    </tr>
    <tr>
        <td colspan="2">姓氏</td>
    </tr>
    <tr>
        <td>王</td>
        <td>张</td>
    </tr>
</table>

<table>
    <tr> <!-- 第一行数据 -->
        <th colspan="9">CSW 命令状态封包 </th> <!-- 表头，用于居中显示；合并 9 行为 CBW 数据封包 -->
    </tr>
    <tr> <!-- 第二行数据 -->
        <th rowspan="2"> 偏移 </th> <!-- 表头，用于居中显示；合并 2 行为 字节 -->
        <th colspan="8"> 位 </th>  <!-- 表头，用于居中显示；合并 8 列 -->
    </tr>
    <tr> <!-- 第三行数据 -->
    <td> 7 </td>
    <td> 6 </td>
    <td> 5 </td>
    <td> 4 </td>
    <td> 3 </td>
    <td> 2 </td>
    <td> 1 </td>
    <td> 0 </td>
    </tr>
</table>

## 组件

你可以在 Markdown 中直接使用 Vue 组件。

**输入**

```md
这是默认主题内置的 `<Badge />` 组件 <Badge text="演示" />
```

**输出**

这是默认主题内置的 `<Badge />` 组件 <Badge text="演示" />

## 代码标题

你可以在代码块添加一个 title 键值对来为代码块设置标题。

```diff title=".vuepress/config.ts"
- module.exports = {
-   theme: '@vuepress/theme-default',
-   themeConfig: {
-     // 默认主题配置
-   },
- }

+ import { defaultTheme } from '@vuepress/theme-default'
+ import { defineUserConfig } from 'vuepress'
+
+ export default defineUserConfig({
+   theme: defaultTheme({
+     // 默认主题配置
+   })
+ })
```

## 显示反撇号`` ` ``

`` ` ``

## md代码为四个` ```` `

````md
```ts{1,7-9}
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: '你好， VuePress',

  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
  }),
})
```
````

## 居中

<center> <strong>居中</strong></center>

## 徽章

[制作徽章](https://badgen.net/)

<NpmBadge package="@vuepress/cli" />
<NpmBadge package="@vuepress/plugin-register-components" />

## vue

_你好， {{ msg }}_

<RedDiv>

_当前计数为： {{ count }}_

</RedDiv>

<button @click="count++">点我！</button>

<script setup>
import { h, ref } from 'vue'

const RedDiv = (_, ctx) => h(
  'div',
  {
    class: 'red-div',
  },
  ctx.slots.default()
)
const msg = 'Markdown 中的 Vue'
const count = ref(0)
</script>

<style>
.red-div {
  color: red;
}
</style>

## 数学公式

::: tip 原文链接
[Markdown常用数学公式](https://zhuanlan.zhihu.com/p/626610544)
:::

### 1 行内公式

在两个美元符号中输入公式即可。

如`$E=m\times c^2$` 效果：$E=m\times c^2$ （注：\times是乘的意思）

### 2 整行公式

在四个美元符号中输入公式，如果想要给公式后面添加编号，那么在公式后添加空格 + \tag{1}就可以了。

如`$$ \sum_{i=0}^n i^2=\frac{(n^2+n)(2n+1)}{6} \tag{1} $$`，效果：

$$
\{[(x_1+x_2)^2-(y_1-y_2)^4]\times w\}\times (z_1^2-z_2^2) \tag{4}
$$

### 3 希腊字母

<img src="https://gitlab.com/loveagri/pic/-/raw/main/2024-02-21/22/v2-136fceb8eb6f8d6d1c8480548c4358a8_1440w_20240221221030.png" alt="img" style="zoom: 67%;" />
<img src="https://gitlab.com/loveagri/pic/-/raw/main/2024-02-21/22/v2-6d044a7aa7b37f020646f79850c2c81d_1440w_20240221221149.png" alt="img" style="zoom:67%;" />

### 4 上标与下标

用\_表示下标，^表示上标。

如`$$ x_i^3+y_i^3=z_i^3 \tag{2} $$`，效果：

$$
x_i^3+y_i^3=z_i^3 \tag{2}
$$

如`$$ MSE=\sum_{i=1}^n (w\times x_i+b-y_i)^2 \tag{3} $$`，效果：

$$
MSE=\sum_{i=1}^n (w\times x_i+b-y_i)^2 \tag{3}
$$

### 5 括号

`()`和`[]` 可以直接输入，但花括号{ }前面需要加转义符号\。

如`$$ \{[(x_1+x_2)^2-(y_1-y_2)^4]\times w\}\times (z_1^2-z_2^2) \tag{4} $$` ，效果：

$$
\{[(x_1+x_2)^2-(y_1-y_2)^4]\times w\}\times (z_1^2-z_2^2) \tag{4}
$$

### 6 累加、累乘、并集和交集

累加：使用 \sum\_{下标表达式}^{上标表达式} {累加表达式}

如`$$ Y_i=\sum_{i=0}^{n} X_i \tag{5} $$`，效果：

$$
Y_i=\sum_{i=0}^{n} X_i \tag{5}
$$

与累加类似，

累乘使用 `$\prod$`并集使用 `$\bigcup$`交集使用 `$\bigcap$`例如：

$$
\sum_{i=1}^n \frac{1}{i^2} \quad and \quad \prod_{i=1}^n \frac{1}{i^2} \quad and \quad \bigcup_{i=1}^{2} \Bbb{R} \quad and \quad \bigcap_{i=1}^3
X_i \tag{6}
$$

### 7 对数

如`$\log_2 10$`，效果：$\log_2 10$

如`$\lg 10^3$`，效果：$\lg 10^3$

如`$\ln (\pi+2)$`，效果：$\ln (\pi+2)$

### 8 三角函数

如`$$ \sin(x+y)+\cos(y+z)+\tan(z+x)+\arcsin(x+y+z) \tag{7}$$`，效果：

$$
\sin(x+y)+\cos(y+z)+\tan(z+x)+\arcsin(x+y+z) \tag{7}
$$

### 9 运算符、积分、导数

如`$g(x)=\frac{\partial f(x,y)}{\partial x}$`，效果：$g(x)=\frac{\partial f(x,y)}{\partial x}$

如`$\int_a^{+\infty} x^2 \sin(x^3 +1)dx$`，效果：$\int_a^{+\infty} x^2 \sin(x^3 +1)dx$

如`$$\displaystyle\int_0^{+\infty} \frac{1}{\sqrt{2\pi}}e^{-\frac {x^2}{2}}dx=\frac{1}{2} \tag{8}$$`，效果：

$$
\displaystyle\int_0^{+\infty} \frac{1}{\sqrt{2\pi}}e^{-\frac {x^2}{2}}dx=\frac{1}{2} \tag{8}
$$

<img src="https://gitlab.com/loveagri/pic/-/raw/main/2024-02-21/22/v2-28402152865d950ef51bb8befd7da255_1440w_20240221222249.png" alt="img" style="zoom:67%;" />

### 10 根式

如`$\sqrt{x+y}$`，效果：$\sqrt{x+y}$

如`$\sqrt[n]{a + b}$`，效果：$\sqrt{x+y}$

## typora常用的数学公式编辑语法

::: tip 原文链接
[markdown公式大全](https://blog.csdn.net/jzj_c_love/article/details/122279703)

[typora常用的数学公式编辑语法](https://www.cnblogs.com/wreng/articles/13514391.html)
:::

## 一、基本格式

### 1. 上下标

```tex
A_1^2
\\
B_{12}
\\
2^{x^2+y}
```

$$
A_1^2
\\
B_{12}
\\
2^{x^2+y}
$$

### 2. 分数(fraction)

```tex
\frac{x}{1+x^2}
\\
\frac{\frac{1}{2}+x}{y}
\\
\tfrac{a}{b}
\frac{a}{b}
```

$$
\frac{x}{1+x^2}
\\
\frac{\frac{1}{2}+x}{y}
\\
\tfrac{a}{b}
\frac{a}{b}
$$

### 3. 开根号(square root calculations）

```tex
\sqrt{x}
\sqrt[3]{x}
```

$$
\sqrt{x}
\sqrt[3]{x}
$$

### 4. 组合数(combinatorial number)

```tex
\binom{n}{k}
\tbinom{n}{k}
```

$$
\binom{n}{k}
\tbinom{n}{k}
$$

### 5. 导数(derivative)

```tex
a'
a''
a^{\prime}
```

$$
a'
a''
a^{\prime}
$$

### 6. 取模(mod)

```tex
x \pmod a
\\
2\mod{x}
```

$$
x \pmod a
\\
2\mod{x}
$$

### 7. 积分

```tex
\int_{1}^{2}
\intop_{2}^{1}
\oint
\smallint
\\
\iint
\oiint
\iiint
\oiiint
```

$$
\int_{1}^{2}
\intop_{2}^{1}
\oint
\smallint
\\
\iint
\oiint
\iiint
\oiiint
$$

### 8.微分

```tex
\nabla
\partial x
\mathrm{d}x
\dot x
\ddot y
\Delta
```

$$
\nabla
\partial x
\mathrm{d}x
\dot x
\ddot y
\Delta
$$

### 9.累积/累乘/极限

```tex
\sum_{i=1}^{k}
\displaystyle\sum_{i=1}^n
\textstyle\sum_{i=1}^n
\\
\prod_{i=1}^{k}
\displaystyle\prod_{i=1}^n
\textstyle\prod_{i=1}^n
\\
\lim_{k \to \infty}
\lim\limits_{k \to \infty}
\lim\nolimits_{k \to \infty}]
```

$$
\sum_{i=1}^{k}
\displaystyle\sum_{i=1}^n
\textstyle\sum_{i=1}^n
\\
\prod_{i=1}^{k}
\displaystyle\prod_{i=1}^n
\textstyle\prod_{i=1}^n
\\
\lim_{k \to \infty}
\lim\limits_{k \to \infty}
\lim\nolimits_{k \to \infty}]
$$

## 二、修饰符号

### 1. 简单的帽子

```tex
\hat{\theta}
\widehat{AB}
\\
\bar{y}
\overline{AB}
\\
\tilde{a}
\widetilde{ac}
\\
\bar{a}
\acute{a}
\check{a}
\grave{a}
\\
\dot{a}
\ddot{a}
```

$$
\hat{\theta}
\widehat{AB}
\\
\bar{y}
\overline{AB}
\\
\tilde{a}
\widetilde{ac}
\\
\bar{a}
\acute{a}
\check{a}
\grave{a}
\\
\dot{a}
\ddot{a}
$$

### 3. 盒子和帽子

```tex
\overbrace{a+b+c}^{\text{note}}
\\
\underbrace{a+b+c}_{\text{note}}
\\
\boxed{\pi=3.14}
```

$$
\overbrace{a+b+c}^{\text{note}}
\\
\underbrace{a+b+c}_{\text{note}}
\\
\boxed{\pi=3.14}
$$

### 4. 各种括号

```tex
(
\big(
\Big(
\bigg(
\Bigg(
```

$$
(
\big(
\Big(
\bigg(
\Bigg(
$$

```tex
[]
<>
|-2|
\{\}
```

$$
[]
<>
|-2|
\{\}
$$

```tex
\lgroup x \rgroup
\lVert a \rVert
\lceil 2.6 \rceil
\lfloor 1.2 \rfloor
```

$$
\lgroup x \rgroup
\lVert a \rVert
\lceil 2.6 \rceil
\lfloor 1.2 \rfloor
$$

```tex
\ulcorner
\urcorner
\llcorner
\lrcorner
```

$$
\ulcorner
\urcorner
\llcorner
\lrcorner
$$

## 三、希腊字母

![e6a627023fa735a129f1725b85da1fa3](https://gitlab.com/loveagri/pic/-/raw/main/2024-02-22/21/e6a627023fa735a129f1725b85da1fa3_20240222212812.png)

![99c3a73a6e705c382b6b2acc99920392](https://gitlab.com/loveagri/pic/-/raw/main/2024-02-22/21/99c3a73a6e705c382b6b2acc99920392_20240222212837.png)

## 四、算术运算符号

```tex
+
-
\times
/
\div
\cdot
\#
\%
```

$$
+

-

\times
/
\div
\cdot
\#
\%
$$

```tex
\circ
\ast
\star
\otimes
\oplus
\odot
```

$$
\circ
\ast
\star
\otimes
\oplus
\odot
$$

```tex
\pm
\mp
\dotplus
\divideontimes
```

$$
\pm
\mp
\dotplus
\divideontimes
$$

## 五、比较运算符

```tex
=
= \not
\equiv
\approx
\approxeq
\cong
\sim
\neq
\not=
```

$$
=
= \not
\equiv
\approx
\approxeq
\cong
\sim
\neq
\not=
$$

```tex
<
>
\le
\ge
\gg
\ll
```

$$
<
>
\le
\ge
\gg
\ll
$$

```tex
\curlyeqprec
\curlyeqsucc
\prec
\succ
\preceq
\succeq
```

$$
\curlyeqprec
\curlyeqsucc
\prec
\succ
\preceq
\succeq
$$

## 六、集合运算符

```tex
\in
\owns \not
\subset \not
\supset
\subseteq
\supseteq
\\
\cap
\cup
\land
\lor
\\
\neg
\emptyset
\varnothing
\\
\because
\forall
\exists
\therefore
```

$$
\in
\owns \not
\subset \not
\supset
\subseteq
\supseteq
\\
\cap
\cup
\land
\lor
\\
\neg
\emptyset
\varnothing
\\
\because
\forall
\exists
\therefore
$$

```tex
\cap
\cup
\land
\lor
\sqcup
\sqcap
```

$$
\cap
\cup
\land
\lor
\sqcup
\sqcap
$$

## 七、各种箭头

```tex
\gets
\leftarrow
\to
\rightarrow
\leftrightarrow
\\
\uparrow
\downarrow
\updownarrow
```

$$
\gets
\leftarrow
\to
\rightarrow
\leftrightarrow
\\
\uparrow
\downarrow
\updownarrow
$$

```tex
\Leftarrow
\Rightarrow
\Leftrightarrow
\iff
\\
\Uparrow
\Downarrow
\Updownarrow
```

$$
\Leftarrow
\Rightarrow
\Leftrightarrow
\iff
\\
\Uparrow
\Downarrow
\Updownarrow
$$

```tex
\nearrow
\searrow
\swarrow
\nwarrow
```

$$
\nearrow
\searrow
\swarrow
\nwarrow
$$

```tex
\longleftarrow
\longrightarrow
\longleftrightarrow
\Longleftarrow
\Longrightarrow
\Longleftrightarrow
\longmapsto
```

$$
\longleftarrow
\longrightarrow
\longleftrightarrow
\Longleftarrow
\Longrightarrow
\Longleftrightarrow
\longmapsto
$$

```tex
\xrightarrow{over}
\xrightarrow[over]{}
\xrightarrow[under]{over}
\xleftarrow[]{over}
\xleftarrow[under]{}
\xleftarrow[under]{over}
```

$$
\xrightarrow{over}
\xrightarrow[over]{}
\xrightarrow[under]{over}
\xleftarrow[]{over}
\xleftarrow[under]{}
\xleftarrow[under]{over}
$$

## 八、空间间距

```tex
A\!B
\\
AB
\\
A\thinspace B
\\
A\:B
\\
A\ B
\\
A \enspace B
\\
A\quad B
\\
A\qquad B
```

$$
A\!B
\\
AB
\\
A\thinspace B
\\
A\:B
\\
A\ B
\\
A \enspace B
\\
A\quad B
\\
A\qquad B
$$

## 九、矩阵

```tex
A = \begin{matrix}
a & b\\
c & d
\end{matrix}
```

$$
A = \begin{matrix}
a & b\\
c & d
\end{matrix}
$$

```tex
B = \begin{pmatrix}
a & b\\
c & d
\end{pmatrix}
```

$$
B = \begin{pmatrix}
a & b\\
c & d
\end{pmatrix}
$$

```tex
D = \begin{bmatrix}
a & b\\
c & d
\end{bmatrix}
```

$$
D = \begin{bmatrix}
a & b\\
c & d
\end{bmatrix}
$$

```tex
E = \begin{Vmatrix}
a & b\\
c & d
\end{Vmatrix}
```

$$
E = \begin{Vmatrix}
a & b\\
c & d
\end{Vmatrix}
$$

```tex
F = \begin{Bmatrix}
a & b\\
c & d
\end{Bmatrix}
```

$$
F = \begin{Bmatrix}
a & b\\
c & d
\end{Bmatrix}
$$

```tex
[A\ b] =
\begin{bmatrix}
\begin{array}{c c c|c}
a_{11} & a_{12} & a_{13} & b_1\\
a_{21} & a_{22} & a_{23} & b_2\\
a_{31} & a_{32} & a_{33} & b_3\\
\end{array}
\end{bmatrix}

```

$$
[A\ b] =
\begin{bmatrix}
\begin{array}{c c c|c}
a_{11} & a_{12} & a_{13} & b_1\\
a_{21} & a_{22} & a_{23} & b_2\\
a_{31} & a_{32} & a_{33} & b_3\\
\end{array}
\end{bmatrix}
$$

```tex
\begin{array}{c:c:c}
a & b & c \\
\hline
d & e & f \\
\hdashline
 g & h & i
\end{array}
```

$$
\begin{array}{c:c:c}
a & b & c \\
\hline
d & e & f \\
\hdashline
g & h & i
\end{array}
$$

```tex
L_{n\times n} = \begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots &\ddots & \vdots\\
a_{n1} & a_{n2} & \cdots & a_{nn} \\
\end{bmatrix}
```

$$
L_{n\times n} = \begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots &\ddots & \vdots\\
a_{n1} & a_{n2} & \cdots & a_{nn} \\
\end{bmatrix}
$$

## 十、列式/方程组

```tex
\begin{aligned}
f(x) &= (x+1)^2\\
&= x^2 + 2x + 1
\end{aligned}
```

$$
\begin{aligned}
f(x) &= (x+1)^2\\
&= x^2 + 2x + 1
\end{aligned}
$$

```tex
f(x) = \begin{cases}
a &\text{if b}\\
b &\text{if a}\\
\end{cases}
```

$$
f(x) = \begin{cases}
a &\text{if b}\\
b &\text{if a}\\
\end{cases}
$$

```tex
\begin{cases}
\begin{aligned}
x + 2y &= 1\\
3x - y &= 5
\end{aligned}
\end{cases}
```

$$
\begin{cases}
\begin{aligned}
x + 2y &= 1\\
3x - y &= 5
\end{aligned}
\end{cases}
$$

```tex
g(x,y)=\left\{
\begin{array}{rcl}
\frac{M_g - d}{M_f-b}[f(x,y)-b]+d       &      & {b      \leq  f(x,y)  \leq M_f}\\
F^*_L     &      & {S_L \leq 0 < S_M}\\
F^*_R     &      & {S_M \leq 0 < S_R}\\
F_R       &      & {S_R \leq 0}
\end{array} \right.
```

$$
g(x,y)=\left\{
\begin{array}{rcl}
\frac{M_g - d}{M_f-b}[f(x,y)-b]+d &&{b\leq f(x,y) \leq M_f}\\
F^*_L & & {S_L \leq 0 < S_M}\\
F^*_R & & {S_M \leq 0 < S_R}\\
F_R & & {S_R \leq 0}
\end{array} \right.
$$

## 十一、修改颜色和字体大小

```tex
\textcolor{blue}{F=ma}
\\
\textcolor{#00ff00}{F=ma}
\\
\textcolor{#ff0000}{F=ma}
\\
\color{blue} one\ line
\\
nothing
```

$$
\textcolor{blue}{F=ma}
\\
\textcolor{#00ff00}{F=ma}
\\
\textcolor{#ff0000}{F=ma}
\\
\color{blue} one\ line
\\
nothing
$$

```tex
\colorbox{#00ff00}{F=ma}
\\
\colorbox{aqua}{A}
\\
\fcolorbox{red}{aqua}{A}
```

$$
\colorbox{#00ff00}{F=ma}
\\
\colorbox{aqua}{A}
\\
\fcolorbox{red}{aqua}{A}
$$

```tex
AB
\Huge AB
\huge AB
\\
AB
\LARGE AB
\Large AB
\large AB
\\
AB
\small AB
\tiny AB
```

$$
AB
\Huge AB
\huge AB
\\
AB
\LARGE AB
\Large AB
\large AB
\\
AB
\small AB
\tiny AB
$$

## 十二、划掉

```tex
\cancel{5}
\bcancel{5}
\xcancel{ABC}
\not =
```

$$
\cancel{5}
\bcancel{5}
\xcancel{ABC}
\not =
$$

## 十三、常见图形

```tex
\Box
\square
\blacksquare
\triangle
\triangledown
\blacktriangle
\diamond
\Diamond
\star
\bigstar
\circ
\bullet
\bigcirc
\bigodot
```

$$
\Box
\square
\blacksquare
\triangle
\triangledown
\blacktriangle
\diamond
\Diamond
\star
\bigstar
\circ
\bullet
\bigcirc
\bigodot
$$

```tex
\diamondsuit
\clubsuit
\heartsuit
\spadesuit
```

$$
\diamondsuit
\clubsuit
\heartsuit
\spadesuit
$$

```tex
\angle
\measuredangle
\top
\bot
\infty
```

$$
\angle
\measuredangle
\top
\bot
\infty
$$

```tex
\checkmark
\dagger
\ddagger
\yen
\$
```

$$
\checkmark
\dagger
\ddagger
\yen
\$
$$

## 十四、声明宏

对于一些复杂但是只有少许不同的表达式，可以声明一个函数来调用，提高源码的可读性，减少出错

```tex
\def\macroname#1#2{
your command
}
```

宏允许带任意数量的参数（也可以不带参），必须是`#1,#2,……`这样的命名格式，同时注意再定义宏的时候注意让`#1`与`\`
中间隔一个空格，否则会解析成#。再调用的时候格式为`\macroname{x}{y}{z}`，可以参考一下的例子

```tex
\def\Normal#1#2#3{
\frac{1}{\sqrt{2\pi}\ #3}\exp{[-\frac{(#1 - #2)^2}{2\ #3^2}]}
}
f(x)=\Normal{x}{u_1}{\sigma_1}\\
f(y)=\Normal{y}{u_2}{\sigma_2}\\
```

$$
\def\Normal#1#2#3{
\frac{1}{\sqrt{2\pi}\ #3}\exp{[-\frac{(#1 - #2)^2}{2\ #3^2}]}
}
f(x)=\Normal{x}{u_1}{\sigma_1}\\
f(y)=\Normal{y}{u_2}{\sigma_2}\\
$$

```tex
\def\EXP{
e^x = 1 + x + \frac{1}{2!}x^2 + \frac{1}{3!}x^3  + \cdots
}
\EXP
```

$$
\def\EXP{
e^x = 1 + x + \frac{1}{2!}x^2 + \frac{1}{3!}x^3 + \cdots
}
\EXP
$$
