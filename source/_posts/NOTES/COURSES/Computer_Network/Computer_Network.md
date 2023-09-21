---
title: Computer Network Note
tags: [NOTE, SHARING]
description: 'Partial<br>From the Fourth to the Second Layers'
date: 2021-05-14 20:37:37

---

## 1 概述

* 电路交换 Circuit Switching
  * 端到端的资源预留
  * FDM 频分
    * ![Screen Shot 2021-05-12 at 9.06.14 PM](https://i.loli.net/2021/05/12/pcHlq5GhsfRmArz.png)
  * TDM 时分
    * ![Screen Shot 2021-05-12 at 9.06.29 PM](https://i.loli.net/2021/05/12/P3bxIZQH1CYBacu.png)
* 分组交换 Packet Switching
  * 动态分配
  * 延时 丢包

* 延迟

$$
d_{nodal} = d_{proc} + d_{queue} + d_{trans} + d_{prop}
$$

处理延迟和排队延迟通常看作 0
$$
d_{trans} = \dfrac{L}{R}\\
$$

* 宽带：包小 间隔短
* 窄带：包大 间隔长

## 2 应用层


## 3 传输层

* 进程到进程
* UDP
  * 好处
    * 无连接
      * 无 RTT 延迟
    * 不需要保存状态信息的开销
    * 首部开销小（UCP是8字节，TCP是20字节）
    * 没有拥塞控制（不调节发送端发包速率）
  * 使用
    * DNS
    * SNMP
  * ![Screen Shot 2021-05-09 at 3.13.07 PM](https://i.loli.net/2021/05/09/flLxWitNR9Cdcv5.png)
    * 整个segment长度不能超过$$2^{16}-1=65535$$
    * 把整个segment切分成16bit，进行累加。高位的进位加到低位，最后和取反

* TCP
  * 可靠数据传输
    * 比特差错（checknum，ACK）
    * 丢包（timer）
  * 停等协议 stop and wait
    * 发送一个数据包之后等待接收端的反馈（ACK，NAK）
  * ACK在0和1之间转换
* 流水线型协议
  * 解决停等协议中RTT（只能一个包在网络上跑）
  * 两种
    * 回退n（累积确认）（只对第一个数据包有计时器）
    * 选择重传（单独确认）
* 回退n
  * 窗口大小![Screen Shot 2021-05-09 at 9.11.59 PM](https://i.loli.net/2021/05/09/AmW9Tdv32SbpNDj.png)
  * ACK（n）表示n和n以前的所有数据包都被正确收到
  * 收到 ACK 后窗口右移
  * 定时器超时，所有已发送的数据包都会被重传
  * 乱序数据包直接丢弃
* 选择重传
  * 每个数据包都独立设定一个计时器![Screen Shot 2021-05-09 at 11.28.21 PM](https://i.loli.net/2021/05/09/CQfRJ5udcvj2a7l.png)
  * 乱序数据包缓存下来
  * 接收端窗口大小不一定必须与发送端窗口大小相同
* TCP 报文段格式
  * 点对点（广播和组播通常使用 UDP）
  * 所有message是字节
  * 发送与接收方都要有缓存
  * 全双工
    * MSS（maximum segment size）
  * 面向连接
  * 流量控制 拥塞控制
  * ![Screen Shot 2021-05-09 at 11.42.48 PM](https://i.loli.net/2021/05/09/7hDW8JnvQAXNz5g.png)
    * HLEN 的单位是 4 个字节
    * 首部开销最小 20 字节
    * ACK 通常是 0，在确认时置 1
    * SYN、FIN 建立和关闭 TCP 连接时为 1
  * 序列号与确认号 seq ACK
    * ACK 号是希望接收的下一个序列号
    * 序列号初始值是随机的
* TCP 可靠数据传输
  * 重传
    * 计时器超时
    * 冗余 ACK
  * 序列号是每个字节一个编号
  * 累积确认
  * 接收端对乱序数据包是否缓存（实际采用）不一定，可能丢弃（简化对接收方的设计）
  * 快速重传
    * 收到三次相同的 ACK 时（冗余 ACK），提前重传

* TCP 流量控制
  * 调节发送端发包速率
  * 防止**接收端**缓存溢出
  * 发送端发包速率（发送端的窗口大小）去匹配接收端的读包速度
  * 通过 TCP 报文段首部的 windows size 反馈缓存剩余容量
* TCP 连接管理
  * ![Screen Shot 2021-05-10 at 11.01.49 PM](https://i.loli.net/2021/05/10/AGVrHpsomXOc4ga.png)
  * 占序列号，但没有数据
  * 第三次握手是普通的 ACK 数据包（不占用序列号），可以携带数据（前两次不能携带数据）
  * SYN - SYNACK - ACK
  * ![Screen Shot 2021-05-10 at 11.09.48 PM](https://i.loli.net/2021/05/10/5gHFh8K2COvktGI.png)
  * FIN 占序列号
  * 单向关闭之后只能发 ACK，不能发数据包
* 拥塞控制
  * 太多数据源往网络上发送数据
  * 通过调节发包速率，防止**路由器**缓存溢出
  * 关注网络本身
  * 导致的问题
    * 较长的延迟
    * 资源的浪费（丢包路由器之前的路由器浪费了资源）
  * 解决
    * 端到端（常用 TCP）
    * 网络辅助（其他类型网络 ATM）
* TCP 端到端 拥塞控制
  * 调节拥塞窗口大小
  * TCP 取流量控制和拥塞控制的最小值
  * $$rate = \dfrac{CongWin}{RTT}$$
  * 认为网络状态不好的情况
    * 定时器超时
    * 冗余 ACK
  * 调节机制
    * 加性增，乘性减
      * 线性增加拥塞窗口，除2减
      * ![Screen Shot 2021-05-11 at 10.49.09 AM](https://i.loli.net/2021/05/11/5wqCUZId279vYtV.png)
    * 满启动
      * 初始为 1 MSS
      * 指数增长 $$2^n$$
      * ![Screen Shot 2021-05-11 at 10.50.59 AM](https://i.loli.net/2021/05/11/ahpGCSiD7B4vU1e.png)
      * 定时器超时，拥塞窗口重置为 1，重新慢启动
      * 3 次冗余 ACK（相比定时器，网络状态好），变为二分之一
      * ![Screen Shot 2021-05-11 at 10.53.11 AM](https://i.loli.net/2021/05/11/ZudCkwBgiPHxIRG.png)
      * 设置阈值，启动时超过阈值就改为线性增长（拥塞避免）
      * 定时器超时，阈值更新为超时时拥塞窗口大小的二分之一
      * 冗余 ACK 时，阈值与窗口大小都变为二分之一，开始线性增长（快速恢复）
      * 最开始没有阈值，第一次出现状况的时候才设置

## 4 网络层

* 主机到主机

* 两个功能
  * 转发
    * 路由器内部的事情
  * 路由
    * 确定一条从发送端到接收端的路径的过程
  
* 转发表
  * ![Screen Shot 2021-05-11 at 3.22.54 PM](https://i.loli.net/2021/05/11/K6qY5CMr2lgRJw4.png)

* 最主要的协议
  * ip
  * ICMP（报告差错，不能处理错误）
  * 路由协议通常在应用层实现，不在网络层

* 路由器

  * 协议 算法

    * RIP
    * OSPF
    * BGP

  * 存在的问题

    * 输出端口排队（多个输入需要使用同一个输出端口）
    * 输入端口排队（队头阻塞）![Screen Shot 2021-05-11 at 3.34.49 PM](https://i.loli.net/2021/05/11/inMWJkg7uDKNAf3.png)

    绿色必须等待红色的排队

* IP 数据报格式

  * ![Screen Shot 2021-05-11 at 3.36.24 PM](https://i.loli.net/2021/05/11/AznaxfNS7Xbu6hv.png)
    * 默认情况首部20字节
    * head len 首部长度的单位是 4 个字节
    * length 是整个 datagram 的长度，单位是字节
    * 第二行主要用于分片
    * time to live（TTL）没经过一个中间设备，TTL 减 1，为 0 时丢弃
    * upper layer 指示上层使用 TCP 还是 UDP
    * checksum 只对首部进行校验
  * 分片
    * MTU（max transmission size）
    * 分片后只会在终端进行重装
    * identification 是总的大数据包的序号
    * fragment offset 偏移量是小数据包的序号，单位是 8 个字节
    * DF 为 0 表示允许分片，为 1 不允许分片直接丢弃
    * MF 为 1 表示后面还有分片
    * ![Screen Shot 2021-05-11 at 3.52.26 PM](https://i.loli.net/2021/05/11/LWqE8usJdfw4RUC.png)
      * 所有分片的长度必须是 8 的倍数

* ip 地址

  * 一个接口对应一个 ip 地址
  * 子网地址+主机地址
  * 表示方式 CIDR（Classless Inter Domain Routing）无类别的域间路由 VLSM（Variable Length Subnet Masking）
    * a.b.c.d/x
    * x 表示子网地址占用的位数
  * 分类的 Classful addressing
    * ![Screen Shot 2021-05-11 at 4.28.41 PM](https://i.loli.net/2021/05/11/7UhO9JVrAI3mLZa.png)
    * ABC 类可以分配给主机
  * 特殊 ip
    * ![Screen Shot 2021-05-11 at 4.31.43 PM](https://i.loli.net/2021/05/11/ZG7kchSrjy98XIo.png)

* DHCP（Dynamic Host Configuration Protocol）

  * overview
    * host broadcasts "DHCP discover" msg
    * DHCP server responds with "DHCP offer" msg
    * Host requests IP address: "DHCP request" msg
    * DHCP server sends address" "DHCP ask" msg
  * ![Screen Shot 2021-05-11 at 8.27.13 PM](https://i.loli.net/2021/05/11/zryneBdPxkCEsuF.png)

* NAT

  * NAT 转换后外网是路由器的 ip，特定的端口号

* ipv6

  * 优势
    * Ip 地址 128 位（16 字节）
    * 提高路由器处理效率
    * 首部 40 字节
    * 不允许分片
    * 增加了对任播（Anycast）的支持
  * 40 字节为基本首部（base header）
    * 允许有多个扩展首部
    * 字段数减少到 8 个
    * 取消检验和，加快路由器处理速度
    * 所有的拓展首部（不包括基本首部）和数据合起来叫数据包的有效载荷（payload）或净负荷
    * ![](https://img-blog.csdnimg.cn/2019060916245578.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L05FVUNob3Jkcw==,size_16,color_FFFFFF,t_70#pic_center)
      * 流量类别、流标号为了支持 QoS
      * Length 是 body 部分的长度
  * 目的地址
    * 单播（unicast）
    * 组播（multicast）：一对多
    * 任播（anycast）：目的站是一组计算机，但数据报在交付时只交付其中距离最近的一个
  * 冒号十六进制
    * 零压缩（zero compression）：一连串连续的零可以为一对冒号所取代，但只能使用一次
    * 兼容 ipv4：前 80 个比特置 0，再 16 个比特置 1，最后是 ipv4 地址
  * 双协议栈（Dual Stack）（Dual IP Layer）
    * 在主机和路由器上同时实现 IPv4 和 IPv6 两种协议
  * 隧道（Tunneling）
    * 把 IPv6 分组封装在 IPv4 分组中传送

* 链路状态路由算法 LS（Link- State Routing Algorithm） 集中

  * Dijkstra 算法
  * 需要每个节点先广播自己与相邻节点的信息
  * ![Screen Shot 2021-05-11 at 9.39.06 PM](https://i.loli.net/2021/05/11/TO4j3MNm6r5kDIB.png)
  * 最终得到的转发表（u的）
    * ![Screen Shot 2021-05-11 at 9.43.26 PM](https://i.loli.net/2021/05/11/AmtO1PxLecSMdWi.png)

* 距离向量路由算法 DV（Distance Vector Algorithm） 分散

  * 每个节点只给自己的邻居发自己的距离向量
  * 异步
  * 当且仅当自己的距离向量变化时发送
    * 自己的变化
    * 邻居发来的变化
  * ![Screen Shot 2021-05-11 at 9.47.38 PM](https://i.loli.net/2021/05/11/jshlxAeUuCJcKX3.png)

* DV versus LS

![Screen Shot 2021-05-11 at 9.48.48 PM](https://i.loli.net/2021/05/11/duysEac8jOQt9NS.png)

* 互联网路由协议
  * 自治系统内（AS）
    * RIP（Routing Information Protocol）
      * 基于 DV
      * 最大跳数 15
      * 从当前路由器到目子网的跳数，最小为 1
      * 典型实现是在应用层，基于 UDP 实现
      * 节点之间每 30s 交换一次
    * OSPF（Open Shortest Path First）
      * 基于 LS（狄杰斯特拉算法）
      * 可以进行分层
  * 自治系统间
    * BGP（Border Gateway Protocol）
      * 传达的是可达性信息
      * 基于 TCP
* 广播（Broadcast Routing）
  * ![Screen Shot 2021-05-11 at 11.11.20 PM](https://i.loli.net/2021/05/11/bA12NczlgSR5nmB.png)
  * 左效率低，可行性差；右需要路由器能复制
  * 洪泛（flooding）：当节点收到数据包时，无条件复制给所有邻居（除源节点）
    * 如果有循环，数据包会无限制传播（广播封包）
    * 解决（受控转发）
      * 序列号
      * 反向路径转发（收到节点的数据包时反向判断该节点在不在到源端的最短路径上）
    * 解决方案会出现冗余数据包
    * 最终解决方案：生成树
* 组播（Multicast Routing）
  * 广播不能穿越路由器，组播可以
  * 生成树
    * 基于源端
      * 最短路径树
      * 反向路径转发
    * 共享树
      * 最小生成树
      * 基于中心树

## 5 数据链路层

* 相邻节点之间
* 收到上一层的数据报打包成帧，前面后面都加
* 典型服务
  * 打包成帧
  * 链路接入
  * 可靠数据传输
  * 流量控制
  * 差错检测与纠错
  * 半双工（无线）与全双工（有线）
* 数据链路层和物理层是硬件
* 差错检测
  * 奇偶校验
  * 二维奇偶校验
  * CRC 循环冗余（实际使用 32bit）
* 信道分割式 mac 协议（介质访问控制协议 / 媒体接入控制协议）（Channel Partitioning）
  * 将信道分割成小份，每一小份固定分给某节点
  * TDMA（time division multiple access）
    * ![Screen Shot 2021-05-11 at 11.45.18 PM](https://i.loli.net/2021/05/11/3y6FTAoIqjn2pHr.png)
    * 节点只能在属于自己的时隙发数据
  * FDMA（frequency division multiple access）
    * ![Screen Shot 2021-05-11 at 11.47.07 PM](https://i.loli.net/2021/05/11/Hn4joGwkSe7gBJl.png)
    * 两者在瞬时吞吐量和延迟有差异
* 随机接入 mac 协议（使用广泛）
  * 数据包冲突（碰撞）
  * 效率
    * 成功的时隙（有且仅有一个节点发送数据包）/
  * slotted ALOHA（分时隙的ALOHA协议）
    * 冲突后随机发送
    * ![Screen Shot 2021-05-12 at 9.03.07 AM](https://i.loli.net/2021/05/12/8GqrAPOlnYBj35K.png)
    * 仍然会浪费一些时隙，效率有问题
    * 要求严格的同步时钟
    * 理想最大效率为 $$\dfrac{1}{e} = 0.37$$
  * ALOHA
    * 不分时隙，想发就发
    * 效率 $$\dfrac{1}{2e} = 0.18$$
  * CSMA（Carrier Sense Multiple Access）载波监听
    * 发送之前先监听
    * ![Screen Shot 2021-05-12 at 1.00.36 PM](https://i.loli.net/2021/05/12/keqXPLdblRiwoUt.png)
    * 非坚持的 CSMA
      * 若信道为忙，则等一个随机的时间再去监听
    * 1 坚持的 CSMA（冲突概率更高）
      * 若信道为忙，持续监听信道，直到空时发送
    * P 坚持的 CSMA（综合前两者）
      * 若信道为忙，持续监听信道，直到空时以 p 概率发送数据包
  * CSMA/CD（Collision Detection）以太网使用
    * 发送同时监听，若有冲突立即停止发送
    * ![Screen Shot 2021-05-12 at 1.10.14 PM](https://i.loli.net/2021/05/12/mCKorV34zRhu7Hp.png)
* 轮流式 mac 协议（Taking Turns）
  * master 节点轮流询问 slaves 节点是否有数据包要发
  * ![Screen Shot 2021-05-12 at 2.13.24 PM](https://i.loli.net/2021/05/12/n46OrpYaeJRhdDB.png)
  * 缺点
    * 有延迟
    * 单点故障
  * 令牌环
    * 有 token 才能发数据包
    * ![Screen Shot 2021-05-12 at 2.21.28 PM](https://i.loli.net/2021/05/12/JdUCeRgblXxOu19.png)
* mac 地址
  * 48 bit
  * 每一跳之间都是使用 mac 地址
* ARP（Address Resolution Protocol）
  * <IP address, MAC address, TTL>
  * ARP 表里没有记录时会广播一个 ARP query 数据包，若 ip 匹配，则回复一个 ARP 消息
* 以太网 Ethernet
  * 链路层全部使用 CSMA/CD
    * 1 坚持，若发送时监听到冲突，会发送一个 jam signal，用于提示其他人发生冲突。然后进入回退，等待随机时间
    * 随机时间为 冲突第 m 次，则从 $$\{0, 1, 2, \cdots, 2^m - 1\}$$ 中随机选一个数乘 512bit 的时间。10 次后数组不再变化，即 $$\{0, 1, 2, \cdots, 1023\}$$。16 次冲突后直接丢弃数据包
    * 效率为 $$\dfrac{1}{1 + 5t_{prop}/t_{trans}}$$
  * ![Screen Shot 2021-05-12 at 4.49.10 PM](https://i.loli.net/2021/05/12/zXbrtMeksq8oIa2.png)
    * 以太网帧 前导 64bit（8个字节）前 7 个字节必须都为 10101010，第八个为 10101011，用于同步，并不算在以太网帧的长度
    * 除 body 部分，共 18 个字节
  * 标准 802.3
    * mBasen 指带宽为 m 兆，相邻节点最大距离为 n，后面 T 是双绞线，F、S、B是光纤，没有是同轴电缆

* 交换机
  * 有缓存，有 mac 地址，实现 CSMA/CD，能对帧进行选择性转发（避免冲突）
  * 隔离冲突域（hub 不能）
  * 不能隔离子网（路由器可以）
  * 交换表存储主机的 mac 地址和挂接在交换机的哪个口上
  * 自学习
    * 没有记录的时候 广播
    * A 发送数据的时候记录 A 挂接的口和 TTL
