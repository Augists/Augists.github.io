---
title: List c
date: 2020-05-31 10:16:45
tags: [CODE, NOTE, C/C++, DATASTRUCTURE]
description: List in c after ArrayList

---

# 链表的c语言实现

## 引入

上一篇在讨论变长数组的时候指明了变长数组的缺陷，由此我们引入了链表这种数据结构（linked-list）

[上一篇变长数组](../ArrayList)

（如此引用超链接也可以看作另一种链表）

## 链表的c语言实现

```c

#include <stdio.h>
#include <stdlib.h>

typedef struct _node
{
    int value;
    struct _node *next;
} Node;

typedef struct _list
{
    Node *head;
} List;

void add(List *pList, int number);
void print(List *pList);

int main()
{
    List list;
    list.head = NULL;
    int number;

    do
    {
        scanf("%d", &number);
        if (number != -1)
        {
            add(&list, number);
        }
    } while (number != -1);
    print(&list);
    scanf("%d", &number);
    Node *p;
    int isFound = 0;
    for (p = list.head; p; p = p->next)
    {
        if (p->value == number)
        {
            printf("找到了\n");
            isFound = 1;
            break;
        }
    }
    if (!isFound)
    {
        printf("没找到\n");
    }
    Node *q;
    for (q = NULL, p = list.head; p; q = p, p = p->next)
    {
        if (p->value == number)
        {
            if (q)
                q->next = p->next;
            else
                list.head = p->next;
            free(p);
            break;
        }
    }
    for (p = list.head; p; p = q)
    {
        q = p->next;
        free(p);
    }
    return 0;
}

void add(List *pList, int number)
{
    /* add to linked-list */
    Node *p = (Node *)malloc(sizeof(Node));
    p->value = number;
    p->next = NULL;
    /* find the last */
    Node *last = pList->head;
    if (last)
    {
        while (last -> next)
            last = last->next;
        /* attach */
        last->next = p;
    }
    else
        pList->head = p;
}

void print(List *pList)
{
    Node *p;
    for (p = pList->head; p; p = p->next)
    {
        printf("%d\t", p->value);
    }
    printf("\n");
}

```

## 对上面代码的解释

链表（单向）其实就是一个同时储存数值和指向下一个数值（其实是结构体）的结构体的链子，它的优势相比于变长数组来说也非常的明显。

### add

对于链表的add不会需要再像变长数组一样进行大量的copy操作。它只需要改指针所指向的地址，添加一个中间地址即可。

### delete

与add相似，链表的delete也其实是在指针上操作。需要注意的是，当你需要释放中间的Node并使上一个Node指向下一个Node时，需要新开一个*Node来存中间的Node，然后修改指针操作，最后free。

### print

相比于数组的打印，链表的操作看起来会复杂一点。但这并不影响链表在处理一些问题时比数组优秀很多。

### 关于代码中的list问题

由于add函数的理解问题，head = add(head,…)看起来不是很舒服，不便于理解，所以引入的list结构体。

## 缺点

1. 很多情况下不需要这么复杂的一个数据结构来处理问题

2. 单向链表在返回寻找的时候显得非常力不从心

由2，我们可以引入对[双向链表](../Double-o-List)的研究。

[⇒Next](../Double-o-List)
