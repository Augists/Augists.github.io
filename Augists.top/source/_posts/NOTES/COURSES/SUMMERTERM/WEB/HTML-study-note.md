---
title: HTML study note
date: 2020-07-18 11:19:41
tags: [CODE, NOTE, WEB, HTML, SUMMERTERM]
description: HTML note in Summer Term

---

{% note warning %}

## html 基本元素

### 超链接

```html
<a href="www.augists.top">augists.top</a>
```

---

#### 新建窗口进入

```html
<a href="www.augists.top" target="_blank">augists.top</a>
```

* `_blank` 新窗口
* `_self` 本地刷新（默认）

---

{% note success %}

<a href="www.augists.top" target="_blank">augists.top</a>

{% endnote %}

---

### 粗体

```html
<b>augists.top</b>
```

---

{% note success %}

<b>augists.top</b>

{% endnote %}

---

### 斜体

```html
<em>augists.top</em>
```

---

{% note success %}

<em>augists.top</em>

{% endnote %}

---

### 下划线

```html
<u>augists.top</u>
```
不再支持

{% note success %}

<u>augists.top</u>

{% endnote %}

---

### 删除线

```html
<s>augists.top</s>
```

---

{% note success %}

<s>augists.top</s>

{% endnote %}

---

## html 表格元素

```html
<table>
  <tr>
    <td>网站域名</td>
    <td>augists.top</td>
  </tr>
</table>
```

---

### 边框

```html
<table border="1px">
  <tr>
    <td>网站域名</td>
    <td>augists.top</td>
  </tr>
</table>
```
不建议使用

---

### 居中

```html
<table border="1px" align="center">
  <tr>
    <td>网站域名</td>
    <td>augists.top</td>
  </tr>
</table>
```
不建议使用

---

### 多行表格

```html
<table border="1px">
  <tr>
    <td>网站域名1</td>
    <td>augists.top</td>
  </tr>
  <tr>
    <td>网站域名2</td>
    <td>augists.网址</td>
  </tr>
</table>
```

---

### 表格首行

```html
<table border="1px">
  <tr>
    <th>名称</th>
    <th>域名</th>
  </tr>
  <tr>
    <td>个人博客</td>
    <td>augists.top</td>
  </tr>
  <tr>
    <td>其他域名</td>
    <td>augists.网址</td>
  </tr>
</table>
```

---

### 表头表身表脚

```html
<table border="1px">
  <thead>
    <tr>
      <th>名称</th>
      <th>域名</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>个人博客</td>
      <td>augists.top</td>
    </tr>
    <tr>
      <td>其他域名</td>
      <td>augists.网址</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>名称</td>
      <td>域名</td>
    </tr>
  </tfoot>
</table>
```

---

{% note success %}

<table border="1px">
  <thead>
    <tr>
      <th>名称</th>
      <th>域名</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>个人博客</td>
      <td>augists.top</td>
    </tr>
    <tr>
      <td>其他域名</td>
      <td>augists.网址</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>名称</td>
      <td>域名</td>
    </tr>
  </tfoot>
</table>

{% endnote %}

---

### 合并单元格

```html
<table boder="1px">
  <tr>
    <th rowspan="2">aaaa</th>
    <th>aaaa</th>
    <th>aaaa</th>
    <th>aaaa</th>
  </tr>
  <tr>
    <td colspan="2">aaaa</td>
    <td>aaaa</td>
  </tr>
  <tr>
    <td>aaaa</td>
    <td>aaaa</td>
    <td>aaaa</td>
    <td>aaaa</td>
  </tr>
</table>
```

{% note success %}

<table boder="1px">
  <tr>
    <th rowspan="2">aaaa</th>
    <th>aaaa</th>
    <th>aaaa</th>
    <th>aaaa</th>
  </tr>
  <tr>
    <td colspan="2">aaaa</td>
    <td>aaaa</td>
  </tr>
  <tr>
    <td>aaaa</td>
    <td>aaaa</td>
    <td>aaaa</td>
    <td>aaaa</td>
  </tr>
</table>

{% endnote %}

---

## html5 列表元素

### 有序列表

```html
<ol>
  <li>a</li>
  <li>a</li>
  <li>a</li>
  <li>a</li>
</ol>
```

