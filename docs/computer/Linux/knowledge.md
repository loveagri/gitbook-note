# 小知识点

`IFS`是Linux系统的分隔符的环境变量

变量通过``获取值，获取值的命令内有空格，需要用双引号引起来

```sh
time=`ps -p pid -o lstart`

t="$time"
```
