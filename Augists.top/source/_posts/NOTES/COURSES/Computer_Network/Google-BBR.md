---
title: Google BBR
tags: [NOTE]
description: 'Google BBR explanation'
date: 2021-05-19 15:54:00

---

{% note warning %}

在 TCP 中，拥塞控制通常分为四个主要方向：
1. 慢启动
2. 拥塞避免
3. 快速重传
4. 快速恢复

![slow-start](https://ask.qcloudimg.com/http-save/yehe-5661042/d908hulije.jpeg?imageView2/2/w/1620)

慢启动在 BBR 中仍然保留。它在不知道瓶颈带宽时以指数级增长达到或检测阈值，如图中前 4 秒。达到阈值后，开始加性增阶段，即拥塞避免。直到发生丢包后进行快速恢复和快速重传

如果瓶颈路由器的缓存特别大，那么这种以丢包作为探测依据的拥塞算法将会导致严重问题：TCP链路上长时间RTT变大，但吞吐量维持不变。

事实上，我们的传输速度在3个阶段被不同的因素限制：
1. 应用程序限制阶段，此时 RTT 不变，随着应用程序开始发送大文件，速率直线上升
2. BDP限制阶段，此时RTT开始不断上升，但吞吐量不变，因为此时瓶颈路由器已经达到上限，缓冲队列正在不断增加
3. 瓶颈路由器缓冲队列限制阶段，此时开始大量丢包

如下所示：

![](https://ask.qcloudimg.com/http-save/yehe-5661042/g8nl3rudja.png?imageView2/2/w/1620)

如CUBIC这样基于丢包的拥塞控制算法在第2条灰色竖线发生作用，这已经太晚了，更好的作用点是BDP上限开始发挥作用时，也就是第1条灰色竖线。

什么叫做BDP呢？它叫做带宽时延积，例如一条链路的带宽是100Mbps，而RTT是40ms，那么

`BDP=100Mbps*0.04s=4Mb=0.5MB`

即平均每秒飞行中的报文应当是0.5MB。因此Linux的接收窗口缓存常参考此设置：

![](https://ask.qcloudimg.com/http-save/yehe-5661042/w936eownn1.jpeg?imageView2/2/w/1620)

第1条灰色竖线，是瓶颈路由器的缓冲队列刚刚开始积压时的节点。随着内存的不断降价，路由器设备的缓冲队列也会越来越大，CUBIC算法会造成更大的RTT时延！

而BBR通过检测RTprop和BtlBw来实现拥塞控制。什么是RTprop呢？这是链路的物理时延，因为RTT里含有报文在路由器队列里的排队时间、ACK的延迟确认时间等。什么叫延迟确认呢？TCP每个报文必须被确认，确认动作是通过接收端发送ACK报文实现的，但由于TCP和IP头部有40个字节，如果不携带数据只为发送ACK网络效率过低，所以会让独立的ACK报文等一等，看看有没有数据发的时候顺便带给对方，或者等等看多个ACK一起发。所以，可以用下列公式表示RTT与RTprop的差别：

![](https://ask.qcloudimg.com/http-save/yehe-5661042/k3k0ctbo1g.png?imageView2/2/w/1620)

RTT我们可以测量得出，RTprop呢，我们只需要找到瓶颈路由器队列为空时多次RTT测量的最小值即可：

![](https://ask.qcloudimg.com/http-save/yehe-5661042/lsmzam2ndc.png?imageView2/2/w/1620)

而BtlBw全称是bottleneck bandwith，即瓶颈带宽，我们可以通过测量已发送但未ACK确认的飞行中字节除以飞行时间deliveryRate来测量：

![](https://ask.qcloudimg.com/http-save/yehe-5661042/kmknrmv9w3.png?imageView2/2/w/1620)

早在1979年Leonard Kleinrock就提出了第1条竖线是最好的拥塞控制点，但被Jeffrey M. Jaffe证明不可能实现，因为没有办法判断RTT变化到底是不是因为链路变化了，从而不同的设备瓶颈导致的，还是瓶颈路由器上的其他TCP连接的流量发生了大的变化。但我们有了RTprop和BtlBw后，当RTprop升高时我们便得到了BtlBw，这便找到第1条灰色竖线最好的拥塞控制点，也有了后续发送速率的依据。

基于BBR算法，由于瓶颈路由器的队列为空，最直接的影响就是RTT大幅下降，可以看到下图中CUBIC红色线条的RTT比BBR要高很多：

![](https://ask.qcloudimg.com/http-save/yehe-5661042/2akuijcg66.png?imageView2/2/w/1620)

而因为没有丢包，BBR传输速率也会有大幅提升，下图中插入的图为CDF累积概率分布函数，从CDF中可以很清晰的看到CUBIC下大部分连接的吞吐量都更低：

![](https://ask.qcloudimg.com/http-save/yehe-5661042/rkczti8k6v.png?imageView2/2/w/1620)

如果链路发生了切换，新的瓶颈带宽升大或者变小怎么办呢？BBR会尝试周期性的探测新的瓶颈带宽，这个周期值为1.25、0.75、1、1、1、1，如下所示：

![](https://ask.qcloudimg.com/http-save/yehe-5661042/niu0skdnge.png?imageView2/2/w/1620)

1.25会使得BBR尝试发送更多的飞行中报文，而如果产生了队列积压，0.75则会释放队列。下图中是先以10Mbps的链路传输TCP，在第20秒网络切换到了更快的40Mbps链路，由于1.25的存在BBR很快发现了更大的带宽，而第40秒又切换回了10Mbps链路，2秒内由于RTT的快速增加BBR调低了发送速率，可以看到由于有了pacing_gain周期变换BBR工作得很好。

![](https://ask.qcloudimg.com/http-save/yehe-5661042/m52f1rftzh.png?imageView2/2/w/1620)

pacing_gain周期还有个优点，就是可以使多条初始速度不同的TCP链路快速的平均分享带宽，如下图所示，后启动的连接由于过高估计BDP产生队列积压，早先连接的BBR便会在数个周期内快速降低发送速率，最终由于不产生队列积压下RTT是一致的，故平衡时5条链路均分了带宽：

![](https://ask.qcloudimg.com/http-save/yehe-5661042/dkvmzixicf.png?imageView2/2/w/1620)

我们再来看看慢启动阶段，下图网络是10Mbps、40ms，因此未确认的飞行字节数应为

`10Mbps*0.04s=0.05MB`

红色线条是CUBIC算法下已发送字节数，而蓝色是ACK已确认字节数，绿色则是BBR算法下的已发送字节数。显然，最初CUBIC与BBR算法相同，在0.25秒时飞行字节数显然远超过了0.05MB字节数，大约在 0.1MB字节数也就是2倍BDP：

![](https://ask.qcloudimg.com/http-save/yehe-5661042/c93xtbnopr.png?imageView2/2/w/1620)

大约在0.3秒时，CUBIC开始线性增加拥塞窗口，而到了0.5秒后BBR开始降低发送速率，即排空瓶颈路由器的拥塞队列，到0.75秒时飞行字节数调整到了BDP大小，这是最合适的发送速率。

当繁忙的网络出现大幅丢包时，BBR的表现也远好于CUBIC算法。下图中，丢包率从0.001%到50%时，可以看到绿色的BBR远好于红色的CUBIC。大约当丢包率到0.1%时，CUBIC由于不停的触发拥塞算法，所以吞吐量极速降到10Mbps只有原先的1/10，而BBR直到5%丢包率才出现明显的吞吐量下降。

![](https://ask.qcloudimg.com/http-save/yehe-5661042/a5jrnqdpqq.png?imageView2/2/w/1620)

CUBIC造成瓶颈路由器的缓冲队列越来越满，RTT时延就会越来越大，而操作系统对三次握手的建立是有最大时间限制的，这导致建CUBIC下的网络极端拥塞时，新连接很难建立成功，如下图中RTT中位数达到 100秒时 Windows便很难建立成功新连接，而200秒时Linux/Android也无法建立成功。

![](https://ask.qcloudimg.com/http-save/yehe-5661042/t24h8pps9s.png?imageView2/2/w/1620)

BBR算法的伪代码如下，这里包括两个流程，收到ACK确认以及发送报文：

```
function onAck(packet)
  rtt = now - packet.sendtime
  update_min_filter(RTpropFilter, rtt)
  delivered += packet.size
  delivered_time = now
  deliveryRate = (delivered - packet.delivered) / (delivered_time - packet.delivered_time)
  if (deliveryRate > BtlBwFilter.currentMax || ! packet.app_limited)
     update_max_filter(BtlBwFilter, deliveryRate)
  if (app_limited_until > 0)
     app_limited_until = app_limited_until - packet.size
```
这里的app_limited_until是在允许发送时观察是否有发送任务决定的。发送报文时伪码为：

```
function send(packet)
  bdp = BtlBwFilter.currentMax × RTpropFilter.currentMin
  if (inflight >= cwnd_gain × bdp)
     // wait for ack or retransmission timeout
     return
  if (now >= nextSendTime)
     packet = nextPacketToSend()
     if (! packet)
        app_limited_until = inflight
        return
     packet.app_limited = (app_limited_until > 0)
     packet.sendtime = now
     packet.delivered = delivered
     packet.delivered_time = delivered_time
     ship(packet)
     nextSendTime = now + packet.size / (pacing_gain × BtlBwFilter.currentMax)
  timerCallbackAt(send, nextSendTime)
```
pacing_gain便是决定链路速率调整的关键周期数组。

BBR算法对网络世界的拥塞控制有重大意义，尤其未来可以想见路由器的队列一定会越来越大。HTTP3放弃了TCP协议，这意味着它需要在应用层（各框架中间件）中基于BBR算法实现拥塞控制，所以，BBR算法其实离我们很近。理解BBR，我们便能更好的应对网络拥塞导致的性能问题，也会对未来的拥塞控制算法发展脉络更清晰。



{% endnote %}
