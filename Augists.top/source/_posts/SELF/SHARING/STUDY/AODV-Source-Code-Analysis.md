---
title: AODV Analysis
tags: [SHARING]
description: 'Analysis of AODV protocol based on its source code'
date: 2022-01-03 23:26:34

---

{% note warning %}

# AODV 协议基本原理及工作流程

## AODV 简介

> The Ad hoc On-Demand Distance Vector (AODV) algorithm enables
dynamic, self-starting, multihop routing between participating mobile
nodes wishing to establish and maintain an ad hoc network.  AODV
allows mobile nodes to obtain routes quickly for new destinations,
and does not require nodes to maintain routes to destinations that
are not in active communication.  AODV allows mobile nodes to respond
to link breakages and changes in network topology in a timely manner.
The operation of AODV is loop-free, and by avoiding the Bellman-Ford
"counting to infinity" problem offers quick convergence when the ad
hoc network topology changes (typically, when a node moves in the
network).  When links break, AODV causes the affected set of nodes to
be notified so that they are able to invalidate the routes using the
lost link.

One distinguishing feature of AODV is its use of a destination
sequence number for each route entry.  The destination sequence
number is created by the destination to be included along with any
route information it sends to requesting nodes.  Using destination
sequence numbers ensures loop freedom and is simple to program.
Given the choice between two routes to a destination, a requesting
node is required to select the one with the greatest sequence number.


AODV uses the following fields with each route table entry:

- Destination IP Address
- Destination Sequence Number
- Valid Destination Sequence Number flag
- Other state and routing flags (e.g., valid, invalid, repairable, being repaired)
- Network Interface
- Hop Count (number of hops needed to reach destination)
- Next Hop
- List of Precursors (described in Section 6.2)
- Lifetime (expiration or deletion time of the route)

---

## AODV 特点
- 接入速度快
- 计算量小
- 内存占用低
- 网络负载轻

疑问🤔️：AODV 协议通过管理 sequence number 来在有多个有效路由的情况下进行决策，每使用过一次 sequence number+1，并以此来表示节点的新鲜程度，选择 sequence number 较大的有效路由。这样难道不会导致积压、增大负载吗？感觉并不是一个合理的方案

---

## AODV Message Type

```c
/* AODV Message types */
#define AODV_HELLO 0 /* Really never used as a separate type... */
#define AODV_RREQ 1
#define AODV_RREP 2
#define AODV_RERR 3
#define AODV_RREP_ACK 4
```


---

## AODV 文件树分析

```bash
$ tree
.
├── ChangeLog
├── GPL
├── Makefile
├── README
├── README.ns
├── TODO
├── aodv_hello.c
├── aodv_hello.h
├── aodv_neighbor.c
├── aodv_neighbor.h
├── aodv_rerr.c
├── aodv_rerr.h
├── aodv_rrep.c
├── aodv_rrep.h
├── aodv_rreq.c
├── aodv_rreq.h
├── aodv_socket.c
├── aodv_socket.h
├── aodv_timeout.c
├── aodv_timeout.h
├── debug.c
├── debug.h
├── defs.h
├── endian.c
├── list.c
├── list.h
├── llf.c
├── llf.h
├── lnx
│   ├── Makefile
│   ├── TAGS
│   ├── kaodv-debug.c
│   ├── kaodv-debug.h
│   ├── kaodv-expl.c
│   ├── kaodv-expl.h
│   ├── kaodv-ipenc.c
│   ├── kaodv-ipenc.h
│   ├── kaodv-mod.c
│   ├── kaodv-mod.h
│   ├── kaodv-netlink.c
│   ├── kaodv-netlink.h
│   ├── kaodv-queue.c
│   ├── kaodv-queue.h
│   └── kaodv.h
├── locality.c
├── locality.h
├── main.c
├── nl.c
├── nl.h
├── params.h
├── patches
│   ├── ns-2.26-aodv-uu-0.8.patch
│   ├── ns-2.27-aodv-uu-0.8.patch
│   ├── ns-2.27-aodv-uu-0.9.1.patch
│   ├── ns-2.27-aodv-uu-0.9.patch
│   ├── ns-2.28-aodv-uu-0.9.1.patch
│   ├── ns-2.29-aodv-uu-0.9.1-dsr-uu-0.2-oolsr-0.99.15.patch
│   ├── ns-2.29.3-aodv-uu-0.9.2.patch
│   └── ns-2.32-aodv-uu.patch
├── rfc3561.txt
├── routing_table.c
├── routing_table.h
├── seek_list.c
├── seek_list.h
├── tags
├── timer_queue.c
└── timer_queue.h

2 directories, 65 files

```


通过在 AODV 项目根目录下运行 `tree` 可以得到如上面代码块中的结果。项目中共有65个文件，其中通过分析 Makefile 文件中的编译链接方式我们可以看到，AODV 项目共提供了两大方向，分别为 ns-2 模拟器运行和实际运行服务。

```Makefile
SRC =  main.c list.c debug.c timer_queue.c aodv_socket.c aodv_hello.c \
  aodv_neighbor.c aodv_timeout.c routing_table.c seek_list.c \
  aodv_rreq.c aodv_rrep.c aodv_rerr.c nl.c

SRC_NS =   debug.c list.c timer_queue.c aodv_socket.c aodv_hello.c \
    aodv_neighbor.c aodv_timeout.c routing_table.c seek_list.c \
    aodv_rreq.c aodv_rrep.c aodv_rerr.c

```


在这里，SRC 是为实际运行使用的 c 文件，而 SRC_NS 是在 NS 模拟器中编译需要使用的文件。在这次对 AODV 源代码分析的过程中，我们只关注于它运用在实践中的代码部分。所以不仅是 SRC_NS 的文件，在 SRC 的文件中如果遇到例如

```c
#ifdef NS_PORT
/* code */
#endif
```


