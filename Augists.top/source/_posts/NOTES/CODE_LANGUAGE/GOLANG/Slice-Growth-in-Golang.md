---
title: Slice Growth in Golang
tags: [NOTE, GOLANG]
description: 'A Question while reading the book *Go Programming Language*'
date: 2021-11-21 23:45:42

---

{% note warning %}

前两天在看《GO程序设计语言》的关于 Slice 的代码的时候产生了一个疑问，书里的代码如下

```go
// gopl.io/ch4/append
func appendInt(x []int, y int) []int {
  var z []int
  zlen := len(x) + 1
  if zlen <= cap(x) {
    z = x[:zlen]
  } else {
    zcap := zlen
    if zcap < 2*len(x) {
      zcap = 2 * len(x)
    }
    z = make([]int, zlen, zcap)
    copy(z, x)
  }
  z[len(x)] = y
  return z
}
```

这是一个当对切片使用 append 添加时进行判断是否需要扩容的操作，尽管这是书中的代码，但是它可能和源码稍有差别
我从网上查询到的源码如下

```go
func growslice(et *_type, old slice, cap int) slice {
    // ……
    newcap := old.cap
    doublecap := newcap + newcap
    if cap > doublecap {
        newcap = cap
    } else {
        if old.len < 1024 {
            newcap = doublecap
        } else {
            for newcap < cap {
                newcap += newcap / 4
            }
        }
    }
    // ……
    //内存对齐操作
    capmem = roundupsize(uintptr(newcap) * ptrSize)
    newcap = int(capmem / ptrSize)
}
```

一开始我在想，为什么它需要去判断一下 `zcap < 2*len(x)`，而不是直接赋值呢
其实当时想的时候漏掉了 `len(x) == 0` 的情况
如果 `len(x)` 为大于等于 1 的正整数时，无论如何 `zcap <= 2*len(x)`
如果 `len(x)` 为 0 时，就需要让新的容量等于 `zcap == zlen == len(x) + 1 == 1`

那么此时就会产生两个问题：
1. 为什么不直接采用 `zcap = 2*len(x) + 1`，如此省去判断步骤
2. 为什么不直接判断是否 `len(x) == 0`，而是判断 `zcap < 2*len(x)`

对于第一个问题，这涉及到内存对齐操作。尽管在以前的 C Family 语言学习和计算机组成原理课程中学习过，但是并没有迁移到 Go 这里来思考问题
这里推荐我看到的一篇[文章](https://www.jianshu.com/p/f035a22e094d)，我通过这篇重新学习了 Go 语言中的内存对齐

对于第二个问题，我到现在也没有 get 到原因。按理说这本书是由创始人编写的，依照在《C程序设计语言》中的严谨程度，这里应该会有什么特别的用意。但是我想如果只判断 `len(x) == 0` 在操作及时间上都要好于书中的示例代码。此处仍然留有疑问

{% endnote %}
