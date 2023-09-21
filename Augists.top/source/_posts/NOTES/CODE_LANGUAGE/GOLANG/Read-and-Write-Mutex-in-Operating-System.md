---
title: Read and Write Mutex in Operating System
tags: [NOTE, OS]
description: 'How to write an optimized PV operation for reading and writing'
date: 2022-05-15 18:51:38
---

{% note warning %}

## 引入

在操作系统的进程管理中，会遇到有关同步和互斥的问题，其中读写就是一种非常经典的同步问题

通常我们在对数据访问权限进行限制时，会要求：

* 写时不可读
* 写时不可写
* 读时不可写
* 读时可以读

也就是说，为了防止不一致的情况出现，只会允许同时的读数据，而禁止其他的操作同时发生

## 常规实现

这里使用一个 `count` 记录正在进行读操作的进程数量，一个互斥量 `count_mutex` 用于对 `count` 加锁，一个互斥量 `data_mutex` 用于对读写操作的数据加锁
可以写出第一种进程读写

```c
typedef int semaphore;
semaphore count_mutex = 1;
semaphore data_mutex = 1;
int count = 0;

void reader() {
    while(TRUE) {
        down(&count_mutex);
        count++;
        if(count == 1) down(&data_mutex); // 第一个读者需要对数据进行加锁，防止写进程访问
        up(&count_mutex);
        read();
        down(&count_mutex);
        count--;
        if(count == 0) up(&data_mutex);
        up(&count_mutex);
    }
}

void writer() {
    while(TRUE) {
        down(&data_mutex);
        write();
        up(&data_mutex);
    }
}
```

可以看到，当有 reader 读（第一个 reader 进入后），会给 data 上锁，从而使得 writer 无法对数据进行修改。只有当所有 reader 都读完后，才会释放 `data_mutex` 锁。这就会导致当一直有读进程时，writer 无法拿到 `data_mutex` 锁，造成写饥饿
换种思路来理解，当 writer 因为没有拿到 `data_mutex` 锁而在排队等待时，reader 可以通过不拿锁进行插队

## 读写公平

那么，如何才能拒绝 reader 的插队，实现读写公平

```c
typedef int semaphore;
semaphore count_mutex = 1;
semaphore data_mutex = 1;
semaphore balance = 1
int count = 0;

void reader() {
    while(TRUE) {
        down(&balance)
        down(&count_mutex);
        count++;
        if(count == 1) down(&data_mutex); // 第一个读者需要对数据进行加锁，防止写进程访问
        up(&count_mutex);
        up(&balance)
        read();
        down(&count_mutex);
        count--;
        if(count == 0) up(&data_mutex);
        up(&count_mutex);
    }
}

void writer() {
    while(TRUE) {
        down(&balance)
        down(&data_mutex);
        write();
        up(&data_mutex);
        up(&balance)
    }
}
```

通过增加互斥量 `balance` 让 writer 在进入时先抢占 `balance` 锁，从而使后续到达的 reader 因为无法抢占到 `balance` 锁而排在 writer 后面无法插队，实现了读写的公平
这样，writer 到达后会等待前面的 reader 读完，将 `data_mutex` 释放后修改数据，即读写操作下的 FIFO

## 深入和案例思考

