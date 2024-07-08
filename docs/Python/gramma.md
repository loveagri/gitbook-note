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





## 函数

### 装饰器

```python
# 装饰器
def main(func):
    def inner(*args, **kwargs):
        print(args, kwargs)
        result = func(*args, **kwargs)
        return result

    return inner

@main
def test(data):
    return data

test('ok') # ('ok',) {}
test(data='ok')# () {'data': 'ok'}
```

#### classmethod & staticmethod

```python
class Test:
    def __init__(self, name):
        pass
        self.name = name

    def run(self):
        print("run")
        self.dump()
        self.sleep()

    @classmethod
    def dump(cls):
        print("dump")

    @staticmethod
    def sleep():
        print("sleep")

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, value):
        self.__name = value


self = Test('start')
self.run()
Test.dump()

self.sleep()
Test.sleep()

print(self.name)
self.name = 'after sleep'
print(self.name)
```



## Exception & assert

### Exception

```python
raise Exception('error')
```

### assert

```python
assert 1 > 2, "message"
```



## package

定义包

```python
# __init__.py
├── animal
│   ├── __init__.py
│   └── dog
│       ├── __init__.py
│       └── dog.py
└── test.py

# dog.py
def run():
    print("dog run")

# animal.dog.__init__.py
from .dog import run

# animal.__init__.py
from .dog.dog import run
# or
from .dog import run

# test.py
from animal import run
run() # dog run
```

## 迭代器

```python
# form 1
def iter():
  for i in range(10):
    yield i
    
res = iter()
print(next(res))
print(next(res))
print(next(res))

# form 2
res = (i for i in [1,2,3,4])

print(next(res))
print(next(res))
print(next(res))
   
# form 3
iter_obj = iter(range(10))
print(next(iter_obj))
print(next(iter_obj))
print(next(iter_obj))


# no error in for loop 
for i in res:
    print(i)

```

## 多线程

多个cup的核之间同时进行叫并行

单个cup的核多个线程同时工作叫做并发