我们都可以将其化简。

这样，我们将所有需要查看的源代码文件根据我们定下的阅读顺序进行了分类，如下表所示：

- Preparation
	- params.h: AODV 运行时的参数定义
	- defs.h: 包含了 AODV 代码中的主要宏定义，例如 `MINTTL`、AODV message type 等全局宏定义，以及对主机和网卡设备的信息结构体 `host_info` 和`dev_info`
	- list.{c|h}: 对循环双链表结构 `list_t` 的定义及操作
	- timer_queue.{c|h}: 定时器 `timer` 的定义及操作，依托于 `list_t` 循环双链表进行串联
	- routing_table.{c|h}: 路由表的定义及操作
	- endian.c: 对于硬件和操作系统的大小端的定义，被应用于 aodv 结构体内变量顺序
- AODV Message
	- aodv_hello.{c|h}: 
	- aodv_neighbor.{c|h}:
	- aodv_rreq.{c|h}:
	- aodv_rrep.{c|h}:
	- aodv_rerr.{c|h}:
	- aodv_socket.{c|h}:
	- aodv_timeout.{c|h}:
- Main
	- llf.{c|h}: 链路层反馈
	- locality.{c|h}: 寻找目的地的方位
	- nl.{c|h}: AODV 协议专用套接字
	- seek_list.{c|h}: RREQ寻找的目的地链表
	- main.c: 协议初始化和运行



---

## `#define do while (0)`

