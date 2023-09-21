---
title: Double o List
date: 2020-05-31 10:18:07
tags: [CODE, NOTE, C/C++, DATASTRUCTURE]
description: Double Linked List in c (after List-c)

---

# 双向链表的c语言实现

## 引入

上一篇最后总结了单向链表的缺点，所以引入了双向链表。我认为双向链表相对于单向链表最大的优势就是省脑子，不需要再另有一个指针时时在前面。

[单向链表](../List-c)

## 代码实现

#### 问题描述

> Write a program to print students’ information (ID number, name, gender, and scores) by the order of their scores.

#### 实际代码（前部分）

###### 头文件和预处理部分

```c

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAXID 1
#define MAXNAME 15

```

###### 结构体定义

```c

typedef struct student
{
    int ID[MAXID];
    char name[MAXNAME];
    int gender;     /* 0 for boy, 1 for girl */
    float score;
    struct student *next;
    struct student *last;
} INF;

```

在学生ID的处理部分选择了int数组，其实应该用char数组会更像实际情况一点。因为只是实验所以MAXID只给了1位，所以int是一样的。后面应该做更改。

###### 声明部分

```c

void getinf(INF *p);
void add(INF *p);
void insert_sort(INF *p);
void freeall(INF *p);       /* find the last, free from the last to the first */
void print(INF *p);
void swap(INF *, INF *);

```

实际上在最终调试中，swap才是最困难的部分。这个会在最后的分析中指出。

###### main部分

```c

int main()
{
    printf("ID\tname\tgender\tscore\n");
    INF *start = (INF *)malloc(sizeof(INF));
    start->last = start->next = NULL;
    INF *p = start;
    getinf(p);
    int i = 0;
    while (i++ < 3)
    {
        add(p);
        p = p->next;
        if (!p)
        {
            printf("add error\n");
            return 1;
        }
        getinf(p);
    }
    p = start;
    insert_sort(p);
    for (; p; p = p->next)
        print(p);
    p = start;
    freeall(p);
}

```

测试只用了3次的输入，因为本来的代码在程序输入结束的部分始终无法终止。最终还是选择了固定次数的输入。

###### 函数部分的部分

insert_sort

```c

void insert_sort(INF *p)
{
    INF *start, *search;
    for (start = p->next; start->next; start = start->next)
    {
        for (search = start; search - p; search = search->last)
        {
            if (search->score > search->last->score)
            {
                swap(search, search->last);
            }
        }
    }           /* lose a time */
    for (search = start; search - p; search = search->last)
    {
        if (search->score > search->last->score)
        {
            swap(search, search->last);
        }
    }
}

```

swap

这里放一下一个版本的笨拙的swap。

```c

void swap(INF *first, INF *second)
{
    int tempID[MAXID];
    for (int i = 0; i < MAXID; ++i)
        tempID[i] = (first->ID)[i];
    for (int i = 0; i < MAXID; ++i)
        (first->ID)[i] = (second->ID)[i];
    for (int i = 0; i < MAXID; ++i)
        (second->ID)[i] = tempID[i];
    char ctemp[MAXNAME];
    strcpy(ctemp, first->name);
    strcpy(first->name, second->name);
    strcpy(second->name, ctemp);
    int itemp;
    itemp = first->gender;
    first->gender = second->gender;
    second->gender = itemp;
    float ftemp;
    ftemp = first->score;
    first->score = second->score;
    second->score = ftemp;
}

```

以上函数只是部分，也只是实现方式之一。

## 缺点分析

#### 排序

我们注意到，排序函数的终止条件并不是很好写。也就是说，这种双向链表的遍历无法顾及到最后一节（node）。所以在for的嵌套后，我们又加了一个循环给最后一个节点，虽然实际运行是一样的。

但是，如果用的是双向的循环链表，最终的终止条件会好很多。

#### 交换

在实际编写代码的过程中，我发现双向链表的swap非常的复杂。如果只交换指针的话，情况将分为很多种。

1. 两链表相邻

2. 两链表不相邻

3. 其中一个链表的last是NULL

4. 其中一个链表的next是NULL

5. 对两个是同一个的判断

6. 两链表分列头尾

7. 等等情况

最终，由于结构体不是很复杂，这里列出了最笨拙的一种方式

#### 其他方法

我们可以直接在输入的时候就开始插入。或者在最后排序的时候新建链表进行插入。这两种方法会好写很多。另外，如果用单向链表也并不复杂，建议自行尝试。

## 总结

双向链表其实对于单向链表来说优点并不明显，而又对于循环来说缺终止条件，对于交换来说又非常复杂。在实际情况中，视情况对数据结构进行选择。

**程序 = 数据结构 + 算法**

选择一个适合的数据结构，能很大程度上简化操作。

到此，三篇blog就结束了。我从变长数组开始进行实现和分析，最终到双向链表作结。重点不在于具体的数据结构怎么样，而在于对于数据结构的选择的思考。

**乘风破浪会有时，直挂云帆济沧海**
