---
title: 'Header Space Analysis: Static Checking For Networks'
tags: [NOTE, PAPER, NETWORK]
description: 'Paper Note'
date: 2023-10-26 13:50:29
---

{% note warning %}

{% note danger %}

**Word & Explanation**

* slicing: partition networks
* secure slice: no packet from one slice can be controlled by or read by the other slice
* take the notion of isolation further, and enable the static analysis of networks sliced in more general ways -> each slice has own control plane
* Ψ: network transfer functions
![](https://i.imgur.com/MYuEuho.png)
* Γ: topology transfer function
![](https://i.imgur.com/R7XwhiP.png)
* H: Header space
* N: Network space
* header: both packet headers (points in H) and wildcard expressions (hyper-cubes in H)

{% endnote %}

{% note info %}

Even when individual protocols function correctly, failures can arise from the complex interactions of their aggregate, requiring network administrators to be masters of detail.

---

Header Space Analysis (HSA) statically check network specifications and configurations

* entire packet header as a concatenation of bits without any associated meaning -> {0, 1}^L space
* networking boxes transform packets from one point in the space to another point or set of points (multicast)

Goal:
* help system administrators statically analyze production networks
* make it easier for system administrators to guarantee isolation between sets of hosts, users or traffic

Key:
* generalization of the geometric approach to packet classification

1. jettison the notion of pre-specified fields in favor of a header space of L bits where each packet is represented by a point in {0, 1}^L space, where L is the header length
2. model all router and middlebox processing as box transfer functions transforming subspaces of the L-dimensional space to other subspaces
3. model a network of boxes using a network transfer function, Ψ and a topology transfer function, Γ

Model:
Φ(.) = Ψ(Γ(.)) -> if a packet with header h enters a network on port p, the header after k hops will be Ψ(Γ(...(Ψ(Γ(h, p)...), or simply Φ^k (h, p)

Algebra:
* set operations
  * intersection
    * For two headers to have a non-empty intersection, both headers must have the same bit value at every position that is not a wildcard.
    * If two headers differ in bit bi, then the two headers will be in different hyper-planes defined by bi = 0 and bi = 1.
    ![](https://i.imgur.com/Qr9ilqK.png)
    z means the bitwise intersection is empty, if any bit returns z, the intersection of all bits is empty
  * union
    * cannot be simplified
  * complementation
    ![](https://i.imgur.com/ojn2Mi1.png)
  * difference(minus)
    * A − B = A ∩ B′
    * The difference operation can be used to check if one header is a subset of another: A ⊆ B ⇐⇒ A − B = φ
* transfer functions
  * Domain
    * the set of all possible (header, port) pairs that the transfer function accepts
  * Range
    * the set of all possible (header, port) pairs that the transfer function can output after applying all possible inputs on every port
  * Range Inverse

Reachability Analysis:

![](https://i.imgur.com/0yc3QrQ.png)

![](https://i.imgur.com/7MNeWde.png)

* Complexity:
  * Linear Fragmentation assumption: each of the input wildcard expressions will match only a few rules in the transfer function and generate at most cR(c << R)
  * running time is O(dR^2) where d is the network diameter and R is the maximum number of forwarding rules in a router

* Loop Detection (breadth first search)
  * generic loop
    * inject an **all-x** test packet header from **each port** in the network and track the packet until:
      * It leaves the network
      * It returns to a port already visited (Pret) -> report twice
      * It returns to the port it was injected from (Pinj) -> **Loop**
      ![](https://i.imgur.com/KyZyVXM.png)
      ![](https://i.imgur.com/B6DFFI7.png)
    * Complexity
      * same algorithmic structure as reachability test -> O(dPR^2), P is number of ports that need to inject
  * infinite loop
    * Let hret denote the part of header space that returns to A1, then horig = Φ^−1(Φ^−1(Φ^−1(Φ^−1(hret, A1)))) is the original header space that produces hret
    * hret and horig relate in:
      * hret ∩ horig = φ -> finite
      * hret ⊆ horig -> infinite
      * Neither -> redefine hret := hret ∩ horig and calculate the new horig
  > An example of a generic, but finite loop, is an IP packet that loops until the TTL decrements to zero

* Slice Isolation
  * create new slices isolated
    * require identification of a region of network space that does not overlap with region belonging to existing slices -> no header space in common on any common port
  * detect when slices are leaking traffic
    * Leakage occurs when a packet in slice a at any switch-port can be rewritten to fall into the network space of another slice
    * apply the network transfer function of slice a to its header space reservation -> generate all possible packet headers (output header set)
    * If the output header space of slice a at any switch port, overlaps with any other slice, then there is the potential for leaks
    ![](https://i.imgur.com/LU658ls.png)
  * Complexity
    * O(W^2 N ), where W is the maximum number of wildcard expressions used to describe any slice’s reservation and N is the total number of slices in the network

![](https://i.imgur.com/CE9sbqy.png)

{% endnote %}

{% endnote %}
