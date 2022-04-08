---
excerpt: "이항계수를 푸는 다양한 방법, 루카스의 정리 "
tag: [PS. 정수론]
use_math: true
---

## 서론

문제 풀때마다 정리하는 방식으로 작성예정.


## [파스칼의 삼각형](https://en.wikipedia.org/wiki/Pascal%27s_triangle)

> $$\begin{multline} \shoveleft 
\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}
\end{multline}$$

위의 점화식으로 구성하는 배열로 ```n``` 제곱의 ```k``` 번째 항의 이항계수가 됨.

#### 시간복잡도

O($$n^2$$) 으로 느림.


## 모듈로 역원

#### 설명

+ Factorial 을 일일히 곱해야하므로 적당한 범위여야하고, 
+ 페르마의 소정리가 성립해야 하므로 소수에 대한 모듈러를 요구해야함.
+ 이때 Factorial 값은 미리 저장해두면 계속 쓸 수 있음.

#### 시간복잡도

+ Factorial 구하는데 O($$N$$)
+ $$_n\mathrm{C}_{k} \pmod{m}$$ 를 구하는데  O($$\log{m}$$) 이 걸림.

#### 예제

[관련 문제](https://www.acmicpc.net/problem/11401)

<details>
<summary> Code </summary>
{% highlight c++ %}

const int MOD = 1e9 + 7;

int64_t ModInv(int64_t t)
{
	int idx = MOD-2; int64_t res = 1;
	while (idx)
	{
		if (idx & 1)  res = (res * t) % MOD;
		t = (t * t) % MOD;
		idx >>= 1;
	}
	return res;
}

int main()
{
	int n, k;
	cin >> n >> k;

	int64_t ans = 1, div = 1;
	for (int i = n; i > n - k; i--){
		ans = ans * i % MOD;
		div = div * (n-i+1) % MOD;
	}
	ans = ans * ModInv(div) % MOD;
	
	cout << ans;
}
{% endhighlight c++ %}
</details>


## 소인수 분해

#### 설명

주어진 인풋 범위가 __에라토스테네스의 체를 돌릴만한 범위라면__ 소인수 분해를 사용할 수 있음.
+ $$_n\mathrm{C}_{k} = \cfrac{n!}{(n-k)!\times k!}$$ 에서 각 Factorial 마다 소인수 분해를 한 결과를 기록하여
+ 각 소수마다 $$n!$$ 에서의 지수에서  $$(n-k)!$$ 와 $$k!$$ 에서의 지수를 빼내고 
+ 이 값으로 그 소수를 거듭제곱한 결과들을 곱함.

위의 모듈러 역원을 쓸 수 없지만 범위가 선형으로 처리될만하면 고려할 방안이 됨.

#### 시간복잡도

+ 소수를 구하는데 O($$n\log{\log n}$$) 가 걸리고, (에라토스테네스의 체 사용)
+ $$_n\mathrm{C}_{k}$$ 를 구하는데 O($$n$$까지의 소수의 갯수 $$\times \log{n} $$) 정도 걸림.  (분할정복으로 제곱 계산)

#### 예제

[연관 문제](https://www.acmicpc.net/problem/11439)

<details>
<summary> Code </summary>
{% highlight c++ %}

using ll = long long;
const int MAX_IN = 4000001;
bool prime_net[MAX_IN];

ll Pow(int a, int b)   // 분할정복을 이용한 거듭제곱
{
    ll r = 1, base = a;
    while (b)
    {
        if (b & 1) r *= base;
        base *= base;
        b >>= 1;
    }
    return r;
}


int Find(int n, int k)  // n! 에서 k 가 몇번 곱해져 있는가?
{
    ll p = k;
    int res = 0;
    while (n >= p)
    {
        res += n / p;
        p *= k;
    }
    return res;
}

int main()
{
    int n, k;
    cin >> n >> k;

    int ans = 1;
    for (int i = 2; i <= sqrt(n); i++)    // n 의 최대 약수가 sqrt(n) 이므로
    	if(!prime_net[i])                 // 이미 체크되었으면 배수는 이미 체크됨 
    		for (int j = i + i; j <= n; j += i)
    			prime_net[j] = true;
    
    for (int p = 2; p <= n; p++)
        if (!prime_net[p])
        	ans = ans * Pow(p, Find(n, p) - Find(k, p) - Find(n - k, p)) % (int)(1e9+7);
    
    cout << ans;
}

{% endhighlight c++ %}
</details>

### 변형

조합의 결과가 Overflow 나지 않는다면 구하는 과정에서도 Overflow 나지 않게 하는 방법이 있음.
+  $$_n\mathrm{C}_{k}$$ 를 구할 때 분모인 $$k!$$ 대해 곱해지는 수 각각에 대해 소인수 분해를 함.
+ 분자인 $$_n\mathrm{P}_{k}$$ 를 구하기 위해 수를 하나하나 곱하는 과정에서 위에서 구한 인수를 최대한 나눔.

#### 시간복잡도

+ $$_n\mathrm{C}_{k}$$ 를 구하는데 O($$k + \text{k! 의 소인수의 갯수}$$) 정도 걸림. 

#### 예제

<a href = "https://mona04.github.io/posts/algorithm/boj-platinum/BOJ-3651\)-Binomial-Coefficients/"> 연관문제 </a>



## [Lucas Theorem](https://ko.wikipedia.org/wiki/%EB%A4%BC%EC%B9%B4%EC%9D%98_%EC%A0%95%EB%A6%AC)

#### 설명

> $${}_m \mathrm{C}_{n} \pmod {p} $$ 를 구한다면 $$p$$ 진법으로 $$m$$, $$n$$ 를 다음과 같이 나타낼 수 있고  <br/> <br/>
> $$m = m_{k}p^k + m_{k-1}p^{k-1} + m_{k-2}p^{k-2} + \dots + m_{1}p + m_0$$  <br/>
> $$n = n_{k}p^k + n_{k-1}p^{k-1} + n_{k-2}p^{k-2} + \dots + n_{1}p + n_0$$  <br/> <br/>
> $$_m \mathrm{C}_{n} \equiv \prod_{i=0}^{r} { _{m_i} \mathrm{C}_{n_i} } \pmod {p} $$ 가 성립함.

$$ _m \mathrm{C}_{n}$$ 을 구하는데 $$m$$ 이 매우 큰 수이면 Factorial 을 못돌릴 수 없게 됨. 

하지만 이 방법을 사용하면 Modular 에 대한 크기로 환원되어 위의 방법을 적용할 수 있게 됨.


#### 증명 메모

$$ \sum_{n=0}^{m} { \left(  _{m}\mathrm{C}_{n}  x^n  \right) } \equiv
\prod_{i=0}^{k}{(1 + x^{p^i})^{m_i} }  \equiv 
\prod_{i=0}^{k} { \sum_{n_i = 0}^{m_i} { _{m_i}\mathrm{C}_{n_i} x^{n_i p^i} }  } \equiv
\sum_{n=0}^{m} { \left(  \prod_{i=0}^{k} {  _{m_i}\mathrm{C}_{n_i}  } \right) x^n}
\pmod{p}  $$

[위키](https://ko.wikipedia.org/wiki/%EB%A4%BC%EC%B9%B4%EC%9D%98_%EC%A0%95%EB%A6%AC)에서 다른건 다 이해가 되는데 두군데 막혔던 부분이 있었다.

##### $$n_i$$ 에 대해서

세번째 등호가 문제인데
+ $$m_i$$ 는 $$m$$ 에 따라 정해진 상수인데 위 식의 $$n$$ 과 $$n_i$$ 는 그렇지 않다.
+ $$n$$ 을 $$p$$ 진법으로 나타낼 때의 $$n_i$$ 는 위 식에서의 $$n_i$$ 과 같은건가?

편한 이해를 위해 예를들어 $$m=11, n=6, p = 7$$ 이라 생각해보자.

$$\begin{multline} \shoveleft \prod_{i=0}^{k}{(1 + x^{p^i})^{m_i} }  \equiv  
\sum_{n_1 = 0}^{1} { _{m_1}\mathrm{C}_{n_1} x^{n_1 p^1} }  \times 
\sum_{n_0 = 0}^{4} { _{m_0}\mathrm{C}_{n_0} x^{n_0 p^0} } 
\pmod{p} 
\end{multline}$$ 

위처럼 나타낼 수 있으며 $$x$$ 의 임의의 승수 $$x^i$$ 는 다음처럼 나타낼 수 있다. 

$$\begin{multline} \shoveleft
x^0 \equiv  {} _{m_1}\mathrm{C}_{0} x^{0 p^1} \times {}_{m_0}\mathrm{C}_{0} x^{0 p^0} \pmod{7} \\  \shoveleft
x^1 \equiv  {} _{m_1}\mathrm{C}_{0} x^{0 p^1} \times {}_{m_0}\mathrm{C}_{1} x^{1 p^0} \pmod{7} \\ \shoveleft
x^2 \equiv  {} _{m_1}\mathrm{C}_{0} x^{0 p^1} \times {}_{m_0}\mathrm{C}_{2} x^{2 p^0} \pmod{7} \\  \shoveleft
\dots \\ \shoveleft
x^{11} \equiv  {} _{m_1}\mathrm{C}_{1} x^{1 p^1} \times {}_{m_0}\mathrm{C}_{4} x^{4 p^0} \pmod{7} \\  \shoveleft
\end{multline}$$ 

이처럼 각 $$x^i$$ 를 구하려면 시그마마다 하나씩 꺼내서 곱해야한다. 이때 $$n$$ 이 정해졌다면 각 시그마마다 $$n_i$$ 는 오직 하나이다. 

이런 이유로 $$n$$ 을 $$p$$ 진법을 나태낼 때 쓰인 $$n_i$$ 와 연결이 되는 것이다.



##### $$m_i < n_i$$ 의 경우는?

위 예제를 이어서 생각하면 $$ x^5 \equiv  {} _{m_1}\mathrm{C}_{0} x^{0 p^1} \times {}_{m_0}\mathrm{C}_{5} x^{5 p^0} \pmod{7} $$ 는 가능할까? 

불가능하다. $$m_0 = 4 $$ 라서 범위를 초과하기 때문이다. 

이런 경우는 존재하지 않지만 항등식이 성립해야하므로 $$0$$ 이다.

__즉 $$m_i < n_i$$ 의 경우는 $$_m \mathrm{C}_n \equiv 0 \pmod{p}$$ 이다.__


#### 시간 복잡도

$$ _n\mathrm{C}_{k} \pmod{p} $$ 를 구하는 문제가 $$ _p \mathrm{C}_{v}  \pmod{p}, \ (0 \leq v \leq p) $$ 를  $$\log_p{n}$$ 번 푸는 것으로 환원됨. 
  + $$ _p\mathrm{C}_{v}  $$ 를 구하기 위한 준비과정과 
  + O($$\log_p{n} \times _p\mathrm{C}_{v}$$ 를 구하는 시간) 으로 나타낼 수 있음.

#### 예제

[연관 문제](https://www.acmicpc.net/problem/11402)

<details>
<summary> Code </summary>

{% highlight c++ %}

using ll = long long;

ll ModInv(ll a, int mod)   // 분할정복을 이용한 거듭제곱
{
    int idx = mod - 2; ll res = 1;
    while (idx)
    {
        if (idx & 1)  res = (res * a) % mod;
        a = (a * a) % mod;
        idx >>= 1;
    }
    return res;
}

ll facts[15000];

int main()
{
    fastio;

    ll m, n, mod = 10007;
    cin >> m >> n >> mod;
    
    facts[0] = 1;
    for (int i = 1; i <= mod; i++)
        facts[i] = i * facts[i - 1] % mod;
    
    ll ans = 1;
    while (m || n)
    {
        int M = m % mod, N = n % mod; // 현재 자리수
        if(N > M)
        {
        	ans = 0; // 항등식에서 존재하지 않는 항이므로 0
        	break; 
        }
        n /= mod; m /= mod; // 자리수 내림
        ans = ans * facts[M] * ModInv(facts[N], mod) % mod;
        ans = ans * ModInv(facts[M - N], mod) % mod;
    }
    
    cout << ans;
}

{% endhighlight c++ %}
</details>

