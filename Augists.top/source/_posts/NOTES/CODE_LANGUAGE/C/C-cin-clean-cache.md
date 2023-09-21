---
title: C++ cin clean cache
date: 2020-07-11 19:19:46
tags: [C/C++, NOTE]
description: C++ cin by idealclover
author: 翠翠 idealclover

---

{% note warning %}

{% note danger %}

本文转载自 [https://idealclover.top/archives/338/](https://idealclover.top/archives/338/)
原作者为  **翠翠 idealclover**
内容仅作格式修改

{% endnote %}

# C++ cin 清理缓冲区

C++ 在用 cin 做输入的时候，尤其是需要输入 int 型值的时候，往往需要做验证与处理。而对于异常值，则需要先清理缓冲区，再准备下一次输入。 
对于清理缓冲区，中文世界的方法有一下几种（或者混着用）：

```cpp
cin.clear();
cin.ignore();
cin.sync();
fflush(stdin);
```

但是这几种方法都各有各的缺点，不是会造成重复输出错误信息，就是会造成不断的死循环。真正理想的解决方案，**StackOverflow** 上给了很好的解答。
那就是混合使用

`cin.ignore (INT_MAX, 'n')` 和 `cin.clear (). cin.clear ()`

负责将置位置回，所有没有此步的解决方案都会陷入到 `cin.fail ()` 的死循环中；

`cin.ignore ('INT_MAX','n')` 负责将用户所一次性输入的多个字符全部舍弃，缺少第 0 个参数会使得错误信息持续输出（如果输入 qwer 则会输出四遍错误信息），缺少第 1 个参数则会忽略用户之后输入的全部信息（即使输对也没有反应)

示例代码如下：

```cpp
while(true)
{
	cin >> cmd;
	if (cin.fail() || cmd < 0 || cmd > FUNC_NUM)
	{
		cin.clear();
		cin.ignore(INT_MAX,'\n');
		cout << "不合法的输入，请重新输入: ";
		continue;
	}
	else
		break;
}
```

## 参考资料

[https://stackoverflow.com/questions/257091/how-do-i-flush-the-cin-buffer](https://stackoverflow.com/questions/257091/how-do-i-flush-the-cin-buffer)

{% endnote %}
