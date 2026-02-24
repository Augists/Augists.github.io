---
title: Is NDD similar with MDD or FDD?
tags: [NOTE, PAPER, NETWORK]
description: 'Multi-Valued Decision Diagram (MDD) 和 Function Decision Diagram (FDD) 在思想上和 NDD 有很大的相似性，你真的能分清楚他们之间的区别吗？'
date: 2026-02-24 15:24:36
---

## Basic: BDD-like data structure

Binary Decision Diagram (BDD) 二元决策图可以理解为一个边表示信息的二叉树结构，它用来编码二进制串的集合信息。例如将二叉树的左边定义为 0，右边定义为 1，那么也就意味着从二叉树的根节点开始遍历到叶子节点，总会表示一个具有固定顺序（含义）的二进制串，且其中某些位置可以置为 any（其实是置 0 和 1 的情况合并）。有点类似 Trie 结构的表示，但 BDD 更为紧凑和灵活。

<img alt="BDD Tree" src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/BDD%20Tree.png" />

## What is MDD and FDD?

> 这是两种 BDD 的变体结构，他们只是在表示信息的范围上有一些扩展，使其能够适应更多的场景，并没有触动 BDD 本质的结构

### MDD

Multi-Valued Decision Diagram (MDD)，是指将原本 BDD 的二元值域扩展到更大的固定整数空间，在创建时定义其值域范围（且相对较为固定）到 [0, 1, 2, ..., n]，其中 n 应大于等于 1（等于 1 时回退到 BDD）。通过对每个变量的值域扩展，使其可以更自然地表示有限域、多值逻辑、整型状态，在离散事件系统、规划问题、模型检查、组合问题中常用

需要注意的是，MDD 对每一个变量的值域限制可以是不同的。var 0 的可选值是 [0, 1, 2]，var 1 的可选值是 [0, 1, 2, 3, 4]，这是被允许的。但是同时也要注意，通常要求 MDD 的值域表示是从 0 开始的连续整数空间（尽管这在我看来不应是必须的）

<img src="https://tse1.mm.bing.net/th/id/OIP.QgqfrM3oz0wmiKugQYQzHgHaFO?pid=Api&ucfimg=1" />

（图中我认为并非是合理的最简表示，只是由于 MDD 形式限制而无法化简

另外，由于值域空间的扩展，终节点也自然进行了扩展，即 Multi-Valued DD >= Multi-Terminal DD

#### 结构表示

简易 demo

```c
struct MDDNode {
    var_index;             // 变量序号
    children[d];           // 一个数组/向量，d 是该变量的域大小
}
```

详细 demo 及 and 逻辑运算

