---
excerpt: "Bloom Filter, Count-Min Sketches, ect "
tag: [hash]
use_math: true
---


## Bloom Filter

A fast set data structure based on hashing which permits _false positive_ possibility.

$$M$$ bit 를 가지는 table 과 Universal HashFunction $$h_j \in \mathcal{H}$$ 를 만든다.
+ Insert. $$h_1(x), h_2(x) ... h_k(x)$$ 각각의 위치의 bit 를 1 로 만든다.
+ Find.  $$h_1(x), h_2(x) ... h_k(x)$$ 각각의 위치의 모든 bit 가 1 이다.

#### Find Error Posibility

현재 $$n$$ 개의 key 가 삽입 되어있고 검색하는 key 에 대한 Hash 값이 $$m_1, ... m_k$$ 라고 하자.

 $$h_j(x)$$ 가 $$m_i$$ 이 아닐 확률은 Universal HashFunction 의 특성에 따라 다음과 같다.
 
 $$(1-\frac{1}{M})$$
 
 몇가지 가정을 하면 우리는 $$m_i$$ 가 1 이 아닐 확률을 간단하게 구할 수 있다.
 1. $$M$$ 이 충분히 크다.
 2. $$h_j(x)$$ 가 bit 를 선택하는 것이 독립사건이다.

 우리는 $$n$$ 개의 key 가 있고 각각 $$k$$ 개의 Hash Function 이 있으므로 독립사건을 계산하듯이 계산하면 다음과 같다.

$$ 
\begin{multline}
(1-\frac{1}{M})^{kn}            \\ \shoveleft
= ((1 - \frac{1}{M})^M) ^ {-kn/M} \\ \shoveleft
\approx e^{-\frac{kn}{M}} \qquad
\because ( \lim_{x \rightarrow \infty }{ (1-\frac{1}{x})^x } = e)
 \end{multline}
$$

 그럼  $$m_1, ... m_k$$ 가 모두 1 일 확률은 다음과 같다.

 $$ (1 - e^{-\frac{kn}{M}})^k$$

사건이 독립이진 않지면 $$M$$ 이 충분히 크면 비슷한 결과를 얻을 수 있다. 위 식에서 $$M$$ 이 적당히 크고 $$k$$ 가 충분히 크면 0.1 이하의 False Positive 확률을 만들 수 있다.


## Count-Min Sketches

key 들의 빈도를 알고 싶으면 어떻게해야 할까? key 의 범위가 알려져 있고 충분히 작은 범위라면 Coordinate Compression 을 사용해서 Array Counting 를 하면 선형시간에 처리할 수 있을 것이다. 하지만 key 의 범위가 매우 크거나 알려져 있지 않다면 어떻게 해야할까?

Count-Min Sketches 는 이에 대해 유한한 메모리를 사용해 확률적으로 유의미한 답을 주는 알고리즘이다.

앞서 용어정리를 하자.
+ $$W$$ 를 input stream 의 갯수라고 하자. 이는 우리가 알 수 있는 값이다. 
+ $$N$$ 은 input stream set $$\{ x_1, x_2 ... x_n \}$$ 의 크기라고 하자. 이는 우리가 알 수 없는 값이다. 
+ $$\epsilon$$ 은 우리가 허용할 오차의 비율로 우리가 정하는 값이다.
+ $$\delta$$ 는 위에서 허용할 오차 내에 있을 확률이다. 우리가 정하는 값이다.


기본적인 전략은 Coordinate Compression 대신에 Hash 값을 사용하여 Counting 을 하는 것이다. 이때 $$C(j)$$ 는 $$x_j$$ 의 실제 등장 횟수라고 하고 $$C'(j)$$ 를 Count-Min Sketches 를 이용해 얻은 근사값이라고 하자.

우리는 다음을 보일 것이다.

> $$C'(j) - C(j) \leq \epsilon W$$ with probability at least $$\delta$$


#### Lemma 1.

>  $$ E(C'(j) - C(j)) \leq \frac{cW}{M} $$

증명은 다음과 같다.

$$
\begin{multline}
E(C'(j)) \\ \shoveleft
= C(j) + \sum _{i=1, i \neq j} ^ {N} { P(h(i) = h(j)) C(i) } \\ \shoveleft
\leq C(j) + \frac{c}{M}  \sum _{i=1, i \neq j} ^ {N} { C(i) }  \qquad (\because h \in \mathcal{H}) \\ \shoveleft
= C(j) + \frac{cW}{M} 

\end{multline}
$$

#### Lemma 2.

> $$ P(C'(j) - C(j) \geq \epsilon W) \leq  \frac{E(C'(j) - C(j))}{\epsilon W} = \frac{c}{\epsilon M } $$

Hash Collision 의 특성 상 $$ C'(j) - C(j) \geq 0 $$ 은 자명하다. 따라서 Markov Inequality 을 적용할 수 있다. 

여기서 $$M$$ 은 우리가 정할 수 있는 수이다. 보통 위의 확률이 $$e^{-1}$$ 이 되도록 조절한다.



#### Reducing Error Probability

Lemma 2. 에 따라 적절한 $$M$$ 을 골랐다면 $$C'(j)$$ 가 허용오차를 넘어갈 확률이 제법 됨을 알 수 있다.

이를 줄이기 위한 방법이 Universal Hash Function 을 이용해 여러 Counter 을 만들어서 이 중에 가장 작은 값을 취하는 것이다. 

Hash Collision 의 특성 상 $$ C'(j) - C(j) \geq 0 $$ 이므로 가장 작은 값이 가장 정확한 값일 것이다. 즉 적어도 하나라도 허용오차 내에 있으면 우리는 허용범위 내의 값을 얻을 수 있는 것이다. 반대로 모든 Counter 가 허용오차 밖에 있을 확률은 Lemma 2. 에서 구한 확률을 계속 곱연산을 하여 구할 수 있다. 적절한 $$M$$ 을 선택했다면 Hash Table 의 갯수만큼 지수단위로 확률이 낮아지게 된다.





## 참고자료

Algorithms for Searching, Sorting, and Indexing, University of Colorado Boulder, Cousera