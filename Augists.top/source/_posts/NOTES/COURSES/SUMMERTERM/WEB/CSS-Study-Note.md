---
title: CSS Study Note
date: 2020-07-20 12:35:53
tags: [CODE, NOTE, WEB, CSS, SUMMERTERM]
description: CSS note in Summer Term

---

{% note warning %}

# CSS 学习

## font-size | color

```html
<a style="font-size: 40px; color: #ffad2a">augists.top</a>
```
元素内嵌样式表

---

```html
<head>
  <style type="text/css">
    a {
      font-size: 40px;
      color: #ffad2a
    }
</head>
<body>
  <a>augists.top</a>
</body>
```
内部样式表

---

```html
<head>
  <link rel="stylesheet" type="text/css" href="augists.css">
</head>
```
外部样式表

---

## 选择器

| 选择器类型       | 代码                                                                |
|------------------|---------------------------------------------------------------------|
| 选择所有元素     | style: `* {}`                                                       |
| 根据类型选择元素 | style: `a {}` <br> body: `<a>augists.top</a>`                       |
| 根据类选择元素   | style: `.class1 {}` <br> body: `<p class="class1">augists.top</p>`  |
| 根据 ID 选择元素 | style: `#id1 {}` <br> body: <p id="id1">augists.top</p>             |
| 根据属性选择元素 | style: `[href] {}` <br> body: <a href="augists.top">augists.top</a> |
| : 选择器动作     | style: `a:hover {}` <br> body: <a>augists.top</a>                   |

---

## border

```html
<head>
  <style type="text/css">
    .class1 {
      border-width: 5px;
      border-color: #345cff;
      border-style: solid;
    }
  </style>
</head>
<body>
  <p class="class1">augists.top</p>
</body>
```
样式必须要有
* border-style
	- solid
	- dashed
	- dotted
	- inset

---

### 单独方向设置

```html
<head>
  <style type="text/css">
    .class1 {
      border-width: 5px;
      border-color: #345cff;
      border-style: solid;
      border-top-color: #fff314;
      border-bottom-style: dashed;
    }
  </style>
</head>
```

---

```html
<head>
  <style type="text/css">
    .class1 {
      border: 5px solid red;
      border-top: 6px dashed yellow;
    }
  </style>
</head>
```
简写

---

### background color image size

```html
<head>
  <style type="text/css">
    .class1 {
      border: 5px solid red;
      border-top: 6px dashed yellow;
      bockground-color: #345cff;
    }
  </style>
</head>
```

---

```html
<head>
  <style type="text/css">
    .class1 {
      border: 5px solid red;
      border-top: 6px dashed yellow;
      background-image: url(background.jpg);
    }
  </style>
</head>
```

---

```html
<head>
  <style type="text/css">
    .class1 {
      background-repeat: no-repeat;
      background-image: url(background.jpg);
    }
  </style>
</head>
<body class="class1">
</body>
```

---

```html
<head>
  <style type="text/css">
    .class1 {
      background-image: url(background.jpg);
      background-size: contain;
    }
  </style>
</head>
<body class="class1">
</body>
```

* background-size
	- cover
	- contain

---

```html
<head>
  <style type="text/css">
    .class1 {
      background-attachment: fixed;
      background-image: url(background.jpg);
      background-size: contain;
    }
  </style>
</head>
<body class="class1">
</body>
```

* background-attachment
	- fixed
	- local 默认

---

```html
<head>
  .class1 {
      width: 50px;
      height: 50px;
      border: 1px solid black;
	  border-radius: 10px / 10px;
  }
</head>
```

---

## 文本样式

### 对齐文本

```html
<style type="text/css">
  .class1 {
    text-align: center;
  }
</style>
```

* center
* justify
* right
* left 默认

---

```html
<p align="center">augists.top</p>
```

---

### 文本方向

```html
<style type="text/css">
  .class1 {
    direction: rtl;
  }
</style>
```

* ltr
* rtl

---

### 指定字母间距、单词间距、行高

```html
<style type="text/css">
  .class1 {
    letter-spacing: 10px;
  }
</style>
```

---

```html
<style type="text/css">
  .class1 {
    word-spacing: 10px;
  }
</style>
```

---

```html
<style type="text/css">
  .class1 {
    line-height: 10px;
  }
</style>
```

---

### 首行缩进

```html
<style type="text/css">
  .class1 {
    text-indent: 50px;
  }
</style>
```

---

### 文本装饰

```html
<style type="text/css">
  .class1 {
    text-decoration: underline;
  }
</style>
```

* underline
* overline
* line-through

---

### 文本大小写转换

```html
<style type="text/css">
  .class1 {
    text-transform: capitalize;
  }
</style>
```

* capitalize
* uppercase
* lowercase

---

### 字体名称

```html
<style type="text/css">
  .class1 {
    font-family: 微软雅黑;
  }
</style>
```

