---
title: mac Clear Chrome Cache
date: 2020-08-08 23:32:50
tags: [MAC, ERROR, NOTE]
description: "AppCleaner didn't clean all data of Chrome<br>You will be dispointed after reinstalling Google Chrome<br>Your Chrome is still the old one"

---

{% note warning %}

之前在搞 ✈️，打算放弃之前用的别人的现成的 ✈️ 服务，转用 v2ray + 机场
结果 Chrome 莫名其妙的搞坏了
由于之前用过一个叫 astar 的 Chrome 插件，而它会修改 Chrome 本地的 proxy，影响了 v2ray 的工作
卸载这个插件之后，Chrome 依旧存在一些问题
于是决定卸载重装 Google Chrome

---

问题就出现在，重装之后发现，浏览器之前的所有数据都没有清理，安装过的插件都还在，✈️ 的问题也还在
google 之后发现，AppCleaner 并没有清理 Library 文件夹内的 Chrome 数据

---

除了用清理软件删除了的文件内容外，还需要删除以下几个文件
```bash
~/Library/Application\ Support/Google
~/Library/Caches/com.google.*
~/Library/Caches/Google
~/Library/Google
```

这才把 Chrome 的相关数据全删除干净了，再重新安装之后，也得到的一个全新的 Chrome 浏览器
（大佬说让最好用 firefox，如果想用 chrome，最好从 chromium 修改参数编译 😭
（时时刻刻提醒自己有多菜

---

另外，这次还发现了之前的 Adobe 的残留
哇这实在是
太恶心了
我都卸载了半年多了，之前在系统文件夹里各种晃悠还是漏掉了
😭

{% endnote %}