---

#### 降序

```html
<ol reversed>
  <li>a</li>
  <li>a</li>
  <li>a</li>
  <li>a</li>
</ol>
```
html5 新

---

#### 样式

```html
<ol type="A">
  <li>a</li>
  <li>a</li>
  <li>a</li>
  <li>a</li>
</ol>
```

* A
* 1 默认
* a
* I
* i

---

#### 多级有序列表

```html
<ol>
  <li>网址</li>
  <ol type="a">
    <li>www.augists.top</li>
    <li>www.augists.网址</li>
  </ol>
</ol>
```

---

{% note success %}

<ol>
  <li>网址</li>
  <ol type="a">
    <li>www.augists.top</li>
    <li>www.augists.网址</li>
  </ol>
</ol>

{% endnote %}

---

### 无序列表

```html
<ul>
  <li>a</li>
  <li>a</li>
  <li>a</li>
  <li>a</li>
  <li>a</li>
</ul>
```

---

## html5 表单元素

表单是 HTML 中获取用户输入的手段

```html
<form>
  <input>
</form>
```

---

### type text

```html
<form>
  <input type="text">
</form>
```
单行文本框

---

#### value

```html
<form>
  <input type="text" value="augists.top">
</form>
```
默认填充

---

#### placeholder

```html
<form>
  <input type="text" placeholder="augists.top">
</form>
```
占位，不占文本框内的

---

#### maxlength

```html
<form>
  <input type="text" maxlength="8">
</form>
```

---

#### size

```html
<form>
  <input type="text" maxlength="8" size="8">
</form>
```
文本框拓宽

---

{% note success %}

<form>
  <input type="text" placeholder="augists.top" maxlength="10" size="10">
</form>

{% endnote %}

---

#### readonly

```html
<form>
  <input type="text" value="augists.top" readonly>
</form>
```
只能复制

---

{% note success %}

<form>
  <input type="text" value="augists.top" readonly>
</form>

{% endnote %}

---

### type password

```html
<form>
  <input type="password" placeholder="密码">
</form>
```

---

{% note success %}

<form>
  <input type="password" placeholder="密码">
</form>

{% endnote %}

---

### textarea

```html
<form>
  <textarea>
    augists.top
  </textarea>
</form>
```
多行文本框
内容相当于 value

---

#### rows

```html
<form>
  <textarea rows="5">
    augists.top
  </textarea>
</form>
```
增加文本框的行数

---

{% note success %}

<form>
  <textarea rows="5">
    augists.top
  </textarea>
</form>

{% endnote %}

---

### type button

```html
<form>
  <input type="button" value="按钮">
</form>
```

---

```html
<form>
  <button>按钮</button>
</form>
```
与 js 相关，作为绑定事件

---

```html
<form>
  <input type="submit" value="提交">
</form>
```
适用于提交表单，必须声明 form 里的 method 属性，涉及 PHP

---

{% note success %}

<form>
  <input type="button" value="按钮">
</form>

{% endnote %}

---

### type range

```html
<form>
  <input type="range">
</form>
```

---

#### max min

```html
<form>
  <input type="range" min="-100" max="100">
</form>
```
默认 min 为 0

---

#### step

```html
<form>
  <input type="range" min="-100" max="100" step="100">
</form>
```

---

#### value

```html
<form>
  <input type="range" min="-100" max="100" step="100" value="100">
</form>
```

---

{% note success %}

<form>
  <input type="range" min="-100" max="100" step="100" value="100">
</form>

{% endnote %}

---

### type number

```html
<form>
  <input type="number">
</form>
```

---

#### min max value

```html
<form>
  <input type="number" min="-100" max="100" value="0">
</form>
```

---

{% note success %}

<form>
  <input type="number" min="-100" max="100" value="0">
</form>

{% endnote %}

---

### type checkbox

```html
<form>
  <input type="checkbox">选择
</form>
```

---

{% note success %}

<form>
  <input type="checkbox">选择
</form>

{% endnote %}

---

### type radio

```html
<form>
  <input type="radio">选择
</form>
```
选中不能取消

---

{% note success %}

<form>
  <input type="radio">选择
</form>

{% endnote %}

---

#### name

