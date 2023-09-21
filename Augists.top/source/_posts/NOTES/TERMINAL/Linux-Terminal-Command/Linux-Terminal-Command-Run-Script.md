---
title: Linux Terminal Command Run Script
date: 2020-06-10 15:41:43
tags:
  - TERMINAL
  - NOTE
description: "Study Notes of Linux Terminal Command EP2-Run Script<br>Copyright@HuaHuaJiangLeetCode"
author: HuaHuaJiangLeetCode

---

<iframe src="//player.bilibili.com/player.html?aid=327628262&bvid=BV1nA411h7KD&cid=177233379&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

{% note warning %}

> Copyright@HuaHuaJiangLeetCode

# EP2 运行脚本

## python my_echo的运行

1. 在文件开头添加

```python3
#!/usr/bin/env python3
```

2. 添加可执行权限

```bash
chmod +x my_echo.py
```

*这时已经可以通过`./my_echo.py`来执行了*

3. 去掉py后缀

```bash
mv my_echo.py my_echo
```

*运行脚本：`./my_echo hello world`*

4. 把当前路径添加到环境变量中

```bash
PATH=$PATH:$PWD
```

*可以在任意位置运行my_echo脚本，可以通过`which my_echo`查看脚本位置*

*执行脚本：`my_echo hello world`*

> `which python3`查询到的路径非常长，并非`/usr/bin/env python3`?
>
> 加入`#!/usr/bin/env python3`后，系统会在执行脚本时自动从环境变量中寻找python3的路径。这一步的意思是**指定解释器**
> 前提是已经将python3加入环境变量中

### #!

* `#!`: shebang (**Sha**rp**Bang** of ha**SHBang**)

	- 必须放在第一行，并使用绝对路径

### chmod

* chmod: (**Ch**ange **Mod**e) 改变文件权限

	- % chmod +x foo	*# 增加可执行权限 / +w +r*
	- % chmod -x foo	*# 移除可执行权限 / -w -r*
	- % chmod 740 foo	*# 把foo权限设置为740*

		* Owner:	7 = 1 + 2 + 4 = 可执行 + 可写 + 可读
		* Group:	4 = 4 = 可读
		* Others:	0 = 没有任何权限

* 常见：
	- 644	-rw-r--r--  *# default*
	- 755	-rwxr-xr-x
	- 777	-rwxrwxrwx	*# 危险！ use chown / chgrp instead*

## 文件基本操作

* mv: (**M**o**v**e) 移动文件 重命名 剪切+粘贴

	- % mv hwllo.txt hello.txt	*# 重命名*
	- % mv 四六级 大学/英语/	*# 移动文件夹*

* cp: (**C**o**p**y) 复制文件

	- % cp a.txt a_copy.txt		*# 复制单个文件*
	- % cp -r dir1 dir2			*# 复制文件夹 -r = recursive*

* rm: (**R**e**m**ove) 删除文件 **没有回收站！！！**

	- % rm a.txt				*# 删除单个文件*
	- % rm a.txt b.txt c.txt	<i># 删除多个文件 / rm *.txt</i>
	- % rm -r dir1				*# 递归删除dir1和所有子目录/文件*

## $PATH 环境变量 + which 命令

* $PATH: 以：分割的文件夹列表

从哪里去找可执行文件（按照文件夹的顺序）

	- % PATH=$PATH:%PWD			*# 把当前目录追加到PATH中*
	- % echo $PATH
	```
	...:/Users/Augists/cmd2
	```

* which: locate a program file in user's path

	- % which my_echo
	```
	/Users/Augists/cmd2/my_echo
	```
	- % my_echo hello world		*# runs from anywhere*
	hello world

[玩转Linux命令行 - 运行脚本 - EP2](https://www.bilibili.com/video/BV1nA411h7KD/?spm_id_from=333.788.videocard.0)

{% endnote %}
