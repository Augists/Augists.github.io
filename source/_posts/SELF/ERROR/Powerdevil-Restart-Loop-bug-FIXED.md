---
title: Powerdevil Restart Loop bug 'FIXED'
tags: [ERROR, LINUX]
description: 'KDE crashed again so I have to check KSystemlog<br>where I found a process Powerdevil restart about every five seconds'
date: 2023-11-15 19:53:16
---

{% note warning %}

最近遇到过几次 KDE 直接崩溃的情况，具体表现为后台的进城可以正常运行（音乐视频等正常播放），但是桌面环境卡死。在应该是第二次还是第三次的时候就想要不要找找系统的 log 看看，毕竟作为一个不够稳定且追求极致最新的系统，出现崩溃也是合理的

![](https://augists-upic.oss-cn-qingdao.aliyuncs.com/arch/20231118152719.png)

于是找到了 KSystemlog

{% note info %}

KSystemLog show all logs of your system, grouped by General (Default system log, Authentication, Kernel, X.org...), and optional Services (Apache, Cups, etc, ...). It includes many features to read nicely your log files:
* Colorize log lines depending on their severities
* Tabbed view to allow displaying several logs at the same time
* Auto display new lines logged
* Detailed information for each log lines

{% endnote %}

筛选了 Error 及以上的信息后，发现 systemd 里一直有一个 Powerdevil 在无限重启

![](https://augists-upic.oss-cn-qingdao.aliyuncs.com/arch/20231118160424.png)

所以就在搜索后尝试查看进程状态

![](https://augists-upic.oss-cn-qingdao.aliyuncs.com/arch/594053625b0d88196079c566f5e9b4f9.png)

可以看到发生错误与 ddcutil 和休眠有关系。可能需要提及的是，在前段时间每天使用 sleep 之后我发现 Arch 会越来越慢。当时为了保留 IDEA 的 debugger 状态不敢关机，导致后面卡成 PPT。后来在 NAOSI 群里聊起来，JC Zhang 说不要用 KDE 的 sleep，可以就用自动的 Lock。由于已经不记得装系统的时候对 Hibernate 等是否有什么配置，所以现在就直接放着关显示器了（现在改为降低显示器亮度）来达到不影响工作进度和省电的目的。

![](https://augists-upic.oss-cn-qingdao.aliyuncs.com/arch/d9e40f83e3bb3b921551a57ad9570232.png)

直接尝试运行 kde powerdevil 得到 `DBus session bus not found`，但是在 systemctl 里检查会看到是正常的 active 状态，运行它提供的指令也没有效果

![](https://augists-upic.oss-cn-qingdao.aliyuncs.com/arch/d7c1597cf6747553193b3423b1b4d469.png)

在 arch 手册里能检索到关于 `dbus-launch` 的文档

{% note info %}

NAME
* dbus-launch - Utility to start a message bus from a shell script

DESCRIPTION
* The dbus-launch command is used to start a session bus instance of dbus-daemon from a shell script. It would normally be called from a user's login scripts. Unlike the daemon itself, dbus-launch exits, so backticks or the $() construct can be used to read information from dbus-launch.
* With no arguments, dbus-launch will launch a session bus instance and print the address and PID of that instance to standard output.

{% endnote %}

那么 D-Bus 是什么呢？

{% note info %}

D-Bus is a message bus system, a simple way for applications to talk to one another. In addition to interprocess communication, D-Bus helps coordinate process lifecycle; it makes it simple and reliable to code a "single instance" application or daemon, and to launch applications and daemons on demand when their services are needed.

{% endnote %}

回到正题，可以搜到类似的情况普遍在 11-06（更早） 的系统更新后出现。对比 log 文件发现有一些也不完全相同。比较多的解决方案是通过版本降级

> ddcutil-1.4.1-1 (downgraded from ddcutil-2.0.0-1)
> powerdevil-5.27.9-1 (downgraded from powerdevil-5.27.9-2)

```bash
sudo pacman -U https://archive.archlinux.org/packages/d/ddcutil/ddcutil-1.4.1-1-x86_64.pkg.tar.zst https://archive.archlinux.org/packages/p/powerdevil/powerdevil-5.27.9-1-x86_64.pkg.tar.zst
```

梳理时间线大概是，`ddcutil` 释出了全新的 2.0 版本，全面采用了新版本的 API，对应 `powerdevil` 也升级来兼容新版本，但是在 KDE 上使用外接显示器对两者的兼容性仍然没有调好（似乎在 Gnome 上没有问题）。

同样，你可以用一些方法来临时 `kill` 掉它和重启（我记得是收到了报错

```bash
killall org_kde_powerdevil
kstart5 /usr/lib/org_kde_powerdevil
```

issue 提出者发了一个视频来解释他目前找到的最合适的方法

[![](https://augists-upic.oss-cn-qingdao.aliyuncs.com/arch/820ec0cf185e56e5d83ad3c5d92137d2.png)](https://www.youtube.com/watch?v=bFSd6QYerRM)

简单来说就是修改 `/etc/xdg/autostart/powerdevil.desktop`

```bash
X-systemd-skip=false
X-KDE-autostart-phase=1
```

而在 Arch 的 bbs 里，有人提到了一个似乎更专业的解决方案

{% note info %}

change the line 'TimeoutSec=5s' to higher value

```text
╰─>$ bat /usr/lib/systemd/user/plasma-powerdevil.service
─────┬──────────────────────────────────────────────
   1 │ [Unit]
   2 │ Description=Powerdevil
   3 │ PartOf=graphical-session.target
   4 │ After=plasma-core.target
   5 │
   6 │ [Service]
   7 │ ExecStart=/usr/lib/org_kde_powerdevil
   8 │ Type=dbus
   9 │ BusName=org.kde.Solid.PowerManagement
  10 │ TimeoutSec=9sec
  11 │ Slice=background.slice
  12 │ Restart=on-failure
```

{% endnote %}

{% note danger %}

## Reference

* https://man.archlinux.org/man/dbus-launch.1.en
* https://www.freedesktop.org/wiki/Software/dbus/
* https://forum.manjaro.org/t/powerdevil-fails-energy-settings-unavailable/151081
* https://forum.manjaro.org/t/frame-drops-below-vsync-every-coupel-of-secound-but-killall-org-kde-powerdevil-fixes-it/151260
* https://forum.endeavouros.com/t/power-devil-restart-loop-bug-after-updating-today/47271/21
* https://bugs.kde.org/show_bug.cgi?id=476375
* https://bbs.archlinux.org/viewtopic.php?id=289979

{% endnote %}

{% endnote %}
