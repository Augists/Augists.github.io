---
title: Pac Proxy for Github
tags: [GIT, NOTE]
description: 'How to write your pac configuration for surfing on GitHub'
date: 2021-06-14 10:34:15

---

{% note warning %}

为了能好好上 GitHub，真是招数用尽
之前转了一篇通过添加 Hosts 的方式正常使用 GitHub 并让图片正常加载的，没过多久就不好用了。当时也有提到，需要通过查询 hosts 的网站经常更新才可以。俗话说，懒是第一生产力，所以还是通过 pac 规则添加才是正道

如何自定义 PAC 列表规则

规则大概描述如下

通配符支持，如 `*.example.com/` 实际书写时可省略如 `.example.com/` 意即 `*.example.com/*`
正则表达式支持，以 `\` 开始和结束，如 `[\w]+://example.com\`
例外规则 `@@`，如 `@@_.example.com/_` 满足 `@@` 后规则的地址不使用代理
匹配地址开始和结尾`|`，如`|http://example.com`, `example.com|` 分别表示以 `http://example.com` 开始和以 `example.com` 结束的地址
`||` 标记，如 `||example.com` 则 `http://example.com`，`https://example.com`，`FTP：//example.com` 等地址均满足条件，只用于匹配地址开头
注释 `!`
分隔符 `^`，表示除了字母，数字或者`_ - 。％`之外的任何字符。如 `http://example.com^`，则 `http://example.com/`, `http://example.com:8000/:` 均满足条件，而 `http://example.com.ar/` 不满足条件

```pac
! Put user rules line by line in this file.
! See https://adblockplus.org/en/filter-cheatsheet
||amazonaws.com
||atom.io
||github.com^
```

{% endnote %}
