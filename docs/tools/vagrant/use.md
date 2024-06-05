# Vagrant 操作

### 任何目录登录vagrant

讲如下内容复制到.ssh文件夹下，并命名为*config*，然后就可以在任何目录通过`ssh vagrant-host`登录主机了

```yaml
Host vagrant-host
  HostName 127.0.0.1
  User vagrant
  Port 2222
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile /Users/press/Vagrant/.vagrant/machines/default/virtualbox/private_key
  IdentitiesOnly yes
  LogLevel FATAL
  PubkeyAcceptedKeyTypes +ssh-rsa
  HostKeyAlgorithms +ssh-rsa
```



## Vagrantfile配置

### 基础Vagrangtfile配置

```ruby

Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
  config.vm.hostname = "vagrant-demo"
  config.vm.box_version = "2004.01"
  config.vm.define "web-server" do |web|
    web.vm.hostname = "web"
  end
  config.vm.define "database" do |db|
    db.vm.hostname = "db"
  end
end

```

### 循环Vagrangtfile配置

