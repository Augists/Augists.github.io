---
title: BGP Summary
tags: [NOTE, BGP]
description: 'BGP summary note from Internet<br>Copyright https://blog.csdn.net/keith6785753/article/details/107088632'
date: 2022-09-05 16:25:21
---

{% note warning %}

{% note danger %}

Copyright: Looo~ye
Source: [CSDN](https://blog.csdn.net/keith6785753/article/details/107088632)
对文章排版进行修改，学习过程中顺带，并对一些有歧义或有问题的地方进行修改（只看了需要看的，所以可能还是会有地方有小问题

{% endnote %}

# **B**order **G**ateway **P**rotocol

> 动态路由协议可以按照工作范围分为IGP以及EGP。IGP工作在同一个AS内，主要用来发现和计算路由，为AS内提供路由信息的交换；而EGP工作在AS与AS之间，在AS间提供无环路的路由信息交换。BGP是为了取代EGP而创建的（维基百科）。BGP是一种增强的路径矢量路由协议，同时BGP是拥有丰富的策略控制技术的外部网关协议。多运行于AS与AS之间。

## BGP 概述

**BGP 其着眼点不在于自动发现网络拓扑，而在于在AS之间选择最佳路由和控制路由的传播。**

* BGP使用TCP作为其传输层协议（监听端口号为179），提高了协议的可靠性，且不需要专门的机制来确保连接的可控性。
  * BGP进行域间的路由选择，对协议的稳定性要求非常高。因此用TCP协议的高可靠性来保证BGP协议的稳定性。
  * BGP的对等体之间必须在逻辑上连通，并进行TCP连接。目的端口号为179，本地端口号任意。
* 路由更新时，BGP只发送更新的路由，大大减少了BGP传播路由所占用的带宽，适用于在Internet上传播大量的路由信息。
* BGP从设计上避免了环路的发生。
  * AS之间：BGP通过携带AS路径信息来标记途经的AS，带有本地AS号的路由将被丢弃，从而避免了域间产生环路。
  * AS内部：BGP在AS内学到的路由不再通告给AS内的BGP邻居，避免了AS内产生环路。
* 支持CIDR 无类域间路由
* BGP提供了丰富的路由策略；提供了防止路由振荡的机制；BGP也易于扩展

## BGP 基本概念

* 自治系统AS（Autonomous System ）是指在一个实体管辖下的拥有相同选路策略的IP网络。
  * 每个AS都有唯一的自治系统编号，这个编号是由IANA分配的。
  * 编号范围是1~65535（其中1到64511是注册的因特网编号，64512到65535是私有网络编号）
* EBGP和IBGP（External BGP /Internal BGP）
![](https://img-blog.csdnimg.cn/20200702173513321.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlaXRoNjc4NTc1Mw==,size_16,color_FFFFFF,t_70)
  * IBGP：运行于同一AS内部的BGP称为IBGP
  * EBGP：运行于不同AS之间的BGP称为EBGP
* BGP报文交互中的角色
  * Speaker：发送BGP消息的路由器称为BGP发言者，它接收或产生新的路由信息，并发布给其它BGP Speaker
  * Peer：相互交换消息的BGP Speaker之间互称对等体（Peer），若干相关的对等体可以构成对等体组（Peer Group）

## BGP 工作原理

### BGP报文

* Open消息：是TCP连接建立后发送的第一个消息，用于建立BGP对等体之间的连接关系。对等体在接收到Open消息并协商成功后，将发送Keepalive消息确认并保持连接的有效性。确认后，对等体间可以进行Update、Notification、Keepalive和Route-Refresh消息的交换
* Update消息：用于在对等体之间交换路由信息。Update消息可以发布多条属性相同的可达路由信息，也可以撤销多条不可达路由信息
* Keepalive消息：BGP会周期性的向对等体发出Keepalive消息，用来保持连接的有效性
* Notification消息：当BGP检测到错误状态时，就向对等体发出Notification消息，之后BGP连接会立即中断
* Route-Refresh消息：通过OPEN消息告知BGP peer本地支持路由刷新能力（Route-Refresh capability）

这5种消息的应用：
* 通过TCP建立BGP连接时，发送OPEN消息
* 连接建立后，如果有路由需要发送或路由变化时，发送UPDATE消息通告对端
* 稳定后要定时发送KEEPALIVE消息以保持BGP连接的有效性
* 当本地BGP在运行中发现错误时，要发送NOTIFICATION消息通告BGP对等体
* ROUTE-REFRESH消息用来通知对等体自己支持路由刷新

报文格式

![](https://img-blog.csdnimg.cn/2020070219233669.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlaXRoNjc4NTc1Mw==,size_16,color_FFFFFF,t_70)

上图展开了BGP报文中的报文头Header

* Marker（标记）：16字节，固定为1
* Length（长度）：两字节无符号整数。指定了消息的全长，包括头部
* Type（类型）：1 字节，指示报文类型，如OPEN、UPDATE报文等
  * 1 – OPEN
  * 2 – UPDATE
  * 3 – NOTIFICATION
  * 4 – KEEPALIVE

以 open 消息的具体报文格式为例
![](https://img-blog.csdnimg.cn/20200702194159619.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlaXRoNjc4NTc1Mw==,size_16,color_FFFFFF,t_70)

### 状态机

BGP有限状态机共有六种状态，分别是Idle、Connect、Active、OpenSent、OpenConfirm和Established

* Idle状态是BGP初始状态。在Idle状态下，BGP拒绝邻居发送的连接请求。只有在收到本设备的Start事件后，BGP才开始尝试和其它BGP对等体进行TCP连接，并转至Connect状态
  * Start事件是由一个操作者配置一个BGP过程，或者重置一个已经存在的过程或者路由器软件重置BGP过程引起的
  * 任何状态中收到Notification报文或TCP拆除链路通知等Error事件后，BGP都会转至Idle状态
* 在Connect状态下，BGP启动连接重传定时器（Connect Retry，缺省为32秒），等待TCP完成连接
  * 如果TCP连接成功，那么BGP向对等体发送Open报文，并转至OpenSent状态
  * 如果TCP连接失败，那么BGP转至Active状态
  * 如果连接重传定时器超时，BGP仍没有收到BGP对等体的响应，那么BGP继续尝试和其它BGP对等体进行TCP连接，停留在Connect状态
  * 如果发生其他事件（由系统或者操作人员启动的），则退回到Idle状态
* 在Active状态下，BGP总是在试图建立TCP连接
  * 如果TCP连接成功，那么BGP向对等体发送Open报文，关闭连接重传定时器，并转至OpenSent状态
  * 如果TCP连接失败，那么BGP停留在Active状态
  * 如果连接重传定时器超时，BGP仍没有收到BGP对等体的响应，那么BGP转至Connect状态
* 在OpenSent状态下，BGP等待对等体的Open报文，并对收到的Open报文中的AS号、版本号、认证码等进行检查
  * 如果收到的Open报文正确，那么BGP发送Keepalive报文，并转至OpenConfirm状态；
  * 如果发现收到的Open报文有错误，那么BGP发送Notification报文给对等体，并转至Idle状态。
* 在OpenConfirm状态下，BGP等待Keepalive或Notification报文。如果收到Keepalive报文，则转至Established状态，如果收到Notification报文，则转至Idle状态
* 在Established状态下，BGP可以和对等体交换Update、Keepalive、Route-refresh报文和Notification报文
  * 如果收到正确的Update或Keepalive报文，那么BGP就认为对端处于正常运行状态，将保持BGP连接
  * 如果收到错误的Update或Keepalive报文，那么BGP发送Notification报文通知对端，并转至Idle状态
  * Route-refresh报文不会改变BGP状态。 如果收到Notification报文，那么BGP转至Idle状态
  * 如果收到TCP拆链通知，那么BGP断开连接，转至Idle状态

![](https://img-blog.csdnimg.cn/20200702200955159.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlaXRoNjc4NTc1Mw==,size_16,color_FFFFFF,t_70)

### BGP对等体之间交互原则

* 从IBGP对等体获得的BGP路由，BGP设备只发布给它的EBGP对等体（这样的水平分割是为了防止IBGP内部环路）
* 从EBGP对等体获得的BGP路由，BGP设备发布给它所有EBGP和IBGP对等体（即发给所有BGP对等体）
* 当存在多条到达同一目的地址的有效路由时，BGP设备会选择最优路由给自己使用，即用来发给邻居，同时上送给路由表
* 路由更新时，BGP设备只发送更新的BGP路由

### BGP与IGP同步

事实上，上面第一条从IBGP对等体学到的BGP路由，不是一定会发送给它的EBGP对等体的，前提条件是需要BGP与IGP同步

![](https://img-blog.csdnimg.cn/2020070220371341.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlaXRoNjc4NTc1Mw==,size_16,color_FFFFFF,t_70)

BGP的主要任务之一就是向其它自治系统发布该自治系统的网络可达信息。如图所示，RTB会把去往10.1.1.0/24 的路由信息封装在BGP报文中，通过由RTB、RTE建立的TCP连接通告给RTE，如果RTE不考虑同步问题，直接接受了这条路由信息并通告给RTF。那么，如果RTF或RTE有去往10.1.1.0/24 的数据报文要发送，这个数据报文要想到达目的地必须经过RTD和RTC。但是，由于先前没有考虑同步问题，RTD和RTC的路由表中没有去往10.1.1.0/24的路由信息，数据报文到了RTD就会被丢弃。因此，BGP必须与IGP（如RIP、OSPF等）同步。也就是说，当一个路由器从IBGP对等体收到一条路由更新信息，在把它通告给它的EBGP对等体之前，要试图验证该目的地能否通过自治系统内部到达（即验证该目的地是否存在于IGP发现的路由表内，非BGP路由器是否可以传递报文到该目的地）。若能通过IGP知道这个目的地，才会把这样一条路由信息通告给EBGP对等体，否则认为BGP与IGP不同步，不进行通告。

## BGP 与 IGP 交互

上面刚刚介绍了从IBGP对等体学到的BGP路由发送给它的EBGP对等体的前提条件是BGP同步，而同步是通过BGP路由表与IGP路由表的相互引入

BGP引入IGP路由：

BGP的主要工作是在自治系统之间传递路由信息，而不是去发现和计算路由信息。所以，路由信息需要通过配置命令的方式注入到BGP中。

### network 命令

逐条引入，通过Network命令注入到BGP路由表里的路由信息必须存在于IP路由表中
![](https://img-blog.csdnimg.cn/20200703095406255.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlaXRoNjc4NTc1Mw==,size_16,color_FFFFFF,t_70)

### import

按协议类型引入，也可以引入静态或直连路由

![](https://img-blog.csdnimg.cn/20200703095512612.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlaXRoNjc4NTc1Mw==,size_16,color_FFFFFF,t_70)

## BGP 属性特点

BGP路由属性分为4类：

* 公认必遵(Well-known mandatory)：所有BGP路由器都可以识别，且必须存在于Update消息中 如果缺少这种属性，路由信息就会出错
* 公认任意(Well-known discretionary)： 所有BGP路由器都可以识别，但不要求必须存在于Update消息中，即就算缺少这类属性，路由信息也不会出错
* 可选过渡(Optional transitive)：在AS之间具有可传递性的属性 BGP路由器可以选择是否在Update消息中携带这种属性。接收的路由器如果不识别这种属性，可以转发给邻居路由器，邻居路由器可能会识别并使用到这种属性
* 可选非过渡(Optional non-transitive)：BGP路由器可以选择是否在Update消息中携带这种属性。如果接受的BGP路由器不支持此属性，则相应的这类属性会被忽略，且不会传递给其他对等体

列出几种常见属性（下文会重点介绍和后面要说的BGP选路规则有关的属性）：

* Origin：起点属性。定义路由信息的来源，标记一条路由是怎样成为BGP路由的。（属于公认必遵）
![](https://img-blog.csdnimg.cn/20200703173009194.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlaXRoNjc4NTc1Mw==,size_16,color_FFFFFF,t_70)

有3种类型：
1. IGP（标识为 i）：具有最高的优先级。通过路由始发AS的IGP得到的路由信息，比如通过network命令注入到BGP路由表的路由，其Origin属性为IGP。
2. EGP（标识为 e）：优先级次之。通过EGP得到的路由信息，其Origin属性为EGP。
3. Incomplete（标识为 ？）：优先级最低。通过其他方式学习到的路由信息。比如BGP通过import-route命令引入的路由，其Origin属性为Incomplete。

* As_PATH：AS路径属性。是路由经过的AS的序列，即列出此路由在传递过程中经过了哪些AS。它可以防止路由循环，并用于路由的过滤和选择。（公认必遵）

![](https://img-blog.csdnimg.cn/20200703173127693.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlaXRoNjc4NTc1Mw==,size_16,color_FFFFFF,t_70)

上图中：当R4将网段10.0.0.0/24通告给AS400和AS100时，会在AS_PATH中添加自己的AS号。当R5将网段10.0.0.0/24通告给AS100使，也会添加添加自己的AS号。当AS100内的R1和R3再将网段10.0.0.0/24通告给本AS域内的R2时，AS_PATH属性不会改变，且R2在其他BGP选路条件相同的前提下选择AS_PATH路径最短的，即选择通过R3到达网段10.0.0.0/24。

* Next hop：下一跳属性。包含到达更新消息所列网络的下一跳边界路由器的IP地址。（公认必遵）

* Local-Preference：本地优先级属性。用于在AS内优选到达某一目的地的路由。反映了BGP Speaker对每条BGP路由的偏好程度。属性值越大越优。（公认任意）
![](https://img-blog.csdnimg.cn/20200703173619159.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlaXRoNjc4NTc1Mw==,size_16,color_FFFFFF,t_70)

上图中：R1从本AS内的R2学到网络10.0.0.0/24的Local_Pref为300，从本AS内的R3学到网络10.0.0.0/24的Local_Pref为200时，R1会选择经由R2到达目的网络10.0.0.0/24。

* MED属性：当某个AS有多个入口时，可以用MED属性来帮助其外部的AS选择一个较好的入口路径。一条路由的MED值越小，其优先级越高。（可选非过渡）
![](https://img-blog.csdnimg.cn/20200703173748997.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlaXRoNjc4NTc1Mw==,size_16,color_FFFFFF,t_70)

上图中：R1和R2将网段10.0.0.0/24传递给各自的EBGP邻居R3和R4，R3和R4在其他条件相同的情况下，优先选择MED值较低的路径，即均选择经由R1访问网络10.0.0.0/24。

* Community：团体属性。团体属性标识了一组具有相同特征的路由信息，与它所在的IP子网或自治系统无关。（可选过渡）

## BGP 选路规则与负载分担

当到达同一目的地存在多条路由时，BGP采取如下策略进行路由选择：

1. 如果此路由的下一跳不可达，忽略此路由
2. 优选协议首选值（PrefVal）最高的路由 （华为设备特有属性）
3. 优选本地优先级（Local_Pref）最高的路由
4. 优选本地生成的路由
5. 优选AS路径（AS_Path）最短的路由
6. 比较Origin属性，依次优选Origin类型为IGP、EGP、Incomplete的路由
7. 优选MED值最低的路由
8. 优选从EBGP邻居学来的路由
9. 优选到BGP下一跳IGP Metric较小的路由

当以上全部相同，则为“等价路由”，可以负载分担
注：AS_PATH必须一致；当负载分担时，以下3条原则无效
优选Cluster_List最短的路由
优选Originator_ID 或者Router ID最小的路由器发布的路由
比较对等体的IP Address，优选从具有较小IP Address的对等体学来的路由

根据BGP的选路原则以及BGP常用的路径属性，我们可以总结出9个影响BGP选路的重要参数，分别为：

* Preferred Value
* LOCAL_PREF
* AS_PATH
* ORIGIN
* MED
* 邻居类别是EBGP还是IBGP
* IGP内部开销值
* Cluster List /ROUTER_ID
* COMMUNITY

以上参数都能直接地影响BGP的路径选择，其中我们常用的参数分别为LOCAL_PREF, AS_PATH和MED属性。

## BGP 拓展特性

### 安全特性

* MD5：BGP使用TCP作为传输层协议，为提高BGP的安全性，可以在建立TCP连接时进行MD5认证。但BGP的MD5认证并不能对BGP报文认证，它只是为TCP连接设置MD5认证密码，由TCP完成认证。如果认证失败，则不建立TCP连接。
* GTSM（Generalized TTL Security Mechanism 即通用TTL安全保护机制）：使能BGP的GTSM策略后，接口板对所有BGP报文的TTL值进行检查。根据实际组网的需要，对于不符合TTL值范围的报文，GTSM可以设置为通过或丢弃。配置GTSM缺省动作为丢弃时，可以根据网络拓扑选择合适的TTL有限值范围，不符合TTL值范围的报文会被接口板直接丢弃，这样就避免了网络攻击者模拟的“合法”BGP报文占用CPU。该功能与EBGP多跳互斥。
* 限制从对等体接收的路由数量，防止资源耗尽性攻击。
* AS_Path长度保护。通过在入口和出口两个方向对AS_Path的长度进行限定，直接丢弃AS_Path超限的报文。

### 路由衰减（eBGP）

路由衰减（Route Dampening）用来解决路由不稳定的问题，即路由表中的某条路由反复消失和重现，也就是路由振荡。多数情况下，BGP协议都应用于复杂的网络环境中，路由变化十分频繁。为了防止持续的路由振荡带来的不利影响，BGP使用路由衰减来抑制不稳定的路由。

![](https://img-blog.csdnimg.cn/20200703195448601.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlaXRoNjc4NTc1Mw==,size_16,color_FFFFFF,t_70)

BGP衰减使用惩罚值来衡量一条路由的稳定性，惩罚值越高则说明路由越不稳定。路由每发生一次振荡（路由从激活状态变为未激活状态，称为一次路由振荡），BGP便会给此路由增加一定的惩罚值（1000）。当惩罚值超过抑制阈值时，此路由被抑制，不加入到路由表中，也不再向其他BGP对等体发布更新报文。
被抑制的路由每经过一段时间（900S），惩罚值便会减少一半，这个时间称为半衰期（Half-life）。当惩罚值降到再使用阈值时，此路由变为可用并被加入到路由表中，同时向其他BGP对等体发布更新报文

路由衰减只适用于EBGP路由。对于从IBGP收来的路由不能进行衰减，因为IBGP路由经常含有本AS的路由，内部网络路由要求转发表尽可能一致，IGP快速收敛就是为了达到信息同步，转发一致。如果衰减对IBGP路由起作用，不同设备的衰减参数不一致时，会导致转发表不一致。

{% endnote %}
