---
title: QT Report
date: 2020-06-30 10:18:31
tags: [QT, C/C++, NOTE, SUMMERTERM]
description: Summer Term Report of QT

---

{% note warning %}

# QT 学习报告

## 软件结构

* 分层结构

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gga3zom4fnj30e20ci3zs.jpg)

## QT工程

* 工程文件：组织QT工程、设置QT库模块
* 界面文件：`*.ui`
* 源代码文件：`*.cpp`
* 头文件：`*.h`
* 设计师界面类：`*.ui` `*.cpp` `*.h`

## QT的基本原理

### 问题

{% note info %}

#### 界面文件如何保存？以什么格式保存？

存储在 `*.ui` 文件中，以 **XML** 格式保存，以对象为单位，包括了坐标、长宽、名字等

{% endnote %}

{% note success %}

#### 界面文件如何参与编译？

`*.ui` 经过 **uic** 转换工具，转换生成 `ui_*.h` ，里面是 c++ 语法写成的类

`ui_*.h` 参与 c++ 工程的联编

`ui_*.h` 是由 `*.ui` 生成的，不要直接修改 `ui_*.h`

{% endnote %}

{% note danger %}

#### 界面和功能如何关联？

**Widget** 类中包含了界面和功能

类中写的Q_OBJECT是QT定义的宏

功能是加入QT的元对象模型，主要是为了实现QT对象间的通信

{% endnote %}

{% note default %}

#### QT界面如何运行起来的？

互动界面是通过消息触发的，在程序一定能捕捉到信息，并进行处理

* **QApplication** 对象

管理 GUI 应用程序，包括初始化、收尾、主消息循环等

* **QApplication::exec()**

启动主消息循环，其实就是个不限次循环，等待消息，处理消息

`exec` 接收到消息后会分发给不同的对象方法去执行

{% endnote %}

## 常用控件和类

### 界面设计方法

* 静态（常用于初始化界面）：通过设计师模式，修改控件的属性
* 动态（功能更强，常用于动态变化的界面）：通过代码，用对象的方法，修改控件的属性

### QPushButton

* 功能：按钮
* 常用方法：
	- **seetText**：设置按钮上的文字

### QLabel

* 功能：显示文本或图片
* 常用方法：
	- **setText**：设置文本

### QLineEdit

* 功能：单行输入框
* 常用方法：
	- **setText**：设置文本

### QDebug

包含头文件

`qDebug() << 打印信息;`

可以打印基本类型和 *QString* 等构造类型

## 信号 signal 和槽 slot 机制 （QT 精髓）

> 注意：信号和槽机制，是 QT 元对象模型的一部分功能，必须由元对象的支持。在类中加上 `Q_OBJECT`
> 宏，就使得类具备了元对象功能

### 信号和槽的意义

用于 QT 中对象间通信

### 实现信号和槽机制的三种方式

* 利用信号槽编辑器（基本不用）

	- 连接：在信号和槽编辑器中拖拽鼠标连接控件（可以自己连自己）
	- 删除：*delete* 键

	* 优点：简单
	* 缺点：功能太单一，只能对界面上的控件进行信号槽连接（界面上的对象间通信）

* 右键转到槽（经常使用，是界面和功能连接的主要方式）

	- 连接：在控件编辑器中，在控件上右键，选择“转到槽”
	- 删除：需要在代码中删除，一定要同时删除声明和定义

	* 优点：比较简单，功能比较强大
	* 缺点：对于不在设计师界面中的对象（代码生成的对象）无法使用

* 自定义信号槽（连接 QT 中所有包含了 `Q_OBJECT` 的对象）

	- 连接：用 `QObject::connect()` 函数连接一个对象的一个信号和一个对象的一个槽
	`QObject::connect(参数1，参数2，参数3，参数4)`
	`connect` 是 `QObject` 类的公有静态方法，具备公有静态方法的特点
		* 参数1：发送信号的对象地址
		* 参数2：发送的信号
		* 参数3：接收信号的对象地址
		* 参数4：接收信号对应的槽函数
	- 删除：用 `OObject::disconnect)` 函数删除

	- 优点：功能强大，可以连接任意对象，实现任意对象间通信
	- 缺点：只能用代码写，略难

- 多窗口信号槽连接的注意事项
	* 能找到发送信号的对象和接收信号的对象 `connect` 函数调用必须放在能同时得到两个对象的位置
	* 连接的时机一定保证在发送信号之前

### 自定义信号和槽的方法

* 自定义信号

	- 在类声明中用 *signals* 标号引导
	- 没有访问权限限定
	- 信号就是一个函数声明，没有函数定义和函数体
	- 信号定义可以有参数，用于跟槽进行数据通信

* 自定义槽

	- 在类声明中用 *slots* 标号引导
	- 有访问权限限定，跟普通函数一样
	- 槽可以通过对象直接调用，也可以由信号触发调用
	- 槽既有函数声明，又有函数定义
	- 槽定义可以有参数，用于接收伴随信号发送过来的数据

### 信号和槽的连接可以是多对多的

* 一个信号可以连接多个槽

```cpp
connect(this, SIGNAL(mySignal(QString)), this, SLOT(mySlot(QString)));
connect(this, SIGNAL(mySignal(QString)), sw, SLOT(mySlotInSW(QString)));
```

* 一个槽可以连接多个信号
* 当一个信号可以连接多个槽时，执行顺序不确定，所以不能用 *connect* 的顺序决定执行顺序

## QT 内存注意事项

* QT 是面向对象的，对象必须有内存。所以访问对象一定要保证对象有合法内存空间
* QT 控件有父子关系

