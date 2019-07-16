# 数据结构与算法

## 程序 = 数据结构 + 算法

### 一，数据结构

> 数据结构是在计算机中组织和存储数据的一种特殊方式，使得数据可以高效地被访问和修改。更确切地说，数据结构是数据值的集合，表示数据之间的关系，也包括了作用在数据上的函数或操作。

#### 数据结构的应用

1. 操作系统

    > 系统栈，优先队列：堆

2. 文件压缩

3. 通讯录

    > 链表-->trie树

4. 算法的基石

    > 游戏寻路

#### 数据结构有毛用

有用也没用，平时用不到，进入大公司，理解底层就需要，突破技术瓶颈

#### 数据结构分类

数据结构是指相互之间存在着一种或多种关系的数据元素的集合和该集合中数据元素之间的关系组成 。 
常用的数据结构有：数组，栈，链表，队列，树，图，堆，散列表,hash表等，如图所示：

![20180903194901687](https://raw.githubusercontent.com/loveagri/note/master/ud-img/20180903194901687-1562298334830.png)



线性结构：数组，栈，队列，链表，哈希表；

树结构：二叉树，二分搜索树，AVL，红黑树，堆，Trie（通讯录前缀树），

图结构：邻接矩阵，邻接表等

# 1、数组

数组是可以再内存中连续存储多个元素的结构，在内存中的分配也是连续的，数组中的元素通过数组下标进行访问，数组下标从0开始。例如下面这段代码就是将数组的第一个元素赋值为 1。

```java
int[] data = new int[100]；data[0]  = 1;
```

优点： 
1、按照索引查询元素速度快 
2、按照索引遍历数组方便

缺点： 
1、数组的大小固定后就无法扩容了 
2、数组只能存储一种类型的数据 
3、添加，删除的操作慢，因为要移动其他的元素。

适用场景： 
频繁查询，对存储空间要求不大，很少增加和删除的情况。

扩展：

1. 数组的添加，查询，修改，包含，搜索，删除，泛型，动态数组（数组的扩容和缩容），复杂度分析，均摊复杂度，防止复杂度震荡等。

# 2、栈(LIFO)

栈是一种特殊的线性表，仅能在线性表的一端操作，栈顶允许操作，栈底不允许操作。 栈的特点是：先进后出，或者说是后进先出，从栈顶放入元素的操作叫入栈，取出元素叫出栈。 

![stack](https://raw.githubusercontent.com/loveagri/note/master/ud-img/stack.jpg)



栈的结构就像一个集装箱，越先放进去的东西越晚才能拿出来，所以，栈常应用于实现递归功能方面的场景。

扩展：

1. 编辑器撤销操作

2. 程序调用的系统栈（函数内嵌入子函数）

3. 复杂度低，操作快

4. 编译器的括号匹配(leekcode 20)

    ```javascript
    /**
     * @param {string} s
     * @return {boolean}
     *  push(value):添加一个新元素到栈顶
        pop():移除栈顶的元素，同时返回该元素
        peek():获取栈顶的元素
        isEmpty():判断栈是否为空。是返回true,否返回fallse
        size():获取栈里元素的个数
        */
        var isValid = function(s) {
    
            /*使用栈stack类的实现*/
            function Stack() {
                this.dataStore = [];//保存栈内元素，初始化为一个空数组
                this.size = 0;//栈顶位置，初始化为0
                this.push = push;//入栈
                this.pop = pop;//出栈
                this.peek = peek;//查看栈顶元素
                this.isEmpty = isEmpty;//判断栈是否为空
    
                function push(element){
                    this.dataStore[this.size++] = element;
                }
    
                function pop(){
                    return this.dataStore[--this.size];
                }
    
                function peek(){
                    return this.dataStore[this.size-1];
                }
    
                function isEmpty(){
                    return this.size == 0;
                }
            }
    
    
    
            let stack = new Stack();
    
            for(let z = 0; z < s.length; z++){
                let c = s.charAt(z);
                if (['(','[','{'].indexOf(c) >= 0) {
                    stack.push(c);
                }else{
                    if (stack.isEmpty()) {
                        return false;
                    }
    
                    let topChar = stack.pop();
                    if (c == ')' && topChar != '(') {
                        return false;
                    }
    
                    if (c == ']' && topChar != '[') {
                        return false;
                    }
    
                    if (c == '}' && topChar != '{') {
                        return false;
                    }
                }
            }
    
    
            return stack.isEmpty();
    };
    
    
    
    ```

5. 不去追求完美主义

# 3、队列（FIFO）

队列与栈一样，也是一种线性表，不同的是，队列可以在一端添加元素，在另一端取出元素，也就是：先进先出。从一端放入元素的操作称为入队，取出元素为出队，示例图如下： 

![queen](https://raw.githubusercontent.com/loveagri/note/master/ud-img/queen.png)

使用场景：因为队列先进先出的特点，在多线程阻塞队列管理中非常适用。

扩展：

1. first come first serve
2. 复杂度分析（dequeue O(n）出队要移位
3. 循环队列：front==tail队列为空，（tail+1）% C == front 队列满，循环队列会浪费一个单元的空间。类似钟表

# 4、链表（真正的动态数据结构）

链表是物理存储单元上非连续的、非顺序的存储结构，数据元素的逻辑顺序是通过链表的指针地址实现，每个元素包含两个结点，一个是存储元素的数据域 (内存空间)，另一个是指向下一个结点地址的指针域。根据指针的指向，链表能形成不同的结构，例如单链表，双向链表，循环链表等。 

![link-table](https://raw.githubusercontent.com/loveagri/note/master/ud-img/link-table-1562312724470.png)

链表的优点： 
链表是很常用的一种数据结构，不需要初始化容量，可以任意加减元素； 
添加或者删除元素时只需要改变前后两个元素结点的指针域指向地址即可，所以添加，删除很快；

缺点： 
因为含有大量的指针域，占用空间较大； 
查找元素需要遍历链表来查找，非常耗时。

适用场景： 
数据量较小，需要频繁增加，删除操作的场景

扩展：

1. 数组（有语义的索引 ）与链表比较

2. 设置dummyHead，以实现添加中间元素

3. 遍历元素的while写法和for写法

4. 时间复杂度分析（增，删，改，查全为O(n)）

5. 操作链表头是O(1)复杂度，所以适合栈操作

6. 不浪费空间

7. 用数组和链表实现栈的性能对比（数组扩容耗时，链表new新节点耗时.）

8. 循环列表实现队列（head出栈，tail入栈）

9. 删除重复元素leekcode(203)

    ```javascript
    //solution 1
    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} head
     * @param {number} val
     * @return {ListNode}
     */
    var removeElements = function(head, val) {
        while(head != null && head.val == val){
            let delNode = head;
            head = head.next;
            delNode.next = null;
        }
    
        if (head === null) {
            return head;
        }
    
        let prev = head;
        while(prev.next != null){
            if(prev.next.val == val){
                let delNode = prev.next;
                prev.next = delNode.next;
                delNode.next = null;
            }else{
                prev = prev.next;
            }
        }
    
        return head;
    };
    ```

    ```javascript
    solution 2
    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} head
     * @param {number} val
     * @return {ListNode}
     */
    var removeElements = function(head, val) {
        while(head != null && head.val == val){
            head = head.next
        }
    
        if (head === null) {
            return head;
        }
    
        let prev = head;
        while(prev.next != null){
            if(prev.next.val == val){
                prev.next = prev.next.next
            }else{
                prev = prev.next;
            }
        }
    
        return head;
    };
    ```

    ```javascript
    solution 3
    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} head
     * @param {number} val
     * @return {ListNode}
     */
    var removeElements = function(head, val) {
    
        let dummyNode = new ListNode(null);
        dummyNode.next = head;
    
        let prev = dummyNode;
        while(prev.next != null){
            if(prev.next.val == val){
                prev.next = prev.next.next
            }else{
                prev = prev.next;
            }
        }
    
        return dummyNode.next;
    };
    ```

##### 递归扩展：本质是将原来的问题，转化为更小的同一问题

 例如：数组求和

```javascript
Sum(arr[0,...,N-1]) = arr[0] + Sum(arr[1,...,N-1]);
Sum(arr[1,...,N-1]) = arr[1] + Sum(arr[2,...,N-1]);
......
Sum(arr[N-1,N-1]) = arr[N-1] + Sum([]);


function sum(arr){
    function sumRecusion(arr,l){
        
        //基本问题
        if(l == arr.length){
            return 0;
        }
        
        //把问题转化为更小的问题
        return arr[l] + sum(arr,l + 1)
    }
    
    return sumRecusion(arr, 0);
}
```

```javascript
//leekcode203大招写法
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {

    if (head === null ) return head;
    head.next = removeElements(head.next,val);
    return head.val == val ? head.next : head;
};
```

```javascript
//链表类
function LinkedList() {
    this.head = null;
    this.length = 0;
    //向链表尾部追加元素
    this.push = push;
    //从链表中查找某个元素
    this.find = find;
    //在链表中任意一个元素之后插入一个元素
    this.insertAfter = insertAfter;
    //从链表中查找任意元素节点的前一个节点
    this.findPrevious = findPrevious;
    //从链表中删除值为value的元素
    this.remove = remove;
    //返回当前链表的长度
    this.size = size;
    //查找某个元素在链表中的索引值
    this.indexof = indexof;
    //删除链表中第pos个元素
    this.removeAt = removeAt;
    //获取链表中第一个元素
    this.getHead = getHead;

    //创建一个Node辅助类，用来生成节点
    function Node(val) {
        this.val = val;
        this.next = null;
    }

    //向链表尾部追加元素
    function push(val) {
        var node = new Node(val);
        if (this.head == null) {
            this.head = node;
        } else {
            var current = this.head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    }

    //在链表中任意一个元素之后插入一个元素
    function insertAfter(val, item) {
        var node = new Node(val);
        var current = this.find(item);
        if (current == null) {
            return console.log('找不到元素');
        }
        node.next = current.next;
        current.next = node;
        length++;
    }

    //从链表中删除值为value的元素
    function remove(val) {
        var previous = this.findPrevious(val);
        var current = this.find(val);
        if (previous == null) {
            return console.log('链表中找不到被删除的元素');
        }
        previous.next = current.next;
        length--;
    }
    //删除链表中第pos个元素
    function removeAt(pos) {
        if (pos > -1 && pos < length) {
            var current = this.head;
            var index = 0;
            if (pos === 0) {
                this.head = current.next;
            } else {
                while (index < pos) {
                    var previous = current;
                    current = current.next;
                    index++;
                }
                previous.next = current.next;
            }
            length--;
        } else {
            return null;
        }
    }
    //从链表中查找某个元素
    function find(val) {
        var currentNode = this.head;
        if (currentNode == null) {
            console.log("这是一个空链表！！！");
            return null;
        }
        if (currentNode.val === val) {
            return currentNode;
        }
        while (currentNode.next) {
            currentNode = currentNode.next;
            if (currentNode.val === val) {
                return currentNode
            }
        }
        console.log("没有找到该元素！！！");
        return null;
    }
    //从链表中查找任意元素节点的前一个节点
    function findPrevious(val) {
        var current = this.head;
        if (current == null) {
            console.log('这是一个空链表');
            return null;
        }
        while (current.next) {
            current = current.next;
            if (current.next.val === val) {
                return current;
            }
        }
        console.log('找不到该元素的前一个元素');
        return null;
    }
    //查找某个元素在链表中的索引值
    function indexof(val) {
        var current = this.head;
        var index = 0;
        if (current == null) {
            return null;
        } else {
            while (current) {
                if (current.val === val) {
                    return index;
                }
                index++;
                current = current.next;
            }
        }
        return -1;
    }
    //返回当前链表的长度
    function size() {
        return length;
    }
    //获取链表中第一个元素
    function getHead() {
        return this.head;
    }
}


//打印当前的链表，供测试用
function print(head) {
    let str = '';
    while (head != null) {
        str += (head.val + '->');
        head = head.next;
    }
    return str + 'null';
}


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    if (head === null ) return head;
    head.next = removeElements(head.next,val);
    return head.val == val ? head.next : head;
};


function depthStr(depth){
    let str = '';
    for (var i = 0; i <= depth; i++) {
        str += '--';
    }
    return str;
}



let nums = [1,2,6,3,4,5,6];

let Lists = new LinkedList();
for (var i = 0; i < nums.length; i++) {
    Lists.push(nums[i]);
}

print(Lists.getHead());

let head = removeElements(Lists.getHead(),6);
console.log(print(head));
```

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
 var removeElements = function(head, val, depth) {
    console.log(depthStr(depth) + 'call:remove ' + val + ' in ' + print(head));

    if (head === null ) {
        console.log(depthStr(depth) + 'return: ' + print(head));
        return head;
    }

    let res = removeElements(head.next,val,depth+1);
    // console.log('After remove ' + val + ':' + print(res));

    let ret;
    if (head.val == val) {
        ret = res;
    }else{
        head.next = res;
        ret = head;
    }

    console.log(depthStr(depth) + 'return: ' + print(head));

    return ret;
};


function depthStr(depth){
    let str = '';
    for (var i = 0; i < depth; i++) {
        str += '--';
    }
    return str;
}



let nums = [1,2,6,3,4,5,6];

let Lists = new LinkedList();
for (var i = 0; i < nums.length; i++) {
    Lists.push(nums[i]);
}

print(Lists.getHead());

let head = removeElements(Lists.getHead(),6,0);
console.log(print(head));
```



# 5、树

**树**是一种数据结构，它是由n（n>=1）个有限节点组成一个具有层次关系的集合。把它叫做 “树” 是因为它看起来像一棵倒挂的树，也就是说它是根朝上，而叶朝下的。它具有以下的特点：

- 每个节点有零个或多个子节点；
- 没有父节点的节点称为根节点；
- 每一个非根节点有且只有一个父节点；
- 除了根节点外，每个子节点可以分为多个不相交的子树；

二叉树：

![binary](https://raw.githubusercontent.com/loveagri/note/master/ud-img/binary.png)



二叉树是树的特殊一种，具有如下特点：

1、每个结点最多有两颗子树，结点的度最大为2。 
2、左子树和右子树是有顺序的，次序不能颠倒。 
3、即使某结点只有一个子树，也要区分左右子树。

二叉树是一种比较有用的折中方案，它添加，删除元素都很快，并且在查找方面也有很多的算法优化，所以，二叉树既有链表的好处，也有数组的好处，是两者的优化方案，在处理大批量的动态数据方面非常有用。

扩展： 

1. 二分搜索树：二分搜索树的**每个节点**的值大于其左子树的所有节点的值，小于其右子树的所有节点的值。每一棵子树也是二分搜索树

    1. [二分搜索树](https://www.imooc.com/article/267488)
    2. [二分搜索树](https://www.imooc.com/article/44260?block_id=tuijian_wz)

2. 中序遍历：left->now->right，排序.

   前序遍历：now->left->right,拷贝，用于已经存在的排序二叉树的复制。

   后序遍历：left->right->now，用于文件系统遍历及内存释放

3. 二叉树有很多扩展的数据结构，包括平衡二叉树、红黑树、[Trie树](https://www.imooc.com/article/49214)等。

4. 非递归遍历
   1. 深度优先遍历：通过栈实现遍历
   2. 深度优先遍历：通过队列层序遍历

5. 查找和删除二分搜索树的最小值和最大值

6. 删除二分搜索树的任意节点，就是删除当前节点，并把当前节点的后继（即比该节点大的最小节点）或前驱（即比该节点小的最大节点）作为当前节点，仍然把持当前二分搜索树的性质

# 6、堆

堆是一种比较特殊的数据结构，可以被看做一棵树的数组对象，具有以下的性质：

- 堆中某个节点的值总是不大于或不小于其父节点的值；

- 堆总是一棵完全二叉树。


将根节点最大的堆叫做最大堆或大根堆，根节点最小的堆叫做最小堆或小根堆。常见的堆有二叉堆、斐波那契堆等。

堆的定义如下：n个元素的序列{k1,k2,ki,…,kn}当且仅当满足下关系时，称之为堆。 
(ki <= k2i,ki <= k2i+1)或者(ki >= k2i,ki >= k2i+1), (i = 1,2,3,4…n/2)，满足前者的表达式的成为小顶堆，满足后者表达式的为大顶堆，这两者的结构图可以用完全二叉树排列出来，示例图如下： 

![heap](https://raw.githubusercontent.com/loveagri/note/master/ud-img/heap.png)



因为堆有序的特点，一般用来做数组中的排序，称为堆排序。



## 7、hash



https://planetmath.org/goodhashtableprimes































































































































































































































































































































