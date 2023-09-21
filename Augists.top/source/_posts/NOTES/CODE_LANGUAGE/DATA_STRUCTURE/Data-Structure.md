---
title: Data Structure
date: 2020-09-01 11:52:27
tags: [CODE, NOTE, DATASTRUCTURE, C/C++]
description: Data Structure note in C

---

{% note warning %}

{% note %}

原发布于7月21日，因期末考试影响这篇没有学完，现开始继续更新
代码部分一些内容进行了省略，

{% endnote %}

# 数据结构 C语言版

## 绪论

### 基本概念

* 数据 Data：客观事物，所有能输入到计算机中并被计算机程序处理的符号的总称
* 数据元素 Data Element：数据基本单位，整体
* 数据项 Data Item：有独立含义，不可分割
* 数据对象 Data Object：性质相同的数据元素集合，数据的子集

### 数据结构

#### 逻辑结构

1. 集合
2. 线性
3. 树
4. 图、网状

* 线性结构：线性表、栈和队列、字符串、数组、广义表（线性表的推广
* 非线性结构：树、二叉树、有向图、无向图

#### 存储结构

也称物理结构

* 顺序存储结构：借助元素在存储器中的相对位置来表示数据元素之间的逻辑关系，数组
* 链式存储结构：给每个结点附加指针字段，用于存储后继元素的存储地址，指针

### 数据类型和抽象数据类型

* 数据类型 Data Type：一个值的集合和定义在这个值集上的一组操作的总称
* 抽象数据类型 Abstract Data Type，ADT：用户定义，包括：数据对象、数据对象上关系的集合、对数据对象的基本操作的集合

<pre>
ADT 抽象数据类型名<br>
{<br>
	数据对象：<数据对象的定义><br>
	数据关系：<数据关系的定义><br>
	基本操作：<基本操作的定义><br>
} ADT 抽象数据类型名<br>
</pre>

其中，基本操作的定义格式为

```c
基本操作名(参数表)
	初始条件：<初始条件描述>
	操作结构：<操作结果描述>
```

{% note %}

e.g. 复数

1. 定义部分
<pre>
ADT Complex<br>
{<br>
	数据对象：D = {e1, e2 | e1, e2 ∈ R}<br>
	数据关系：S = {(e1, e2) | e1 是复数实部，e2 是复数虚部}<br>
	基本操作：<br>
	  Create(&C, x, y)<br>
	    操作结果：构造复数C，其实部和虚部分别赋以参数x, y<br>
	  GetReal(C)<br>
	    初始条件：C已存在<br>
		操作结果：返回C的实部值<br>
	  GetImage(C)<br>
	    初始条件：C已存在<br>
		操作结果：返回C的虚部值<br>
	  Add(C1, C2)<br>
	    初始条件：C1, C2是复数<br>
		操作结果：返回C1和C2的和<br>
	  Sub(C1, C2)<br>
	    初始条件：C1, C2是复数<br>
		操作结果：返回C1和C2的差<br>
} ADT Complex<br>
</pre>

2. 表示部分
```cpp
typedef struct
{
	float Realpart;
	float Imagepart;
} Complex;
```

3. 实现部分
```c
void Create(&Complex C, float x, float y)
{	// 构造一个复数
	C.Realpart = x;
	C.Imagepart = y;
}
float GetReal(Complex C)
{	// 取C的实部
	return C.Realpart;
}
float GetImag(Complex C)
{	// 取C的虚部
	return C.Imagepart;
}
Complex Add(Complex C1, Complex C2)
{	// 求两个复数的和
	Complex sum;
	sum.Realpart = C1.Realpart + C2.Realpart;
	sum.Imagepart = C1.Imagepart + C2.Imagepart;
	return sum;
}
Complex Sub(Complex C1, Complex C2)
{	// 求两个复数的差
	Complex difference;
	difference.Realpart = C1.Realpart - C2.Realpart;
	difference.Imagepart = C1.Imagepart - C2.Imagepart;
	return difference;
}
```

{% endnote %}

### 算法和算法分析

#### 算法的特性

1. 有穷性
2. 确定性
3. 可行性
4. 输入
5. 输出

#### 评价优劣的基本标准

1. 正确性
2. 可读性
3. 健壮性（对输入非法数据的处理反应
4. 高效性

#### 时间复杂度

* 问题规模：问题的输入量，问题大小的本质表示，一般用整数n
* 语句频度 *Frequency Count*：一条语句的重复执行次数

数量级 *Order of Magnitude* 为 O

渐进时间复杂度，简称时间复杂度 *Time Complexity*
`T(n) = O(f(n))`
旧博客：[Time O](../Stack/Time-o)

#### 最好、最坏和平均时间复杂度

* 平均时间复杂度：在所有可能情况下，按照输入实例以等概率出现时，算法计算量的加权平均值

#### 空间复杂度

渐进空间复杂度 *Space Complexity*
`S(n) = O(f(n))`

## 线性表

### 定义和特点

定义
* 由 n 个数据特性相同的元素构成的有限序列
* n = 0 时为空表

非空线性表的特点
1. 存在唯一一个被称作“第一个”的数据元素
2. 存在唯一一个被称作“最后一个”的数据元素
3. 除第一个之外，结构中的每个数据元素均只有一个前驱
4. 除最后一个之外，结构中的每个数据元素均只有一个后驱

### 类型定义

<pre>
ADT List<br>
{<br>
	数据对象：D = {a<sub>i</sub> | a<sub>i</sub>∈ElemSet, i=1, 2, …, n, n ≥ 0}<br>
	数据关系：R = {(a<sub>i-1</sub>, a<sub>i</sub>) | a<sub>i-1</sub>, a<sub>i</sub>∈D, i=2, …, n}<br>
	基本操作：<br>
	  InitList(&L)<br>
	    操作结果：构造一个空的线性表 L<br>
	  Destroylist(&L)<br>
	    初始条件：线性表 L 已存在<br>
		操作结果：销毁线性表 L<br>
	  ClearList(&l)<br>
	    初始条件：线性表 L 已存在<br>
		操作结果：将 L 重置为空表<br>
	  ListEmpty(L)<br>
	    初始条件：线性表 L 已存在<br>
		操作结果：若 L 为空表，则返回 true，否则返回 false<br>
	  ListLength(L)<br>
	    初始条件：线性表 L 已存在<br>
		操作结果：返回 L 中数据元素个数<br>
	  GetElem(L, i, &e)<br>
	    初始条件：线性表 L 已存在，且 1 ≤ i ≤ ListLength(L)<br>
		操作结果：用 e 返回 L 中第 i 个数据元素的值<br>
	  LocateElem(L, e)<br>
	    初始条件：线性表 L 已存在<br>
		操作结果：返回 L 中第1个值与 e 相同的元素在 L 中的位置，若数据不存在，返回值为0<br>
	  PriorElem(L, cur_e, &pre_e)<br>
	    初始条件：线性表 L 已存在<br>
		操作结果：若 cur_e 是 L 的数据元素，且不是第一个，则用 pre_e 返回其前驱，否则操作失败，pre_e 无定义<br>
	  NextElem(L, cur_e, &next_e)<br>
	    初始条件：线性表 L 已存在<br>
		操作结果：若 cur_e 是 L 的数据元素，且不是最后一个，则用 next_e 返回其后继，否则操作失败，next_e 无定义<br>
	  ListInsert(&L, i, e)<br>
	    初始条件：线性表 L 已存在，且 1 ≤ i ≤ ListLength(L) + 1<br>
		操作结果：在 L 中第 i 个位置之前插入新的数据元素 e, L 的长度加1<br>
	  ListDelete(&L, i)<br>
	    初始条件：线性表 L 已存在且非空，且 1 ≤ i ≤ ListLength(L)<br>
		操作结果：在 L 中第 i 个位置之前插入新的数据元素 e，L的长度都加1<br>
	  TraverseList(L)<br>
	    初始条件：线性表 L 已存在<br>
		操作结果：对线性表 L 进行遍历，在遍历的过程中<br>
} ADT List<br>
</pre>

