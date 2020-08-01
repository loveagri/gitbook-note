# shell echo写入多行文字到文本中

## 单行文本



```bash
#! /bin/bash
echo Hello > filename.txt
```

## 多行文本



```bash
#! /bin/bash
echo "测试写文件"
cat>test1<<EOF
这是一个由shell创建的文件
this is a file created by shell.
we want to make a good world.
EOF
```

其中，`<<EOF` 表示当遇到`EOF时`结束输入。

`cat>test1<<EOF` 这间没有空格



