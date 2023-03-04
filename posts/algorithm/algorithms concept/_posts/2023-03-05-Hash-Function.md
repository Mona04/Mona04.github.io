---
excerpt: "Universal Hash Function, "
tag: [hash]
use_math: true
---

## Universal Hash Function

Fixed Hash Function 의 치명적인 단점이 있다. 아무리 잘 디자인 된 Hash Function 이라도 악성 유저가 그 Function 을 알고 있으면 최악의 Input 을 만들어 공격하는 Algorithmic Complexity Attack 에 취약해진다. 

이를 해결하기 위해 Data 가 랜덤하다는 가정을 버린다. 대신 Hash Function 을 특정한 조건을 만족하는 Function Set 에서 랜덤하게 선택하도록 한다. 시스템이 컨트롤 불가능한 Data 에는 아무런 가정을 하지 않고 컨트롤 가능한 Hash Function 에 랜덤을 부과하는 것이다. 이러한 기법을 Universal Hash Function 이라고 하고 평균적인 성능이 좋다.

이때 필요한 조건은 다음과 같다.

### Universal Property

Total Count of Items is $$n$$. Hash Tables Size is $$m$$. Load Factor is $$\alpha = \frac{n}{m}$$. Pool of Hash Functions is $$H$$. 

> $$H$$ should satisfy __Universal Property__ that $$\forall{h \in H},\; \forall{k_1, k_2}\quad P(h(k_1) = h(k_2)) \leq \frac{1}{m} $$

여기에 대한 간단한 예로는 다음이 있다.
+ 엄밀하게는 $$P(h(k_1) = h(k_2)) \leq \frac{2}{m}$$ 인 Near Universal Property 를 만족한다. 

If keys are natural numbers and a prime number $$p$$ is bigger than the maximum number of available keys, then $$H = \{ h_1, h_2, \,... h_{p-1} \}$$ satisfies __Universal Property__ as $$h_{a}(j) = ((aj) \mod p) \mod m$$.

증명하기 위해 $$h_a(k_1) = h_a(k_2)$$ 가 같기위한 확률을 구해보자. 

$$ \begin{multline} 
( a(k_1 - k_2) \mod p) \mod m = 0 \\ \shoveleft
a(k_1 - k_2) \mod p \in \{0, m, 2m, \,..., km\} \\ \shoveleft
\text{let}\quad K = (k_1 - k_2)^{-1} \mod p  \\ \shoveleft
a \mod p \in \{0 \times K, m \times K, 2m \times K, \,..., km \times K  \} \\ \shoveleft
\end{multline}
$$

위를 통해 $$a$$ 의 후보를 구할 수 있으며 $$0$$ 은 정의상 범위에서 제외한다. 그러면 Hash Function 이 충돌될 때의 $$a$$ 의 갯수는 $$\lfloor \frac{p}{m} \rfloor$$ 이 된다. $$a$$ 의 후보는 그 정의상 $$p-1$$ 개 이므로 단순히 확률을 구하면 $$ \frac{p}{m} \times \frac{1}{p-1} \approx \frac{2}{m}$$ 이 된다.

이러한 예 말고도 $$m \times n$$ Matrix 를 랜덤하게 생성해서 $$\frac{1}{2^m}$$ 확률로 만드는 Univesal Hash Function 도 있고 매우 많다.


### 평균 성능

간단하게 Linked List 로 Hash Collision 을 해결하는 경우를 생각해보자. 특정 key 에서 Linked List 의 평균 길이는 어떻게 될까? 이는 이항분포의 근사를 생각하면 확률이 $$\frac{2}{m}$$ 이고 시행횟수가 $$n$$ 이므로 평균적으로 $$\mathrm{O}(2\alpha)$$ 가 됨을 알 수 있다. 이는 Hash Function 의 목표인 Load Factor 와 근사한 수치이므로 평균적으로 좋은 성능을 보인다는 뜻이 된다.



## 참고자료

Algorithms for Searching, Sorting, and Indexing, University of Colorado Boulder, Cousera