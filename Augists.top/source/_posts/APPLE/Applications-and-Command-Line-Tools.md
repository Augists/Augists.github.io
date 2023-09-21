---
title: Applications & Command Line Tools
tags: [APPLE, MAC, TERMINAL]
description: '!!!NOW!!! These applications and command line tools are on my mac<br>which I strongly recommend'
date: 2021-08-20 16:27:19

---

{% note warning %}

There is the overview of my recommends. 不全，但是是我在重装系统之后经过重新考虑之后保留下来的推荐

{% note info %}

<center><b>System</b></center>

* Caffeinated: 保持系统常量不休眠的小工具
* AppCleaner: 软件清理
* Hidden Bar: Menu Bar 隐藏
* IINA: 视频播放器
* Karabiner: 修改键盘映射
* OnlyX: 系统垃圾清理
* Paste: 剪贴板历史
* The Unarchiver: 解压
* uPic: 图片上传图床
* Vimari: safari 的 vim-like 快捷键
* V2rayU: VPN
* rectangle: 窗口管理器
* yabai: 窗口管理器
* shkd: 快捷键工具
* spacebar: Menu Bar 定制
* htop: 活动监视器

<center><b>Code</b></center>

* Dash: 查看文档
* Kitty: 终端模拟器
* Typora: markdown
* Docker: 虚拟容器
* homebrew: 包管理器
* tmux: 终端复用
* neovim: 编辑器
* fzf: fuzzy file finder
* nnn: 文件管理器
* autojump: 快速跳转
* zsh
	* oh-my-zsh: 终端美化
	* zsh-autosuggestions: 终端补全
	* zsh-syntax-highlighting: 终端高亮
* clang-format: c language formatter

{% endnote %}

简单说明是啥之后，就可以挑主要的说了

## Caffeinated

这是一个比较简单，图标也好看一点的禁止休眠工具，直接显示在 Menu Bar 上 
比其他同类软件更简单，不提供一些有的没的工具，与终端指令 Caffeinate 相同效果

## AppCleaner & OnlyX & fzf

卸载软件其实一直都是一件很头疼的事情，即便有了这两个工具
首先，一定不推荐任何打着清理名头的软件，如 CleanMyMacX、腾讯柠檬清理等
AppCleaner 在卸载软件时查找它在系统中存储的一些配置信息文件，但是并不是所有都能找到
它主要检索 `$HOME/Library` 下的文件，但是即便是这样，也并不是能发现全部可以删除的垃圾文件
而 OnlyX 是更为深度的清理系统缓存等垃圾，需要对一些名词有一定了解
众所周知，macOS 采用了沙盒机制
我第一次对沙盒机制感慨是在看了飞蚊话的[分析视频](https://www.bilibili.com/video/BV1WA411V7r8)
即便有这样优秀的思想，也不能防止软件忽悠你获取权限然后把文件放在不该放的地方
所以我一般会在删除完软件或者我想要清理系统垃圾的时候手动去两个 Library 里看看
心情好就去根目录用 fzf 开个全盘扫描，经常会发现几个漏网之鱼
举个例子，前几天下载了 Parallel Desktop 试用了几下，一看空间，好家伙，占了我 50G 的空间
在 AppCleaner 找完一部分，手动去 Library 里删了一些之后，我又去根目录用 fzf 扫了一下，果然发现在 `/etc` 和 `/var` 下都还有配置文件

## Karabiner

这个是在键盘与系统之间虚拟出一层来，对键盘的键位映射进行修改
由于我现在开始用 HHKB，一些键位我就需要重新改一下（最主要还是因为 QQ
我的 Karabiner 配置文件已经放在 GitHub 上的 dotfiles 里了
通过 json 文件简单修改就可以用了

## uPic

uPic 的作者挺好玩的，之前加了 tg 群，正好碰到他说要上架 app store了
app store 里的版本是收费的，同时因为软件开源，免费版可以直接从 GitHub 上下载

## yabai & shkd & spacebar

最近新换的窗口管理器，配置也比较简单，实现效果就和 Linux 下的如 dwm、i3 等类似
经过一番操作，我的 mac 它更像 Linux 了
但是 yabai 需要关闭 SIP
不推荐了解不够深入的关闭 SIP

## Kitty

Kitty 是一个更符合 Unix 哲学的终端模拟器，基于 GPU，更快速
我用 Kitty 替换了 iTerm2，主要是 iTerm2 太过于庞杂，提供的功能基本都用不上
而 Kitty 只需要修改它的配置文件就可以啦 `~/.config/kitty/kitty.conf`
在换用 Kitty 之后，我把我的配置文件重新整理了一遍，按照模块进行加载

## nnn

nnn 我用来替换了 ranger
其实论实用，ranger 更好用一点，但是在我电脑上，一旦开启了一些功能就会变卡
如果打开了 git，直接就卡到怀疑人生
我之前的 ranger 经常在预览上卡住。一开始我以为是预览大文件会卡，后来发现啥都可能卡
ranger 的好处是它可以直接调用 iTerm2 在终端显示图片预览
而 nnn 虽然也采用 vim-like 快捷键，但是它没有了三栏的设计，操作也都尽可能的用一个键完成
总的来说，应该算是 ranger 的下位替代吧
另外有一点，如果想让 nnn 显示图标，需要自己手动编译，修改编译参数，这在无形中提高了门槛

## neovim

vim 作为我一直在使用的编辑器，一直就仅限于想要的那一部分就再没往下探索新的东西了
重装系统之前改用 neovim 重新进行了配置，新的 neovim 配置基于 coc，并且终于我开始用提示了
LSP 让它的配置变得非常好用
最近也在想改用 lua 重写配置，放弃 coc，直接转用新配置
目前只是学会了 lua，还没有换新 *init.lua* 的动力

## autojump

autojump 算是比较推荐的一个终端工具，它可以记住我的 `cd` 路径，并在后面直接 `j` 过去
在从 ranger 改用 nnn 之后我把 autojump 卸载了，但是最近又重新安装回来了
我一直把它作为文件管理器的辅助，比如要写博客的时候 `j augists` 就会跳到博客目录

---

{% note info %}

最近的最后一次大改是因为在学习 python
在 macOS 里，系统自带了 python2.7
如果你使用 `xcode-select --install` 安装了 Command Line Tools
它就会给你安装上 python3（目前是 python3.8)
但是因为路径和权限的原因经常会出现一些问题
所以我现在电脑上同时存在了 3 个 python

* 系统自带的 python2
* Command Line Tools 安装的 python3.8
* homebrew 安装的 python3.9

2 为系统提供服务
3.8 为 neovim 服务，在 `$PATH` 中存放在后面
3.9 是我平常用的，因为 homebrew 很鸡贼的让安装的路径是环境变量的第一个

{% endnote %}

{% endnote %}
