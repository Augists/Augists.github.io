---
title: Software Engineering Review
tags: [NOTE, SHARING]
description: 'Copyright (c) Dingsoul<br>Link: https://dingiso.github.io/2021/03/11/软件工程复习/'
date: 2021-12-19 15:06:30

---

{% note warning %}

# 软件工程复习

软件工程三要素： 方法 工具 和 过程

## 软件开发方法*

### 传统开发方法

结构化方法：分阶段的，顺序的，依赖性

缺点：缺少灵活性，静态，缺少应对变化的能力

### 面向对象方法

将软件构件划分为**类**，并定义一组静态的**变量**和动态的**方法**

利用父子类和**继承**的关系形成**层次结构**，

**封装性**：对象间仅能通过发送消息互相联系

通过**反复迭代**开发软件，降低**复杂性**，提高**可理解性**，支持**软件重用**

更好的应对变化

## 软件开发各阶段活动及任务*

* 可行性分析：高层次需求分析 - 技术，经济，社会
* 需求分析：进行**变更管理**适应变化，分为功能性和非功能性，输出需求规格说明书
* 软件设计：概要+详细
* 程序编码
* 软件测试：单元->集成->系统，分为黑盒和白盒
* 软件维护：改正性，适应性，完善性，预防性

## 生命周期模型

### 瀑布模型*

传统开发方法 **最广泛**，顺序性，依赖性

推迟写代码，每个阶段都写文档

缺点：用户参与少，静态

### 快速原型模型*

看名

优点： 用户参与多了

缺点： 原型大概率抛弃

### 增量模型

分为功能模块，逐步实现（开放架构）

### 螺旋模型

瀑布+快速原型+风险分析

每阶段增加风险分析，降低风险

### 喷泉模型*

迭代和无缝

总目标：线性过程

**迭代** 逐步求精，面向对象

## 敏捷

### 敏捷宣言

* 个体 + 互动 > 流程 + 工具
* 软件 > 文档
* 客户合作 > 合同谈判
* 相应变化 > 遵循计划

### 增量和迭代

系统由三个模块构成

* 增量：一个个实现

* 迭代：实现三个垃圾模块，再一步步求精

### SCRUM*

**冲刺 Sprint**：一个工作周期

* 产品订单：项目的概要文档，以天为单位
* 冲刺订单：小文档，以 16 小时为单位
* 燃尽图：to-do list

角色

* 产品拥有者：甲方领导
* 利益相关者：客户
* 专家：技术总监
* 团队成员：程序员

活动

* 计划会：冲刺初制定计划
* 每日立会：每天15分钟
* 评审会：冲刺结束前
* 反思会/回顾会：冲刺结束后

XP(极限编程) 于 SCRUM 区别

|                                    | XP    | SCRUM |
|------------------------------------|-------|-------|
| 迭代长度                           | 1-2周 | 3-4周 |
| 迭代中是否允许修改需求             | yes   | no    |
| 迭代中是否按优先级实现             | yes   | no    |
| 是否采用严格工程方法，保证进度质量 | yes   | no    |

### DevOps

自动化，高度依赖工具

## 需求分析

### 用户 & 系统

* 系统需求是对用户需求的细化和完善
* 系统需求的阅读对象是开发者，用户需求是客户
* 系统需求是用户需求的开始
* 目标 & 涉众

### 涉众

与目标系统相关的一切人和物

### 系统功能的确定

正式和非正式的访谈

### 分析过程

用例->规约用例并生成文档->活动图->文字功能性需求

#### 三种功能性需求

系统功能需求 + 交互需求 + 外部接口需求

#### 需求说明书

文档+涉众+目标+功能，非功能+交付物+验收标准+附件

#### 需求跟踪

业务，需求，类模型 三者递归确定，互有对应

活动图，需求文档，类图

提高完备性，同时检查是否有冗余（有没有缺的，多的）

## 软件架构

### 基本元素

