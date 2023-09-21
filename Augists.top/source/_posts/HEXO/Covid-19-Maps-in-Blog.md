---
title: Covid-19 Maps in Blog
tags: [HEXO]
description: ''
date: 2021-01-24 17:45:15

---

{% note warning %}

我给博客添加了当前的新冠疫情地图，现在正在纠结放在左边 sidebar 上还是单独做一个页面
先写出来记录下怎么做的

---

```
<iframe src="https://www.lovestu.com/api/project/cnmapyinqing/obj.php" height="500" frameborder="no" border="0" width="100%"> </iframe>
```

最重要的一行代码，用大佬做的框架直接生成
可以选择国内疫情情况还是全球疫情情况
如果你也想插入在 sidebar 的最下面，可以按照我下面的步骤来做

---

打开
`theme/next/layout/_partials/sidebar/site-overview.swig`
直接在文件的最下面插入刚才的这行代码就可以啦

但是需要注意的是，渲染出来的效果可能不太合适
需要通过
`theme/next/_config.yml`
文件中修改 sidebar 下的 width 数值

{% endnote %}
