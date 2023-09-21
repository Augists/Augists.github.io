---
title: Github Page build failure
tags: [GIT, ERROR]
description: 'All of a SUDDEN<br>I have received four e-mails totally<br>Ridiculous but reasonable'
date: 2021-05-16 23:12:05

---

{% note warning %}

{% note %}

今天早上还奇怪为什么昨天发的博客还没收到邮件通知，就上博客上怎么刷新都出不来新博客
后来发现，因为是直接复制的 markdown 文件，文件头是自己写的，日期给写错写到 3 月去了

{% endnote %}

今天前后一共收到了四封来自 GitHub 的邮件，内容通通一个样子，就是告诉我 'GitHub Page build failure'
我那个找啊 😭 把新文章弄走也不行，弄走了将近 10 篇都不行
本来好好的，咋就突然 'build failure' 了
从头到尾浏览了一遍提供的 build failure 提示网页也没发现是哪里有问题，于是上网搜了一下这个错误

---

基本上那些博客都没有什么实用价值，直到我发现了一篇说可以用 'jekyll --safe' 让他自行检测错误原因（尽管错误原因可能会给的很模糊
于是我就 `gem install jekyll`（这东西居然还要我 root 权限 😒
然后就发现，人家根本那就没有这个 `--safe` 的参数指令

---

一开始脑子没绕过弯来，就认定了 `--safe` 就是错误检测的参数，就在那傻不拉几的 `jekyll build --safe` `jekyll server --safe` 😒
重新仔细看看人家的 help list，似乎现在的 `--safe` 变成了 `jekyll doctor`
跑了一遍试了下，确实是，博客的问题出在用了 c 语言的头文件的那个 keyword 作为内容
就挺突然的，`re-(c head keyword)` 那文章是很早很早以前的了，之前从来没因为这个出现过搭建错误的问题
已经半夜了，终于把这个破问题改好了 属实不容易 😒

{% note %}

gem 是真的难用

{% endnote %}

{% endnote %}
