---
title: nil pointer error in golang during webChat development on database
tags: [CODE, ERROR, GOLANG]
description: 'During the developing process of Database Engine of webChat, an undiscoverable error occured<br>and I blamed it on golang itself'
date: 2022-03-26 11:19:08

---

{% note warning %}

前几天在进行 [webChat](https://github.com/Augists/webChat) 的 Server 端的数据库部分代码调试的时候，一直被一个奇怪的错误缠着。

我在前面全局变量里声明了数据库引擎的指针

```GOLANG
var (
  DBdriver = "mysql"
  DBinfo   = "xxx"
  DBengine *xorm.Engine
)
```

然后在数据库初始化时

```GOLANG
DBengine, err := xorm.NewEngine(DBdriver, DBinfo)
```

因为 golang 在一定程度上对变量类型进行了弱化，添加了类似于 C++ 中的 auto 对类型进行自动判断，所以为了区分新变量，Go 中使用 `:=` 运算符作为新变量开辟并初始化的标志
例如这里，将 `xorm.NewEngine` 函数的返回值赋给新变量。由于 Go 中函数可以进行多返回值，当左值中存在新变量时，就需要使用 `:=`
在这里就产生了歧义。err 是新的局部变量，同时 DBengine 也被编译器认为是新本地变量，这就使得这行代码并没有给全局的 DBengine 进行赋值
所以即使进行了初始化，全局变量中的 DBengine 依旧为 nil

解决的方法其实也不难，在这之前将 err 创建好就可以消除误解了

```GOLANG
var err error
DBengine, err = xorm.NewEngine(DBdriver, DBinfo)
```

这算一个比较隐性的 bug，不是很容易被发现。我感觉，这是由于 Go 对于语法及特性妥协导致的，这种情况必定会导致歧义，如果让编译器将这种情况处理为先去寻找是否有更高层级已经声明的变量 DBengine 并优先赋值，将会使得这种情况只能通过修改变量命名来解决局部与全局的冲突，亦或局部声明 `var DBengine *xorm.Engine`
我感觉后一种逻辑更容易理解吧，想尝试在 Go 社区中提 issue 询问一下

解释：
当同一包名下存在多个文件时，如果 complier 在检索完局部变量后再去检索全局变量，并优先对全局变量赋值而不是创建新变量，那么如果在同名包的别的文件里对变量进行了定义，就会对 coder 造成很大的问题

详细内容可见[Go Forum](https://forum.golangbridge.org/t/some-thought-about-while-creating-a-new-variable/26874/4)

{% endnote %}
