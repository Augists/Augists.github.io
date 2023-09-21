---
title: GCC Error
date: 2020-06-28 00:00:22
tags: [CODE, C/C++, SUMMERTERM, ERROR]
description: "Today when I use f5 as normal to compile and run c++ code, an error occurred<br>Take a Look of My Error🤣"

---

{% note warning %}

## 缘起

话不多说，先上代码

```cpp
#include <iostream>
#include <map>
#include <algorithm>
using namespace std;

int main(int argc, const char *argv[])
{
	map<string, string> dic = {{"中文", "Chinese"}, {"英文", "English"}, {"汉语", "Chinese"}, {"英语", "English"}};
	/* map<string, string> dic; */
	/* dic["中文"] = "Chinese"; */
	/* dic["英文"] = "English"; */
	/* dic["汉语"] = "Chinese"; */
	/* dic["英语"] = "English"; */
	for (auto x : dic)
		cout << x.first << " " << x.second << endl;

	return 0;
}
```

需要关注的是

第一行的

```cpp
map<string, string> dic = {{"中文", "Chinese"}, {"英文", "English"}, {"汉语", "Chinese"}, {"英语", "English"}};
```

在我直接使用 `<f5>` 编译运行的时候 error 了

![error](https://tva1.sinaimg.cn/large/007S8ZIlly1gg7b3mjzpdj320603kq8s.jpg)

而我使用的 vimrc 中的 `<f5>` 的配置如下

```vimscript
map <F5> :call CompileRunGcc()<CR>
func! CompileRunGcc()
	exec "w"
	if &filetype == 'c'
		exec "!gcc % -o %<"
		exec "!time ./%<"
	elseif &filetype == 'cpp'
		exec "!g++ % -o %<"
		exec "!time ./%<"
endfunc
```

而我也直接在 *Terminal* 里尝试了 `gcc 2.cpp`

依然是同样的报错

## 查阅

这次没有先查阅权威，而是直接搜的问题

最终在一篇[CSDN文章](https://blog.csdn.net/Leo_csdn_/article/details/86589904)上找到了

> 列表初始化适用于c++11和以上的版本，低于11的版本则无法使用

看来确实是因为**C++ 11**标准的问题

## 再次遇到的问题

那么就加个编译选项强制到11以上就行了呗

于是我傻乎乎的这么写的

```bash
gcc -std=c++11 2.cpp
```

然后就得到了一篇非常优秀的 error 文😂

这个东西明显以前也遇到过，当时是通过修改代码然后用 `gcc main.cpp` 重新编译通过的

## 解决方案

这一次我重新去查了 gcc 的编译选项

看到了[这篇文章](https://www.cnblogs.com/Emerald/p/4418766.html)

也就是说，应该这样写

```bash
gcc -std=c11 main.c
g++ -std=c++11 main.cpp
```

当在编译选项中添加了 `-std=` 时，可能就不能再单纯的混用 `gcc` 和 `g++` 了

## 写在最后

编译选项一直都没有特别重视，之前觉得 `gcc` 和 `g++` 可以混用（`clang` 和 `clang++`），而且代码只要能编译运行就可以了，不需要去关注 `-o` 过程文件等等，甚至到 `O2` 优化

以前觉得离我很远的事情，现在成了阻挡

所以，没有什么该不该学，也没有什么应该等到多少年以后再学

把能接触的，能学的都学到，才能更好地应对问题

{% endnote %}
