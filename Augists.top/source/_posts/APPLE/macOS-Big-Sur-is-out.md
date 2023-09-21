---
title: macOS Big Sur experience
tags: [MAC, APPLE]
description: 'macOS Big Sur is out!!! I update my mac at the moment that I got the software update information'
date: 2020-11-13 21:33:14

---

{% note warning %}

今天苹果推送了 macOS Big Sur 的系统更新！！！
我第一时间先去做了**系统备份**
之前的 1T 机械盘被我拆分成了 3 个部分
* 一部分是 APFS 格式只用来给 mac 系统查看，存放着只在 mac 上会用到的东西如 mac app 安装包，我自己私人的一些文件等（大部分人是 win，看不了 APFS
* 一部分是 NTFS 格式，由于是希捷的，所以希捷官网的 NTFS 软件就可以读取
* 最后一部分是 Time Machine，只留了 300GB，而之前半年的时间内的备份，时间机器已经基本满了，于是今天重新清空 BackUp 部分重新备份

---

备份好之后就直接进入更新啦
![](https://i.loli.net/2020/11/13/2LKqb9Ia4lpR3uw.jpg)
![](https://i.loli.net/2020/11/13/lq9JbNLGVdHo8SU.jpg)

更新完的开机一直转圈的 bug 还有

---

总体来说，经过 10 个 beta 版本的更新测试，大的 bug 已经基本没有了，但是小问题还是不少

* 顶栏的图标间距较大，有些让人感觉不在一条直线上
* 圆角矩形元素使用的有点过，如 *safari* 放全屏的状态下边角上会有一点奇怪，所有调用的系统的图形都变成了 r 值非常大的圆角
* 有些 app 仍没有做好新系统的适配，在顶栏会有点奇怪
* 顶栏一些图标没法用 `command` 拖动删除，需要从系统偏好设置里去掉掉显示的勾选，如 *siri*
* 顶部电池没法显示数字百分比，问了客服，他正和我说这个的时候下班了...
* 系统时间的顶栏变成了通知中心的入口，点击时间会打开小组件中心，这让我原来使用 *Itsycal* 自己设置时间格式并点击显示日历 📅 和日历事项的习惯相去甚远，本来好不容易开始从 *reminder* 转向 *calendar*，现在又需要改习惯了
![](https://i.loli.net/2020/11/13/6cweBjnslvOAF7U.png)
* 系统便好设置中的图标已经丑出天际，不忍直视...幸好平时看它不多
![](https://i.loli.net/2020/11/13/crELzVo4M3whUTk.png)
* 这个通知中心的回复...头像大的，一言难尽
![](https://i.loli.net/2020/11/13/upRmSn8erjZat5U.png)
* 如果你想试一试新系统的 *iOS App Installer* 你就会发现打开没啥反映打不开啊，据知乎人反馈问了客服说只有 M1 的 mac 才能使用这玩意？？？我进了包之后执行 *bin* 文件是这样的
![](https://i.loli.net/2020/11/13/TLKwfAsmXnVvEFH.png)
* 这个多桌面切换，有点离谱
![](https://i.loli.net/2020/11/13/rjyqcbUPau5p8gX.png)
* 全屏幕显示的时候上面有一个细条，现在看着它好难受。手动调整也无法再放大，是系统限制的，不是 *magnet* 的问题
![](https://i.loli.net/2020/11/14/6BuNfdDEM34bmLl.png)
* 有时候一些适配还有点问题的会变成黑色，目前 QQ 和 uPic 发现出现过这个问题
![](https://i.loli.net/2020/11/14/2vNQK1JeFzsMrdT.png)
* 新加了一个系统级的显示是不是有音乐、视频在播放的小玩意，和一些应用上的有点重复，图标也小一号，今天使用的时候识别也有点问题，希望后期能改进吧
![](https://i.loli.net/2020/11/14/u9DJVYHNXMl3IbT.png)
* 更新之后其他软件适配其实还算不错了，homebrew 看得我有亿点点难受
![](https://i.loli.net/2020/11/14/h5ypIkKetJFRVDd.png)
![](https://i.loli.net/2020/11/14/7AwiF8TIyZl36nG.png)
另外，python 这个应该是 python2 吧，被移除了
![](https://i.loli.net/2020/11/14/mc8sVw1yHuIFK25.png)

---

至于系统体验，我目前对流畅性没啥感觉，没有感觉有什么卡顿，也没感觉比原来流畅，只是正常水平
至于耗电，它电量数值都不敢显示，我也没啥感觉。我总不能动不动就去点它一下看看还剩多少电吧

{% note info %}

第二天更新：
耗电有点变多，但是因为上一代是 Catalina，所以感觉耗电没啥变化
作为参考，19 年的 mbp13 从早上开始用大概能用到晚上 5 点半多，如果和 Mojave 比的话应该耗电会多一点
目前电池 🔋 健康状况是 normal，开启了电池优化

11.15 更新：
bug 还是不少，系统的声音调用有点混乱，还没看懂声音的逻辑。截屏除了原来的截屏声音还增加了一个短声音，有点奇怪
photos 删除有时候非常卡，每次遇到它卡住我就重新打开 photos

11.16 更新：
我也不知道我在终端里输入个 》都要带声音是什么迷惑行为
今天还碰到了一点小 bug
![](https://i.loli.net/2020/11/16/V8OQZRxErAsNlUH.png)
新版 Pages 里所有原本蓝色的所有元素都改成了黄色，Numbers 改成绿色，Keynotes 都是蓝色……

11.18 更新：
今天在修改 png 图片名称时发现，原本隐藏的 png 图片删掉 `.` 后文件名称依然以浅色显示，但是不被隐藏
mac 版本 QQ 会在打开历史记录的时候连闪三次，不清楚是因为什么，可能是 QQ 还没有进行适配
QQ 的 *preference* 几个中间有可点但无效的占位
![](https://i.loli.net/2020/11/18/HJqmjzeMIXKSBF5.png)
今天能明显感觉到打字会有延迟，建议暂时不要升级

{% endnote %}

---

如果原来的系统是 Catalina，那我非常推荐你进行这次更新，Big Sur 11.0.1 版本就已经不错了，确实是值得更新的大版本，虽然我上面一直没有说它的好
但如果你是老旧机器并且系统停留在 Mojave，我建议可以直接停留在 10.14 版本了
如果有机会可以等一下下一代的 arm mac，可能更值得你入手

{% note %}

就在刚才，华为云又一次提醒我他们在搞双十一活动，虽然双十一已经过去了，他们还是固执的认为我需要在华为云上买点啥的
嗯，刚 18r 入了 *www.augists.com* 一年，感觉还不错，还可以 8.9r 再买 .cn 域名的，但是明显我买它就是玩玩没啥大用，这名字也没人和我抢

{% endnote %}

{% endnote %}
