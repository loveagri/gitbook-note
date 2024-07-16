# awk

---

## 语法格式

第一种：`awk "BEGIN{}pattern{commands}END{}" file`

第二种：`standard output | "BEGIN{}pattern{commands}END{}"`

## 参数

- -v 传递参数

  ```sh
  num1=20
  var="hello world"

  awk -v num2=$num1 -v var1="$var" 'BEGIN{print num2,var1}'
  ```

- -f 引入文件脚本

  ```sh
  awk -f exec.awk
  ```

- -F 指定分隔符

## 内置变量

| 序号 | 内置变量 | 含义                                            | 示例                                       |
| ---- | -------- | ----------------------------------------------- | ------------------------------------------ |
| 1    | $0       | 整行内容                                        |                                            |
| 2    | $1-$n    | 当前行的1-n个字段                               |                                            |
| 3    | NF       | 处理行的字段个数                                |                                            |
| 4    | NR       | 当前行的行号，从1开始计数                       |                                            |
| 5    | FNR      | 多文件处理时，每个文件行号单独计数，都是从1开始 |                                            |
| 6    | FS       | 分隔符，默认空格活tab                           | Awk 'BEGIN{FS=":"}{print $2}' file         |
| 7    | RS       | 输入行分隔符，默认为空格                        | Awk 'BEGIN{FS=":";RS="--"}{print $2}' file |
| 8    | OFS      | 输出字段分隔符，默认空格                        |                                            |
| 9    | ORS      | 输出行分隔符，默认回车换行                      |                                            |
| 10   | FILENAME | 当前输入的文件名称                              |                                            |
| 11   | ARGC     | 命令行参数个数                                  |                                            |
| 12   | ARGV     | 命令行参数数组                                  |                                            |

## 格式化输出printf

| 格式符 | 含义                                        | 示例                                                            |
| ------ | ------------------------------------------- | --------------------------------------------------------------- |
| %s     | 字符串                                      | awk 'BEGIN{FS=":"} {printf "%s\n", $1}' /etc /passwd            |
| %d     | 十进制                                      |                                                                 |
| %f     | 浮点数                                      | awk 'BEGIN{FS=":"} {printf "%0.2f\n", $3}' /etc/passwd          |
| %x     | 十六进制                                    |                                                                 |
| %o     | 八进制                                      |                                                                 |
| %e     | 数字科学计数法                              | awk 'BEGIN{FS=":"} {printf "%e\n", $3}' /etc/passwd             |
| %c     | 单个字符的ASCII码                           |                                                                 |
| -      | 左对齐,默认左对齐                           | awk 'BEGIN{FS=":"} {printf "%-20s %-20s\n", $1,$7}' /etc/passwd |
| +      | 右对齐,加对齐位数后默认右对齐               |                                                                 |
| #      | 显示八进制的前面加0，显示十六进制的前面加0x | awk 'BEGIN{FS=":"} {printf "%#x\n", $3}' /etc/passwd            |

## 模式匹配

| 方法       | 描述                                      | 示例                                                                                                                                     |
| ---------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| RegExp     |                                           | awk 'BEGIN{FS=":"}/root/ {printf "%d\n", $3}' /etc/passwd                                                                                |
| 运算符匹配 | < \| > \| <= \| >= \| == \| != \| ~ \| !~ | 1. awk 'BEGIN{FS=":"} $3<10 {printf "%d\n", $3}' /etc/passwd <br />2. awk 'BEGIN{FS=":"} $3~/[0-9]{2,}/ {printf "%d\n", $3}' /etc/passwd |
| 布尔值匹配 | \|\| \| && \| ！                          | awk 'BEGIN{FS=":"} $1=="root" \|\| $1=="mail"{printf "%s\n", $0}' /etc/passwd                                                            |

## 动作表达式

- 计算空白行的数量

```sh
awk '/^$/ {sum++} END {print sum}' /etc/services

```

- 计算学生平均分，并且格式化输出，添加头部，文本如下：

```
Allen  802  36  956 798
mike  80  376  967 798
Zhang  480  36  596 988
wang  680  366  966 988
han  870  37  967 988
Li  809  33  896 988
```

```shell
awk 'BEGIN{printf "%-8s%-8s%-8s%-8s%-8s%-8s\n","name", "math", "chinese", "english", "pysical", "avg"}{total=$2+$3+$4+$5;avg=total/4; printf "%-8s%-8d%-8d%-8d%-8d%-0.2f\n",$1,$2,$3,$4,$5,avg}' student.txt
```

## Awk 文件内编写代码，然后执行

```sh
awk -f exec.awk
```

## 字符串函数

| 函数名             | 解释                                                   | 函数返回值          |
| ------------------ | ------------------------------------------------------ | ------------------- |
| length(str)        | 计算字符串长度                                         | 整数长度值          |
| index(str1,str2)   | 在str1中查找str2的文职                                 | 返回索引值，从1计数 |
| tolower(str)       | 转为小写                                               |                     |
| toupper(str)       | 大写                                                   |                     |
| substr             | 从str的m个字符串开始，截取n位                          | 截取后的子串        |
| split(str,arr,fs)  | 按fs切割字符串，结果保存arr                            | 切割后的子串个数    |
| match(str,RE)      | 在str中按照RE查找，返回位置                            | 返回索引位置        |
| sub(RE,RepStr,str) | 在str中搜索符合RE的字串，将其替换为Repstr;只替换第一个 | 替换的个数          |
| gsub               | 在str中搜索符合RE的字串，将其替换为Repstr;替换所有     | 替换的个数          |

## awk数组的用法

::: warning

awk中数组索引是从1开始的，shell中数组是从0开始

:::
