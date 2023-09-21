---
title: The Relationship between Classes
date: 2020-05-30 23:02:20
tags: [CODE, SHARING]
description: It is a simple story I made for better understanding of class in c++
password: qwerty

---

# The Relationship of Class

## Basic

美国闭关锁国(**class America**)，只有持有绿卡的人才能随意访问美国的几个州(**private**)，但是所有人都可以看美国公开的信息，比如美国的网站等等(**public**)。

那么对于美国来说，只有持有绿卡(**成员函数**)才能随意访问各州(**private varible**)，而所有人都可以访问信息网站(**public varible**)。

## private permission

对于有绿卡(**member function**)来说，一种是有绿卡也在美国境内(**类内定义**)，另一种是有绿卡但是在国外(**类内声明类外定义**)。两种人都有绿卡(**member function**)，所以都可以随便访问美国各州(**private**)。
而地球上还有一种人可以随意访问美国各州(**private**)，他们虽然没有绿卡(**member function**)，但是他们有签证(**friend**)啊，有了签证(**friend**)之后，他们就可以随意访问美国(**class**)的各州(**private**)了。虽然你不是我的绿卡公民(**member function**)，但是你还是能来，想去哪去哪。

## inherit

美国(**class**)在世界上建了很多军事基地(**protected**)，这些军事基地就只有他的小弟(**son**)们才能看，而别人看不到。小弟(**son**)虽然能看到只给他们看的军事基地(**pretected**)，但是他们也一样，没有绿卡(**member function**)或签证(**friend**)，他们也没机会访问美国的各州(**private**)。

*本文没有包含类的继承中的三种继承方式，分别为公有继承(public)、私有继承(private)、保护继承(pretected)*