### 顺序表示

每个存储元素占 l 个存储单元
LOC(a<sub>i</sub>) = LOC(a<sub>1</sub>) + (i - 1) * l

只要确定了存储线性表的起始位置，线性表中任一数据元素都可以随机存储，所以线性表的顺序存储结构是一种**随机存储**的存储结构

```c
#define MAXSIZE 100		// 顺序表可能达到的最大长度
typedef struct
{
	ElemType *elem;		// 存储空间的基地址
	int length;			// 当前长度
} SqList				// 顺序表的结构类型为 SqList
```

#### 初始化

```c
Status InitList(SqList &L)
{
	L.elem = new ElemType[MAXSIZE];
	if (!L.elem) exit(OVERFLOW);
	L.length = 0;
	return OK;
}
```

#### 取值

```c
Status GetElem(SqList L, int i, ElemType &e)
{
	if (i < 1 || i > L.length) return ERROR;
	e = L.elem(i - 1);
	return OK;
}
```

#### 查找

```c
int LocateElem(SqList L, ElemType e)
{
	for (i = 0; i < L.length; i++)
		if (L.elem[i] == e) return i + 1;
	return 0;
}
```
O(n)

#### 插入

```c
Status ListInsert(SqList &L, int i, ElemType e)
{
	if ((i < 1) || (i > L.length + 1)) return ERROR;
	if (L.length == MAXSIZE) return ERROR;
	for (int j = L.length - 1; j >. i - 1; j--)
		L.elem[j + 1] = L.elem[j];
	L.elem[i - 1] = e;
	++L.length;
	return OK;
}
```
O(n)

#### 删除

```c
Status ListDelete(SqList &L, int i)
{
	if ((i < 1) || (i > L.length)) return ERROR;
	for (int j = i; j <= L.length - 1; j++)
		L.elem[j - 1] = L.elem[j];
	--L.length;
	return OK;
}
```
O(n)

### 链式表示

用一组任意的存储单元存储线性表的数据元素（可以不连续）

**结点**包括**数据域**和**指针域**，指针域中存储的信息称作**指针**或**链**

根据链表结点所含指针个数、指针指向和指针连接方式，将链表分为单链表、循环链表、双向链表、二叉链表、十字链表、邻接表、邻接多重表等，其中除单链表、循环链表、双向链表，其他用于树和图等结构

```c
typedef struct LNode
{
	ElemType data;
	struct LNode *next;
} LNode, *LinkList;
```

通常习惯上用 `LinkList` 定义单链表，强调定义的是某个单链表的头指针
用 `LNode *` 定义指向单链表任意结点的指针变量

通常增加一个多余的头结点
* 便于首元结点的处理，对首元结点的操作与其他数据元素相同，无需特殊处理
* 便于空表和非空表的统一处理：无需判断头指针是否为 nullptr

{% note %}

* 首元结点：链表中存储第一个数据元素 a<sub>i</sub> 的结点
* 头结点：首元结点之前附设的一个结点，其指针域指向首元结点，数据域可以不存储任何信息，也可以存储与数据元素类型相同的其他附加信息
* 头指针：指向链表的第一个结点

{% endnote %}

单链表是非随机存取的存储结构，要取得第 i 个数据元素必须从头指针出发顺链进行寻找，也称为**顺序存取**的存取结构

#### 初始化

```c
Status InitList(LinkList &L)
{
	L = new LNode;
	L->next = NULL;
	return OK;
}
```

#### 取值

```c
Status GetElem(LinkList L, int i, ElemType &e)
{
	p = L->next;
	int j = 1;
	while (p && j < i)
	{
		p = p->next;
		++j;
	}
	if (!p || j > i) return ERROR;
	e = p->data;
	return OK;
}
```
O(n)

#### 查找

```c
LNode *LocateElem(LinkList L, ElemType e)
{
	p = L->next;
	while (p && p->data != e)
		p = p->next;
	return p;
}
```
O(n)

#### 插入

```c
Status ListInsert(LinkList &L, int i, ElemType e)
{
	p = L;
	int j = 0;
	while (p && j < i - 1)
	{
		p = p->next;
		++j;
	}
	if (!p || j > i - 1) return ERROR;
	s = new LNode;
	s->data = e;
	s->next = p->next;
	p->next = s;
	return OK;
}
```
O(n)

#### 删除

```c
Status ListDelete(LinkList &L, int i)
{
	p = L;
	int j = 0;
	while ((p->next) && (j < i - 1))
	{
		p = p->next;
		++j;
	}
	if (!(p->next) || (j > i - 1)) return ERROR;
	q = p->next;
	p->next = q->next;
	delete q;
	return OK;
}
```
O(n)

#### 创建

##### 前插法

1. 创建一个只有头结点的空链表
2. 根据待创建的元素个数 n 循环 n 次执行
	* 生成一个新结点 `*p`
	* 输入元素值赋给新结点 `*p` 的数据域
	* 将新结点 `*p` 插入到头结点之后

逆位序输入数据

```c
void CreateList_H(LinkList &L, int n)
{
	L = new LNode;
	L->next = NULL;
	for (i = 0; i < n; ++i)
	{
		p = new LNode;
		cin >> p->data;
		p->next = L->next;
		L->next = p;
	}
}
```
O(n)

##### 后插法

1. 创建一个只有头结点的空链表
2. 尾指针 r 初始化，指向头结点
3. 根据创建链表包括的元素个数 n 循环 n 次执行
	* 生成一个新结点 `*p`
	* 输入元素值赋给新结点 `*p` 的数据域
	* 将新结点 `*p` 插入到尾结点 `*r` 之后
	* 尾指针 `r` 指向新的尾结点 `*p`

```c
void CreateList_R(LinkList &L, int n)
{
	L = new LNode;
	L->next = NULL;
	r = L;
	for (i = 0; i < n; ++i)
	{
		p = new LNode;
		cin >> p->date;
		p->next = NULL;
		r->next = p;
		r = p;
	}
}
```

#### 循环链表

Circular Linked List
表中最后一个结点的指针域指向头结点

终止条件
```c
p != L || p->next != L
```

合并两个表时
```c
p = B->next->next;
B->next = A->next;
A->next = p;
```
O(1)

#### 双向链表

```c
typedef struct DuLNode
{
	ElemType date;
	struct DuLNode *prior;
	struct DeLNode *next;
} DuLNode, *DuLinkList;
```

##### 插入

```c
Status ListInsert_DuL(DuLinkList &L, int i, ElemType e)
{
	if (!(p = GetElem_DuL(L, i))) return ERROR;
	s = new DuLNode;
	s->data = e;
	s->prior = p->prior;
	p->prior->next = s;
	s->next = p;
	p->prior = s;
	return OK;
}
```

##### 删除

