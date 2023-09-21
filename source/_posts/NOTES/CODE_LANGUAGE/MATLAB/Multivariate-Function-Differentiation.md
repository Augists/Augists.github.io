---
title: Multivariate Function Differentiation
date: 2020-06-16 22:40:10
tags: [CODE, MATLAB, NOTE]
description: "Notes of MATLAB<br>Multivariate Function Differentiation"

---

{% note warning %}

## 多元函数的微分

### diff

1. 求函数f(x, y)关于x的导数

```matlab
syms x y
diff(f(x, y), x)
```

2. 求函数f(x, y)关于x的n阶导数

```matlab
diff(f(x, y), x, n)
```


3. 求函数f(x, y)关于x和y的2阶混合偏导数

```matlab
diff(f(x, y), x, y)
```

4. 求函数f(x, y)的全微分

```matlab
syms dx dy
dz = diff(f(x, y), x) * dx + diff(f(x, y), y) * dy
```

{% endnote %}
