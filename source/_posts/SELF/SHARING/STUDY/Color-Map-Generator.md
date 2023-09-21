---
title: Color Map Generator
tags: [SHARING, GOLANG]
description: 'A simple tool for generating color map by given image'
date: 2022-08-20 10:12:20
---

{% note warning %}

前天偶然想到要做一个自动采集图片颜色，并且按照比例和颜色排成色卡的小工具，顺便敲敲代码
因为没有上升到直方图的层次，所以对于图片的判断并没有很大的辅助效果，它只能帮助更直观的体现图片的颜色层次和范围
本身对于图片的颜色提取到最后的绘制 color map 都很简单，Golang 也有标准库 image 来提供对不同格式图片的编码和解码
但是在对于提取后的颜色排序上，遇到了一些很有意思的问题

---

提取后的颜色结果存储形式是 `color.Color`，在官方文档里是这样写的

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/Screen Shot 2022-08-20 at 10.34.53.png">

* 注意到，它返回的是 *alpha-permultiplied red, green, blue and alpha values*，并非我们平时直接用到的 RGB 值。平常理解的值是 0-255 范围，而这里是 0-65535，但是它可以转换为普通的 RGB 值，并且直接以 *alpha-premultiplied* 的 RGB 进行排序也是可以的
* 直接打印 `color.Color` 对象会发现它输出的并不是 RGB 值，这在一开始对我产生了很大的误导。我在排序后查看 log 中存储的 `color.Color` 结果时发现一直是乱序，让我一直以为我的排序不起作用
* 由于我将输出设定为固定高度 50px，在尝试将宽度设置为原图的长x宽后发现会导致编码后的图片可能由于长宽比过于夸张而无法读取（width: 19w px, height: 50px）。经过测试，最终选择用 step 的方式将宽度固定为原图等宽，也可以宽 50px 长度等长，这样就可以将 color map 与原图放在一起生成图片
* 通常的调色盘是如下图这种形式。通过将左边拉到右上角，调整右边的颜色滑块，观察 RGB 值可以看到，所有颜色被分为了六个部分

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/D5826E381AB434B0940EC19F32DD890B.jpg">

```text
ffxx00: 00-ff
xxff00: ff-00
00ffxx: 00-ff
00xxff: ff-00
xx00ff: 00-ff
ff00xx: ff-00
```

其中 xx 的变化范围在右边。这也就说明，对于任意一个颜色，需要优先判断它所处的颜色范围，例如 `#ff0301` 需要先划分到 `#ff0300` 属于第一种颜色范围。如果将 `#ff0301` 与 `#ff0103` 进行对比排序，他们的颜色范围分别是 `#ff0300` 和 `#ff0003`，也即 `#ffxx00` 和 `#ff00xx`，分属不同颜色范围。但如果是 `#ff0301` 和 `#ff0302` 比较，他们同属于 `#ffxx00` 中，就是在同一颜色范围中进行比较，就会涉及到对左侧色盘的调整。你很难说 `#ff0302` 和 `#ff0504` 谁应该放在前面，是否在同一颜色范围内应该以 xx 作为第一排序原则。同时，若是 `#fe0302` 就需要找最靠近标准值的两个颜色，也即 `fe` 和 `02`，这时在同一颜色范围又该如何判断

* 除了上面这种非常复杂的排序方案，我也考虑了一些简单的排序并在这里附上他们的效果图。测试图片由顾景提供

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/colormaptest.jpg">

---

按照先排 R，再排 G，最后排 B 的顺序

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/DF693CF0583BFD479E02771CC1BAE7BF.png">

---

按照 `r1 < r2 && g1 < g2 && b1 < b2` 排序

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/B91446BCDB5D9838F480D59B2150D234.png">

注意判断的顺序

---

去掉了优先级排序中对于相同值的判断

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/F05A1ED7761CD4FA818F7B183D5C7E5B.png">

似乎影响不大，但是它将左边的蓝色大块打散消掉了

---

单 R 值排序

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/34E667A4C8B86CCDE4DC9E481ED8BECD.png">

对于这张照片来说，单 R 和前一种效果最好

---

单 G 值排序

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/42A62092F071E6872F888DCE704CC36A.png">

---

单 B 值排序

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/4CBCB6A27BD6F540EDF726EF9EDE1642.png">

---

以明度值排序也放在代码里，但是好像效果不是很好

---

想要做到颜色的平滑过渡似乎并不容易，我更希望能通过改进第一种算法达到如下图的效果

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/Screen Shot 2022-08-20 at 11.01.16.png">

代码放在了 [GitHub 仓库](https://github.com/Augists/imgColorMapGenerator) 里，最后的实现效果虽然没有达到最预期，但是也是看了几种不同的实现效果

后续想要改进和实现第一种，可以加如对于聚类的一些思想。Reference 中的文章可以参考，我这里的排序都是在自己摸索规律

## Reference

* [color sorting](http://adrianlikins.com/2011/07/color-sorting/)
* [sortpal.js](https://github.com/alikins/sortpal.js/blob/master/sortpal.js)
* [How to sort colors properly?](https://mathematica.stackexchange.com/questions/87588/how-to-sort-colors-properly)
* [The incredibly challenging task of sorting colours](http://www.alanzucconi.com/2015/09/30/colour-sorting/)

{% endnote %}
