---
title: Software Development Process
date: 2020-06-28 17:11:17
tags: [NOTE, SUMMERTERM]
description: Note of Summer Term Class

---

{% note warning %}

# 软件开发

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gg84hvdwkcj30jv0fqgsz.jpg)

## 软件开发基本流程

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gg84n74muvj30hs0e4dlv.jpg)

### 软件开发过程概述

* 需求分析阶段
* 设计阶段
* 编码和调试阶段
* 软件测试阶段

> 系统定义阶段是用户对开发的软件产品的概念描述，其输出是用户给出软件产品的开发任务书。严格来讲不属于开发范畴

#### 需求分析阶段

对要解决的问题进行详细的分析，弄清楚问题的要求，包括需要输入什么数据，要得到什么结果，最后应输出什么。**需求分析**就是确定**软件要为用户做什么**

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gg84rd24wdj30a807swg1.jpg)

#### 设计阶段

**设计**要解决**怎么做（好）**

##### 嵌入式软件设计主要包括四方面的内容：

* 体系结构设计
* 模块设计
* 数据结构与算法设计
* 用户界面设计

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gg84zu8e5cj30c60a8412.jpg)

##### 从工程管理角度看，软件设计可分为：

* 系统设计
* 概要设计
* 详细设计

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gg8514y5uyj30jx09y0zc.jpg)

##### 选定
* 硬件平台选定
	- 开发环境选定
	- 开发平台选定
* 软件平台选定
	- 从以下角度考量：
		1. 应用领域
		2. 实时性
		3. 微处理器支持
		4. 功能性
		5. 成本
		6. 资源占用情况

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gg853z3t3jj30db09uq4f.jpg)

{% note success %}

###### 系统结构
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gg85992kohj30bt08htb3.jpg)

{% endnote %}

#### 编码和调试阶段

代码编制、编译和链接、调试等

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gg85h9rxqnj30gz0btn23.jpg)

#### 软件测试阶段

一般软件开发过程中的测试工作要占整个开发工作量的一半以上

##### 测试方法

* 白盒测试
* 黑盒测试
* 路径测试
* 覆盖测试
* 等

##### 嵌入式系统软件的测试

* 可靠性测试
* 实时性测试
* 并发性测试
* 资源占用情况测试

## 软件开发组织管理

### 从软件的生命周期来看，软件工程涉及

* 软件产品定义
* 需求分析
* 软件设计
* 软件编码
* 测试验证
* 相关评审和管理

### 常见的软件开发模型

* 瀑布模型（线性模型）
* 增量模型
* 迭代（进化）模型
* V模型
* 快速原型模型

#### 瀑布模型（线性模型）

最早、最基本，提供基本框架

##### 流程

1. 软件计划（确定软件的开发目标，设定工作进度）
2. 需求分析
3. 软件设计
4. 程序编码
5. 软件测试
6. 运行维护

##### 本质

本质是“一次通过”，即每个活动只做一次

上一项活动的工作成果（经过评审）作为下一项活动的输入，根据输入实施该项活动应完成的内容

##### 适用

需求明确且很少变更的项目，不适合现代大型软件项目开发模式

> 对于周期较长大型软件项目采用瀑布模型的缺陷？
> 软件与用户见面时间间隔较长，增加风险
> 前期未发现的错误传到后期，会增加成本并扩散，可能会导致整个项目失败
> 在需求分析阶段完全确定客户需求比较困难，以及需求一层不变也是不可能的

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gg86du7mj7j30d10emjsk.jpg)

#### 增量模型

将功能细化、分别开发

##### 本质

强调每一个增量均发布一个可操作的产品

第一个增量往往是核心产品，即第一个增量实现了基本需求，但很多补充特性还没有发布

##### 优点

先推出核心产品给客户，起到“镇静剂”的作用

##### 适用

需求经常变更的软件开发过程

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gg86hklgr6j30iw0e8gnh.jpg)

#### 迭代模型

与增量模型相似，每次迭代都产生可以发布的产品（稳定，可执行的产品版本）

##### 流程
（至少包括）

* 需求工作流程
* 分析设计工作流程
* 实施和测试工作流程

##### 适用

项目事先不能完整定义所有产品需求（或者说客户不能事先提供所有产品需求），计划多期开发的软件开发模型

##### 优点

能够显著降低项目风险

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gg86rg98d9j30hu0ejgnl.jpg)

{% note info %}

三种开发模型区别：

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gg86t3a5zhj30jv06ata5.jpg)

{% endnote %}

#### V模型

##### 本质

强调测试不再是一个事后弥补的行为，而是一个同开发同样重要的过程

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gg86ur6ycxj30ir06u41c.jpg)

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gg86vceze3j30f70973zn.jpg)

#### 快速原型模型

Rapid Prototype Model

##### 本质

等价于产品的一个子集（增量）

是瀑布模型的一个高速变种，通过大量使用**可复用构件**，采用基于构件的方法赢得快速开发

##### 优点

可以在很短的时间内满足用户最迫切的需要，完成一个可以演示的产品

这个产品具有实现部分最主要的功能

##### 最重要的目的

确定用户的真正需求，在得到用户的需求之后，原型将被抛弃

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gg86z78lovj30jd05n3zv.jpg)

#### 里程碑管理

* 里程碑：

开发过程中重要的中间检查点。在这些点上对阶段目标达成情况进行中间评估，并及时纠正偏差、调整策略，以保证最终目标达成

> 增量模型和迭代模型其实是对里程碑的一种扩展

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gg872vz746j30f609uabx.jpg)

{% endnote %}