---
title: Linux Terminal Command Newcomer
date: 2020-06-09 18:33:18
tags: [TERMINAL, NOTE]
description: "Study Notes of Linux Terminal Command EP1-Newcomer<br>Copyright@HuaHuaJiangLeetCode"
author: HuaHuaJiangLeetCode

---

<iframe src="//player.bilibili.com/player.html?aid=967649469&bvid=BV1hp4y1C7Zm&cid=176258160&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

{% note warning %}

> Copyright@HuaHuaJiangLeetCode

# EP1 初来乍到

## 命令行？

* 人机交互模式

	- 命令行模式 Command Line Interface (CLI)

		更加准确、更加快捷、有可编程性

	- 图形界面 Graphical User Interface (GUI)

		更加方便、更加直观

## 命令行的世界很单纯

* 命令式

	- % 命令 [参数1 参数2]
	- 输出内容

* 交互式

	- % 命令
	- <用户输入>
	- [输出内容]

## 初来乍到

* 自言自语 echo

	- echo huahua / echo hello world
	- echo $PWD / echo $HOME / echo ~

* 我在哪 pwd (**P**rint **W**orking **D**irectory)

	- % pwd

*绝对路径与相对路径*

* 换个地方 cd (**C**hange **D**irectory)

	- % cd path / cd ~
	- % cd ..	*# 向上一层*

* 瞅瞅 ls (**L**i**s**t Directory Contents)

	- % ls
	- % ls -l				*# list mode*
	- % ls -l -a = ls -la	*# list + all files*
	- % ls -lh				*# list + human readable size*

![ls -l](https://tva1.sinaimg.cn/large/007S8ZIlly1gfmgxm76w2j30qo0dadt0.jpg)![ls -lh](https://tva1.sinaimg.cn/large/007S8ZIlly1gfmgxsq46kj30rm0dc4ah.jpg)

## 寻求帮助

* 用户手册 man (**Man**ual)

	- % man pwd
	- % man man

* 内置帮助 命令 -h

	- % man -h
	- % grep --help

* 面向StackOverflow编程

## 文件内容

* 打印文件内容 cat (Con**cat**enate and print files)

	- % cat a.txt
	- % cat a.txt b.txt		*# print a.txt then b.txt*
	- % cat < a.txt			*# read from stdin*

* 头和尾 head and tail

	- % head a.txt			*# 默认打印10行*
	- % tail a.txt / tail -n 5 a.txt / tail -f a.txt	*# 一直观察文件，打印新添加的内容*

* 交互浏览 less (readonly version of vi?)

	- % less a.txt

* 内容查找 / or grep

	- % man less | grep -n sim	*# line number*

* 单词统计 wc (**W**ord, line and byte **c**ount)

	- % man wc | wc			*# -l只打印行数*

## 重定向和管道

* 重定向：改变输入输出设备

	- 标准输入(stdin) / 标准输出(stdout)：控制台 / 键盘 / 屏幕
	- % echo hello > hello.txt		*# redirect to a file*
	- % echo world >> hello.txt		*# append to a file*
	- % cat < hello.txt				*# use file as stdio = read from file*

* 管道：将前一个命令的标准输出作为下一个程序的标注输入

	- % man less | grep sim
	- % man less | grep -n sim | grep That > that.txt	*# mutiple pipes*

## Unix哲学

* 每个程序只做一件事情，并且把这件事情做好
* 一个程序的输出可以作为另外一个程序的输入，不要输出无关内容
* 编写处理字符流的程序，因为那是通用接口
* 编写可以互相协作的程序

[玩转Linux命令行 - 初来乍到 - EP1](https://www.bilibili.com/video/BV1hp4y1C7Zm?t=236)

{% endnote %}
