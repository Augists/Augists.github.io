---
title: Why my devices cannot automatically connect to mbp
tags: [MAC, SHARING]
description: 'After getting more wireless connectivity devices, I have unfortunately found that my Bluetooth devices have a high probability of not connecting every time I wake up my Macbook Pro.<br>
At first I thought it was the fault of HHKB, but now I am temporarily a fan of bluetooth wireless<br>
I bought a Logi master 2s as my new mouse to cope with the use of scenarios at home<br>
Also my Audio-Technica headphones also changed to wireless mode<br>
Just now I wake up my mac and only headphones connected<br>
It really bothered me for a long time'
date: 2022-01-10 20:27:43

---

{% note warning %}

早先的无线设备大多使用的是 2.4G 无线接收器来进行传输，例如之前使用的罗技 M370 和 ikbc poker，并且耳机也一直用着 3.5mm 的音频线，可以说对蓝牙真无线一直没有接触很多
自从去年换用了 HHKB，经常需要使用蓝牙来进行连接。前几天又买了罗技的 mx master 2s 作为在家里使用的过渡品，耳机也改为了无线蓝牙来进行传输，蓝牙自动连接的问题就一直在困扰着我

{% note danger %}

为什么我在唤醒电脑之后，只有耳机自动连接了电脑，另外两个都无法连接

{% endnote %}

我们知道，在点击系统 menu bar 上的蓝牙小图标时，如果按住 `option` 再点，会显示详细信息；旧版本的系统在按住 `shift + option` 点击时，可以重置蓝牙模块（现在好像没有了
恰巧我再查看的时候，注意到我的电脑蓝牙开关下有一行小字写着 `Discoverable: off`
我就感觉不是很对劲

根据 ssh 心跳包的理解，我们可以猜测，耳机由于没有关机并且是音频设备，可能会一直用心跳包来维持蓝牙的连接
而键盘和鼠标都有长时间不用自动断电的功能
由于 mac 的蓝牙被设定为不可以被发现，所以当电脑不是主动去发现并连接设备时，设备的主动尝试连接失效

解决方案是：可以在 `系统偏好设置 - Sharing - Bluetooth Sharing` 将其勾选打开，这样电脑就允许被其他设备通过蓝牙进行扫描发现了

{% endnote %}