```c
Status ListDelete_DuL(DuLinkList &L, int i)
{
	if (!(p = GetElem_DuL(L, i))) return ERROR;
	p->prior->next = p->next;
	p->next->prior = p->prior;
	delete p;
	return OK;
}
```

### 顺序表和链表的比较

#### 空间性能

1. 存储空间分配
2. 存储密度大小

存储密度 = 数据元素本身占用的存储量 / 结点结构占用的存储量

#### 时间性能

1. 存取元素的效率
2. 插入和删除操作的效率

### 线性表的应用

#### 合并（去重）

1. 分别获取 LA 表长 m 和 LB 表长 n
2. 从 LB 中第1个数据元素开始，循环 n 次执行、
	* 从 LB 中查找第 i (1 ≤ i ≤ n)个数据元素赋给 e
	* 在 LA 中查找元素 e，如果不存在，则将 e 插在表 LA 的最后

```c
void MergeList(List &LA, List LB)
{
	m = ListLength(LA);
	n = ListLength(LB);
	for (i = 1; i <= n; ++i)
	{
		GetElem(LB, i, e);
		if (!LocateElem(LA, e))
			ListInsert(LA, ++m, e);
	}
}
```
O(m * n)

#### 合并（有序表 不去重）

##### 顺序有序表

1. 创建一个表长为 m+n 的空表 LC
2. 指针 pc 初始化，指向 LC 的第一个元素
3. 指针 pa 和 pb 初始化，分别指向 LA 和 LB 的第一个元素
4. 当指针 pa 和 pb 均未达到相应表尾时，则依次比较 pa 和 pb 所指向的元素值，从 LA 或 LB 中拿较小的结点插入到 LC 的最后
5. 如果 pb 已到达 LB 的表尾，依次将 LA 的剩余元素插入 LC 的最后
6. 如果 pa 已到达 LA 的表尾，依次将 LB 的剩余元素插入 LC 的最后

```c
void MergeList_Sq(SqList LA, SqList LB, SqList &LC)
{
	LC.length = LA.length + LB.length;
	LC.elem = new ElemType(LC.length);
	pc = LC.elem;
	pa = LA.elem;
	pb = LB.elem;
	pa_last = LA.elem + LA.length - 1;
	pb_last = LB.elem + LB.length - 1;
	while ((pa <= pa_last) && (pb <= pb_last))
	{
		if (*pa <= *pb) *pc++ = *pa++;
		else *pc++ = *pb++;
	}
	while (pa <= pa_last) *pc++ = *pa++;
	while (pb <= pb_last) *pc++ = *pb++;
}
```
O(m + n)
O(m + n)

##### 链式有序表

1. 指针 pa 和 pb 初始化，分别指向 LA 和 LB 的第一个结点
2. LC 的结点取值为 LA 的头结点
3. 指针 pc 初始化，指向 LC 的头结点
4. 当指针 pa 和 pb 均未到达相应的表尾时，则依次比较 pa 和 pb 所指向的元素值，从 LA 或 LB 中拿较小的结点插入到 LC 的最后
5. 将非空表的剩余段插入到 pc 所指结点之后
6. 释放 LB 的头结点

```c
void MergeList_L(LinkList &LA, LinkList &LB, LinkList &LC)
{
	pa = LA->next;
	pb = LB->next;
	LC = LA;
	pc = LC;
	while (pa && pb)
	{
		if (pa->data <= pb->data)
		{
			pc->next = pa;
			pc = pa;
			pa = pa->next;
		}
		else
		{
			pc->next = pb;
			pc = pb;
			pb = pb->next;
		}
	}
	pc->next = pa ? pa : pb;
	delete LB;
}
```
O(m + n)
O(1)

## 栈和队列

### 定义和特点

1. 栈
**栈 stack** 仅在表尾进行插入或删除操作的线性表
表尾称为 **栈顶 top**，表头称为 **栈底 bottom**，不含元素的空表称为 **空栈**
**后进先出 First In First Out (LIFO)**

2. 队列
**队列 queue** 是 **先进先出 First In First Out (FIFO)** 的线性表
队列中，允许插入的一端称为 **队尾 rear**，允许删除的一段称为 **队头 front**

### 栈的表示和操作

<pre>
ADT Stack<br>
{<br>
	数据对象：D = {a<sub>i</sub> | a<sub>i</sub>∈ElemSet, i = 1, 2, …, n, n ≥ 0}<br>
	数据关系：R = {<a<sub>i - 1</sub>, a<sub>i</sub>> | a<sub>i - 1</sub>, a<sub>i</sub>∈D, i = 2, …, n}<br>
		a<sub>n</sub>为栈顶，a<sub>i</sub>为栈底<br>
	基本操作：<br>
		InitStack(&S)<br>
			操作结果：构造一个空栈 S<br>
		DestroyStack(&S)<br>
			初始条件：栈 S 已存在<br>
			操作结果：栈 S 被销毁<br>
		ClearStack(&S)<br>
			初始条件：栈 S 已存在<br>
			操作结果：栈 S 清为空栈<br>
		StackEmpty(S)<br>
			初始条件：栈 S 已存在<br>
			操作结果：若 S 为空栈，返回 true，否则返回 false<br>
		StackLength(S)<br>
			初始条件：栈 S 已存在<br>
			操作结果：返回 S 的元素个数，即栈的长度<br>
		GetTop(S)<br>
			初始条件：栈 S 已存在且非空<br>
			操作结果：返回 S 的栈顶元素，不修改栈顶指针<br>
		Push(&S, e)<br>
			初始条件：栈 S 已存在<br>
			操作结果：插入 e 为新的栈顶元素<br>
		Pop(&S, &e)<br>
			初始条件：栈 S 已存在且非空<br>
			操作结果：删除 S 的栈顶元素，并用 e 返回其值<br>
		StackTraverse(S)<br>
			初始条件：栈 S 已存在且非空<br>
			操作结果：从栈底到栈顶依次对 S 的每个数据元素进行访问<br>
} ADT Stack<br>
</pre>

#### 顺序栈

```c
#define MAXSIZE 100
typedef struct
{
	SElemType *base;	// 栈底指针
	SelemType *top;
	int stacksize;
} SqStack;
```

##### 初始化

1. 为栈动态分配一个最大容量为 MAXSIZE 的数组空间，使 base 指向栈底
2. 栈顶指针 top 初始为 base，即为空栈
3. stacksize 置为 MAXSIZE

```c
Status InitStack(SqStack &S)
{
	S.base - enw SElemType[MAXSIZE];
	if (!S.bash) exit(OVERFLOW);
	S.top = S.base;
	S.stacksize = MAXSIZE;
	return OK;
}
```

##### 入栈

1. 判断是否已满，若满返回 ERROR
2. 将新元素压入栈顶，栈顶指针加1

```c
Status Push(SqStack &S, SElemType e)
{
	if (S.top - S.base == S.stacksize) return ERROR;
	*S.top++ = e;
	return OK;
}
```

##### 出栈

1. 判断栈是否空，若空返回 ERROR
2. 栈顶指针减1，栈顶元素出栈

```c
Status Pop(SqStack &S, SElemType &e)
{
	if (S.top == S.base) return ERROR;
	e = *--S.top;
	return OK;
}
```

##### 取栈顶元素

1. 当栈非空时，返回栈顶元素的值

```c
SelemType GetTop(SqStack S)
{
	if (S.top != S.base)
		return *(S.top - 1);
}
```

#### 链栈