```c
#include <stdio.h>
#include <stdlib.h>

typedef enum {
    NODE_INTERNAL,
    NODE_TERMINAL
} NodeType;

typedef struct MDDNode {
    NodeType type;
    char var;                 // 'x' or 'y'
    int domain_size;          // number of children for internal nodes
    struct MDDNode **children;
    int value;                // for terminal: 0 or 1
} MDDNode;

MDDNode* create_terminal(int value) {
    MDDNode *node = (MDDNode*)malloc(sizeof(MDDNode));
    node->type = NODE_TERMINAL;
    node->var = 0;
    node->domain_size = 0;
    node->children = NULL;
    node->value = value;
    return node;
}

MDDNode* create_internal(char var, int domain_size) {
    MDDNode *node = (MDDNode*)malloc(sizeof(MDDNode));
    node->type = NODE_INTERNAL;
    node->var = var;
    node->domain_size = domain_size;
    node->children = (MDDNode**)calloc(domain_size, sizeof(MDDNode*));
    node->value = 0;
    return node;
}

int eval_mdd(MDDNode *node, int x_val, int y_val) {
    if (node->type == NODE_TERMINAL) {
        return node->value;
    }
    int idx = 0;
    if (node->var == 'x') {
        idx = x_val;
    } else if (node->var == 'y') {
        idx = y_val;
    } else {
        return 0;
    }
    if (idx < 0 || idx >= node->domain_size) return 0;
    if (node->children[idx] == NULL) return 0;
    return eval_mdd(node->children[idx], x_val, y_val);
}

/* 结构级 AND：返回一个新的 MDD */
MDDNode* mdd_and(MDDNode *a, MDDNode *b) {
    if (a->type == NODE_TERMINAL && b->type == NODE_TERMINAL) {
        return create_terminal(a->value && b->value);
    }

    if (a->type == NODE_TERMINAL && b->type == NODE_INTERNAL) {
        // swap 保证 a 是 internal
        MDDNode *tmp = a; a = b; b = tmp;
    }

    if (a->type == NODE_INTERNAL && b->type == NODE_TERMINAL) {
        MDDNode *res = create_internal(a->var, a->domain_size);
        for (int i = 0; i < a->domain_size; ++i) {
            if (a->children[i]) {
                res->children[i] = mdd_and(a->children[i], b);
            } else {
                res->children[i] = mdd_and(create_terminal(0), b);
            }
        }
        return res;
    }

    // 两个都是 internal，假设变量/域一致
    if (a->var != b->var || a->domain_size != b->domain_size) {
        // 简化：真实实现应该做对齐，这里直接返回 0 节点
        return create_terminal(0);
    }

    MDDNode *res = create_internal(a->var, a->domain_size);
    for (int i = 0; i < a->domain_size; ++i) {
        MDDNode *ca = a->children[i] ? a->children[i] : create_terminal(0);
        MDDNode *cb = b->children[i] ? b->children[i] : create_terminal(0);
        res->children[i] = mdd_and(ca, cb);
    }
    return res;
}

void free_mdd(MDDNode *node) {
    if (!node) return;
    if (node->type == NODE_INTERNAL) {
        for (int i = 0; i < node->domain_size; ++i) {
            free_mdd(node->children[i]);
        }
        free(node->children);
    }
    free(node);
}

int main(void) {
    // 终端
    MDDNode *t0 = create_terminal(0);
    MDDNode *t1 = create_terminal(1);

    // f(x,y) = (x == 2 && y == 1)
    MDDNode *fy = create_internal('y', 2);
    fy->children[0] = t0;
    fy->children[1] = t1;
    MDDNode *fx = create_internal('x', 3);
    fx->children[0] = t0;
    fx->children[1] = t0;
    fx->children[2] = fy;

    // g(x,y) = (x == 1 || y == 0)
    MDDNode *gy = create_internal('y', 2);
    gy->children[0] = t1;
    gy->children[1] = t0;
    MDDNode *gx = create_internal('x', 3);
    gx->children[0] = gy;
    gx->children[1] = t1;
    gx->children[2] = gy;

    MDDNode *h = mdd_and(fx, gx); // h = f AND g

    int xs[] = {0,1,2};
    int ys[] = {0,1};

    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 2; ++j) {
            int x = xs[i], y = ys[j];
            int fv = eval_mdd(fx, x, y);
            int gv = eval_mdd(gx, x, y);
            int hv = eval_mdd(h,  x, y);
            printf("x=%d,y=%d : f=%d, g=%d, h=f&&g=%d\n", x, y, fv, gv, hv);
        }
    }

    free_mdd(h);
    // fx,gx,t0,t1 等有共享，严格 free 需要更精细，这里 demo 就不一一 free 了

    return 0;
}
```

#### 代码实现

