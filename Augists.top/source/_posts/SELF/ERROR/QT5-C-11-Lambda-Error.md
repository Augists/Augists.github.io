---
title: QT5 C++11 Lambda Error
date: 2020-07-10 16:20:08
tags: [QT, C/C++, CODE, SUMMERTERM, ERROR]
description: "An unexpected error of Lambda Expression when using connect in QT5 C++11"

---

{% note warning %}

# QT Lambda 表达式在 connect 时 error

依旧在这个折磨人的小学期

第一次接触到 **Lambda** 表达式，以及它在 QT 的 `connect` 函数中的运用

但是当自己写的时候，却发现不是那回事

## 我的情况

我在将一个 button 连接，但是我希望只有在 button 点击的时候，才在相应的位置上 new
这样我就可以只定义二维指针数组，而不需要立即为他们分配内存

在 h 文件中，有他们的二维指针数组

```cpp
class Gmae : public QWidget
{
	...
private:
	QPushButton *mapButton[12][7];

	Tower *tower[12][7];
};
```

在 cpp 中，`mapButton` 已经 `new` 过了

```cpp
// j, i 是因为 ij 是二维数组式的行列下标，而 QT 中为 xy
connect(mapButton[j][i], SIGNAL(click(bool)), [=]()
{
	tower[j][i] = new Tower(this);
});
```

然后就 error 了😭，会告诉你没有合适的 **candidate**

## 问题原因

出现这个问题，根据我的最终解决方案和推测，是这样的

QT 从 5 开始，才支持 C++11 的 **Lambda** 表达式，而同时，QT5 对 `connect` 稍有修改

由原来的

```qt
connect(*sender, SIGNAL(senderSignal()), *receiver, SLOT(receiverSlot()));
```

修改为了

```cpp
connect(*sender, &SenderClass::signal, *receiver, &ReceiverClass::slot);
```

但是同时，兼容旧版的 `connect` 函数

但是 `Lambda` 表达式的 `connect` 函数并不支持旧版

当参数中用了 `Lambda` 表达式，会自动以 5 之后的标准看待这个 `connect` 函数

## 解决

所以解决方案也很简单

```cpp
connect(mapButton[j][i], &QPushButton::click, [=]()
{
	tower[j][i] = new Tower(this);
});
```

我觉得对于这个问题，与下一篇的 `#pragma once` 放在一起看，会对新旧标注以及兼容性有一点自己的想法吧

{% endnote %}
