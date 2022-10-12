---
excerpt: "The Monte-Carlo Method 를 Rendering Equation 을 예제로 이해하기 "
tag: [statistics]
use_math: true

---

## Why?

> $$L_0(p, \omega_0) = L_e(p, \omega_0) + \int_\Omega f_r(p, \omega_i, \omega_o) L_i(p, \omega_i) n \cdot \omega_i  d\omega_i $$

예를들어 위와 같은 Rendering Equation 을 풀어야 한다고 해보자.

우리는 저 적분 안에 있는 함수에 대해서 BlackBox 인 상태로 있다. 저 적분을 어떻게 해결할까?

### Riemann Sum

영역을 일정하게 쪼개서 실수에 대한 함수에서 Trapezoid 를 구해 더하는 것처럼 계산할 수 있다.

>$$L_0(p, \omega_0) = \cfrac{\pi^2}{n_1n_2} 
\sum_{\phi = 0}^{n_2} \sum_{\theta = 0}^{n_1} f_r(p, \omega_i, \omega_o) L_i(p, \omega_i) \cos(\theta) \sin(\theta) $$

이 식의 이해를 돕기위해 이전 식과 바뀐 부분을 설명하겠다. 
+ azimuth 를 나타내는 $$\phi$$ 는 $$[0, 2\pi]$$ 를 $$n_2$$ 개로 쪼개고 zenith 를 나타내는 $$\theta$$ 는 $$[0, 0.5\pi]$$ 를 $$n_1$$ 개로 쪼갰다. $$ \Delta \phi \Delta \theta =  \cfrac{2\pi}{n_2}  \cfrac{0.5 \pi}{n_1}$$ 가 성립하므로 위 식은 이를 따로 빼 앞에 곱했다.
+ $$\sin(\theta)$$ 가 곱해진 이유는 극점이 가까워질 수록 위도선이 작아지는데 위도선을 이루는 원의 반지름이 이 비율이기 때문이다.
+ $$ n \cdot \omega_i $$ 는 $$\cos(\theta)$$ 로 바꿀 수 있으므로 바꿨다.

