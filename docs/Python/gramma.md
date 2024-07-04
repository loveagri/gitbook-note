# 语法

## 字符串

### 字符串格式化

```python
# 1 字符串格式化
info = "my name is %s, my age is %d" % ('loveagri', 10)
print(info) # my name is loveagri, my age is 10

info = "my name is %s, my age is %d"
print(info % ('loveagri', 10))

# 2
print("The sum of 1 + 2 is {0}".format(1 + 2))

# 3
name = 'love'
info = f"my name is {name}"

print(info)
```

### 无效转义字符

```sh
print(r'print \r')

# \r前需空格，前边字符覆盖
print('1 \rprint ')
```

## 列表

