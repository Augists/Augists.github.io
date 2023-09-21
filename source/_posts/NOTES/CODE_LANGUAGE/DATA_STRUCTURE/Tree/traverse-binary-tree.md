---
title: traverse binary tree
tags: [CODE, NOTE, DATASTRUCTURE, C/C++, TREE]
description: 'Binary Tree Traversal methods on textbook'
date: 2020-11-16 12:25:18

---

{% note warning %}

# 二叉树的遍历

## 广度优先遍历

```cpp
template <class T>
void BinaryTree<T>::levelOrder(BinaryTreeNode<T> *root)
{
	using std::queue;
	queue<BinaryTreeNode<T> *> nodeQueue;
	BinaryTreeNode<T> *pointer = root;
	if (pointer)
		nodeQueue.push(pointer);
	while (!nodeQueue.empty())
	{
		pointer = nodeQueue.front();
		visit(pointer);
		nodeQueue.pop();
		if (pointer->leftChild)
			nodeQueue.push(pointer->leftChild);
		if (pointer->rightChild)
			nodeQueue.push(pointer->rightChild);
	}
}
```

## 深度优先遍历

### 递归算法

```cpp
// preorder
template <class T>
void BinaryTree<T>::preOrder(BinaryTreeNode<T> *root)
{
	if (root != nullptr)
	{
		visit(root);
		preOrder(root->leftChild);
		preOrder(root->rightChild);
	}
}

// inOrder
template <class T>
void BinaryTree<T>::inOrder(BinaryTreeNode<T> *root)
{
	if (root != nullptr)
	{
		inOrder(root->leftChild);
		visit(root);
		inOrder(root->rightChild);
	}
}

// postOrder
template <class T>
void BinaryTree<T>::postOrder(BinaryTreeNode<T> *root)
{
	if (root != nullptr)
	{
		postOrder(root->leftChild);
		postOrder(root->rightChild);
		visit(root);
	}
}
```

### 非递归算法

#### 前序遍历

```cpp
template <class T>
void BinaryTree<T>::PreOrderWithoutRecusion(BinaryTreeNode<T> *root)
{
	using std::stack;
	stack<BinaryTreeNode<T> *> nodeStack;
	BinaryTreeNode<T> *pointer = root;
	while (!nodeStack.empty() || pointer)
	{
		if (pointer)
		{
			visit(pointer);
			if (pointer->rightChild)
				nodeStack.push(pointer->rightChild);
			pointer = pointer->leftChild;
		}
		else
		{
			pointer = nodeStack.top();
			nodeStack.pop();
		}
	}
}
```

#### 中序遍历

```cpp
template <class T
void BinaryTree<T>::InOrderWithoutRecursion(BinaryTreeNode<T> *root)
{
	using std::stack;
	stack<BinaryTreeNode<T> *> nodeStack;
	BinaryTreeNode<T> *pointer = root;
	while (!nodeStack.empty() || pointer)
	{
		if (pointer)
		{
			nodeStack.posh(pointer);
			pointer = pointer->leftChild;
		}
		else
		{
			pointer = nodeStack.top();
			visit(pointer);
			pointer = pointer->rightChild;
			nodeStack.pop();
		}
	}
}
```

#### 后续遍历

template <class T>
void BinaryTree<T>::PostOrderWithoutRecursion(BinaryTreeNode<T> *root)
{
	using std::stack;
	stack<BinaryTreeNode<T> *> nodeStack;
	BinaryTreeNode<T> *pointer = root;
	BinaryTreeNode<T> *pre = root;
	while (pointer)
	{
		while (pointer->leftChild)
		{
			nodeStack.push(pointer);
			pointer = pointer->leftChild;
		}
		while (pointer && (pointer->rightChild) || pointer->rightChild == pre)
		{
			visit(pointer);
			pre = pointer;
			if (nodeStack.empty())
				return;
			pointer = nodeStack.top();
			nodeStack.pop();
		}
		nodeStack.push(pointer);
		pointer = pointer->rightChild;
	}
}

{% endnote %}
