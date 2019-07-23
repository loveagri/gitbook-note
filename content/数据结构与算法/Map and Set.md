# 集合与映射

#### 集合

承载元素的容器，元素的去重操作。不能盛放重复元素的二分搜索树是非常好的实现“集合”的底层数据结构。

典型应用: 客户统计，词汇量统计。

接口实现：添加元素，删除元素，是否包含，大小，是否为空。

基于链表的实现中，并不要求传入的类型具有可比性,这是线性数据结构的特点。

### 集合类的复杂度分析

前面我们已经实现了两种底层数据结构不同的Set实现。一个是基于二分搜索树的一个是基于链表的。

#### 集合的时间复杂度分析

集合不涉及改。

链表：

- 本来链表添加只需要O(1)时间复杂度，但是我们为了保证不重复，先调用了一遍contains,因此变成了O(n)
- contains操作，我们必须要从头到尾扫一遍链表，复杂度O(n)
- remove操作，要先找到待删除元素前一个元素，时间复杂度O(n)

二分搜索树：

![img](https://img3.mukewang.com/5c127a1a00013bee09130511.jpg)

添加一个元素，走左子树，就不会去右子树，节省了很大一部分的寻找开销,最多能经历的节点数是树的高度。添加元素，删除元素，查找元素都是这样的，对于它来说，时间复杂度为O(h)，h为二分搜索树的高度。

![img](https://img1.mukewang.com/5c127a1a0001c41d07590446.jpg)

下面我们来谈一谈高度n和h之间的关系，极端: 满二叉树中,第h-1层，有2^(h-1)个节点。

![img](https://img2.mukewang.com/5c127a1a00017b1a02310471.jpg)

h层一共有多少个节点？

![img](https://img1.mukewang.com/5c127a1a0001a75606490260.jpg)

根据等比数列的求和公式，可以得到h层一共有2^h-1 = n

![img](https://img1.mukewang.com/5c127a1b0001bc4f03310184.jpg)

通常我们不会计较这里的底，无论是以2位底，还是10，它们都是logN级别的。

#### logn和n的差距

![img](https://img1.mukewang.com/5c127a1b00014ee309850435.jpg)

相差了五万倍，一秒跑完，14个小时。一天跑完，137年跑完。

logn是一个非常快的时间复杂度。

二分搜索树会退化为链表,虽然平均来讲是O(logn)级别的，但是当退化成链表的最差情况，会变成O(n)级别的。

> 解决这个问题的方法就是要来创建平衡二叉树,在课程比较靠后的位置会给大家讲解。最准确的二分搜索树的时间复杂度是O(h)

### LeetCode中的集合相关问题。

804号问题:

<https://leetcode-cn.com/problems/unique-morse-code-words/description/>

```
package cn.mtianyan.leetcode_804;import java.util.TreeSet;class Solution {    public int uniqueMorseRepresentations(String[] words) {
        String[] codes = {".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."};
        TreeSet set = new TreeSet();        for (String word : words) {
            StringBuffer res = new StringBuffer();            for (int i = 0; i < word.length(); i++) {
                res.append(codes[word.charAt(i) - 'a']); //a充当一个初始的偏移，a-a=0 b-a=1
            }
            set.add(res.toString());
        }        return set.size();
    }
}
```

### 映射Map

函数一一映射。

![图片描述](https://img.mukewang.com/5b4f2e210001a5dd15011621.png)



Leetcode 349 两个数组的交集 使用集合

Leetcode 350 两个数组的交集 使用映射