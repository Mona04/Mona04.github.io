---
excerpt: "계산이론에서 Problem 의 분류, 체계."
tags: []
use_math: true
---

## Decision Problem

[Decision Problem](https://en.wikipedia.org/wiki/Decision_problem) 은 [Function Problem](https://en.wikipedia.org/wiki/Function_problem) 의 특수형태로 다음과 같이 정의할 수 있다.

> A decision problem $$P$$ is defined by a relation 
$$ \mathit{R} \subseteq \Sigma^* \times \{\text{Yes}, \text{No} \}$$ 
over strings of an arbitrary alpabet $$\Sigma$$ .

Algorithm 은 input $$x$$ 가 주어질 때 $$(x, y) \in \mathit{R}$$ 이 존재하면 $$y$$ 를 찾고 존재하지 않으면 정의되지 않는다. 


우리가 접하는 많은 문제들은 Function Problem 에 속한다. 그럼에도 Decision Problem 은 매우 중요하다. decidable 여부를 판단할 때 Function Problem 을 더 간단한 Decision Problem 으로 환원시킬 수 있기 때문이다. 
+ 예를들어  ```i``` 번째의 비트 값이 ```1``` 인지 체크하는 characteristic function 같은걸 사용해 Function Problem 을 Decision Problem 으로 바꿀 수 있다. 그리고 이들의 조합으로 우리는 Function Problem 을 풀 수 있다. 이때 계산복잡도와는 연관이 없다.



## Reduction

> Problem A, B 가 있어서 A 를 풀기위해 B 를 서브루틴으로 사용하고 나머지 과정은 선형시간 내에 동작하는 알고리즘이 있다고 하자. 그럼 A can [reduce](https://en.wikipedia.org/wiki/Reduction_(complexity)) in polynomial time to B.

+ 만약 B 를 선형시간 내에 풀 수 있으면 A 역시 마찬가지다.
+ 대우로 A 가 선형시간 내에 풀 수 없으면 B 역시 마찬가지다.
+ $$ A \leq_{P} B $$ 로 표기한다.



## Decidable

decidable 은 논리학에서 syntax 와 관련된 개념으로 크게 두가지 의미로 사용된다.  
+ A statement $$P$$ is decidable in a system $$S$$  iff $$\vdash_{S} P$$ or $$\vdash_{S} \neg P$$.
+ A logical system is decidable if there is an effective method for determining whether arbitrary formulas are theorems of the logical system.[^wiki_decidability]

비슷하게 계산이론에서는 다음과 같은 의미를 갖는다.
+ A problem is decidable if there exists an effective method for deriving the correct answer.[^wiki_decidability]
+ A decision problem is decidable if 
$$R_\text{Yes} = \{ (s, r) \in R  \; \vert \; r = \text{Yes} \}$$ is
 [computable set](https://en.wikipedia.org/wiki/Computable_set).

이때 [effective method](https://en.wikipedia.org/wiki/Effective_method) 라는 다소 엄밀하지 않은 개념이 사용된다. [Church Turing Thesis](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis) 에 따르면 이는 곧 Turing Machine 이다. 
엄밀한 개념이 아니라서 증명불가능한 명제지만, 현재 물리적으로 존재하는 모든 컴퓨터는 다 튜링머신으로 바꿀 수 있고 역도 같아 일반적으로 참이라고 간주된다.

그래서 보통 Turing Machine 으로 유한한 시간안에 답을 얻을 수 있는 Problem 을 Decidable 하다고 한다.

그렇지 않은 문제를 Un-Decidable Problem 이라고 한다. 대표적으로 [Halting Problem](https://en.wikipedia.org/wiki/Halting_problem) 이 있다. 

흥미롭게 baba is you 도 un-decidable 하다. halting problem $$\leq_{P}$$ 어떤 문제 $$\leq_{P}$$ baba is you 가 성립하기 때문이다[^babaisyou].




## Complexity Classes

Decidable 문제 중에 얼마나 빨리 풀 수 있는지에 따라 다시 분류할 수 있다.



### NP

Non-deterministic Polynomial Time Problem 의 약자로, DTM 을 이용한 정의와 [NTM](https://en.wikipedia.org/wiki/Nondeterministic_Turing_machine) 을 이용한 정의가 있다.
> 
+ NP is the set of decision problems for which the problem instances, where the answer is "yes", have _proofs_ verifiable in polynomial time by a deterministic Turing machine.[^wiki_np]
+ NP is the set of decision problems verifiable in polynomial time by a nondeterministic Turing machine.[^wiki_np]

proof 는 Input 외에 문제를 풀기위해 주어지는 추가적인 정보이다. 선형시간 내에 검증할 수 있어야 하므로 proof 는 선형길이의 문자열이 된다. 

알고리즘이 경우의 수를 찾아서 그 경우에 맞는지 체크하는 두가지 과정으로 이루어졌다고 본다면, proof 는 맞는 경우를 선형시간 내에 찾을 수 있게 하는 정보라고 생각할 수 있다. 

NP 에서는 답이 "no" 인 input 에 대해서 verifier 는 선형시간 내에 "no" 를 주게 된다. 

#### Quantum Computer

NTM 의 경우 양자컴퓨터에서 일부 가능한데, 그렇다고 DTM 에서 불가능한 계산을 할 수 있진 않다. Non-deterministic 한 절차는 countable 하므로 DTM 에서 bfs 등으로 전부 해보면 되기 때문이다.



### NP-Complete

> A NP problem $$A$$ is NP-Complete if $$\forall {B \in \mathit{NP}}$$ can reduce in polynomial time to $$A$$.

+ $$A \in P \rightarrow NP = P$$ 가 성립한다.
+ $$A$$ 를 포함한 $$NP$$ 의 문제 중 하나라도 선형시간에 풀 수 없으면 $$A \notin NP$$ 이고 곧 $$NP \neq P$$ 이다.
+ NP-Complete 는 NP 중 가장 어려운 문제라고 말할 수 있다.


#### Examples

If a NP-Complete problem can reduce in polynomial time to B and B is NP, then B also NP Complete. 그래서 다른 문제가 NP-Complete 인지 보이는 것은 이미 주어진 NP-Complete 문제가 있다면 쉽게 보일 수 있다.

reduction 없이 NP-Complete 라고 증명된 문제는 Cook-Levin Theorem 으로 증명된  3-CNF-SAT 문제가 대표적이다. (ex. ```(a or b or c) and (d or e or f) and ...```).  SAT 을 사용하여 많은 문제들이 NP-Complete 임이 증명된다.

그래프에서 서로 직접 연결된 정점 그룹을 clique 라고 한다. 그래프가 주어졌을 때 크기가 k 보다 큰 clique 가 존재하는지를 묻는 문제가 k-clique 이다. 이 문제는 3-CNF-CAT 문제로부터 reduce 되고 NP 임은 쉽게 보일 수 있어 NP-Complete 다.

k 이상의 independent set 이 있냐는 문제 역시 NP-Complete 이다. k-clique 가 존재하는 graph 면 그것의 complement graph 는 k 이상의 independent set 이 존재하고 그 역도 성립한다. 이를 이용해 reduction 을 쉽게 진행할 수 있다. k-vertex cover 문제도 비슷한 방법으로 NP-Complete 임을 보일 수 있다.

0-1 Integer Linear Programming.

배낭문제도 NP-Complete 이다. 

지뢰찾기도 NP-Complete 이다[^minesweeper].



### NP-Hard

> H is NP-hard when for every problem L in NP, there is a polynomial-time many-one reduction from L to H.[^wiki_np_hard]

np-complete 에서 np 라는 조건만 빼면 같다. 그래서 어떤 문제가 NP-Hard 인지 보이려면 np-complete 문제에서 polynomial-time reduction 이 가능한지 보이면 된다.

대표적인 NP-Hard 문제는 Halting Problem 이다. 증명은 간단하다. NP-Complete 인 SAT 문제를 푸는 알고리즘은 존재한다. 이를 변형해서 SAT 가 "yes" 이면 "yes" 를 아니면 무한루프를 도는 프로그램을 만들 수 있다. 이제 이 프로그램을 Input 으로 Halting Problem 을 풀면 SAT 문제를 풀 수 있다. 




## 참고자료
 
<p class="footnote" role="doc-endnotes">
Dynamic Programming, Greedy Algorithms, University of Colorado Boulder, Cousera
<br/>
<a href="https://stackoverflow.com/questions/1857244/what-are-the-differences-between-np-np-complete-and-np-hard">
SO. What are the differences between NP, NP-Complete and NP-Hard?
</a>
</p>

[^wiki_decidability]: [wiki. decidability](https://en.wikipedia.org/wiki/Decidability_(logic))

[^wiki_np]: [wiki. np](https://en.wikipedia.org/wiki/NP_(complexity))

[^wiki_np_hard]: [wiki. np hard](https://en.wikipedia.org/wiki/NP-hardness)

[^babaisyou]: [Jonathan Geller. Baba is You is Undecidable. 2022.](https://arxiv.org/abs/2205.00127)

[^minesweeper]: [Minesweeper and NP-completeness](https://web.mat.bham.ac.uk/R.W.Kaye/minesw/ordmsw.htm)
