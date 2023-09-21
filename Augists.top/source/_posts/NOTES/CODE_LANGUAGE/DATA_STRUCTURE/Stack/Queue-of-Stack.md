---
title: Queue of Stack
date: 2020-05-31 10:47:54
tags: [CODE, C/C++, DATASTRUCTURE]
description: Queue in c language

---

# 链队列

### 链队列结构

```c

typedef int QElemType;

typedef struct QNode
{
	QElemType data;
	struct QNode *next;
} QNode, *QueuePtr;

typedef struct
{
	QueuePtr front, rear;
} LinkQueue;

```

### 入队操作

```c

Status EnQueue(LinkQueue *Q, QElemType e)
{
	QueuePtr s = (QueuePtr)malloc(sizeof(QNode));
	if (!s)
		exit(OVERFLOW);
	s->data = e;
	s->next = NULL;
	Q->rear->next = s;
	Q->rear = s;

	return OK;
}

```

### 出队操作

```c

Status DeQueue(LinkQueue *Q, QElemType *e)
{
	QueuePtr p;
	if (Q->front == Q->rear)
		return ERROR;
	p = Q->front->next;
	*e = p->data;
	Q->front->next = p->next;
	if (Q->rear == p)
		Q->rear = Q->front;
	free(p);

	return OK;
}

```
