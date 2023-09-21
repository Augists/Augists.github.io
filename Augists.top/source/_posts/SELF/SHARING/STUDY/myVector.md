---
title: meVector
date: 2020-06-28 23:19:57
tags: [CODE]
description: myVector in C++

---

# myVector

## 设计思想

vector其实是更高级的数组，可以自由的进行赋值、存储数据、使用类似迭代器的方式读取数据等。由于本实例中myVector为`int`类，所以迭代器为`int *`型即可。

myVector类中

#### 私有变量

选取了

```c++
private:
	int *array;
	int capacity;
	int size
```

三个，其中array是通过指针指向堆内存的方式存储数据，类似于安全数组。capacity用于存储当前数组的总容量，size为当前已经存储的数据的下一个存储位置的下标。通过size与capacity的比较，可以较为容易的检验当前数组是否有剩余容量来存储下一个push_back的数据的空间。

#### 类的构造函数

```c++
	myVector()
	{
		size = 0;
		capacity = 3;
		array = new int[capacity];
	}
	myVector(int number, int value = 0)
	{
		size = capacity = number;
		array = new int[capacity];
		for (int i = 0; i < number; ++i)
		{
			array[i] = value;
		}
	}
	myVector(const myVector& parent)
	{
		size = parent.size;
		capacity = parent.capacity;
		array = new int[capacity];
		for (int i = 0; i < size; ++i)
		{
			array[i] = parent.array[i];
		}
	}

```

有三种，分别为：

1. 无参数构造：默认开辟3个整形大小的空间，myVector中不存储数据
2. 参数构造：main中传递myVector的大小 (number个int) 和 (value，默认为0) 
3. 拷贝构造：与parent对象存储相同的数据

#### 析构函数

```c++
	~myVector()
	{
		if (array)
		{
			delete[] array;
			array = nullptr;
			size = capacity = NULL;
		}
	}

```

析构函数中先判断array是否为nullptr，然后进行堆内存的析构和变量归零

#### 功能函数

```c++
	void push_back(const int& data)
	{
		if (size >= capacity)
		{
			int *tempArray = array;
			array = new int[capacity * 2];
			for (int i = 0; i < size; ++i)
			{
				array[i] = tempArray[i];
			}
		}
		array[size++] = data;
	}
	int *begin()
	{
		return array;
	}
	int *end()
	{
		return array + size;
	}

```

1. push_back先判断是否有剩余空间留给新数据。若无剩余空间则开辟capacity两倍内存的新数组并进行数据迁移。最后将数据放入myVector中
2. begin返回首地址，end返回当前已经存储的数据的结尾地址

## 代码

```cpp
#include <iostream>
using namespace std;

class myVector {
private:
	int *array;
	int capacity;
	int size;
public:
	myVector()
	{
		size = 0;
		capacity = 3;
		array = new int[capacity];
	}
	myVector(int number, int value = 0)
	{
		size = capacity = number;
		array = new int[capacity];
		for (int i = 0; i < number; ++i)
		{
			array[i] = value;
		}
	}
	myVector(const myVector& parent)
	{
		size = parent.size;
		capacity = parent.capacity;
		array = new int[capacity];
		for (int i = 0; i < size; ++i)
		{
			array[i] = parent.array[i];
		}
	}
	myVector& operator=(const myVector& v)
	{
		if (this != &v)
		{
			size = v.size;
			capacity = v.capacity;
			array = new int[capacity];
			for (int i = 0; i < size; ++i)
			{
				array[i] = v.array[i];
			}
		}
	}
	~myVector()
	{
		if (array)
		{
			delete[] array;
			array = nullptr;
			size = capacity = NULL;
		}
	}
	int& operator[](int index)
	{
		if (index < size)
			return array[index];
		/* else */
		/* { */
		/* 	cout << "Index Error: return NULL" << endl; */
		/* 	return NULL; */
		/* } */
	}
	void push_back(const int& data)
	{
		if (size >= capacity)
		{
			int *tempArray = array;
			array = new int[capacity * 2];
			for (int i = 0; i < size; ++i)
			{
				array[i] = tempArray[i];
			}
		}
		array[size++] = data;
	}
	int *begin()
	{
		return array;
	}
	int *end()
	{
		return array + size;
	}
};


int main()
{
	myVector v;
	v.push_back(1);
	v.push_back(2);
	v.push_back(3);
	v.push_back(4);
	/* myVector::iterator itra; */
	int *itra;
	itra=v.begin();

	while(itra!=v.end())
	{
		cout << * itra << endl;
		itra++;
	}

	return  0;
}
```
