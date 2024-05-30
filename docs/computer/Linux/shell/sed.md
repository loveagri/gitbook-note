# sed(Stream editor)

## 工作模式

第一种：`stdout|sed [option] "pattern command"`

第二种：`sed [option] "pattern command" file`

## 选项

| 选项 | 描述                                                                         |
| ---- | ---------------------------------------------------------------------------- |
| -n   | 只打印模式匹配行，<span style="color:red">不加`-n`参数则所有行都打印</span>  |
| -e   | 直接在命令行进行sed编辑，用于多个匹配，or关系，如：-e /patter1/ -e /patter2/ |
| -f   | 编辑命令保存于文件，指定文件执行                                             |
| -r   | 支持正则                                                                     |
| -i   | 直接修改文件内容                                                             |

## 匹配模式

| 序号 | 模式                  | 示例                                 | 描述                      |
| ---- | --------------------- | ------------------------------------ | ------------------------- |
| 1    | LineNumber            | sed -n "17p" file                    | 指定行号                  |
| 2    | startLine, endLine    | sed -n "10, 20p" file                | 起始到结束行              |
| 3    | StartLine ,+n         | sed -n "10, +5p" file                | 指定起始行号，然后后面n行 |
| 4    | /pattern1/            | sed -n "/^root/p" file               | 正则匹配行                |
| 5    | /pattern1/,/pattern1/ | sed -n "/pattern1/,/pattern2/p" file | 从匹配的行到匹配的行      |
| 6    | LineNumber,/pattern1/ | sed -n "10,/^hdfs/p" file            | 从指定行号匹配到匹配行    |
| 7    | /pattern1/,LineNumber | sed -n "/^hdfs/,10p" file            | 从匹配行匹配到指定行号    |

## 编辑命令

| 动作 | 命令 | 示例                             | 描述                                              |
| ---- | ---- | -------------------------------- | ------------------------------------------------- |
| 打印 | p    | sed -n "/pattern/p" file         | 打印匹配内容                                      |
| 删除 | d    | sed -i "/pattern/d" file         | Delete match content                              |
| 增加 | a    | sed -i "/pattern/a content" file | add after the match line                          |
| 增加 | i    | sed -i "/pattern/i content" file | add before the match line                         |
| 增加 | r    | sed -i "/pattern/r file1" file   | Add the the content of file1 after the match line |
| 增加 | w    | sed -i "/pattern/w file1" file   | write the match line to the file1                 |

## 修改命令

`s/pattern/string/ing` n表示替换第二个匹配字符串，ng表示从第二个开始替换所有匹配， 表示忽略大小写

## 显示行号

`sed -n "/pattern/=" file`

## 删除命令

`sed -i "/[:blank:]*#/d" file` 删除以`#`开头但是`#`前边有空格的注释行
