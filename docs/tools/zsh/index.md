# zsh

| 相关网址                                                     | 备注                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [github ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)         | [Plugins](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins)， [Themes](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes) |
| [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) |                                                              |



## ubuntu

```sh
# install zsh
sudo apt update && apt install -y wget curl git vim zsh

# check version
zsh --version

# change shell
zsh

```

## Centos

```sh
# update repo source
sudo sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
sudo sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*

# install zsh
sudo yum update -y && sudo yum -y install wget vim git zsh

# change shell
zsh
```

## Mac

```sh
# install zsh
brew install zsh zsh-completions

# change shell
zsh
```

## ohmyzsh

```sh
# install ohmyzsh
sh -c "$(curl -fsSL https://mirror.ghproxy.com/https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

echo "start download zsh-autosuggestions"
git clone https://mirror.ghproxy.com/https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# return home dir
cd

# fix theme
sed -i 's/robbyrussell/ys/g' $HOME/.zshrc

# add plugins
sed -i 's/plugins=(git)/plugins=(git history history-substring-search node npm wd web-search last-working-dir zsh-autosuggestions vi-mode)/g' $HOME/.zshrc

# flush zshrc
source $HOME/.zshrc

```

## .zshrc

```sh
# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="ys"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to automatically update without prompting.
DISABLE_UPDATE_PROMPT="true"

# Uncomment the following line to enable command auto-correction.
ENABLE_CORRECTION="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
HIST_STAMPS="yyyy-mm-dd"

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git minikube history history-substring-search node npm wd web-search last-working-dir zsh-autosuggestions vi-mode)

source $ZSH/oh-my-zsh.sh

# You may need to manually set your language environment
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# User configuration--------------------------------------------------------------

#maven
export PATH="$HOME/Applications/apache-maven-3.8.4/bin:$PATH"
export PATH="$HOME/.composer/vendor/bin:$PATH"

# nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# nvm


#editor
alias subl='/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl'
alias code="/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code"
#editor

#docker-compose
function dcd(){
  (cd ~/Projects/laradock && docker-compose down$*)
}

function dc(){
  (cd ~/Projects/laradock && docker-compose $*)
}
#docker-compose

#composer
alias cs=composer
alias pa="php artisan"
alias pm="php artisan migrate:refresh --seed"
#composer

#phpunit
alias pu="./vendor/bin/phpunit"
alias pt="php artisan test"
alias puf="php artisan test --filter"
#phpunit

#java
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_321.jdk/Contents/Home
PATH=$JAVA_HOME/bin:$PATH:.
CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:.
export JAVA_HOME
export PATH
export CLASSPATH
#java

#homestead
function homestead() {
  ( cd ~/homestead && vagrant $* )
}
#homestead

#mysql
export PATH=$PATH:/usr/local/mysql/bin
export PATH="/usr/local/opt/mysql@5.7/bin:$PATH"
#mysql

# proxy mac
alias p10="export all_proxy='socks5://127.0.0.1:10808';echo on"
alias p789="export all_proxy='socks5://127.0.0.1:7891';echo on"
alias unproxy="unset http_proxy;unset https_proxy;unset all_proxy;echo off"
alias wifion="networksetup -setsocksfirewallproxy Wi-fi 127.0.0.1 7891"
alias wifioff="networksetup -setsocksfirewallproxystate Wi-fi off"
alias ethon="networksetup -setsocksfirewallproxy Ethernet 127.0.0.1 7891"
alias ethoff="networksetup -setsocksfirewallproxystate Ethernet off"
alias openall="networksetup -setsocksfirewallproxy Wi-fi 127.0.0.1 7891;networksetup -setsocksfirewallproxy Ethernet 127.0.0.1 7891"
alias closeall="networksetup -setsocksfirewallproxystate Wi-fi off;networksetup -setsocksfirewallproxystate Ethernet off"
# proxy

# pnpm
export PNPM_HOME="$HOME/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"
alias p="pnpm"
alias pd="pnpm dev"
alias pdd="pnpm docs:dev"
alias pdb="pnpm docs:build"
# pnpm end

# vim
alias v="vim "
alias vi="vim "
#vim

#yarn
alias y="yarn"
alias ya="yarn add"
alias yr="yarn remove"
alias yd="yarn dev"
alias yb="yarn build"
#yarn


# git
alias gs="git status"
alias gc="git commit -m "
alias gl="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
alias gb="git branch"
alias ga="git add -A"
alias go="git checkout"
alias gp="git push"
alias gac="git commit -am "
alias gcl="git checkout . && git clean -df"
# git

#publish note start
function np(){
   (cd ~/Note/note && sh deploy.sh $* )
}
#publish note end


export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles
export PATH="/usr/local/opt/mysql-client/bin:$PATH"


#note
function note() {
   ( cd ~/Note/note && sh deploy.sh $* )
}
#note

PATH=~/.console-ninja/.bin:$PATH

```

