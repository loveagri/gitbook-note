# vagrant文件同步

## Rsync

编辑`~/.vagrant.d/boxes/centos-VAGRANTSLASH-7/2004.01/virtualbox/Vagrantfile`注释掉如下：

```ruby
 Vagrant.configure("2") do |config|
   config.vm.base_mac = "5254004d77d3"
 #  config.vm.synced_folder ".", "/vagrant", type: "rsync"
 end
```

