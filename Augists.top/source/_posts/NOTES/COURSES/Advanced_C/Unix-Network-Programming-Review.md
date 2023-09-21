---
title: Unix Network Programming Review
tags: [NOTE, SHARING]
description: 'Base on Copyright (c) Dingsoul<br>Link: https://dingiso.github.io/2021/03/13/UNIX%20%E9%AB%98%E7%BA%A7%E7%BD%91%E7%BB%9C%E7%BC%96%E7%A8%8B%E5%A4%8D%E4%B9%A0/'
date: 2021-12-16 15:52:12

---

{% note warning %}

大小端
```c
#include"stdio.h"

int main()
{
  union un
  {
    short a;
    char b[sizeof(short)];
  }u;

  u.a = 0x0102;

  if(u.b[0] == 1 && u.b[1] == 2)
    printf("big endian");
  else if(u.b[0] == 2 && u.b[1] == 1)
    printf("small endian");
  else
    printf("unknown");
  return 0;
}
```

---

`intro/daytimetcpcli.c`

```c
#include "unp.h"

int main(int argc, char **argv)
{
  int sockfd, n;
  char recvline[MAXLINE + 1];
  struct sockaddr_in servaddr;

  if (argc != 2)
    err_quit("usage: a.out <IPaddress>");

  if ( (sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0)
    err_sys("socket error");

  bzero(&servaddr, sizeof(servaddr));
  servaddr.sin_family = AF_INET;
  servaddr.sin_port = htons(13);
  if (inet_pton(AF_INET, argv[1], &servaddr.sin_addr) <= 0)
    err_quit("inet_pton error for %s", argv[1]);

  if (connect(sockfd, (SA *) &servaddr, sizeof(servaddr)) < 0)
    err_sys("connect error");

  while ( (n = read(sockfd, recvline, MAXLINE)) > 0) {
    recvline[n] = 0;
    if (fputs(recvline, stdout) == EOF)
      err_sys("fputs error");
  }
  if (n < 0)
    err_sys("read error");

  exit(0);
}
```

`intro/daytimetcpsrv.c`

```c
#include "unp.h"
#include <time.h>

int main(int argc, char **argv)
{
  int listenfd, connfd;
  struct sockaddr_in servaddr;
  char buff[MAXLINE];
  time_t ticks;

  listenfd = Socket(AF_INET, SOCK_STREAM, 0);

  bzeros(&servaddr, sizeof(servaddr));
  servaddr.sin_family = AF_INET;
  servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
  servaddr.sin_port = htons(13);

  Bind(listenfd, (SA *) &servaddr, sizeof(servaddr));

  Listen(listenfd, LISTENQ);

  for ( ; ; ) {
    connfd = Accept(listenfd, (SA *) NULL, NULL);

    ticks = time(NULL);
    snprintf(buff, sizeof(buff), "%.24s\r\n", ctime(&ticks));
    Write(connfd, buff, strlen(buff));

    Close(connfd);
  }
}
```

---

Concurrent Server

```c
pid_t pid;
int listenfd, connfd;

listenfd = Socket ( ... );

Bind(listenfd, ... );
Listen(listenfd, LISTENQ);

for ( ; ; ) {
  connfd = Accept(listenfd, ... );

  if ( (pid = Fork()) == 0) {
    Close(listenfd);  /* child closes listening socket */
    doit(connfd);     /* process the request */
    Close(connfd);    /* done with this client */
    exit(0);          /* child terminates */
  }

   Close(connfd);     /* parent close connected socket */
}
```

---

TCP echo server
`tcpdiserv/tcpserv01.c`

```c
#include "unp.h"

void str_echo(int sockfd)
{
  ssize_t n;
  char buf[MAXLINE];

again:
  while ( (n = read(sockfd, buf, MAXLINE)) > 0)
    Writen(sockfd, buf, n);

  if (n < 0 && errno == EINTR)
    goto again;
  else if (n < 0)
    err_sys("str_echo: read error");
}

int main(int argc, char **argv)
{
  int listenfd, connfd;
  pid_t childpid;
  socklen_t clilen;
  struct sockaddr_in cliaddr, servaddr;

  listenfd = Socket (AF_INET, SOCK_STREAM, 0);

  bzero(&servaddr, sizeof(servaddr));

  servaddr.sin_family = AF_INET;
  servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
  servaddr.sin_port(SERV_PORT);

  Bind(listenfd, (SA *)&servaddr, sizeof(servaddr));
  Listen(listenfd, LISTENQ);

  for ( ; ; )
  {
    clilen = sizeof(cliaddr);
    connfd = Accept(listenfd, (SA *) &cliaddr, &clilen);

    if ( (childpid = fork()) == 0)
    {
      Close(listenfd);
      str_echo(connfd);
      exit(0);
    }
    Close(connfd);
  }
}
```

