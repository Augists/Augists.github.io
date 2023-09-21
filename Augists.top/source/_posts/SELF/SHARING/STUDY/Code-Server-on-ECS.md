---
title: Code Server on ECS
tags: [SHARING]
description: 'Those troubles during the process of building an Code Server on my ECS<br>Solved or Solving'
date: 2021-05-29 13:31:02

---

{% note warning %}

## 什么是 Code Server

![Screen Shot 2021-05-29 at 11.31.44 AM](https://i.loli.net/2021/05/29/Ft9MfxHQZ8TCdEK.png)

Code Server 是一个可以搭建在服务器上的网页版 VS Code，它允许你随时随地连接你服务器的 Code Server 并提供近似于本地 VS Code的服务，只需要你有一台能接入互联网的设备即可

> ## Highlights
>
> - Code on any device with a consistent development environment
> - Use cloud servers to speed up tests, compilations, downloads, and more
> - Preserve battery life when you're on the go; all intensive tasks run on your server

项目[链接](https://github.com/cdr/code-server)

以在苹果 iPad 为例，通过浏览器访问后 PWA，就可以获得一个 iPad 端的 VS Code

## 搭建 Code Server

### 下载安装

首先吧，你要有台服务器，服务器你要能自己开放特定的端口，要不让啥都免谈了。其次吧，你要能跟服务器进行一些交互，比如 SSH 登陆上去

下面就开始正式搭建啦，期间会遇到非常多的问题，有的经过我自己的摸索已经解决，也有的仍然没有找到合适的方法。如若你有什么想法，欢迎通过各种方式联系我啊

---

在官方的 GitHub 仓库里提到，可以通过脚本一键安装

```bash
curl -fsSL https://code-server.dev/install.sh | sh -s -- --dry-run
```

其中 `-s -- --dry-run` 参数是作为输出中间过程的，如果删掉参数只是不会接收到一些过程信息。在 `install.sh` 文件中，我们可以看到注释

```bash
--dry-run
	Echo the commands for the install process without running them
```

如果你也是使用的国内的服务器，没有办法让它能更便利的接近到外网时，就需要先在本机上下载 `install.sh` 脚本，然后通过 FTP 上传到服务器上了

运行 `install.sh` 脚本后会发现，它在尝试下载一个 deb 包。很明显，这个包又在国外

```bash
fetch "https://github.com/cdr/code-server/releases/download/v$VERSION/code-server_${VERSION}_$ARCH.deb" \
    "$CACHE_DIR/code-server_${VERSION}_$ARCH.deb"
```

于是，又要在本机下载这个 deb 包进行手动上传

那么上传之后，怎么才能让 `install.sh` 脚本继续工作呢？

查看刚才的 `fetch` 我们可以发现，脚本会把 deb 包下载到 `$CACHE_DIR/code-server_${VERSION}_$ARCH.deb` 这个路径下，所以我们也可以把包放在自己的 `~/.cache/` 下，并且按照脚本的命名方式进行更名，然后将 `fetch` 删掉，直接进入到

```bash
sudo_sh_c dpkg -i "$CACHE_DIR/code-server_${VERSION}_$ARCH.deb"
```

这里的 `sudo_sh_c` 是函数。需要注意的是，我们需要修改对应自己系统的 `install` 函数，比如我在 ubuntu 上安装，所以我需要修改的是 `install_deb()` 函数

![](https://i.loli.net/2021/05/27/SbPQAme3tcv4poM.png)

修改到这里，就可以使用官方提供的脚本进行一键安装了。比较不好的一点是，官方的 GitHub Wiki 对安装及安装之后的步骤并没有详细的说明，而只是说

> When done, the install script prints out instructions for running and starting code-server.

甚至给出的 in-depth setup and configuration 里也是这句话

### 启动服务

安装完成后，直接输入 `code-server` 回车就会启动服务啦，但是在此之前，我们还需要进行一点简单的配置

```bash
vi .config/code-server/config.yaml

bind-addr: 127.0.0.1:8080
auth: password
password: xxxxxx
cert: false
```

* `bind-addr` 为监听地址，这里我作为服务器，修改为 `0.0.0.0:12345`，即本地加上一个自己可以设定的端口号。默认的 8080 端口通常也会有其他应用使用，容易产生冲突，这里推荐改为自己喜欢的一个端口
* `password` 为登陆 Code Server 需要使用的密码，可以改为一个简单好记但是不容易被爆破的密码，在我的使用中我感觉 Code Server 会使服务器的安全等级急剧降低，通过 Code Server 可以直接编辑服务器的一些文件，有很大的安全风险
* `cert` 应该是 SSL 证书，如果没有的话直接 false 即可。对于普通人来说，http 带来的安全性问题应该影响不大，但是每次登陆 Code Server 之后都会提醒一遍听烦人的

在设定了给 Code Server 分配的端口号之后，我们需要在服务器的安全组里添加设定的特殊端口的开放。而想要让 Code Server 开机自启就要用到系统提供的 `systemctl` 了

```bash
systemctl enable code-server@
```

最好再 tab 一下

经过配置和启动之后，我们就可以通过服务器的公网 ip 和端口号登陆 Code Server 了

## 进入 Code Server 后遇到的问题

### ms-vscode.cpptools

如果你在插件商城中尝试安装了 C/C++，你会发现它提示的报错 VS Code 未能安装 ms-vscode.cpptools

同样也可以在本机下载之后上传到服务器上，然后在 Code Server 中扩展，三个点，从 VSIX 安装，然后选择下载的 `cpptools-linux.vsix` 文件。如有需要，可以随时重启 Code Server

```bash
systemctl restart code-server@
```

### open folder

一开始可能会出现无法打开文件夹的情况。可以通过在 welcome 界面中选择打开文件夹解决。左侧的几个按钮在我的测试中都出现了失灵的情况

### Database

我也尝试在服务器中安装了 PostgreSQL 并且通过 Code Server 直接在前台进行连接。也可能是由于 PostgreSQL 的配置问题，我在前端的 Code Server 一直没有成功连接上后台的数据库。我已经尝试了

* 修改 postgres 用户密码
* 修改用户配置文件
* 修改监听地址
* 修改连接时的 ip 地址

但是不确定具体问题出在哪里，提示的报错信息也只是验证失败。由于我已经有四个数据库和一个线上练习测试了，就不继续折腾这个

> 后来，我一个干事告诉我他买了 30 块钱的 Code，使用上来说可能更加适合作为 iPad 上的敲代码的平台。这个软件以前在白嫖的时候也安装过，后来需要更新的时候以为是免费安装的，卸载之后就再也没找回来了。
>
> 本次实验搭建 Code Server 使用的平台是由华为云提供。本身是数据库课程于华为公司合作，统一申请的 300 元抵用券，在课程结束后的 8 月份就过期了。于是我就想怎么才能把用不到的钱利用起来，就在华为云上购买了一台最低配置的 ECS 服务器作为实验平台。
>
> Code Server 是在很早以前就接触到的一个项目，一直很想自己动手实践搭建一下，但是当时看到的时候正好自己购买的阿里云学生机过期了，于是一直搁浅没有尝试。这次也很感谢华为云计算的平台，能自己搭建一个可以娱乐的平台，让我自己动手练习实践，体会到了很多。
>
> 目前已经在 ECS 上搭建过的项目：
>
> * 临时的 FTP Server
> * NextCloud
> * MC 私人服务器（最终失败了）
> * Code Server
>
> 还想再尝试或继续的项目：
>
> * 个人下载站
> * VPN
> * 挂载网盘
> * shell 脚本实战
> * python for beginners
>
> 仍需要继续学习的工具：
>
> * tmux
> * FTP Transmit
> * docker

{% endnote %}
