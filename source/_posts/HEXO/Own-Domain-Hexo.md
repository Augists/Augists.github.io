---
title: Own Domain >> Generate
date: 2020-05-31 19:16:51
tags: HEXO
description: How to create your own website? Generate...

---

# 如何搭建自己的个人网站

这篇文章中，我将尽可能详尽的展示我是如何搭建我自己的个人网站的，以及在这个过程中我都遇到了哪些问题

## 创建博客内容

第一步是要搭建博客的框架，这里我选择了HEXO框架来搭建

可以选择的主流框架：

1. HEXO
2. WordPress
3. Hugo
4. ...

可以选择的框架非常多，选择一个适合的就可以

### 我的创建参考

我在第一天晚上选择了同时搭建两个博客框架——**HEXO**和**Hugo**

参考视频：

- [HEXO codesheep](https://www.bilibili.com/video/BV1Yb411a7ty?t=1391)

	> 个人认为没有很大必要装cnpm，可以选择略过这一步

- [Hugo codesheep](https://www.bilibili.com/video/BV1q4411i7gL)

- [Hugo 天天向上的宇同学](https://www.bilibili.com/video/BV1Ua4y1e7i8)

	> 我是通过宇同学的视频中的网站选择了直接通过其他网站搭建Hugo博客

### 我创建中遇到的问题

1. GitHub Page原则上只能做一个
	> 这里指username.github.io直接访问而不是username.github.io/reponame.github.io，创建时没有写对username.github.io为仓库名的可以后期在setting中修改仓库名或直接修改用户名
	> 我的第一个github.io创建时写错了username，后期直接修改了用户名让它匹配个人网站的名字。username是sign in as xxx的那个
但是通过netlify网站可以创建academic-name仓库来生成另一个个人主页而不与GitHub Page冲突
2. 在我第二天对Netlify网站的修改过程中，因为hugo没有在本地，所以会有很多意外让网站的渲染出错。最终暂时放弃了Netlify个人网站。同时非本地让对它的主题修改变得异常麻烦，目前对Netlify的要求是作为以后的个人简历网站
3. HEXO一直有warning，目前没有查到合适的解决方式，>> 暂且搁置
4. 我的HEXO不知道为啥非常容易让电脑风扇狂转，温度上升。>> 目前不清楚原因
5. gitee page上不能显示js和css的配置，原因不明 >> 放弃gitee page
6. live2d配置中出的出得问题比较多，最终解决了目前可行的部分

### 我的搭建过程

#### 安装Node.js

可以选择[官网](https://nodejs.org/zh-cn/)直接通过下载器安装

也可通过CLI安装，参考[包管理器安装](https://nodejs.org/zh-cn/download/package-manager/)

##### macOS

```zsh
brew install nodejs
```

##### ubuntu

```bash
apt install nodejs
```

或通过编译源码安装（推荐）（我使用的）[参考github](https://github.com/nodesource/distributions/blob/master/README.md)

```bash
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

编译源码安装可以直接有npm，而我一开始通过apt安装的无npm

#### npm安装Hexo

参考[Hexo官网](https://hexo.io/zh-cn/)

```bash
npm install hexo-cli -g
hexo init blog
cd blog
npm install
hexo server
```

其中server指令可以简化为s

#### 安装主题

我选择了NexT主题，[参考官网](https://theme-next.iissnan.com/)

> 由于macOS自带了Git，这里不再赘述。windows的同学建议先安装git，不推荐每次都下载zip

```bash
cd blog
git clone https://github.com/iissnan/hexo-theme-next themes/next
```

在blog文件中的`_config.yml`文件中，找到theme，改为你安装的主题（默认为landscape）

## Hexo基本使用

### Hexo文件系统

```zsh
$ tree -L 1
.
├── _config.yml
├── db.json
├── debug.log
├── node_modules
├── package-lock.json
├── package.json
├── public
├── scaffolds
├── source
└── themes
```

#### _config.yml

站点配置文件，是root级别的存在，高于主题的配置文件。

##### 主要配置项目

- title
- subtitle
- author
- language: 网页固定内容的语言，如tags标签，categories目录等
- permalink: 选择文章链接的方式，我只保留了:title/
- theme
- deploy: 如果安装了git-deploy插件可以配置为git仓库，一键push
- live2d: live2d插件的配置位置*_*
- skip_render: 不需要hexo渲染的文件名

#### package.json

json文件，可以查看当前hexo文件夹已经安装的插件信息

#### node_modeles

当前hexo的核心文件夹，内有所有hexo需要的重要内容，一般不要修改

#### public

hexo生成后的文件，为git push的仓库文件。网站最终的效果与public一致

为`hexo g`后产生，可通过`hexo clean`删除

#### scaffolds

模板文件，可修改

##### 我修改的内容

```markdown
---
title: {{ title }}
date: {{ date }}
tags:
description:

---
```

#### source

内容文件夹，所有自己写的文章以及需要添加的图片等文件需要放在source文件夹中

> 如需像我一样添加自己的域名，需要在source中添加CNAME文件，将域名写入后，在站点配置文件`_config.yml`中skip_render添加CNAME

#### themes

下载的主题都放在themes文件夹中，主题的魔改都需要在themes中的主题内修改

### Hexo基础指令

```bash
hexo init	# 初始化hexo
hexo clean
hexo g
hexo d
hexo d -g	# 与hexo g && hexo d相同，先生成在部署
```

## 美化博客

参考[文章](../Beautify-Hexo)

## 网站部署及域名配置

参考[文章](../Own-Domain-Deploy)