`tcpcliserv/tcpcli01.c`

```c
#include "unp.h"

void str_cli(FILE *fp, int sockfd)
{
  char sendline[MAXLINE], recvline[MAXLINE];

  while (Fgets(sendline, MAXLINE, fp) != NULL)
  {
    Writen(sockfd, sendline, strlen(sendline));

    if (Readline(sockfd, recvline, MAXLINE) == 0)
      err_quit("str_cli: server terminated prematurely");

    Fputs(recvline, stdout);
  }
}

int main(int argc, char **argv)
{
  int sockfd;
  struct sockaddr_in servaddr;

  if (argc != 2)
    err_sys("usage: tcpcli <IPaddress>");

  sockfd = Socket(AF_INET, SOCK_STREAM, 0);

  bzero(&servaddr, sizeof(servaddr));
  servaddr.sin_family = AF_INET;
  servaddr.sin_port = htons(SERV_PORT);
  Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

  Connect(sockfd, (SA *)&servaddr, sizeof(servaddr));

  str_cli(stdin, sockfd);

  exit(0);
}
```

---

UDP echo server
`udpcliserv/udpserv01.c`

```c
#include "unp.h"

void dg_echo(int sockfd, SA *pcliaddr, socklen_t clilen)
{
  int n;
  socklen_t len;
  char mesg[MAXLINE];

  for ( ; ; )
  {
    len = clilen;
    n = Recvfrom(sockfd, mesg, MAXLINE, 0, pcliaddr, &len);
    Sendto(sockfd, mesg, n, 0, pcliaddr, len);
  }
}

int main(int argc, char **argv)
{
  int sockfd;
  struct sockaddr_in servaddr, cliaddr;

  sockfd = Socket(AF_INET, SOCK_DGRAM, 0);

  bzero(&servaddr, sizeof(servaddr));
  servaddr.sin_family = AF_INET;
  servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
  servaddr.sin_port = htons(SERV_PORT);

  Bind(sockfd, (SA *)&servaddr, sizeof(servaddr));

  dg_echo(sockfd, (SA *)&cliaddr, sizeof(cliaddr));
}
```

UDP echo client
`udpcliserv/udpcli01.c`

```c
include "unp.h"

void dg_cli(FILE *fp, int sockfd, const SA *pservaddr, socklen_t servlen)
{
  int n;
  char sendline[MAXLINE], recvline[MAXLINE + 1];

  while (Fgets(sendline, MAXLINE, fp) != NULL)
  {
    Sendto(sockfd, sendline, strlen(sendline), 0, pservaddr, servlen);

    n = Recvfrom(sockfd, recvline, MAXLINE, 0, NULL, NULL);
    recvline[n] = 0;
    Fputs(recvline, stdout);
  }
}

int main(int argc, char **argv)
{
  int sockfd;
  struct sockaddr_in servaddr;

  if (argc != 2)
    err_quit("usage: udpcli <IPaddress>");

  bzero(&servaddr, sizeof(servaddr));
  servaddr.sin_family = AF_INET;
  servadr.sin_port = htons(SERV_PORT);
  Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

  sockfd = Socket(AF_INET, SOCK_DGRAM, 0);

  dg_cli(stdin, sockfd, (SA *)&servaddr, sizeof(servaddr));
}
```

---

信号处理
```c
//调用:Signal(SIGCHID,sig_chld);
void sig_chld(int signo)
{
    pid_t pid;
    int stat;   //value-result para
    while ((pid = waitpid(-1, &stat, WNOHANG)) > 0)
        printf("child %d terminated\n", pid);
    return;
}
```

* waitpid 可以通过指定 pid，指定终止某个子进程，wait 不能
* 在没有已经终止的子进程时，waitpid 可以不阻塞，但 wait 会阻塞，直到正在执行的子进程终止。

---

* 解释datalink access，写出一个datalink access的实现
  * 操作系统为应用程序提供访问数据链路层的功能，这种功能可提供如下能力:
    * 能够监视由数据链路层接收的分组
    * 能够作为普通应用进程而不是内核的一部分运行某些程序，例如: RARP
  ```c
  fd=socket(PF_PACKET,SOCK_RAW,htons(ETH_P_ALL));
  ```

---

* 写出重启被中断的accept函数程序片段
```c
for ( ; ; ) {
  clilen = sizeof(cliaddr);
  if (connfd = accept(listenfd, (SA *)&cliaddr, &clilen) < 0 )
  {
    if (errno == EINTR)
      continue;
    else
      err_sys("accept error");
  }
}
```

---

