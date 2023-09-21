---
title: Multivariate Function Integration
date: 2020-06-16 22:43:00
tags: [CODE, MATLAB, NOTE]
description: "Notes of MATLAB<br>Multivariate Function Integration"

---

{% note warning %}

## 多元函数积分学

### 二重积分的计算

#### int函数

```matlab
int(int(f, y, y1(x), y2(x)), x, a, b)
```

### 三重积分的计算

```matlab
int(int(int(f, z, z1(x, y), z2(x, y)), y, y1(x), y2(x)), x, a, b)
```

### 第一型曲线积分

![第一型曲线积分](https://tva1.sinaimg.cn/large/007S8ZIlly1gfvmd0i0okj30la06nq4u.jpg)

### 第一型曲面积分

![第一型曲面积分](https://tva1.sinaimg.cn/large/007S8ZIlly1gfvmeh8ej1j30k4078myw.jpg)


{% endnote %}
