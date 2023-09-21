---
title: Linux Terminal Command Event Handling
date: 2020-06-10 23:31:01
tags:
  - TERMINAL
  - NOTE
description: "Study Notes of Linux Terminal Command EP3-Event-Handling<br>Copyright@HuaHuaJiangLeetCode"
author: HuaHuaJiangLeetCode

---

<iframe src="//player.bilibili.com/player.html?aid=625529437&bvid=BV1Ut4y1y7RY&cid=188558034&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

{% note warning %}

> Copyright@HuaHuaJiangLeetCode

# EP3 事件处理

## 例子：Command-Line Tools can be 235x Faster than your Hadoop Cluster

### 创建处理管道

#### 背景

* 下载数据

可以在一个github rozim/ChessData上下载测试数据

* 读取速度测试

```bash
cat *.pgn > /dev/null
```

这是文件处理速度的上限

`*.pgn` 以参数列表的形式返回所有匹配的文件 `cat 1.pgn 2.pgn ... 100.pgn`
`/dev/null` 是一个设备**文件**，它丢弃一切写入的数据但返回写入成功

#### 版本1

* 搜索指定行

	- $ cat `*.pgn` | grep "Result"

* 最简单的版本

	- $ cat `*.pgn` | grep "Result" | sort | uniq =c

##### 知识点

* sort 对输入文本进行排序
* uniq -c 统计每个独立行的出现次数 仅对已排序文件有效
* `*.pgn` 参数/文件数量限制 262144 个 `$ getconf ARG_MAX` 可以获取
* sort 会把所有数据读入内存，如果内存存不下则会写入临时文件

	- 时间复杂度：O(nlogn)
	- 空间复杂度：O(n)

* uniq -c

	- 时间复杂度：O(n)
	- 空间复杂度：O(1)

#### 版本2 awk

> AWK is a domain-specific language designed for text processing and typically used as a data extraction and reporting tool.

```bash
$ cat *.pgn | grep "Result" | awk '{ split($0, a, "-"); res = substr(a[1], length(a[1]), 1); if (res == 1) white++; if (res == 0) black++; if (res == 2) draw++;} END { print white+black+draw, white, black, draw }'
```

##### 知识点

* $0	*# 输入行 '[Result "1/2-1/2"]'*
* split($0, a, "-")	*# 按-分割 a=['[Result "1/2', '1/2"]']*
* substr(a[1], length(a[1]), 1)	*# 取出最后一个字符*

时间复杂度：O(n)，空间复杂度：O(1)

#### 版本3 并行化

```bash
$ sleep 3 | sleep 5 | echo '8'
```

管道中的命令并行执行

* 代码我看不懂了，也懒得敲了。放图！

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfnnboi3wyj316009camp.jpg)

##### 知识点

* find 查找文件，打印匹配文件名到标准输出
* xargs 将参数列表（文件名）分段并执行命令

	- -n 每次（最多）取几个参数
	- -p 最多几个命令同时并行执行

* mawk 合并结果

[玩转Linux命令行 - 事件处理 - EP3](https://www.bilibili.com/video/BV1Ut4y1y7RY/?spm_id_from=333.788.videocard.0)

{% endnote %}
