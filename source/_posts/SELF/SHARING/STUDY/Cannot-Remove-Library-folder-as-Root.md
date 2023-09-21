---
title: Cannot Remove /Library/folder as Root
tags: [MAC]
description: 'That sudo rm -rf does not work drives me mad 😭<br>How can we remove those stubborn directories on mac<br>without lsattr command 😒'
date: 2020-09-17 16:13:18

---

{% note warning %}

## 背景

前两天又在卸载病毒软件 *Adobe*，又是一顿翻江倒海
基本上看到个不是 *apple* 的文件夹都要 *google* 一下是什么软件产生的垃圾
然后在处理 `/Library/StageExtension/Library/Application\ Support` 里的垃圾文件的时候，出现问题
![](https://i.loli.net/2020/09/17/4YFxLwKBdH3opCa.png)

---

## 问题

![](https://i.loli.net/2020/09/17/NowQJeWRGguPl2z.png)
注意目录是在根目录下，不是 `$HOME` 下

---

## 查询

这个问题本身相对不是很常见，尤其是在 mac 上
网上搜到的基本上都是告诉你使用 `lsttr` 来查看这个特殊属性
但是这东西 mac 上莫有啊 🤣

---

## 指路

最终看到了一点东西，这里指个路
[关于 mac 上的 lsattr](https://apple.stackexchange.com/questions/101328/file-cant-be-moved-by-root-on-os-x)
这里提到的我没见过的一个 `ls` 参数
![](https://i.loli.net/2020/09/17/IiPh3jUuH2OpQb5.png)
[关于 SIP](https://www.imore.com/how-turn-system-integrity-protection-macos)
我现在还没有试过，因为必须要在恢复模式中开关
![](https://i.loli.net/2020/09/17/9SkUrT1jmAzlBcu.png)
等我下次觉得我电脑需要关机的时候我再试一下，但是如果那样还是不行，我没再查到其他可能有关的内容了

---

后续：
我并没有关机搞 SIP，而是等待了一波更新系统
它自己就 🈚️ 了
毕竟是系统根目录下的东西，🈚️ 了可能是正常的

{% endnote %}
