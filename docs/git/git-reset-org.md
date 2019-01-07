<center><h1>git 放弃本地修改</h1></center>

[https://www.cnblogs.com/qufanblog/p/7606105.html](https://www.cnblogs.com/qufanblog/p/7606105.html)



## 一，未使用 git add 缓存代码时。

可以使用 git checkout -- filepathname (比如： git checkout -- readme.md  ，不要忘记中间的 “--” ，不写就成了检出分支了！！)。放弃所有的文件修改可以使用 git checkout .  命令。

此命令用来放弃掉所有还没有加入到缓存区（就是 git add 命令）的修改：内容修改与整个文件删除。但是此命令不会删除掉刚新建的文件。因为刚新建的文件还没已有加入到 git 的管理系统中。所以对于git是未知的。自己手动删除就好了。



## 二，已经使用了  git add 缓存了代码。

可以使用  git reset HEAD filepathname （比如： git reset HEAD readme.md）来放弃指定文件的缓存，放弃所以的缓存可以使用 git reset HEAD . 命令。

此命令用来清除 git  对于文件修改的缓存。相当于撤销 git add 命令所在的工作。在使用本命令后，本地的修改并不会消失，而是回到了如（一）所示的状态。继续用（一）中的操作，就可以放弃本地的修改。



## 三，已经用 git commit  提交了代码。

可以使用 git reset --hard HEAD^ 来回退到上一次commit的状态。此命令可以用来回退到任意版本：git reset --hard  commitid 

`commit cf0d692e982d8e372a07aaa6901c395eec73e356 (HEAD -> master)
Author: toyflivver <2440659688@qq.com>
Date:   Thu Sep 28 14:07:14 2017 +0800
​    多余的空行
commit 14aa4d7ad4ac6fba59b4b8261d32e478e8cc99ff
Author: toyflivver <2440659688@qq.com>
Date:   Thu Sep 28 14:06:44 2017 +0800
​    正常的代码
commit da3a95c84b6a92934ee30b6728e258bcda75f276
Author: toyflivver <2440659688@qq.com>
Date:   Thu Sep 28 13:58:12 2017 +0800
​    qbf
commit 267466352079296520320991a75321485224d6c6
Author: toyflivver <2440659688@qq.com>
Date:   Thu Sep 28 13:40:09 2017 +0800
​    qbf`

可以看出现在的状态在 commitid 为 cf0d692e982d8e372a07aaa6901c395eec73e356 的提交上（有 HEAD -> master 标记）。