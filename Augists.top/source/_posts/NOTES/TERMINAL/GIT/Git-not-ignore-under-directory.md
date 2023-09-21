---
title: Git not ignore under directory
tags: [GIT, NOTE]
description: 'How to write gitignore file<br>Ignore all except specific files under directory'
date: 2021-06-01 21:25:07

---

{% note warning %}

先来看我的情景吧
{% note info %}

```bash
# dotfiles
/*
!.gitignore
!.gitconfig
!.zshrc
```
之前是忽略目录下所有文件及文件夹，只追踪
* `.gitignore`
* `.gitconfig`
* `.zshrc`

现在想要添加对 `.config` 文件夹下的一些文件或文件夹的支持

{% endnote %}

一开始想的比较简单，就直接添加呗，于是

```bash
# dotfiles
/*
!.gitignore
!.gitconfig
!.zshrc
!.config/
```

如果你也尝试一下，就会发现，git 始终无法添加上对 *config* 文件夹下内容的追踪
查了好久都没找到应该怎么写，最后看到了 *git-doc* 才明白
官方给的例子是这样
```bash
$ cat .gitignore
# exclude everything except directory foo/bar
/*
!/foo
/foo/*
!/foo/bar
```

也就是说，想要想让 *git* 追踪文件夹里的某些内容，需要先追踪全文件夹，然后在忽略文件夹下的所有内容，再添加对单个文件的追踪

```bash
# dotfiles
/*
!.gitignore
!.gitconfig
!.zshrc
!/.config
/.config/*
!.config/htop
!.config/ranger
!.config/.zsh_history_bak
!.config/.tmux
```

> tmux 下 vim 似乎不是很好用

{% endnote %}
