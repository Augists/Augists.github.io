---
title: C++ allocation of incomplete type 'T'
tags: [CODE, ERROR, NOTE, C/C++]
description: 'I was working on my extra Principle of Computer Organization homework, simulating CPU bus<br>when I got an error of allocation of incomplete type'
date: 2020-12-17 01:53:39

---

{% note warning %}

刚才在做机组作业，用 C++ 模拟仿真面向存储器的双总线结构
然后得到了这个报错
`allocation of incomplete type`

简单复原一下刚才 bug 的场景

```cpp
class CPU;
class Memory;
class I_O;

class Bus
{
private:
	CPU *b_cpu;
	Memory *b_memory;
	I_O *b_io[IO_MAX_NUMBER];
public:
	Bus(CPU *cpu)
	{
		b_cpu = new CPU(cpu);
		// ...
	}
	// ...
};

class CPU
{
public:
	CPU(CPU *cpu)
	{
	}
	// ...
};
```

编译使用 `g++ -std=c++2a`
然后就得到 `allocation of incomplete type CPU` 的报错啦

然后我尝试写成 `b_cpu = new CPU;`，还是报错

觉得还挺奇怪的，然后就 google 了一下
*stack overflow* 上人家的错误是因为 *header* 里没写 `template`
别的说的感觉也和我的没啥关系

最后解决是把 Bus 类从前面放到了三个类的最后 😔
自己推测可能是前面只声明了三个类，但是类中的方法并没有声明定义，所以不能在 Bus 类中 new 另外三个类
确实以前这么写的时候也没有需要 new 过

{% endnote %}
