# Mac下给docker配置命令补全

| 链接                                                         | 备注 |
| ------------------------------------------------------------ | ---- |
| [Mac下给docker配置命令补全](https://www.jianshu.com/p/e5de4d8e1168) |      |

#### 下载docker补全的命令支持文件

```jsx
mkdir -p ~/.zsh/completion
curl -L https://raw.githubusercontent.com/docker/compose/1.27.4/contrib/completion/zsh/_docker-compose > ~/.zsh/completion/_docker-compose
```

#### 2 增加配置到 ~/.zshrc

增加的内容:

```bash
fpath=(~/.zsh/completion $fpath)
autoload -Uz compinit && compinit -i
```

可以使用命令直接操作

```bash
echo 'path=(~/.zsh/completion $fpath) 
autoload -Uz compinit && compinit -i'  >>  ~/.zshrc 
```

#### 3 添加插件到zsh中

```sh
# vi  ~/.zshrc
plugins=(
 git
  ***
 docker
 docker-compose
)
```

#### 4 刷新配置文件使其生效

```bash
source ~/.zshrc 
```



