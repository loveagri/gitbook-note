## 在item2中无法写入crontab

错误如图：

![image-20190118112127958](https://raw.githubusercontent.com/loveagri/note/master/images/image-20190118112127958.png)

[解决方法](https://gitlab.com/gnachman/iterm2/issues/7088)

```
If you allow iTerm Full Disk Access in System Preferences (System Preferences -> Security & Privacy -> Privacy -> Full Disk Access), you'll be able to edit your crontab.
```

> 其实就是修改电脑里安全设置里的完全磁盘访问权限

