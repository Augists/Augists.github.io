---
title: Information Security Note Chapter 5
tags: [NOTE, SHARING]
description: 'Information Security Note Chapter 5<br>Copyright SSDUT'
date: 2021-05-15 21:40:04

---

* 双重 DES 加密
  * 中途相遇攻击
    * 只要连续使用密码两次，这种攻击总是有效的
    * 用所有可能的密钥加密P并储存，再用所有可能的密钥解密C，与之匹配。相同即为被攻破
* 三重 DES 加密
  * C = E~K1~[D~K2~[E~K1~(P)]]



* 分组密码的工作模式
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
