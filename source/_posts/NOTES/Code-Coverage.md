---
title: Code Coverage
tags: [NOTE]
description: 'Organized notes on code coverage related content'
date: 2023-12-08 14:12:07
---

{% note warning %}

Coverage Criteria

* Function coverage: each function or subroutine
* Statement coverage: each statement
* Edge coverage: every edge in the control-flow graph
  * Branch coverage: each branch (also called DD-path) of each control structure (e.g. `case`)
* Condition coverage (predicate coverage): each boolean sub-expression evaluated both to true and false

> condition coverage does not necessarily imply branch coverage if the programming language does not perform short-circuit evaluation
>
> if a and b <- a is false then the whole statement is false

* Modified condition/decision coverage: combination of function coverage and branch coverage; every point of entry and exit has been invoked at least once and every decision has taken on all possible outcomes at least once (sometime used as a synonym for branch coverage)
* Multiple condition coverage: all combinations of conditions inside each decision are tested (2^n)
* Parameter value coverage (PVC): all the common values for parameters in a method are considered
  * null
  * empty
  * whitespace (space, tab, newline)
  * valid string
  * invalid string
  * single-byte string
  * double-byte string
* Linear Code Sequence and Jump (LCSAJ) coverage (JJ-Path coverage): every LCSAJ/JJ-path executed
* Path coverage: every possible route through a given part of the code executed
* Entry/exit coverage: every possible call and return of the function executed
* Loop coverage: every possible loop executed zero times, once, and more than once
* State coverage: each state in a finite-state machine reached and explored
* Data-flow coverage: each variable definition and its usage reached and explored

## Get Started

1. Find the right tool

* Java: [Atlassian Clover](https://www.atlassian.com/software/clover), [Cobertura](http://cobertura.github.io/cobertura/), [JaCoCo](http://www.eclemma.org/jacoco/)
  * [JaCoCo Documentation](https://www.jacoco.org/jacoco/trunk/doc/)
* Javascript: [istanbul](https://github.com/gotwarlost/istanbul)
* PHP: [PHPUnit](https://phpunit.de/)
* Python: [Coverage.py](https://coverage.readthedocs.io/)
  * using python trace function, a callback that the Python interpreter will invoke for every function call and line of Python executed
  * [How C trace functions really work](https://nedbatchelder.com/text/trace-function.html)
* Ruby: [SimpleCov](https://github.com/colszowka/simplecov)

[comparison of tools](https://confluence.atlassian.com/clover/comparison-of-code-coverage-tools-681706101.html)

2. What percentage of coverage should you aim for

* With that being said it is generally accepted that 80% coverage is a good goal to aim for.
* Don't write tests that are hitting every line of the code instead of writing tests that are based on the business requirements of your application
* Test from a user perspective and not just by looking at lines of code.

3. Focus on unit testing first
4. Use coverage reports to identify critical misses in testing
5. Make code coverage part of your continuous integration flow when you are ready
6. Good coverage does not equal good tests

{% endnote %}