```c
typedef struct StackNode
{
	ElemType data;
	struct StackNode *next;
} StackNode, *LinkStack;
```

##### 初始化

1. 没必要设头结点，直接将栈顶指针置空

```c
Status InitStack(LinkStack &S)
{
	S = NULL;
	return OK;
}
```

##### 入栈
不需要判断是否满

1. 为入栈元素 e 分配空间，用指针 p 指向
2. 将新结点数据域置为 e
3. 将新结点插入栈顶
4. 修改栈顶指针为 p

```c
Status Push(LinkStack &S, SElemType e)
{
	p = new StackNode;
	p->data = e;
	p->next = S;
	S = p;
	return OK;
}
```

##### 出栈

1. 判断栈是否为空，若空返回 ERROR
2. 将栈顶元素赋给 e
3. 临时保存栈顶元素的空间，以备释放
4. 修改栈顶指针，指向新的栈顶元素
5. 释放原栈顶元素的空间

```c
Status Pop(LinkStack &S, SElemType &e)
{
	if (S = NULL) return ERROR;
	e = S->data;
	p = S;
	S = S->next;
	delete p;
	return OK;
}
```

##### 取栈顶元素

```c
SElemType GetTop(LinkStack S)
{
	if (S != NULL)
		return S->data;
}
```

### 栈与递归

**分治法**
1. 能将一个问题转变成一个新问题，解法相同或类同，不同的仅是处理的对象，并且这些处理对象更小且变化有规律
2. 可以通过转化而使问题简化
3. 必须有一个明确的递归出口，或称为递归的边界

```c
void p(参数表)
{
	if (递归结束条件成立) 可直接求解;
	else p(较小的参数);
}
```

如果当递归结束条件成立，只执行 `return` 操作时，分治法可以化简为

```c
void p(参数表)
{
	if (递归结束条件不成立)
		p(较小的参数);
}
```

{% note %}

e.g. 遍历输出链表

```c
void TraverseList(LinkList p)
{
	if (p)
	{
		cout << p->data << endl;
		TraverseList(p->next);
	}
}
```


{% endnote %}

{% note success %}

e.g. 汉诺塔问题

* 问题描述
	1. 每次只能移动一个圆盘
	2. 圆盘可以插在 A、B、C 中任一塔座上
	3. 任何时刻都不能将一个较大的圆盘压在较小的圆盘之上

* 问题分析
设 A 柱上最初的盘子总数为 n，则当 n=1 时，只要将编号为 1 的圆盘从塔座 A 直接移至 C 上即可；否则，执行以下
	1. 用 C 柱做过渡，将 A 柱上的 (n-1) 个盘子移到 B 柱上
	2. 将 A 柱上最后一个盘子直接移到 C 柱上
	3. 用 A 柱做过渡，将 B 柱上的 (n-1) 个盘子移到 C 柱上

* 算法步骤
	1. 如果 n=1，则直接将编号为 1 的圆盘从 A 移到 C，递归结束
	2. 否则
		* 递归，将 A 上编号为 1 至 n-1 的圆盘移到 B，C 做辅助塔
		* 直接将编号为 n 的圆盘从 A 移到 C
		* 递归，将 B 上编号为 1 至 n-1 的圆盘移到 C，A 做辅助塔

* 算法描述

```c
int m = 0;

void move(char A, int n, char C)
{
	cout << ++m << ", " << n << ", " << A << ", " C << endl;
}

void Hanoi(int n, char A, char B, char C)
{
	if (n == 1) move(A, 1, C);
	else
	{
		Hanoi(n-1, A, C, B);
		move(A, n, C);
		Hanoi(n-1, B, A, C);
	}
}
```
O(2<sup>n</sup>)

{% endnote %}

### 队列的表示和操作

<pre>
ADT Queue<br>
{<br>
	数据对象：D = {a<sub>i</sub> | a<sub>i</sub>∈ElemSet, i = 1, 2, …, n, n ≥ 0}<br>
	数据关系：R = {<a<sub>i-1</sub>, a<sub>i</sub>> | a<sub>i-1</sub>, a<sub>i</sub>∈D, i = 2, …, n}<br>
			约定其中 a<sub>i</sub> 端为队列头，a<sub>n</sub> 为队列尾<br>
	基本操作：<br>
		InitQueue(&Q)<br>
			操作结果：构造一个空队列 Q<br>
		DestroyQueue(&Q)<br>
			初始条件：队列 Q 已存在<br>
			操作结果：队列 Q 被销毁<br>
		ClearQueue(&Q)<br>
			初始条件：队列 Q 已存在<br>
			操作结果：将 Q 清为空队列<br>
		QueueEmety(Q)<br>
			初始条件：队列 Q 已存在<br>
			操作结果：若 Q 为空队列，则返回 true，否则返回 false<br>
		QueueLength(Q)<br>
			初始条件：队列 Q 已存在<br>
			操作结果：返回 Q 的元素个数，即队列的长度<br>
		GetHead(Q)<br>
			初始条件：Q 为非空队列<br>
			操作结果：返回 Q 的队头元素<br>
		EnQueue(&Q, e)<br>
			初始条件：队列 Q 已存在<br>
			操作结果：插入元素 e 为 Q 的新队尾元素<br>
		DeQueue(&Q, &e)<br>
			初始条件：Q 为非空队列<br>
			操作结果：删除 Q 的队头元素，并用 e 返回其值<br>
		QueueTraverse(Q)<br>
			初始条件：Q 已存在且非空<br>
			操作结果：从队头到队尾，依次对 Q 的每个数据元素访问<br>
} ADT Queue<br>
</pre>

#### 循环队列——队列的顺序表示和实现

```c
#define MAXQSIZE 100
typedef struct
{
	QElemType *base;	// 存储空间的基地址
	int front;			// 头指针
	int rear;			// 尾指针
} SqQueue
```
初始化时，令 `front = rear = 0`；每当有新的队尾元素时，尾指针 rear 加一；每当删除队列队头元素时，头指针 front 加一

* 假溢出：溢出 base
* 解决方案：通过取模实现头尾指针的循环
* 同时带来的问题：循环队列不能以头、尾指针的值是否相同来判别队列是否为空
* 处理方法

{% note info %}

少用一个元素空间，即队列空间大小为 m 时，有 m-1 个元素就认为是队满。这样判断队空的条件不变，即当头、尾指针的值相同时，则认为队空；而当尾指针在循环意义上加 1
后是等于头指针，则认为队满

* 队空的条件：`Q.front == Q.rear`
* 队满的条件：`(Q.rear + 1) % MAXQSIZE == Q.front`

{% endnote %}

{% note info %}

设一个标志位以区别队列是空还是满

{% endnote %}

##### 初始化

1. 为队列分配一个最大容量为 MAXQSIZE 的数组空间，base 指向数据空间的首地址
2. 头指针和尾指针置为零，表示队列为空

```c
Status InitQueue(SqQueue &Q)
{
	Q.base = new QElemType[MAXQSIZE];
	if (!Q.base) exit(OVERFLOW);
	Q.front = Q.rear = 0;
	return OK;
}
```

##### 求队列长度

```c
int QueueLength(SqQueue Q)
{
	return (Q.rear - Q.front + MAXQSIZE) % MAXQSIZE;
}
```

##### 入队

1. 判断队列是否满，若满返回 ERROR
2. 将新元素插入队尾
3. 队尾指针加 1

