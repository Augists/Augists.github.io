---
title: Reinstall macOS
tags: [MAC, APPLE]
description: 'Spend A day for reinstalling my macOS<br>Downgrade the system from the beta version to official version Big Sur'
date: 2021-08-13 12:25:54

---

{% note warning %}

花了一天多的时间，把 mac 抹盘重装了，收获了一个全新的 mac

之前使用的是 macOS 12 public beta 4。本身使用并没有什么问题，问题出在了软件的兼容性上。很多软件如 *OnlyX* 都无法在新系统里正常打开运行（这里还是再点一下 *OnlyX*，每个系统版本出一个软件版本，导致兼容性非常差。但是也不是说这样做不好，只是我觉得应该又一个更鲜明的提示，当检测为更新的系统版本时提示一下）

导致我重装系统的直接原因是下载了 *CrossOver*，我不记得它有要我的系统权限，但是它直接修改了系统默认显示 `.exe` 文件的图标，而我比较菜（lan）。权衡了一下啊，干脆直接抹盘重装一次系统

---

在这次重装过程中也发现了很多好玩的事情，也对很多东西有了新的理解。比如：
* 切换输入法的快捷键应该设置给 *select the previous input source*，而不是 *select next input source*
* *screen saver* 文件一般为 `.saver` 文件，而 *fliqlo* 是 `dmg` 安装器
* 由于更换了 `neovim`，很多东西都和以前不太一样，同时 `vim` 作为被我抛弃掉的被替代品，没有再使用任何插件，当作一个单纯的编辑器来使用了
* 对电脑的容量非常诧异。本来以为会清理出非常多的东西，能让 256G 的容量剩出很多，但是现在看其实和之前差别不大，只是少装了很多软件，大概节省了 20G 的空间，甚至 *Chrome* 我都还没有安装（也是在尝试一个单 *Safari* 能否承担重任，尤其是在下个版本中将要加回 *Group Tab*，这个在测试版中我爱不释手的功能
* 在抹盘之后，可以将 Data 和 数据 两个盘直接删掉，只保留 *Macintosh HD* 就可以，之前被这个奇怪的保护机制烦了很久
* mac 启动器下载完成之后打开就会报错，但是事实上是正常的，这一点在网上查阅的时候都没有指出来。使用官方的制作启动器的指令之后报错了一次，有点莫名其妙，第二次就好了
* mac 在使用制作好的外置磁盘启动器进行安装时，仍然需要关闭一些安全性设置（由于 T2 芯片的缘故）。我目前没有把这些安全性设置修改回来，但是我现在也不是很想折腾 *yabai*

{% endnote %}