* TCP echo 程序如何区分服务器进程终止和服务器崩溃
  * 进程终止: 客户端收到一个 FIN 并返回一个 ACK，但客户进程此时处于 fgets 调用的阻塞中，等待从客户端接收到一行文本。(此时客户端并不知道服务器子进程已经终止，只是单纯的接收到了一个 FIN) 而后，我们在客户上再键入一行文本。`str_cli` 调用 writen 发送数据给服务子进程，但由于服务子进程已经关闭，于是发送一个RST。我们客户端 readline 时若先收到第二步中的 FIN，则立即返回 0，如果先接收到 RST，则返回一个 `ECONNRESET` (对方复位连接错误)
  * 服务器崩溃: 在客户端上键入一行文本，由 writen 写入内核。writen 成功返回后，客户随后阻塞于 readline 调用，客户端持续重传数据分节，试图从服务器上接收一个 ACK。然而服务器已崩坏，没有任何响应，最终 readline 调用上返回一个错误。如果是主机崩溃，则返回超时 `ETIMEOUT`
  * 进程终止: 服务器发送 FIN
  * 崩溃: 服务器不会在已有网络上发送任何信号

---

* `fork()` 和 `exec()`
  * fork
    * 子进程复制父进程的所有进程内存到其内存地址空间。父，子进程的数据段，堆栈段和代码段完全相同
    * 子进程拥有自己的进程ID
  * exec
    * 进程调用 `exec()` 后，将在同一块进程内存里用一个新程序来代替调用 `exec()` 的那个进程，当前进程的“数据段”，“堆栈段”和“代码段”被新程序改写
    * 新程序会保持调用 `exec()` 进程的 ID 不变

---

* 原始套接字提供的三种UDP/TCP不具备的特点
  * 读写ICMPv4，ICMPv6，IGMPv4分组
  * 读写内核不处理其协议字段的IPv4数据报
  * 使用 `IP_HDRINCL` 套接字选项自行构造IPv4首部

---

* defunct
  * 进程所谓的“僵死”状态。一个子进程结束了，但是它的父进程并没有 wait/waitpid 它，则它的状态是 defunct，进程早已死亡，但仍占有一个 pid

---

* traceroute
  * 原理是利用了IPv4的TTL字段或IPv6的跳限字段，一开始设置为1，然后中间节点会返 回一个ICMP”time exceeded in transmit”(传输中超时)错误，接着逐渐增大TTL，从而逐 步确定下一跳路由地址。直至目的节点返回一个ICMP”port unreachable”(端口不可达)错 误，则表示到达目的节点(这要求目的节点没有在该端口上开启服务，即发送ICMP包时，目 的端口号应该选择一个未被目的主机使用的端口号 ==> traceroute选择了一个大于30000值 作为目的端口号，因为UDP协议要求端口号必须小于30000，所以目的主机如果接收到必然 会会一个ICMP端口不可达错误)。
  * tracert 有一个固定的时间等待响应(ICMP TTL到期消息)。如果这个时间过了，它将打印出一系列的`*`号表明：在这个路径上，这个设备不能在给定的时间内发出ICMP TTL到期消息的响应。然后，Tracert给TTL记数器加1，继续进行

---

setsockopt 和 getsockopt

| level       | optname      | description              |
|-------------|--------------|--------------------------|
| SO_SOCKET   | SO_KEEPALIVE | 周期性测试连接是否还存在 |
| SO_SOCKET   | SO_LINGER    | 若有数据待发送则延迟关闭 |
| IPPROTO_IP  | IP_HDRINCL   | 随数据包含的IP首部       |
| IPPROTO_IP  | IP_TTL       | Time to Live             |
| IPPROTO_TCP | TCP_MAXSEG   | TCP最大报文大小          |
| IPPROTO_TCP | TCP_NODELAY  | 禁止nagle算法            |

---

## Chapter 1

考著名的人物：

* K&R: Kernighan 和 Ritchie
* c语言作者，unix 作者: Ken Thompson 和 Dennis M. Ritchie
* GNU 创建者/Emacs 作者: Richard Matthew Stallman 
* linux 作者: Linus Benedict Torvalds
* vim 作者: Bram Moolenaar
* Tex 作者: Donald Knuth 高德纳

## Chapter 2

TCP 状态转换图 ， 2.9 常用的Port Number ，2.10 Concurrent Server ， 2.12 services

```text
21端口：FTP 文件传输服务
22端口：SSH 端口
23端口：TELNET 终端仿真服务
25端口：SMTP 简单邮件传输服务
53端口：DNS 域名解析服务
80端口：HTTP 超文本传输服务
110端口：POP3 “邮局协议版本3”使用的端口
443端口：HTTPS 加密的超文本传输服务
**********************************
1433端口：MS SQL*SERVER数据库 默认端口号
1521端口：Oracle数据库服务
1863端口：MSN Messenger的文件传输功能所使用的端口
3306端口：MYSQL 默认端口号
3389端口：Microsoft RDP 微软远程桌面使用的端口
5631端口：Symantec pcAnywhere 远程控制数据传输时使用的端口
5632端口：Symantec pcAnywhere 主控端扫描被控端时使用的端口
5000端口：MS SQL Server使用的端口
8000端口：腾讯QQ
```

