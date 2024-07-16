# 命令

## find

```sh
# -exec 格式为 `-exec 'command' {} \; ` {}代表查找到的文件，\;为固定写法
find ./etc -name '*.conf' -exec rm -rf {} \;

# -ok 格式为 `-ok 'command' {} \; ` {}代表查找到的文件，\;为固定写法, -ok会对操作文件进行确认
find ./etc -name '*.conf' -ok rm -rf {} \;
```

## cut

```sh
cat /etc/passwd | cut -d ":" -f 1

:<<EOF
root
bin
daemon
adm
lp
sync
shutdown
halt
mail
operator
games
ftp
nobody
dbus
systemd-coredump
systemd-resolve
EOF
```

