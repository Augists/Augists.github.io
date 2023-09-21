---
title: MAC&IOS Tips
date: 2020-07-19 14:58:16
tags: [MAC, IPHONE]
description: Plenty of tips for using macOS (on updating)

---

{% note warning %}

# 一些使用 mac 的小技巧（持续更新）

{% note %}

部分技巧学自

* 少数派
* 苹果FANS

{% endnote %}

## macOS
* 自带输入法输入中文，可以用 `-` `=`来切换下一行候选词
* 自带输入法可以用 `tab` 给拼音注声调
* 在浏览器的地址栏输入网址，`command + enter` 会在新标签页打开网址但不跳转（可在任何网站内）
* `command + space` 调出 *spotlight* 后，输入要搜索的内容，`command + b` 可以直接在默认浏览器中以新标签打开并搜索
* 开机提示音
打开终端Terminal
	- 打开
```bash
sudo nvram StartupMute=%00
```
	-关闭
```bash
sudo nvram StartupMute=%01
```
* 不管是自带的 *Quick Time* 还是第三方的 *IINA* 都支持了触控板力度控制快进和回退键的快慢，按的越重，效果越快
* 可以在设置中打开并设置朗读，我的快捷键是 `option + esc`，默认朗读全篇，选中部分也可以（仅限于英文，你可以试试中文🤣
* 输入  `shift option k`（多试试在自带的中文输入法中按住 `option` 或按住 `shift option` 再敲键盘上的任何键
* finder 里可以用 `command shift .` 来快速显示或隐藏隐藏文件，unix 中的隐藏文件以 `.` 为文件名开头，ranger 里可以通过 `zh` 开启或关闭隐藏文件的显示
* QQ 里，可以通过 `control command` 再加上左右来快速从不常用群聊列表与普通列表切换
* QQ 中可以通过 `command D` 快捷删除会话（不删除记录），但是微信中只能右键删除
* *spotlight* 中查询单词的时候可以通过 `command l` 快速跳转到词典
* `command h` 隐藏一直到界面只剩下一个应用程序的窗口，而 *finder* 因为系统要求它必须一直在，所以当使用 `command w` 关闭掉 *finder* 窗口后可以将所有应用程序的窗口都隐藏
* `command m` 最小化窗口后想通过 `command tab` 来打开它，按住 `command` 不松手但松开 `tab`，按下 `option` 松开 `command`，当年就因为这个动画被第一次惊艳到
* 似乎 mac 的外接键盘是独立工作的（不清楚是不是 win 也这样），两边输入完全不想干，可以试试两个人同时对一台电脑做什么 😏
* 去掉超链接的粘贴，`shift option command v`
* 打开文件的状态下，想要把这个文件发送给别人？可以直接拖动文件上方的图标就可以发送当前文件啦

## ios
* 输入不小心没点上中文，输入成了拼音，可以是一下双击拼音，可能会重新出现候选词
* 输入法可以长按小地球，单手模式及选择输入法，设置里可添加表情键盘及一些特殊语言的词典
* 不再有 home 键的版本可以通过上划（将进入任务管理）时不松手再迅速下滑到底，将整个手机页面下拉，便于右手单手点左上角的返回等按钮
* 关于 iOS14 的一些小东西，可以看[这一篇博客](https://augists.top/APPLE/IOS-14-experience)

{% endnote %}