```
Status EnQueue(SqQueue &Q, QElemType e)
{
	if ((Q.rear + 1) % MAXQSIZE == Q.front)
		return ERROR;
	Q.base[Q.rear] = e;
	Q.rear = (Q.rear + 1) % MAXQSIZE;
	return OK;
}
```

##### 出队

1. 判断队列是否为空，若空返回 ERROR
2. 保存队头元素
3. 队头指针加 1

```c
Status DeQueue(SqQueue &Q, QElemType &e)
{
	if (Q.front == Q.rear) return ERROR;
	e = Q.base[Q.front];
	Q.front = (Q.front + 1) % MAXQSIZE;
	return OK;
}
```

##### 取队头元素

```c
QElemType GetHead(SqQueue Q)
{
	if (Q.front != Q.rear)
		return Q.base[Q.front];
}
```

#### 链队——队列的链式表示和实现

```c
typedef struct QNode
{
	QElemType data;
	struct QNode *next;
} QNode, *QueuePtr;
type struct
{
	QueuePtr front;
	QueuePtr rear;
} LinkQueue;
```

##### 初始化

1. 生成新结点作为头结点，队头和队尾指针指向此结点
2. 头结点的指针域置空

```c
Status InitQueue(LinkQueue &Q)
{
	Q.front = Q.rear = new QNode;
	Q.front->next = NULL;
	return OK;
}
```

##### 入队

1. 为入队元素分配结点空间，用指针 p 指向
2. 将新结点数据域置为 e
3. 将新结点插入到队尾
4. 修改队尾指针为 p

```c
Status EnQue(LinkQueue &Q, QElemType e)
{
	p = new QNode;
	p->data = e;
	p->next = NULL;
	Q.rear ->next = p;
	Q.rear = p;
	return OK;
}
```

##### 出队

1. 判断队列是否为空，若空返回 ERROR
2. 临时保存队头元素的空间，以备释放
3. 修改头结点的指针域，指向下一个结点
4. 判断出队元素是否为最后一个元素，若是，则将队尾指针重新赋值，指向头结点
5. 释放原队头元素的空间

```c
Status DeQueue(LinkQueue &Q, QElemType &e)
{
	if (Q.front == Q.rear) return ERROR;
	p = Q.front->next;
	e = p->data;
	Q.front->next = p->next;
	if (Q.rear == p) Q.rear = Q.front;
	delete p;
	return OK;
}
```

##### 取队头元素

```c
QElemType GetHead(LinkQueue Q)
{
	if (Q.front != Q.rear)
		return Q.front->next->data;
}
```

## 串、数组和广义表

### 串

**串** string （或**字符串**）由零个或多个字符组成的有限序列，一般记为

{% note %}

s = "a<sub>i</sub>a<sub>2</sub> … a<sub>n</sub>" (n ≥ 0)

{% endnote %}

串中字符的数目 n 称为串的 **长度**
零个字符的串称为 **空串** null string `ø`

串中任意个连续的字符组成的子序列称为该串的 **子串**，包含子串的串称为 **主串**
通常称字符在序列中的序号为该字符在串中的 **位置**
两串 **相等**，当且仅当两个串的值相等

由一个或多个空格组成的串 `" "` 称为 **空格串** *blank string*

#### 抽象类型定义

<pre>
ADT String<br>
{<br>
	数据对象：D = {a<sub>i</sub> | a<sub>i</sub>∈CharacterSet, i = 1, 2, …, n, n≥0}<br>
	数据关系：R1 = {(a<sub>i-1</sub>, a<sub>i</sub>) | a<sub>i-1</sub>, a<sub>i</sub>∈D, i = 2, …, n}<br>
	基本操作：<br>
		StrAssign(&T, chars)<br>
			初始条件：chars 是字符串常量<br>
			操作结果：生成一个其值等于 chars 的串 T<br>
		StrCopy(&T, S)<br>
			初始条件：串 S 已存在<br>
			操作结果：由串 S 复制得串 T<br>
		StrEmpty(S)<br>
			初始条件：串 S 已存在<br>
			操作结果：若 S 为空串，则返回 true，否则返回 false<br>
		StrCompare(S, T)<br>
			初始条件：串 S 和串 T 已存在<br>
			操作结果：若 S > T，则返回值 > 0；若 S = T，则返回值 = 0；若 S < T，则返回值 < 0<br>
		StrLength(S)<br>
			初始条件：串 S 已存在<br>
			操作结果：返回 S 的元素个数，称为串的长度<br>
		ClearString(&S)<br>
			初始条件：串 S 已存在<br>
			操作结果：将 S 清为空串<br>
		Concat(&T, S1, S2)<br>
			初始条件：串 S1 和 S2 已存在<br>
			操作结果：用 T 返回由 S1 和 S2 联接而成的新串<br>
		SubString(&Sub, S, pos, len)<br>
			初始条件：串 S 已存在，1 ≤ pos ≤ StrLength(S) 且 0 ≤ len ≤ StrLength(S) - pos + 1<br>
			操作结果：用 Sub 返回串 S 的第 pos 个字符起长度为 len 的字串<br>
		Index(S, T. pos)<br>
			初始条件：串 S 和 T 已存在，T 是非空串，1 ≤ pos ≤ StrLength(S)<br>
			操作结果：若主串 S 中存在和串 T 值相同的子串，则返回它在主串中 S 中第 pos 个字符之后第一次出现的位置；否则函数值为 0<br>
		Replace(&S, T, V)<br>
			初始条件：串 S T V 已存在，T 是非空串<br>
			操作结果：用 V 替换主串 S 中出现的所有与 T 相等的不重叠的子串<br>
		StrInsert(&S, pos, T)<br>
			初始条件：串 S 和 T 已存在，1 ≤ pos ≤ StrLength(S) + 1<br>
			操作结果：在串 S 的第 pos 个字符之前插入串 T<br>
		StrDelete(&S, pos, len)<br>
			初始条件：串 S 已存在，1 ≤ pos ≤ StrLength(S) - len + 1<br>
			操作结果：从串 S 中删除第 pos 个字符起长度为 len 的子串<br>
		DestroyString(&S)<br>
			初始条件：串 S 已存在<br>
			操作结果：串 S 被销毁<br>
} ADT String<br>
</pre>

#### 存储结构

##### 顺序存储

```c
// 定长
#define MAXLEN 255
typedef struct
{
	char ch[MACLEN + 1];
	int lenth;
} SString;
```

```c
// 堆
typedef struct
{
	char *ch;
	int length;
} HString;
```

##### 链式存储

```c
#define CHUNKSIZE 80
typedef struct Chunk
{
	char ch[CHUNKSIZE];
	struct Chunk *next;
} Chunk;
typedef struct
{
	Chunk *head, *tail;
	int length;
} LString;
```

#### 模式匹配算法
子串的定位运算通常称为串的 **模式匹配** 或 **串匹配**

##### BF 算法
1. 分别利用计数指针 i 和 j 指示主串 S 和模式 T 中当前正待比较的字符位置，i 初始值为 pos，j 初始值为 1
2. 如果两个串均未比较到串尾，即 i 和 j 均分别小于等于 S 和 T 的长度时，循环之行
	* S.ch[i] 和 T.ch[j] 比较，若相等，则 i 和 j 分别指示串中下个位置，继续比较后续字符
	* 若不等，指针后退重新开始匹配，从主串的下一个字符 (i = i - j + 2) 起再重新和模式的第一个字符 (j = 1) 比较
