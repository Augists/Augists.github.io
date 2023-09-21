---
title: 'bit operation: average of two integer'
tags: [C/C++, NOTE]
description: 'Network Protocol Stack Notes'
date: 2021-11-12 12:59:34

---

{% note warning %}

如何求两个整数的平均值？

问题看起来简单，如果用代码实现起来却有很多值得研究的地方。

下面我们使用Java代码来实现。

## 普通实现1

求两个整数的平均值，最简单的实现方法就是两个数相加再除以二。

```java
private static int mean(int x, int y) {
  return (x + y) / 2;
}
```

但是, 如果传入的是两个整数都是`Integer.MAX_VALUE`， 下面的断言就过不了。

```java
Assert.assertEquals(Integer.MAX_VALUE, 
    mean(Integer.MAX_VALUE, Integer.MAX_VALUE));
```

我们期望的结果是`Integer.MAX_VALUE`，但是实际上返回的结果却是-1。因为 `Integer.MAX_VALUE + Integer.MAX_VALUE = -2`， 结果已经溢出了。

```
java.lang.AssertionError: 
Expected :2147483647
Actual   :-1
```

## 普通实现2

如果我们使用无符号的右移运算符。

```java
private static int mean1(int x, int y) {
  return (x + y) >>> 1;
}
```

这样虽然可以得到我们想要的结果`Integer.MAX_VALUE`, 但是却是不支持负数。


比如我们求-9和-3的平均值,

```java
Assert.assertEquals(-6, mean1(-9, -34));
```

期望返回的结果是-6,但是实际上却返回了2147483642

```java
java.lang.AssertionError: 
Expected :-6
Actual   :2147483642
```

## 普通实现3

那么如果我们不把两个整数直接相加, 而是分别除以2再相加, 是不是就不会溢出了呢?

```java
private static int mean3(int x, int y) {
  return (x >> 1) + (y >> 1);
}
```

这样实现的话, 确实是不会溢出了，但是精度也丢失了。

```java
java.lang.AssertionError: 
Expected :2147483647
Actual   :2147483646
```

那么有没有一种实现方式, 既不会溢出,又可以同时支持正负整数呢?

答案是不止一种!

## 位运算实现1

我们来看看Google的guava工具类是怎么实现的

```java
/**
 * IntMath#mean
 * @link https://github.com/google/guava/blob/master/guava/src/com/google/common/math/IntMath.java
 */
// 小数 向下取整
private static int meanRoundDown(int x, int y) {
  return (x & y) + ((x ^ y) >> 1);
}
```

我们可以通过集合来理解上面的代码。


比如我们求整数9和3的平均值。

9的二进制是1001, 3的二进制是0011,

那么这两个数的交集就是`9&3=0001`,

差集就是1010。`0001+(1010>>1)`结果就是6。

我们都知道二进制数字都是一串0和1，那么可以把整数x和y都看作是一个有很多不同的0和1组成的集合。


那么`x & y`就表示两个集合的交集, 因为`1&1=1`；

`x ^ y`得到的就是两个集合的差集, 因为`1^1=0`,`1^0=1`；

交集加上差集的一半, 就得到了两个数的二进制平均值。

## 位运算实现2

下面我们来看看用位运算的第二种实现方式

```java
// 小数 向上取整
private static int meanRoundUp(int x, int y) {
  return (x | y) - ((x ^ y) >> 1);
}
```

这段代码怎么理解呢？

`x | y` 得到的就是两个集合的去重并集。

并集减去差集的一半，就得到了两个数的二进制平均值。


## 两种方式的区别

如果两个整数的平均值是小数时，

第一种方式是向下取整；

第二种方式是向上取整。

比如我们求整数9和4的平均值，这两个数的平均值应该是6.5，向上取整就是7，向下取值就是6。

```java
Assert.assertEquals(6, meanRoundDown(9, 4)); // 6
Assert.assertEquals(7, meanRoundUp(9, 4)); // 7
```

## 题外话

上面探讨的只是求两个整数的平均值, 那么求多个整数的平均值又有哪些值得参考的实现方式呢?

同样我们来看看Google的guava工具类是怎么实现的。

```java
/**
   * Stats#meanOf
   * @link https://github.com/google/guava/blob/master/guava/src/com/google/common/math/Stats.java
   * 
   * Returns the <a href="http://en.wikipedia.org/wiki/Arithmetic_mean">arithmetic mean</a> of the
   * values. The count must be non-zero.
   *
   * <p>The definition of the mean is the same as {@link Stats#mean}.
   *
   * @param values a series of values
   * @throws IllegalArgumentException if the dataset is empty
   */
public static double meanOf(int... values) {
  checkArgument(values.length > 0);
  double mean = values[0];
  for (int index = 1; index < values.length; index++) {
    double value = values[index];
    if (isFinite(value) && isFinite(mean)) {
      // Art of Computer Programming vol. 2, Knuth, 4.2.2, (15)
      mean += (value - mean) / (index + 1);
    } else {
      mean = calculateNewMeanNonFinite(mean, value);
    }
  }
  return mean;
}
```

请注意这句注释:

```java
Art of Computer Programming vol. 2, Knuth, 4.2.2, (15)
```

Guava的实现是参考了高德纳老爷子的经典之作《计算机编程的艺术》, 这套书规划有 7 卷, 目前已经出版了 4 卷。


比尔盖茨给出的评价是：“如果你能读完此书，你绝对得给我发份简历。”

> 速记卡
>
> 求两个整数的平均值
> `(x & y) + ((x ^ y) >> 1)`向下取整；
> `(x | y) - ((x ^ y) >> 1)`向上取整；

{% endnote %}
