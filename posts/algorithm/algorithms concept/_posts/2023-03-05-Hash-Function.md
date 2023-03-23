---
excerpt: "Universal Hash Function, "
tag: [hash]
use_math: true
---

## 전제

Total Count of Items is $$n$$. Hash Tables Size is $$m$$. Load Factor is $$\alpha = \frac{n}{m}$$.

## Universal Hash Function

Fixed Hash Function 의 치명적인 단점이 있다. 아무리 잘 디자인 된 Hash Function 이라도 악성 유저가 그 Function 을 알고 있으면 최악의 Input 을 만들어 공격하는 Algorithmic Complexity Attack 에 취약해진다. 

이를 해결하기 위해 Data 가 랜덤하다는 가정을 버린다. 대신 Hash Function 을 특정한 조건을 만족하는 Function Set 에서 랜덤하게 선택하도록 한다. 시스템이 컨트롤 불가능한 Data 에는 아무런 가정을 하지 않고 컨트롤 가능한 Hash Function 에 랜덤을 부과하는 것이다. 이러한 기법을 Universal Hash Function 이라고 하고 평균적인 성능이 좋다.

이때 필요한 조건은 다음과 같다.

### Universal Property (Weak) 

Family of Hash Functions $$\mathcal{H} : \{h_1 .... h_N \}$$, where $$h_i : \text{keys} \rightarrow \{0,...,m-1\}$$.

> $$H$$ should satisfy __Universal Property__ that $$\forall{h \in \mathcal{H}},\; \forall{k_1, k_2}\quad P(h(k_1) = h(k_2)) \leq \frac{c}{m} $$ where $$c$$ is constant and mostly 1.

여기에 대한 간단한 예로는 다음이 있다.

If keys are natural numbers and a prime number $$p$$ is bigger than the maximum number of available keys, then $$\mathcal{H}$$ satisfies __Universal Property__ where $$h_{a}(j) = ((aj) \mod p) \mod m$$.

증명하기 위해 $$h_a$$ 가 랜덤하게 뽑혔을 때 $$h_a(k_1) = h_a(k_2)$$ 가 같기위한 확률을 구해보자. 

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

위의 예시에서 간단하게 Linked List 로 Hash Collision 을 해결하는 경우를 생각해보자.
+ 특정 key 에서 Linked List 의 평균 길이는 어떻게 될까? 이는 특정 key 와 충돌하는 모든 경우를 단순히 더한 확률(즉 교집합을 빼지 않았다)보다는 클 수 없으므로 $$\mathrm{O}(2\alpha)$$ 가 됨을 알 수 있다. 이는 Hash Function 의 목표인 Load Factor 와 근사한 수치이므로 평균적으로 좋은 성능을 보인다는 뜻이 된다.
+ 가장 긴 Linked List 의 길이는 얼마나 될까? $$\alpha < 0.5$$ 라는 전제 하에 $$\mathrm{O}{\frac{\log{n}}{\log{\log{n}}}}$$ 라고 알려져 있는데 $$N = 2^{32}$$ 에서는 6 으로 증가치가 매우 작다.


## Perfect Hashing

$$n$$ 개의 서로다른 키가 이미 주어져 있을 때
1. Choose a random hash function $$h \in \mathcal{H}$$ 
2. Hashtable with $$Kn^2$$ slots, where K is a parameter to be determined.
3. Insert each key into hash table
4. if collision happens: abort and redo procedure

위 알고리즘을 보면 알겠지만 Collision 이 없다는 장점이 있다. 하지만 새로운 Key 를 빠르게 추가/삭제 할 수 없고 그냥 새로 테이블을 만들어야한다. 또한 아래의 개선버전을 보면 데이터구조가 약간 복잡하다.


### Proof

위 알고리즘의 전제 상 Collision 이 없음은 보장된다. 하지만 루프를 얼마나 할 것인지는 보장되지 않았다. 아래를 통해서 우리는 그럴 확률이 무의미하게 작으며 평균 루프 횟수가 상수임을 쉽게 보일 수 있다.

Let a probability of collision of two keys $$p_1$$.

$$p_1 \leq \frac{c}{m} = \frac{c}{Kn^2}$$

적어도 하나 이상의 충돌이 일어날 확률은 단순히 임의의 두 Key 가 충돌하는 모든 확률을 더한 것보다 크거나 작다.

$$p_1 \times \binom{n}{2} \leq \frac{c}{Kn^2} \times \binom{n}{2} \leq \frac{c}{2K}$$

$$K$$ 는 사전에 주어진 수이므로 상수인 $$c$$ 라고 해보자. 그러면 적어도 하나 이상 충돌이 날 확률이 0.5 가 된다. 

이를 바탕으로 4번을 평균적으로 할 횟수는 이항분포의 근사를 생각하면 2가 된다. 그리고 100 번 이상을 할 확률은 기하급수적으로 떨어지게 되어 거의 없다고 생각할 수 있다.

### Improvement

2번을 보면 공간복잡도가 매우 큼을 알 수 있다. 이를 효율적으로 개선할 수 있는 방법 역시 존재한다.

먼저 공간복잡도가 선형인 HashTable 을 만든다. 그리고 각 slot 마다 충돌단 Key 에 대해서 위에서 설명한 간단한 버전의 Perfect Hashing 을 할당한다. 다시말해 HashTable $$h$$ 의 $$i$$ 번째 slot 이 HashTable $$h_i$$ 이 된다.

그러면 충돌이 일어나지 않으며 탐색도 빠름은 자명하다. 그리고 계산해보면 평균적인 공간 복잡도 역시 선형임을 보일 수 있다.


## Cuckoo Hashing

Perfect Hashing 의 개선버전으로 Collision 이 없으면서 삭제 / 삽입이 가능하다. 이때 검색, 삭제는 상수시간에 이루어지고 삽입이 평균적으로 상수시간에 이루어진다.

삽입 알고리즘이 가장 중요한 포인트다. First, create two hash tables from two randomly chosen hash functions. Second insert each key into one of the hash tables.
+ 만약 양쪽 slot 이 비어있지 않으면 한쪽과 교체한다. 교체된 key 에 대해서 다시 양쪽의 slot 을 확인한다. 만약 자리가 있으면 거기에 넣고 없다면 교체하지 않은 HashTable 쪽의 key 과 교체 후 반복한다.

검색은 두개의 HashTable 중에 Key 가 존재하는지 확인하면 되고, 삭제 역시 마찬가지이다.


## 참고자료

Algorithms for Searching, Sorting, and Indexing, University of Colorado Boulder, Cousera