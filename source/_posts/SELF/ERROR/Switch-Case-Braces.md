---
title: Switch Case Braces
date: 2020-07-17 21:27:32
tags: [CODE, C/C++, SUMMERTERM, ERROR]
description: An error broke my way compiling my code, about braces in switch case statement

---

{% note warning %}

## 错误情况举例

这东西一开始以为是 QT 的问题，后来发现好像是从 C 开始就这样了，之前只是没遇到过
这里用 C++ 作举例

```cpp
#include <iostream>
using namespace std;

int main(void)
{
	int i = 0;
	int j = 4;
	switch (i)
	{
		case 0:
			int temp = i;
			i = j;
			j = temp;
			break;
		case 1:
			int temp = j;
			j = i;
			i = temp;
			break;
		default:
			break;
	}
	cout << i << j << endl;

	return 0;
}
```

然后我们来看看报错

```bash
$ g++ -std=c++2a temp.cpp
temp.cpp:27:8: error: redefinition of 'temp'
                        int temp = j;
                            ^
temp.cpp:22:8: note: previous definition is here
                        int temp = i;
                            ^
temp.cpp:31:3: error: cannot jump from switch statement to this case label
                default:
                ^
temp.cpp:22:8: note: jump bypasses variable initialization
                        int temp = i;
                            ^
temp.cpp:26:3: error: cannot jump from switch statement to this case label
                case 1:
                ^
temp.cpp:22:8: note: jump bypasses variable initialization
                        int temp = i;
                            ^
3 errors generated.
```

报错指向了从 `case 1:` 开始的下一行（ vim 插件报错从 `case 1:` 开始
主要错误为第一个，重定义了 `temp`

## 错误原因

这个错误的原因其实在于
`switch case` 内变量的生存期

我们知道，C和C++ 都把大括号作为栈内存变量生存期的重要依据
也就是说，普通的局部变量的生存期是在碰到右大括号的时候自动结束的
而 `switch case` 有一个特点，可以不加大括号
但是，两个其实是有区别的
不加大括号的 `switch case` 内变量的生存期延伸到 `switch` 的右大括号结束
而上面的例子中，`case 0:` 的 `int temp` 生存期一直覆盖了 `case 1` 内
这就会导致重定义的问题

## 解决方案

```cpp
#include <iostream>
using namespace std;

int main(void)
{
	int i = 0;
	int j = 4;
	switch (i)
	{
		case 0:
		{
			int temp = i;
			i = j;
			j = temp;
			break;
		}
		case 1:
		{
			int temp = j;
			j = i;
			i = temp;
			break;
		}
		default:
			break;
	}
	cout << i << j << endl;

	return 0;
}

```

加上大括号就意味着每个 `case` 里的 `temp` 的生存期只在当前的 `case` 里了

{% endnote %}
