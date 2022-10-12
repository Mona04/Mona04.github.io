---
excerpt: "기초 통계학 개념"
tag: [statistics]
use_math: true
published: true

---

이하는 통계의 기초적인 개념을 한눈에 보기 위해 개인적으로 정리한 것이다. 

자세한 설명은 [여기](#참고자료) 를 보자.

## Probability

### Probability Space

> __Sample Space__. $$\Omega$$

+ Mutually exclusive outcomes(상호배타)
+ Exhaustive outcomes(이외의 것이 일어나지 않음)

---
> __Space of Events__. $$\mathcal{F}$$ is subset of $$\Omega$$ that satisfies Sigma Algebra.

Sigma Algebra 는 다음을 만족시킨다. [간단한 이해를 위한 블로그](https://haawron.tistory.com/18)
1. $$ \Omega \in \mathcal{F}$$. 다시말해 반드시 일어나는 이벤트를 포함
2. if $$ E \in \mathcal{F}$$ then $$ E^C \in \mathcal{F}$$
3. $$\mathcal{F}$$ 에 속하는 sequence $$<E_1, E_2 ... E_n ...> $$ satisfies $$\bigcup_{n=i}^\infty{E_i} \in \mathcal{F}$$.


a subset of $$\Omega$$ that belongs to the sigma-algebra $$\mathcal{F}$$ is called __measurable__.  

---
> __Probability__, $$\mathrm{P} : \mathcal{F} \rightarrow [0,1]$$ that satisfy

1. $$P(\Omega) = 1$$. Sure Thing.
2. Sigma Additivity. 즉 $$E_i \cap E_j = \emptyset $$ 이면 $$P(\bigcup_{n=i}^\infty{E_i} ) = \sum_{n=1}^{\infty}P(E_i)$$ 를 만족.

---
> $$(\Omega, \mathcal{F}, P)$$ 를 __Probabilty Space__ 라고 한다.

---

### Probability Property

> $$E$$ is __Zero-Probabilty Event__ iff $$\mathrm{P}(E) = 0$$ 

+ Sample Space 가 Uncountable 이지만 Event 가 Countable 한 집합의 경우 Sigma Algebra 를 제대로 적용하기 힘듬
+ $$F = \{  \omega \in \Omega : \omega \text{ satisfies property } \phi \}$$, $$F^C \subset E $$ and $$ \mathrm{P}(E) = 0 $$
  + $$\phi$$ 는 Sample Space 의 각 원소가 만족하거나 만족하지 않는 Property
  + 위 조건을 만족시 $$\phi$$ 는 ```Almost Sure Property```, $$F$$ 는 ```Almost Sure Event``` 라고 한다
  + 예를들어 실수에서 무리수의 집합이 Amost Sure Event. [다른 예](https://www.statlect.com/glossary/almost-sure)


---
> Conditional Probability $$\mathrm{P}(E \mid I) $$ satisfies belows

1. _Probability_ 의 조건을 만족.
2. Sure Thing. $$\mathrm{P}(I \mid I) = 1$$ 
3. Impossible Events. if $$E \subseteq I^C$$ then $$\mathrm{P}(E \mid I) = 0$$
4. Constant Likelihood Ratio on $$I$$.
+ if $$ E \subseteq I $$, $$ F \subseteq I $$ and $$\mathrm{P}(E) > 0$$,
 then $$\cfrac{\mathrm{P}(F \mid I)}{\mathrm{P}(E \mid I)} = \cfrac{\mathrm{P}(F)}{\mathrm{P}(E)}$$
+ Condition Probabilty Formula. $$\mathrm{P}(E \mid I) = \cfrac{\mathrm{P}(E \cap I)}{\mathrm{P}(I)} $$ 는 위 조건에 따라 증명되나 약간 까다로움.

Zero Probability 에 대해서도 정의하는 엄밀한 정의가 따로 있는데...

---
> Bayes' Rule. $$\mathrm{P}(A \mid B) = \cfrac{\mathrm{P}(B \mid A) \mathrm{P}(A) }{\mathrm{P}(B)}$$


---
> Event $$F$$ and $$E$$ is __independent__ iff $$\mathrm{P}(F \cap E) = \mathrm{P}(F) \mathrm{P}(F) $$ 

+ $$\mathrm{P}(F \mid E) = \mathrm{P}(F)$$ 로 정의할수도 있지만 분모가 0인 경우 복잡해짐

---
> Event $$<E_1, E_2, ... E_n>$$ is __mutually independent__ iff for any sub-collection of k Events $$<E_{i1} ... E_{ik}>$$ satisfy $$\mathrm{P}(\bigcap_{j=1}^k{E_{ij}}) = \prod_{j=1}^k{\mathrm{P}(E_{ij})}$$

+ Event 가 Sampe Space 의 원소를 포함하는데, $$E_{i1}$$ 은 그 원소 중 첫번째를 의미하는 것.
+ Multually Independent 하면 임의의 두 사건은 서로 Independent 이지만 그 역은 성립하지 않음.
+ Zero-Probability Event 는 모든 사건과 Independent 함

---



## Random variable

### Definition

> __Random Variable__ is a function. $$ X : \Omega \rightarrow \mathbb{R}$$ such that $$\{ \omega \in \Omega : X(\omega) \in B \} \in \mathcal{F} $$ for any $$B \in \mathfrak{B}(\mathbb{R}) $$

+ $$\mathcal{F}$$ is sigma-algebra of events. 
+ $$ \mathfrak{B}(\mathbb{R}) $$ is Borel sigma-algebra of $$\mathbb{R}$$ (i.e., the smallest sigma-algebra containing all the open subsets of $$\mathbb{R}$$). 위상수학 기초개념이며 [블로그](https://haawron.tistory.com/18) 가 이에 대해서 잘 설명해준다.
+ $$X$$ 는 Injective Function 이 아니다. [SE](https://math.stackexchange.com/questions/2864027/do-random-variables-have-to-be-bijective) 


> The set of all possible realizations is called __support__ and is denoted by $$R_X$$.

> The real number $$X(\omega)$$ associated to a sample point $$\omega$$ in $$\Omega$$ is called a __realization__ of the random variable.

$$P_X(B) = P(X \in B) = P(\{ \omega \in \Omega : X(\omega) \in B \}) $$ 로 Realization Variables 의 확률을 나타낸다.

위 정의는 간단히 Real Number 에서 Vector Space 로 확장할 수 있다.


### Discrete / Continuous

> A random variable is __discrete__ iff 
1. its support $$R_X$$ is a __countable__ set
2. Exists a __PMF(Probability Mass Function)__ $$p_X : \mathbb{R} \rightarrow [0, 1]$$ that
 $$ p_X(x) =  \begin{cases} 
 P(X=x) & \text{ if } x \in R_X \\  
 0      & \text{ if } x \not\in R_X
 \end{cases}
 $$
   + Non-Negativity 
   + Sum over the support is 1


> A random variable is __continuous__ iff 
1. its support $$R_X$$ is a __continuous__ set
2. Exists a __PDF(Probability Density Function)__ $$f_X : \mathbb{R} \rightarrow [0, \infty)$$ that
 $$ P(X \in [a,b]) = \int_a^b f_X(x) dx  $$
   + Non-Negativity 
   + Integral over $$\mathbb{R}$$ is 1. $$ \int_{-\infty}^{\infty} f_X(x) dx = 1$$


위 둘에도 속하지 않는 경우 CDF(cumulative distribution function) $$F_X : \mathbb{R} \rightarrow [0, 1] $$ 를 이용해 정의하기도 한다. 구분 적분과 비슷하게 해당 구간의 확률을 구한다.

### Independence

> Two random variables $$X, Y$$ are __independent__ iff 
$$\mathrm{P}(\{ X \in A \} \cap \{  Y \in B \}) 
= \mathrm{P}(\{ X \in A \}) \mathrm{P}(\{ Y \in B \})$$
where $$A \subseteq \mathbb{R}$$ and  $$B \subseteq \mathbb{R}$$

위 정의를 모든 Variables 에 대해 수행하기 어려워 Joint Distribution Function(or Joint Accumulate Distribution Function) 을 통해 다음처럼 판단한다. $$F_{XY}(x, y) = F_X(x)F_Y(y), \quad \forall{x, y} \in \mathbb{R}$$



## 평가수단


### Expected Value

$$\Omega$$ 가 크기가 무한한 집합인 경우 기댓값이 무한대로 커지거나 작아지는 경우가 생긴다. 이때 더하는 순서에 따라서 

이산 집합과 연속 집합에 대한 확률계산 방밥이 차이가 있어서 이를 통합하는 정의가 몇가지가 있다. the Riemann-Stieltjes integral 과 Lebesgue-integral(르베그 적분) 이 그것이다. 둘 다 아이디어는 비슷하지만 Lebesgue-integral 는 Linearity Property 를 가지고 있어 계산이 용의하다.

#### Properties

> $$ \mathrm{E}[aX] = a\mathrm{E}[X] $$

> $$ \mathrm{E}[a_1X_1 + a_1X_2 + ... + a_kX_k] = a_1\mathrm{E}[X_1] + a_2\mathrm{E}[X_2] + ... + a_k\mathrm{E}[X_k] $$

> if $$X$$ and $$Y$$ is two random variables and independent then 
$$\mathrm{E}[XY] = \mathrm{E}[X] \mathrm{E}[Y]$$



### Variances

> __Variance__ is defined as $$\text{Var}[X] = \mathrm{E}[ (X-\mathrm{E}[X])^2]$$

$$\text{Var}[X] = \mathrm{E}[ (X-\mathrm{E}[X])^2] = \mathrm{E}[X^2] - \mathrm{E}[X]^2$$ 가 Linearity of the expected value 에 의해 성립함.

Linear Transformation 에서는 다음이 성립함. $$\text{Var}[a + bX] = b^2 \mathrm{E}[X]$$


### Covariance

> __Covariance__ is defined as $$\mathrm{Cov}[X, Y] = \mathrm{E}[(X-\mathrm{E}[X])(Y - \mathrm{E}[Y])] $$

 $$\mathrm{Cov}[X, Y] = \mathrm{E}[XY]- \mathrm{E}[X]\mathrm{E}[Y] $$ 가 Linearity of the expected value 에 의해 성립함.

> __Linear Correlation Coefficient__ is defined as 
$$\mathrm{Corr}[X, Y] = \cfrac{\mathrm{Cov}[X,Y]}{\mathrm{std}[X]\mathrm{std}[Y]} $$

분모가 0 일때는 그냥 0 으로 처리함. 왜냐하면 분산이 0 이기 때문.

### Quantile

> __p-quantile__ of $$X$$ is $$Q_X(p) = \mathrm{inf}\{x \in \mathbb{R} : F_X(x) \geq p  \}$$

예를들어 정규분포에서 0.95 이상을 만족하는 지점등을 위해서 $$Q_X(0.95)$$ 를 사용함



## 참고자료

[Statlect](https://www.statlect.com/fundamentals-of-probability/)