---
title: Linux Fork
tags: [LINUX, NOTE, OS]
description: 'What is behind fork() in Linux?<br>Share by an example for Operating System Course'
date: 2021-05-20 21:22:39

---

### 2.1程序一

#### 2.1.1实验代码

```c
#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

int value=5;     //where?

int main(){
	int i;     //where?
	pid_t pid;
	for(i=0;i<2;i++){    // How many new processes and printfs？
		pid=fork();
		if(pid==0){
			value += 15;
			printf("Child: value = %d\n",value);
		}
		else if(pid>0){
			wait(NULL);
			printf("PARNET: value = %d\n",value);
			exit(0);   //Notice：What will happen with or without this line?
		}
	}
}
```

#### 2.1.2代码理解

1. `fork()` 函数会在运行时创建一个与自己完全相同的子进程，即父进程在进入第一次 `for` 循环后进行第一次 `fork` 创建。此时父进程 `pid > 0` 而子进程 `pid == 0`
2. 父进程继续执行，并进行 `wait(NULL)`。`wait` 意为：立即阻塞父进程，并进行判断：
	1. 是否有当前进程的某个子进程已经退出，如果让它找到了这样一个已经变成僵尸的子进程，`wait` 就会收集这个子进程的信息，并把它彻底销毁后返回
	2. 如果没有找到这样一个子进程，`wait` 就会一直阻塞在这里，直到有一个出现为止（此时没有僵尸子进程，所以父进程阻塞等待）
3. 子进程并行执行，输出 `Child: value = 20` 并进入下一个 `for` 循环
4. 进入第二个 `for` 循环后，原子进程变为新父进程，并创建与当前状态（`i = 1`）相同的子进程。子进程执行输出 `Child: value = 35` 并向下继续；新父进程进入 `wait` 阻塞
5. 子进程运行结束，变为僵尸进程；新父进程结束阻塞，输出 `PARNET: value = 20` 并向下运行，`exit` 后运行结束；原父进程结束阻塞，输出 `PARNET: value = 5` 并 `exit`，结束运行

> 考虑 `value` 的生存期问题，在程序中作为全局变量，生存期一直到程序结束。对于每一个进程来说，`value` 的值在进程创建时为自己进程固定，不再受到其他进程影响

> `fork` 函数用于创建子进程，同时返回 0 用于父进程与子进程的区分判断。
>
> `fork` 可能有三种不同的返回值：
>   1）在父进程中，fork返回新创建子进程的进程ID；
>   2）在子进程中，fork返回0；
>   3）如果出现错误，fork返回一个负值；
>
> 所以在子进程创建自己的子进程时，它存储的 `pid` 变量值已经变为新子进程的 `pid`，不为 0，即为新父进程

> 若父进程没有 `exit(0)` 则父进程会再次进入 `for` 循环，并创建子进程

#### 2.1.3程序截图

1. fork 程序

![Screen Shot 2021-05-20 at 7.50.53 PM](https://i.loli.net/2021/05/20/BIq3ceboUPxzKig.png)

2. 验证 fork 函数程序

![Screen Shot 2021-05-20 at 7.52.04 PM](https://i.loli.net/2021/05/20/3wGpUvTz1KosJBg.png)