## Chapter 3，4，5，6

### Socket Address Structures

```c
struct in_addr {
	in_addr_t 	    s_addr; 		  /* 32-bit IPv4 address */
                                /* network byte ordered */
};

struct sockaddr_in {
	uint8_t         sin_len; 	    /* length of structure (16) */
	sa_family_t 	  sin_family;   /* AF_INET */
	in_port_t		    sin_port; 	  /* 16-bit TCP or UDP port number */
								                /* network byte ordered */
	struct in_addr  sin_addr;	    /* 32-bit IPv4 address */
								                /* network byte ordered */
	char 			      sin_zero[8];  /* unused */
};

// IPV4
inet_addr inet_ntoa
// IPV4/6
inet_pton inet_ntop
```

* in_addr 是结构的原因是早期将其定义为 union 方便A，B，C类地址的访问
* sin_zero 置0

### Generic socket address structure

```c
struct sockaddr {
	uint8_t 	  sa_len;
	sa_family_t sa_family; 	 /* address family: AF_xxx value */
	char 		    sa_data[14]; /* protocol-specific address */
};

// 用法
int bind(int, struct sockaddr *, socklen_t);

struct sockaddr_in serv;    /* IPv4 socket address structure */
/* fill in serv{} */
bind(sockfd, (struct sockaddr *) &serv, sizeof(serv));
```

用于定义函数时适配各种不同类型的地址结构，

若不转换，编译器报 `warning: passing arg 2 of 'bind' from incompatible pointer type`

### Sockaddr_in6

128-bits ipv6 地址

```c
struct in6_addr {
	uint8_t 	s6_addr[16];  /* 128-bit IPv6 address */
							            /* network byte ordered */
};

#define SIN6_LEN 			    /* required for compile-time tests */

struct sockaddr_in6 {
	uint8_t 		    sin6_len; 		  /* length of this struct (28) */
	sa_family_t 	  sin6_family; 	  /* AF_INET6 */
	in_port_t 		  sin6_port; 		  /* transport layer port# */
									                /* network byte ordered */
	uint32_t 		    sin6_flowinfo;  /* flow information, undefined */
	struct in6_addr sin6_addr; 		  /* IPv6 address */
									                /* network byte ordered */
	uint32_t 		    sin6_scope_id;  /* set of interfaces for a scope */
};
```

* The `sin6_flowinfo` member is divided into two fields:
  * The low-order 20 bits are the flow label
  * The high-order 12 bits are reserved

### Value-Result

当我们把 `SA*` 从用户进程传入内核时长度作为值 value ，内核处理完返回时结构的大小可能会改变，因此长度作为一个结果 result 传回 , 引用是因为需要函数内部去赋值

```c
// 用户进程 => 内核
// bind connect sendto 
struct sockaddr_in serv;

/* fill in serv{} */
connect(sockfd, (SA *) &serv, sizeof(serv));

// 内核 => 用户进程
// accept recvfrom getsockname getpeername 
struct sockaddr_un cli; /* Unix domain */
socklen_t len;

len = sizeof(cli); 		  /* len is a value */
getpeername(unixfd, (SA *) &cli, &len);
/* len may have changed */
```

### 字节序 Byte Ordering

```c
// 字节序转换函数
#include <netinet/in.h>
uint16_t htons(uint16_t host16bitvalue);
uint32_t htonl(uint32_t host32bitvalue);
 									Both return: value in network byte order
uint16_t ntohs(uint16_t net16bitvalue);
uint32_t ntohl(uint32_t net32bitvalue);
									Both return: value in host byte order
```

n - network , h - host , s - short 16 位, l - long 32 位

### Byte Manipulation

```c
#include <strings.h>
void bzero(void *dest, size_t nbytes);

void bcopy(const void *src, void *dest, size_t nbytes);

int  bcmp(const void *ptr1, const void *ptr2, size_t nbytes);
									Returns: 0 if equal, nonzero if unequal
```

```c
#include <string.h>
void *memset(void *dest, int c, size_t len);

void *memcpy(void *dest, const void *src, size_t nbytes);

int   memcmp(const void *ptr1, const void *ptr2, size_t nbytes);
						Returns: 0 if equal, <0 or >0 if unequal (see text)
```

### 地址转换函数

#### IPV4

