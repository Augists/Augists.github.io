---
title: An Introduction to Binary Decision Diagrams
tags: [NOTE, PAPER, NETWORK]
description: 'Paper Note'
date: 2024-01-08 14:14:52
---

{% note warning %}

```code
Table T: u -> (i, l, h)
  init(T)                     initialize T to contain only 0 and 1
  u <- add(T, i, l, h)        allocate a new node u with attributes (i, l, h)
  var(u), low(u), high(u)     lookup the attributes of u in T
```

```code
Table H: (i, l, h) -> u
  init(H)                     initialize H to be empty
  b <- member(H, i, l, h)     check if (i, l, h) is in H
  u <- lookup(H, i, l, h)     find H(i, l, h)
  insert(H, i, l, h, u)       make (i, l, h) map to u in H
```

```code
MK[T, H](i, l, h)
  if l = h then return l            # if low == high, pass the node and point to its child
  else if member(H, i, l, h) then   # if node in H, return it and do not create a new one
    return lookup(H, i, l, h)
  else
    u <- add(T, i, l, h)            # create node in T and map in H
    insert(H, i, l, h, u)
    return u
```

```code
BUILD[T, H](t)
function BUILD'(t, i)               # i is the lowest index at first
  if i > n then                     # terminal node
    if t is false then return 0 else return 1
  else                              # build from bottom to top recurisively
    v0 <- BUILD'(t[0/xi], i + 1)
    v1 <- BUILD'(t[1/xi], i + 1)
    return MK(i, v0, v1)
end BUILD'

return BUILD'(t, 1)
```

```code
APPLY[T, H](op, u1, u2)             # combine two ROBDDs? O(|u1||u2|)
init(G)

function APP(u1, u2)                # call from top to bottom, compute from bottom to top
  if G(u1, u2) != empty then return G(u1, u2)
  else if u1 in {0, 1} and u2 in {0, 1} then u <- op(u1, u2)
  else if var(u1) = var(u2) then
    u <- MK(var(u1), APP(low(u1), low(u2)), APP(high(u1), high(u2)))
  else if var(u1) < var(u2) then
    u <- MK(var(u1), APP(low(u1), u2), APP(high(u1), u2))
  else  # var(u1) > var(u2)
    u <- MK(var(u2), APP(u1, low(u2)), APP(u1, high(u2)))
  G(u1, u2) <- u
  return u
end APP

return APP(u1, u2)
```

```code
RESTRICT[T, H](u, j, b)             # find the ROBDD for some condition, i.e., t[0/x3, 1/x5, 1/x6]
function res(u)
  if var(u) > j then return u
  else if var(u) < j then return MK(var(u), res(low(u)), res(high(u)))
  else if b = 0 then return res(low(u))
  else  # var(u) = j, b = 1
    return res(high(u))
end res

return res(u)
```

```code
SATCOUNT[T](u)                      # determine the number of valid truth assignments
function count(u)
  if u = 0 then res <- 0
  else if u = 1 then res <- 1
  else res <- 2^(var(low(u))-var(u)-1) * count(low(u)) + 2^(var(high(u))-var(u)-1) * count(high(u))
  return res
end count

return 2^(var(u)-1) * count(u)
```

```code
ANYSAT(u)                           # find a satisfying truth-assignment, find a path leading to 1 by DFS, prefering low-edges over high-edges
  if u = 0 then Error
  else if u = 1 then return []
  else if low(u) = 0 then return [x_var(u) -> 1, ANYSAT(high(u))]
  else return [x_var(u) -> 0, ANYSAT(low(u))]
```

```code
ALLSAT(u)                           # find all paths from a node u to the terminal 1
  if u = 0 then return {}
  else if u = 1 then return {[]}    # {} denotes swquences of truth assignments
  else return
    {
      add[x_var(u) -> 0] in front of all truth-assignments in ALLSAT(low(u)),
      add[x_var(u) -> 1] in front of all truth-assignments in ALLSAT(hight(u))
    }
```

```code
SIMPLIFY(d, u)                      # simplify an ROBDD by trying to remove nodes based on a domain d
function sim(d, u)
  if d = 0 then return 0
  else if u <= 1 then return u
  else if d = 1 then
    return MK(var(u), sim(d, low(u)), sim(d, high(u)))
  else if var(d) = var(u) then
    if low(d) = 0 then return sim(high(d), high(u))
    else if high(d) = 0 then return sim(low(d), low(u))
    else
      return MK(var(u), sim(low(d), low(u)), sim(high(d), high(u)))
  else if var(d) < var(u) then
    return MK(var(d), sim(low(d), u), sim(high(d), u))
  else
    return MK(var(u), sim(d, low(u)), sim(d, high(u)))
end sim

return sim(d, u)
```

| method | time | note |
| ------ | ---- | ---- |
| MK(i, u0, u1) | `O(1)` | |
| BUILD(t) | `O(2^n)` | |
| APPLY(op, u1, u2) | `O(abs(u1) * abs(u2))` | |
| RESTRICT(u, j, b) | `O(abs(u))` | |
| SATCOUNT(u) | `O(abs(u))` | |
| ANYSAT(u) | `O(abs(p))` | `p = ANYSAT(u), abs(p) = O(abs(u))` |
| ALLSAT(u) | `O(abs(r)*n)` | `r = ALLSAT(u), abs(r) = O(2^abs(u))` |
| SIMPLIFY(d, u) | `O(abs(d) * abs(u))` | |

{% endnote %}
