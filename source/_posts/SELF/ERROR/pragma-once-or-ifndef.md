---
title: '#pragma once OR #ifndef'
date: 2020-07-10 16:42:47
tags: [CODE, C/C++, SUMMERTERM, ERROR]
description: Both of them are MACRO in c/c++, but do you know the DIFFERENCES?

---

{% note warning %}

起因是有人跟我说两个文件互相 `#include` 了，导致重定义

所以才想起来去查查两个的区别

第一次看到 `#pragma once` 是看 **杜** 传 **GitHub** 上的他们小组做的疫情扩散模拟程序

莫大佬在 h 文件里写的这个宏

当时查资料只看到了说

```cpp
#pragma once
```

与

```cp
#ifndef _H_
#define _H_

#endif
```

是相同作用，但是不知道两个区别，也不知道为什么要有一个新的宏来做这个事情

前两天再查才看到

放个[原文链接](https://www.cnblogs.com/Braveliu/archive/2012/12/29/2838726.html)，没有标明原创或者转载，姑且当他是原创吧

{% note success %}

### #ifndef

`#ifndef` 的方式受 C/C++ 语言标准支持。它不仅可以保证同一个文件不会被包含多次，也能保证内容完全相同的两个文件（或者代码片段）不会被不小心同时包含。

当然，缺点就是如果不同头文件中的宏名不小心“撞车”，可能就会导致你看到头文件明明存在，但编译器却硬说找不到声明的状况——这种情况有时非常让人郁闷。

由于编译器每次都需要打开头文件才能判定是否有重复定义，因此在编译大型项目时，ifndef会使得编译时间相对较长，因此一些编译器逐渐开始支持 `#pragma once` 的方式。

### #pragma once

`#pragma once` 一般由编译器提供保证：同一个文件不会被包含多次。注意这里所说的“同一个文件”是指物理上的一个文件，而不是指内容相同的两个文件。

你无法对一个头文件中的一段代码作 `#pragma once` 声明，而只能针对文件。

其好处是，你不必再担心宏名冲突了，当然也就不会出现宏名冲突引发的奇怪问题。大型项目的编译速度也因此提高了一些。

对应的缺点就是如果某个头文件有多份拷贝，本方法不能保证他们不被重复包含。当然，相比宏名冲突引发的“找不到声明”的问题，这种重复包含很容易被发现并修正。

另外，这种方式不支持跨平台！

{% endnote %}

{% endnote %}