3. 如果 j > T.length，说明模式 T 中第一个字符相等的字符在主串 S 中的序号 (i - T.length)；否则称匹配不成功，返回 0

```c
int Index_BF(SString S, SString T, int pos)
{
	i = pos; j = 1;
	while (i <= S.length && j <= T.length)
	{
		if (S.ch[i] == T.ch[j])
		{
			++i;
			++j;
		}
		else
		{
			i = i - j + 2;
			j = 1;
		}
	}
	if (j > T.length) return i - T.length;
	else return 0;
}
```

最好情况 O(m + n)
最坏情况 O(m * n)

##### KMP 算法

Knuth, Morris, Pratt 共同设计实现的
改进在于，每当一趟匹配过程中出现字符比较不等时，不需回溯 i 指针，而是利用已经得到的“部分匹配”的结果将模式向右“滑动”尽可能远的一段距离后，继续进行比较

O(m + n)

### 数组

#### 类型定义

类型相同
可以通过下标访问数据元素
当每个元素处于 n (n ≥ 1) 个关系中，称为 n 维数组

<pre>
ADT Array<br>
{<br>
	数据对象: j<sub>i</sub> = 0, ..., b<sub>i</sub> - 1, i = 1, 2, ..., n, D = {a<sub>j<sub>1</sub>j<sub>2</sub>...j<sub>n</sub></sub> | n (> 0) 称为数组的维数，b<sub>i</sub> 是数组第 i 维的长度，j<sub>i</sub> 是数组元素第 i 维的下标，a<sub>j<sub>1</sub>j<sub>2</sub>...j<sub>n</sub></sub> ∈ Elemset}<br>
	数据关系: R = {R1, R2, ..., Rn}<br>
	基本操作:<br>
		InitArray(&A, n, boundi, ..., doundn)<br>
			操作结果：若维数 n 和各维长度合法，则构造相应的数组 A，并返回 OK<br>
		DestroyArray(&A)<br>
			操作结果：销毁数组 A<br>
		Value(A, &e, indexl, ..., indexn)<br>
			初始条件：A 是 n 维数组，e 为元素变量，随后是 n 个下标值<br>
			操作结果：若各下标不超界，则 e 赋值为所指定的 A 的元素值，并返回 OK<br>
		Assign(&A, e, indexl, ..., indexn)<br>
			初始条件：A 是 n 维数组，e 为元素变量，随后是 n 个下标值<br>
			操作结果：若下标不越界，则将 e 的值赋给所指定的 A 的元素，并返回 OK<br>
} ADT Array<br>
</pre>

#### 顺序存储

一旦建立了数组，结构中的数据元素个数和元素之间的关系就不再发生变动
在大部分语言中，都是以行序为主序的存储结构，而在如 FORTRAN 语言中，以列序为主序

LOC(i, j) = LOC(0, 0) + (n x i + j)L

#### 特殊矩阵的压缩存储

* 对称矩阵
* 三角矩阵
* 对角矩阵
* 稀疏矩阵（较复杂

### 广义表

#### 定义

线性表的推广，也称为列表
LS = (a<sub>1</sub>, a<sub>2</sub>, ..., a<sub>n</sub>)，其中 a<sub>i</sub>可以是单个元素，也可以是广义表，分别称为广义表 LS 的原子和子表
习惯上，用大写字母表示广义表的名称，用小写字母表示原子

定义是一个**递归**的过程
重要结论：
1. 广义表的元素可以是子表，子表的元素还可以是子表
2. 广义表可以为其他广义表所共享（指可以不必列出子表的值，而是通过子表的名称来引用
3. 广义表可以是一个递归的表，即可以是本身的一个子表

最重要的两个运算：
1. 取表头 GetHead(LS): 取出的表头为非空广义表的第一个元素，可以是单原子，也可以是一个子表
2. 取表尾 GetTail(LS): 取出的表尾为除去表头之外，由其余元素构成的表，即一定是一个广义表

() 和 (()) 不同

#### 存储结构

通常采用链式存储结构

##### 头尾链表的存储结构

* 表结点：标志域、指示表头的指针域、指示表尾的指针域
* 原子结点标志域、值域

```c
typedef enum{ATOM, LIST} ElemTag;	// ATOM == 0: 原子, LIST == 1: 子表
typedef struct GLNode
{
	ElemTag tag;
	union
	{
		AtomType atom;
		struct
		{
			struct GLNode *hp, *tp;
		} ptr;
	}
} *GList;
```

1. 除空表的表头指针为空外，对任何非空广义表，其表头指针均指向一个表结点，且该结点中的 hp 域指示广义表表头（或为原子结点，或为表结点），tp 域指向广义表表尾（除非表尾为空，则指针为空，否则必为表结点
2. 容易分清列表中原子和子表所在层次
3. 最高层的表结点个数即为广义表的长度

##### 扩展线性链表的存储结构

无论是原子结点还是表结点均由三个域组成，原子结点增加一个 tp

## 树和二叉树

### 定义

#### 树

**树** *Tree* 是 n (n ≥ 0) 个结点的有限集，或为空树 (n = 0)，或为非空树
对于非空树 T：
1. 有且仅有一个称之为根的结点
2. 除根结点外的其余结点可分为 m (m > 0) 个互不相交的有限集 T<sub>1</sub>, T<sub>2</sub>, ..., T<sub>m</sub>，其中每个集合本身又是一棵树，并称为根的**子树** *SubTree*

#### 基本术语

* **结点**：树中的一个独立单元，包含一个数据元素及若干指向其子树的分支
* **结点的度**：结点拥有的子树数
* **树的度**：树内各结点度的最大值
* **叶子**：度为 0 的结点（或称为终端结点
* **非终端结点**：度不为 0 的结点（或称为分支结点，除根结点外，非终端结点也称为内部结点
* **双亲和孩子**：结点的子树的根称为该结点的孩子，相应的，该结点称为孩子的双亲
* **兄弟**：同一个双亲的孩子之间互称兄弟
* **祖先**：从根到该结点所经分支上的所有节点
* **子孙**：以某结点为根的子树中的任一结点
* **层次**：结点的层次从根开始定义起，根为第一层
* **堂兄弟**：双亲在同一层的结点互为堂兄弟
* **树的深度**：树中结点的从最大层次（或称为树的高度
* **有序树和无序树**：从左到右是有次序的（不能交换），称为有序树，最左边的子树的根称为第一个孩子
* **森林**：m (m ≥ 0) 棵互不相交的树的集合。对树中的每个结点而言，其子树的集合即为森林

就逻辑结构而言，任何一棵树都是一个二元组 Tree = (root, F)

#### 二叉树

二叉树 *Binary Tree* 是 n (n ≥ 0) 个结点所构成的集合
对于非空树 T：
1. 有且仅有一个称之为根的结点
2. 除根结点之外的其余结点分为两个互不相交的子集 T<sub>1</sub> 和 T<sub>2</sub>，分别称为 T 的左子树和右子树，且 T<sub>1</sub> 和 T<sub>2</sub> 本身又都是二叉树

与树的区别：
1. 二叉树每个结点至多只有两颗子树（即不存在度大于 2 的结点
2. 二叉树的子树有左右之分，其次序不能任意颠倒

#### 抽象数据类型定义

