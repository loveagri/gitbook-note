# 别名 alias 

1. 打开 PowerShell 输入如下，得到 PowerShell 配置文件的路径。

```powershell
PS C:\Users\fuhon> echo $profile
C:\Users\fuhon\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
```

然后打开这个文件，没有目录和文件的话则创建，然后如果你只是想取代某些很长的路径的话使用 `set-alias` 去设置别名，比如我需要用到不同版本的 JDK，就可以设置一个 `java8` 的 alias：

```powershell
set-alias java8 C:\Users\fuhon\.jdks\corretto-1.8.0_382\bin\java.exe
```

如果包含命令，里面有空格的话，需要定义函数，这里我定义一个 `np` 函数：

```sh
function np { cd E:\Note\note }

//单条命令
function gitci(){
     git rev-parse HEAD    
}

//多条命令
//依次编写多条命令
function fe(){
   cd C:\Users\xingag\Desktop\fe
   dir
   explorer .
}

function open(){
    explorer .
}

# 参数：字符串，打开的文件夹目录
# 使用：feo C:\Users\xingag\Desktop
function feo([string]$path){
    cd C:\Users\xingag\Desktop\fe
    explorer "$path"
    dir    
}

```

设置完成之后保存重启 powerShell，这里大概率会报个错` cannot be loaded because running scripts is disabled on this system.`，因为 Windows 为了安全考虑，不允许自动运行脚本，如果可以接受这个，以管理员身份打开 PowerShell 运行如下：

```powershell
Set-ExecutionPolicy RemoteSigned
```

再次重启 PowerShell，尝试运行设置的两个别名（其实 function 严格来说不算别名了）