# 函数

## 定义函数

```sh
name()
{
	command1
	command2
	...
	commandn
}

function name
{
	command1
	command2
	...
	commandn
}
```

:::tip

`$$`获取当前执行脚本的pid, 可用于过滤当前脚本进程，grep -v $$

:::

## 函数返回值

函数return返回值范围只能是0-255，echo可以返回任何字符串。

## 局部变量

如果一个变量不特别声明，那么它是全局变量，如果想定义为局部变量需要使用`local`。

## 函数库

通过`.`引用外部文件。需要通过绝对路径引入，一般库文件后缀是.lib, 库文件通常没有可执行权限，第一行用如下：

```bash{1}
#!/bin/echo

function name
{

}
```
