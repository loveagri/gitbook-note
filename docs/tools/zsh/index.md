# zsh

| 相关网址                                                     | 备注                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [github ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)         | [Plugins](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins)， [Themes](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes) |
| [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) |                                                              |



## ubuntu

```sh
# install zsh
apt update && apt install -y wget curl git vim zsh

# check version
zsh --version

# change shell
zsh

```

## Centos

```sh
# update repo source
sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*

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
export ZSH="/Users/press/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="ys"

# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in $ZSH/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to automatically update without prompting.
# DISABLE_UPDATE_PROMPT="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS="true"

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# Caution: this setting can cause issues with multiline prompts (zsh 5.7.1 and newer seem to work)
# See https://github.com/ohmyzsh/ohmyzsh/issues/5765
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git minikube history history-substring-search node npm wd web-search last-working-dir zsh-autosuggestions vi-mode)

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

#maven
export PATH="/Users/press/Applications/apache-maven-3.8.4/bin:$PATH"
export PATH="~/.composer/vendor/bin:$PATH"

export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

# nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# nvm


#editor
alias subl='/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl'
alias code="/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code"
#editor

#docker
function dcd(){
  (cd ~/Projects/laradock && docker-compose down$*)
}
#docker
#docker
function dc(){
  (cd ~/Projects/laradock && docker-compose $*)
}
#docker

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

# proxy
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
export PNPM_HOME="/Users/press/Library/pnpm"
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

