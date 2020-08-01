# oh-my-zsh 终端主机名设置（$PROMPT）

 发表于 2019-02-01  更新于 2020-04-25  分类于 [linux](https://www.xxb.me/categories/linux/)  阅读次数： 440  Valine： [1](https://www.xxb.me/linux/yuque-prompt/#valine-comments)

自从用上 zsh 后上瘾一发不可收拾，我给几乎所有机器包括路由器都用上 oh-my-zsh，那么问题来了，zsh 默认主题是 robbyrussell，所有机器登录后都是这个样子：

![image.png](https://cdn.nlark.com/yuque/0/2019/png/240959/1548999257622-141dcead-ebc1-4f5d-a3b8-7a11edad8f59.png#align=left&display=inline&height=235&margin=%5Bobject%20Object%5D&name=image.png&originHeight=235&originWidth=589&size=10758&status=done&style=none&width=589)

如果经常远程登录 ssh 就很蛋疼，分不清谁是谁，命令在错误的机器上运行也不知道。

感谢 [oh-my-zsh终端用户名设置（PS1）](https://www.jianshu.com/p/bf488bf22cba)一文的启发，修改 $PROMPT 变量即可，robbyrussell 主题默认的 $PROMPT 值为

```
➜ ~ echo $PROMPT
${ret_status} %{$fg[cyan]%}%c%{$reset_color%} $(git_prompt_info)
```


为了方便区分不同机器，需要加入机器名 hostname，一条命令足矣：

```
PROMPT=%m\ $PROMPT
```


%m 对应的就是 hostname，将这句命令加入 ~/.zshrc 使它每次登录自动生效

```
echo "PROMPT=%m\ \$PROMPT" >> .zshrc
```


附 PROMPT 各属性意义

| code    | info                                   |
| :------ | :------------------------------------- |
| %T      | 系统时间（时：分）                     |
| %*      | 系统时间（时：分：秒）                 |
| %D      | 系统日期（年-月-日）                   |
| %n      | 你的用户名                             |
| %B - %b | 开始到结束使用粗体打印                 |
| %U - %u | 开始到结束使用下划线打印               |
| %d      | 你目前的工作目录                       |
| %~      | 你目前的工作目录相对于～的相对路径     |
| %M      | 计算机的主机名                         |
| %m      | 计算机的主机名（在第一个句号之前截断） |
| %l      | 你当前的tty                            |