[C语言宏定语执行多条语句一般都会用 do { … } while (0)](https://www.linuxidc.com/Linux/2014-10/108520.htm)

---

## `list.c`

- `list.c` 文件是所有**循环双链表** 操作，有一个空的头节点 head
	- `listelm_detach`: 把两个参数的节点连接起来
	- `listelm_add`: 第一个参数的节点添加到后两个节点中间
	- `list_add`: 插入头节点之后的那个位置
	- `list_add_tail`: 相当于插入tail位置
	- `list_detach`: 把参数中的节点删除

> 所有 `list_t *le` 都全名是 list element


---

## Log Path

```c
#define AODV_LOG_PATH "/var/log/aodvd.log"
#define AODV_RT_LOG_PATH "/var/log/aodvd.rtlog"
```


---

## `defs.h`

- `defs.h`
	- host 主机, dev 网卡
		```c
		/* Data for a network device */
		struct dev_info
		{
		    int enabled; /* 1 if struct is used, else 0 */
		    int sock;    /* AODV socket associated with this device */
		#ifdef CONFIG_GATEWAY
		    int psock; /* Socket to send buffered data packets. */
		#endif
		    unsigned int ifindex;
		    char ifname[IFNAMSIZ];
		    struct in_addr ipaddr;  /* The local IP address */
		    struct in_addr netmask; /* The netmask we use */
		    struct in_addr broadcast;
		};
		```
		
		```c
		struct host_info
		{
		    u_int32_t seqno;           /* Sequence number */
		    struct timeval bcast_time; /* The time of the last broadcast msg sent */
		    struct timeval fwd_time;   /* The time a data packet was last forwarded */
		    u_int32_t rreq_id;         /* RREQ id */
		    int nif;                   /* Number of interfaces to broadcast on */
		    struct dev_info
		        devs[MAX_NR_INTERFACES +
		             1]; /* Add +1 for returning as "error" in ifindex2devindex. */
		};
		```
		
	- `host_info` 中存储 `def_info` 数组，多开了一个位置 `(MAX_NR_INTERFACES+1)`，让函数返回错误时使用，来代表 error
	- `ifindex` 全称是 network interface index
	- 对 `AODV_msg` 结构体进行简化后为
		```c
		typedef struct
		{
		  u_int8_t type;
		} AODV_msg;
		```
		
		```c
		/* An generic AODV extensions header */
		typedef struct
		{
		    u_int8_t type;
		    u_int8_t length;
		    /* Type specific data follows here */
		} AODV_ext;
		```
		

---

## 对 `list_t` 和 `timer` 嵌套结构体的理解

![timer通过list_t实现循环双链表](https://s2.loli.net/2021/12/12/ZitwIevknBAWyQ6.jpg)

---

## `timeval` 结构体在不同系统中的不同定义

- 在 Linux 中`time.h`库文件内
	```c
	struct timeval
	{
	__time_t tv_sec;        /* Seconds. */
	__suseconds_t tv_usec;  /* Microseconds. */
	};
	```
	
- 在 macOS 中
	- util_ldap.h
		```c
		#define timeval l_timeval
		```
		
	- time.h
		```c
		/*
		 * Structure used as a parameter by getitimer(2) and setitimer(2) system
		 * calls.
		 */
		struct  itimerval {
		  struct  timeval it_interval;    /* timer interval */
		  struct  timeval it_value;       /* current value */
		};
		```
		
	- clock_types.h
		```c
		/*
		 * Normal time specification used by the kernel clock facility.
		 */
		struct mach_timespec {
		  unsigned int    tv_sec;                 /* seconds */
		  clock_res_t             tv_nsec;                /* nanoseconds */
		};
		typedef struct mach_timespec    mach_timespec_t;
		```
		

---

## `timer_queue.c`

- `timer_queue.c`
	
	- `timer_timeout` 函数
		- 对 `list_t` 串联起来的 `timer` 循环双链表 `TQ`
		- 循环判断其时间是否为当前时间，将 `timeout` 的 `timer` 放入 `expTQ` 中
			- 若是，则从 `TQ` 中移除，并加入到 `expTQ`
			- 若否，则终止循环判断
		- 循环执行并删除 `expTQ` 中 `timer` 的 handler function
	- `timer_remove`
		- `t->used` 置 0
	- `timer_add`
		- `t->used` 置 1
		- 判断 `TQ` 是否为空
			- 若空，则直接添加
			- 若非空，则遍历 `TQ`，将 t 按照时间顺序添加到 `TQ` 中
		- `timer_timeout_now`
			- 判断 `timer` 是否在 `TQ` 中
				- 若是，则执行 `handler`，并 `t->used` 置 0，`timer` 依旧在 `TQ` 中等待执行
				- 若否，则返回-1
			- `timer_set_timeout`
				- `t->used` 置 0
					```c
					t->timeout.tv_usec += msec * 1000;
					t->timeout.tv_sec += t->timeout.tv_usec / 1000000;
					t->timeout.tv_usec = t->timeout.tv_usec % 1000000;
					```
					
				- `timer_add(t)`

---

## AODV Socket

在对于 `aodv_socket.{c|h}` 文件的分析中，我们发现它大量依赖于系统 C 语言源代码中的 `struct cmsghdr`，于是我们查看了系统源代码 C 语言文件中的 `socket.h` 文件，并从中找到了对于 `msghdr` 和 `cmsghdr` 结构体的定义。

* `msghdr`：用于调用 recvmsg 和 sendmsg 的消息头。在 recvmsg 中使用值与结果相对应，而在 sendmsg 中仅使用值。

  * 套接口地址成员 `msg_name` 与 `msg_namelen`，分别指向我们要发送或是接收信息的套接口地址及这个套接口地址的长度
    * 当调用 recvmsg 时，msg_name 会指向一个将要接收的地址的接收区域
    * 当调用 sendmsg 时，它会指向一个数据报将要发送到的目的地址
  * I/O 向量引用 `msg_iov` 与 `msg_iovlen`
  * 附属数据缓冲区成员 `msg_control` 与 `msg_controllen`
  * 接收信息标记位 `msg_flags`，其可以接收的标记如下

  | 标记位       | 描述                                                         |
  | ------------ | ------------------------------------------------------------ |
  | MSG_EOR      | 当接收到记录结尾时会设置这一位。这通常对于SOCK_SEQPACKET套接口类型十分有用 |
  | MSG_TRUNC    | 这个标记位表明数据的结尾被截短，因为接收缓冲区太小不足以接收全部的数据 |
  | MSG_CTRUNC   | 这个标记位表明某些控制数据(附属数据)被截短，因为缓冲区太小   |
  | MSG_OOB      | 这个标记位表明接收了带外数据                                 |
  | MSG_ERRQUEUE | 这个标记位表明没有接收到数据，但是返回一个扩展错误           |

```c
struct msghdr {
	void            *msg_name;      /* [XSI] optional address */
	socklen_t       msg_namelen;    /* [XSI] size of address */
	struct          iovec *msg_iov; /* [XSI] scatter/gather array */
	int             msg_iovlen;     /* [XSI] # elements in msg_iov */
	void            *msg_control;   /* [XSI] ancillary data, see below */
	socklen_t       msg_controllen; /* [XSI] ancillary data buffer len */
	int             msg_flags;      /* [XSI] flags on received message */
};
```

* `cmsghdr`：msg_control 缓冲区中辅助数据对象的头。用于提供数据报的额外信息的附加信息。 格式是一串以 cmsghdr 结构为首的信息元素的序列。
  * `cmsg_len`:  附属数据的字节计数，这包含结构头的尺寸。这个值是由 `CMSG_LEN()` 宏计算的
  * `cmsg_level`:  这个值表明了原始的协议级别(例如，`SOL_SOCKET`)
  * `cmsg_type`:  这个值表明了控制信息类型(例如，`SCM_RIGHTS`)
  * `cmsg_data`:  这个成员并不实际存在。他用来指明实际的额外附属数据所在的位置

对 `msg_level` 的描述如下：

| cmsg_level      | 描述                                 |
| --------------- | ------------------------------------ |
| SCM_RIGHTS      | 附属数据对象是一个文件描述符         |
| SCM_CREDENTIALS | 附属数据对象是一个包含证书信息的结构 |

```c
struct cmsghdr {
	socklen_t       cmsg_len;       /* [XSI] data byte count, including hdr */
	int             cmsg_level;     /* [XSI] originating protocol */
	int             cmsg_type;      /* [XSI] protocol-specific type */
/* followed by	unsigned char  cmsg_data[]; */
};
```

AODV 协议认为系统提供的源代码的关于 routine 部分存在 bug，所以通过 `msghdr` 和 `cmsghdr` 结构并重写部分函数来解决这个问题。

* `__cmsg_nxthdr_fix` 
* `cmsg_nxthdr_fix`

其中 `cmsg_nxthdr_fix` 函数调用 `__cmsg_nxthdr_fix` 来完成

* `aodv_socket.c`
  * `aodv_socket_init`
    * 

我们在处理 AODV 协议源代码中的 `socket` 函数时发现了对于 `PF_INET` 量，于我们在高级 C 语言课程中学习的 `AF_INET` 不同。经过在网上的查阅我们可以看到，对于 Windows 系统来说，它在 `Winsock2.h` 中将 `PF_INET` 与 `IF_INET` 等价

```c
#define AF_INET 0
#define PF_INET AF_INET
```

而在 Unix/Linux 系统中，对于 BSD 是 AF，对于 POSIX 是 PF。在 《Unix 网络编程 卷1: 套接字联网 API》书中，我们找到了这一段解释

> `AF_XXX` Versus `PF_XXX`
>
> The "`AF_`" prefix stands for "address family" and the "`PF_`" prefix stands for "protocol family". Historically, the intent was that a single protocol family might support multiple address families and that the `PF_` value was used to create the socket and the `AF_` value was used in socket address structures. But in actuality, a protocol family supporting multiple address families has never been supported and the `<sys/socket.h>` header defines the `PF_` value for a given protocol to be equal to the `AF_` value for that protocol. While there is no guarantee that this equality between the two will always be true, should anyone change this for existing protocols, lots of existing code would break. To conform to existing coding practice, we use only the `AF_` constants in this text, although you may encounter the `PF_` value, mainly in calls to socket.

* `aodv_socket_init`

  * 在函数中第一次使用了 ifreq 结构体，跳转得到其化简后的部分定义如下：

    ```c
    struct  ifreq {
    	char    ifr_name[IFNAMSIZ];             /* if name, e.g. "en0" */
    	union {
    		struct  sockaddr ifru_addr;
    		struct  sockaddr ifru_dstaddr;
    		struct  sockaddr ifru_broadaddr;
    		short   ifru_flags;
    		int     ifru_metric;
    		int     ifru_mtu;
    		int     ifru_phys;
    		int     ifru_media;
    		int     ifru_intval;
    		caddr_t ifru_data;
    		struct  ifdevmtu ifru_devmtu;
    		struct  ifkpi   ifru_kpi;
    		u_int32_t ifru_wake_flags;
    		u_int32_t ifru_route_refcnt;
    		int     ifru_cap[2];
    		u_int32_t ifru_functional_type;
    	} ifr_ifru;
    };
    ```

    结构体中包含了两部分，包括接口 interface 的名称和一个 union 类型的定义。ifreq 为接口请求结构，用于套接字 ioctl 的接口请求结构。 所有的接口 IOctl 必须有参数定义，该定义以 ifr_name 开头。 其余的其余的可以是特定的接口。

  * socket 初始化 udp 数据包时，会查看 `this_host.nif` 即 number of interface to boardcast on。若为 0 则异常退出。

  * 在 socket 部分有非常多的内容在高级 C 语言课程 Unix 网络编程中学到过，如 `socket(PF_INET, SOCK_DGRAM, IPPROTO_UDP)` 来创建 UDP 包，但在 aodv 协议中，均使用了 `PF_INET` 来替换原始的 `AF_INET`

  * 在 Unix Network Programming 中，作者提到他建议使用 `bzero` 来替换 `memset(&aodv_addr, 0, sizeof(aodv_addr))`，我们组成员也查阅了这两种在内存层面上对其赋值为 0 的区别。`bcopy`、`bzero` 和 `bcmp` 是传统 BSD 的函数，属于 POSIX 标准；`mem*` 是 C90 (以及 C99)标准的 C 函数。区别在于，如果你打算把程序弄到一个符合 C90/C99，但是不符合 POSIX 标准的平台时，后者会更有优势。但是 `memset` 函数的第二和第三个参数需要单独记忆

    > C has memset(), the Berkeley UNIX C library has **bzero**(). They are not
    > identical, and **bzero**() pre dates memset() but is not widely available (since
    > it's not part of standard C

  * 函数中通过 `setsockopt` 给 socket 设置了以下的字段选项：

    * `SOL_SOCKET` - `SO_BROADCAST`：允许发送广播数据包
    * `SOL_SOCKET` - `SO_BINDTODEVICE`：将套接字绑定到指定接口
    * `SOL_SOCKET` - `SO_PRIORITY`：设置在套接字发送的所有包的协议定义优先权
    * `SOL_SOCKET` - `SO_RCVBUF`：接受缓冲区大小
    * `SOL_IP` - `IP_RECVTTL`：传送一条带有用一个字节表示的接收包生存时间字段的 IP_RECVTTL 控制信息
    * `SOL_IP` - `IP_PKTINFO`：获取接收报文的相关信息，也可在发送报文时指定报文的相关控制信息

  * aodv 将 receive buffer size 设定为了 1024 并且不允许修改（没有通过 `#define` 或其他形式提供便于修改的方法）

    ```c
    if (setsockopt(DEV_NR(i).sock, SOL_SOCKET, SO_RCVBUF,
                   (char *)&bufsize, optlen) == 0)
    {
        alog(LOG_NOTICE, 0, __FUNCTION__,
             "Receive buffer size set to %d", bufsize);
        break;
    }
    if (bufsize < RECV_BUF_SIZE)
    {
        alog(LOG_ERR, 0, __FUNCTION__,
             "Could not set receive buffer size");
        exit(-1);
    }
    ```

* `aodv_socket_process_packet`

  * 确保邻居节点已经被添加或更新
  * 判断消息报文类型
    * 通过 `type == RREP & ttl == 1 & dst.s_addr == AODV_BROADCAST` 判断是否为 Hello 包，并调用 hello_process 来对 Hello 包进行处理
    * `AODV_RREQ`: `rreq_process((RREQ *)aodv_msg, len, src, dst, ttl, ifindex)`
    * `AODV_RREP`: `rrep_process((RREP *)aodv_msg, len, src, dst, ttl, ifindex)`
    * `AODV_RERR`: `rerr_process((RERR *)aodv_msg, len, src, dst)`
    * `AODV_RREP_ACK`: `rrep_ack_process((RREP_ack *)aodv_msg, len, src, dst)`

* `aodv_socket_read`

  * 本函数负责读取并调用 `aodv_socket_process_packet` 处理 AODV socket 包，在 NS-2 系统中，函数为 `recvAODVUUPacket`
  * 通过 `recvmsg(fd, &msgh, 0)`  读取 socket，并从控制信息中获取 ttl 和目标地址。通过判断 `cmsg->cmsg_type`
    * `IP_TTL`: `ttl = *(CMSG_DATA(cmsg));`
    * `IP_PKTINFO`: `struct in_pktinfo *pi = (struct in_pktinfo *)CMSG_DATA(cmsg); dst.s_addr = pi->ipi_addr.s_addr;`
  * 若 TTL 为负值，则异常，并进行空返回
  * 通过 `devfromsock` 尝试将 `sockf` 转换为 `dev_info`，对转换错误即空指针的返回同样按照异常处理并进行空返回

* `aodv_socket_send`

  * 本函数负责发送 AODV socket 数据包

  * 不处理 AODV_RREP 数据包，并且当 `wait_on_reboot` 被设置为真时也不再发送数据包

  * 设置 socket 的 TTL 值

    ```c
    setsockopt(dev->sock, SOL_IP, IP_TTL, &ttl, sizeof(ttl))
    ```

  * 如果速率限制被启用，检查我们是否正在发送一个 RREQ 或 RERR。在这种情况下，丢弃传出的控制数据包。如果距离上次发送该类型的数据包的时间少于或小于允许的 RATE LIMIT 时间

* `aodv_socket_new_msg`

  * 为新产生的数据包发送缓冲空间

* `aodv_socket_queue_msg`

  * 把一个AODV消息存储在发送缓冲区中

* `aodv_socket_clean`

  * 清空套接字信息并关闭

对部分 Socket 函数的详细解释将放在内容中

---

## `RREQ`

```c
0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|     Type      |J|R|G|D|U|      Reserved       |   Hop Count   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                            RREQ ID                            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Destination IP Address                     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                  Destination Sequence Number                  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Originator IP Address                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                  Originator Sequence Number                   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```


疑问🤔️：代码实际没有 U 标志

```c
typedef struct {
    u_int8_t type;
#if defined(__LITTLE_ENDIAN)
    u_int8_t res1:4;
    u_int8_t d:1;
    u_int8_t g:1;
    u_int8_t r:1;
    u_int8_t j:1;
#elif defined(__BIG_ENDIAN)
    u_int8_t j:1;    /* Join flag (multicast) */
    u_int8_t r:1;    /* Repair flag */
    u_int8_t g:1;    /* Gratuitous RREP flag */
    u_int8_t d:1;    /* Destination only respond */
    u_int8_t res1:4;
#else
#error "Adjust your <bits/endian.h> defines"
#endif
    u_int8_t res2;
    u_int8_t hcnt;
    u_int32_t rreq_id;
    u_int32_t dest_addr;
    u_int32_t dest_seqno;
    u_int32_t orig_addr;
    u_int32_t orig_seqno;
} RREQ;
```


- `aodv_rreq.c`
	- `rare_create`
		- 创建 `RREQ` 并初始化
		- seq number increase（0 仍为 0，最大值时变为 1，其他正常 +1）
			- 当某一节点要产生 RREQ 洪泛，必须先增大自身序列号
		- `flag` 匹配并给对应的值赋 1
			```c
			/* RREQ Flags: */
			#define RREQ_JOIN          0x1
			#define RREQ_REPAIR        0x2
			#define RREQ_GRATUITOUS    0x4
			#define RREQ_DEST_ONLY     0x8
			```
			
			- 疑问🤔️：为什么不直接用数组记录，或直接使用 `flag` 记录？目前用于匹配的代码如下
				```c
				if (flags & RREQ_JOIN)
				    rreq->j = 1;
				if (flags & RREQ_REPAIR)
				    rreq->r = 1;
				if (flags & RREQ_GRATUITOUS)
				    rreq->g = 1;
				if (flags & RREQ_DEST_ONLY)
				    rreq->d = 1;
				```
				
				- 解释：可以同时有多个 `flag`
			- `rreq_add_ext`
				- 用于对 RREQ 进行补充
				- 存放于 `(AODV_ext *)((char *)rreq + offset)`
					- `offset` 应大于或等于 `RREQ_SIZE`
				- `AODV_ext` 存储信息
					```c
					/* An generic AODV extensions header */
					typedef struct
					{
					    u_int8_t type;
					    u_int8_t length;
					    /* Type specific data follows here */
					} AODV_ext;
					
					```
					
					- `type`
					- `length`
				- 将 data 复制到 `((char *)((char *)ext + sizeof(AODV_ext))`
			- `rreq_send`
				- `struct in_addr`
				- `apr_uint32_t`
					```c
					struct in_addr {
					    apr_uint32_t  s_addr; /**< storage to hold the IP# */
					};
					```
					
					- `unsigned int`
				```c
				dest.s_addr = AODV_BROADCAST;
				```
				
				```c
				/* Broadcast on all interfaces */
				for (i = 0; i < MAX_NR_INTERFACES; i++)
				{
				    if (!DEV_NR(i).enabled)
				        continue;
				    rreq = rreq_create(flags, dest_addr, dest_seqno, DEV_NR(i).ipaddr);
				    aodv_socket_send((AODV_msg *)rreq, dest, RREQ_SIZE, ttl, &DEV_NR(i));
				}
				```
				
				- 广播 `dest.s_addr = AODV_BROADCAST;`
				- 创建 RREQ 并发送报文
					```c
					rreq = rreq_create(flags, dest_addr, dest_seqno, DEV_NR(i).ipaddr);
					aodv_socket_send((AODV_msg *)rreq, dest, RREQ_SIZE, ttl, &DEV_NR(i));
					
					```
					
				- `rreq_forward`
					- 记录目的和源
						```c
						dest.s_addr = AODV_BROADCAST;
						orig.s_addr = rreq->orig_addr;
						
						```
						
					- 若 TTL 仍然大于 0 时继续转发
					- 报文进入队列 `send_buf`，等待发送
						```C
						rreq = (RREQ *)aodv_socket_queue_msg((AODV_msg *)rreq, size);
						```
						
					- 增加跳数 hcnt `rreq->hcnt++;`
					- 转发发送缓冲区 `send_buf` 中的报文
					- 疑问🤔️：转发时 TTL-1 操作没有找到
						- 回答：forward 中只转发，在 process 中找到如下的对 TTL 的处理
						```c
						if (ip_ttl > 1)
						{
						    /* Update the sequence number in case the maintained one is
						     * larger */
						    if (fwd_rt && !(fwd_rt->flags & RT_INET_DEST) &&
						        (int32_t)fwd_rt->dest_seqno > (int32_t)rreq_dest_seqno)
						        rreq->dest_seqno = htonl(fwd_rt->dest_seqno);
						                                                                
						    rreq_forward(rreq, rreqlen, --ip_ttl);
						}
						else
						{
						    DEBUG(LOG_DEBUG, 0, "RREQ not forwarded - ttl=0");
						}
						
						```
						
						- 当 TTL 大于 1 时，判断并转发 `—-ip_ttl` 的包
					- `rreq_process`
						- 目的和源的初始化
							```c
							rreq_dest.s_addr = rreq->dest_addr;
							rreq_orig.s_addr = rreq->orig_addr;
							rreq_id = ntohl(rreq->rreq_id);
							rreq_dest_seqno = ntohl(rreq->dest_seqno);
							rreq_orig_seqno = ntohl(rreq->orig_seqno);
							rreq_new_hcnt = rreq->hcnt + 1;
							
							```
							
						- 忽略由本节点开始发送的包
							```c
							if (rreq_orig.s_addr == DEV_IFINDEX(ifindex).ipaddr.s_addr)
							    return;
							
							```
							
						- 检查接收到的 RREQ 包的上一跳是否在黑名单中，若在则忽略该包
							```c
							if (rreq_blacklist_find(ip_src))
							{
							    DEBUG(LOG_DEBUG, 0, "prev hop of RREQ blacklisted, ignoring!");
							    return;
							}
							
							```
							
						- 忽略已经处理过的 RREQ 包，防止发生网络风暴
							```c
							if (rreq_record_find(rreq_orig, rreq_id))
							    return;
							
							```
							
						- 疑问🤔️：是否可以通过将检查操作前置到函数内初始化之前，小幅度提升运算速度
						- 缓存接收到的 RREQ 包，下次接收到相同包时可以忽略不进行处理
							```c
							rreq_record_insert(rreq_orig, rreq_id);
							```
							
						- 通过 rreqlen 和 extlen 处理分割 RREQ 包
						- 路由发现 `rt_table_find`
							- 若路由表中没有存储过目的节点，则添加到路由表中 `rt_table_insert`
							- 若发现已经存储过的记录，则尝试计算出开销最小的路径并更新
								```c
								life = PATH_DISCOVERY_TIME - 2 * rreq_new_hcnt * NODE_TRAVERSAL_TIME;
								
								```
								
								```c
								if (rev_rt->dest_seqno == 0 ||
								    (int32_t)rreq_orig_seqno > (int32_t)rev_rt->dest_seqno ||
								    (rreq_orig_seqno == rev_rt->dest_seqno &&
								     (rev_rt->state == INVALID || rreq_new_hcnt < rev_rt->hcnt)))
								{
								    rev_rt =
								        rt_table_update(rev_rt, ip_src, rreq_new_hcnt, rreq_orig_seqno,
								                        life, VALID, rev_rt->flags);
								}
								
								```
								
							- 判断自己是否为目的节点
								- 若是目的节点，终止 RREQ，开始 RREQ 过程，更新最大序列号
									```c
									if (rreq_dest.s_addr == DEV_IFINDEX(ifindex).ipaddr.s_addr)
									{
									                                                                           
									    /* WE are the RREQ DESTINATION. Update the node's own
									       sequence number to the maximum of the current seqno and the
									       one in the RREQ. */
									    if (rreq_dest_seqno != 0)
									    {
									        if ((int32_t)this_host.seqno < (int32_t)rreq_dest_seqno)
									            this_host.seqno = rreq_dest_seqno;
									        else if (this_host.seqno == rreq_dest_seqno)
									            seqno_incr(this_host.seqno);
									    }
									    rrep =
									        rrep_create(0, 0, 0, DEV_IFINDEX(rev_rt->ifindex).ipaddr,
									                    this_host.seqno, rev_rt->dest_addr, MY_ROUTE_TIMEOUT);
									                                                                           
									    rrep_send(rrep, rev_rt, NULL, RREP_SIZE);
									}
									
									```
									
								- 若不是目的节点，则查看是否包含目的节点的路由信息
									- 若有则回复 RREP
									- 若没有则继续广播 RREQ
									```c
									else
									{
									    /* We are an INTERMEDIATE node. - check if we have an active
									     * route entry */
									                                                                          
									    fwd_rt = rt_table_find(rreq_dest);
									                                                                          
									    if (fwd_rt && fwd_rt->state == VALID && !rreq->d)
									    {
									        struct timeval now;
									        u_int32_t lifetime;
									                                                                          
									        /* GENERATE RREP, i.e we have an ACTIVE route entry that is fresh
									           enough (our destination sequence number for that route is
									           larger than the one in the RREQ). */
									                                                                          
									        gettimeofday(&now, NULL);
									                                                                          
									        /* Respond only if the sequence number is fresh enough... */
									        if (fwd_rt->dest_seqno != 0 &&
									            (int32_t)fwd_rt->dest_seqno >= (int32_t)rreq_dest_seqno)
									        {
									            lifetime = timeval_diff(&fwd_rt->rt_timer.timeout, &now);
									            rrep = rrep_create(0, 0, fwd_rt->hcnt, fwd_rt->dest_addr,
									                               fwd_rt->dest_seqno, rev_rt->dest_addr,
									                               lifetime);
									            rrep_send(rrep, rev_rt, fwd_rt, rrep_size);
									        }
									        else
									        {
									            goto forward;
									        }
									        /* If the GRATUITOUS flag is set, we must also unicast a
									           gratuitous RREP to the destination. */
									        if (rreq->g)
									        {
									            rrep = rrep_create(0, 0, rev_rt->hcnt, rev_rt->dest_addr,
									                               rev_rt->dest_seqno, fwd_rt->dest_addr,
									                               lifetime);
									                                                                          
									            rrep_send(rrep, fwd_rt, rev_rt, RREP_SIZE);
									                                                                          
									            DEBUG(LOG_INFO, 0, "Sending G-RREP to %s with rte to %s",
									                  ip_to_str(rreq_dest), ip_to_str(rreq_orig));
									        }
									        return;
									    }
									forward:
									    if (ip_ttl > 1)
									    {
									        /* Update the sequence number in case the maintained one is
									         * larger */
									        if (fwd_rt && !(fwd_rt->flags & RT_INET_DEST) &&
									            (int32_t)fwd_rt->dest_seqno > (int32_t)rreq_dest_seqno)
									            rreq->dest_seqno = htonl(fwd_rt->dest_seqno);
									                                                                          
									        rreq_forward(rreq, rreqlen, --ip_ttl);
									    }
									    else
									    {
									        DEBUG(LOG_DEBUG, 0, "RREQ not forwarded - ttl=0");
									    }
									}
									```
									

---

## `RREP`

```c
0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|     Type      |R|A|    Reserved     |Prefix Sz|   Hop Count   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                     Destination IP address                    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                  Destination Sequence Number                  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Originator IP address                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                           Lifetime                            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

* `rrep_create`

  * 通过 `aodv_socket_new_msg` 创建 socket message，并进行初始化

    ```c
    rrep->type = AODV_RREP;
    rrep->res1 = 0;
    rrep->res2 = 0;
    rrep->prefix = prefix;
    rrep->hcnt = hcnt;
    rrep->dest_addr = dest_addr.s_addr;
    rrep->dest_seqno = htonl(dest_seqno);
    rrep->orig_addr = orig_addr.s_addr;
    rrep->lifetime = htonl(life);
    ```

  * 对 flag 进行位判断，并将对应在 message 中的位置 1

    ```c
    if (flags & RREP_REPAIR)
        rrep->r = 1;
    if (flags & RREP_ACK)
        rrep->a = 1;
    ```

* `rrep_ack_create`

  * 创建 socket message，初始化仅需要将其类型设置为 ACK 包

    ```c
    rrep_ack->type = AODV_RREP_ACK;
    ```

* `rrep_ack_process`

  * 处理 ACK 包时，先在路由表中查找其源 ip，然后删除这个 RREP_ACK 包还未到期的计时器

    ```c
    timer_remove(&rt->ack_timer);
    ```

* `rrep_add_ext`

  * 通 RREQ 时的处理，在 `(AODV_ext *)((char *)rrep + offset)` 位置添加 extension 信息。存储类型和长度信息

* `rrep_send`

  * 检查我们是否应该请求 `RREP_ACK`。如果收到 RREQ 的节点是邻居，则可能面临单向链路，最好请求一个`RREP_ACK`

    ```c
    if (neighbor && neighbor->state == VALID && !neighbor->ack_timer.used)
    {
        rrep_flags |= RREP_ACK;
        neighbor->flags |= RT_UNIDIR;
                                                                           
        /* Must remove any pending hello timeouts when we set the
           RT_UNIDIR flag, else the route may expire after we begin to
           ignore hellos... */
        timer_remove(&neighbor->hello_timer);
        neighbor_link_break(neighbor);
                                                                           
        DEBUG(LOG_DEBUG, 0, "Link to %s is unidirectional!",
              ip_to_str(neighbor->dest_addr));
                                                                           
        timer_set_timeout(&neighbor->ack_timer, NEXT_HOP_WAIT);
    }
    ```

  * 设置 `RT_UNIDIR` 标志时，必须删除所有待处理的 Hello 超时，否则路由可能会在开始忽略 Hello 之后终止

    ```c
    if (fwd_rt)
    {
        precursor_add(fwd_rt, rev_rt->next_hop);
        precursor_add(rev_rt, fwd_rt->next_hop);
    }
    ```

* `rrep_forward`

  * 检查是否应该请求 `RREP_ACK`，如果RREP的来源不是一个邻居，我们必须找到邻居条目，它是通往 RREP 源的下一跳。如果我们接收到 RREQ 的节点是邻居，则我们可能正面临单向链路，最好请求一个 `RREP_ACK`

  * 疑问🤔️：AODV 源码的作者在这里也没有弄明白，他们认为这里存在一个单向的连接，于是作者暂且使用了 `if(0)` 让这段代码仅仅存在于程序中但是不会被执行

    > we suspect a unidirectional link

* `rrep_process`

  * 在 RREP 的处理中，将 RREP 包中的地址信息提取出来放入四元组中

    ```c
    rrep_dest.s_addr = rrep->dest_addr;
    rrep_orig.s_addr = rrep->orig_addr;
    rrep_seqno = ntohl(rrep->dest_seqno);
    rrep_lifetime = ntohl(rrep->lifetime);
    ```

  * 考虑到中间节点的情况，增加RREP跳数

    ```c
    rrep_new_hcnt = rrep->hcnt + 1;
    ```

  * 在 RREQ 的处理时，会忽略那些旨在建立一条通往自我的路线的信息

    ```c
    if (rrep_dest.s_addr == DEV_IFINDEX(ifindex).ipaddr.s_addr)
        return;
    ```

  * 对 RREQ 包是否还有 extension 进行判断，并将其放入 ext 变量中

  * 检查是否应该进行前进的路线。若没有现有条目，则插入一个新条目。若有，则更新条目

    ```c
    fwd_rt = rt_table_find(rrep_dest);
    rev_rt = rt_table_find(rrep_orig);
                                                                               
    if (!fwd_rt)
    {
        fwd_rt = rt_table_insert(rrep_dest, ip_src, rrep_new_hcnt, rrep_seqno,
                                 rrep_lifetime, VALID, rt_flags, ifindex);
    }
    else if (fwd_rt->dest_seqno == 0 ||
             (int32_t)rrep_seqno > (int32_t)fwd_rt->dest_seqno ||
             (rrep_seqno == fwd_rt->dest_seqno &&
              (fwd_rt->state == INVALID || fwd_rt->flags & RT_UNIDIR ||
               rrep_new_hcnt < fwd_rt->hcnt)))
    {
        pre_repair_hcnt = fwd_rt->hcnt;
        pre_repair_flags = fwd_rt->flags;
                                                                               
        fwd_rt =
            rt_table_update(fwd_rt, ip_src, rrep_new_hcnt, rrep_seqno,
                            rrep_lifetime, VALID, rt_flags | fwd_rt->flags);
    }
    else
    {
        if (fwd_rt->hcnt > 1)
        {
            DEBUG(LOG_DEBUG, 0,
                  "Dropping RREP, fwd_rt->hcnt=%d fwd_rt->seqno=%ld",
                  fwd_rt->hcnt, fwd_rt->dest_seqno);
        }
        return;
    }
    ```

  * 如果设置了 `RREP_ACK` 标志，将 RREP 确认发送到所答复的目的地，并移除 `RREP_ACK` 标志

    ```c
    if (rrep->a)
    {
        RREP_ack *rrep_ack;
                                                                                
        rrep_ack = rrep_ack_create();
        aodv_socket_send((AODV_msg *)rrep_ack, fwd_rt->next_hop, NEXT_HOP_WAIT,
                         MAXTTL, &DEV_IFINDEX(fwd_rt->ifindex));
        /* Remove RREP_ACK flag... */
        rrep->a = 0;
    }
    ```

  * 如果路由以前处于修复状态，应该向路由源发送 `NO DELETE RERR`，这样它就可以选择为目的地重新启动路由发现。通过这样的方式可以修正一个导致修复标志未被设置和 `RERR` 从未被发送的错误。


---

## `RERR`

```c
0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|     Type      |N|          Reserved           |   DestCount   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Unreachable Destination IP Address (1)             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Unreachable Destination Sequence Number (1)           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-|
|  Additional Unreachable Destination IP Addresses (if needed)  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Additional Unreachable Destination Sequence Numbers (if needed)|
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

* `rerr_create`
  * RERR 的创建和初始化与 RREQ 和 RREP 类似，故这里不再赘述
* `rerr_add_udest`
  * 添加 RERR 信息，与 RREQ 和 RREP 中的 ext 类似，均为在内存中结构体后面添加附加信息
* `rerr_process`
  * 在处理 RERR 消息时，会检查哪些目的节点时不可达的。根据作者的描述，这些内容仍然只是草案
  * 使用数据包中的目标序列号更新相应的目标序列号。检查前驱列表是否为空。如果不为空，则将该目标作为 RERR 中的不可访问目标。确定是否有新的前驱使它成为非单播 RERR 并删除所有无法到达的目的地的先驱列表
  * 如果创建了 RERR 消息，则立即发送，同样需要经过路由发现等过程。仅在具有中断路由的先驱节点的那些接口上发送 RERR

---

## `HELLO`

* `hello_start`

  * 若计时器 used 则消息已经发送

  * 设定计时器，与 Hello 进行绑定

    ```c
    timer_init(&hello_timer, &NS_CLASS hello_send, NULL);
    hello_send(NULL);
    ```

* `hello_stop`

  * 移除计时器即为停止

    ```c
    timer_remove(&hello_timer);
    ```

* `hello_send`

  * 检测发送 Hello 消息是否有必要，通过判断 `time_diff >= HELLO_INTERVAL` 以防我们已经在HELLO_INTERVAL内发送了其他广播信息

* `hello_process`

  * 处理 Hello 消息时，仅需要存储目的节点的信息，不需要完整的四元组。同样经过路由发现过程，并检测是否有补充信息

  * 邻居节点应该只在收到3个连续的 Hello 消息后才有效

    ```c
    if (receive_n_hellos)
        state = INVALID;
    else
        state = VALID;
    ```

  * 在对时间的判断上，Hello 消息的处理为允许的时延与发送包的数量相乘后加入路由的时延

    ```c
    timeout = ALLOWED_HELLO_LOSS * hello_interval + ROUTE_TIMEOUT_SLACK;
    ```

  * 最后通过 `hello_update_timeout` 更新 timeout 信息，而 `hello_update_timeout` 函数调用计时器的更新方法

    ```c
    timer_set_timeout(&rt->hello_timer, time + HELLO_DELAY);
    ```


---

## `RREP_ACK`

```c
0                   1
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|     Type      |   Reserved    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```


----

## 关于`_t`后缀

> but most often you will use <inttypes.h> which (unusually for standard C headers) includes <stdint.h>. It (<inttypes.h>) also defines macros for use with the printf() and scanf().
> 
> As Matt Curtis noted, there is no significance to the compiler in the suffix; it is a human-oriented convention.
> 
> However, you should also note that POSIX defines a lot of extra type names ending in '_t', and reserves the suffix for the implementation. That means that if you are working on POSIX-related systems, defining your own type names with the convention is ill-advised. The system I work on has done it (for more than 20 years); we regularly get tripped up by systems defining types with the same name as we define.
> 
> CesarB:
> 
> I use _type instead of _t on my typedefs precisely to avoid that.
> 
> [Reference](https://stackoverflow.com/questions/231760/what-does-a-type-followed-by-t-underscore-t-represent)


推测 AODV 作者意为对本身 `struct struct_name` 的替换，使得所有 `struct_name_t` 都为对应 `struct struct_name` 的 `typedef`，但是根据网上所查阅的资料，除非对系统内核等有深入了解，对于非内核级别代码并不推荐这样命名，可能会与 POSIX 相关的代码起冲突

---

{% endnote %}
