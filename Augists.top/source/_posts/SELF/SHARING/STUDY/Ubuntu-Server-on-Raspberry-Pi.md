---
title: Ubuntu Server on Raspberry Pi
tags: [DEVICE, SHARING]
description: 'There is not much executable and helpful manual page for Ubuntu
Server on a Raspberry Pi'
date: 2021-10-05 22:51:08

---

{% note warning %}

又在树莓派上折腾了一顿，简单整理一下一开始遇到的问题

---

## 换源

现在拿到 ubuntu 每次第一件事就要先去网上找镜像源。比较习惯用清华源和中科大源
按照惯例写了几个镜像源，一更新发现坏了，根本不行
之前一直是在服务器上做配置，树莓派最大的区别在于改用了 arm 架构
镜像源对 arm 架构要使用 ports 源

![UTSC ubuntu ports](https://mirrors.ustc.edu.cn/help/ubuntu-ports.html)
![TUNA ubuntu ports](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)

## 时间

换完源之后更新，还是不行，报错大概是这个

```text
apt-get update failed because certificate verification failed because handshake failed on nodesource
```

一开始是用 ca 证书解决的

```bash
sudo apt install ca-certificates
```

但是想了想，应该不是这个问题。`date -R` 查看系统时间，时区默认被设置成了格林尼治

```bash
tzselect
```

不知道这有啥用，它加在 `.profile` 文件里 `TZ=`，不是很优雅

```bash
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

大概用软链接更合理

## 静态ip

ubuntu server 配置静态 ip 和之前树莓派自己的 raspbianOS 上不太一样，要复杂一些
因为本身我们是为了搭建 ss 服务器，并且有一些特殊需求，就没有配好

```bash
sudo vim /etc/netplan/00-installer-config.yaml
```

```text
network:
  ethernets:
    ens160:     #配置的网卡的名称
      addresses: [192.168.0.105/24]    #配置的静态ip地址和掩码
      dhcp4: no    #关闭DHCP，如果需要打开DHCP则写yes
      optional: true
      gateway4: 192.168.0.1    #网关地址
      nameservers:
         addresses: [114.114.114.114,180.76.76.76]    #DNS服务器地址，多个DNS服务器地址需要用英文逗号分隔开
  version: 2
  renderer: networkd    #指定后端采用systemd-networkd或者Network Manager，可不填写则默认使用systemd-workd
```

```bash
sudo netplan apply
```

{% endnote %}
