---
excerpt: "양자컴퓨터가 어떤 문제를 효율적으로 풀 수 있는지에 대한 간략한 이해."
tags: []
use_math: true
---

## 튜토리얼

다음 순서대로 읽어보길 추천한다.

[qubit. donghwi.dev](https://qubit.donghwi.dev/)

[양자역학 기획 기사, postechian(2022)](https://postechian.postech.ac.kr/2022s-3-%EC%96%91%EC%9E%90-%EC%BB%B4%ED%93%A8%ED%84%B0%EC%9D%98-%EB%AF%B8%EB%9E%98/)

[김한영, horizon, 양자 알고리즘의 세계](https://horizon.kias.re.kr/14565/)


그리고 [ibm, quantum-computing](https://quantum-computing.ibm.com/composer/docs/iqx)에서 양자컴퓨터의 회로에대한 기본적인 이해와 그래픽 코딩을 해볼 수 있다.




## Quantum Information

전자는 네가지의 양자수 (주양자수, 부양자수, 자기양자수, 스핀 양자수) 가 존재하고 우리가 지금 관심있는 것은 스핀이다. 

스핀은 관측하기 전까지는 그 상태의 확률함수만을 알 수 있다.

이러한 상태를 고전 컴퓨터의 bit 처럼 나타내는 개념이 바로 qubit 이다. 


### Super Position

Qubit 을 표기하기 위해 [Bra-Ket Notation](https://en.wikipedia.org/wiki/Bra%E2%80%93ket_notation) 을 사용한다. row-vector 는 ```bra```$$\bra{}$$ 로 column-vector 는 ```ket```$$\ket{}$$ 으로 표기되는 것을 시작으로 많은 특징이 있다.

관측가능한 상태인 Pure Position(state) 은 $$\ket{0}, \ket{1}$$ 처럼 표기한다. n 개의 qubit 에 대해서도 마찬가지로, 예를들어 2 개의 qubits 의 Pure Position 은 $$\ket{00}, \ket{10}, \ket{01}, \ket{11}$$ 가 있다. 각각 vector 의 자리와 대응된다. 편의상 이진수가 아니라 $$\ket{0}, \ket{1}, \ket{2}, \ket{3}$$ 처럼 십진수로 보통 쓴다.

Pure Position 이 확률로 중첩된 Super Position 은 $$a_1\ket{0} + a_2\ket{1}$$ 처럼 vector 와 같이 표기한다. 이때 각 계수의 제곱을 그 Position 이 될 확률로 생각한다. 이는 Norm 이 1 이라는 것과 같다.

이러한 Position 은 무한한 차원에서의 Norm 이 1 인 vector space 에서 정의된다. 이는 [Hilbert Space](https://en.wikipedia.org/wiki/Hilbert_space) 에 속하게 되며 중요한 특징 중 하나이다.

두 Qubit 을 동시에 표기하는 것은 [Kronecker Product](https://en.wikipedia.org/wiki/Kronecker_product) 가 있다. 예를들어 다음처럼 표현할 수 있다.

$$
\begin{multline}

\ket{b_1} = \cfrac{1}{\sqrt{2}}(\ket{0} + \ket{1}) , \quad
\ket{b_2} = \cfrac{1}{\sqrt{2}}(\ket{0} - \ket{1}) \\ \shoveleft

\ket{b_1b_2} 
= \ket{b_1} \otimes \ket{b_2} 
= \cfrac{1}{2}(\ket{00} - \ket{01} + \ket{10} - \ket{11}) 

\end{multline}
$$


### Entanglement

EPR-역설로 유명한 양자얽힘(quantum entanglement) 은 간단히 말하면 qubit 하나가 확정되었을 때 다른 qubit 도 확정되는 시스템을 말한다. 예를 통해 살펴보자.

$$
\begin{multline}

\ket{b_1} = \cfrac{1}{2}(\ket{00} - \ket{10} + \ket{01} - \ket{11}) \\ \shoveleft

\ket{b_2} = \cfrac{1}{\sqrt{2}}(\ket{01} - \ket{10}) \\ \shoveleft

\ket{b_3} = \cfrac{1}{\sqrt{3}}(\ket{00} - \ket{10} + \ket{11}) \\ \shoveleft

\end{multline}
$$


$$b_1$$ 에서 $$q_1$$(첫번째 qubit) 이 0 이어도 $$q_2$$(두번째 qubit)은 확정되지 않으므로 entanglement 가 아니다.
$$b_2$$ 를 살펴보자. If $$q_1$$ collapses to 0 then $$q_2$$ collapses to 1, and if $$q_2$$ collapses to 1 then $$q_2$$ collapses to 0. 그래서 이 경우 full entanglement 이다. 
$$b_3$$ 에서는 일부 경우만 확정되므로 partial entanglement 이다.



### Operator

operator 은 unitary matrix 이어야 한다. 간단하게 말하면 실수계에서 Orthogonal Matrix $$AA^T = A^TA = I$$ 를 복소수로 확장한 것이다. 이는 다시말해서 linear 연산이고 reversible 하며 연산 후에도 크기가 유지된다는 말이다.

n 개의 qubit 에 대한 operator matrix 의 크기는 $$2^n \times 2^n$$ 임에 유의하자.

양자컴퓨터와 달리 Classical Computer 의 Logic Gate 는 irreversible 하다. reversible 한 버전을 만들 수 있지만 이점은 현재로서 단점을 상회하지 않아 잘 쓰이지 않는다.[^csrev]

universal irreversible gate 로는 [toffoli gate](https://en.wikipedia.org/wiki/Toffoli_gate) 가 대표적이다. 이때 1개 이상의 추가 큐빗이 gate 에 추가되어 더 복잡하다.

#### Hadmard Gate

$$ 
\cfrac{1}{\sqrt{2}} 
\begin{bmatrix}
 1 & 1 \\ 
 1 & -1
\end{bmatrix} 
$$

양자중첩을 시켜주는 게이트다.




## [Bell's Inequality](https://en.wikipedia.org/wiki/Bell%27s_theorem)

양자 측정의 결과가 정말 확률적인가? 이는 우리가 모르는 변수가 시스템에 있는지 아니면 양자에 있는지를 테스트하므로써 검증할 수 있다.

게임을 하나 생각해보자. 랜덤한 bit 인  ```a```, ```b``` 를 서로 연락할 수 없는 두 사람에게 각각 준다. 두 사람은 받은 bit 에 대해 정해진 전략을 갖고 있어 이에 따라 ```x```, ```y``` 라는 bit 를 돌려준다. 가능한 전략들의  ```a and b == x xor y``` 의 확률 중 가장 높은 확률은 무엇일까? 모든 경우의 수를 해보면 0.75 를 넘지 않는다.

만약 ```a```, ```b``` 가 [bell state](https://en.wikipedia.org/wiki/Bell_state) 중 하나인 $$\ket{ab} = \cfrac{1}{\sqrt{2}}(\ket{00} + \ket{11})$$ 를 만족하는 quantum information 이면 어떻게될까? 적어도 0.75 를 넘는다. 왜냐하면 0을 받으면 0을 주고 1을 주면 $$pi/8$$ 만큼 회전시키는 전략이 0.75 이상이기 때문이다. 이를 보이는건 모든 경우의 수에 대해서 $$\ket{ab}$$ 에 해당 operation matrix 를 곱해보면 된다.

그리고 실제로 실험(실험을 위해 설계는 바뀜)을 해보니 0.75 보다 위었다. 

> 벨의 부등식에 의한 결과는 양자 측정의 결과가 확률적이라는 것과 주사위의 시행 결과가 확률적이라는 것의 근본적인 차이를 의미한다. 주사위 실험의 경우 모르는 변수를 확보하여 주사위 결과가 확률적이지 않게 할 수 있다. 모르는 변수를 확보하여 모르는 정보를 제거하여 실험 결과가 결정적이게 할 수 있다. 양자 물리계의 경우 모르는 변수의 확보를 통해 측정 결과를 확률적이지 않게 할 수 없다. 측정 결과는 여전히 확률적일 수밖에 없다. 모르는 정보의 존재는 필연적이다.[^kpsbell]

이때의 모르는 존재가 양자 암호의 기반이 된다고 하는데...





## Power of Quantum Computer

### Deutsch-Jozsa Algorithm




### Shor's algorithm

NP 문제인 소인수분해 문제를 선형시간에 푸는 알고리즘이다. 보안에서 사용되는 RSA 암호는 소인수분해를 사용하므로 이 알고리즘으로 양자컴퓨터가 컴퓨터 보안에 크게 영향을 미치게 된다.

다만 소인수분해 문제는 NP 이지만 NPC 가 아니다. 따라서 NP=P 와 관련은 없다.

자세한 과정은 [김한영, horizon, 양자 알고리즘: 소인수 분해 알고리즘](https://horizon.kias.re.kr/14195/) 를 살펴보자.



### [Grover's Search Algorithm](https://en.wikipedia.org/wiki/Grover%27s_algorithm)

> $$N$$ 개의 input $$X$$ 와 함수 $$f: X \rightarrow \{0, 1\} $$ 에 대해서 $$f(x) = 1$$ 을 만족하는 한개의 $$x \in X $$ 가 있을 때, $$x$$ 는 무엇인가?

$$f$$ 의 시간복잡도를 $$\mathrm{O}(\alpha(N))$$ 라고 하자. 정답을 찾기위한 브루트포스 알고리즘의 시간복잡도는 $$\mathrm{O}(\alpha(N) 2^N)$$ 이 된다. 하지만 Grover's Search Algorithm 을 사용하면 $$\mathrm{O}(\alpha(n) \sqrt{2^N}$$ 가 가능하다.

많은 자료에서 자세히 설명하고 있으므로 여기선 내가 헷갈렸던 부분을 위주로 메모한다.

#### Oracle 에 대해

이 알고리즘은 정답을 제외한 uniform superposition $$s'$$ 에 대한 대칭연산을 수행하는 $$U$$ 를 사전에 요구한다. 그러면 정답을 알기위해 사전에 정답을 알아야 한다는 말인가? 그렇지 않다. U 는 quantum circut 이면 충분하다. 

간단한 SAT 를 푸는 Circuit 에 대한 예시를 살펴보자.[^satoracle]



#### 시간복잡도에 대해

uniform superposition $$s$$ 와 정답을 제외하고 uniform superposition $$s'$$ 사이의 각도 $$\theta$$ 의 크기는 직접 dot 을 해보면 알 수 있다.

$$
\begin{multline} 
\bra{w}\ket{s'}
 = \cos{\theta} 
= \sqrt{1-\sin{\theta}^2} 
=  \cfrac{N - 1}{\sqrt{(N)}\sqrt{(N-1)}} = \sqrt{1 - \cfrac{1}{N}} 

\\ \shoveleft
\sin{\theta} = \cfrac{1}{\sqrt{N}}
\\ \shoveleft

\lim_{\theta \rightarrow 0}{\frac{\sin{\theta}}{\theta}} 
= \lim_{\theta \rightarrow 0}{\cfrac{\frac{1}{\sqrt{N}}}{\theta}} = 1

\end{multline}
$$

따라서 $$N$$ 이 매우 큰 경우 $$\theta \simeq 1/\sqrt{N}$$ 라고 볼 수 있다. 그러므로 $$\pi/2$$ 도를 한번에 $$2\theta$$ 만큼 좁혀지므로 반복회수는 최대 $$\pi/4 \sqrt{N})$$ 가 된다. 이 이상 반복하면 정답일 확률이 오히려 줄어든다.

이는 여전히 NP 를 선형시간에 풀지 못한다. 하지만 더 빠르다.

또한 이러한 시간복잡도가 최적이라고 알려져있다. 많은 자료에서 이를 언급하므로 따로 링크는 안달겠다.




## 참고자료
 
<p class="footnote" role="doc-endnotes">
Dynamic Programming, Greedy Algorithms, University of Colorado Boulder, Cousera
<br/>
<a href="https://horizon.kias.re.kr/14565/">
김한영, horizon, 양자 알고리즘: 소인수 분해 알고리즘
</a>
</p>

[^kpsbell]: [배준우, kps(2022), 벨 부등식, 얽힘, 그리고 양자 정보](https://webzine.kps.or.kr/?p=5_view&idx=16792)

[^csrev]: [cs, Why are reversible gates not used?](https://cs.stackexchange.com/questions/38049/why-are-reversible-gates-not-used)

[^satoracle]: [Alessandro Berti, Behind Oracles: Grover’s Algorithm](https://towardsdatascience.com/behind-oracles-grovers-algorithm-amplitude-amplification-46b928b46f1e)
