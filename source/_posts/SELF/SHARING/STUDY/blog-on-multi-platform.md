---
title: blog on multi-platform
tags: [SHARING, HEXO, TERMINAL]
description: '由于设备越来越丰富，我需要在多个平台上共享同步我的博客环境'
date: 2023-09-21 15:54:16
---

{% note warning %}

刚入学的时候还吐槽，交大的校园网限制只能登录3台设备，而我现在一共有4台电脑（去年年底组的电脑放在宿舍打游戏，工位配的电脑过于离谱，所以又组了一台5600G的基础配置放在工位用，再加上一个笔记本）1台Xbox，1台iPad，两部手机。所幸买了两个小路由器放在宿舍和工位，才躲开登录数量限制。

前两天有人催我说已经半年没更新博客了，正好今天在配置多平台的博客环境，就把遇到的坑记一下。其实在 reminder 里有好多想写和想做的东西，怪自己摆烂，总是找各种理由不干活。

多平台同步的博客环境我参考了[这篇文章](https://www.jianshu.com/p/0b1fccce74e0)。他在原 `github.io` 仓库中创建了一个新的分支用来存放环境，并将它设置为默认用于每次同步，同时不修改 `master` 主分支，其用于hexo部署和 `github.io` 的静态网页渲染。但是我注意到我的 `config` 里有一个 `token` 出现在莫名其妙的位置，时间过于久远我也不记得为什么需要它，好在它可能只是第二层保障，并且只在这里用到了一下，所以就也无所谓了。

工位电脑装了一套 Arch Linux，这是在我去年的折腾里测试能顺利运行我需要看得项目的发行版，尽管可以说是迷信，但我还是选择了它，并且这次没有过多的在桌面环境上纠结，直接安装的KDE，毕竟工位电脑更多的是需要它流畅稳定的运行。如果这是自己平时玩的电脑，可能会继续尝试sway或者一些好玩的桌面环境。本身项目标明的是使用 Ubuntu，但是我一直不喜欢 gnome 嫌弃它怪以外，Ubuntu 官方一直在尝试从 `apt` 切换到 `snap`，让我感觉很陌生。宿舍里的那台游戏电脑之前在放弃双系统后我也被迫使用虚拟机安装了 Ubuntu，但体验一直谈不上好。

在 Arch 上配置 GitHub 密钥的过程中一直收到 `Connection closed by remote host` 的错误，我重新去搜索了官方的文档（会在后面列出），一开始以为是 `SHA` 被弃用的问题，但是在强制了 `RSA-SHA2-256` 和 `ed25519` 后仍然没有解决，于是到 NAOSI 里问。有同学提起应该考虑网络代理配置的问题

![](https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/proxy%20bad%20github%20connection.png)

> 这个终端大概率没走代理，如果是CFW设置http_proxy
> from 金一

突然点醒我。前几天在帮博士师兄配环境的时候也一直遇到网络问题，收到的是 `bad record MAC`，查询后结论为在 TLS 连接中被迫中断，也同样是由于代理。当时的电脑和我现在一样使用了 v2rayA 进行代理，在设置的时候按照官方文档中的配图将设置的代理模式选择为大陆白名单模式，此时猜测是配置了系统全局流量通过 v2rayA 的端口，使得我们在终端中所有的强制 proxy 都没有作用。最后修改为 GFWList 模式后解决。

![](https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/GFW.png)

## Reference

* [How can I fix "kex_exchange_identification: read: Connection reset by peer"?](https://stackoverflow.com/questions/69394001/how-can-i-fix-kex-exchange-identification-read-connection-reset-by-peer)
* [新增 SSH 密钥到 GitHub 帐户](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
* [如何获取和配置 Git 和 GitHub SSH 密钥](https://www.freecodecamp.org/chinese/news/how-to-get-and-configure-git-and-github-ssh-keys/)
* [生成新的 SSH 密钥并将其添加到 ssh-agent](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

{% endnote %}
