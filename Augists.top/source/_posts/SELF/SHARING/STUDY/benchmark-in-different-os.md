---
title: benchmark on different OS
tags: [SHARING, DEVICE]
description: 'run an open source benchmark program on Arch Linux and Windows<br>with the same hardware device<br>just an uncritical comparison'
date: 2023-03-20 12:29:24
---

{% note warning %}

去年双十一的时候自己选购和组装了一台新电脑，因为目前在用的 macbook 在一些情况下已经无法满足我的需要了
基本需求提升是对于 cpu 和内存，在我的使用过程中已经开始有很明显的卡顿和性能不足，经常能看到 swap 区占用超过了 10G
目前暂时可以确定的是，由于不需要做深度学习，我对 GPU 没有什么需求，所以就只需要核显能满足简单的游戏和日常的图形化渲染即可

最终的配置单放在这里，那段时间学习了非常多的硬件和电脑组装的知识，这是我根据自己学习的东西、自己的需求以及对钱包的掌控列出的最终配置单

{% note danger %}

* CPU: AMD Ryzen 7600X
* Motherboard: MSI B650M with WiFi
* Memory: Kingston Fury 32G DDR5 5200 (16G x 2 with EXPO)
* Radiator: Thermalright Magic EX 240 + TL C12C x 2
* Hard Disk: Kioxia RC20 1T + ZhiTai TiPlus5000 1T
* Battery: Antec NE650
* Case: ASUS AP201

{% endnote %}

组装调试好电脑之后，就想着要不要拿同一套配置在不同的操作系统上跑个 benchmark 看看，虽然并不严谨，甚至两个系统放在不同的 SSD 上，但是可以作为参考

![arch](https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/1B2F0D1B18CC9501774C2A38DCA423D3.png)

这是在 Arch KDE 上用 Kitty 跑的

![windows powershell](https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/3A27AAAFD92CBCCECAA93316EBA5DE8F.png)

在 Windows 上用 PowerShell

![windows bash](https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/FCF5DE2C3156432019587C8BCFE8CB4D.png)

为了防止不同终端差异很大，又在 Windows 上的 Git Bash 跑了一下

从右下角的系统时间可以看到，这三张截图躺在我的硬盘里好几个月了

---

可以看到在 Linux 上的共耗时约 35s，而在 Windows 上的两个都在大概 43s

当然，这是一个非常不严谨的测试，如果我没有记错的话，当时的 Windows 装在致钛盘，Linux 装在铠侠，并且由于系统不同，也没有条件使用相同的终端模拟器，Kitty 可能还会调用核显进行加速等等
跑这个 benchmark 也仅仅是为了娱乐，并不意味着相同的工作在 Windows 上的处理效率就一定比在 Linux 上要低

---

测试的灵感和 benchmark 程序均来自于 [youtube](https://www.youtube.com/watch?v=i_O8r1YQJVo&t=10s)，原作者对 m1 系列芯片和 intel i9 进行了对比，挺有意思的
[benchmark](https://benchmarksgame-team.pages.debian.net/benchmarksgame/program/mandelbrot-python3-7.html)

这里留一个 python 代码的备份好了

```python
# The Computer Language Benchmarks Game
# https://salsa.debian.org/benchmarksgame-team/benchmarksgame/
#
# contributed by Joerg Baumann

from contextlib import closing
from itertools import islice
from os import cpu_count
from sys import argv, stdout

def pixels(y, n, abs):
    range7 = bytearray(range(7))
    pixel_bits = bytearray(128 >> pos for pos in range(8))
    c1 = 2. / float(n)
    c0 = -1.5 + 1j * y * c1 - 1j
    x = 0
    while True:
        pixel = 0
        c = x * c1 + c0
        for pixel_bit in pixel_bits:
            z = c
            for _ in range7:
                for _ in range7:
                    z = z * z + c
                if abs(z) >= 2.: break
            else:
                pixel += pixel_bit
            c += c1
        yield pixel
        x += 8

def compute_row(p):
    y, n = p

    result = bytearray(islice(pixels(y, n, abs), (n + 7) // 8))
    result[-1] &= 0xff << (8 - n % 8)
    return y, result

def ordered_rows(rows, n):
    order = [None] * n
    i = 0
    j = n
    while i < len(order):
        if j > 0:
            row = next(rows)
            order[row[0]] = row
            j -= 1

        if order[i]:
            yield order[i]
            order[i] = None
            i += 1

def compute_rows(n, f):
    row_jobs = ((y, n) for y in range(n))

    if cpu_count() < 2:
        yield from map(f, row_jobs)
    else:
        from multiprocessing import Pool
        with Pool() as pool:
            unordered_rows = pool.imap_unordered(f, row_jobs)
            yield from ordered_rows(unordered_rows, n)

def mandelbrot(n):
    write = stdout.buffer.write

    with closing(compute_rows(n, compute_row)) as rows:
        write("P4\n{0} {0}\n".format(n).encode())
        for row in rows:
            write(row[1])

if __name__ == '__main__':
    mandelbrot(int(argv[1]))
```

{% endnote %}
