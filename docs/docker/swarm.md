# smarm

激活

```sh
docker info # 查看 Swarm: active

docker swarm init
```

相关命令

```sh
# 列出节点状态
docker node ls 

# leave
docker node leave

# 创建服务
docker service create nignx

# 查看service 
docker service ls

# 查看具体service
docker service ps <service_id>

# 删除具体service
docker service rm <service_id>
```

