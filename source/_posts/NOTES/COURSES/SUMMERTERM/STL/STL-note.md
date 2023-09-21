---
title: STL note
date: 2020-06-25 23:06:08
tags: [CODE, NOTE, STL, C/C++, SUMMERTERM]
description: "C++ STL Note<br>Copyright@Steve Yu"
author: Steve Yu

---

> 原作地址：https://www.cnblogs.com/littlepage/p/12113748.html
> 原作视频：https://www.bilibili.com/video/BV1uJ411r74z?p=5&t=297

{% note warning %}

## STL(Standard Template Library)与algorithm头文件

STL是一些“容器”的集合，这些“容器”有list,vector,set,map等，STL也是算法和其他一些组件的集合。

algorithm是对容器继承的一些算法函数，辅助刷算法题

sort函数

迭代器——理解为指针

```cpp
#include <iostream>
#include <algorithm>

using namespace std;

int main()
{
    int a[]={2,1,5,0,-1,5,9};
    sort(a,a+7);
    for(int i=0;i<7;i++)
        cout<<a[i]<<" ";
    cout<<endl;
    system("pause");
    return 0;
}
```

## STL——string

概念：相当于`char*`的封装，理解为字符串

### 简单使用

```cpp
/*C中定义字符串以及打印*/
char *ch="asdkajbf";
for(int i=0;ch[i]!='\0';i++) cout<<*(ch+i);
/**C++中*/
string s="ssadaffw";
cout<<s<<endl;
```

### 获取一行字符串

我想获取一行字符串

`hello world`

C中：

```c
scanf("%s",ch);//1.仅获取一个单词，空格结束 2.ch[100]得设置初始大小
```

C++中：

```cpp
string s;
getline(cin,s);//获取一行数据
cout<<s;
```

### +=运算符

`+=`对于字符串，字符有效，数字会转为`ascii`码

```cpp
string s;
s+="hello";
s+=" world";
s+='5';
s+=10;//10对应的asc码是换行
int a=5;//想把a加入字符串
s+=(a+'0');
cout<<s;
```

### 排序（使用algorithm）

```cpp
string s="5418340";
sort(s.begin(),s.end());
cout<<s;
```

### erase函数

```cpp
/*begin是头迭代器，end是尾迭代器*/
string s="5418340";
s.erase(s.begin());//删除第一个
s.erase(--s.end());//删除最后一个
cout<<s;
```

### substr函数

```cpp
/*begin是头迭代器，end是尾迭代器*/
string s="5418340";
s=s.substr(1,3);//取418,取索引为1，往后截断3个
s=s.substr(1,-1);//索引为1，截断到最后
cout<<s;
```

### 循环(3种)

1. `for`循环

```cpp
string s="5418340";
for(int i=0;i<s.length();i++) cout<<s[i];
```

2. 迭代器

```cpp
for(string::iterator it=s.begin();it!=s.end();it++) cout<<*it;
```

3. 迭代器化简

```cpp
for(auto it=s.begin();it!=s.end();it++) cout<<*it;
```

4. 利用C++ 11新特性`for`循环

```cpp
for(auto x:s) cout<<x;
```

## STL——vector

`vector`相当于数组，模板类型相当于存放的内容

1. `vector`构造

```cpp
vector<int> v;//定义一个空vector
vector<int> v2(4);//定义一个4个大小的vector，初始为0
vector<int> v3(4,6);//定义一个4个大小的vector，初始为6
vector<int> v{1,2,3,4,5};//定义一个vector，数字为1,2，3,4,5
for(auto x:v3) cout<<x;
```

2. 用`at`或者`[]`获取元素

```cpp
vector<int> v{1,2,3,4,5};
cout<<v[1];//取索引为1的
cout<<v.at(2);//取索引为2的
```

3. 方法

`push_back`追加内容

```cpp
vector<int> v;
v.push_back(5);
v.push_back(5);
v.push_back(5);
v.push_back(5);
v.push_back(6);
for(auto x:v) cout<<x;
```

`resize`进行重置大小

```cpp
v.resize(10);//不赋值默认为0
```

`erase`删除元素，复杂度为O(n)

```cpp
v.erase(v.begin());//删除第一个元素
v.erase(--v.end());//删除最后一个元素
```

获取第一个元素，获取最后一个元素

