---
title: image waterfall
tags: [HEXO]
description: '分享一次纯 css 瀑布流 和 js 瀑布流<br>Copyright@Krry'
date: 2021-01-14 21:38:40
author: Krry

---

{% note warning %}

{% note %}

博客的照片墙本来也考虑了这种瀑布流的形式，但是最终还是没有采用
这里把我看到的瀑布流的博客转载过来，方便以后想要更改的时候再看
[原文链接](https://ainyi.com/60)

{% endnote %}

现在百度图片，360 图片搜索，都是以一种瀑布流的形式展示，那么接下来，分享一波纯 css 瀑布流 和 js 瀑布流

## 纯 css 写瀑布流

### multi-columns 方式

通过 Multi-columns 相关的属性 column-count、column-gap 配合 break-inside 来实现瀑布流布局。

设置这样的 html 结构：

```html
<div class="masonry"> 
  <div class="item"> 
    <div class="item_content content-lar"> 1 我最大 </div> 
  </div> 
  <div class="item"> 
    <div class="item_content content-sma"> 2 我最小 </div> 
  </div>
  <div class="item"> 
    <div class="item_content content-mid"> 3 我中等 </div> 
  </div>
  <div class="item"> 
    <div class="item_content content-sma"> 4 我最小 </div> 
  </div>
  <div class="item"> 
    <div class="item_content content-mid"> 5 我中等 </div> 
  </div>
  <div class="item"> 
    <div class="item_content content-lar"> 6 我最大 </div> 
  </div>
  <div class="item"> 
    <div class="item_content content-sma"> 7 我最小 </div> 
  </div>
  <div class="item"> 
    <div class="item_content content-lar"> 8 我最大 </div> 
  </div>
  <div class="item"> 
    <div class="item_content content-lar"> 9 我最大 </div> 
  </div>
  <div class="item"> 
    <div class="item_content content-sma"> 10 我最小 </div> 
  </div>
  <div class="item">
    <div class="item_content content-mid"> 11 我中等 </div> 
  </div>
  <div class="item"> 
    <div class="item_content content-mid"> 12 我中等 </div> 
  </div>
  <!-- more items --> 
</div>
```

.masonry 是瀑布流容器，里面放置了列表 item，在 .masonry 中设置 column-count（列数） 和 column-gap（列间距）

item 中设置 break-inside:avoid，这是为了控制文本块分解成单独的列，以免项目列表的内容跨列，破坏整体的布局。

在 css 中设置包裹 masonry 和 item 的属性样式：

```css
.masonry { 
  -moz-column-count:3; /* Firefox */
  -webkit-column-count:3; /* Safari 和 Chrome */
  column-count:3;
  -moz-column-gap: 2em;
  -webkit-column-gap: 2em;
  column-gap: 2em;
  width: 70%;
  margin:2em auto;
}
.item { 
  padding: 2em;
  margin-bottom: 2em;
  -moz-page-break-inside: avoid;
  -webkit-column-break-inside: avoid;
  break-inside: avoid;
  background: #f60;
  color: #fff;
  text-align: center;
}
.item .content-lar {
  height: 200px;
}
.item .content-mid {
  height: 100px;
}
.item .content-sma {
  height: 50px;
}
```

当然为了布局具有响应式效果，可以借助媒体查询属性，在不同屏幕大小的条件下设置瀑布流容器 masonry 的 column-count 来自适应改变列数：

```css
@media screen and (max-width: 800px) { 
  .masonry { 
    column-count: 2; /* two columns on larger phones */
  } 
} 
@media screen and (max-width: 500px) { 
  .masonry { 
    column-count: 1; /* two columns on larger phones */
  }
}
```

那么以上代码产生的效果是：

![](https://ainyi.com/krryblog/upload/content/60/31.jpg)

也是根据屏幕大小自适应改变列数

### flexbox 方式 （flex布局）

html 的结构依旧和上面的 Multi-columns 展示的一样。只是在 .masonry 容器中使用的 CSS 不一样；

在 .masonry 中是通过采用 flex-flow 来控制列，并且允许它换行

这里关键是容器的高度，我这里要显式的设置 height 属性，当然除了设置 px 值，还可以设置100vh，让 .masonry 容器的高度和浏览器视窗高度一样

记住，这里 height 可以设置成任何高度值（采用任何的单位），但不能不显式的设置，如果没有显式的设置，容器就无法包裹住项目列表

```css
.masonry {
  height: 800px;
  display: flex;
  flex-flow: column wrap;
  width: 70%;
  margin:2em auto;
}
.item {
  padding: 2em;
  margin-bottom: 2em;
  break-inside: avoid;
  background: #f60;
  color: #fff;
  text-align: center;
  margin: 10px;
}
.item .content-lar {
  height: 200px;
}
.item .content-mid {
  height: 100px;
}
.item .content-sma {
  height: 50px;
}
```

对于 .item，可以不再使用 break-inside:avoid，但其它属性可以是一样。

同样的，响应式设置，使用 Flexbox 实现响应式布局比多列布局 Multi-columns 要来得容易，他天生就具备这方面的能力，只不过我们这里需要对容器的高度做相关的处理。

前面也提到过了，如果不给 .masonry 容器显式设置高度是无法包裹项目列表的，那么这里响应式设计中就需要在不同的媒体查询条件下设置不同的高度值：

```css
@media screen and (max-width: 1100px) {
  .masonry {
    height: 800px;
  }
}
@media screen and (max-width: 800px) {
  .masonry {
    height: 1100px;
  }
}
@media screen and (max-width: 600px) {
  .masonry {
    height: 1300px;
  }
}
@media screen and (max-width: 460px) {
  .masonry {
    height: 1600px;
  }
}
```

那么所产生的效果是：

![](https://ainyi.com/krryblog/upload/content/60/32.jpg)

## 问题来了

看到这里，我们可以发现，使用纯 css 写瀑布流，每一块 item 都是从上往下排列，不能做到从左往右排列：

![](https://ainyi.com/krryblog/upload/content/60/33.jpg)

这样子若是动态加载图片的瀑布流，体验就会很不好

我们想要的是横向排列：

![](https://ainyi.com/krryblog/upload/content/60/34.jpg)

要实现如上，只能通过 js 来写瀑布流

## js 写瀑布流

html 结构与上面类似，但这里我用图片来做示例

```html
<div class="masonry">
  <div class="item">
    <img class="lazy" src="images/1.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/2.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/3.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/4.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/5.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/6.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/7.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/8.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/9.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/10.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/11.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/12.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/13.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/14.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/15.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/16.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/17.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/18.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/19.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/20.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/21.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/22.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/23.jpg" alt="" />
  </div>
  <div class="item">
    <img class="lazy" src="images/24.jpg" alt="" />
  </div>
</div>
```

css 内容

```css
.masonry {
  width: 100%;
  margin-top: 50px;
  position:relative;
}
.item {
  z-index: 10;
  transition: 0.25s;
  overflow: hidden;
  position: absolute;
}
.item img{
  width: 100%;
  height:100%;
  transition: 0.25s;
}
.item:hover img{
  z-index: 100;
  transition: 0.25s;
  overflow: hidden;
  animation: bounceIn 0.25s ease-in 2 alternate;
}
@keyframes bounceIn{
  100% {
    transform: scale(1.07);
  }
}
```

### 重点：js 瀑布流实现方式

css 的绝对定位方式：根据每张图片的位置设置 top 和 left 值

```js
// 瀑布流效果
// 这里有一个坑（已经修复）：
// 因为是动态加载远程图片，在未加载完全无法获取图片宽高
// 未加载完全就无法设定每一个 item(包裹图片)的 top。

// item 的 top 值：第一行：top 为 0
//            其他行：必须算出图片宽度在 item 宽度的缩小比例，与获取的图片高度相乘，从而获得 item 的高度
//                   就可以设置每张图片在瀑布流中每块 item 的 top 值（每一行中最小的 item 高度，数组查找）
// item 的 left 值：第一行：按照每块 item 的宽度值*块数
//            其他行：与自身上面一块的 left 值相等
function waterFall () {
  // 1- 确定图片的宽度 - 滚动条宽度
  let pageWidth = getClient().width-8;
  let columns = 3; // 3 列
  let itemWidth = parseInt(pageWidth/columns); // 得到item的宽度
  $(".item").width(itemWidth); // 设置到item的宽度

  let arr = [];

  $(".masonry .item").each(function(i){
    let height = $(this).find("img").height();
    let width = $(this).find("img").width();
    let bi = itemWidth/width; // 获取缩小的比值
    let boxheight = parseInt(height*bi); // 图片的高度*比值 = item的高度

    if (i < columns) {
      // 2- 确定第一行
      $(this).css({
        top:0,
        left:(itemWidth) * i
      });
      arr.push(boxheight);

    } else {
      // 其他行
      // 3- 找到数组中最小高度  和 它的索引
      let minHeight = arr[0];
      let index = 0;
      for (let j = 0; j < arr.length; j++) {
        if (minHeight > arr[j]) {
          minHeight = arr[j];
          index = j;
        }
      }
      // 4- 设置下一行的第一个盒子位置
      // top值就是最小列的高度
      $(this).css({
        top:arr[index],
        left:$(".masonry .item").eq(index).css("left")
      });

      // 5- 修改最小列的高度
      // 最小列的高度 = 当前自己的高度 + 拼接过来的高度
      arr[index] = arr[index] + boxheight;
    }
  });
}


// clientWidth 处理兼容性
function getClient() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}



 // 页面尺寸改变时实时触发
window.onresize = function() {
  // 重新定义瀑布流
  waterFall();
};



// 初始化
window.onload = function(){

  // 实现瀑布流
  waterFall();

}
```

大功告成，效果图是

![](https://ainyi.com/krryblog/upload/content/60/35.jpg)

[地址预览](http://ele.ainyi.com/krry_wallpaper)

{% endnote %}
