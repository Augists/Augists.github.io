---
title: Record an experience of computer fixing
tags: [THINKING]
description: 'Export My Thought'
date: 2021-10-25 20:28:05

---

{% note warning %}

昨天朋友的 windows 在更新系统的时候，突然蓝屏了，叫我过去帮忙。

蓝屏代码 0xc0000001，网上查询其错误原因特别乱，最终确定可能是因为系统引导故障。

电脑是 ROG 的笔记本，每次开机时间都超级长。出现蓝屏问题后，无法正常进入系统。F8通过安全模式启动，无论是否带命令行的安全模式（我应该没记错，也可能叫恢复模式）还是是否禁用一些启动设置再启动系统，都无法进入系统。尝试了自带的修复工具、恢复到还原点（3个）、UEFI固件设置等所有可以尝试的操作（除了直接重置系统），都没有任何反应。

其实修电脑并不是我想说的，最终的修复方法是用其他电脑做了一个windows的启动盘然后将系统装在D盘，并且成功进入了新做好的系统，并将C盘里需要的文件拷贝回来。我是在想。。。

当你使用一套别人制作好并且闭源的系统，当它出现这种故障时，你只能使用开发者提供的修复工具尝试进行修复，而无法了解为什么出现这个问题，如何复现，怎么才能避免出现这种状况。我一直提倡的理念是，简约、但将其他复杂的功能作为备选项提供给用户，让它的决定权还给用户自己。我可以不用，但你不能没有。以手机系统为例，我可以将屏幕刷新率默认设置到一个用户能接受并且对系统影响不大的数值，比如系统默认设置为60Hz的刷新率，同时提供90Hz、120Hz甚至ProMotion这种可变刷新率的选项。依照它的实用程度、用户的使用频率甚至说计算出的用户使用的可能性，将它放在一定的系统设置的层级深度。比如刚才提到的屏幕刷新率设置放在 设置-显示-屏幕刷新率 层级里，或是 设置-显示-屏幕-刷新率，因为屏幕刷新率是用户有可能与默认设置意见不同而进行修改的选项。如果提供了如ProMotion这种动态可变刷新率的设置，当用户将刷新率修改为ProMotion后，屏幕刷新率的选项设置层级会进行下移，将它放入 设置-其他-屏幕（显示）-屏幕刷新率 这种角落里。本身系统提供了最基础最大众最优化（甚至可以说是让用户感知的结果最好）的方案，将方案的修改细节同样提供给用户可以进行任意的修改。

说完我自己的想法，那就可以来说说现在市场上的产品了。windows作为一个完全闭源，基本软件也闭源的操作系统，可以说是和我相去甚远的。当我遇到这种情况，仅仅使用它提供的工具和手段无法方便快捷的解决问题时，我会非常无能为力。macOS只能说达标了一部分。本身系统也闭源，但是它很好的提供了对开源的Linux的兼容性，同时开放的去接受了大量开源软件和开源思想。所以当你在macOS上遇到了问题，如果你有能力，是可以一定程度上自己尝试解决的。但是在开放系统本身上，它做的只是提供了一套非常优秀的配置方案，而并没有给用户开放更多的权限了。在Linux的众多发行版里，arch就比较极端，ubuntu系中规中矩。arch（甚至gentoo）将所有都开放给了用户， 甚至可以说连最基本的都完全交给用户自己定义。ubuntu系本身提供了一套还不错的路子，但是似乎在可自定义性上稍微会差一点。介于中间的像Manjaro同时兼具了提供配套服务、提供用户最大化的选择权，同时拥有类arch的自定义性，所以我一直把Manjaro当作我心目中最佳的选择了。

{% endnote %}