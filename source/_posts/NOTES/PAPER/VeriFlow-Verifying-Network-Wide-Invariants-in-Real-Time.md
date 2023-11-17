---
title: 'VeriFlow: Verifying Network-Wide Invariants in Real Time'
tags: [NOTE, PAPER, NETWORK]
description: 'paper note'
date: 2023-11-08 10:59:39
---

{% note warning %}

{% note info %}

* check network-wide invariants in real time, as the network state evolves
* a layer between a software-defined networking controller and network devices that checks for network-wide invariant violations dynamically
* incremental algorithms
  1. slice the network into a set of equivalence classes (ECs) of packets based on the new rule and the existing rules that overlap with the new rule
  2. build individual forwarding graphs for each of these ECs using the current network state
  3. traverse these graphs to query the status of one or more invariants

* reachability checks
  * NP-Complete
    * packet filters
    * arbitrary programs allowed
    * real-time checks
  * solution
    1. monitor all the network update events in a live network
    2. confine our verification activities to only those parts of the network whose actions may be influenced by a new update
    3. a custom algorithm

* jobs
  1. track every forwarding-state change event -> intercept all these rules and verify them before they reach the network
    * a shim layer between the controller and the network and monitors all communication in either direction
  2. verify the effect of the rule on the entire network at very high speeds
    1. slice the network into a set of equivalence classes of packets 
      * based on the new rule and the existing rules that overlap with the new rule
      * Packets belonging to an equivalence class experience the same forwarding actions throughout the network
      * data structure to quickly store new network rules and find overlapping rules <- *prefix tree* or *trie* (an ordered tree data structure that is used to store an associative array)
    2. build individual forwarding graphs for every equivalence class using the current network state
      * a node represents an equivalence class at a particular device
      * a directed edge from node A to node B if according to the forwarding table at node A, the next hop for the equivalence class is node B
      * For each equivalence class, we traverse the trie structure to find the devices and rules that match packets from that equivalence class, and build the graph using this information.
    3. run queries
      * an algorithm, which takes as input an invariant to be checked, traverses the forwarding graphs of the affected equivalence classes, and outputs information about whether the invariant holds.
      * traverse every forwarding graph using depth-first search
      * encounter a node
        * twice -> routing loop
        * not have any outgoing edge -> black hole
      * if violated -> execute an associated action that is pre-configured for each invariant by the network operator
        * drop the rule
        * install the rule but generating an alarm for the operator

* implementation
  * intercept all network events in an OpenFlow network in a transparent manner
    * as a proxy application
    * determine message boundaries within this stream of bytes and filter out rule insertion/deletion messages
      * buffer and check whether a complete OpenFlow message or not
      * Flow Modification message -> invokes rule verification module
  * use of trie structure
    * consider each rule as a binary string and use individual bits to prepare the trie
    * each node has three branches
      1. if the corresponding rule bit is 0 -> 0 and the don’t care branch
      2. the bit is 1 -> 1 and the don’t care branch
      3. the bit is don’t care -> explore all the branches of the current node
    * the leaves store the actual rules that are represented by the path that leads to a particular leaf starting from the root of the trie.
  * graph-cache based strategy to speed up
    * maintain a cache of forwarding graphs indexed by their equivalence classes
      * some equivalent classes will remain common across multiple rule insertions and their forwarding graphs can be reused by updating the graphs with the new rules.

{% endnote %}

{% endnote %}
