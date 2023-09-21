---
title: MFC Report
date: 2020-07-03 12:31:36
tags: [MFC, C/C++, NOTE, SUMMERTERM]
description: Summer Term Report of MFC

---

{% note warning %}

# MFC 学习报告

## Windows 编程的特点及基本概念

### 事件驱动的程序设计

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ggdujq86vzj30t20o0act.jpg)

事件驱动由消息循环来实现的

Windows 消息来源：

* 输入消息：包括键盘和鼠标的输入
* 控制消息：用来与控制对象（如列表框、按钮、检查框等）进行双向通信
当用户在列表框中改动当前选择或改变了检查框的状态时发出此类消息。这类消息不经过应用消息队列，而是直接发送到控制对象上去
* 系统信息：对程序化的事件或系统时钟中断作出反应
一些系统消息，像 DDX 消息（动态数据交换消息）要通过系统消息队列，而有的则不通过系统消息队列而直接进入应用程序的消息队列，如创建窗口消息
* 用户消息：自己定义并在应用程序中主动发出的，一般由应用程序的某一部分内部处理

#### 图形输出

* 控制台程序独占整个屏幕，其他程序在后台等待。而 Windows 应用程序只对屏幕的一部分窗口进行处理
* Windows 程序的的所有输出都是图形。Windows 提供了丰富的图形函数用于图形输出
* Windows 输出是与设备无关的，通过 **GDI** (Graphics Device Interface)

#### 基本概念

##### 窗口

* `winuser.h` 中定义了代表窗口的 `WNDCLASS` 结构类型

```cpp
typedef struct tagWNDCLASS{
	UINT		style;			// 窗口风格
	WNDPROC		lpfnWndProc;	// 指向窗口处理函数的函数指针
	int			cbClsExtra;		// 窗口结构中的预留字节数
	int			cbWndExtra;		// 本窗口创建的其他窗口结构中预留字节数
	HINSTANCE	hInstance;		// 注册该窗口类的实例句柄
	HICON		hIcon;			// 该窗口类的图标句柄
	HCURSOR		hCursor;		// 该窗口客户区光标句柄
	HBRUSH		hbrBackGround;	// 该窗口背景颜色句柄
	LPCSTR		lpszMenuName;	// 指向窗口菜单名的字符指针
	LPCSTR		lpszClassName;	// 指向窗口名的字符指针
} WNDCLASS, *PWNDCLASS, NEAR *NPWNDCLASS, FAR *LPWNDCLASS;
```

##### 事件与消息

`winuser.h` 中，消息结构定义

```c
typedef struct tagMSG
{
	HWND	hWnd;		// 消息发向的窗口的句柄
	UINT	message;	// 消息的消息值
	WPARAM	wParam;		// 消息参数
	LPARAM	lParam;		// 消息参数
	DWORD	time;		// 消息进入队列的时间
	POINT	pt;			// 消息进入队列时鼠标指针的屏幕坐标
} MSG, *PMSG, NEAR *NPMSG, FAR *LPMSG;
```

1. `message`

标识消息的消息值或消息名

1. `WM_` 窗口消息
2. `BM_` 控件消息
3. `EM_` 编辑框控件消息
4. `LB_` 列表框控件消息

* `WM_CREATE`	0X0001 创建窗口产生消息
* `WM_DESTROY`	0X0002 撤销窗口产生消息
* `WM_PAINT`	0X000F 重画窗口产生消息
* `WM_CLOSE`	0X0010 关闭窗口产生消息
* `WM_CHAR`		0X0102 按下非系统键产生消息
* `WM_USER`		0X0400 用户自定义消息
* `WM_USER+n`

2. `wParam` 和 `lParam`

都是32位消息参数，定义在 `windef.h` 下

```cpp
typedef UINT WPARAM;
typedef LONG LPARAM;
```

3. `pt`

消息进入消息队列时鼠标指针的屏幕坐标

`POINT` 定义在 `windef.h` 中的结构体，表示屏幕上的一个点

```c
typedef struct tagPOINT
{
	LONG x;
	LONG y;
} POINT, PPOINT, NEAR *NPPOINT, FAR *LPPOINT;
```

##### 资源共享

基本模式

1. 向 Windows 系统请求资源
2. 使用
3. 释放资源给系统以供其他程序使用

##### 数据类型

| 数据类型 | 说明                                                        |
|----------|-------------------------------------------------------------|
| BYTE     | 8位无符号字符                                               |
| BSTR     | 32位字符指针                                                |
| COLORREF | 32位整数，表示一个颜色                                      |
| WORD     | 16位无符号整数                                              |
| LONG     | 32位有符号整数                                              |
| DWORD    | 32位无符号整数，WORD的两倍长度                              |
| UINT     | 32位无符号整数                                              |
| BOOL     | 布尔值                                                      |
| HANDLE   | 句柄                                                        |
| LPSTR    | 32位指针，指向字符                                          |
| LPCSTR   | 32位指针，指向字符串常量                                    |
| LPTSTR   | 32位指针，指向字符串，可移植到 Unicode 和 DBCS 双字符集     |
| LPCTSTR  | 32位指针，指向字符串常量，可移植到 Unicode 和 DBCS 双字符集 |
| LPVOID   | 32位指针，可指向任何类型数据                                |
| LPRESULT | 32位数值，作为窗口函数或 CALLBACK 函数的返回类型            |
| WNDPROC  | 32位指针，指向一个窗口函数                                  |

