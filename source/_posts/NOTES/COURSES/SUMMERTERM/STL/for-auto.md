---
title: for auto
date: 2020-08-05 10:07:12
tags: [C/C++, CODE, NOTE, STL]
description: "for (auto i : v) in C++"

---

{% note warning %}

C++ 的这个特性我是在看 STL 的时候了解到的，整个小学期也一直在用，但是当时有地方没弄明白
现在重新去单独看了这个

---

## 普通形式

```cpp
string s = "augists";
for (auto i : s)
	i = toupper(i);
```
在语句 `for (auto i : s)` 中，i 会作为 s 的迭代器的每个取值的副本进行遍历
也就是说，这个循环相当于

```cpp
for (auto p = s.begin(); p != s.end(); ++p)
{
	auto i = *p;
	i = toupper(i);
}
```

这也能看出来，i 每次是作为一个新的变量只拿到了值，而非指针或引用，不能修改原值

---

## 引用形式

想要能修改原值，改成引用就好了呀

```cpp
string s = "augists";
for (auto &i : s)
	i = toupper(i);
```

---

{% endnote %}
