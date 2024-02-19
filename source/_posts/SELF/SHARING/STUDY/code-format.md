---
title: code style and format
tags: [CODE, SHARING]
description: '代码格式与规范 实战'
date: 2024-02-18 10:19:24
---

前段时间一直在边看师兄代码边吐槽不规范，每一段每一行甚至行内的代码规范可能都不同。但是最近在接触的项目里还比较注重代码规范，反复的调试让人很崩溃。所以想写一篇专门讨论一下有关代码格式与规范，主要关注于格式化的方式（代码缩进等）而非类似[阿里巴巴 Java 代码规范黄山版](https://github.com/alibaba/p3c)这样的编程规范

{% note warning %}

比较幸运的是我在入门的时候走了一条更好的路——樊鑫老师要求所有人都去看 c bible 原本。刚上手的时候不会自己写，只能对着书里的示例代码敲来模仿，人家怎么写就怎么敲，所以就顺理成章的学会了 K&R 的标准 c 语言代码规范。再到后来需要配置自己的编辑器，用自带的 `=` 和 `clang-format` 来做代码的格式化，粗浅的了解了一点不同的标准。再后来要写 golang，一种有着强制代码规范要求和工具的语言。可以说成长的道路上一直对代码规范有一定的限制让我没走歪路。

这里放一段《C 程序设计语言》里 `strtol` 示例代码。可以注意到库导入后的空行、函数和单行的代码注释的使用、空格的位置、括号位置、空执行时分号的位置等等信息。如果你想要寻找这类书籍资源可以随便访问[一个仓库](https://github.com/PongsInk/LearningResource)来下载权威书籍的电子版本或购买纸质版。

```c
#include <ctype.h>

/* atoi: convert s to integer; version 2 */
int atoi(char s[])
{
    int i, n, sign;

    for (i = 0; isspace(s[i]); i++) /* skip white space */
        ;
    sign = (s[i] == '-') ? -1 : 1;
    if (s[i] == '+' || s[i] == '-') /* skip sign */
        i++;
    for (n = 0; isdigit(s[i]); i++)
        n = 10 * n + (s[i] - '0');
    return sign * n;
}
```

{% endnote %}

在经历了最初始的模仿阶段后，就应该寻找合适且合规的代码格式化规范了。尽管很多语言都有自己的格式要求或格式化工具，但是这里还是需要推荐 [`clang-format`](https://clang.llvm.org/docs/ClangFormat.html) 这种相对更为原始的 cli 工具，也是因为它有着更加严格和成体系的风格选择和详细的配置选择。你可以在[这里](https://clang.llvm.org/docs/ClangFormatStyleOptions.html)找到非常多官方的风格选项。

<img src="https://augists-upic.oss-cn-qingdao.aliyuncs.com/uPic/Screen Shot 2024-02-19 at 22.56.52.png"/>

你可以通过 `clang-format -style=llvm -dump-config > .clang-format` 来选择一个生成或直接进行代码格式化的使用它们。同时这也是 `clang-format` 配置文件里最重要的根基，直接定下了代码规范整体的风格体系。这里用上面的示例代码展示 LLVM、Microsoft 和 GNU 代码风格的结果，因为代码较短且不具有很强的代表性，所以区别并不明显，希望读者能注意到它们之间的区别（这里主要体现在函数名一行和代码缩进）

* LLVM

```c
#include <ctype.h>

/* atoi: convert s to integer; version 2 */
int atoi(char s[]) {
  int i, n, sign;

  for (i = 0; isspace(s[i]); i++) /* skip white space */
    ;
  sign = (s[i] == '-') ? -1 : 1;
  if (s[i] == '+' || s[i] == '-') /* skip sign */
    i++;
  for (n = 0; isdigit(s[i]); i++)
    n = 10 * n + (s[i] - '0');
  return sign * n;
}
```

* Microsoft

```c
#include <ctype.h>

/* atoi: convert s to integer; version 2 */
int atoi(char s[])
{
    int i, n, sign;

    for (i = 0; isspace(s[i]); i++) /* skip white space */
        ;
    sign = (s[i] == '-') ? -1 : 1;
    if (s[i] == '+' || s[i] == '-') /* skip sign */
        i++;
    for (n = 0; isdigit(s[i]); i++)
        n = 10 * n + (s[i] - '0');
    return sign * n;
}
```

* GNU

```c
#include <ctype.h>

/* atoi: convert s to integer; version 2 */
int
atoi (char s[])
{
  int i, n, sign;

  for (i = 0; isspace (s[i]); i++) /* skip white space */
    ;
  sign = (s[i] == '-') ? -1 : 1;
  if (s[i] == '+' || s[i] == '-') /* skip sign */
    i++;
  for (n = 0; isdigit (s[i]); i++)
    n = 10 * n + (s[i] - '0');
  return sign * n;
}
```

如果读者有关注例如 [Linux 内核源码](https://github.com/torvalds/linux) 的话，应该也能在文档里看到[它对代码格式化风格的要求](https://github.com/torvalds/linux/blob/master/Documentation/process/clang-format.rst)。这里就以内核源码为例，它要求使用 `clang-format -i kernel/*.[ch]` 来对文件进行格式化，并且对每一部分代码都有更为详细的要求来保证代码风格的统一并防止不同人重复提交相同代码的不同格式化风格版本。

当然，你也可以直接使用（更推荐在了解了原始工具之后）IDE 提供的功能或类似 [Prettier](https://prettier.io/) 这样的 code formatter 工具，它们对更多语言有着更好的适配和易用性。除此之外也有一些厂商的代码规范作为插件或文档提供出来，例如 [Batfish](https://github.com/batfish/batfish) 就要求[必须在 IDEA 里安装使用 google-java-format 插件](https://github.com/batfish/batfish/tree/master/docs/intellij_setup)（非常烦人的这个项目要求 clean import，去除未使用的导入且不能使用通配符，这让我的代码调试运行非常麻烦）。同时也可以关注例如 [Google 提供的代码风格引导文档](https://google.github.io/styleguide/)，它对不同语言都有着更为明确的要求。

选择一个适合自己且更为通用的代码格式化风格和规范非常重要，不仅是让自己在敲代码的时候避免一些错误，也能让自己和别人更方便的阅读代码。曾经班里经常有人会拿着代码来问我，而每次我都纠结于毫无章法的代码格式，被迫打开电脑先用工具进行合理的风格化之后才能看得下去 :(

{% note info %}

除了格式化风格，挑选一个适合自己的字体也非常重要。一种是使用大厂制作和推广的代码字体（例如 GitHub 之前推出的 [Monaspace](https://monaspace.githubnext.com/)），它们可能对例如 `==` `=>` 等编程中常见的字符有优化；另一种是使用 [Nerd Fonts](https://www.nerdfonts.com/)，它们对一些图标的特殊字符有优化，可以更好的利用你的 cli 环境。

{% endnote %}
