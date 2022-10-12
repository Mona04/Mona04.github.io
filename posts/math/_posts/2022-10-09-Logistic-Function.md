---
excerpt: "Logistic Function 과 관련된 정리"
tag: [Calculus]
use_math: true
---

## 배경

Malthus 의 _An Essay on the Principle of Population(인구론)_ 을 대표로하는 인구학에서 가장 먼저 사용된 함수이다. 

그 때는 자원의 유한성으로 인해 인구는 기하급수적으로 증가하다가 인구 수가 어떤 경계에 다가갈수록 점점 증가폭이 줄어들다가 더이상 증가하지 않을 것이라고 생각했다. 이는 틀린 것으로 드러났지만 이를 모델링하는 함수는 지금도 많은 곳에서 사용된다.

## Logistic Function

P.F. Verhulst 가 모델링한 Logistic-Functionn 은 Differential Equations 에서 도출할 수 있다.

인구수를 $$N$$ 이라고 하고 최대인구를 $$K$$ 라고 하면 $$\cfrac{dN}{dt} = rN(1-N/K)$$ 로 모델링 할 수 있다.

이는 Separatable Equation 이므로 $$rN(1-N/K)dN = dt$$ 라고 쓸 수 있고 아래처럼 풀 수 있다.

$$
\begin{gather}
\int{\cfrac{1}{rN(1-N/K)}dN} = \int{\cfrac{1}{N} \cfrac{1}{K-N}dN} = \int{r dt}  \\ 
\ln{\cfrac{N}{K-N}} = rt + C_1 \\ 
\cfrac{N}{K-N} = C_2e^{rt} \quad \cfrac{K-N}{N} = C_2e^{-rt}    \\
N = \cfrac{K}{C_2e^{-rt} + 1} = \cfrac{N_0K}{(K-N_0)e^{-rt} + N_0}    \\
\end{gather}
$$

$$K=1,\ N_0 = 1/2$$ 로 두면 우리가 잘 아는 $$y = \cfrac{1}{1+e^{-x}}$$ 가 된다. 



## 참고자료

[Khan Academy](https://en.khanacademy.org/math/differential-equations/first-order-differential-equations/)