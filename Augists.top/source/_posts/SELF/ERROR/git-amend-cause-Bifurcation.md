---
title: git amend cause Bifurcation
tags: [GIT]
description: 'git branch bifurcation caused by git commit --amend command'
date: 2022-09-12 00:35:13
---

{% note warning %}

今学长拿着下面的这几张图问了我一个问题，为什么他用 `git commit --amend` 之后就会出现分支分叉的情况

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/photo_2022-09-12 00.58.29.jpeg">

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/photo_2022-09-12 00.58.31.jpeg">

我们先来了解一些 `git` 的 `amend` 指令是干什么的

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/photo_2022-09-12 01.02.57.jpeg">

简单来说，它就是会修改你上一次的 `commit`。直观上看，修改的是上一次 `commit` 中写的提交信息；但是隐性的说，在你上一次 `commit` 之后再做的修改也会被包含到这次的 `commit --amend` 中

我问学长要了他 git 分叉的两条路径节点的信息

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/photo_2022-09-12 00.58.34.jpeg">

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/photo_2022-09-12 00.58.37.jpeg">

可以看到，蓝色的分支里 Branches 的信息为 `master | origin`，而粉色分支的信息为 `origin/master`。来看看 `origin` 指代的是什么意思

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/photo_2022-09-12 01.10.12.jpeg">

可以把他理解成一个起别名为 `origin` 的指针，指向了某一个远端的 git 服务器地址。关于这一点，可以参考 `.git/config` 文件，这里我以博客仓库中的为例

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/photo_2022-09-12 01.11.53.jpeg">

如果你是使用 HTTPS 协议作为 git 的传输协议，那么在 `[branch "master"]` 中应该看到的是

```ini
[branch "master"]
  remote = origin
  merge = ...
```

相比 SSH 协议的写法，HTTPS 版本看的更加明显。`remote` 指向了 `origin` 别名，而 `origin` 又指向 `[remote "origin"]` 部分

同样，如果我们添加一个 `mirror`，用它来指向一个新的仓库地址，HTTPS 版本的写法就可以大概写为

```ini
[core]
  ...
[remote "origin"]
  url = ...
  fetch = ...
[remote "mirror"]
  url = ...
  fetch = ...
[branch "master"]
  remote = origin
  merge = ...
```

这时如果 `git push` 就只会发 `origin`，想要给 `mirror` 发送就需要写成 `git push mirror master`（大概是，没试过
如果此时修改 `remote = mirror`，你省略写法 `git push` 就会发给 `mirror` 指向的仓库

回到正题，实际上导致学长 git 的分支分叉的流程是
change file -> `git add & commit` -> `git push` -> change file -> 'git add & commit --ammend' -> `git push`

发送到远端的服务器之后，又通过 `amend` 修改了本地上一次的提交，这就导致了本地和远端出现分叉的情况

事实上，如果提交够规范，每一次 `commit` 都是一次功能实现或更新，`amend` 只能说是为了提交更规范的一种补救措施。学长考虑的是维护 git 提交更干净，所以才想到用 `git commit --amend` 替换 `git commit` 的做法，而在规范提交的情况下，就没有必要再花费精力去维护提交干净了

---

> 另外，代码块好像不能识别 `.ini` 文件，也可能是 markdown 的代码块不应该写 ini 格式。借着这个机会还顺便了解了一点几种配置文件的区别，尤其是 ini 和 TOML

---

## Reference

* cht.sh
* [git 合并两个 commit](https://www.bilibili.com/video/BV1v3411n7Wh?spm_id_from=333.337.search-card.all.click&vd_source=970c58530383d2118b4d7ea7b310c0ca)
* [git 多远程仓库](https://www.cnblogs.com/bwar/p/9297343.html)
* [常见配置文件格式](https://blog.csdn.net/winter_wu_1998/article/details/103469213)
* [Config 文件对比](https://tao-fu.gitee.io/2020/12/03/%E6%9C%BA%E5%99%A8%E4%BA%BA%E6%9E%B6%E6%9E%84/config_format/)

{% endnote %}
