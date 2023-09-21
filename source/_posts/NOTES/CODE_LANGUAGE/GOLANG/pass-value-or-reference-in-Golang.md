---
title: pass value or reference in Golang
tags: [NOTE, GOLANG]
description: 'A discussion about passing to function in Golang origin from `res = append(res, r)`'
date: 2022-04-19 13:35:35
---

{% note warning %}

昨天在写 LeetCode 39 的时候，遇到了一个奇怪的问题，会自动让我的 `res` 在返回的时候发生变化
按照意思简单复原一下部分代码

```go
package main

import "fmt"

var res [][]int
var r []int

func main() {
	res = [][]int{}
	r = []int{}
	solve(5)
	fmt.Println(res)
}

func solve(i int) {
	if i == 0 {
		return
	}
	r = append(r, i)
	r[0] = i
	res = append(res, r)
	solve(i - 1)
	r = r[:len(r)-1]
}
```

可以看到，最终输出的 `res` 里变量非常奇怪
这个情况主要由于 Golang 中的切片以及在函数参数传递的过程中发生的浅拷贝

## Slice

我们可以把切片理解为一个结构体

```go
type Slice struct {
  data  uintptr
  len   int
  cap   int
}
```

切片的浅拷贝是指，当它在赋值时，相当于创建了新的副本，结构体中的三个变量的值进行了复制。也就是说，虽然指向的是同一个 data 地址，并且 len 和 cap 都相同，但是从二级指针的角度来看，是一个新的变量了
而 append 虽然它直接被写成了汇编，但是它的实现是在切片存储的数据小于 1024 时进行 cap 翻倍，在大于时扩容到 1.25 倍。如果发生了切片的扩容，就会返回一个新开辟的内存空间用来存放数据；否则就会返回原地址

## Pass

对于 Golang 的函数传参是传值还是传引用一直都有争议。有人把变量分成了值类型和引用类型。但是实际上，通过上面对于 Slice 的拷贝可以看到，Golang 对于函数传参一直都是传值。但是值得注意的是，虽然在不发生扩容的情况下在函数中修改切片的内容会反馈到原切片（由于 data 指针），但是切片的 len 和 cap 都是在函数中创建了新的拷贝
也就是说，如果有如下代码

```go
func myAppend(nums []int) {
  nums = append(nums, 1)
}

func main() {
  nums := make([]int, 3, 5)
  myAppend(nums)
}
```

在这个例子中，尽管在 `myAppend` 中对于 nums 添加 1 成功反馈给了 `main` 中的 nums，但是由于 `main` 中 nums 的 len 仍为 3，所以如果这时输出 nums，会发现似乎对它并没有任何反馈的影响

---

回到开头的例子。由于 res 可以看作二级指针，而 r 可以看作一级指针，这就导致对 r 仍然在 len 中的元素的修改会影响到最终的 res 的结果，而若由于 append 发生了扩容，后续就会使用新的切片地址，就不会对原切片产生影响

{% endnote %}
