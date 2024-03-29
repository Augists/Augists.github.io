---
title: Hanming Code
tags: [HANMING, NOTE]
description: 'What is Hanming Code? How does it work?'
date: 2020-11-06 20:37:37

---

{% note warning %}

## 汉明码的组成

汉明码是由 Richard Hanming 于 1950 年提出的，具有一位纠错能力

由纠错理论得 `L - 1 = D + C (D ≥ C)`
即编码最小距离 L 越大，则其检测错误的位数 D 越大，纠正错误的位数 C 也越大，且纠错能力恒小于或等于检错能力

设欲检测的二进制代码为 n 位，为使其具有纠错能力，需添加 k 位检测位，组成 n + k 位的代码，k 应满足
2<sup>k</sup> - 1 ≥ n + k

| n      | k(min) |
|--------|--------|
| 1      | 2      |
| 2~4    | 3      |
| 5~11   | 4      |
| 12~26  | 5      |
| 27~57  | 6      |
| 58~120 | 7      |

设 n + k 位代码自左至右依次编为第 1, 2, 3, ..., n + k 位，而将 k 位检测位记作 C<sub>i</sub> (i = 1, 2, 4, 8, ...)，分别安插在 n + k 位代码编号的第 1, 2, 4, 8, ...,
2<sup>k - 1</sup> 位上

| C<sub>i</sub> | 检测                                                                   |
|---------------|------------------------------------------------------------------------|
| C<sub>1</sub> | 检测的 g<sub>1</sub> 小组包含 1, 3, 5, 7, 9, 11, ... 位                |
| C<sub>2</sub> | 检测的 g<sub>2</sub> 小组包含 2, 3, 6, 7, 10, 11, 14, 15, ... 位       |
| C<sub>4</sub>             | 检测的 g<sub>3</sub> 小组包含 4, 5, 6, 7, 12, 13, 14, 15, ... 位       |
| C<sub>8</sub>             | 检测的 g<sub>4</sub> 小组包含 8, 9, 10, 11, 12, 13, 14, 15, 24, ... 位 |

有如下特点：
1. 每个小组 g<sub>i</sub> 有一位且仅有以为为它所独占，这一位是其他小组所没有的，即 g<sub>i</sub> 小组独占第 2<sup>i - 1</sup> 位
2. 每两个小组 g<sub>i</sub> 和 g<sub>j</sub> 共同占有一位是其他小组没有的，即每两小组 g<sub>i</sub> 共同占有第 2<sup>i - 1</sup> + 2<sup>j - 1</sup> 位
3. 每三个小组 g<sub>i</sub>、g<sub>j</sub> 和 g<sub>l</sub> 共同占有第 2<sup>i - 1</sup> + 2<sup>j - 1</sup> + 2<sup>l - 1</sup> 位，是其他小组所没有的
4. 以此类推

{% note %}

令 b<sub>4</sub>b<sub>3</sub>b<sub>2</sub>b<sub>1</sub> = 0101，则
C<sub>1</sub> = b<sub>4</sub> ⊕ b<sub>3</sub> ⊕ b<sub>1</sub> = 0
C<sub>2</sub> = b<sub>4</sub> ⊕ b<sub>2</sub> ⊕ b<sub>1</sub> = 1
C<sub>4</sub> = b<sub>3</sub> ⊕ b<sub>2</sub> ⊕ b<sub>1</sub> = 0
故 0101 的汉明码为 0100101

{% endnote %}

## 汉明码的纠错过程

汉明码的纠错过程实际上是对传送后的汉明码形成新的检测位 P<sub>i</sub>，根据 P<sub>i</sub> 的状态便可直接指出错误的位置
P<sub>1</sub> = 1 ⊕ 3 ⊕ 5 ⊕ 7 = C<sub>1</sub> ⊕ b<sub>4</sub> ⊕ b<sub>3</sub> ⊕ b<sub>1</sub>
P<sub>2</sub> = 2 ⊕ 3 ⊕ 6 ⊕ 7 = C<sub>2</sub> ⊕ b<sub>4</sub> v b<sub>2</sub> ⊕ b<sub>1</sub>
P<sub>4</sub> = 4 ⊕ 5 ⊕ 6 v 7 = C<sub>4</sub> ⊕ b<sub>3</sub> v b<sub>2</sub> ⊕ b<sub>1</sub>

{% note %}

设已知传送的正确汉明码为 0100101，若传送后接收到的汉明码为 0100111，其出错位可以按照以下步骤确定

| 二进制序号     | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|----------------|---|---|---|---|---|---|---|
| 正确的汉明码   | 0 | 1 | 0 | 0 | 1 | 0 | 1 |
| 接收到的汉明码 | 0 | 1 | 0 | 0 | 1 | 1 | 1 |

则新的检测位为

P<sub>4</sub> = 4 ⊕ 5 ⊕ 6 ⊕ 7 = 0 ⊕ 1 ⊕ 1 ⊕ 1 = 1
P<sub>2</sub> = 2 ⊕ 3 ⊕ 6 ⊕ 7 = 1 ⊕ 0 ⊕ 1 ⊕ 1 = 1
P<sub>1</sub> = 1 ⊕ 3 ⊕ 5 ⊕ 7 = 0 ⊕ 0 ⊕ 1 ⊕ 1 = 0

P<sub>4</sub>P<sub>2</sub>P<sub>1</sub> = 110 = 6
所以是第 6 位出错

{% endnote %}

汉明码常常被用在纠错一位的场合，若欲实现检错两位，实用时还得再增添一位检测位

{% endnote %}
