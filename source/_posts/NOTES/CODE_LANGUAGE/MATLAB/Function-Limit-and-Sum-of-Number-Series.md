---
title: Function Limit and Sum of Number Series
date: 2020-06-16 20:46:38
tags: [CODE, MATLAB, NOTE]
description: "Notes of MATLAB Function Limit and Sum of Number Series"

---

{% note warning %}

## 数列极限和函数求和

```matlab
limit(f(x), x, a)			# 当x->a时，f(x)的极限
limit(f(x))					# 当x->0时，f(x)的极限
limit(f(x), x, a, 'left')	# 当x->a-时，f(x)的极限
```

`inf` ∞

## 级数求和

```matlab
symsum(s, v, a, b)			# 表达式s关于变量v从a到b求和
```

{% endnote %}
