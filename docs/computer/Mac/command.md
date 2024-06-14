# Command

## netstat

```sh
netstat -an | grep 3306
```

## lsof

```sh
lsof -i:80

sudo lsof -i -P | grep -i "listen"
```

