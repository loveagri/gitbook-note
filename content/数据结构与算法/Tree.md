# 树

树结构是一种天然的组织结构：计算机文件夹，图书馆书籍分类，公司架构，家谱

![图片描述](https://img1.sycdn.imooc.com/5b4be9b000013ac016331613.png)

为什么选择树结构：高效

![1](https://raw.githubusercontent.com/loveagri/note/master/ud-img/1.jpg)

#### 树结构分类

二分搜索树；

平衡二叉树：AVL，红黑树；

堆，并查集；

线段树[线段数据]，Trie(字典树，前缀树)[处理字符串]

#### 二叉树

和链表一样，是一种动态的数据结构，两个叉的树，只有一个根节点，具有天然递归性，每个节点都是一个二叉树

二叉树有很多扩展的数据结构，包括二分搜索树、平衡二叉树、红黑树、[AVL](https://www.imooc.com/article/49215)、[Trie树](https://www.imooc.com/article/49214)等。

![图片描述](https://img1.sycdn.imooc.com/5b4beb9f0001b5b513251405.png)

#### 二叉树具有天然递归结构

很多时候在树中，使用递归结构要简单的多。天然递归结构表现在: 每个节点的左，右子树都是棵二叉树。

![12](https://raw.githubusercontent.com/loveagri/note/master/ud-img/12.jpg)

满二叉树: 除了叶子节点之外，每个节点都有两个孩子。 但二叉树不一定是满的。

![img](https://img1.mukewang.com/5c1341b00001cec705840446.jpg)

这也是一棵二叉树，它就是一棵不满的。

![img](https://img.mukewang.com/5c1341b10001111903850435.jpg)

这也是一颗二叉树，28和16都没有右子树,看上去是一个链表。

![img](https://img4.mukewang.com/5c1341b100014e9105330231.jpg)

一个节点也是二叉树;空也是二叉树

#### 二分搜索树 Binary Search Tree

首先，二分搜索树是二叉树。

二分搜索树的**每个节点**的值大于其左子树的所有节点的值，小于其右子树的所有节点的值。每一棵子树也是二分搜索树，二分搜索树存储的元素具有可比较性。

## 二分搜索树的添加，查询，遍历

### 向二分搜索树中添加元素。

![img](http://myphoto.mtianyan.cn/20180812225626_K75Fol_Screenshot.jpeg)

二分搜索树一般不包含重复元素；如果想包含重复元素的话，只需要定义: 左子树小于等于节点;或者右子树大于等于节点。

二分搜索树添加元素的非递归写法，和链表很像; 这个课程在二分搜索树方面的实现，关注递归实现

### 二分搜索树中搜索元素。

同样是递归操作搜索元素

### 二分搜索树的遍历

#### 什么是遍历操作？

遍历操作就是把所有节点都访问一遍;访问的原因和业务相关;在线性结构下。

1. 前序遍历：now->left->right,拷贝，用于已经存在的排序二叉树的复制；
2. 中序遍历：left->now->right，排序；
3. 后序遍历：left->right->now，用于文件系统遍历及内存释放。

前序遍历顺序:是指先访问根，再访问左右。

```

        //      5      //
        //    /   \    //
        //   3    6    //
        //  / \    \   //
        // 2  4     8  //
        /////////////////
```

前序遍历结果:

![img](http://myphoto.mtianyan.cn/20180812235957_0JBkmL_Screenshot.jpeg)



中序遍历结果:2->3->4->5->6->8; //中序遍历的结果就是二分搜索树排序的结果。

后序遍历结果:2->4->3->8->6->5;

![img](http://myphoto.mtianyan.cn/20180813000649_KCDgcP_Screenshot.jpeg)

##### 深入理解前中后

![图片描述](https://img1.sycdn.imooc.com/5b4d3d6a0001159721122120.png)



### 二分搜索树前序非递归写法

![图片描述](https://img1.sycdn.imooc.com/5b4d43620001a83d12531280.png)
![图片描述](https://img1.sycdn.imooc.com/5b4d452400013d4609320302.png)

### 二分搜索树的层序遍历（广度优先遍历）

> 一般使用非递归的队列方式实现
> 由于队列的顺序是先进先出，所以是从左到右入队的。

![图片描述](https://img1.sycdn.imooc.com/5b4fc7f000017bc912370625.png)

```
 // 二分搜索树的层序遍历
    public void levelOrder(){

        if(root == null)
            return;

        Queue<Node> q = new LinkedList<>();
        q.add(root);
        while(!q.isEmpty()){
            Node cur = q.remove();
            System.out.println(cur.e);

            if(cur.left != null)
                q.add(cur.left);
            if(cur.right != null)
                q.add(cur.right);
        }
    }
```

### 广度优先的遍历

- 更快的找到问题的解

- 常用于算法设计中，最短路径（无权图）

    ### 二分搜索树删除节点(最大元素，最小元素)

    ![图片描述](https://img1.sycdn.imooc.com/5b4fc8d90001219304590494.png)
    ![图片描述](https://img1.sycdn.imooc.com/5b4fcb4a0001f8d909041149.png)

    ```
    // 寻找二分搜索树的最小元素
    public E minimum(){
        if(size == 0)
            throw new IllegalArgumentException("BST is empty");
    
        Node minNode = minimum(root);
        return minNode.e;
    }
    
    // 返回以node为根的二分搜索树的最小值所在的节点
    private Node minimum(Node node){
        if( node.left == null )
            return node;
    
        return minimum(node.left);
    }
    
    // 寻找二分搜索树的最大元素
    public E maximum(){
        if(size == 0)
            throw new IllegalArgumentException("BST is empty");
    
        return maximum(root).e;
    }
    
    // 返回以node为根的二分搜索树的最大值所在的节点
    private Node maximum(Node node){
        if( node.right == null )
            return node;
    
        return maximum(node.right);
    }
    
    // 从二分搜索树中删除最小值所在节点, 返回最小值
    public E removeMin(){
        E ret = minimum();
        root = removeMin(root);
        return ret;
    }
    
    // 删除掉以node为根的二分搜索树中的最小节点
    // 返回删除节点后新的二分搜索树的根
    private Node removeMin(Node node){
        // 处理递归到底的情况。
        if(node.left == null){
            Node rightNode = node.right;
            node.right = null;
            size --;
            return rightNode;
        }
    
        node.left = removeMin(node.left);
        return node;
    }
    
    // 从二分搜索树中删除最大值所在节点
    public E removeMax(){
        E ret = maximum();
        root = removeMax(root);
        return ret;
    }
    
    // 删除掉以node为根的二分搜索树中的最大节点
    // 返回删除节点后新的二分搜索树的根
    private Node removeMax(Node node){
    
        if(node.right == null){
            Node leftNode = node.left;
            node.left = null;
            size --;
            return leftNode;
        }
    
        node.right = removeMax(node.right);
        return node;
    }
    ```

    ### 删除二分搜索树中的任意节点

    > 如果只有一边的节点，删除方法跟上面类似。如果有两个，方法如下图。

![图片描述](https://img1.sycdn.imooc.com/5b5079d30001eb5a12130546.png)
![图片描述](https://img1.sycdn.imooc.com/5b507be600012ed911620527.png)

```
 // 删除掉以node为根的二分搜索树中值为e的节点, 递归算法
    // 返回删除节点后新的二分搜索树的根
    private Node remove(Node node, E e){

        if( node == null )
            return null;

        if( e.compareTo(node.e) < 0 ){
            node.left = remove(node.left , e);
            return node;
        }
        else if(e.compareTo(node.e) > 0 ){
            node.right = remove(node.right, e);
            return node;
        }
        else{   // e.compareTo(node.e) == 0

            // 待删除节点左子树为空的情况
            if(node.left == null){
                Node rightNode = node.right;
                node.right = null;
                size --;
                return rightNode;
            }

            // 待删除节点右子树为空的情况
            if(node.right == null){
                Node leftNode = node.left;
                node.left = null;
                size --;
                return leftNode;
            }

            // 待删除节点左右子树均不为空的情况

            // 找到比待删除节点大的最小节点, 即待删除节点右子树的最小节点
            // 用这个节点顶替待删除节点的位置
            Node successor = minimum(node.right);
            successor.right = removeMin(node.right);
            successor.left = node.left;

            node.left = node.right = null;

            return successor;
        }
    }
```

### 二分搜索树的顺序性

- 使用中序遍历数组就是有序的（小到大）
- minimum,maximum
- successor,predecessor
- floor ceil
- rank(给出一个元素，看其排名是第几) select（排名第几的元素是什么）

![图片描述](https://img1.sycdn.imooc.com/5b507d3c0001642a10790528.png)
![图片描述](https://img1.sycdn.imooc.com/5b5080310001f5bc21501471.png)