父控件可以控制子控件显示
父控件消亡可以使子控件消亡

## 布局

### 控件的位置

* 控件的位置是由坐标决定的，相对于窗口的坐标
* 窗口坐标是从左上角起始 `(0, 0)`
* 坐标和大小尺寸以像素为单位
* *geometry* 的四个属性决定了控件在窗口中的位置和大小

### 手动布局

* 在设计界面中调整 *geometry* 属性（静态）
* 在代码中用控件对象的 *setGeometry* 设置属性（动态）

### 自动布局

让控件自适用窗口

* 水平自动布局（横盒）
* 垂直自动布局（竖盒）
* 栅格自动布局
* 布局是讲策略，自动是有规则
	- 水平策略：*expanding* 最能抢、*preferred* 最适、*fixed* 固定
	- 垂直策略：*expanding* 最能抢、*preferred* 最适、*fixed* 固定
* 各种布局是可以组合的
* 影响布局的因素：
	- 水平和垂直策略 *sizePolicy*
	- 控件的最小尺寸
	- 布局分配比例

## 网络编程 （Socket 编程）

### 基本概念

1. 物理连接
2. IP
3. 端口号：用于区分同一主机上的不同软件
4. 协议：TCP、UDP
	- TCP
		* 传输控制协议
		* 面向连接
		* 侧重连通和数据传递的安全性
		* 通信效率低
		* client & server
	- UDP
		* 数据报协议
		* 面向非连接
		* 侧重大量数据的收发
		* 通信效率高
		* 发送端和接收端
		* 发送的每个包都需要包含 ip 和端口号

### 编程方法 (以 UDP 为例）

* 每个程序都可以既是发送端又是接收端
* 在发送端和接收端 pro 文件中增加 `network` 模块，修改 pro 文件后要执行一次 qmake

#### 发送端

* 定义 `QUdpSocket` 对象

```cpp
QUdpSocket *send;
```

* 创建 `QUdpSocket` 对象

```cpp
send = new QUdpSocket(this);
```

* 使用 `QUdpSocket` 类的 `writeDatagram` 方法发送数据

```cpp
send->writeDatagram(data, QHostAddress("127.0.0.0"), 6666);
```
将数据 data 发送到本地回环地址 `127.0.0.1` 的 `6666` 端口上

#### 接收端

* 定义 `QUdpSocket` 对象

```cpp
QUdpSocket *rec;
```

* 创建 `QUdpSocket` 对象

```cpp
rec = new QUdpSocket(this);
```

* 绑定接收 ip 和端口号

```cpp
rec->bind(QHostAddress("127.0.0.1"), 6666);
```

* 连接接收数据的信号和槽

```cpp
connect(rec, SIGNAL(readyRead()), this, SLOT(readMsh()));
```

* 接收槽定义

```cpp
void Widget::readMsg()
{
	char buff[20] = {0};
	// 收到rec发出的readyRead信号，rec已经准备好数据了
	rec->readDatagram(buff, 19);
	ui->label->setText(buff);
	
```

#### 中文乱码

* 修改字符串处理的方式

```cpp
vodi Widget::on_pushButton_clicked()
{
	QString str = ui->lineEdit->text();
	QByteArray data(str.toStdString().data());

	send->writeDatagram(data, QHostAddress("127.0.0.1"), 6666);
}
```

## 数据库

### 数据库的基本概念

* 数据库的意义

帮助我们做数据管理工作，保证功能和效率，尤其在大量数据的情况下
数据库是个程序，用来管理数据文件的程序

* 数据库中存储数据的单元是表 table
* 操作数据库是用过 SQL 语句完成的，不管用数据库软件还是 QT 编程
* 主键是不能重复的（类似 set）用于区分唯一的数据，每个表只能有一个主键

### 常用数据库操作语句

* 使用指定的数据库

```sql
use mydb;
```

`mydb` 是数据库名

* 创建表

```sql
create table stu (no int primary key, name varchar(20), score int);
```

`primary key` 指定主键，可选

* 删除表

```sql
drop table stu;
```

* 插入数据

```sql
insert into stu values(2, "Jerry", 61);
```

* 删除数据

```sql
delete from stu where no = 2;
```

`where` 用来指定删除数据的条件

* 查询数据

```sql
select * from stu;
select * from stu where no = 2;
select name from stu where no = 2;
```

### QT 程序访问数据库

#### Sqlite

* Sqlite 是 QT 自带的数据库，连接比较容易
* Sqlite 是单机数据库，不能通过网络连接

#### 连接数据库

* 在 pro 工程文件中增加 `sql` 模块
* 一般数据库是整个程序共享的，所以在 `main` 函数中连接

```cpp
QSqlDatabase db = QSqlDatabase::addDatabase("QSQLITE");
db.setDatabaseName("mydb.db");

if (!db.open())
{
	qDebug() << "Error when open Database";
}
```

#### 访问数据库

* 定义 `QSqlQuery` 对象，用于执行 SQL 语句

```cpp
QSqlQuery query;
```

* 执行 SQL 语句

```cpp
query.exec("create table stu (no int primary key, name varchar(20), score int);");
```

```cpp
query.exec("insert into stu values (1, 'Tom', 60)");
```

* 查询 `SELECT` 结果

```cpp
QString no = ui->lineEdit->test();
QString cmd("select * from stu where no = ");
cmd += no;
bool res = query.exec(cmd);
qDebug() << res;
while (query.next())
{
	qDebug() << query.value(0) << ":" << query.value(1).toString() << ":" << query.value(2);
}
```

#### 在界面中展示数据库数据

* `QTableView`
* `QSqlQueryModel`

{% endnote %}
