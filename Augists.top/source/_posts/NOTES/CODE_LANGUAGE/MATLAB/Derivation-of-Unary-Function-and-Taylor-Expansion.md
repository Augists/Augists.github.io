---
title: Derivation of Unary Function and Taylor Expansion
date: 2020-06-16 21:33:43
tags:
  - CODE
  - MATLAB
  - NOTE
description: "Note of MATLAB<br>Derivation of Unary Function and Taylor Expansion"

---

{% note warning %}

## 函数求导

### 求f(x)关于x的导数

```matlab
syms x
diff(f(x), x)
```

### 求f(x)关于x的n次导数

```matlab
diff(f(x), x, n)
```

### 参数方程的求导

```matlab
ys = diff(y, t) / diff(x, t)
```

### 隐函数的求导

F(x, y) = 0

```matlab
ys = - diff(F, x) / diff(F, y)
```

## 泰勒展式

x在x0处的n阶泰勒展开式

```matlab
syms x
taylor(f(x), x, x0, 'Order', n+1)
```

默认为5阶

```matlab
taylor(f)		# 在x = 0处的5阶泰勒展开
taylor(f, x, a)	# 在x = a处的5阶泰勒展开
```

{% endnote %}
