---
excerpt: "Markov Inequality and Chevyshev's Inequality"
tag: [statistics]
use_math: true
published: true

---


## Markov Inequality

> $$ \frac{E(X)}{k} \geq P(X \geq k) \quad \text{if} \quad X \geq 0$$

변수 $$X$$ 가 음수가 아니라면 기댓값 만으로 특정 범위의 확률을 구할 수 있는 절대부등식.

### 증명 

$$

\begin{multline}

E(X) \\ \shoveleft
= \int_{-\infty}^{\infty} {xf(x)dx}  \\ \shoveleft
= \int_{0}^{\infty} {xf(x)dx}    \qquad \because(P(X<0) = 0) \\ \shoveleft
= \int_{0}^{k} {xf(x)dx} + \int_{k}^{\infty} {xf(x)dx}  \\ \shoveleft
\geq \int_{k}^{\infty} {xf(x)dx} \\ \shoveleft
\geq k\int_{k}^{\infty} {f(x)dx} \qquad \because(x \geq k) \\ \shoveleft
\geq kP(X \geq k)

\end{multline}

$$


## Chevyshev's Inequality

> $$
P[ \lvert X - \mu \rvert \geq k] \leq \frac{\sigma ^ 2} { k ^ 2 }
\quad \text{if} \quad k \geq 0$$

 Population Mean $$\mu$$ 과 Population Variance $$\sigma ^ 2$$ 으로 특정범위의 확률을 구할 수 있는 절대 부등식.


### 증명

$$

\begin{multline}

P(\lvert X - \mu \rvert \geq k) \\ \shoveleft
= P((X - \mu)^2 \geq k^2)       \\ \shoveleft
\leq \frac{E[(X-\mu)^2]}{k^2}   \qquad (\because \text{Markov's Inequality}) \\ \shoveleft
= \frac{\sigma ^ 2} { k ^ 2 }   \qquad (\because E((X-\mu)^2) = \sigma^2) \\ 


\end{multline}

$$

### One-Sided

> $$ P(X \geq \mu + k)  \leq \frac{\sigma ^ 2} { \mu^2 + k^2 } $$

> $$ P(X \leq \mu - k)  \leq \frac{\sigma ^ 2} { \mu^2 + k^2 } $$

한쪽 방향의 확률만 필요할 때 사용된다. 증명은 아래와 같다.

$$

\begin{multline}

P(X \geq \mu + k) \\ \shoveleft
= P(X^2 \geq (\mu + k)^2)    \\ \shoveleft
\leq P(X^2 \geq \mu^2 + k^2) \\ \shoveleft
\leq \frac{E[X^2]}{\mu^2 + k^2}   \qquad (\because \text{Markov's Inequality}) \\ \shoveleft
= \frac{\sigma ^ 2} { \mu^2 + k^2 }


\end{multline}

$$
