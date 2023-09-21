---
title: HEXO 404 Error cuz Change Directory
date: 2020-07-19 15:28:22
tags: [HEXO, ERROR]
description: "Just now when I opened an article in my blog as usual, it turned to a 404 page<br>My Changing File Directories causes this 404 error"

---

{% note warning %}

刚才想找一篇之前的博客，点开之后发现报了404的错误
那给我吓到……`(^_^)a`
我以为我之前的博客都没了呢

当时有点懵，就直接去网上搜 `hexo 404` 去了，结果都是怎么做404页面的
我就又去 *reeder* 去看了一下博客，确实又问题
能显示博客的标题和简介，但是进入正文的时候404了

于是我就去 GitHub 博客仓库看了一下 public 的内容
发现问题出在文件夹目录上
我昨天晚上对一些文件夹进行了改名，目前除了 mac 相关的文件夹是小写，其余文件夹都用大写
而昨天的 html 记录急着上传，就直接 `hexo d -g` 了，导致更名的文件夹并没有在 public 中更改，而主页的链接由于增加了一篇博客进行了更新
最终结果是，主页的跳转链接是新的，而文件夹目录仍然是旧的

解决方案也很简单

```bash
hexo clean
hexo g
hexo d
```

只需要先 clean 清除 public，再重新 generate 产生新的 public 文件夹就可以了

{% endnote %}