이를 위한 시간복잡도는 O($$n_1 n_2 $$) 이다. 그러면 오차는 어떻게 될까? 
[Trapezoidal_rule](https://en.wikipedia.org/wiki/Trapezoidal_rule) 에 따르면 Riemann Sum 을 구하는 범위에서 secondary derivative 에서 연속이면 그 오차의 절댓값이 O($$\cfrac{1}{N^2}$$) 가 된다. 이러한 오차는 다음 Riemann Sum 에서는 상수로 취급되므로 두번째 Riemann Sum 에서도 복잡도가 유지된다. 그래서 대략 $$O(\cfrac{1}{n_1^2} + \cfrac{1}{n_2^2})$$ 가 될 것이다.

일반화해서 Volume of $$\mathbb{R}^k$$ 에서의 오차는 총 쪼개는 시간복잡도는 $$\mathrm{O}(N^k)$$ 가 되고 오차는 $$\mathrm{O}(1/(N^{2/k}))$$ 가 된다. 하나의 Dimesion 에서의 오차가 누적이 되는 것이다. 그래서 __Riemann Sum 차원의 수가 많아졌을 때 오차를 효율적으로 줄일 수 없다.__ 이는 __Curse of Dimensionality__ 의 이유 중의 하나이다.

## 사전 정리

### [LLN(Law of Large Numbers)](https://www.statlect.com/asymptotic-theory/law-of-large-numbers)

>  $$\lim_{n \rightarrow \infty} \mathrm{P}( \mid \overline{X_n} - \mu \mid \geq k) = 0$$
+ $$\{ X_n \}$$ is [Convariance Stationary](https://www.statlect.com/glossary/covariance-stationary) Sequence of random variables. 
+ and $$\overline{X_n} = \cfrac{1}{n} \sum_{i=1}^n X_i$$

위는 Weak LLN 의 하나인 Chebyshev's WLLN 의 결론이다. 자세한 증명은 위 링크에서 보자.
+ 요약하면 표본의 크기가 커질수록 서로 독립적인 표본들의 평균이 모평균과 일치할 확률이 커진다는 말이다.
+ $$\text{Var}[\overline{X_n}] = \cfrac{1}{n}\{\gamma_0 + 2 \sum_{i=1}^{n-1} \cfrac{n-i}{n}\gamma_i \}$$ 으로 오차가 $$X$$ 의 차원과 관계가 없다.
+ 각각의 원소의 PDF 가 (간략하게 말하면) 비슷하게 $$\{X_n \}$$ 를 생성할 수 있으면 BlackBox Function 에 대해서도 평균을 즉 함수의 적분을 수행할 수 있다. 

### [Statistical Inference](https://www.statlect.com/fundamentals-of-statistics/statistical-inference)

> A __sample__ $$\xi$$ is the realization of a random vector $$\Xi$$

The object of the statistical inferences is the probability distribution of $$\Xi$$

> $$\Psi = \{ F : \mathbb{R}^l \rightarrow \mathbb{R}_+ \text{ such that } F \text{ is a joint distribution function} \} $$ and a subset $$\Phi \subseteq \Psi$$ is a __statistical model__ for $$\Xi$$.
+ $$\xi $$ is a realization of an $$l$$-dimensional random vector $$\Xi$$ 

### [Plug-in Principle](https://www.statlect.com/asymptotic-theory/plug-in-principle)

>  If $$F_n \in \Phi$$ then the quantity $$T(F_n)$$ is called a __Plug-in Estimate of__ $$T(F)$$

+ $$\xi = [x_1, x_2, ... , x_n]$$ __all have a same distribution__ function $$F$$
+ $$F_n$$ is the empirical distribution function of the sample $$\xi$$. 
+ $$T$$ is a mapping $$T : \Phi \rightarrow \mathbb{R}$$. 
  + The output of $$T(\phi)$$ is a feature of a probability distribution(e.g. expectation, quantiles).

> __Plug-in Principle__ is that $$T(F_n)$$ converges $$T(F)$$ in some condition.

+ Estimator 가 $$T(F)$$ 로 수렴한다는 것이 보장되면 Consistent 하다고 한다.
+ $$\mathrm{E}(T(F) - T(F_n)) = 0 $$ 이면 Unbiased 라고 한다.

+ the most commonly used mappings $$T$$ (e.g., mean, variance, moments and cross-moments, quantiles) 에 대해서는 Consistent 하다고 한다. 자세한건 위 링크.


## Monte Carlo Integration

Monte Carlo approximation 는 컴퓨터 등으로 만들어진 샘플을 이용해 Plug-in Principle 을 적용하는 것이다. $$\xi$$ 의 원소들이 모두 같은 distribution function 을 공유해야한다는 제약은 컴퓨터의 난수생성기로 만들어진 샘플이 대개 만족하기 때문에 성립한다.

이때 $$T$$ 가 $$mean$$ 에 대한 mapping 의 경우 Monte Carlo Integration 이라고 한다. 이 경우 Kolmogorov's Strong LLN 를 사용해 Plug-in Principle 이 적용될 수 있음을 보일 수 있다. 여기서는 Monte Carlo Integration 에 집중하려고 한다.


### [Uniform Sampling](https://www.statlect.com/asymptotic-theory/Monte-Carlo-method)

$$ \begin{multline} \shoveleft
 T(F_X) = \int_{-\infty}^{\infty} x dF_X(x) = \mathrm{E}[X] \\ \shoveleft
 T(F_n) = \cfrac{1}{n} \sum_{i = 1}^{n}  x_i  \\ \shoveleft
 T(F_X) \simeq T(F_n)
\end{multline}$$

Empirical distribution function $$F_n(a) = \cfrac{ \mid \{x \in \xi : x \leq a \} \mid } { \mid \xi \mid } $$ 이다. 그렇기 때문에 위와 같은 단순 평균을 구하는 식이 도출이 된다. 

$$ \begin{multline} \shoveleft
 T(F_n) = \cfrac{1}{n} \sum_{i = 1}^{n} g(z)  \\ \shoveleft
\end{multline}$$

$$X$$ 의 Sample 을 바로 얻기 어려운 경우 $$x_i = g(z_i)$$ 가 성립하는 쉽게 얻을 수 있는 Random Variables $$[z_1, z_2, ... , z_n]$$ 에서 Monte Carlo Integration 을 수행해도 된다.

오차의 경우 $$\epsilon_n = T(F_n) - T(F_X)$$ 이라고 하면 $$\text{Var}[\epsilon_n] = \cfrac{1}{n}\text{Var}[g(X)]$$ 가 성립한다.


### [Importance Sampling](https://www.statlect.com/asymptotic-theory/importance-sampling)

$$ \begin{multline} \shoveleft
\mathrm{E}[g(X)] \\ \shoveleft
=  \int_{x \in R_X} g(x)f_X(x) dx
=  \int_{x \in R_X} g(x)\cfrac{f_Y(x)}{f_Y(x)}f_X(x) dx \\ \shoveleft
=  \int_{y \in R_Y} g(y)\cfrac{f_X(y)}{f_Y(y)}f_Y(y) dy \\ \shoveleft
= \mathrm{E}\left[ g(Y)\cfrac{f_X(Y)}{f_Y(Y)} \right] 
\end{multline}$$

+ $$X$$ is a $$k \times 1 $$ random variable with support $$R_X$$.
+ $$g(x)$$ is a function $$g: \mathbb{R}^k \rightarrow \mathbb{R}$$
+ $$Y$$ is other $$k \times 1 $$ random variable with joint PDF $$f_Y(y)$$ such that $$f_X(x) > 0 \rightarrow f_Y(x) > 0$$ 
+ $$R_X$$ 가 $$R_Y$$ 와 같아서 성립하며, 비슷하게 Discrete Vectors 에도 적용가능하다.

$$ \begin{multline} \shoveleft
\overline{g}_{X, n} =  \cfrac{1}{n} \sum_{i = 1}^n g(Y_i)\cfrac{f_X(Y_i)}{f_Y(Y_i)} 
\end{multline}$$

그러므로 $$X$$ 에서 Sampling 을 한 결과는 $$Y$$ 에서 샘플링 후 위와 같이 식을 변형하면 같은 결과를 얻을 수 있다.

오차의 경우 $$\epsilon_n = \overline{g}_{X, n} - T(F_X)$$ 이라고 하면 $$\text{Var}[\epsilon_n] = \cfrac{1}{n}\text{Var} \left[ g(Y)\cfrac{f_X(Y)}{f_Y(Y)} \right]$$ 가 성립한다.

우리가 선택할 수 있는 것은 $$Y$$ 이므로 분산을 0 으로 만들려면 $$f_Y(y) = \cfrac{g(y)f_X(y)}{\mathrm{E}[g(X)]}$$ 이면 된다. 대개의 경우 이를 만족하는 $$Y$$ 를 알 순 없지만 __$$g(y)f_X(y)$$ 가 큰 경우에서 집중해서 표본을 얻으면 분산을 최소화 할 수 있다.__

#### 변형

$$ \begin{multline} \shoveleft
\int_a^b g(x) dx 
= \int_a^b \cfrac{g(x)}{f(x)}f(x) dx   
= \mathrm{E}\left[\cfrac{g(X)}{f(X)}\right] 
= T(F_X)  \\ \shoveleft

T(F_n) = \cfrac{1}{n} \sum_{i = 1}^{n} \cfrac{g(x_i)}{f(x_i)} \\ \shoveleft

\int_a^b g(x) dx 
\simeq \cfrac{1}{n} \sum_{i = 1}^{n} \cfrac{g(x_i)}{f(x_i)}

\end{multline}$$

이를 응용하면 확률정보가 없는 함수에 대해서도 적분할 수 있다. $$f$$ 는 [legitimate PDF](https://www.statlect.com/fundamentals-of-probability/legitimate-probability-density-functions) 라면 무엇이든 쓸 수 있으며 분산을 고려하면 $$g(X)$$ 와 비례하도록 하는 것이 좋다.


### 적용

> $$L(n) = \int_\Omega L_i(p, \omega) n \cdot \omega d\omega $$ 

Rendering Equation 에서 Global Irradiance 를 구하는 시나리오에서 Monte Carlo Integration 을 해보자. 그러면 우리가 구해야하는 식은 위와 같다

#### Uniform Sampling 

반구의 겉넓이를 zenith(수직일때 0) $$\theta$$ 와 azimuth $$ \phi$$ 로 적분하면 다음과 같다.

$$ f_X(\omega) = \int_{\Omega} 1 d\omega = \int_0^{2 \pi} \int_0^{0.5 \pi} \sin{\theta} d\theta d\phi = 2 \pi$$

그러므로 $$f_{(\Theta, \Phi)}(\theta, \phi) = \cfrac{\sin{\theta}}{2 \pi}$$ 인데, 각각 Independent 하므로 $$f_{(\Theta, \Phi)} = f_\Theta \cdot f_\Phi $$ 가 성립한다. 
그러면 $$ f_\Theta = \sin{\theta}, \  f_\Phi = \cfrac{1}{2\pi}$$ 로 둘 수 있다.

 $$[0, 1]$$ 사이의 Uniform Random Varaibles $$[\xi_1, \xi_2]$$ 은 쉽게 생성할 수 있고, 위의 Distribution Function 에 대한 CDF 는 연속하므로, CDF 의 역함수로 우리가 원하는 Random Variables 를 얻을 수 있다.

$$F_{\Theta}(\theta) = 1-\cos{\theta}, \quad \theta = \cos^{-1}(1-\xi_1) $$

$$F_{\Phi}(\phi) = \cfrac{\phi}{2\pi}, \quad \phi = 2\pi\xi_2$$

이를 직교 좌표계로 변환하면 
$$(\sqrt{1-\xi_1^2} \cos(2\pi \xi_2), \ 
\sqrt{1-\xi_1^2}\sin(2\pi \xi_2), \
\xi_1  
)$$ 가 된다.
+ 수식을 깔끔하기 위해 $$1-\xi_1$$ 를 $$\xi_1$$ 이라고 해도 상관없음을 이용했다.
+ $$\sin(\cos^{-1}(x)) = \sqrt{1-x^2}$$ 를 이용했다. [증명](https://socratic.org/questions/how-do-you-simplify-sin-arccos-x-1)

이렇게 샘플링 할 때 적분식은 다음과 같이 나타낼 수 있다. 

 $$ L(n) \simeq \cfrac{1}{n} \sum_j^n \cfrac{L_i(p, \omega_j) \cos{\theta} }{f_X(\omega_j)} 
 = \cfrac{2\pi}{n} \sum_j^n L_i(p, \omega_j) \cos{\theta} $$

이때 주의할 점은 여기서 사용한 Monte-Carlo 는 이중적분에 대한 것이 아니라는 것이다. 그렇기 때문에 $$f_X(\omega) = \cfrac{\cos{\theta}}{2\pi}$$ 가 아니라 모든 표면에 같은 확률을 의미하는 $$f_X(\omega) = \cfrac{1}{2\pi}$$ 가 옳다.

#### Importance Sampling


여기서 위 식이 $$n \cdot \omega = \cos(\theta)$$ 인 가중치가 있다는 것을 이용해 Importance Sampling 을 할 수 있다. 이 경우 반구의 겉넓이에서 $$\cos{\theta}$$ 와 비례하도록 하여 적분을 하면 다음과 같다.

$$  f_Y(\omega) = \int_{\Omega} \cos{\theta} d\omega = \int_0^{2 \pi} \int_0^{0.5 \pi} \cos{\theta}\sin{\theta} d\theta d\phi = \pi$$

$$f_{(\Theta, \Phi)}(\theta, \phi) =  \cfrac{\sin{\theta}\cos{\theta}}{\pi}$$ 로 두면 적합한 Distribution Function 이 된다.
그러면 각 Parameter 가 Independent 하므로 $$ f_\Theta = 2\sin{\theta}\cos{\theta}, \  f_\Phi = \cfrac{1}{2\pi}$$ 로 둘 수 있다.

 CDF 의 역함수로 우리가 원하는 Random Variables 를 얻을 수 있다.

$$F_{\Theta}(\theta) = \sin^2{\theta}, \quad \theta = \sin^{-1}(\sqrt{\xi_1}) $$

$$F_{\Phi}(\phi) = \cfrac{\phi}{2\pi}, \quad \phi = 2\pi\xi_2$$

이를 직교 좌표계로 변환하면 
$$(
\sqrt{\xi_1} \cos(2\pi \xi_2), \ 
\sqrt{\xi_1} \sin(2\pi \xi_2), \
\sqrt{1-\xi_1}
)$$ 가 된다.


이렇게 샘플링 할 때 적분식은 다음과 같이 나타낼 수 있다.

 $$ L(n) \simeq \cfrac{1}{n} \sum_j^n \cfrac{L_i(p, \omega_j) \cos{\theta} }{f_Y(\omega_j)} 
 = \cfrac{\pi}{n} \sum_j^n L_i(p, \omega_j) $$


## 참고자료

[Graphics Course of Keenan Crane](https://youtu.be/EGNZm9m382s)

[Statlect](https://www.statlect.com/asymptotic-theory/Monte-Carlo-method)

[LearnOpenGL IBL Diffuse](https://learnopengl.com/PBR/IBL/Diffuse-irradiance)