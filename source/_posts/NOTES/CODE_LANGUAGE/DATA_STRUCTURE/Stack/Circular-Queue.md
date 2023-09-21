---
title: Circular Queue
date: 2020-05-31 10:39:32
tags: [CODE, C/C++, DATASTRUCTURE]
description: Curcular Queue in c language

---

# 循环队列

### 结构代码

```c

typedef int QElemType;

typedef struct
{
	QElemType data[MAXSIZE];
	int *front;
	int *rear;
} SqQueue;

```

### 初始化代码

```c

Status InitQueue(SqQueue *Q)
{
	Q->front = NULL;
	Q->rear = NULL:
	
	return OK;
}

```

### 循环队列求队列长度

```c

int QueueLength(SqQueue Q)
{
	return (Q.rear - Q.front + MAXSIZE) % MAXSIZE;
}

```

### 循环队列入队列

```c

Status EnQueue(SqQueue *Q, QElemType e)
{
	if ((Q->rear + 1) % MAXSIZE == Q->front)
		return ERROR;
	Q->data[Q->rear] = e;
	Q->rear = (Q->rear + 1) % MAXSIZE;

	return OK;
}

```

### 循环队列出队列

```c

Status DeQueue(SqQueue *Q, QElemType *e)
{
	if (Q->front == Q->rear)
		return ERROR;
	*e = Q->data[Q->front];
	Q->front = (Q->front + 1) % MAXSIZE;

	return OK;
}

```