<pre>
ADT Tree<br>
{<br>
	数据对象：D 是具有相同特性的数据元素的集合<br>
	基本操作：<br>
		InitTree(&T)<br>
			操作结果：构造空树 T<br>
		DestroyTree(&T)<br>
			初始条件：树 T 存在<br>
			操作结果：销毁树 T<br>
		CreateTree(&T, definition)<br>
			初始条件：definition 给出树 T 的定义<br>
			操作结果：按 definition 构造树 T<br>
		Cleartree(&T)<br>
			初始条件：树 T 存在<br>
			操作结果：将树 T 清为空树<br>
		TreeEmpty(T)<br>
			初始条件：树 T 存在<br>
			操作结果：若 T 为空树，则返回 true，否则 false<br>
		TreeDepth(T)<br>
			初始条件：树 T 存在<br>
			操作结果：返回 T 的深度<br>
		Root(T)<br>
			初始条件：树 T 存在<br>
			操作结果：返回 T 的根<br>
		Value(T, cur_e)<br>
			初始条件：树 T 存在，cur_e 是 T 中某个结点<br>
			操作结果：返回 cur_e 的值<br>
		Assign(T, cur_e, value)<br>
			初始条件：树 T 存在，cur_e 是 T 中某个结点<br>
			操作结果：结点 cur_e 赋值为 value<br>
		Parent(T, cur_e)<br>
			初始条件：树 T 存在，cur_e 是 T 中某个结点<br>
			操作结果：若 cur_e 是 T 的非根结点，则返回它的双亲，否则函数值为空<br>
		LeftChild(T, cur_e)<br>
			初始条件：树 T 存在，cur_e 是 T 中的某个结点<br>
			操作结果：若 cur_e 是 T 的非叶子结点，则返回它的最左孩子，否则返回空<br>
		RightSibling(T, cur_e)<br>
			初始条件：树 T 存在，cur_e 是 T 中某个结点<br>
			操作结果：若 cur_e 有右兄弟，则返回它的右兄弟，否则函数值为空<br>
		InsertChild(&T, p, i, c)<br>
			初始条件：树 T 存在，p 指向 T 中某个结点，1 ≤ i ≤ p 所指结点的度 +1，非空树 c 与 T 不相交<br>
			操作结果：插入 c 为 T 中 p 所指结点的第 i 棵子树<br>
		DeleteChild(&T, p, i)<br>
			初始条件：树 T 存在，p 指向 T 中某个结点，1 ≤ i ≤ p 所指结点的度<br>
			操作结果：删除 T 中 p 所指结点的第 i 棵子树<br>
		TraverseTree(T)<br>
			初始条件：树 T 存在<br>
			操作结果：按某种次序对 T 的每个结点访问一次<br>
} ADT Tree<br>
</pre>

<pre>
ADT BinaryTree<br>
{<br>
	数据对象：D 是具有相同特性的数据元素的集合<br>
	基本操作：<br>
		InitBiTree(&T)<br>
			操作结果：构造空二叉树 T<br>
		DestroyBiTree(&T)<br>
			初始条件：二叉树 T 存在<br>
			操作结果：销毁二叉树 T<br>
		CreateBiTree(&T, definition)<br>
			初始条件：definition 出二叉树 T 的定义<br>
			操作结果：按 definition 构造二叉树 T<br>
		ClearBiTree(&T)<br>
			初始条件：二叉树存在<br>
			操作结果：将二叉树 T 清为空树<br>
		BiTreeEmpty(T)<br>
			初始条件：二叉树 T 存在<br>
			操作结果：若 T 为空二叉树，则返回 true，否则 false<br>
		BiTreeDepth(T)<br>
			初始条件：二叉树 T 存在<br>
			操作结果：返回 T 的深度<br>
		Root(T)<br>
			初始条件：二叉树 T 存在<br>
			操作结果：返回 T 的根<br>
		Value(T, e)<br>
			初始条件：二叉树 T 存在，e 是 T 中某个结点<br>
			操作结果：返回 e 的值<br>
		Assign(T, &e, value)<br>
			初始条件：二叉树 T 存在，e 是 T 中某个节点<br>
			操作结果：结点 e 赋值为 value<br>
		Parent(T, e)<br>
			初始条件：二叉树 T 存在，e 是 T 中某个结点<br>
			操作结果：若 e 是 T 的非根结点，则返回它的双亲，否则返回空<br>
		LeftChild(T, e)<br>
			初始条件：二叉树 T 存在，e 是 T 中某个结点<br>
			操作结果：返回 e 的左孩子，若 e 无左孩子，则返回空<br>
		RightChild(T, e)<br>
			初始条件：二叉树 T 存在，e 是 T 中某个结点<br>
			操作结果：返回 e 的右孩子，若 e 无右孩子，则返回空<br>
		LeftSibling(T, e)<br>
			初始条件：二叉树 T 存在，e 是 T 中某个结点<br>
			操作结果：返回 e 的左兄弟，若 e 是 T 的左孩子或无左兄弟，则返回空<br>
		RightSibling(T, e)<br>
			初始条件：二叉树 T 存在，e 是 T 中某个结点<br>
			操作结果：返回 e 的右兄弟，若 e 是 T 的右孩子或无右兄弟，则返回空<br>
		InsertChild(&T, p, LR, c)<br>
			初始条件：二叉树 T 存在，p 指向 T 中某个结点，LR 为 0 或 1，非空二叉树 c 与 T 不相交且右子树为空<br>
			操作结果：根据 LR 为 0 或 1，插入 c 为 T 中 p 所指结点的左或右子树，p 所指结点的原有左或右子树则成为 c 的右子树<br>
		DeleteChild(&T, p, LR)<br>
			初始条件：二叉树 T 存在，p 指向 T 中某个结点，LR 为 0 或 1<br>
			操作结果：根据 LR 为 0 或 1，删除 T 中 p 所指结点的左或右子树<br>
		PreOrderTraverse(T)<br>
			初始条件：二叉树 T 存在<br>
			操作结果：先序遍历 T，对每个结点访问一次<br>
		InOrderTraverse(T)<br>
			初始条件：二叉树 T 存在<br>
			操作结果：中序遍历 T，对每个结点访问一次<br>
		PostOrderTraverse(T)<br>
			初始条件：二叉树 T 存在<br>
			操作结果：后序遍历 T，对每个结点访问一次<br>
		LevelOrderTraverse(T)<br>
			初始条件：二叉树 T 存在<br>
			操作结果：层序遍历 T，对每个结点访问一次<br>
} ADT BinaryTree<br>
</pre>

#### 二叉树性质

1. 在二叉树的第 i 层上至多有 2<sup>i - 1</sup> 个结点 (i ≥ 1)
2. 深度为 k 的二叉树至多有 w<sup>k</sup> - 1 个结点 (i ≥ 1)
3. 对任何一棵二叉树 T，如果其终端结点数 n<sub>0</sub>，度为 2 的结点数为 n<sub>2</sub>，则 n<sub>0</sub> = n<sub>2</sub> + 1

{% note info %}

* 满二叉树：深度为 k 且含有 2<sup>k</sup> - 1 个结点的二叉树
	- 特点：
		* 每一层上的结点数都是最大结点数，即每一层 i 的结点数都具有最大值 2<sup>i - 1</sup>

* 完全二叉树：深度为 k 的，有 n 个结点的二叉树，当且仅当其每一个结点都与深度为 k 的满二叉树中编号从 1 至 n 的结点一一对应
	- 特点：
		1. 叶子结点只可能在层次最大的两层上出现
		2. 对任一结点，若其右分支下的子孙的最大层次为 l，则其左分支下的子孙的最大层次必为 l 或 l + 1

