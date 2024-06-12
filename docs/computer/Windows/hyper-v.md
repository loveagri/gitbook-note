# Hyper-v

::: tip 链接

[微软链接](https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-hyper-v-with-cmd-and-dism)

::: 

## Enable Hyper-V using PowerShell

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

Disable Hyper-V using PowerShell

```sh
Disable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V
```

## Enable Hyper-V with CMD and DISM

```powershell
DISM /Online /Enable-Feature /All /FeatureName:Microsoft-Hyper-V
```

## GUI打开

`Cmd + R`, 然后 `appwiz.cpl`, 启动或关闭Windows 功能。



