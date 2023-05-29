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

그렇지 않은 문제를 Un-Decidable Problem 이라고 한다. 대표적으로 Halting Problem 이 있으며 그 밖에 많은 문제들이 알려져 있다.


## Complexity Classes

Decidable 문제 중에 얼마나 빨리 풀 수 있는지에 따라 다시 분류할 수 있다.



### NP

Non-deterministic Polynomial Time Problem 의 약자로, DTM 을 이용한 정의와 [NTM](https://en.wikipedia.org/wiki/Nondeterministic_Turing_machine) 을 이용한 정의가 있다.
> 
+ NP is the set of decision problems for which the problem instances, where the answer is "yes", have _proofs_ verifiable in polynomial time by a deterministic Turing machine.[^wiki_np]
+ NP is the set of decision problems verifiable in polynomial time by a nondeterministic Turing machine.[^wiki_np]

proof 는 Input 외에 문제를 풀기위해 주어지는 추가적인 정보이다. 선형시간 내에 검증해야하므로 proof 는 선형길이의 문자열이 된다. 알고리즘이 경우의 수를 찾아서 그 경우에 맞는지 체크하는 두가지 과정을 거친다면, proof 는 맞는 경우를 선형시간 내에 찾을 수 있게 하는 정보라고 생각할 수 있다. 

NP 에서는 답이 "no" 인 input 에 대해서 verifier 는 선형시간 내에 "no" 를 주게 된다. 


#### NP-Complete

> Problem A, B 가 있어서 A 를 풀기위해 B 를 서브루틴으로 사용하고 나머지 과정은 선형시간 내에 동작하는 알고리즘이 있다고 하자. 그럼 A can reduce in polynomial time to B.

+ 만약 B 를 선형시간 내에 풀 수 있으면 A 역시 마찬가지다.
+ 대우로 A 가 선형시간 내에 풀 수 없으면 B 역시 마찬가지다.

> An NP problem $$A$$ is NP-Complete if $$\forall {B \in \mathit{NP}}$$ can reduce in polynomial time to $$A$$.

+ $$A \in P \rightarrow NP = P$$ 가 성립한다.
+ $$NP$$ 의 문제 중 하나라도 선형시간에 풀 수 없으면 $$A \notin NP$$ 이고 곧 $$NP \neq P$$ 이다.
+ If a NP-Complete problem can reduce in polynomial time to B and B is NP, them B also NP Complete.

NP-Complete Problem 은 많이 있다. 대표적으로는 Cook-Levin Theorem 으로 증명된  3-CNF-SAT 문제가 있다. (ex. ```(a or b or c) and (d or e or f) and ...```).







#### Quantum Computer

NTM 의 경우 양자컴퓨터에서 일부 가능한데, 그렇다고 DTM 에서 불가능한 계산을 할 수 있진 않다. Non-deterministic 한 절차는 DTM 에서 bfs 등으로 전부 해보면 되기 때문이다.





## 참고자료 및 각주


[^wiki_decidability]: [wiki decidability](https://en.wikipedia.org/wiki/Decidability_(logic))

[^wiki_np]: [wiki np](https://en.wikipedia.org/wiki/NP_(complexity))