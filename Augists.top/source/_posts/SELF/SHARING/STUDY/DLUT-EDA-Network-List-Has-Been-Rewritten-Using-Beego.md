---
title: DLUT-EDA Network List Has Been Rewritten Using Beego
tags: [SHARING, GOLANG]
description: 'This is a simple but interesting idea💡 for campus network<br>And I have accomplished a baseline using beego framework'
date: 2022-10-10 00:28:56
---

{% note warning %}

前几天重新拾起来 [Beego](https://github.com/beego/beego) （重新学习），把之前的一个想法💡用 beego 的 MVC 重新实现出来了一个 baseline

[项目地址](https://github.com/Augists/DLUT-EDA-NetworkList)

我得承认这个项目是我的愿景，有些不够切合实际

我的想法💡是，大家都有自己的熟人小圈子：

* 每个人每个月对校园网的需求都是波动的
* 上个月用了 20 G，下个月我可能又会需要用 120 G
* 5 个人的小圈子，可能总共只会用 3 个人的量

所以我就想，通过这种方式，让大家均摊校园网的成本，同时也能让你在超量使用的情况下收到来自小圈子里别人的“援手”

它可能有点乌托邦了，但是我相信这能帮助一些人在一定程度上解决校园网的窘境

## TODO

- [ ] 将 shell 脚本转化为 golang，不再依赖 [mega 的 DLUT-EDA-Login](https://github.com/bboymega/dlut-eda-shell-login) 项目
- [ ] 随机选择账户登陆失败后，继续随机下一个
- [ ] 打包为 Release 发布，多平台


{% endnote %}