构件 + 连接件 + 配置

### 数据流风格

**管道与过滤器**：信息隐藏，高内聚低耦合，可以灵活组合

**层次系统**：计算机网络

**正交软件架构**：

* 层：一组具有相同抽象级别的构件

* 线索：用例形成的调用关系

* 好处：每个需求变动仅影响某一条线索

**客户机服务器架构**：

* 一个服务器服务多个客户端
* 适应变化，灵活
* 易于对系统进行扩充和缩小
* 功能构建隔离

**浏览器/服务器架构**：基本同上+抽取client的function形成的web服务器

### 独立构建风格

#### MVC架构*

* Model: 企业数据和业务规则

* View: 用户看到并与之交互的界面

* Controller: 根据输入调用模型和视图去完成用户的需求，不输出结果，不做任何处理

### 数据中心风格 - 仓库系统

星型结构，中央数据库和周边client

黑板系统：中央数据库将状态通知client，由client决定选择

## 类的分析与设计

迭代逐级细化

### 类的种类

* 实体类：存储，传递数据的类，名词
* 控制类：管理类，体现执行逻辑，动宾
* 边界类：外部用户交互，界面类，数据交换类

#### 领域模型

初始类图-实体类

**实体类** `<<entity>>`
* 类名：构造性
* 变量：
  * 可见性 (private, public ..) - (`-+_~`)
  * 依赖（计算）属性，(`/`)
  * 名字
  * 类型：UML定义的，int String…
  * 下划线：表示静态

没有方法

#### 类的关系*

* 关联关系：静态，拥有，长期持久
* 导航方向：箭头，包含关系
* 依赖关系：动态，临时 - 避免双向依赖
* 依赖 包含 关联

#### 对象

* 对象名：类的类型
* 实例变量 = 初始值
* 对象名为空代表匿名对象，类名为空代表有上下文

#### 管理类 & 控制类

|      | 管理类                     | 控制类         |
|------|----------------------------|----------------|
|      | 不考虑get，set方法         | 隔离边界与实体 |
| 对象 | 对于同类对象的协调和管理   | 不同类         |
| 层   | Domain层                   | 业务控制层     |
| 作用 | 创建对象，代理访问其他对象 | 一个用例一个   |

#### 优化

利用抽象类隔离变化

空三角箭头表示继承

#### 枚举类 `<<enumeration>>`

#### 界面设计

对实体，生成 `ProjectMask` 代理类

#### CASE工具

软件开发环境，计算机辅助软件工程

## 类的关系

### 集合类型

| 是否要求顺序 | 是否要求唯一性 |               |
|--------------|----------------|---------------|
| no           | yes            | Set           |
| no           | no             | Bag/Multiset  |
| yes          | yes            | OrderedSet    |
| yes          | no             | List/Sequence |

适用模板类而非具体类

#### 聚合 - 聚集

部分与整体，共享

#### 组合

存在依赖性 - 同生共死

#### 依赖

访问的瞬时性 - 用参数

## 类的详细设计

算法+数据结构+物理结构

其他设计+详细设计说明书+评审

什么是结构化的程序

### 盒图

图例：不允许随意跳转 - 向里嵌套

### PAD图

问题分析图 - 向右嵌套

### 判定表

使用`—`来表 示对此条件的不关心或不适用

判定树：结点-选择，叶子-结果

### PDL

人话版的C语言

### OCL

## 设计优化

### smell

僵化性，脆弱性，顽固性，粘滞性，复杂，重复，晦涩

#### 重写

* 与父类方法有相似的行为，细节调整
* 相同条件工作，子类不应具有比其父类更严格的条件限制 - **Liskov 替换原则**
* 重写的方法最高不能超出父类方法的状态。

循环依赖：提取接口

狎昵关系：两个类过分亲密，高耦合

接口隔离原则：接口的稳定，适应变化，同一个类提取不同的接口

依赖倒置原则：依赖于抽象

