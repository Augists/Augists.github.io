---
title: ArrayList
date: 2020-05-31 10:13:42
tags: [CODE, NOTE, C/C++, DATASTRUCTURE]
description: ArrayList in c language (originally posted on CSDN)

---

# c语言变长（动态）数组 ArrayList

## 缘起

在c语言的程序设计中，想要实现对一个数组的长度的动态变化其实是比较困难的，并且也是低效且不尽实用的。但是看到别人在做arraylist时，我决定将网课上所学习的变长数组放上来。另一方面，正是由于变长数组的缺点使得我们可以引入链表的学习。

[java实现arraylist](https://blog.csdn.net/Woo_home/article/details/103177912)

## 代码

#### h文件中的代码样例

```c

#ifndef __ARRAY_H__
#define __ARRAY_H__

typedef struct
{
    int *array;
    int size;
} Array;

Array array_create(int init_size);
void array_free(Array *a);
int array_size(const Array *a);
int *array_at(Array *a, int index);
void array_inflate(Array *a, int more_size);

#endif /* _____h */

```

#### c文件中的代码样例


```c

#include "变长数组.h"
#include <stdio.h>
#include <stdlib.h>

#define BLOCK_SIZE 20

//typedef struct
//{
//    int *array;
//    int size;
//} Array;

Array array_create(int init_size)
{
    Array a;

    a.size = init_size;
    a.array = (int *)malloc(sizeof(int) * a.size);

    return a;
}

void array_free(Array *a)
{
    free(a->array);
    a->array = NULL;
    a->size = 0;
}

int array_size(const Array *a)
{
    return a->size;
}

int *array_at(Array *a, int index)
{
    if (index >= a->size)
        array_inflate(a, (index / BLOCK_SIZE + 1) * BLOCK_SIZE - a->size);
    return &(a->array[index]);
}

void array_inflate(Array *a, int more_size)
{
    int *p = (int *)malloc(sizeof(int) * (a->size + more_size));
    for (int i = 0; i < a->size; ++i)
    {
        p[i] = a->array[i];
    }
    free(a->array);
    a->array = NULL;
    a->size += more_size;
}

```

## 缺点分析

1、变长

在进行较大的数组进行变长时，每次需要新建一个更大的数组（长度增大为 (index / BLOCK_SIZE + 1) * BLOCK_SIZE ，但是每次都需要进行拷贝操作，将原数组拷贝给更长的新数组然后释放原数组的内存。当变长操作需要多次重复的进行时，用变长数组的方式效率会大大降低。

2、内存

假设我们能使用的内存是有一定的大小限制的，使用变长数组的方式时，每次在原数组的后面新开一个更长的数组（若前面的已经被释放出的内存足够会在前面开）当数组长度非常大的时候，可能会因为前面的长度不够新开增长的数组，后面的内存又不够用，所以导致程序崩溃。也就是说，使用变长数组的方式进行储存，其实只能利用好所分配的内存的大约三分之一，这当然是一种既舍弃空间又缺乏时间的处理方式。

## 结语

由此，我们引入了[链表](../List-c)这种数据结构。

[⇒Next](../List-c)
