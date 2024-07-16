# 字符串处理

```sh
# 全局使用示例
v="I love you, Do you love me"
```

::: warning

<span style="color:red">expr 索引从1开始, `$`从0开始索引</span>

:::

## 变量替换

![image-20230115204034707](https://gitlab.com/loveagri/pic/-/raw/main/2024-07-16/14/18200_image-20230115204034707_compress_20230115204049.png)

```sh
v="I love you, Do you love me"
```

| 语法              | 说明                                                       | 例子                  | 输出                       |
| ----------------- | ---------------------------------------------------------- | --------------------- | -------------------------- |
| `${var#rule}`     | Delete the **shortest** from the **beginning** of variable | `var=${v#*ov}`        | e you, Do you love me      |
| `${var##rule}`    | Delete the **longest** from the **beginning** of variable  | `var=${v##*ov}`       | e me                       |
| `${var%rule}`     | Delete the **shortest** from the **end** of variable       | `var=${v%ov*}`        | I love you, Do you l       |
| `${var%%rule}`    | Delete the **longest** from the **end** of variable        | `var=${v%%ov*}`       | I l                        |
| `${var/old/new}`  | Replace the **first** match                                | `var=${v/love/hate}`  | I hate you, Do you love me |
| `${var/old//new}` | Replace the **all** match                                  | `var=${v//love/hate}` | I hate you, Do you hate me |

## 变量测试

![image-20230115204926647](https://gitlab.com/loveagri/pic/-/raw/main/2023-01-15/20/image-20230115204926647_20230115204926.png)

## 字符串计算长度

|      | 语法                      | 说明                                                         | 示例                        | 输出 |
| ---- | ------------------------- | ------------------------------------------------------------ | --------------------------- | ---- |
| 1    | `${#v}`                   | the length, index start from 0                               | `len=${#v}`                 | 26   |
| 2    | `` `expr length "$v" ` `` | If there are Spaces in the string, double quotation marks must be added, just used in Linux, **macOS  doesn't work**, index start from 1 | ``len=`expr length "$v"` `` | 26   |

## 获取字符串位置

|      | 语法                               | 说明                                                         | 示例                             | 输出 |
| ---- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------- | ---- |
| 1    | ``  `expr index $var substring` `` | 获取第一个`字符`位置，拆分字符串为字符，然后匹配最先找到的字符，如例子中`o`是首先找到的, 索引从1开始 | ``ind=`expr index "$v" you` ``   | 4    |
| 2    | `` `expr match $var substring` ``  | 获取从头匹配的子串的长度, ``ind=`expr match "$v" you` ``结果为0 | ``  ind=`expr match "$v" I.*` `` | 26   |

## 抽取子串

![image-20230116140647946](https://gitlab.com/loveagri/pic/-/raw/main/2023-01-16/14/image-20230116140647946_20230116140648.png)

|      | Syntax                                     | Description                                                  | 示例                              | 输出             |
| ---- | ------------------------------------------ | ------------------------------------------------------------ | --------------------------------- | ---------------- |
| 1    | `${var: postion}`                          | start from the position, **index start from 0**              | `var=${v: 10}`                    | , Do you love me |
| 2    | `${var: postion: length}`                  | start from position, the length of match is length           | `var=${v:10:6}`                   | , Do y           |
| 3    | `${var: -postion}`                         | From right side, there is a <span style="color:red">white-space</span> between : and - | `var=${v: -5}`                    | ve me            |
| 4    | `${var: -postion:length}`                  |                                                              | `var=${v: -5:4}`                  | ve m             |
| 5    | `` `expr substr "$var" position length` `` | start from position, the length of match is length with <span style="color:red">index from 1</span> | `` str=`expr substr "$v" 10 6` `` | u, Do            |

练习：

```sh

string="Bigdata process framework is Hadoop, Hadoop is an open source project"


function print_tips
{
    echo "*********************************************"
    echo "(1) print the length of string"
    echo "(2) delete all Hadoop"
    echo "(3) replace the first Hadoop with Mapreduce"
    echo "(4) replace all the Hadoop with Mapreduce"
    echo "*********************************************"
}

function len_of_string() {
    echo "${#string}"
}

function del_hadoop() {
    echo "${string//Hadoop/}"
}

function rep_hadoop_mapreduce_first() {
    echo "${string/Hadoop/Mapreduce}"
}

function rep_hadoop_mapreduce_all() {
    echo "${string//Hadoop/Mapreduce}"
}


while true
 do
    echo "【 string=$string 】"
    echo
    print_tips
    read -p "Pls input your choice(1|2|3|4|Q|q):" choice

    case $choice in
          1)
            len_of_string
            ;;
          2)
            del_hadoop
            ;;
          3)
            rep_hadoop_mapreduce_first
            ;;
          4)
            rep_hadoop_mapreduce_all
            ;;
          q|Q)
            exit
            ;;
          *)
            echo "Error, input only in (1|2|3|4|Q|q)"
            ;;
    esac
done
```









































