{% endnote %}

4. 具有 n 个结点的完全二叉树的深度为 ⌊log<sub>2</sub>n⌋ + 1
5. 如果对一棵有 n 个结点的完全二叉树的结点按层序编号，则对任一结点 i (1 ≤ i ≤ n) 有
	1. 如果 i = 1，则结点 i 是二叉树的根，无双亲；如果 i > 1，则其双亲 PARENT(i) 是结点 ⌊i / 2⌋
	2. 如果 2i > n，则结点 i 无左孩子（结点 i 为叶子结点）；否则其左孩子 LCHILD(i) 是结点 2i
	3. 如果 2i + 1 > n，则结点 i 无右孩子；否则其右孩子 RCHILD(i) 是结点 2i + 1

#### 二叉树存储结构

##### 顺序存储结构

```c
#define MAXTSIZE 100
typedef TElemType SqBiTree[MAXTSIZE];		// 0 号单元存储根结点
SqBiTree bt;
```

**仅适用于完全二叉树**，因为在最坏的情况下，一个深度为 k 且只有 k 个结点的单支树（树中不存在度为 2 的结点）却需要长度为 2<sup>k</sup> - 1 的一维数组

##### 链式存储结构

二叉链表包含：
* 数据域
* 左右指针域

三叉链表增加一个指向双亲结点的指针域
在含有 n 个结点的二叉链表中有 n + 1 个空链域，可以利用这些空链域存储其他有用信息，从而得到**线索链表**

```c
typedef struct BiTNode
{
	TElemType data;
	struct BiTNode *lchild, *rchild;
} BiTNode, *BiTree;
```

### 二叉树遍历和线索二叉树

#### 遍历

*traversing binary tree*
* DLR
* LDR
* LRD
* DRL
* RDL
* RLD

{% note info %}

先序遍历

若二叉树为空，则空操作；否则
1. 访问根结点
2. 先序遍历左子树
3. 先序遍历右子树

{% endnote %}

{% note info %}

中序遍历

若二叉树为空，则空操作；否则
1. 中序遍历左子树
2. 访问根结点
3. 中序遍历右子树

{% endnote %}

{% note info %}

后序遍历

若二叉树为空，则空操作；否则
1. 后序遍历左子树
2. 后序遍历右子树
3. 访问根结点

{% endnote %}

##### 中序遍历

递归算法
```c
void InOrderTraverse(BiTree T)
{
	if (T)
	{
		InOrderTraverse(T->lchild);
		cout << T->data;
		InOrderTraverse(T->rchild);
	}
}
```

非递归算法
1. 初始化一个空栈 S，指针 p 指向根结点
2. 申请一个结点空间 q，用来存放栈顶弹出的元素
3. 当 p 非空或者栈 S 非空时，循环执行以下操作：
	* 如果 p 非空，则将 p 进栈，p 指向该结点的左孩子
	* 如果 p 为空，则弹出栈顶元素并访问，将 p 指向该结点的右孩子

```c
void InOrderTraverse(BiTree T)
{
	InitStack(S); p = T;
	q = new BiTNode;
	while (p || !StackEmpty(S))
	{
		if (p)
		{
			Push(S, p);
			p = p->lchild;
		}
		else
		{
			Pop(S, q);
			cout << q->data;
			p = q->rchild;
		}
	}
}
```

时间空间都为 O(n)

##### 先序遍历的顺序创建二叉链表

1. 扫描字符序列，读入字符 ch
2. 如果 ch 是一个 '#' 字符，则表明该二叉树为空，即 T 为 NULL；否则执行以下操作
	* 申请一个结点空间 T
	* 将 ch 赋给 `T->data`
	* 递归创建 T 的左子树
	* 递归创建 T 的右子树

```c
void CreateBiTree(BiTree &T)
{
	cin >> ch;
	if (ch == '#')
		T = NULL;
	else
	{
		T = new BiTNode;
		T->data = ch;
		CreateBiTree(T->lchild);
		CreateBiTree(T->rchild);
	}
}
```

##### 复制二叉树

如果是空树，递归结束，否则执行以下操作：
* 申请一个新结点空间，复制根结点
* 递归复制左子树
* 递归复制右子树

```c
void Copy(BiTree T, BiTree &NewT)
{
	if (T == NULL)
	{
		NewT = NULL;
		return;
	}
	else
	{
		NewT = new BiTNode;
		NewT->data = T->data;
		Copy(T->lchild, NewT->lchild);
		Copy(T->rchild, NewT->rchild);
	}
}
```

##### 计算二叉树深度

如果是空树，递归结束，深度为 0，否则执行以下操作：
* 递归计算左子树的深度记为 m
* 递归计算右子树的深度记为 n
* 如果 m 大于 n，二叉树的深度为 m + 1，否则为 n + 1

```c
int Depth(BiTree T)
{
	if (T == NULL)
		return 0;
	else
	{
		m = Depth(T->lchild);
		n = Depth(T->rchild);
		if (m > n)
			return (m + 1);
		else
			return (n + 1);
	}
}
```

##### 统计二叉树中结点的个数

```c
int NodeCount(BiTree T)
{
	if (T == NULL)
		return 0;
	else
		return NodeCount(T->lchild) + NodeCount(T->rchild) + 1;
}
```

#### 线索二叉树

如果有 n 个结点的二叉链表中必定存在  n + 1 个空链域，因此可以充分利用这些空链域来存放结点的前驱和后继信息

{% note info %}

试做如下规定：
若结点有左子树，则其 lchild 域指示其左孩子，否则令 lchild 域指示其前驱
若结点有右子树，则其 rchild 域指示其右孩子，否则令 rchild 域指示其后继
为了避免混淆，需要改变结点结构，增加两个标志域，

| lchild | LTag | data | RTag | rchild |
|--------|------|------|------|--------|

其中

`LTag =`
* 0 lchild 域表示结点的左孩子
* 1 lchild 域表示结点的前驱

`RTag` 同理

{% endnote %}

```c
typedef struct BiThrNode
{
	TElemType data;
	struct BiThrNode *lchild, *rchild;
	int LTag, RTag;
} BiThrNode, *BiThrNode;
```

* **线索链表**：以这种结点结构构成的二叉链表
* **线索**：其中指向结点前驱和后继的指针
* **线索二叉树** (Threaded Binary Tree)：加上线索的二叉树
* **线索化**：对二叉树以某种次序遍历使其次序遍历使其变为线索二叉树的过程

### 树和森林

#### 树的存储结构

##### 双亲表示法

以一组连续的存储单元存储树的结点，每个结点除了数据域 *data* 外，还附设一个 *parent* 域用以指示其双亲结点的位置

##### 孩子表示法

由于树中每个结点可能有多棵子树，则可用多重链表，即每个结点有多个指针域

若不存储 *degree*，则多重链表中的结点是同构的。会有很多空链域，空间较浪费。一棵有 n 个结点度为 k 的树中必有 n(k - 1) + 1 个空链域
若存储 *degree*，则多重链表中的结点是不同构的。虽然节约存储空间，但操作不方便

另一种办法是，把每个结点的孩子结点排列起来，看成是一个线性表，且以单链表做存储结构，则 n 个结点有 n 个孩子链表（叶子的孩子链表为空表）。而 n 个头指针又组成一个线性表，为了便于查找，可采用顺序存储结构

{% endnote %}
