---
title: Command ps | grep then find itself
tags: [ERROR]
description: 'While running command ps -ef | grep xxx, I came up with a stupid circle'
date: 2021-07-25 00:50:07

---

{% note warning %}

分享今日份蠢事

事情要从下载学校的 VPN 客户端开始说起 ...

---

学校的 VPN 客户端使用的是 GlobalProtect，应该是一个提供成熟的 VPN 服务的软件，可以自己根据需求定制。这个软件有一个很奇怪的地方，它自动设置为开机自启动，而且进程不允许关闭
要知道，当你打开它之后，你会发现它连个 quit 都没有
我也尝试过在任务管理器里终止，或是直接 `kill` 掉它，但都会发现每次它都会立刻重启并开始尝试连接。总之让人看的非常想卸载
除此之外，它一直在不断的弹窗让我同意它监控我的所有网络活动...当时我就来气。我看的东西是你不花钱能跟着看的？
所以，在发现它并不能帮助我登录 IEEE 之后，我毅然决然的准备卸载掉它 😒

![](https://i.loli.net/2021/07/25/GCTESI5Fo4NAPat.jpg)

---

在我使用它提供的 pkg 里卸载时，它就莫名其妙的卡住了。于是我直接强制关闭了 installer（对，它的卸载是在安装器里的），然后准备重新卸载

![](https://i.loli.net/2021/07/25/RdigjZxuhy1I4An.jpg)

这时候就发现，第二个 installer 会等待第一个运行完，而第一个尽管被我强制退出了，不过很明显它并没有“实质性”的退出 installer
它就这么莫名其妙的锁住了！！！
当时我就有点懵，尽管这可能是 macOS 系统限制，但是它的卸载强行卡死，导致我连关机都不能执行
在我长按关机执行强制重启后，它在启动界面再一次卡死了...

![](https://i.loli.net/2021/07/25/tBzuefaORyUcgb9.jpg)

最后，上网查到这个软件会在 `Contents/Resources` 里面放一个卸载 shell 脚本，终于算是卸载掉了

---

但是还是很慌，毕竟它能干出要监控我这种事情。我就怀疑他是不是背地里还有卸载残留
于是我一通 `ps -ef | grep GlobalProtect`，好家伙！还真有
当场又懵了，这啥进程啊怎么卸载完了还在运行，而且居然每次查看 pid 都不一样
又是一通骚操作，甚至已经入魔了，开始每次把获取到的 pid 提出来扔给 `kill`，然后就发现这个“病毒”非常的顽固呀，每秒都会换一个进程 id，还变成小强了

![](https://i.loli.net/2021/07/25/1UQyAg2D5BrWfJ8.png)

过了很久才反应过来，这不就是我 `grep` 进程嘛...
也就是说，`grep GlobalProtect` 就是一个 `grep` 查找进程，然后它每次都会查找到自己...害得我在这折腾一晚上

{% endnote %}
