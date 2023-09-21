---
title: Command Line Tool 
date: 2020-05-31 11:46:57
tags: [MAC, TERMINAL, APPLE]
description: Command Line Tools I recommand

---

{% note warning %}

# command line tool

## **homebrew**

the best manager for app on mac

### how to install

As you can see on the [homepage](https://brew.sh)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

Copy this command and paste in your Terminal, then press <enter>

And here is the older command

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

If you copy the older one then you will get

> The Ruby Homebrew installer is now deprecated and has been rewritten in bash

But it still works

### command you may use

| command               | action                                          |
|-----------------------|-------------------------------------------------|
| `brew search`         | search the package                              |
| `brew home`           | open homepage of the package                    |
| `brew info`           | search the information of the package           |
| `brew install`        | install a CLI(Command Line Interface) package   |
| `brew uninstall`      | uninstall a package                             |
| `brew cask install`   | install a GUI(Graphical User Interface) package |
| `brew cask uninstall` | uninstall a GUI package                         |
| `brew list`           | list installed CLI packages                     |
| `brew cask list`      | list installed GUI packages                     |
| `brew outdated`       | list installed packages which are outdated      |
| `brew update`         | update brew and cask                            |
| `brew doctor`         | diagnose brew issues                            |
| `brew cleanup`        | remove old versions                             |

[homebrew cheatsheet](https://devhints.io/homebrew)

### you may want some help

[homebrew docs](https://docs.brew.sh/)

## **ranger**

You may click [here](../mac-software/#ranger)

Also their [github page](https://github.com/ranger/ranger)

## **fuzzy file finder**

Type fzf in terminal and you will run *fuzzy file finder*

Thanks for it, I successfully remove all Adobe cache

It is a really helpful tool that you may give it a try

It can be use in *vim* as a plugin

Also their [github page](https://github.com/junegunn/fzf)

## *cloc*

This tool `cloc` **counts blank lines, comment lines, and physical lines of source code** in many programming languages

Don't know when and where to use it but make full preparation

Also their [github page](https://github.com/AlDanial/cloc)

## oh my zsh

> Your Terminal never feel this good before

"*Dress up*" my Terminal

### The plugins I use

1. git (default)

2. web-search

3. *zsh-autosuggestion* (more information below)

### Other suggestions

1. Let `DISABLE_AUTO_TITLE="true"` and write your own title

2. Do not add plenty of plugins which you never use

3. `alias c='clear'` (an example)

4. `bindkey -v` makes your Terminal **vim like**

Click [here](https://ohmyz.sh) for more information

## **zsh-autosuggestion**

I did appreciate fish that suggests next command

So I downloaded it as soon as updated to Catalina and changed bash to zsh

Really useful

You can download zsh-autosuggestion either by *brew install* or *oh my zsh*

## *pandoc*

Universal markup converter

Here is its [User's Guide](https://pandoc.org/MANUAL.html)

Replace `:%TOhtml` in vim

Also their [github page](https://github.com/jgm/pandoc)

## tree

Show your directories and files in tree mode

So **cool** as a geek

Also their [github page](https://github.com/torvalds/linux)

{% endnote %}
