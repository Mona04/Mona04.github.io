---
excerpt: "확장 유클리드, 중국인의 나머지 정리"
categories: Algorithm
tag: [PS. 정수론]
use_math: true
---
## 참고

[참고1. 확장 유클리드](https://baeharam.github.io/posts/algorithm/extended-euclidean/) 

[참고2. 중국나머지정리위키](https://en.wikipedia.org/wiki/Chinese_remainder_theorem)

## Euclidean algorithm

### 코드

{% highlight c++ %}
int gcd(int m, int n)  // m >= n 를 만족해야함
{
	int z, a, b;
	a = m, b = n;

	while (b)
	{
		z = a%b;
		a = b; b = z;
	}
	return a;
}
{% endhighlight %}

### 설명

<br/> 최대공약수(GCD) 구하는 알고리즘임.

[나눗셈 정리](https://en.wikipedia.org/wiki/Euclidean_division) 를 이용하면 $$ (a \geq b) $$ 일 때 $$a = (a \mod {b} ) + t \times b  $$ 를 만족하는 자연수 $$t$$ 가 존재함.
+ b 의 약수는 \\( t \times b \\) 의 약수기도 하므로
+ $$ (a \mod {b}) $$ 와 b 의 약수의 최대공약수를 구해도 됨.

이때 시간복잡도는 $$\log{(n+m)}$$ 임
+ $$ t \times b \geq b \geq (a \mod {b} ) $$ 이므로
+ $$ a = (a \mod {b} ) + t \times b \geq  2 (a \mod {b} )  $$ 이 성립하므로
+  2번 재귀마다 계산되는 두 항은 적어도 반토막 나기 때문임.


## Bezout’s Identity

> if $$gcd(a, b) = d $$ then there exists integers x and y such that $$ ax + by = d $$

주의해야할 점은 x, y 가 정수이지 자연수가 아니라는 것.

[증명은 안어려우니 위키보자](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_identity)


## Extended Euclidean Algorithm

### Bezout’s Identity 의 해를 구하기

즉 ax + by = d 에서 x, y 구하기가 확장 유클리드 호제법의 목표임.

유클리드 호제법의 점화식을 변형해서 증명함.

$$\begin{multline}
 \text{임의의 자연수 i 에 대해서 } q_i \in N  \\ \shoveleft
r_1 = a, \text{   }  r_2 = b, \text{  단, a > b}   \\ \\ \shoveleft
r_1 = r_2 \times q_1 + r_3      \\  \shoveleft
r_2 = r_3 \times q_2 + r_4      \\  \shoveleft
...  \\  \shoveleft
r_n = r_{n+1} \times q_n + r_{n+2}   \\ \shoveleft
\rightarrow r_{n+2} =  r_n - r_{n+1} \times q_n 
\end{multline}$$

그리고, 어떤 식 $$S(s, t) = as + bt \text{, 단 a, b 는 상수} $$ 라고 하면

$$ \text{임의의 수 m, n, o, p 에 대해서,   } S(s, t) = S(m, n) +S(o, p) $$ 를 만족하는 s, t 가 존재함. ($$ s = m + o, \text{  } t = n + p $$)

따라서

$$\begin{multline}
r_3 = a -  b \times q_1    \\ \shoveleft
r_4 = b - (a - b \times q_1) \times q2   \\ \shoveleft
r_5 \text{ 는 임의의 t, s 에 대해 }  S(s, t)  \text{ 를 만족함.}  \\ \shoveleft
... \\ \shoveleft
r_n \text{는 임의의 t, s 에 대해 }  S(s, t)   \text{ 를 만족함.} \\ \shoveleft
\end{multline}$$

그럼

$$\begin{multline}
r_i = a s_i + b  t_i    \\ \shoveleft
r_{n+2} = r_n - r_{n+1} \times q_n  \\ \shoveleft
\end{multline}$$

가 임의의 수 s, t, q 에 대해서 만족하는걸 이용해서

$$\begin{multline}
a s_{n+2} +  b t_{n+2}      \\ \shoveleft
= a s_n +  b  t_n - (a s_{n+1} +  b t_{n+1} ) \times q_n \\ \shoveleft
= a  (s_n - s_{n+1} \times q_n) +  b (t_n - t_{n+1} \times q_n)     \\ \shoveleft

\rightarrow  t_{n+2} = t_n - t_{n+1} \times q_n      \\ \shoveleft
\rightarrow  s_{n+2} = s_n - s_{n+1} \times q_n 
\end{multline}$$

그럼 r, s, t 를 구하는 식이 q 에 대해서 비슷한 모양의 점화식인 것을 확인할 수 있음.

따라서 유클리드 호제법을 쓰면서 r, q, s, t 를 업데이트 하다가 r 이 GCD(a, b) 가 되었을 때의 s, t 를 가져오면 그게 바로 배주 항등식의 해임

#### 코드

{% highlight c++ %}
void EEA(int a, int b, int& s, int& t)   // a > b 임
{
	int r0 = a, r1 = b, s0 = 1, s1 = 0, t0 = 0, t1 = 1;
	int tmp = 0, q = 0;

	while (r1) {
		q = r0 / r1;
		tmp = r0;
		r0 = r1; r1 = tmp - r1 * q;
		tmp = s0; 
		s0 = s1; s1 = tmp - s1 * q;
		tmp = t0;
		t0 = t1; t1 = tmp - t1 * q;
	}
	s = s0; t = t0;
}
{% endhighlight %}


### 응용

1. $$x = x + \frac{b}{d} $$, $$y = y - \frac{a}{d} $$ 혹은 부호 바꿔서 해도 같은 결과가 나옴.
  + 왜냐면 $$d$$ 는 최소공약수이기 때문임.
  + 즉 $$ \frac{a}{d} +  \frac{b}{d} $$ 의 __임의의 배수만큼__ 구해진 $$a$$ 와 $$b$$ 의 거리를 별려도 된다는 것.
  + 그러므로  $$ x = x +  \frac{b}{d} \times  \frac{Distance}{\frac{a}{d} +  \frac{b}{d}} $$ 를 하면  __상수시간__ 안에 원하는 해를 구할 수 있음 

2. 임의의 값 $$ c $$ 에 대해 $$ ax + by = c $$ 로 간단히 확장가능함
  + $$ (ax + by) * \frac{c}{d} = d * \frac{c}{d} = c $$ 이기 때문임.
  + __단 $$c$$ 는 $$d$$ 의 자연수배여야함__
  + $$d$$ 가 최소공약수이기 때문에 가능한 모든 $$c$$ 를 커버할 수 있음.

위 두 이유 때문에 Bezout’s Identity 의 해가 많이 사용됨.




## Chinese Remainder Theorem(CRT)

> 쌍마다 서로소인 정수집합 $$N_s$$ 에 대해
연립방정식 $$d \equiv x \pmod {y},\ y \in N_s$$ 는 유일한 해를 가진다.

$$N_s$$ 의 원소들의 곱인 $$N$$ 을 주기로 해서 그 주기 안에 $$x$$ 이 하나 존재함을 여기서 알게됨.

### 증명

#### Uniqueness

$$N$$ 의 한 주기 안에 $$x$$ 가 존재한다면 그것이 딱 하나 존재함을 밝히는 것이 목표

방법은 간단한데 $$x$$ 의 답으로  $$x_1$$, $$x_2$$ 가 존재한다고 하자.

$$x_1$$, $$x_2$$ 는 $$N_s$$ 의 임의의 원소인 $$n_i$$ 으로 나눴을 때 조건 상 같은 나머지를 가져야 함.

그러면 $$x_1-x_2$$ 는 $$N_s$$ 의 임의의 원소 $$n_i$$ 의 배수이며 곧 N 의 배수라는 것임.

따라서 $$N$$ 주기 내에서 $$x_1$$, $$x_2$$ 가 있으려면 그 차는 0, 즉 둘이 같아야함.

#### Existence

+ Non-Contructive

	나눗셈 정리 $$x \mod {N}$$ 은 존재하고 하나 존재함.
	
	그리고 이게 $$ \{ t \vert t \equiv x \pmod{n_i}, \text{  }  n_i \in{Ns} \}  $$ 와 오직 하나와 대응 함을 위에서 밝힘
	
	그래서 존재함.
	
+ Constructive

	case 가 2개일 때 우선 살펴봄.
	
	$$\begin{multline}
	x \equiv a_1 \pmod{n_1}       \\ \shoveleft
	x \equiv a_2 \pmod{n_2}       \\ \shoveleft
	\end{multline}$$
  
    이라고하면 Bezout’s Identity 에 따라서  $$ 1 = m_1 n_1 + m_2 n_2  $$ 를 만족하는 정수 $$m_1$$, $$m_2$$ 가 존재함.
  
    위 식에 $$n_1$$로 모듈러를 취하면 $$ 1 \equiv m_1n_1 + m_2n_2 \equiv m_2n_2  \pmod{n_1}$$ 이고 $$n_2$$ 에 대해서도 비슷하게 할 수 있음.
  
    그러면 $$ x = a_2 m_1 n_1 + a_1 m_2 n_2  $$ 에 대해서 $$n_1$$ 과 $$n_2$$ 로 모듈러를 취했을 때 각각 $$a_1$$, $$a_2$$ 가 나오면 이러한 $$x$$ 가 어떤 수인지 구성한 것임.
  
    $$ x \equiv a_2 m_1 n_1 + a_1 m_2 n_2  \equiv a_1 \times m_2 n_2 \equiv a_1 \pmod{n_1}$$ 을 만족하고 비슷하게 $$x \equiv a_2 \pmod{n_2}$$ 임을 확인할 수 있음.
  
    그러므로 위 $$a_2 m_1 n_1 + a_1 m_2 n_2$$ 가 가능한 해 중 하나임.
  
    case 가 3개 이상인 경우도 비슷하게 하면 됨.

### 코드

[이 문제를 중국인 나머지 정리로 푸는 거임](https://www.acmicpc.net/problem/6064)

{% highlight c++ %}
int main()
{
	int t, m, n, x, y;
	int a, b, r, tmp;

	cin >> t;
	
	while (t--)
	{
		cin >> m >> n >> x >> y;
		
		x--; y--;
		r = GCD(m, n);
		
		if ((y - x) % r) {      // 최소공약수를 주기로 돌기때문
			cout << -1 << '\n';
			continue;
		}
	  
		int64_t cop_m = m / r;
		int64_t cop_n = n / r;
		int64_t r1 = x % cop_m;  // CRT 적용을 위해 서로소로 만듬
		int64_t r2 = y % cop_n;
		int64_t cycle = cop_m * cop_n;
		EEA(cop_m, cop_n, a, b);
		int64_t tmp = r2 * cop_m * a + r1 * cop_n * b;
		tmp %= cycle;               // m, n 을 서로소로 만든 후 x 를 구하고
		if (tmp < 0) tmp += cycle;  // 베주 항등식으론 음수도 나오므로 양수로 바꿈
		for(int i = 0 ; i < r; i++, tmp += cycle) // cop_m, cop_n 의 공배수를 더해도 주어진 조건을 만족함
			if (tmp % m == x && tmp % n == y) {
				cout << tmp + 1 << '\n';
				break;
			}
	}
}
{% endhighlight %}
