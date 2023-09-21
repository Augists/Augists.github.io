---
title: How to choose a suitable laptop for freshmen majoring in Software Engineering
tags: [SHARING]
description: 'This is an analysis of the computer needs of software engineering students, and it encompasses most of the different computer needs around me.<br>Hopefully it will help you!'
date: 2022-07-10 19:57:55
---

{% note warning %}

> 这是一篇给远古时代装机猿的[活动](https://www.bilibili.com/video/BV1kZ4y1i7Le?spm_id_from=333.999.0.0&vd_source=970c58530383d2118b4d7ea7b310c0ca)的投稿
> 整理了对于 DUT （尤其）软件学院及相似专业的同学对电脑的需求，希望能对相关专业的学生提供参考
> 装机猿的[活动整理](https://www.bilibili.com/video/BV1Ga411Q78p?spm_id_from=333.999.0.0&vd_source=970c58530383d2118b4d7ea7b310c0ca)
> （希望我能如愿得到装机猿 T 恤

---

> 整理了我和周围同学以及工作室里使用的情况
>
> 每个人情况不一样，需求也不同。主要包括三个方面：代码开发、图片视频制作、游戏
>
> 我本人用19款mbp13 次丐版+xbox+switch+云服务器，外接27寸4k60Hz显示器（带65W反向充电c口）（代表低端mac用户）
>
> 同学A用mbp14 次顶配+win 2019款Y7000P+ps5，外接27寸2k75Hz显示器（代表高端mac用户）
>
> 同学B用win游戏本ROG gl504gx（代表win用户）
>
> 同学C用win轻薄本联想Yoga14s（代表win用户）
>
> 同学D用win台式机+win轻薄本（代表普通台式机用户）
>
> 工作室里组的win台式机+NAS+树莓派等（有额外需求的台式机用户）
>
> **需要提的是，计算机专业意味着肯定不会只用一个系统。不管是双系统还是虚拟机等方式，win需要装Linux，mac需要win或主机来打游戏**

## 你在哪所学校和专业

所有人都来自 大连理工大学 软件学院

工作室为软件学院DV工作室，负责校区的海报、视频等工作

## 平时会用到什么软件

* 自己（轻度开发，web后端方向，科研）
  * 终端：Kitty+Terminal（大部分东西例如敲代码、文件管理啥的都转移到终端里了，非GUI）
  * 浏览器：Safari+Chrome
  * 聊天工具：QQ、微信、Telegram、腾讯会议等
  * 敲代码的：终端、VScode、少量使用IDE（如PyCharm）（大型IDE吃配置）
  * 窗口管理器：yabai+rectangle+amethyst
  * 数据库：Navicat Premium
  * 代码辅助：Dash等（不吃性能）
  * 显示器辅助：smcFanControl（用于风扇超频，电脑接4k输出压力比较大）
  * 虚拟化：Docker（较吃内存）
  * 直播：OBS（吃cpu，但是电脑足够用）（用来推流xbox做直播和其他工作室直播）
  * **在使用Proteus和Altum Designer这种电路设计软件时，用的是别人的win电脑。不过本身专业对这个需求很小，且可以用机房电脑**
  * **matlab使用的是别人的win电脑，mac可以用但是不想让自己的mac受罪。专业对matlab有需求，但是方向上只要不做数模的特定位置就可以避开。我不觉得这个有影响**

* 同学A（嵌入式开发转Java开发方向、视频制作、大型游戏）
  * 主用大型IDE，如IDEA，PyCharm等
  * PS、PR、AE、达芬奇等，win本剪辑性能已经不够用，只能满足轻度的视频工作
  * 3A大作电脑已经不太能带动了，飞行模拟类也跑的很慢，最近刚转到ps5主机
  * 嵌入式方向会用到例如keil等，需要用串口调试，需要各种接口齐全
  * 软件学院嵌入式方向人数比较少，很少有人需要考虑这个

* 同学B（轻度开发、产品策划方向、大型游戏）
  * 玩各种游戏，各种类型都玩。今年的游戏只能跑到1080p的40-50fps
  * 大型IDE，Visual Studio、PyCharm、Android Studio等

* 同学C（轻度开发、轻度科研、轻度游戏）
  * 打游戏能明显感觉到显卡带不起来，虽然有一块高清的屏幕但是打游戏还是只能1080p60
  * 要这2k90只能看视频
  * 简单开发足够，但是需要多注意一下，例如断电后除了轻度文档工作，基本不太能干啥了
  * 整理的专业软件清单
    * 大一：Dev C++/Codeblock
    * 大二：Visual Studio/Visual Studio Code
    * 大三：Pycharm、IntelliJ IDEA/Eclipse
    * 其他应用：Android Studio、VMWare、Proteus、MATLAB、AD

* 同学D（科研，后端开发）
  * 大型IDE，以Visual Studio、Visual Studio Code、PyCharm为主
  * 跑深度学习，3060Ti不够用，比较慢，只能跑较简单的模型

* 工作室（视频制作、大型游戏）
  * 轻度开发，偶尔使用大型IDE
  * 以PS、PR、AE、达芬奇、LR等为主，在应付学校的海报、视频等设计工作时，正常工作勉强够用。有一次ps工程开大了，临时文件150G多，是搬到我自己的mbp上做的。基本上在达到`.psb`级别或者中度视频剪辑任务（4k60少轨道或1080p60多轨道）的时候，渲染开1/4就比较勉强。如果是个人的小活还是可以的

## 需要什么配置

* 自己
  * unix系的系统（mac或Linux）
  * 16G+的内存，目前的内存影响较大，SWAP区有时候可以用到10G以上
  * 显卡带的动外接4k显示器，雷电或USB4
  * CPU上没有遇到明显的瓶颈，编译速度慢这一点影响不大
  * 存储比较小，自己还用到1T机械盘+500G固态盘（另外还有1T机械盘+1T专用固态拓展盘给xbox装游戏）

## 装的啥配置

* 自己
  * 19款macbook pro 13
    * 8代i5 1.4GHz 四核
    * 8G LPDDR3 2133MHz
    * Intel Iris Plus Graphics 645

* 同学A
  * 14寸macbook pro
    * m1pro，10核中央处理器，14核图形处理器，16核神经网络引擎
    * 32G统一内存
    * 1T SSD

  * 19款联想Y9000P
    * i7-9750H
    * 8G
    * 1T SSD
    * GTX 1660Ti
    * 15.6英寸 1080p144Hz

* 同学B
  * ROG gl504gx 19款

* 同学C
  * 联想Yoga14s
    * i5-11300H
    * MX450
    * 2880p
    * 他觉得是当时5k档最好的笔记本

  * 大学头两年有一个微星游戏本
    * 9代i7
    * 1660Ti
    * 南桥有问题修不好
    * 嫌弃太沉，换了轻薄本

* 同学D
  * 台式机
    * cpu i7 10700k 加九州风神360水冷
    * 主板华硕TUFB56QQM-PWA
    * 显卡 铭瑄电竞之心3060ti
    * 内存海盗船16G*3200l两条
    * WD固态硬盘 1T 海盗船VS650

  * 轻薄本为19款华为matebook pro x
    * 散热大问题，CPU和主板也有问题，一般做轻度ppt、word等任务
    * 触控屏很舒服，3000*2000分辨率

* 工作室
  * 台式机
    * i5 6500
    * 双1070，STI，偶尔接三1080p屏组 nvidia surround
    * 4*8G内存条DDR4
    * 其他配置已无法查证，电脑比较老，学校资产
    * 这台电脑一直我在用
    * 接群晖DS1511+，2T*5，用于工作室素材存储和工程备份

  * 树莓派4B
    * 4G内存，专门用做网络代理和简单Linux服务器
    * 放在这里主要为了说**专业内设备多而杂，入学买的电脑不代表固定死，需求的解决方案可以有很多**


## 如何进行优化

* mac
  * 14寸macbook pro，m1pro+32G内存
    * 性能已经足够完美，同学A的这款学生优惠后2w，没有遇到过任何性能瓶颈（除了不能打游戏），开虚拟机也没有什么影响
    * 唯一差的一点在于如果要走例如计算机视觉方向，对GPU需求会提高。一般可以用到实验室的服务器或者使用colab的免费显卡
  * 13寸新macbook air，m2
    * 对于刚入学的同学来说，不管哪一款mac的性能都已经足够了。可能内存需要加一下，尽量上16G内存或者更高（目前不清楚m2还会不会有刷内存的情况）

* win
  * 买mac
    * 有非常多当时买了win，对打游戏需求没有特别大的同学都后悔没有买mac，并且大三出现了大面积换14寸或16寸mbp的情况
    * 软件工程专业，基本可以无脑选mac，即便是后面想做AI方向，也可以通过其他方式补足
  * 游戏本
    * **如果有游戏需求，按照游戏需求选就可以了**。专业软件性能需求基本都可以满足，深度学习性能需求没有上限。所以根据游戏需求来就行
    * 如果想要做硬件相关的，例如嵌入式方向，就需要找一个接口齐全的win本。通常被迫购买游戏本，还经常需要到处搬（很惨
  * 台式机
    * 台式机的同学说再给他一次机会，他一定买mac
    * 深度学习的性能需求没有上限，而且对于大多数情况，都可以使用实验室的服务器来跑

{% endnote %}