> 实际实现可参考 [mddlib](https://github.com/colomoto/mddlib)

总体设计

- MDD 由固定数量的叶子 `[0..nbleaves)` 和一组有序的变量组成；每个非叶节点只记录“当前变量 + 每个取值的子指针”。节点索引、叶子值都用 int。
- MDDManager 是外部接口，负责创建/查询节点、组合、释放、reach、变量影响分析、dump/parse 等；MDDStoreImpl 是默认实现。
- 可选的变量顺序由 MDDManagerProxy 提供：它只做 index 映射，所有实际存储仍在同一个 MDDStore 上。

存储实现（internal/MDDStoreImpl）

- 底层用单个 `int[] blocs` 做内存池，按固定块大小存节点：`[varOrder, refCount, child0, child1, ...]`，块大小是最大变量取值数加 2。
- 唯一表：hashcodes 主表 + hashitems 链表，key 由变量和孩子组合，经 PAIR 计算哈希。确保结构共享、避免重复节点。
- 引用计数：`use(int)++`，`free(int)--`；计数到 0 时从哈希表摘掉并把块挂到 free list，同时递归 free 子节点。
- 构建节点：`getNode(var,l,r)`（二值）与 `getNode(var,int[])`（多值）；若左右/所有孩子相同直接返回孩子（结构共享）。
- 节点关系：getRelation 计算 LL/LN/NL/NN/NNf/NNn，供运算符快速走不同分支。
- 逻辑操作：not/mnot 通过叶子翻转重建共享结构；reach/groupReach 顺着赋值走到叶子（支持缺失值为“任意”）；getSign/getVariableEffect 递归分析变量影响。
- 状态建图：`nodeFromState(s,value)` 逆序包裹状态得到单一状态 MDD；nodeFromStates 用 OR 聚合多状态。
- 序列化：dumpMDD 输出 `(var,child...)` 形式；parseDump 逆解析并复用唯一表。

变量与工厂

- MDDVariable 持有 key/nbval/order 和指向 MDDStore，提供 getNode/getSimpleNode（区间真值构造）等便捷方法。
- MDDVariableFactory 记录变量及其基数；MDDManagerFactory 接受变量列表或工厂 + 叶子数创建 MDDStoreImpl。

组合运算（operators）

- MDDOperator 定义 combine(manager, a, b|array)；实现基于关系驱动递归。
- AbstractOperator 提供递归骨架与多路合并（可优化直接对多节点递归）；recurse 根据 NodeRelation 决定先拆谁、如何对子节点递归。
- AbstractFlexibleOperator 用 action table（递归/返回某侧/取 min/max/自定义等）快速定义新算子。
- 内置算子 MDDBaseOperators: AND/OR（短路叶子）、OVER/OVERLOAD（覆盖），都继承递归骨架；OverwriteOperator 用于“根据另一图覆盖为某固定叶值”。

辅助工具

- 路径遍历：PathSearcher 以迭代器方式枚举所有到叶子的路径，支持值过滤、区间检测；PathBacktrack 负责 DFS 回溯并填充路径/最大连续值。
- 映射与比较：MDDMapper 按 IndexMapper 将一个管理器的 MDD 映射到另一个（重建并用 AND/OVER 组合）；MDDComparatorFactory 生成比较器（同 backend 直接比索引、兼容变量次序递归比、否则用路径 reach 比较）。
- 其他：MDDComparator/NodeRelation/VariableEffect 枚举定义了比较和影响值语义。

逻辑函数子系统（logicalfunction）

- 用解析后的语法树描述布尔/多值逻辑表达式，统一接口 FunctionNode（getMDD 将表达式生成为 MDD）。
- 叶子：AbstractOperand（由 getMDDVariableKey 定位变量、getRangeStart/End 定义真值区间），ValueNode 固定叶值。
- 运算符节点：抽象 operators.AbstractOperator（逻辑层）+ AbstractUnaryOperator/AbstractBinaryOperator；AND/OR/NOT 工厂把符号/优先级/栈转换为节点，并在 getMDD 时调用对应 MDDBaseOperators。
- 解析：FunctionParser 使用 OperatorCollection（默认 &,|,!）扫描字符串、用 OperandFactory 生成叶子，输出 FunctionNode 语法树；SimpleOperandFactory 以给定变量列表创建最简单的布尔/阈值操作数并懒建 MDDManager。

核心设计要点

- 纯 int 数组 + 唯一表实现，避免对象开销，结构共享 + refcount 管理内存。
- 变量顺序固定，但可通过 MDDManagerProxy 暴露不同视图（同一后端）。
- 运算符框架将“关系判别 + 递归合并”抽象出来，便于自定义多值算子。
- 辅助组件提供遍历、比较、映射和表达式解析，围绕 MDDManager 接口协同工作。

但是 mddlib 好像没有 operation cache 缓存来优化重复结构的计算。

另外，参考 MDD 对节点的边集的存储方式，它无法实现类似 Reduced Ordered Binary Decision Diagram (ROBDD) 结构中的 reduced 化简操作，因为边的存储方式是以数组中的 index 来指向对应的子节点的，当一个 MDD 节点的多个边都指向同一个子 MDD 节点，它必须要重复建立相同指针的存储，这造成 MDD 内存结构虽然以数组的连续存储来优化访问，但又额外引入了冗余的存储。

### FDD

在 [NDD](https://xjtu-netverify.github.io/papers/NDD/NDD-final-version.pdf) 论文里，我们提到了两种 FDD 结构，分别命名为 $FDD^a$ (Firewall Decision Diagram / Function Decision Diagram) 和 $FDD^b$ (Forwarding Decision Diagram)。Forwarding DD 是直接判断是否与特定常量相等的结构，在每一个 varialbe 位置判断域是否等于特定值，例如 dstIP = 10.0.0.1 or not，最多修改为二分范围的分支判断，其适用范围较窄。后文的 FDD 为 Firewall DD。

FDD 是在 SDN、网络协议、ACL 等规则集中广泛使用的一种决策图。它不是数学上“多值变量的扩展”，而是 针对网络字段（IP/端口/协议）构建的高阶决策结构。

特点：

1. 决策的对象不是变量，而是“字段(Field)”
2. 每个节点的分支不是 0/1，也不是有限域，而是“区间 / 前缀 / 范围”，例如 srcPort 分支可以是 [0,1023], [1024,49151], [49152,65535]
3. 每个叶子节点对应一个“动作”，如 ACCEPT, DROP, Forward to Port X, Set VLAN ID

同样，Function DD >= Multi-Terminal DD

#### 结构表示

```c
struct FDDNode {
    field;                     // 例如 srcIP
    ranges[];                  // 区间分割，每个区间对应一条边
    children[];                // 区间 → 子节点
}
```

假设有两条规则：

| Rule | srcIP          | dstPort | Action |
| ---- | -------------- | ------- | ------ |
| R1   | 10.0.0.0/8     | 80      | ALLOW  |
| R2   | 192.168.0.0/16 | 22      | DROP   |

FDD 会构造成：

```text
                      (srcIP)
            ┌────────────┴────────────┐
       10.0.0.0/8                192.168.0.0/16
            |                           |
         (dstPort)                   (dstPort)
        /        \                  /        \
      80        others           22        others
      |           |              |           |
   [ALLOW]       [DEFAULT]     [DROP]     [DEFAULT]
```

详细 demo 和 or 运算

```java
import java.util.ArrayList;
import java.util.List;

class Range {
    int low;
    int high;
    Range(int low, int high) { this.low = low; this.high = high; }
    boolean contains(int v) { return v >= low && v <= high; }
}

class FDDNode {
    boolean isTerminal;
    int value;              // 0 or 1
    String field;           // e.g. "dstPort"
    List<Range> ranges;     // for internal node
    List<FDDNode> children; // for internal node

    static FDDNode terminal(int v) {
        FDDNode n = new FDDNode();
        n.isTerminal = true;
        n.value = v;
        return n;
    }

    static FDDNode internal(String field, int edgeCount) {
        FDDNode n = new FDDNode();
        n.isTerminal = false;
        n.field = field;
        n.ranges = new ArrayList<>(edgeCount);
        n.children = new ArrayList<>(edgeCount);
        return n;
    }
}

public class FDDRangeDemo {

    static boolean rangeIntersect(Range a, Range b, Range out) {
        int low = Math.max(a.low, b.low);
        int high = Math.min(a.high, b.high);
        if (low <= high) {
            out.low = low;
            out.high = high;
            return true;
        }
        return false;
    }

    static int eval(FDDNode node, int dstPort) {
        if (node.isTerminal) {
            return node.value;
        }
        for (int i = 0; i < node.ranges.size(); i++) {
            Range r = node.ranges.get(i);
            if (r.contains(dstPort)) {
                return eval(node.children.get(i), dstPort);
            }
        }
        return 0;
    }

    static FDDNode fddOr(FDDNode a, FDDNode b) {
        if (a.isTerminal && b.isTerminal) {
            return FDDNode.terminal(a.value | b.value);
        }

        if (a.isTerminal && !b.isTerminal) {
            FDDNode tmp = a; a = b; b = tmp;
        }

        if (!a.isTerminal && b.isTerminal) {
            FDDNode res = FDDNode.internal(a.field, a.ranges.size());
            for (int i = 0; i < a.ranges.size(); i++) {
                res.ranges.add(new Range(a.ranges.get(i).low, a.ranges.get(i).high));
                res.children.add(fddOr(a.children.get(i), b));
            }
            return res;
        }

        // both internal, assume same field
        if (!a.field.equals(b.field)) {
            return FDDNode.terminal(0);
        }

        FDDNode res = FDDNode.internal(a.field,
                a.ranges.size() * b.ranges.size());
        for (int i = 0; i < a.ranges.size(); i++) {
            for (int j = 0; j < b.ranges.size(); j++) {
                Range inter = new Range(0,0);
                if (rangeIntersect(a.ranges.get(i), b.ranges.get(j), inter)) {
                    res.ranges.add(inter);
                    res.children.add(fddOr(a.children.get(i), b.children.get(j)));
                }
            }
        }
        return res;
    }

    // F1: [0,999]->0; [1000,2000]->1; [2001,65535]->0
    static FDDNode buildF1() {
        FDDNode t0 = FDDNode.terminal(0);
        FDDNode t1 = FDDNode.terminal(1);

        FDDNode root = FDDNode.internal("dstPort", 3);
        root.ranges.add(new Range(0, 999));
        root.children.add(t0);

        root.ranges.add(new Range(1000, 2000));
        root.children.add(t1);

        root.ranges.add(new Range(2001, 65535));
        root.children.add(t0);

        return root;
    }

    // F2: [0,1499]->0; [1500,2500]->1; [2501,65535]->0
    static FDDNode buildF2() {
        FDDNode t0 = FDDNode.terminal(0);
        FDDNode t1 = FDDNode.terminal(1);

        FDDNode root = FDDNode.internal("dstPort", 3);
        root.ranges.add(new Range(0, 1499));
        root.children.add(t0);

        root.ranges.add(new Range(1500, 2500));
        root.children.add(t1);

        root.ranges.add(new Range(2501, 65535));
        root.children.add(t0);

        return root;
    }

    public static void main(String[] args) {
        FDDNode F1 = buildF1();
        FDDNode F2 = buildF2();
        FDDNode H  = fddOr(F1, F2);

        int[] tests = {900, 1200, 1800, 2300, 2600};
        System.out.println("port\tF1\tF2\tH=F1||F2");
        for (int p : tests) {
            int f1 = eval(F1, p);
            int f2 = eval(F2, p);
            int h  = eval(H,  p);
            System.out.printf("%d\t%d\t%d\t%d%n", p, f1, f2, h);
        }
    }
}
```

但 FDD 对范围的划分相对比较固定，例如规定在域声明阶段划定范围，后续便不再允许发生范围的布尔运算。或允许域的范围布尔运算，将会导致产生非常复杂的范围划分，每进行一次 FDD 逻辑运算都可能导致产生多个新的范围（以交运算为例，任意一次两个 FDD 节点的范围计算可能计算出最多 3 个新的子范围，这将导致域表示变得不可估计，范围划分逐渐不可控）

## Is NDD similar with MDD or FDD?

回到正题，MDD 和 FDD 与 [NDD (Network Decision Diagram)](https://xjtu-netverify.github.io/papers/NDD/NDD-final-version.pdf) 相似在哪，区别在哪？

![fig4](https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/ndd-drawio.png)

NDD 的结构表示是对域级别 BDD 的封装，这导致每个 NDD 节点的值域范围也像 MDD 和 FDD 那样超过了简单的两个值域。MDD 可以看作是对多个 variables 进行域封装的结果，FDD 可以判定为域封装下使用范围来进行信息表示。

但是 MDD 是预定义的固定值域范围，它直接的表示含义就是二元取值不满足一些场景的表示需要而创建出的，放到网络例如 ip 的场景下，MDD 的固定值域范围是 2^32 空间，这作为每一个 MDD 节点的边集显然是很夸张的。并且在我们的实际建模过程中，离散的域内解空间通常数量非常少，这给了 NDD 用以表示信息的能力优势，同时这也导致 NDD 无法预先判断可能的值域可能性，在开源的 [NDD](https://github.com/XJTU-NetVerify/NDD) 实现里直接使用 HashMap 来表示了这部分未知大小的可能性（同理 HashSet 或 ArrayList 也可以）。同时在逻辑运算时，MDD 类似 BDD，只需要在当前变量的值域范围内遍历所有可能性即可进行递归，其创建的新节点边数也是与运算节点相同的（同变量，同值域）；而在 NDD 中，离散的边集可能性造成参与运算的双方无法判断每一个边对是否会产生非空的交集，只能以最大可能性范围的笛卡尔积大小来预估逻辑运算创建的新节点边集大小。

PS：这也是 NDD 面临的实现上的问题

单纯看 MDD 节点的表示，它拥有我们在 NDD 中讲的所有 BDD 的问题（甚至由于 MDD 舍弃了 BDD 的合并化简优势，导致问题更为夸张），其本质仍然是多元值域的 BDD 结构表示，且多元值域的遍历哈希导致可能会加剧下层节点与上层节点耦合性的影响

NDD 最开始的思考角度就是以域级别来看待问题，这与 FDD 的思想不谋而合。FDD 在域的角度上对每一个部分进行了整体性的合并，但其一方面并没有对域之间进行解耦合，域之间的联动影响由于新范围的产生被放大了（具体表现为在子节点运算产生了多个不同范围，即多个子 FDD 节点时，它们都需要递归的冗余创建多遍上层 FDD 节点来表示。且 FDD 的范围信息表示使得它在 Reduced 化简上也更为复杂，不同范围导向相同的子 FDD 节点无法在上层节点的边集上进行合并（这会带来非常大的节点爆炸问题）。诚然，在变量的值域范围上，它较好的使用了范围进行划分，有点类似在网络验证中我们对空间的原子划分，但它扩大了 BDD 的问题及不再能应对离散的信息表示使得 FDD 也有着非常大的限制。FDD 本质上其实是一个对 MDD 的变体：连续的值域空间，冗余的节点定义，无法合并的节点爆炸问题，域范围定义的时间和限制。我们可以将 FDD 看作只是对 MDD 值域的另一种表示形式。

NDD 核心思想在于保留离散表示能力和范围合并化简的同时，通过完全的解耦合及边集中灵活的合并拆分，从而在表示能力完整的基础上将域的信息表示进行整合，从而在内存上得以更好的简化。同时由于更高维度的视角（bit 到 field 的转变），它带来了逻辑运算上 field jump 好处，使决策遍历可以从 (bit by bit) 升级为 (field by field first, then bit by bit)。

更多相关结构的对比分析请参考 [NDD Paper](https://xjtu-netverify.github.io/papers/NDD/NDD-final-version.pdf)。