```html
<form>
  <input type="radio" name="a">augists.top
  <input type="radio" name="a">augists.top
  <input type="radio" name="a">augists.top
</form>
```
三选一

---

#### check

```html
<form>
  <input type="radio" name="a" checked>augists.top
  <input type="radio" name="a">augists.top
  <input type="radio" name="a">augists.top
</form>
```

---

{% note success %}

<form>
  <input type="radio" name="a" checked>augists.top
  <input type="radio" name="a">augists.top
  <input type="radio" name="a">augists.top
</form>

{% endnote %}

---

### select

```html
<form>
  <select>
    <option>augists.top</option>
    <option>augists.top</option>
    <option>augists.top</option>
    <option>augists.top</option>
  </select>
</form>
```
列表选择

---

{% note success %}

<form>
  <select>
    <option>augists.top</option>
    <option>augists.top</option>
    <option>augists.top</option>
    <option>augists.top</option>
  </select>
</form>

{% endnote %}

---

### datalist

```html
<form>
  <input type="text" list="datalist1">
  <datalist id="datalist1">
    <option>augists.top</option>
    <option>augists.网址</option>
    <option>augists.zdcz</option>
  </datalist>
</form>
```

---

{% note success %}

<form>
  <input type="text" list="datalist1">
  <datalist id="datalist1">
    <option>augists.top</option>
    <option>augists.网址</option>
    <option>augists.zdcz</option>
  </datalist>
</form>

{% endnote %}

---


### type email telephone url

```html
<form>
  <input type="email">
  <input type="tel">
  <input type="url">
</form>
```

---

{% note success %}

<form>
  <input type="email">
  <input type="tel">
  <input type="url">
</form>

{% endnote %}

---

### type date

```html
<form>
  <input type="date">
</form>
```

---

{% note success %}

<form>
  <input type="date">
</form>

{% endnote %}

---

### type color

```html
<form>
  <input type="color">
</form>
```

---

{% note success %}

<form>
  <input type="color">
</form>

{% endnote %}

---

### type search

```html
<form>
  <input type="search">
</form>
```

---

{% note success %}

<form>
  <input type="search">
</form>

{% endnote %}

---

### type hidden

```html
<form>
  <input type="hidden" value="123">
</form>
```

---

### type image

```html
<form>
  <input type="image" src="augists.jpg">
</form>
```

---

### type file

```html
<form>
  <input type="file">
</form>
```

* `multiple` 一次允许上传一个文件
* `required` 必须上传一个文件 默认

---

## img

```html
<img src="img.png">
```
默认 width="128"
默认自适应大小

---

### alt

```html
<img src="img.png" alt="augists.top">
```
设置图片的备用内容
当图片出问题的时候使用

---

## 分区响应图

### rect

```html
<img src="augists.jpg" usemap="#map1">

<map name="map1">
  <area href="augists.top" shape="rect" coods="38,62,175,200" target="_blank">
  <area>
  <area>
  <area>
  <area>
</map>
```

---

### circle

```html
<img src="augists.jpg" usemap="#map2">
<map name="map2">
  <area href="augists.top" shape="circle" coods="64,64,64" target="_blank">
</map>
```

---

## 嵌入视频

```html
<video src="augists.mp4" height="500px" autoplay></video>
```

---

### controls

```html
<video src="augists.mp4" controls></video>
```

---

### preload

```html
<video src="augists.mp4" controls preload="auto"></video>
```

* auto 自动载入
* none 不载入
* metadata 载入第一帧

---

### loop

```html
<video src="augists.mp4" controls preload="auto" loop></video>
```

---

### poster

```html
<video src="augists.mp4" controls preload="auto" loop poster="augists.jpg"></video>
```
视频载入是显示的图片

---

### mute

```html
<video src="augists.mp4" mute></video>
```

---

### source

```html
<video src="augists.mp4" controls preload="auto" loop poster="augists.jpg">
  <source src="augists.mp4" type="video/mp4">
  <source src="augists.ogv" type="video/ogg">
</video>
```

---

## 嵌入音频

```html
<audio></audio>
```
基本同 video

---

{% note success %}

视频来源
[靠谱学院-星月-html](https://www.bilibili.com/video/BV1ds411r7o7?t=826&p=11)

{% endnote %}

{% endnote %}