```c
#include <arpa/inet.h>
// converts the C character string pointed to by strptr into
// its 32-bit binary network byte ordered value, 
// which is stored through the pointer addrptr 
int inet_aton(const char *strptr, struct in_addr *addrptr);
					Returns: 1 if string was valid, 0 on error
in_addr_t inet_addr(const char *strptr);
					Returns: 32-bit binary network byte ordered IPv4 address; INADDR_NONE if error
char *inet_ntoa(struct in_addr inaddr);
					Returns: pointer to dotted-decimal string
```

* `inet_aton` 将字符串 `strptr` 转换为 32 比特二进制网络字节序地址 `addrptr`

* `inet_addr` 作用同上，出错返回 `INADDR_NONE` 255.255.255.255, 所以不能处理该地址（被废弃）

* `inet_ntoa` 32bit 网络字节序到点分十进制 IPV4 字符串，储存在静态内存，不可重入

#### IPV4/6

```c
#include <arpa/inet.h>
int inet_pton(int family, const char *strptr, void *addrptr);
								Returns: 1 if OK, 0 if input not a valid presentation format, −1 on error

const char *inet_ntop(int family, const void *addrptr, char *strptr, size_t len);
								Returns: pointer to result if OK, NULL on error
```

p - presentation , n - numeric

* `family`: `AF_INET` / `AF_INET6` 不支持 errno= `EAFNOSUPPORT`
* `inet_pton`: 字符串 strptr 转换为 addrptr 二进制地址结果
* `inet_ntop`: 相反，len 位 strptr 大小，防止溢出 - len太小，返回空指针 errno= `ENOSPC`

### 读写函数

```c
#include "unp.h"
ssize_t readn(int filedes, void *buff, size_t nbytes);
ssize_t writen(int filedes, const void *buff, size_t nbytes);
ssize_t readline(int filedes, void *buff, size_t maxlen);
					All return: number of bytes read or written, −1 on error
```

readline 每次读一个字符，极端地慢

## Chapter 4

基本 TCP 套接字编程

### Socket 函数

```c
#include <sys/socket.h>
int socket(int family, int type, int protocol);
				Returns: non-negative descriptor if OK, −1 on error
```

|                | AF_INET  | AF_INET6 | AF_LOCAL | AF_ROUTE | AF_KEY |
|----------------|----------|----------|----------|----------|--------|
| SOCK_STREAM    | TCP SCTP | TCP SCTP | YES      |          |        |
| SOCK_DGRAM     | UDP      | UDP      | YES      |          |        |
| SOCK_SEQPACKET | SCTP     | SCTP     | YES      |          |        |
| SOCK_RAW       | IPV4     | IPV6     |          | YES      | YES    |

### Connect 函数

```c
#include <sys/socket.h>
int connect(int sockfd, const struct sockaddr *servaddr, socklen_t addrlen);
									Returns: 0 if OK, −1 on error
```

client 用于与 server 连接，内核会自己选择临时端口

* 75 s 无响应后返回 `ETIMEDOUT`
* 若相应 RST 则马上返回 `ECONNREFUSED` - 指定端口没有等待连接
* 目的不可达，返回 `EHOSTUNREACH`, `ENETUNREACH`

错误

* 如果给不存在的机器发送，因为没有 ARP reply , `ETIMEOUT`

```bash
connect error: Connection timed out
```

* 如果给未运行 server 的机器发送，收到 RST ，`ECONNREFUSED`

```bash
connect error: Connection refused
```

* 给不可达发送， 收到 ICMP 不可达错误，`EHOSTUNREACH`

```bash
connect error: No route to host
```

每次 connect 失败后，都需要关闭 sockfd 重新调用 socket 函数

### bind 函数

```c
#include <sys/socket.h>
int bind(int sockfd, const struct sockaddr *myaddr, socklen_t addrlen);
									Returns: 0 if OK, −1 on error
```

32b ipv4 / 128b ipv6 + 16b TCP/UDP port number

Servers 会在启动时调用 bind 端口（程序定义） ，若没有则当调用 connect 或 listen 时，内核会选择一个临时端口 或 根据 SYN 的目的地址

Client 通常不会 bind 而是 connect 时由内核根据路径选择

#### IP地址

wildcard 通配符

ipv4 : `INADDR_ANY` 0.0.0.0，内核等到TCP连接，UDP报文发送后选择ip地址

ipv6 : `in6addr_any` 由系统预先分配并置为 `IN6ADDR_ANY_INIT`

RPC 例外，会通过 端口映射器注册

#### 错误

`EADDRINUSE` : `Address already in use` 地址已使用

### listen 函数

Server : convert unconnected socket into a passive socket

```c
#include <sys/socket.h>
int listen(int sockfd, int backlog);
					Returns: 0 if OK, −1 on error
```

