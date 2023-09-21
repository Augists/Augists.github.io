---
title: C++ STL Report
date: 2020-06-22 19:13:27
tags: [CODE, NOTE, STL, C/C++, SUMMERTERM]
description: Summer Term Report of C++ STL

---

{% note warning %}

# C++ STL Report

## 范型程序设计

* 范型(*Genericity*)：具有在多种数据类型上皆可操作的含意
* 范型程序设计：编写完全一般化并可重复使用的程序，其效率不依赖于具体数据类型

## STL

* 容器（类模板）
* 迭代器（指针）
* 算法（函数模板）

![STL](https://cdn.jsdelivr.net/gh/chuqi906/h5u7f8j5m4b9a0p3y/2020/06/22/ea380e.png)

### 容器

* 分类

	- 顺序容器 : `vector` / `list` / `deque`
	- 关联容器 : `set` / `multiset` / `map` / `mutimap`
	- 容器适配器 : `stack` / `queue` / `priority_queue`

#### 顺序容器

* 非排序，元素的插入位置同元素的值无关
* `vector` / `list` / `deque`

{% note info %}

##### vector

* 头文件 `#include <vector>`
* 连续存储，**可变大小的数组**
* 支持快速随机访问
* 在尾部之外的位置插入/删除可能会慢

```cpp
vector<int> v1(5);		// 创建具有5个元素的整形向量v1
for (int i = 0; i < v1.size(); i++)
	v1[i] = i;			// 利用[]给元素赋值
v1.at(4) = 100;			// at()返回指定位置元素的引用
for (int i = 0; i < v1.size(); ++i)
	cout << v1[i] << " ";
```

##### list

* 头文件 `#include <list>`
* **双向链表**，存储空间不连续
* 支持双向顺序访问
* 没有重载`[]`，不支持随机存取
* 在任意位置插入/删除速度快

![list](https://tva1.sinaimg.cn/large/007S8ZIlly1gg1ihzp56lj30hq05yta2.jpg)

##### deque

* 头文件 `#include <deque`
* **双端队列**，队列尾部或首部添加/删除元素
* 支持快速随机访问
* 在头尾位置插入/删除速度快

{% endnote %}

##### 常用操作

* `front`: 返回第一个元素
* `back`: 返回最后一个元素
* `push_back`: 在容器的最后添加一个元素
* `pop_back`: 删除最后一个元素
* `begin`: 返回指向容器中第一个元素的迭代器
* `end`: 返回指向容器中最后一个元素后面的位置的迭代器
* `rbegin`: 返回指向容器中最后一个元素的迭代器
* `rend`: 返回指向容器中第一个元素前面的位置的迭代器

##### 选择

* 通常，使用`vector`是最好的选择，除非有很好的理由选择其他容器
* 如果程序要求随机访问元素，应使用`vector`和`deque`
* 如果程序要求在容器的中间插入或删除元素，应使用`list`
* 如果程序需要在头尾位置插入或删除元素，但不会在中间位置插入或删除，应使用`deque`

#### 关联容器

* 按照关键字保存、访问
* 有序，元素的插入位置按排序规则确定
* `set` / `multiset` / `map` / `multimap`

{% note info %}

##### set / multiset

* `set<key, pred>` / `multiset<key, pred>`
	- 元素只包含一个关键字
	- `pred`默认为`less<key>`
		* `set<string> s = {"The", "But", "And"};`
		* `set<string, less<string>> s = {"The", "But", "And"};`
	- `set`中不可有关键字相同的元素，`multiset`中允许出现关键字相同的元素

##### map / multimap

{% note success %}

###### pair类型

* 头文件 `#include <utility>`

| action                    | meaning                                                                         |
|---------------------------|---------------------------------------------------------------------------------|
| `pair<T1, T2> p1`         | 创建一个空pair对象，两元素分别为T1和T2类型，采用值初始化                        |
| `pair<T1, T2> p1(v1, v2)` | 创建一个pair对象，两元素分别为T1和T2类型，其中first初始化为v1，second初始化为v2 |
| `make_pair(v1, v2)`       | 以v1和v2值创建一个新pair对象，其元素类型分别是v1和v2类型                        |
| `p1 == p2`                | 如果两个pair对象的first和second依次相等，则他们相等                             |
| `p1 < p2`                 | 两个pair对象之间的小于运算，遵循字典顺序                                        |
| `p.first`                 | 返回p中first成员                                                                |
| `p.second`                | 返回p中second成员                                                               |

{% endnote %}

* 头文件 `#include <map>`
* 元素是键值对(key-value)
	- `pair<const key, value>`
	- key索引；value具体数据；按照key排序
```cpp
map<int, string> m = {{1, "The"}, {2, "But"}, {3, "And"}}
```
	- map中不可有关键字相同的元素，multimap中允许出现关键字相同的元素

{% endnote %}

##### 常用操作

* `find`: 返回一个关键字与指定值相等的元素的迭代器
* `lower_bound`: 返回小于或等于某值的第一个元素的迭代器
* `upper_bound`: 返回大于某值的元素的迭代器
* `equal_range`: 返回关键字与给定值相等的元素上下限的两个迭代器
* `count`: 计算等于某值的元素个数
* `insert`: 用以插入一个元素或一个区间

#### 容器适配器

* 使用基本顺序容器实现
    - `stack` / `queue` / `priority_queue`
    - 元素的存取有限制

{% note info %}

##### stack

* 头文件 `#include <stack>`
* 先进后出
* `stack<Type, Container>`
    - `Container`可用`vector`, `list`, `deque`来实现，缺省情况用`deque`实现

```cpp
stack<int> st;
for (int i = 0; i < 5; i++)
    st.push(i);
cout << "Size: " << st.size() << endl;
while (!st.empty())
{
    cout << " " << st.top();
    st.pop();
}
```

##### queue

* 头文件 `#include <queue>`
* 先进先出
* `queue<Type, Container>`
    - `Container`可以用`list`和`deque`实现，不能基于`vector`，缺省情况用`deque`

```cpp
queue<int> st;
for (int i = 0; i < 5; i++)
    st.push(i);
cout << "Size: " << st.size() << endl;
while (!st.empty())
{
    cout << " " << st.front();
    st.pop();
}
```

##### priority_queue

* 头文件 `#include <queue>`
* 元素具有优先级，优先级高的先出
* `priority_queue<Type, Container, Functional>`
    - `Container`可以用`vector`和`deque`实现，不能基于`list`，缺省情况用`vector`实现

```cpp
priority_queue<int> pq;     // 默认为降序排序
// 等价于 priority_queue<int, vector<int>, less<int>> pq;
pq.push(4);
pq.push(5);
while (!pq.empty())
{
    cout << " " << pq.top();
    pq.pop();
}
```

{% endnote %}

### 迭代器

* 类似于指针
* 数据访问与数据修改
* 迭代器由类iterator来表明
    - 输入迭代器
    - 输出迭代器
    - 前向迭代器
    - 双向迭代器
    - 随机迭代器
* 不同迭代器必须用于不同的容器

![iterator](https://tva1.sinaimg.cn/large/007S8ZIlly1gg2o3cdq4yj30ym0pmgx0.jpg)

{% note info %}

* 定义
    - `容器类名::iterator 变量名`
    - `容器类名::const_iterator 变量名   // 不能通过const迭代器修改数据元素的值`
* 数据访问
    - `*迭代器变量名`

{% endnote %}

```cpp
vector<int> v;
for(int i = 0; i < 5; i++)
    v.push_back(i);
vector<int>::const_iterator citer;
for (citer = v.begin(); citer != v.end(); citer++)
    cout << *citer << " ";
cout << endl;

vector<int>::iterator iter;
for (iter = v.begin(); iter != v.end(); iter++)
    *iter += 10;
for (iter = v.begin(); iter != v.end(); iter++)
    cout << *iter << " ";
cout << endl;

map<int, string> m = {{1, "The"}, {5, "But"}, {3, "And"}};
map<int, string>::iterator iter;
for (iter = m.begin(); iter != m.end(); ++iter)
    cout << (*iter).first << " " << (*iter).second << endl;
```

### 算法

* STL算法不依赖于具体的容器，通过迭代器来操纵容器中的元素
* `#include <algorithm>`，范型算法分类为
    - 不修改序列的操作
        * find() / count() / equal() / mismatch() / search() 等
    - 修改序列的操作
        * swap() / copy() / transform() / replace() / remove() / reverse() / retate() / fill() 等
    - 排序、合并和相关操作
        * sort() / binary_search() / merge() / min() / max() 等

```cpp
vector<int> v = {12, 3, 45, 56, 2, 3, 67, 89, 5};
vector<int>::iterator iter, pos;
for (iter = v.begin(); iter != v.end(); iter++)
    cout << *iter << " ";
cout << endl;

pos = max_element(v.begin(), v.end());
cout << "The maximum element is " << *pos << endl;

cout << count(v.begin(), v.end(), 3) << endl;

sort(v.begin(), v.end();
for (iter = v.begin(); iter != v.end(); iter++)
    cout << *iter << " ";
cout << endl;
```

{% endnote %}