---

### 字体大小

```html
<style type="text/css">
  .class1 {
    font-family: 微软雅黑;
    font-size: 40px;
  }
</style>
```

---

### 字体样式

```html
<style type="text/css">
  .class1 {
    font-family: 微软雅黑;
    font-size: 40px;
    font-style: normal;
  }
</style>
```

* normal
* italic
* oblique

---

### 指定字母是否以小型大写字母显示

```html
<style type="text/css">
  .class1 {
    font-variant: small-caps;
  }
</style>
```

---

### 设置字体粗细

```html
<style type="text/css">
  .class1 {
    font-weight: 900;
  }
</style>
```

---

### 创建文本阴影

```html
<style type="text/css">
  .class1 {
    text-shadow: 1px 1px 5px red;
  }
</style>
```

---

## css 过渡

```html
<head>
  <style type="text/css">
    p {
	  width: 100px;
	  height: 100px;
	  background-color: antiquewhite;
    }
	p:hover {
	  width: 200px;
	  height: 200px;
	  background-color: #ffad2a;
	}
  </style>
</head>
<body>
  <p></p>
</body>
```
直接过渡

---

```html
<head>
  <style type="text/css">
    p {
	  width: 100px;
	  height: 100px;
	  background-color: antiquewhite;
    }
	p:hover {
	  width: 200px;
	  height: 200px;
	  background-color: #ffad2a;
	  transition-delay: 150ms;
	  transition-duration: 500ms;
	  <!-- 可以加关于浏览器内核的
	  -webkit-transition-duration: ;
	  -o-transition-duration: ;
	  -->
	}
  </style>
</head>
<body>
  <p></p>
</body>
```

---

```html
<head>
  <style type="text/css">
    p {
	  width: 100px;
	  height: 100px;
	  background-color: antiquewhite;
    }
	p:hover {
	  width: 200px;
	  height: 200px;
	  background-color: #ffad2a;
	  transition-delay: 150ms;
	  transition-duration: 500ms;
	  transition-property: width;
	}
  </style>
</head>
<body>
  <p></p>
</body>
```

---

```html
<head>
  <style type="text/css">
    p {
	  width: 100px;
	  height: 100px;
	  background-color: antiquewhite;
    }
	p:hover {
	  width: 200px;
	  height: 200px;
	  background-color: #ffad2a;
	  transition-delay: 150ms;
	  transition-duration: 500ms;
	  transition-timing-function: ease;
	}
  </style>
</head>
<body>
  <p></p>
</body>
```
贝塞尔曲线

* linear
* ease
* ease-in
* ease-out
* ease-in-out

---

## css 动画

```html
<head>
  <style type="text/css">
    p {
	  width: 100px;
	  height: 100px;
	  background-color: antiquewhite;
    }
	p:hover {
	  animation-duration: 500ms;
	  animation-delay: 200ms;
	  animation-name: augists;
	  animation-iteration-count: infinite;
	  animation-direction: alternate;
	}
    @keyframs augists {
	  from {
	    width: 150px;
		height: 150px;
		background-color: #ffec32;
	  }
	  50% {
	    width: 130px;
		height: 130px;
		background-color: #3b88ff;
	  }
	  75% {
	    width: 160px;
		height: 160px;
	  }
	  to {
	    width: 200px;
		height: 200px;
		background-color: #ffad2a;
	  }
	}
  </style>
</head>
<body>
  <p></p>
</body>
```

---

## css 变换

```html
<head>
  <style type="text/css">
    p {
      width: 100px;
      height: 100px;
      background-color: antiquewhite;
    }
    p:hover {
      width: 100px;
      height: 100px;
      background-color: antiquewhite;
      transiform: rotate(45deg);
      transiform: scale(1.5);
      transiform: scalex(1.5);
      transiform-origin: top right;
      transiform-origin: 20px 40px;
    }
  </style>
</head>
<body>
  <p></p>
</body>
```

---

## css 盒子模型

* content
* padding
* border
* margin

---

```html
<head>
  <style type="text/css">
    .class1 {
      border: 1px solid black;
      background-color: antiquewhite;
      <!--
      padding-top: 100px;
      -->
      padding: 100px 80px 50px 30px;
      background-clip: content-box;
    }
  </style>
</head>
<body>
  <div class="class1">
    augists.top
  </div>
</body>
```
* content-box
* padding-box

---

```html
<head>
  <style type="text/css">
    .class1 {
      border: 1px solid black;
      background-color: antiquewhite;
      background-clip: content-box;
      margin-top: 100px;
      margin-left: 100px;
    }
  </style>
</head>
<body>
  <div class="class1">
    augists.top
  </div>
</body>

```

---

{% note %}

课程视频链接
[靠谱学院-星月-css](https://www.bilibili.com/video/BV1ds411r7o7?p=20)

{% endnote %}

{% endnote %}
