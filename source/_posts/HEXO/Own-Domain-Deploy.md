---
title: Own Domain >> Deploy
date: 2020-06-01 08:52:07
tags: HEXO
description: How to create your own website? Deploy...

---

# 如何搭建自己的个人网站

这篇文章是部署篇，将继续[上一篇](../Own-Domain-Hexo)的搭建篇写。如有需要请先阅读[搭建篇](../Own-Domain-Hexo)

## 部署到GitHub Page

可选择：

- GitHub Page*_*
- Gitee Page(我失败了)*_*
- 华为云
- Coding Page(腾讯云)
- 服务器+域名(较复杂)

> *_*为我尝试过的

### GitHub账号创建

部分地区的部分运营商可能无法正常注册和浏览GitHub，详情请询问运营商

按照正常流程创建即可，GitHub可以正常发送国内的邮箱

### 主页仓库

创建一个新的仓库作为个人主页的仓库。命名推荐为username.github.io，但其实并非强制

注意：username是个人GitHub主页上左边较小的那个名字，而非较大的那个

![GitHub index](https://tva1.sinaimg.cn/large/007S8ZIlly1gfcpmt54obj31c00u01kx.jpg)

在我的GitHub主页中，为Augists

### 部署GitHub Page

如果仓库名使用username.github.io，则GitHub Page会自动生成；否则，需要从setting中手动生成

GitHub Page通常需要一定时间来刷新，每次push新内容后耐心等待

### 后续更改

既然可以转接到自己的域名，那么是不是后续可以任意创建仓库，然后转接到自己的域名即可。而无需将主页仓库创建为username.github.io？目前仍然存疑，需要后续再阅读GitHub Page的手册

## 转接到自己的域名

### 购买域名

[阿里云](https://cn.aliyun.com)

我购买了两个域名，分别为augists.top和augists.网站

其中，augists.网站为阿里云的活动，在域名搜索时选择2800元的网站域名套餐之后结算是为免费

但是，GitHub不接受中文域名，所以这个域名目前暂时没有用处

免费的网站域名每个人可以申请三次

### 域名解析

购买完自己的域名以后，进入控制台，给域名添加解析。使用免费的解析即可

域名解析界面选择新手引导，然后只需要填写GitHub Page的ip即可完成

> 如何获取原GitHub Page的ip？
>
> 在终端中，ping uername.github.io
> 获得的反馈中，括号内的即为ip

#### 我在没有购买域名之前的疑问

我以前以为域名必须与DNS解析一起购买，网上查询并没有文章面向我这种小白，所以之前一直没有尝试购买域名

实际上，免费的解析大概已经够用了，至少对于个人网站来说，完全足够

### 转接主页

在source文件夹中添加CNAME文件，里面写自己购买的域名

**注意**：不需要写www，例如我的CNAME内只需要写augists.top

push之后，GitHub会自动将CNAME中的内容写入setting的个人域名中。如果没有，请手动填写

#### 转接主页中我遇到的问题

##### Domain's DNS record could not be retrieved

在这个过程中，我遇到了这个问题

* Domain's DNS record could not be retrieved.

![Domain's DNS](https://tva1.sinaimg.cn/large/007S8ZIlly1gfcqjdpf3bj31im0u0dnb.jpg)

通过查询，这种情况出现的原因有三种：

1. 域名解析失败：需要去域名解析控制台看是否解析出现问题，ip是否填写有误
2. CNAME填写错误：CNAME中不要填写其他的内容，也不要填写www等
3. 域名没有实名认证：需要在阿里云控制台中进行实名认证，认证成功大概用了半天的时间

##### Insecure

在刚配置好个人域名并可以通过个人域名访问网站的时候，进入网站会显示不安全

我通过在GitHub仓库的setting中，开启https Force选项解决

##### 微信中无法访问网页

由于GitHub服务器在国外，通过这种方式购买的域名无需进行备案

而未进行备案的域名在微信中无法进行访问，被直接拦截了

由于我懒…没必要为了能让vx内访问而大费周章的对域名进行备案

## 继续美化博客

参考[文章](../Beautify-Hexo)

# 完结撒花🎉🎉🎉
