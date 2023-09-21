---
title: UTF8MB x Emoji Encoding Error in MySQL
tags: [CODE, ERROR, NOTE]
description: 'If you use MySQL < 8.0 to store an emoji, it will be symbolized as "?"<br>This is an archive during discussing utf encoding based on a blog<br>http://forimoc.me/blog/36'
date: 2023-02-09 11:32:40
---

{% note warning %}

{% note info %}

这是一篇基于编码踩坑博客引发的关于字符编码的讨论整理，你可以先行阅读初始博客

[utf8mb4之鏖战逆天emoji编码 —— 一文通透后端和数据库的编码](http://forimoc.me/blog/36) from 🐟神

{% endnote %}

## emoji编码

* emoji表情符号，是20世纪90年代由NTT Docomo栗田穣崇(Shigetaka Kurit)创建的，词义来自日语（えもじ，e-moji，moji在日语中的含义是字符）。emoji可以使数字通信做到让人如同面对面交流，避免错误传达信息。
* 在NTT DoCoMo的i-mode系统电话系统中，绘文字的尺寸是12x12 像素，在传送时，一个图形有2个字节。
* 自苹果公司发布的iOS 5输入法中加入了emoji后，这种表情符号开始席卷全球，目前emoji已被大多数现代计算机系统所兼容的Unicode编码采纳，普遍应用于各种手机短信和社交网络中。
* 所谓Emoji就是一种在Unicode位于\u1F601-\u1F64F区段的字符。这个显然超过了目前常用的UTF-8字符集的编码范围\u0000-\uFFFF。

## UTF-8编码

![utf-8 wikipedia](https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/AEEA064BB83CE89C9775A20C1D6A79CA.png)

{% note danger %}

### UTF编码补充

![](https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/1B7F7236282723A1D3505834BC930363.png)
![](https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/9B9CB57BCC5FFF69B47995820EFDE376.png)

{% endnote %}

## UTF8MB4

* utf8mb4是utf8的超集并完全兼容utf8，能够用四个字节存储更多的字符，mb4就是most bytes 4的缩写，即至多四字节的意思

## 问题

为什么emoji的编码范围U+1F601 ~ U+1F64F被覆盖在UTF-8规范限制后的范围U+0000 ~ U+10FFFF，但是UTF-8不兼容emoji，需要使用UTF8MB4

或者说，为什么我们日常说的（MySQL < 8.0 默认的）UTF-8指的是UTF8MB3（范围U+0000 ~ U+FFFF），但是实际上UTF-8并非仅有这个范围

## 解决

查了一下，utf8mb x这个是mysql特有的一个概念，这个问题也只会出现在旧版本的mysql里

官方文档reference

* https://dev.mysql.com/doc/refman/8.0/en/charset-unicode-utf8mb4.html
* https://dev.mysql.com/doc/refman/8.0/en/charset-unicode-utf8mb3.html

## Reference

* [UTF-8 wikipedia](https://zh.wikipedia.org/wiki/UTF-8)
* [10FFFF不是只用3个字节吗？？？？翻遍了资料怎么都说是4个呢？？？](https://q.cnblogs.com/q/96864/)
* [What is the difference between utf8mb4 and utf8 charsets in MySQL?](https://stackoverflow.com/questions/30074492/what-is-the-difference-between-utf8mb4-and-utf8-charsets-in-mysql#30074553)
* [一次彻底搞清unicode、utf8和utf8mb4](https://segmentfault.com/a/1190000039294107)


{% endnote %}
