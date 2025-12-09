---
title: Time O
date: 2020-05-31 10:39:32
tags: [CODE, C/C++, DATASTRUCTURE]
description: Basic notes of Time O

---

# 时间复杂度O

### 1.线性阶

- - - -

```c

int i;

for (i = 0; i < n; ++i)
	;

```

- - - -

### 2.对数阶

- - - -

```c

int i = 1;

while (i < n)
	i *= 2;

```

- - - -

### 3.平方阶

- - - -

```c

int i, j;

for (i = 0; i < n; ++i)
{
	for (j = 0; j < n; ++j)
		;
}

```

- - - -

```c

int i, j;

for (i = 0; i < n; ++i)
{
	for (j = i; j < n; ++j)
		;
}

```

- - - -

