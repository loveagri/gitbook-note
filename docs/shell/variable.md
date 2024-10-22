# 变量

## 命令替换

|      | 语法             | 示例              | 输出                         |
| ---- | ---------------- | ----------------- | ---------------------------- |
| 1    | ``  `command` `` | `` echo `date` `` | Tue Jul 16 15:23:28 CST 2024 |
| 2    | `$(command)`     | `echo $(date)`    | Tue Jul 16 15:23:28 CST 2024 |

## 变量类型声明

| 命令    | 描述                                                         | 示例                                  |
| ------- | ------------------------------------------------------------ | ------------------------------------- |
| declare | -r：只读<br />-i：整数<br />-a：数组<br />-f：显示系统函数及其实现<br />-F：仅显示系统函数名<br />-x：环境变量<br /><br />取消变量申明直接将`-`改为`+`，如`declare -r var` | var="hello world"<br />declare -r var |
| typeset |                                                              |                                       |

## 数学运算

| 序号 | 语法                      |
| ---- | ------------------------- |
| 1    | expr num1 operate $num2   |
| 2    | \$(($num1 operate $num2)) |




![image-20230117214812513](https://gitlab.com/loveagri/pic/-/raw/main/2023-01-17/21/image-20230117214812513_compress_20230117214813.png)

| 操作符              | 语法                                    |
| ------------------- | --------------------------------------- |
| `expr num1 \| num2` | num1不为空且非0，返回num1，否则返回num2 |
| `expr num1 \& num2` | num1不为空且非0，返回num1，否则返回0    |
| `expr num1 = num2`  | num1等于num2，返回1，否则返回0          |

::: tip

1. `$((  ))`中可以进行逻辑运算，`$()`用于变量替换，注意区分。
2. 运算符，逻辑符号，某些逻辑符号需要转意，前边加反斜线\, 如，|、&、<>,\*, > 为管道符所以需要转义，<span style="color:red">数学运算时建议使用expr</span>。


:::

## BC运算

```sh
echo "scale=4; $num1 + $num2" | bc
```













