开放封闭原则：扩展开放，修改封闭

单一职责原则：单一功能

合成/聚合复用原则：尽量使用合成/聚合形式的委托重用，尽量不使用继承重用

> 子类是父类的特殊类型

### 模式

* 架构模式：MVC，层次等
* 设计模式：抽象工程之类的
* 实现模式：具体到写代码，类名，变量名，函数名

|    | 创建模式 | 结构模式  | 行为模式   |
|----|----------|-----------|------------|
| 类 | 抽象工厂 | 适配器    | 观察者模式 |
| 类 | 单例     | 桥 - 装饰 | 策略模式   |
| 类 |          | 代理      | 状态       |
| 类 |          | 门面      |            |

#### 抽象工厂模式

工厂表示一组产品的打包，不同的工厂对应不同的组合

抽象工厂是一个接口，用于生成一组对象，实际对象根据类别又有自己的接口

低耦合，且添加新的更容易

#### 单例模式

管理类或控制类系统中只需要一个实例，该实例在程序中被创建

要求类的构造方法是私有的，有公有的方法获取该类的实例，实例变量为私有或受保护的。

#### 适配器模式

利用适配器进行接口的转换

#### 桥模式

先将不同的变化维度（单一职责原则）分离，每个维度都有独立的抽象和继承结构，建立抽象耦合

#### 装饰模式

对于负数功能，若将其归入不同的变化维度太多了，归入装饰器

将 Bridge 中的抽象和实现合二为一了，是其特殊形式

#### 门面模式

外部与一个子系统的通信必须通过一个统一的门面对象，且单例

#### 代理模式

中介，负责资源的中间处理，节省主体的时间

用来对有价值稀缺资源的管理，比如数据库的连接等，提高资源的利用率或系统性能

#### 观察者模式

MVC 适用了观察者

当主题对象在状态上发生变化时，会通知所有观察者对象，使它们能够自动更新自己

#### 策略模式

将每一个算法封装到具有共同接口的独立的类中

灵活可以相互替换

#### 状态模式

使用一个具有多个子类的类，提前创建所有对应的子类，状态变化时换类

## 软件测试

测试的通过并不能用来证明整个系统是正确的

### 测试V模型 + 测试*

| 测试名称 | 开发阶段 | 测试对象          | 测试方法 |
|----------|----------|-------------------|----------|
| 单元测试 | 实现     | 类测试            | 白盒测试 |
| 集成测试 | 系统设计 | 包或系统测试-交互 | 灰盒测试 |
| 系统测试 | 系统需求 | 构件和接口测试    | 黑盒测试 |
| 验收测试 | 客户需求 | 现场复现          | 黑盒测试 |

为什么要早修正

* 涉及的范围越来越广泛
* 曾经付出的成本越来越高

看一眼 P9 左下图

##### 非功能测试

峰值，尖峰，压力，浸泡

#### 软件度量

##### McCabe + 控制流图

边数 - 点数 + 2 = 分支结点+1

##### LCOM

