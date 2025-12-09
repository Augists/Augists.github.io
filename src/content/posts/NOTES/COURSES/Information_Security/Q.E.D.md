---
title: Information Security Q.E.D
tags: [NOTE, SHARING]
description: 'Q.E.D'
date: 2021-05-15 21:40:05

---

## 凯撒密码

Julius Caesar

每个字母都用字母表中它之后的第三个字母来代换

单表代换密码

![Screen Shot 2021-04-21 at 7.24.24 PM](https://i.loli.net/2021/04/21/A7JYuac83lQ6Ujk.png)

* 穷举攻击
* 语言被人所知

## 单表代换密码

每条消息用一个字母表加密，就会有 26! 种密钥

* 语言规律性和冗余性（字母使用的频率）

## 一次一密 One Time Pad

与消息一样长且无重复的随机密钥进行加密，与消息进行异或

* 产生大规模随机密钥有实际困难
* 密钥分配和保护

## 置换技术 Transposition(Permutation) Ciphers

改变明文内容元素的相对位置，保持内容的表现形式不变

重新安排消息字母的位置

* 字母频率问题

![Screen Shot 2021-04-08 at 8.09.06 PM](https://i.loli.net/2021/04/08/73GMFHv95Eaqj4o.png)

栅栏技术 Rail Fence Cipher

按照对角线的顺序写出明文，按行的顺序读出作为密文![Screen Shot 2021-04-08 at 8.09.34 PM](https://i.loli.net/2021/04/08/RETJfvQx3cHdBKV.png)

## DES

分组 64位  密钥 56 位

### Feistel

大多数分组密码的基础

![Screen Shot 2021-04-21 at 7.36.41 PM](https://i.loli.net/2021/04/21/B7KzekH3GLPytuV.png)

![Screen Shot 2021-04-21 at 7.40.41 PM](https://i.loli.net/2021/04/21/kIK8BwldNUGoYWt.png)

64位分组，128位密钥长度，16次迭代

### DES

![Screen Shot 2021-04-21 at 7.43.36 PM](https://i.loli.net/2021/04/21/GloY7EW83K6Osca.png)

置换矩阵和逆置换

![Screen Shot 2021-04-21 at 7.47.29 PM](https://i.loli.net/2021/04/21/NjDOlucPmeSvYVZ.png)

扩充置换

![Screen Shot 2021-04-21 at 7.47.59 PM](https://i.loli.net/2021/04/21/sSF9c2oz3DNm1Td.png)

![Screen Shot 2021-04-21 at 7.50.06 PM](https://i.loli.net/2021/04/21/J7CATGvHZQMzPKF.png)

## 模运算

![Screen Shot 2021-04-21 at 7.53.11 PM](https://i.loli.net/2021/04/21/4TWUIOZfzbNRBx6.png)

![Screen Shot 2021-04-21 at 7.53.58 PM](https://i.loli.net/2021/04/21/tWI9fDiGUzXBw51.png)

## 欧几里得算法

![Screen Shot 2021-04-21 at 7.56.30 PM](https://i.loli.net/2021/04/21/wq57F2QufgYxiIK.png)

## 分组密码的工作模式

* 电子密码本模式（Electronic Codebook, ECB）
  * 明文分成 64bit 的分组进行加密，必要时进行填充，每个分组用同一密钥加密，同样明文分组加密得相同密文
  * 适合数据较少的情况，如安全传输 DES 密钥
  * 一段明文消息中若有几个相同的明文组，则密文也将出现几个相同的片段
  * 对于很长的消息，ECB 是不安全的（结构化）
  * ECB 的弱点来源于其加密过的密文分组是相互独立的
* 密文分组链接模式（Cipher Block Chaining, CBC）
  * 加密输入是当前明文分组和前一密文分组的异或，形成一条链，使用相同的密钥，这样每个明文分组的加密函数输入与明文分组之间不再有固定的关系
  * ![Screen Shot 2021-04-14 at 11.46.42 PM](https://i.loli.net/2021/04/14/NGajltJOAxuDzgv.png)
  * 每个密文分组依赖于其他明文分组
  * 明文消息中的任何一点变化都会影响密文分组
  * 发送方和接收方需要共享初始向量 IV（必须是一个固定的值或用 ECB 方式在消息之前加密传送，不能被明文传送）
  * 在消息的最后还要处理不够长度的分组
* 密码反馈模式（Cipher FeedBack, CFB）
  * 是一种将 DES 转成流密码的技术，不再需要填充，可以实时运行
  * 加密：加密函数的输入是一个64位的移位寄存器，产生初始向量 IV。加密函数高端 j 位与明文 P1 的第一个单元异或，产生 j 位密文 C1 进入移位寄存器低端，继续加密，与 P2 输入异或
  * 解密：相同方案，解密函数
  * ![Screen Shot 2021-04-14 at 11.56.54 PM](https://i.loli.net/2021/04/14/5MVGnN8UaYdOt79.png)
  * 当数据以位或字节形式到达时使用都是恰当的
  * 最通用的是流密码形式
  * 比特差错传播
* 输出反馈模式（Output FeedBack, OFB）
  * 结构上类似 CFB，但加密函数输出被反馈回移位寄存器，CFB 中是密文单元被反馈回移位寄存器。
  * 优点：传输中的比特差错不会传播（某位上发生的错误不会影响到其他位）
  * 缺点：比 CFB 更容易受报文流篡改攻击
  * ![Screen Shot 2021-04-15 at 6.43.37 PM](https://i.loli.net/2021/04/15/kYX764AIGzqHbN3.png)
* 计数器模式（Counter, CTR）
  * 新模式，虽然很早就提出来了
  * 与 OFB 很像，但是加密的是计数器的值而不是任何反馈回来的值
  * 每一个明文分组都必须使用一个不同的密钥和计数器值，决不重复使用
  * ![Screen Shot 2021-04-15 at 6.47.43 PM](https://i.loli.net/2021/04/15/vdD3G7aSXTpPeCk.png)
  * 可以用于高速网络加密（并行）
  * ![Screen Shot 2021-04-15 at 6.48.51 PM](https://i.loli.net/2021/04/15/PCNQGo2Mnrsc4iY.png)
  * 可以对被加密的分组进行随机存取
  * 安全、简洁

## 单向函数

### 离散对数问题 DLP

![Screen Shot 2021-04-21 at 8.11.47 PM](https://i.loli.net/2021/04/21/GtTodbzpDmCF8yf.png)

### 因数分解问题 Factorization Problem

![Screen Shot 2021-04-21 at 8.12.46 PM](https://i.loli.net/2021/04/21/PfTokICjtEqKdrX.png)

### 背包问题

![Screen Shot 2021-04-21 at 8.13.52 PM](https://i.loli.net/2021/04/21/FTyaICmkt8jwcx5.png)

## 费马小定理

![Screen Shot 2021-04-21 at 8.16.06 PM](https://i.loli.net/2021/04/21/pjRusoKQVyPNrES.png)

## 欧拉函数

![Screen Shot 2021-04-21 at 8.18.37 PM](https://i.loli.net/2021/04/21/qlLiUVN6OatwhfK.png)

## 欧拉定理

![Screen Shot 2021-04-21 at 8.19.08 PM](https://i.loli.net/2021/04/21/oeqJ2I5fQM4mwNg.png)

![Screen Shot 2021-04-21 at 8.19.27 PM](https://i.loli.net/2021/04/21/rkABInZPuotcq63.png)

![Screen Shot 2021-04-21 at 8.20.54 PM](https://i.loli.net/2021/04/21/nsfiTV4qFAloLg6.png)

## 中国剩余定理

![Screen Shot 2021-04-21 at 9.26.24 PM](https://i.loli.net/2021/04/21/SZ5VcsFBk98Xthm.png)

![](https://i.loli.net/2021/04/21/DbhYJVyq1jzQ4id.png)

## RSA

![Screen Shot 2021-04-21 at 11.17.54 PM](https://i.loli.net/2021/04/21/UrAFdBxIDg92jZl.png)



![Screen Shot 2021-04-21 at 11.22.01 PM](https://i.loli.net/2021/04/21/FNHm4LulTbzfoS8.png)

## ElGamal

### 加密

![Screen Shot 2021-04-22 at 12.45.21 AM](https://i.loli.net/2021/04/22/JQvyouf7FA4ldap.png)

密文是明文的2倍

### 数字签名

![Screen Shot 2021-04-22 at 12.51.24 AM](https://i.loli.net/2021/04/22/84L37qGYaCvSNA1.png)

![Screen Shot 2021-04-22 at 12.53.00 AM](https://i.loli.net/2021/04/22/lBj9qcz7AamriY1.png)

