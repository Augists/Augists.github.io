---
title: Yan DP Analysis
tags: [NOTE]
description: 'How to analyse DP problem?'
date: 2022-06-21 10:28:16
---

{% note warning %}

# 闫氏DP分析法

![](https://cdn.acwing.com/media/article/image/2020/03/23/27426_73d9c53a6c-2.png)

[示例](https://www.acwing.com/activity/content/code/content/246257/)

## dp问题的下标

1. 若状态转移方程中有`dp[i - 1]`这种状态, 下标(状态转移那部分代码)尽量从1开始
2. 否则就最好从0开始

## dp问题的时间复杂度

状态数量(n^几个约束维度) * 转移状态的时间复杂(状态转移代码的时间复杂度)

## dp的集合划分依据 -> 寻找最后一个不同操作

eg. 加不加这个背包, 数字三角形最后一步是由左边还是右边走过来的呀(根据操作的不同来对集合进行划分)
使得划分之后的小集合可以递推求出当前集合, 且最小集合已知

集合划分要不漏，但是不一定不重。当dp数组维护的特性是集合的max或min时，集合划分可以有重复（最长公共子序列）

1. `dp[i][j]`维护的是a字符串的前i个字符组成的字符串和b字符串前j个字符组成的字符串的公共子序列的最大长度，应该按照端点划分为：含不含a的第i个字符和含不含b的第j个字符，共分为四个部分。`dp[i][j-1]+dp[i-1][j]+dp[i-1][j-1]+1+dp[i-1][j-1]`大于`dp[i][j]`
2. 如果是求max或min的话，A和B集合有重合部分，同样只需要单独求后再取一次最值就可以

## 原文

[链接](https://www.acwing.com/file_system/file/content/whole/index/content/406072/)

{% endnote %}
