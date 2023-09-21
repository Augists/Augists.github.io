---
title: Auto Close WLAN Cellular on IOS
date: 2020-08-09 22:18:21
tags: [IPHONE]
description: "Some Apps will automatically turn off WLAN & Cellular in setting<br>How to fix it"

---

{% note warning %}

今天在搞小火箭 🚀 的时候遇到的问题
在设置中打开小火箭的 `WLAN & Cellular` 后，打开小火箭 🚀 的 app，会自动把设置中应用的网络许可关闭
来回开了好几次之后，我确定不是我的问题，是 ios 的 bug **之一**
所以我去恢复设置啦
路径：`Settings - General - Reset`
如果你也遇到了这个问题，可以试试先只 `reset network settings`
如果还是不行，就和我一样 `reset all settings` 就可以啦（我啥也没管，直接选了 all
all 会删除在 Settings 里的所有设置，包括保存过的 wifi 密码以及 face id
应用的一些设置也在 Settings 里，所以也会删除，但是不删除应用和应用数据，只会删除比如 `WLAN & Cellular` 这种设置中可以修改的内容
**注意⚠️ 如果你也有在本机以游客登陆保存在 Game Center 中的游戏 app……最好别 `reset all settings`，我的皇室战争就是这么挂掉的，半个月冲了 4000 杯的数据被覆盖掉了 😭**

---

说一点题外话，这次重置也让我看到某些 app 在我重置完还没点开的时候就开始申请 `WLAN & Cellular` 了，尽管我已经很久很久没点开过他们，他们还是在后台偷偷运行着
我们可能真的需要一点 **照明弹** 💣

{% endnote %}