```cpp
/**获取第一个元素*/
cout<<v.front();
cout<<v[0];
cout<<*v.begin();
/**获取最后一个元素*/
cout<<v.back();
cout<<v[v.size()-1];//size是获取大小
cout<<*--v.end();```
```

4. 排序

第三个参数为比较器，不写默认为`less<int>()`

```cpp
vector<int> v{5,1,2,5,4,0,-1};
sort(v.begin(),v.end(),less<int>());//从小到大
sort(v.begin(),v.end(),greater<int>());//从大到小排序
for(auto x:v) cout<<x;
```

5. 循环

```cpp
vector<int> v{5,1,2,5,4,0,-1};
for(int i=0;i<v.size();i++) cout<<v[i];//for循环
cout<<endl;
for(vector<int>::iterator it=v.begin();it!=v.end();it++) cout<<*it;//迭代器循环
cout<<endl;
for(auto it=v.begin();it!=v.end();it++) cout<<*it;//迭代器简化循环
cout<<endl;
for(auto x:v) cout<<x;//c++11新特性
```

## STL——stack

栈

构造

```cpp
stack<int> s;
```

`push`、`pop`、`size`、`empty`
`push`: 入栈一个元素
`pop`: 出栈一个元素，pop无返回值
`top`: 取栈顶元素
`size`: 查看元素个数

```cpp
s.push(2);
s.push(3);
cout<<s.top()<<endl;
s.pop();
cout<<s.top()<<endl;
cout<<s.size()<<endl;
```

进制转换(十进制转二进制)

```cpp
int itob(int decimal){
    stack<int> s;int res=0;
    while(decimal!=0){
        s.push(decimal%2);
        decimal/=2;
    }
    while(!s.empty()){
        res=res*10+s.top();
        s.pop();
    }
    return res;
}
```

逆序单词（拓展`sstream`，`stoi`，`itoa`）
输入一行字符串，将字符串逆序打印

输入：`hello world my name is steve yu`

输出：`yu steve is name my world hello`

```cpp
#include <iostream>
#include <stack>
#include <sstream>

using namespace std;

int main(){
    string str;
    stack<string> s;
    getline(cin,str);
    stringstream ss;
    ss<<str;
    while(ss>>str)
        s.push(str);
    while(!s.empty()){
        cout<<s.top();
        s.pop();
        if(s.size()!=0) cout<<" ";
    }
    return 0;
}
```

字符串转数字
方法1:

```cpp
string s="1234";
int i;
stringstream ss;
ss<<s;
ss>>i;
cout<<i;
```

方法2:

```cpp
string s="1234";
int i=stoi(s);
cout<<i;
```

数字转字符串
方法1:

```cpp
int a=1234;
string out;
stringstream ss;
ss<<a;
ss>>out;
cout<<out<<endl;
```

方法2:(C++ 11)

```cpp
int a=1234;
cout<<to_string(a)<<endl;
```

## STL——queue

队列

构造

```cpp
queue<int> q;
```

`push`、`back`

```cpp
q.push(5);
q.push(6);
cout<<q.front()<<endl;
q.pop();
cout<<q.front()<<endl;
cout<<q.size()<<endl;
```

## STL——map(unordered_map pair)

映射（`map`为树状表，`unorderedmap`为哈希表）

`map`

```cpp
map<int,int> m;//有序的，树状结构（底层）
m[6]=3;
m[5]=8;
m[4]=9;
for(auto it=m.begin();it!=m.end();it++)
	cout<<it->first<<" "<<it->second<<endl;
for(auto tmp:m)
	cout<<tmp.first<<" "<<tmp.second<<endl;
```

`unordered_map`

```cpp
unordered_map<int,int> m;//无序的，哈希结构（底层）
m[6]=3;
m[5]=8;
m[4]=9;
for(auto it=m.begin();it!=m.end();it++)
	cout<<it->first<<" "<<it->second<<endl;
for(auto tmp:m)
	cout<<tmp.first<<" "<<tmp.second<<endl;
```

`pair`的用法(`map`转成`vector`进行排序)

```cpp
bool cmp(pair<int,int> a,pair<int,int> b){
    return a.first>b.first;
}
int main(){
    unordered_map<int,int> m;//无序的，哈希结构（底层）
    m[6]=3;
    m[5]=8;
    m[4]=9;
    vector<pair<int,int>> v(m.begin(),m.end());
    sort(v.begin(),v.end(),cmp);
    for(auto tmp:v){
        cout<<tmp.first<<tmp.second<<endl;
    }
    return 0;
}
```

## set(unordered_set)

集合

应用计数、去重

```cpp
set<int> s;//树状结构，有序
unordered_set<int> s2;//哈希结构，无序，快
s.insert(3);
s.insert(4);
s.insert(4);
s.insert(4);
cout<<s.size()<<endl;
for(auto tmp:s)
	cout<<tmp<<" ";
cout<<endl;
for(auto it=s.begin();it!=s.end();it++)
	cout<<*it<<" ";
cout<<endl;
```

## STL——deque

双端队列

```cpp
deque<int> d;
// 4 9 1 2
d.push_back(1);
d.push_back(2);
d.push_front(9);
d.push_front(4);
d.pop_back();
d.pop_front();
for(auto tmp:d) cout<<tmp<<endl;
for(auto it=d.begin();it!=d.end();it++) cout<<*it<<endl;
```

排序

```cpp
sort(d.begin(),d.end(),greater<int>());
```

## STL——list

双向链表

```cpp
list<int> li;
li.push_back(6);
li.push_front(5);
li.emplace_front(9);
li.emplace_back(10);
li.insert(++li.begin(),2);
for(auto tmp:li) cout<<tmp<<endl;
for(auto it=li.begin();it!=li.end();it++) cout<<*it<<endl;
```

## 文档

英文：

http://www.cplusplus.com/reference/stl/

中文：

http://c.biancheng.net/stl/map/

{% endnote %}
