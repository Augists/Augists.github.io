---
title: Binary Tree
tags: [CODE, NOTE, DATASTRUCTURE, C/C++, TREE]
description: 'Binary Tree disgusts me<br>Here is a reference of it and my code for submission'
date: 2020-11-11 17:03:45

---

{% note warning %}

今天写二叉树快写吐了，要写递归和非递归的版本
不是很明白为什么二叉树要非递归
老师上课说，递归其实时间特别长
好吧，反正上课一顿骚操作愣是看懵了
最后是参考的腾讯云上的[这篇文章](https://cloud.tencent.com/developer/article/1176915)看了个大概

最终代码如下
```cpp
#include <iostream>
#include <queue>
#include <stack>
using namespace std;

typedef int DataType;

class BinaryTree
{
public:
	DataType data;
	BinaryTree *leftChild;
	BinaryTree *rightChild;
	BinaryTree()
	{
		leftChild = nullptr;
		rightChild = nullptr;
	}
	BinaryTree(DataType e)
	{
		data = e;
		leftChild = nullptr;
		rightChild = nullptr;
	}
};

class BT
{
private:
	BinaryTree *root;
public:
	BT()
	{
		root = nullptr;
		create();

		// pre visit
		cout << "===============================" << endl;
		preOrderNonRecursive();
		cout << "preOrderRecursive" << endl;
		preOrderRecursive(root);

		// index visit
		cout << "===============================" << endl;
		indexOrderNonRecursive();
		cout << "indexOrderRecursive" << endl;
		indexOrderRecursive(root);

		// post visit
		cout << "===============================" << endl;
		postOrderNonRecursive();
		cout << "postOrderRecursive" << endl;
		postOrderRecursive(root);

		// bf
		cout << "===============================" << endl;
		cout << "bf" << endl;
		bf();
	}
	BinaryTree* create();

	void preOrderNonRecursive();
	void preOrderRecursive(BinaryTree *p);
	void indexOrderNonRecursive();
	void indexOrderRecursive(BinaryTree *p);
	void postOrderNonRecursive();
	void postOrderRecursive(BinaryTree *p);

	void bf();
};

BinaryTree* BT::create()
{
	int data;
	cout << "data: ";
	cin >> data;
	if (data < 0)
	{
		cout << "minux error" << endl;
		return nullptr;
	}
	if (!root)
	{
		root = new BinaryTree(data);
		root->leftChild = create();
		root->rightChild = create();
		return root;
	}
	else
	{
		BinaryTree *p = new BinaryTree(data);
		p->leftChild = create();
		p->rightChild = create();
		return p;
	}
}

void BT::preOrderNonRecursive()
{
	cout << "preOrderNonRecursive" << endl;
	if (!root)
	{
		cout << "empty tree" << endl;
		return;
	}
	stack<BinaryTree *> preStack;
	preStack.push(root);
	BinaryTree *cur = nullptr;
	while (!preStack.empty())
	{
		cur = preStack.top();
		cout << cur->data << endl;
		preStack.pop();
		if (cur->rightChild)	// left output first so push right first
		{
			preStack.push(cur->rightChild);
		}
		if (cur->leftChild)
		{
			preStack.push(cur->leftChild);
		}
	}
}

void BT::preOrderRecursive(BinaryTree *p)
{
	if (!root)
	{
		cout << "empty tree" << endl;
	}
	else if (!p)
	{
		return;
	}
	else
	{
		cout << p->data << endl;
		preOrderRecursive(p->leftChild);
		preOrderRecursive(p->rightChild);
	}
}

void BT::indexOrderNonRecursive()
{
	cout << "indexOrderNonRecursive" << endl;
	if (!root)
	{
		cout << "empty tree" << endl;
		return;
	}
	stack<BinaryTree *> indexStack;
	BinaryTree *cur = root;
	while (!indexStack.empty() || cur)
	{
		while (cur)
		{
			indexStack.push(cur);
			cur = cur->leftChild;
		}
		cur = indexStack.top();
		cout << cur->data << endl;
		indexStack.pop();
		cur = cur->rightChild;
	}
}

void BT::indexOrderRecursive(BinaryTree *p)
{
	if (!root)
	{
		cout << "empty tree" << endl;
	}
	else if (!p)
	{
		return;
	}
	else
	{
		indexOrderRecursive(p->leftChild);
		cout << p->data << endl;
		indexOrderRecursive(p->rightChild);
	}
}

void BT::postOrderNonRecursive()
{
	cout << "postOrderNonRecursive" << endl;
	if (!root)
	{
		cout << "empty tree" << endl;
		return;
	}
	stack<BinaryTree *> postStack;
	BinaryTree *cur, *pre = nullptr;
	postStack.push(root);
	while (!postStack.empty())
	{
		cur = postStack.top();
		if ((!cur->leftChild && !cur->rightChild) || (pre && (pre == cur->leftChild || pre == cur->rightChild)))
		{
			cout << cur->data << endl;
			postStack.pop();
			pre = cur;
		}
		else
		{
			if (cur->rightChild)
				postStack.push(cur->rightChild);
			if (cur->leftChild)
				postStack.push(cur->leftChild);
		}
	}
}

void BT::postOrderRecursive(BinaryTree *p)
{
	if (!root)
	{
		cout << "empty tree" << endl;
	}
	else if (!p)
	{
		return;
	}
	else
	{
		postOrderRecursive(p->leftChild);
		postOrderRecursive(p->rightChild);
		cout << p->data << endl;
	}
}

void BT::bf()
{
	if (!root)
	{
		cout << "empty tree" << endl;
		return;
	}
	queue<BinaryTree *> bfQ;
	bfQ.push(root);
	while (!bfQ.empty())
	{
		BinaryTree *cur = bfQ.front();
		cout << cur->data << endl;
		bfQ.pop();
		if (cur->leftChild)
			bfQ.push(cur->leftChild);
		if (cur->rightChild)
			bfQ.push(cur->rightChild);
	}
}

int main(int argc, const char *argv[])
{
	BT bt;

	return 0;
}
```

{% endnote %}