`backlog` : 内核队列中排队的最大连接数

调用时间： socket bind 后， accept 前

为 listening socket 保持两个队列

* `incomplete connection queue` 未完成连接队列，未完成握手，`SYN_RCVD` 态
* `completed connection queue` 已完成连接队列，完成握手，`ESTABLISHED` 态

两队之和不超过 backlog

### accept 函数

返回已完成连接队列队头，如果为空，进程睡眠

```c
#include <sys/socket.h>
int accept(int sockfd, struct sockaddr *cliaddr, socklen_t *addrlen);
						Returns: non-negative descriptor if OK, −1 on error
```

* `sockfd` : listening socket 监听
* `return` : connected socket 已连接
* `cliaddr` & `addrlen` ：对端的地址和长度
* 一对多的关系，监听socket 保持打开，连接socket完成对一个客户的服务就关闭

#### bind 错误

* 非超级用户：

```bash
bind error: Permission denied
```

### fork 和 exec 函数

fork 是唯一生成新进程的函数

```c
#include <unistd.h>
pid_t fork(void);
			Returns: 0 in child, process ID of child in parent, −1 on error
```

### 并发服务器

父进程 listenfd 监听，子进程 connfd 负责接收数据和实际操作

### close 函数

```c
#include <unistd.h>
int close(int sockfd);
						Returns: 0 if OK, −1 on error
```

为了方便多个进程使用套接字，它是引用计数的。

内核会发完所有等待发送的数据，然后 TCP 连接终止过程

如果只想发送FIN，改用 `shutdown` 函数

### 地址函数

```c
#include <sys/socket.h>
int getsockname(int sockfd, struct sockaddr *localaddr, socklen_t *addrlen);
int getpeername(int sockfd, struct sockaddr *peeraddr, socklen_t *addrlen);
							Both return: 0 if OK, −1 on error
```

sock 本地，peer 连接对端

重点基本都要求掌握、5.13不要求掌握

6.9，6.20 不要求掌握

## Chapter 5

### TCP Echo Server

Port : 5000 - 49152

### Normal Startup

server 阻塞在 accept （还未启动用户）

client 阻塞在 fgets 调用

连接

服务器阻塞在 read ，父进程阻塞在 accept

此时 三个进程 STAT 都是 S- sleeping - （已阻塞）

WCHAN 父进程 wait_for_connect , server tcp_data_wait , client - read_chan

### Normal Termination

Client ： EOF 字符（Control+D) 终止服务器

客户端进入 `TIME_WAIT` 状态

### 信号处理

`SIGKILL` & `SIGSTOP` 不能被捕获

信号处理函数是一个仅有一个整数参数且不返回值的函数

#### wait & waitpid

```c
#include <sys/wait.h>
pid_t wait(int *statloc);
pid_t waitpid(pid_t pid, int *statloc, int options);
						Both return: process ID if OK, 0 or −1 on error
```

处理已终止的子进程

* 返回值： 已终止子进程的进程 ID 号，通过 statloc 指针返回的子进程终止状态（一个整数）
* 对于同种类型的信号，主机只会执行一次信号处理函数

#### accept 返回前连接中止

connect 后，accept 前，客户端发送 RST 报文

POSIX : `ECONNABORTED` - `software caused connection abort`

#### 服务器进程终止

服务器进程崩溃后，如果 client 不操作，会阻塞在 fgets，输入字符后，readline 因接收到 FIN 返回 0（EOF），client 返回 : `str_cli: server terminated prematurely` - 程序定义的并结束

如果先收到了 RST，会返回 `ECONNRESET` - `connection reset by peer`

RST 会因为并没有与该客户端连接但是接收到该客户端发送的内容而被服务器发送

#### 服务器主机崩溃

同上面不同的是，服务器并不会有任何反应，会有以下两种情况：

* 一直没有响应 `ETIMEOUT`
* 中间路由器判断不可达，响应一个 `destination unreachable` 的 ICMP，返回的错误是 `EHOSTUNREACH` 或 `ENETUNREACH`

#### 服务器主机崩溃后重启

当服务器主机崩溃后重启时，它的 TCP 丢失了崩溃前的所有连接信息，因此服务器 TCP 对于所收到的来自客户的数据分节响应以一个RST

#### 数据格式

服务器读入换行符，所搜索的只是换行符

二进制 : `sscanf` 转换到结构体 binary ，发送后，对方也用同样的结构体接收。

大小端不同 ， 同样 int 型长度不同，结构体的打包方式不同 都会导致负数不行，

解决方法： 发送 string ， 用 XDR（external data representation) 发送

## Chapter 6

### I/O Model

分为两个部分：等待对端发送数据 ，将数据从内核拷贝到用户

