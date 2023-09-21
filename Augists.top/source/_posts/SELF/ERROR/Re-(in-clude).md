---
title: Re-(#in-clude)
date: 2020-07-17 22:25:04
tags: [C/C++, CODE, SUMMERTERM, ERROR]
description: So annoying bug disgusts me

---

{% note warning %}

之前写过一篇关于 `#ifndef` 与 `#pragma once` 的博客
但是事情好像不是那么简单

## 错误样例

A.h
```cpp
(#in-clude) "B.h"

class A : public B
{
};
```

B.h
```cpp
(#in-clude) "A.h"

class B
{
};
```

## 错误原因分析

如果我没记错，这种因为 h 文件互相引用而导致的重定义之前弄的我莫名其妙

按照之前看 `#ifnedf` 的解释，内容一样不应该被编译器重复添加而导致重定义
但是它确实就存在这样了
网上查询好像还没有找到合适的解释（我还没看官方文档，只看了 CSDN `(^_^)a`

## 解决方案

根据看到的一些文章，解决方案无非两种

### 尽量改为 cpp 文件引用

cpp 文件不会被再次引用，所以可以更放心的用 `#in-clude`
但是也要注意，cpp 文件的引用里可能会有冲突

### 改为类声明

在错误样例中，A.h 文件改为

```cp
class B;

class A : public B
{
};
```

对类B进行声明

{% endnote %}