但是，我觉得以上的讨论都没有把读写的频率和读写的消耗考虑进去。例如，在算法题中，如果对数据只进行少量修改，更多的需要读取时，我们会使用空间来换取时间，维护一个方便读的结构来提高效率
通常来说，读可能更重要，更普遍，而且更快，或者说需要它更快
举个[之前看到的实例](https://www.bilibili.com/video/BV1kA4y1Q7tD?spm_id_from=333.337.search-card.all.click)。如果让你去构建一个 Twitter 后端，你如何设计后台的数据存储方式。你需要考虑，当用户量很大时，对于同一条推文的阅读会以数量级增多。
那么，可能会让推文的读提前拿出来交给所有的 followers，让他们能更快速的读，而不是去每个 following 看看是否有新的推文。这时，读就显得尤其重要，值得用空间来换取时间。这种情况下，读写锁就不再需要考虑公平，因为是一对一的读写
但是，如果这个人是个 follower 很大的用户，显然就无法将新推文维护到所有 followers 里。此时，就只能让每个 follower 都去他的 following 里读数据。这种情况下，读写锁就是一写N读。你需要考虑读带来的损耗，是否值得让所有读都去等待写进程的完成，写是否需要等待所有读都将锁释放掉再开始
分布式的存储是否可以将读写进行分离，从而不再需要读写锁，只进行分布式系统之间的同步
除此之外，脏读也是需要考虑的一环。如果读写的平衡是读可以无视写，仅读取旧数据，那是不是就会有不同的 follower 同时读到新旧不同的推文

## Copy-on-Write 机制

还有一种 Copy-on-Write 的方式来实现对于读写的分离，达到类似的效果

```c
std::mutex mutex_;
std::shared_ptr<data> G_data(new data());

void read(){
	std::shared_ptr<data> Temp;
	{
		std::lock_guard<std::mutex> guard(mutex_);
		Temp = G_data;
	}
	Temp->read_something();
}

void write(){
    std::lock_guard<std::mutex> guard(mutex_);
    if(!G_data.unique()){
        G_data.reset(new data(*G_data));
    }
    G_data->write_something();
}
```

假设我们现在有一个 ThreadA 为读线程，有一个 ThreadB 为写线程，ThreadA 去执行 `read()`, 其中首先把构造防止锁外, 减小锁的粒度以及保证异常安全, 在得到锁后进行赋值。
此时 `G_data` 引用计数为 2, 现在 ThreadA 执行至 `read_something()` 之前, guard 作用域之后
ThreadB 此时得到锁，进行 `unique()`, 因为 ThreadA 执行了拷贝, 所以 `unique()` 返回 false, 进入 if 中,这就是关键所在
进行拷贝, 并对 `G_data` 进行 `reset`, 此时两个线程持有的是不同的 `shared_ptr`, ThreadA 对旧数据进行读取, 而 ThreadB 对新数据进行修改, 这时显然其它再有的读线程无法持有锁, 其持有锁时 ThreadB 已经修改完毕，这样就做到了避免写锁中的饥饿问题
有些人看到后可能会觉得眼熟, 这其实类似于 linux 内核中的 RCU(read-copy-update) 锁, RCU 的核心理念其实就是读线程访问时，写线程可以去更新保护数据的副本，但写线程需要等待所有读线程完成读取后，才可以删除老对象

其实去年我的病毒学大作业中有一个就是 DirtyCOW 漏洞，通过 linux 中的 Copy-on-Write 机制的漏洞来实现提权，只是一直对 Copy-on-Write 机制不是很了解

## StampedLock

在 Java8 中引入了一种新的机制，StampedLock 类，是对读写锁 ReentrantReadWriteLock 的增强

```java
class Point {
    private double x, y;
    private final StampedLock sl = new StampedLock();

    void move(double deltaX, double deltaY) {
        long stamp = sl.writeLock();    //涉及对共享资源的修改，使用写锁-独占操作
        try {
            x += deltaX;
            y += deltaY;
        } finally {
            sl.unlockWrite(stamp);
        }
    }

    /**
     * 使用乐观读锁访问共享资源
     * 注意：乐观读锁在保证数据一致性上需要拷贝一份要操作的变量到方法栈，并且在操作数据时候可能其他写线程已经修改了数据，
     * 而我们操作的是方法栈里面的数据，也就是一个快照，所以最多返回的不是最新的数据，但是一致性还是得到保障的。
     *
     * @return
     */
    double distanceFromOrigin() {
        long stamp = sl.tryOptimisticRead();    // 使用乐观读锁
        double currentX = x, currentY = y;      // 拷贝共享资源到本地方法栈中
        if (!sl.validate(stamp)) {              // 如果有写锁被占用，可能造成数据不一致，所以要切换到普通读锁模式
            stamp = sl.readLock();             
            try {
                currentX = x;
                currentY = y;
            } finally {
                sl.unlockRead(stamp);
            }
        }
        return Math.sqrt(currentX * currentX + currentY * currentY);
    }

    void moveIfAtOrigin(double newX, double newY) { // upgrade
        // Could instead start with optimistic, not read mode
        long stamp = sl.readLock();
        try {
            while (x == 0.0 && y == 0.0) {
                long ws = sl.tryConvertToWriteLock(stamp);  //读锁转换为写锁
                if (ws != 0L) {
                    stamp = ws;
                    x = newX;
                    y = newY;
                    break;
                } else {
                    sl.unlockRead(stamp);
                    stamp = sl.writeLock();
                }
            }
        } finally {
            sl.unlock(stamp);
        }
    }
}
```

try 系列获取锁的函数，当获取锁失败后会返回为 0 的 stamp 值。当调用释放锁和转换锁的方法时候需要传入获取锁时候返回的 stamp 值。
StampedLockd 的内部实现是基于 CLH 锁的，CLH 锁原理：锁维护着一个等待线程队列，所有申请锁且失败的线程都记录在队列。一个节点代表一个线程，保存着一个标记位 locked, 用以判断当前线程是否已经释放锁。当一个线程试图获取锁时，从队列尾节点作为前序节点，循环判断所有的前序节点是否已经成功释放锁。

可以看到，这里使用了乐观锁的概念。乐观锁和悲观锁是两种思想，用于解决并发场景下的数据竞争问题。
* 乐观锁：乐观锁在操作数据时非常乐观，认为别人不会同时修改数据。因此乐观锁不会上锁，只是在执行更新的时候判断一下在此期间别人是否修改了数据：如果别人修改了数据则放弃操作，否则执行操作。
* 悲观锁：悲观锁在操作数据时比较悲观，认为别人会同时修改数据。因此操作数据时直接把数据锁住，直到操作完成后才会释放锁；上锁期间其他人不能修改数据。

可以看到，示例中的 `distanceFromOrigin` 方法使用饿了乐观读锁，使得读写可以并发执行。乐观读也是在实现 Copy-on-Write 机制，它遵循以下模式

```java
long stamp = lock.tryOptimisticRead();  // 非阻塞获取版本信息
copyVaraibale2ThreadMemory();           // 拷贝变量到线程本地堆栈
if(!lock.validate(stamp)){              // 校验
    long stamp = lock.readLock();       // 获取读锁
    try {
        copyVaraibale2ThreadMemory();   // 拷贝变量到线程本地堆栈
     } finally {
       lock.unlock(stamp);              // 释放悲观锁
    }

}
useThreadMemoryVarables();              // 使用线程本地堆栈里面的数据进行操作
```

## Golang 源码

可以在 `/usr/local/go/src/sync` 中查看 rwmutex.go 的源码

> A RWMutex is a reader/writer mutual exclusion lock.
> The lock can be held by an arbitrary number of readers or a single writer.
> The zero value for a RWMutex is an unlocked mutex.

可以在 Golang 的注释里看到，它采用的是读写公平的加锁方式

> If a goroutine holds a RWMutex for reading and another goroutine might
> call Lock, no goroutine should expect to be able to acquire a read lock
> until the initial read lock is released. In particular, this prohibits
> recursive read locking. This is to ensure that the lock eventually becomes
> available; a blocked Lock call excludes new readers from acquiring the
> lock.

其中对于 RWMutex 的定义如下

```go
type RWMutex struct {
	w           Mutex  // held if there are pending writers
	writerSem   uint32 // semaphore for writers to wait for completing readers
	readerSem   uint32 // semaphore for readers to wait for completing writers
	readerCount int32  // number of pending readers
	readerWait  int32  // number of departing readers
}
```

reader 的最大数量被定义为 `1 << 30`
而 happens-before 关系可以表示为

```text
Unlock  -> Lock:  readerSem
Unlock  -> RLock: readerSem
RUnlock -> Lock:  writerSem
```

当读者进入后，会调用 `rw.w.Lock()`，使后续不再有读者可以读取数据，并通过
```go
// Announce to readers there is a pending writer.
r := atomic.AddInt32(&rw.readerCount, -rwmutexMaxReaders) + rwmutexMaxReaders
// Wait for active readers.
if r != 0 && atomic.AddInt32(&rw.readerWait, r) != 0 {
	runtime_SemacquireMutex(&rw.writerSem, false, 0)
}
```

来等待当前的读进程的结束，而写进程完成后 `Unlock()` 将所有在等待中的 reader 唤醒

读进程 `RLock()` 在 `rw.w.state` 后，进行 `atomic.AddInt32(&rw.readerCount, 1) < 0` 的判断，如果有写进程正在执行，就会通过 runtime 把自己加入到读的等待队列中去

### Reference

[CS NOTE](http://www.cyc2018.xyz/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%9F%BA%E7%A1%80/%E8%AE%A1%E7%AE%97%E6%9C%BA%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%20-%20%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86.html#_2-%E8%AF%BB%E8%80%85-%E5%86%99%E8%80%85%E9%97%AE%E9%A2%98)
[PV经典问题之读写者问题](https://blog.csdn.net/wuli_xin/article/details/103794404)
[读写锁中的饥饿问题](https://blog.csdn.net/weixin_43705457/article/details/104150455)
[一篇文章搞定——JDK8中新增的StampedLock](https://cloud.tencent.com/developer/article/1470988)
[马斯克都要把twitter买了，要不来学一下twitter的架构？](https://www.bilibili.com/video/BV1kA4y1Q7tD?spm_id_from=333.337.search-card.all.click)

{% endnote %}
