---
title: Backspace does not work on VPS?
tags: [SHARING, TERMINAL]
description: 'This is the first time that I use my VPS on kitty<br>It goes wrong with my expect<br>Plenty of shortcuts fail such as *Backspace*, *clear*, and so on'
date: 2021-08-27 16:36:56

---

{% note warning %}

在我用我的新终端 kitty 登陆 VPS 的时候发现，很多快捷键都失效了。比如退格键就会变成空格，`<C-u>` 会没有反应，`clear` 会提示我的终端模拟器不支持等

![](https://i.loli.net/2021/08/27/7DTkwj6LFPIdxRq.png)

我们也可以通过 `echo $TERM` 查看到终端的情况

![](https://i.loli.net/2021/08/27/oFkeaPMsTdhQJXy.png)

大概就可以看到，应该是当前的 VPS 不支持 xterm-kitty

可以通过

```bash
stty -a
```

进行查看服务器支持的终端通信参数

我们尝试使用

```bash
stty sane
```

命令 sane 最常出现在大多数终端的 stty 选项的集合中。它并不改变通信信道的速率，但当终端发生混乱时，通常能够产生有益的效果。

不过很可惜，没啥效果

最终经过尝试，使用

```bash
export TERM=linux
```

有效

{% note info %}

TERM 环境变量用于终端处理。它允许 DB-Access（及其他基于字符的应用程序）识别您正在使用的终端并与其通信。

{% endnote %}

可以推测，我们将终端类型设置成 VPS 自己，从而使对于 VPS 本身是正常的

后来查到

{% note info %}

* `putty`，`konsole`，`Eterm`，`rxvt`，`gnome`等, 如果你正在运行的 XTerm 模拟器和一些功能键，退格键，删除，Home 和 End 不能正常工作
* `linux` 通过 Linux 控制台登录时
* `dumb` 当其他都不能用时

{% endnote %}

可以通过

```bash
toe /usr/share/terminfo
```

查看可选信息

![](https://i.loli.net/2021/08/27/QEJsUv8z72SGrbn.png)

![](https://i.loli.net/2021/08/27/zW5tGqPfeVyj3i6.png)

{% endnote %}
