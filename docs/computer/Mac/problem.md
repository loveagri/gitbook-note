# 问题

### 5000端口被[占用](https://discussionschinese.apple.com/thread/253342604?sortBy=best)

1. 输入命令行，检查占用端口的进程

```sh
lsof -i :5000
```

2. COMMAND 下，可以看到端口是被“ControlCe”占用的。
3. 搜索“share”，关闭“AirPlay Receiver”

