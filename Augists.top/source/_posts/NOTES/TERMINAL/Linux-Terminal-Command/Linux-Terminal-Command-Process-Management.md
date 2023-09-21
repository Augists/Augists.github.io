---
title: Linux Terminal Command Process Management
date: 2020-06-11 09:08:08
tags: [TERMINAL, NOTE]
description: "Study Notes of Linux Terminal Command EP4-Process Management<br>Copyright@HuaHuaJiangLeetCode"
author: HuaHuaJiangLeetCode

---

<iframe src="//player.bilibili.com/player.html?aid=840969268&bvid=BV1j54y1B7oD&cid=199459334&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

{% note warning %}

> Copyright@HuaHuaJiangLeetCode

# EP4 进程管理

## stress & top

* stress 给系统增加负载或者进行压力测试

	- -t/--timeout N	*# N秒后超时*
	- c/--cpu N			*# 孵化N个worker，死循环运行sqrt() / CPU*
	- -i/--io N			*# 孵化N个worker，死循环运行sync() / IO*
	- -m/--vm N			*# 孵化N个worker，死循环运行malloc()/free() / Memory*
	- -d/--hdd N		*# 孵化N个worker，死循环运行write()/unlink() / Disk*
	- stress --cpu 8  --io 4 --vm 2 --vm-bytes 128M --timeout 10s

* top 显示或更新排序过的进程信息

	- 默认按照CPU占用率排序

> stress均需自行下载

## ps

* ps (**P**rocess **S**tatus) 显示进程状态

	- 默认只显示**当前用户**有**控制终端**的进程
	- $ ps aux	*# 显示所有进程，包括其他用户的*
	- $ ps aux | grep Chrome | wc -l	*# 看Chrome有多少个进程*
	- $ ps -l	*# 列出UID PPID（父进程ID）*

## kill * killall

* kill 终止或者给进程发信号

	- $ kill -signal_number/-signal_name PID
	- $ kill PID	*# 默认发送15/TERM (software termination signal)*
	- $ kill -9/-KILL PID	*# 强力杀进程*

* killall 按照名字终止进程

	- 和kill一样，但是用名字作为参数
	- 如果是大众命令可能会误伤友军 $ killall bash / killall python
	- $ killall -9 stress

## Ctrl+C vs Ctrl+Z

* 都能让程序“停止”
* Ctrl+C 向进程发送 SIGINT 中断信号，通常进程会终
* Ctrl+Z 向进程发送 SIGTSTP 停止信号，把前台进程放入后台并挂起

	- 进程还存在
	- 打开的端口还会被占用

## & / jobs / fg / bg

* & 在后台运行进程

	- $ python3 -m http.server &	*# 在后台起一个Web Server*
	- 前台可以继续运行其他命令
	- 当前终端/SSH关闭后依旧会被终止 (solution: screen / tmux / Chrome RDP)

* jobs 显示从**当前终端**启动的命令

	- $ jobs
	- $ jobs -l		*# 显示PID*

* fg (**F**ore**g**round) 把后台进程放到前台

	- $ fg %1		*# 把1号job放到前台并开始运行*

* bg (**B**ack**g**round) 继续被挂起的后台进程

	- $ stress -c 1
	- $ Ctrl+Z		*# 挂起当前进程并放入后台*
	- $ bg			*# 重启最后一个job*

[花花酱 玩转Linux命令行 - 进程管理 - EP4](https://www.bilibili.com/video/BV1j54y1B7oD/?spm_id_from=333.788.videocard.1)

{% endnote %}
