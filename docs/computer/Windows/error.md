# Windows 问题

### 0X80070643 for win 10 22H2

[解决方法](https://blog.csdn.net/huahualaly/article/details/135518242) [官方原因](https://support.microsoft.com/zh-cn/topic/kb5034441-%E9%80%82%E7%94%A8%E4%BA%8E-windows-10-%E7%89%88%E6%9C%AC-21h2-%E5%92%8C-22h2-%E7%9A%84-windows-%E6%81%A2%E5%A4%8D%E7%8E%AF%E5%A2%83%E6%9B%B4%E6%96%B0-2024-%E5%B9%B4-1-%E6%9C%88-9-%E6%97%A5-62c04204-aaa5-4fee-a02a-2fdea17075a8) [官方解决方法](https://support.microsoft.com/zh-cn/topic/kb5034441-%E9%80%82%E7%94%A8%E4%BA%8E-windows-10-%E7%89%88%E6%9C%AC-21h2-%E5%92%8C-22h2-%E7%9A%84-windows-%E6%81%A2%E5%A4%8D%E7%8E%AF%E5%A2%83%E6%9B%B4%E6%96%B0-2024-%E5%B9%B4-1-%E6%9C%88-9-%E6%97%A5-62c04204-aaa5-4fee-a02a-2fdea17075a8)

### 关闭hyper-v

```shell
bcdedit /set hypervisorlaunchtype off
```
