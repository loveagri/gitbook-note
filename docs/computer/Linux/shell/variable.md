# 变量

## 变量替换

### Syntax format

|     | Syntax format |
| --- | ------------- |
| 1   | \`command\`   |
| 2   | $(command)    |

## 变量类型声明

| 命令    | 描述                   |
| ------- | ---------------------- |
| declare | -r\|-i\|-f\|-F\|-a\|-x |
| typeset |                        |

## 数组声明

```bash
array=("jones" "mike" "kobe" "jordan") # 以空格间隔每个元素

echo ${array[@]} # all array、

echo ${array[0]} # first elament

echo ${#array[@]} #get array length

```

## 数学运算

|     | 语法                     |
| --- | ------------------------ |
| 1   | expr num1 operate $num2  |
| 2   | $(($num1 operate $num2)) |

::: tip

运算符，逻辑符号，某些逻辑符号需要转意，前边加反斜线\, 如，|、&、<>,\*, > 为管道符所以需要转义，<span style="color:red">数学运算时建议使用expr</span>

:::

![image-20230117214812513](https://gitlab.com/loveagri/pic/-/raw/main/2023-01-17/21/image-20230117214812513_compress_20230117214813.png)

## BC运算

```sh
echo "scale=4; $num + $num2" | bc
```
