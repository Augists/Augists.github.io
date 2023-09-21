---
title: GitHub DNS
tags: [GIT, NOTE]
description: 'Solve DNS problems while surfing on GitHub<br>without VPN connected<br>From C4L-ITGOYO'
date: 2021-05-09 19:52:52

---

{% note warning %}

# 解决 GitHub 访问问题

在使用终端的时候经常会遇到raw.githubusercontent.com 443之类的错误，这个是由于发现是 github 的一些域名的 DNS 解析被污染，导致 DNS 解析过程无法通过域名取得正确的 IP 地址。

## DNS 污染
DNS 污染，感兴趣的朋友可以去了解一下。

## 解决方案
打开 [https://www.ipaddress.com/](https://www.ipaddress.com/) 输入访问不了的域名

解决方法：
查询之后可以获得正确的 IP 地址

在本机的 host 文件中添加，建议使用 switchhosts 方便 host 管理

编辑 `/etc/hosts` 文件，添加下面这些

```bash
140.82.114.4 github.com
140.82.114.4 gist.github.com
185.199.108.153 assets-cdn.github.com
151.101.64.133 raw.githubusercontent.com
151.101.108.133 gist.githubusercontent.com
151.101.108.133 cloud.githubusercontent.com
151.101.108.133 camo.githubusercontent.com
151.101.108.133 avatars0.githubusercontent.com
151.101.108.133 avatars1.githubusercontent.com
151.101.108.133 avatars2.githubusercontent.com
151.101.108.133 avatars3.githubusercontent.com
151.101.108.133 avatars4.githubusercontent.com
151.101.108.133 avatars5.githubusercontent.com
151.101.108.133 avatars6.githubusercontent.com
151.101.108.133 avatars7.githubusercontent.com
151.101.108.133 avatars8.githubusercontent.com
```

{% note info %}

up 推荐使用 switchhosts 进行 host 管理，实际上对于大部分人来说，不需要频繁进行 host 切换，所以我没有安装

{% endnote %}

{% endnote %}
