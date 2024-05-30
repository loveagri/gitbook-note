# 字符串处理

### 字符串计算长度

|     | 语法               | 说明 |
| --- | ------------------ | ---- |
| 1   | ${#var}            |      |
| 2   | expr length "$var" |      |

### 获取字符串位置

|     | 语法                      | 说明                     |
| --- | ------------------------- | ------------------------ |
| 1   | expr index $var substring | 获取第一个`字符`位置     |
| 2   | expr match $var substring | 获取从头匹配的子串的长度 |

::: warning

<span style="color:red">expr 索引从1开始</span>

:::

### 抽取子串

![image-20230116140647946](https://gitlab.com/loveagri/pic/-/raw/main/2023-01-16/14/image-20230116140647946_20230116140648.png)

|     | Syntax                             | Description                                                                                         |
| --- | ---------------------------------- | --------------------------------------------------------------------------------------------------- |
| 1   | ${var: postion}                    | start from the position                                                                             |
| 2   | ${var: postion: length}            | start from position, the length of match is length                                                  |
| 3   | ${var: -postion}                   | From right side, there is a <span style="color:red">white-space</span> between : and -              |
| 4   | ${var:(postion)}                   | From left side                                                                                      |
| 5   | expr substr "$var" position length | start from position, the length of match is length with <span style="color:red">index from 1</span> |
