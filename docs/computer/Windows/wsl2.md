# WSL2 安装

| [Manual installation steps for older versions of WSL](https://learn.microsoft.com/en-us/windows/wsl/install-manual) |
| ------------------------------------------------------------ |



## Enable the Windows Subsystem for Linux

```powershell
# Open PowerShell as Administrator (Start menu > PowerShell > right-click > Run as Administrator) and enter this command:

dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

## Check requirements for running WSL 2

Windows11 or Windows10 > 1903

## Enable Virtual Machine feature

```powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

## Download the Linux kernel update package

download [https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi) and install

## Set WSL 2 as your default version

```powershell
wsl --set-default-version 2
```

## Install your Linux distribution of choice

Open the [Microsoft Store](https://aka.ms/wslstore) and select your favorite Linux distribution.

## Install Windows Terminal

[install Windows Terminal](https://www.microsoft.com/store/productId/9N0DX20HK701?ocid=pdpshare)

## open wsl command line

```cmd
PS E:\Note\note> wsl
```


