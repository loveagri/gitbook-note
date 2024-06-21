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

### 基础Vagrangtfile[配置](https://www.cnblogs.com/super-lulu/p/11347086.html)

```ruby
Vagrant.configure("2") do |config|
   # hostname设置
  config.vm.hostname = "node1"

  # 必须先禁用默认的同步目录，否则会报错，原因未知！！！,开启此行就可以不用安装vagrant-vbguest
  config.vm.synced_folder '.', '/vagrant', disabled: true

  # 同步目录设置,实时同步采用默认方式即可，rsync不起作用
  config.vm.synced_folder "D:/xxx/code", "/home/www/"

  # 端口转发设置
  config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

  # host-only
  config.vm.network "private_network", ip: "192.168.33.10"

  # 创建一个bridge桥接网络，指定IP
  config.vm.network "public_network", ip: "192.168.0.200"
  
  config.vm.provider "virtualbox" do |vb|
     # 指定vm-name，也就是virtualbox管理控制台中的虚机名称。如果不指定该选项会生成一个随机的名字，不容易区分。
    vb.name = "centos7"

    # vagrant up启动时，是否自动打开virtual box的窗口，缺省为false
    vb.gui = true

    # 指定vm内存，单位为MB
    vb.memory = "4096"

    # 设置CPU个数
    vb.cpus = 2
    
    #修改vb.name的值
    vb.customize ["modifyvm", :id, "--name", "mfsmaster2"]
     
    #如修改显存，缺省为8M，如果启动桌面，至少需要10M，如下修改为16M：
    vb.customize ["modifyvm", :id, "--vram", "16"]
     
    #调整虚拟机的内存
    vb.customize ["modifyvm", :id, "--memory", "1024"]
     
    #指定虚拟CPU个数
    vb.customize ["modifyvm", :id, "--cpus", "2"]
     
    #增加光驱：
    vb.customize ["storageattach",:id,"--storagectl", "IDE Controller","--port","0","--device","0","--type","dvddrive","--medium","/Applications/VirtualBox.app/Contents/MacOS/VBoxGuestAdditions.iso"]
    #注：meduim参数不可以为空，如果只挂载驱动器不挂在iso，指定为“emptydrive”。如果要卸载光驱，medium传入none即可。
    #从这个指令可以看出，customize方法传入一个json数组，按照顺序传入参数即可。 json数组传入多个参数
    vb.customize ["modifyvm", :id, "--name", "mfsserver3", "--memory", "2048"]
    
    # 单个机器执行脚本
    vb.vm.provision :shell do |shell|
      shell.path = "db.sh"
    end
	end

  # 初始脚本
  # 外置文件初始脚本
  config.vm.provision "shell", privileged: true, path: "./setup.sh"
  
  # 行内样式
  config.vm.provision "shell", inline: "sudo apt-get update; sudo ln -sf /usr/bin/python3 /usr/bin/python"
  
  # 块输入
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y nginx
  SHELL

	 
end
```

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
  config.vm.hostname = "vagrant-demo"
  config.vm.box_version = "2004.01"
  config.vm.define "web-server" do |web| # virtualbox name
    web.vm.hostname = "web" # hostname
  end
  config.vm.define "database" do |db|
    db.vm.hostname = "db"
  end
end
```

### 循环Vagrangtfile配置

setup.sh：

```sh
#/bin/sh

# install some tools
sudo yum install -y git vim gcc glibc-static telnet bridge-utils

# install docker
curl -fsSL get.docker.com -o get-docker.sh
sh get-docker.sh

# start docker service
sudo groupadd docker
sudo gpasswd -a vagrant docker
sudo systemctl start docker

rm -rf get-docker.sh

```

Vagrantfile：

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 1.6.0"

boxes = [
    {
        :name => "gitlab",
        :eth1 => "192.168.211.10",
        :mem => "4096",
        :cpu => "2"
    },
    {
        :name => "gitlab-ci",
        :eth1 => "192.168.211.11",
        :mem => "1024",
        :cpu => "1"
    },
    {
        :name => "k8s-master",
        :eth1 => "192.168.211.20",
        :mem => "2048",
        :cpu => "1"
    },
    {
        :name => "k8s-node",
        :eth1 => "192.168.211.21",
        :mem => "2048",
        :cpu => "1"
    },    
]

Vagrant.configure(2) do |config|

  config.vm.box = "centos/7"

  boxes.each do |opts|
      config.vm.define opts[:name] do |config|
        config.vm.hostname = opts[:name]
        config.vm.provider "vmware_fusion" do |v|
          v.vmx["memsize"] = opts[:mem]
          v.vmx["numvcpus"] = opts[:cpu]
        end

        config.vm.provider "virtualbox" do |v|
          v.customize ["modifyvm", :id, "--memory", opts[:mem]]
          v.customize ["modifyvm", :id, "--cpus", opts[:cpu]]
        end

        config.vm.network :private_network, ip: opts[:eth1]
      end
  end

  config.vm.synced_folder "./labs", "/home/vagrant/labs"
  config.vm.provision "shell", privileged: true, path: "./setup.sh"

end

```













































































