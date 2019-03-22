# Ssh-keygen生成过程

**1：生成RSA key 过程**
（1）在指定的用户目录下，右键打开git bash 执行 命名：`ssh-agent bash`
（2）生成RSA密钥，执行命令：`ssh-keygen -t rsa -C 742981086@qq.com`

![这里写图片描述](/Users/intech/Note/images/20161120145047649.png)



![image-20190121150726433](/Users/intech/Note/images/image-20190121150726433.png)



（3）添加密钥到ssh，执行的命令：`ssh-add`