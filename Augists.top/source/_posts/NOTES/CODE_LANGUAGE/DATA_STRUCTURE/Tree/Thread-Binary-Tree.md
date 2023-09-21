---
title: Thread Binary Tree
tags: [CODE, NOTE, DATASTRUCTURE, C/C++, TREE]
description: 'code of Thread Binary Tree'
date: 2020-11-16 18:43:27

---

{% note warning %}

## 线索二叉树的结点类
```cpp
template <class T>
class ThreadBinaryTreeNode
{
	friend class ThreadBinaryTree<T>;
private:
	int leftTag, rightTag;
	ThreadBinaryTreeNode<T> *leftChild;
	ThreadBinaryTreeNode<T> *rightChild;
	T element;
public:
	ThreadBinaryTreeNode();
	ThreadBinaryTreeNode(const T &ele);
	ThreadBinaryTreeNode(const T &ele, ThreadBinaryTreeNode<T> *l, ThreadBinaryTreeNode<T> *r);
	ThreadBinaryTreeNode<T> *getLeftChild() const;
	ThreadBinaryTreeNode<T> *getRightChild() const;
	void setLeftChild(ThreadBinaryTreeNode<T> *l);
	void setRightChild(ThreadBinaryTreeNode<T> *r);
	T getValue() const;
	void setValue(const T &val);
};
```

## 线索二叉树类

```cpp
template <class T>
class ThreadBinaryTree
{
private:
	ThreadBinaryTreeNode<T> *root;
public:
	ThreadBinaryTree();
	ThreadBinaryTree(ThreadBinaryTreeNode<T> *r);
	~ThreadBinaryTree();
	ThreadBinaryTreeNode<T> *getRoot();
	void InThread(ThreadBinaryTreeNode<T> *root, ThreadBinaryTreeNode<T> *pre);
	void InOrder(ThreadBinaryTreeNode<T> *root);
};
```

## 中序线索化二叉树

```cpp
template <class T>
void ThreadBinaryTree<T>::InThread(ThreadBinaryTreeNode<T> *root, ThreadBinaryTreeNode<T> *pre)
{
	ThreadBinaryTreeNode<T> *current;
	current = root;
	if (current)
	{
		InThread(current->leftChild, pre);
		if (!current->leftChild)
		{
			current->leftChild = pre;
			current->leftTag = 1;
		}
		if ((pre) && (!pre->rightChild))
		{
			pre->rightChild = root;
			pre->rightTag = 1;
		}
		pre = current;
		InThread(current->rightChild, pre);
	}
}
```

## 中序遍历线索二叉树

```cpp
template <class T>
void ThreadBinaryTree<T>::InOrder(ThreadBinaryTreeNode<T> *root)
{
	ThreadBinaryTreeNode<T> *current;
	current = root;
	while (!current->leftTag)
		current = current->leftChild;
	while (current)
	{
		visit(current);
		if (current->rightTag)
			current = current->rightChild;
		else
		{
			current = current->rightChild;
			while (current && !current->leftTag)
				current = current->leftChild;
		}
	}
}
```

{% endnote %}