##### 句柄

用于识别应用程序对象的一个无重复整数，也可以看作赋予对象的唯一名称。在给一个对象赋予句柄以后，就可以通过此句柄完成对该对象的引用了

句柄是一个四字节长的整数

| 句柄类型  | 说明               |
|-----------|--------------------|
| HWND      | 标识窗口的句柄     |
| HINSTANCE | 标识当前实例的句柄 |
| HPEN      | 标识画笔的句柄     |
| HBRUSH    | 标识画刷的句柄     |
| HDC       | 标识设备环境的句柄 |
| HMENU     | 标识菜单的句柄     |
| HFIFE     | 标识文件的句柄         |
| HFONT     | 标识字体的句柄         |

##### 资源

程序使用的资源被集中在一个资源文件中进行定义

##### 动态链接库

DLL(Dynamic Linkable Library) 允许应用程序共享代码和资源的可执行模块。

## Windows 程序的基本结构

Windows 程序的入口为 `WinMain` 函数

## 利用 MFC (Microsoft Foundation Class Library) 创建 Windows 程序

* AppWizard：生成初步的框架文件
* 资源编辑器：帮助直观的设计用户接口
* ClassWizard：协助添加代码到框架文件

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ggfxnbq053j31750u0jwk.jpg)

| 类型                   | 文件名称                       | 功能描述                                                                                                     |
|------------------------|--------------------------------|--------------------------------------------------------------------------------------------------------------|
| 框架窗口类实现文件     | `MainFrm.h`, `MainFrm.cpp`     | 包含窗口类 `CMainFrame` 的实现代码，负责创建标题栏、菜单栏、工具栏和状态栏。实现应用程序的主窗口             |
| 文档类实现文件         | `MySDIDoc.h`, `MySDIDoc.cpp`   | 应用程序数据的保存和装载，实现文档的序列化功能。`OnNewDocument()` 新建文档。`Serialize()` 文档数据的磁盘读写 |
| 视图类实现文件         | `MySDIView.h`, `MySDIView.cpp` | 客户区文档数据的显示，如何进行人机交互。`GetDocument()` 获取 `m_pDocument`，`OnDraw()` 文档数据显示          |
| 应用程序类实现文件     | `MySDI.h`, `MySDI.cpp`         | 应用程序的主函数文件，应用程序的初始化、启动运行和结束                                                       |
| 资源文件               | `Resource.h`                   | 资源标识符放在此文件中                                                                                       |
| 应用程序生成的资源文件 | `MySDI.rc`, `MySDI.rc2`        | rc 用资源编辑器进行可视化编辑，rc2 不能编辑                                                                  |
| 应用程序生成的资源文件 | `MySDI.ico`                    | 图形编辑器编辑图标文件                                                                                       |
| 应用程序生成的资源文件 | `MySDIDoc.ico`                 | 文档图标一般用于多文档应用程序中，可通过相关函数获取并显示图标                                               |
| 应用程序生成的资源文件 | `Toolbar.bmp`                  | 工具栏中所有按钮的图标显示                                                                                   |
| 标准包含文件           | `StdAfx.h`, `StdAfx.cpp`       | 用来生成预编译文件                                                                                           |

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ggfyw9ghraj319z0u0jyy.jpg)

### 基本类

1. `CObject` 类

根类

	1. 在程序运行时，可获得对象的大小、类名、动态创建类的实例
	2. 提供了把对象状态调转给调试机制的能力，类似于判断当前对象的数据成员是否有效
	3. 具有把对象的数据存进文件或从文件中提取数据重建对象的能力

2. `CCmdTarget` 类

是 `CObject` 的子类，具有消息映射属性的类的公共基类，封装了窗口函数

子类有 `CWinThread`, `CWnd`, `CDocument`

3. `CWnd` 类

提供所有窗口类的基本功能。`CWnd` 派生的类可以拥有自己的窗口，并对它进行控制

`CFrameWnd` 和 `CView` 是 `CWnd` 的子类，前者是创建和维护窗口的边框、菜单栏、工具栏、状态栏，负责显示和搜索用户命令，后者负责为文档提供一个或几个视图

视图的作用是为修改、查询文档等任务提供人机交互界面

4. `CDocument` 类

负责装载和维护文档数据，数据的变化、存取都是通过文档实现的

视图窗口通过文档对象来访问和更新数据

5. `CView` 类

和文档类联系在一起，在文档和用户之间起中介作用，即在屏幕上显示文档的内容，并把用户输入转换成对文档的操作

6. `CDocTemplate` 类

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ggg1uka7sjj313w0pugp1.jpg)

文档模板类对象由应用对象在 `InitInstance()` 函数中构造生成。它分为单文档模板类 (CSingleDocTemplate) 和多文档模板 (CMultiDocTemplate)，分别对应 SDI 应用程序和 MDI
应用。

应用类对象通常只生成一个文档模板类对象

7. `CWinThread` 类

多线程类。所有应用程序至少有一个线程

8. `CWinApp` 类

是 `CWinThread` 的子类，封装了初始化、运行、终止应用程序的代码

{% note danger %}

一个 MFC 应用程序并不直接操纵上述类，而是以上述类为基类派生新的类，构建基本框架

{% endnote %}

## MFC 处理 Windows 消息的类型及方法

{% endnote %}
