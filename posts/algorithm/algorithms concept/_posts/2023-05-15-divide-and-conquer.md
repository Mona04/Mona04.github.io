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
    a T(\frac{n}{b}) + \Theta(n^c)
\end{cases}

$$

분할정복의 점화식이 위와 같을 때 시간복잡도를 구하는 간단한 공식이 있다.

$$ \epsilon = \log_{b}{a}$$

$$ 
T(n) = 
\begin{cases}
    \Theta(n^{\log_{b}{a}}),         \quad n \epsilon > c \\
    \Theta(n^{\log_{b}{a}} \log{n}), \quad n \epsilon = c \\
    \Theta(n^c),                     \quad n \epsilon < c \\
\end{cases}

$$



## 참고자료

Dynamic Programming, Greedy Algorithms, University of Colorado Boulder, Cousera