* blocking: 调用接收函数后就一直等到两步都完成再返回

![](https://s2.loli.net/2021/12/24/k7NsibMYlA4BnCG.jpg)

* Nonblocking: 第一阶段不断循环 call，知道收到完整包

![](https://s2.loli.net/2021/12/24/1Qs5ucmSPpXRVaD.jpg)

* Multiplexing: 第一步调用 select，直到返回 readable，然后调用 recvfrom 完成第二步
  * 好处: 可以等待多个描述符

![](https://s2.loli.net/2021/12/24/gFw2hGWOmPx1Mas.jpg)

* Signal-Driven: 调用后立即返回，signal handler 会在 data 准备好后发出信号，调用 recvfrom 完成第二步

![](https://s2.loli.net/2021/12/24/xACoPEYT3g4prwD.jpg)

* Asynchronous: 告知内核启动某个操作，并让内核在两步操作完成后通知我们

![](https://s2.loli.net/2021/12/24/NBrtk7uoz5AKxlc.jpg)

### select 函数

告诉内核等待多个事件，有事件发生或 Timeout 后唤醒他

```c
#include <sys/select.h>
#include <sys/time.h>
int select(int maxfdp1, fd_set *readset, fd_set *writeset, fd_set *exceptset,
									const struct timeval *timeout);
	Returns: positive count of ready descriptors, 0 on timeout, −1 on error
```

* `maxfdp1`: 待测试的最大描述符值 +1
* `set`: 告诉内核 what descriptors we are interested in ，不关心设为空，三个参数都是 value-result 类型的，调用时为关心的描述符的值，返回时指示哪些描述符已就绪
  * `readset`: Any of the descriptors in the readset are ready for reading
  * `writeset`: Any of the descriptors in the writeset are ready for reading
  * `exceptset`: Any of the descriptors in the exceptset have an exception condition pending
* `timeout`: how long to wait - 信号中断 - 不准
  * 设置为空: 永远等待
  * 值: 固定时间
  * 0: 根本不等待- 轮询（polling）
* `Returns`: 就绪的数目，timeout=0，error=-1
* 这是系统函数，descriptor 和 socket 无关，socket 可以 select 任意 descriptor
* 错误处理 - 不考

#### fd_set 数据结构

每一位代表一个描述符，每一bit为

```c
void FD_ZERO(fd_set *fdset);          /* clear all bits in fdset */
void FD_SET(int fd, fd_set *fdset);   /* turn on the bit for fd in fdset */
void FD_CLR(int fd, fd_set *fdset);   /* turn off the bit for fd in fdset */
int FD_ISSET(int fd, fd_set *fdset);  /* is the bit for fd on in fdset ? */
```

* 利用 `FD_ZERO` 进行初始化十分重要，因为是 value-result 值会变化
* `FD_SETSIZE`: 1024

#### 读 ready 的条件

* 收到的数据高于 low-water 低水位了
* 连接关闭了，read 返回 0 （EOF）
* 是监听套接字，且有已完成的连接 ？
* 套接字有错误待处理，返回 -1 ， errno 设置成确切的错误条件

#### 写 ready 的条件

* 已连接（udp不需要），可写空间超过 low-water
* 写半边关闭了 （有未完成发送的数据，要发送出去）
* non-blocking connect 建立了连接或失败了
* 套接字有错误待处理，返回 -1 ， errno 设置成确切的错误条件

#### exceptiong ready

如果一个套接字存在带外数据或者仍处于带外标记，那么它有异常条件待处理

### str_cli

阻塞在 select，将原本的待前后顺序的阻塞，变成同时的阻塞

### shutdown

给服务器发送一个FIN，告诉它我们已经完成了数据发送，但是 仍然保持套接字描述符打开以便读取

```c
#include <sys/socket.h>
int shutdown(int sockfd, int howto);
					Returns: 0 if OK, −1 on error
```

* 不动引用计数就激发 TCP 的正常连接终止序列
* close 终止读和写两个方向的数据传送，shutdown 还可以继续读
* 三种可选项
  * `SHUT_RD`: 关闭连接的读这一半
  * `SHUT_WR`: 关闭连接的写这一半
  * `SHUT_RDWR`: 连接的读半部和写半部都关闭

### str_cli pipeline版

加入 shutdown，模拟先连续发送数据，关闭写半部，然后再连续接收返回数据的 pipeline 操作

### TCP echo 程序- select 版

client 数组存储已连接 accept 描述符的值

省去了 fork 新进程的开销

rset 数组保存 0-stdin，1-stdout，2-stderr ，3–都是已连接描述符

* 客户发送 FIN，4 变为可读 read 将返回 0。关闭该套接字并把 `client[0]` 的值置为 -1，把描述符集中描述符 4 的位设置为 0。注意，**maxfd 的值没有改变**

## Chapter 7

### _sockopt 函数

```c
#include <sys/socket.h>
int getsockopt(int sockfd, int level, int optname, void *optval, socklen_t *optlen);
int setsockopt(int sockfd, int level, int optname, const void *optval, socklen_t optlen);
									Both return: 0 if OK, −1 on error
```

* sockfd ： 打开的套接字描述符
* level ：指代系统中解释该选项的代码
* optval ：存储 option 的数据结构 - 是标志 0 为不启用，值为启用
* optlen ：长度 - value-result

sockopt :掌握 7.2 原理 - SO_LINGER / SO_KEEPALIVE / SO_DONTROUTE

### SO_KEEPALIVE

保活

### SO_LINGER ？

关闭 close 时是否丢弃保留在套接字发送缓冲区中的任何数据，

设置正的延滞时间

### SO_DONTROUTE

是否绕过下层协议的路由机制

```text
IP : IP_HDRINCL / IP_TTL 
```

### IP_HDRINCL

设置了就需要自己构建IP头

### IP_TTL

设置和获取系统用在从某个给定套接字的默认 TTL 值

### TCP : TCP_MAXSEG

允许我们获取或设置TCP连接的最大分节大小

SYN中通告的MSS

## Chapter 8

8.1 图，并发程序设计 - 重点注意区别

`sendto()` `recvfrom()`

```c
#include <sys/socket.h>
ssize_t recvfrom(int sockfd, void *buff, size_t nbytes, int flags,
					struct sockaddr *from, socklen_t *addrlen);
ssize_t sendto(int sockfd, const void *buff, size_t nbytes, int flags,
					const struct sockaddr *to, socklen_t addrlen);
			Both return: number of bytes read or written if OK, −1 on error
```

echo 程序

```c
Socket(AF_INET, SOCK_DGRAM, 0);
```

### 服务器进程未运行

返回 ICMP 异步错误

sendto 成功返回仅表示接口输出队列中有存放数据报的空间

仅在进程已将其 UDP 套接字连接到一个对端后，这些异步错误才返回给进程

### connect

* 不需要再指定目的 IP 和端口号
* 不用 recvfrom 用 read 就行
* 返回异步错误

## Chapter 11

简单前面部分 DNS 操作 11.3、11.4、11.5

使用 UDP 查询，如果答案太长，超出了 UDP 承载能力，换成 TCP

### gethostbyname

```c
#include <netdb.h>
struct hostent *gethostbyname(const char *hostname);
			Returns: non-null pointer if OK, NULL on error with h_errno set
```

只能返回 ipv4，getaddrinfo 能够处理 4 和 6

### gethostbyaddr

```c
#include <netdb.h>
struct hostent *gethostbyaddr(const char *addr, socklen_t len, int family);
			Returns: non-null pointer if OK, NULL on error with h_errno set
```

```c
#include <netdb.h>
struct servent *getservbyname(const char *servname, const char *protoname);
Returns: non-null pointer if OK, NULL on erro

#include <netdb.h>
struct servent *getservbyport(int port, const char *protoname);
Returns: non-null pointer if OK, NULL on error
```

## Part 3 Advanced Sockets

12，13，14，15 ，17，18.5,20,21,22,23,24，30，31不考 Daemon Process 了解一下

19 Introduction

特权 SA ， SADB

25 掌握，结合第 5 章看

26 掌握 基本概念，线程和进程区别

27 结合前面的 Options 一起看，简单看看。

28 重点掌握

读写ICMP，读写非内核处理的协议段的数据报，构建ip首部

```c
sockfd = socket(AF_INET, SOCK_RAW, protocol)
// 例 ： protocol IPPROTO_ICMP
// 开启 IP_HDRINCL
const int on = 1;
if (setsockopt(sockfd, IPPROTO_IP, IP_HDRINCL, &on, sizeof(on)) < 0)
// 出错处理
```

29 掌握 基本概念，如何抓包

libpcap 公开分组捕获函数库

A.3 C.1 netstat tcpdump

简答题（解释名词） ， 编程题（补充小的片段）上机+上课 ， 实验分析题（分析实验的结果）例如： 服务端没起来 报什么错误

最开始 那个 带函数的函数

## 问题

P180，P165，LINGER 的意思是什么

ioctl 实现 sockopt 进行读写操作 - 了解功能

函数原型 ： 名字 + 参数

ping ， recvmsg 如果被中断 `EINTR`，continue 重新执行，函数重启

5.10 wait / waitpid 要求

server ， server host 情况

raw socket 适用于什么情况 routing 、key

29 introduction

信号处理函数 5 章 signal handler

signal driven 不要求

tcp函数的顺序图

{% endnote %}
