---
title: Tmux Shortcut Record
tags: [TERMINAL, TMUX]
description: 'Take down the shortcut for better using tmux'
date: 2021-06-01 09:17:50

---

{% note warning %}

三个概念 由大到小
* session
* window
* pane 窗格

![](;https://i.loli.net/2021/06/01/1vlPqRhLKN3Siob.png)

Shortcut
* `tmux new -s session_name` 新建 session 并自动新建 window
* `ctrl b + ?` 调出命令面板 help
* `ctrl b + %` 左右分屏
* `ctrl b + "` 上下分屏
* `ctrl b + o` 切换 focus 的 pane
* `ctrl b + d` detach 分离会话（退出但不关闭）
* `tmux ls` 查看正在运行的会话
* `tmux att -t session_name` attach 恢复会话（自动根据前缀匹配）
* `ctrl b + c` 新建 window
* `ctrl b + n` next window
* `ctrl b + p` previous window
* `ctrl b + ,` rename window
* `ctrl b + w` list windows and jump
* `ctrl b + s` list sessions and jump

{% note info %}

开启 tmux 并且分离会话后，再使用 `ps -a` 查看进程的时候，会发现非常乱，因为它包含了 tmux 下会话仍然在运行的进程
现在不知道 tmux 保存会话到底意义大不大了，占用系统资源保留进程，我现在可能并不需要为了一点便利而浪费性能和电量 🔋，也是因为我还没到那个层次吧

{% endnote %}

{% endnote %}
