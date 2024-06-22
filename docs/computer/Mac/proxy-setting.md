# 代理开始关闭命令设置



```sh
# 命令行代理开启关闭
alias p10="export all_proxy='socks5://127.0.0.1:10808';echo on"
alias p789="export all_proxy='socks5://127.0.0.1:7890';echo on"
alias unproxy="unset http_proxy;unset https_proxy;unset all_proxy;echo off"

# 网卡端口开启关闭
alias wifion="networksetup -setsocksfirewallproxy Wi-fi 127.0.0.1 7890"
alias wifioff="networksetup -setsocksfirewallproxystate Wi-fi off"
alias ethon="networksetup -setsocksfirewallproxy Ethernet 127.0.0.1 7890"
alias ethoff="networksetup -setsocksfirewallproxystate Ethernet off"
alias openall="networksetup -setsocksfirewallproxy Wi-fi 127.0.0.1 7890;networksetup -setsocksfirewallproxy Ethernet 127.0.0.1 7890"
alias closeall="networksetup -setsocksfirewallproxystate Wi-fi off;networksetup -setsocksfirewallproxystate Ethernet off"
```