![](https://s2.loli.net/2021/12/20/3BY8Z46qzw5btSX.png)

m为方法数，a为所含的实例变量数，为访问每个实例变量的方法数。

#### 等价类测试 - 黑盒

* 数值：一般，一个有效，两个无效
* 其他：一个有效，一个无效
* 传统 + 强等价类方法
* 边界值分析：对数值边界创建有效或无效等价类

#### 控制流的覆盖测试 - 白盒

* 语句覆盖 - 结点
* 分支覆盖 - 边
* 条件覆盖 - 原子谓词真假

满足分支覆盖要求一定会满足语句覆盖要求

* 分支覆盖不能覆盖条件，因为条件是原子谓词判断，但对于组合条件可能会有诸如短路的情况

* 条件不能覆盖分支，因为是原子谓词，可能有没覆盖到的情况

分支，条件并不完全覆盖，综合一下

* 多条件组合覆盖 - 原子谓词及其组合覆盖

* 基本路径测试 - 独立路径 （ 独立路径要求在路径中至少含有一条未曾使用过的边）

  * `<= V(G)`

#### 断言

#### Junit

可测试性 - 彼此依赖而需要模拟程序或桩

设计简单方法

避免私有方法

优先使用通用方法

组合优于继承

避免隐藏的依赖关系与全局状态

#### 人工测试

审查 - 评审 - 走查

## CMMI

统一的，明确定义的组织级软件工程

初始级 - 已管理 - 已定义 - 已量化管理 - 优化

## UML

### 用例图

注意同一个图中的用例在同一个抽象级别

#### 角色 Actor

人或软件系统，使用系统，与系统有关系

#### 寻找用例

#### 包含关系 `<<include>>`

一些通用，共同基础过程的功能，避免重复实现 - 非逻辑分解

关键词：依赖，包含

#### 扩展关系 `<<extend>>`

特殊情况，需要有条件

关键词：错误，特殊情况

### 活动图

跨用例

#### 图示

* **开始点**：实心圆点
* **结束点**：实心加一圈
* **动作**：圆角矩形
* **条件**：菱形 - 可省略
* **分支，汇聚**：粗横线，{and}，{or}
* **对象**：直角矩形
* **集合**：多个动作（三叉戟）

如果动作具有多个汇聚的箭头，需要等待所有分支都完成

#### 泳道

按角色划分

#### 基本事件流和备选

利用中括号`[]`围绕子活动或者进入备选事件流的条件，可以另用活动图描述

### 数据流图

#### 基本符号

实体，处理，存储，流

#### 画法

看课件

### 包图

大包嵌套小包，小包嵌套类

⊕：嵌套关系

虚线：层间的使用(依赖)关系

实线：包间的使用(依赖)关系

空心三角：继承

避免循环依赖

### 类图

#### 领域模型

##### 实体类 `<<entity>>`

* 类名：构造性
* 变量：
  * 可见性 (private, public ..) - (`-+_~`)
  * 依赖（计算）属性，(`/`)
  * 名字：
  * 类型：UML定义的，int String…
  * 下划线：表示静态
* 方法：
  * 同上
  * 参数三种类型：in, out, inout

没有方法

#### 关联类

描述两个对象之间的联系

### 顺序图

表示一个用例，同步调用的方式（阻塞）

* 控制焦点：长方形
* 生命线：竖虚线
* 同步消息：实心三角箭头（左右都可以）
* 返回消息：虚线左箭头
* 异步消息：创建对象，虚线右箭头

结构：

* 方括号 condition
* 可选：opt - 有条件执行的动作，不满足条件就不执行
* 多分支 alt - 不同的条件执行不同
* 循环 loop (start,end,condition)

### 通信图

可嵌套，或用编号 编号表示嵌套级别

其他与顺序图类似

### 状态图

唯一的开始状态，可以有多个结束状态，针对确定性行为

转台框中的三个状态：Entry - Do - Exit

#### 状态转换 - 过渡

事件+[条件]+动作

在事件被触发并且满足某个特定条件的情况下才会进行

动作：entry 执行前，未进入状态时做的动作

层次化组织：框起来

分解：分解为互不依赖的子状态 - 子状态离开

并行：有两个输入，则都完成才会被触发

## 体系结构风格

### 模块

从低到高排序

内聚程度：内部各个元素彼此结合的紧密程度 - 越高，模块独立性越强

* 偶然内聚
* 逻辑内聚
* 时间内聚
* 通信内聚
* 顺序内聚
* 功能内聚

耦合程度：模块之间互相连接的紧密程度 - 越低，模块独立性越强

非直接 < 数据 < 标记 < 控制 < 外部 < 公共 < 内容

### 4+1 视图模型

用例在中间，四周是逻辑视图（功能需求），开发试图（软件模块），进程视图（并发），物理视图（硬件）

{% endnote %}