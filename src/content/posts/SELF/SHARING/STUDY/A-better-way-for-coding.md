---
title: A comfortable way for coding
tags: [CODE, SHARING]
description: 'After <i>remake</i> my coding tools, I find my comfortable zone'
date: 2021-08-08 09:44:25

---


这几天一直在尝试从头重新配置一个更适合我使用的 coding platform，用这篇博客简单记录一下我的配置过程
是探索，也是从上一个舒适区里走出来，划定一个更大范围的舒适区


我一直使用终端作为我的 coding platform，所以我也将基本围绕终端展开


---

## iTerm2

既然是要走出舒适区，那肯定就要大胆尝试一下新东西。[iTerm2](https://iterm2.com) 一直是我不知道需不需要尝试的一个新玩意。一直以来看所有的 mac 装机推荐文章或视频里很多都会告诉你，当你拿到一个新 mac 的时候，要先下载 iTerm2，然后安装 `oh-my-zsh`。这就和让装 Alfred 一样，完全不知道它好在哪，但是就是所有人都推荐装

目前就在使用 iTerm2。尽管在换用 iTerm2 之后我仍然没有很明显的感知它有多少特别的功能并提升了我的终端使用体验，但是通过设置让它变得比原生 Terminal
更好看了是真的。我取消了顶部的 title bar，并且添加了彩虹 🌈 色小组件，这就是我现在改用 iTerm2 的主要原因了

![iTerm2](https://i.loli.net/2021/08/08/6ngbcAlLQBmtUrx.png)

当然，每个东西肯定有好有不好。iTerm2 最让我无法忍受的是每次粘贴都会刷新屏幕，就一个非常明显的闪屏。虽然可以理解，但是对它的好感度大打折扣。除此之外，之前说的打开 vim 再退出时终端会自动变到最后一行的问题在改用终端模拟器之后并没有解决，反而是换成 neovim 之后解决掉了

## neovim

相比 iTerm2，[neovim](https://neovim.io) 带给我的体验提升就非常大了，甚至可以说是飞跃。Neovim 相比于 vim，进行了非常多体验上的优化，比如便捷的添加如 python 支持，通过命令直接查看 provider 的状态等等。同时 neovim 下也提供了一些插件的支持，提供了新的 api。现在我甚至可以不用分屏就能打开终端或者 fzf 了

![fzf](https://i.loli.net/2021/08/08/wYOWZb7krNFag5q.png)

## coc.nvim

更换了 neovim 之后，我也对我的 [vimrc](https://github.com/Augists/ZDCZ-vimrc) 进行了重写。新的 `init.vim` 改为基于赵启明大佬的 [coc.nvim](https://github.com/neoclide/coc.nvim) 进行配置，尽可能多的使用 LSP 插件体系

在以前我认为，刚学习敲代码，就应该去掉代码提示，像在记事本写代码一样减少机器辅助。现在我已经到了日常需要查文档才能写代码的时候了（其实就是不会写了），尽管装了 Dash 但是从来不用……Code Completion & Document 显得非常重要了。我屈服了

## glow

`glow` 是一个似乎不是很轻量的 markdown 终端渲染程序
很明显我并不会去使用它，我已经有太多的 markdown 渲染了，但是这不妨碍我把它放在推荐列表，因为确实很好看

## brew rmtree

`homebrew` 的 `formula & cask` 的卸载一直是一个大问题，因为它没有像 `apt` 那样的 `autoremove` 来自动清理不需要的依赖。后果就是我在以前使用的时候每次安装软件都会把终端的内容打印到一个文件里进行存储，然后在卸载的时候对照着一个一个删掉

`retree` 是一个辅助清理不需要的依赖的工具，但是在我的使用中它似乎对新系统的兼容性有待提升，就像我每次使用 `homebrew` 都会收到一个新系统的警告一样烦人

> 我在尝试 `pip-autoremove` 的过程中遇到了更加恶心的问题。简单来说就是 mac 系统中的 python 太多太乱导致的，这导致我直接放弃了对 `pip-autoremove` 的研究

