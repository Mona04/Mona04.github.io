---
excerpt: "분할정복 관련 정리"
tag: [PS. divide and conquer]
use_math: true
---

## Master Method

$$ 

T(n) = 
\begin{cases}
    \Theta(1), \quad n \leq 1 \\
    a T(\cfrac{n}{b}) + \Theta(n^c)
\end{cases}

$$

분할정복의 점화식이 대개 위와 같이 표현할 수 있다.

$$a T(\cfrac{n}{b})$$ 는 분할에 해당되고 $$\Theta(n^c)$$ 는 분할한 것들을 다시 합치는 것에 해당된다.

이 때 시간복잡도를 구하는 간단한 공식이 있다.

$$ \epsilon = \log_{b}{a}$$

$$ 
T(n) = 
\begin{cases}
    \Theta(n^{\log_{b}{a}}),         \quad \epsilon > c \\
    \Theta(n^{\log_{b}{a}} \log_{b}{n}), \quad \epsilon = c \\
    \Theta(n^c),                     \quad \epsilon < c \\
\end{cases}

$$

이에 대한 유도는 비형식적으로 설명하자면 다음과 같다.

점화식의 깊이는 $$\log_{b}{n}$$ 가 된다. 그러면 기본 케이스는 총 $$a^{\log_{b}{n}}$$ 개가 된다. 여기서 로그의 계산규칙을 사용하면 $$n^{\log_{b}{a}}$$ 를 얻을 수 있다.

분할 후 합치는 부분은 약간 까다롭다. 

$$ 
n^c 
+ (a\frac{n}{b})^c + a^2 (\frac{n}{b^2})^c 
... 
+ a^{\log_{b}{n}} (\frac{n}{b^{\log_{b}{n}}})^c
$$

$$ 
 = n^c (
1 + \frac{a}{b^c} + (\frac{a}{b^c})^2 
... 
+  (\frac{a}{b^c})^{\log_{b}{n}}
)

$$

등비급수의 합을 쓰면 위 식은 다음처럼 정리할 수 있다.

$$
 = 
\begin{cases}
    n^c \cfrac{ 1 - \frac{a}{b^c}^{\log_{b}{n}} }{ 1 - \frac{a}{b^c} }
    = n^c \cfrac{b^c}{b^c - a} ( 1 -  n ^ { \log_b{a} - c})
    = \cfrac{b^c}{b^c - a} ( n^c - n ^ { \log_b{a}})
       ,\quad \epsilon \neq c \\

    n^c \log_{b}{n}, \quad \epsilon = c \\

\end{cases}
$$

여기서 지수의 크기가 어떻게 결정되는지 살펴보면 위 공식이 어떻게 나오는지 이해할 수 있다.

## 성능향상

$$n^c$$ 의 경우 대부분 Brute Force 와 시간복잡도가 크게 다르지 않다.

하지만 로직을 최적화하여 위 공식에서의 $$a$$ 를 줄이면 상당한 성능향상을 보일 수 있다.

이에 대한 예시로 행렬의 곱셈을 빨리 수행하는 [Strassen algorithm](https://en.wikipedia.org/wiki/Strassen_algorithm), 큰수의 곱셈을 빨리 수행하는 Karatsuba algorithm 등이 있다.




## 참고자료

Dynamic Programming, Greedy Algorithms, University of Colorado Boulder, Cousera