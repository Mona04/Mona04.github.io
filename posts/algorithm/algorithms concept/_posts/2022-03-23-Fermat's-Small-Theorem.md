---
excerpt: "Fermat's Small Theorem, Miller-Rabin Primality Test, ect"
tag: [PS. 정수론]
use_math: true
---
## 서론

파고들면 매우 내용이 방대해서, 적극적으로 필요할 때 찾은 내용만 추가할 생각.


## [Fermat's Small Theorem](https://en.wikipedia.org/wiki/Fermat%27s_little_theorem)

> if $$p$$ is a prime number, then for any integer $$a$$, $$a^p \equiv a \pmod{p}$$ 
> <br/> if $$a < p$$ then $$a^{p-1} \equiv 1 \pmod{p}$$ is valid.

증명은 [NamuWiki](https://namu.wiki/w/%ED%8E%98%EB%A5%B4%EB%A7%88%EC%9D%98%20%EC%86%8C%EC%A0%95%EB%A6%AC?from=%ED%8E%98%EB%A5%B4%EB%A7%88%20%EC%86%8C%EC%A0%95%EB%A6%AC) 에서 쉽게 설명해놓음.

### 모듈러 역원

이 [블로그](https://www.weeklyps.com/entry/%ED%8E%98%EB%A5%B4%EB%A7%88%EC%9D%98-%EC%86%8C%EC%A0%95%EB%A6%AC-%EC%9E%89%EC%97%AC%EC%97%AD%EC%88%98-%EA%B5%AC%ED%95%98%EA%B8%B0?category=795989) 참고.

모듈러 연산에 대한 덧셈, 뺄셈, 곱셈의 결합법칙은 성립하는데 __나눗셈은 성립하지 않음__

대신 $$ a \times a^* \equiv 1 \pmod {p}$$ 를 만족하는 $$a^*$$ 인  __모듈로 역원__ 을 사용해 나눗셈을 처리할 수 있음.
+ 페르마의 소정리로 $$a^{p-1} \equiv 1 \pmod{p}$$ 가 성립하여 
+ 임의의 수 $$t$$ 에 대해 $$ t / a \equiv t / a \times a^{p-1} \equiv  t \times a^{p-2}  \pmod{p}$$ 가 성립함.
+ 즉 $$a$$ 의 모듈로 역원은 $$a^{p-2}$$ 가 되어, $$a$$ 를 나눌 때 $$a^*$$ 를 곱하면 congruence(합동식) 이 유지됨.
+ __이러한 모듈로 역원은소수로 나눈 결과를 사용하는 문제에서 나눗셈 연산 시 필수적인 요소가 됨.__

거듭제곱을 분할정복으로 풀면 $$log(p)$$ 시간에 modulo 에서의 나눗셈을 처리할 수 있음.
+ 상대적으로 느리므로 나눠지는 수를 다 곱해 하나로 만든 후 한번에 처리하는게 나음

{% highlight c++ %}
int64_t ModInv(int t, int MOD)
{
	int idx = MOD-2; int64_t base = t, res = 1;
	while (idx)
	{
		if (idx & 1)  res = (res * base) % MOD;
		base = (base * base) % MOD;
		idx >>= 1;
	}
	return res;
}
{% endhighlight %}


### 유사소수

특정 $$a$$ 에 대해서 위 식이 성립하는 합성수를 [유사소수](https://www.acmicpc.net/problem/4233) 라고 하고, $$p$$ 보다 작고 서로수인 모든 $$a$$ 에 대해서 성립하는 위 식이 성립하는 $$p$$ 를 카마이클 수라고 함.
+ 카마이클 수의 존재로 페르마 소정리로 인한 소수판단의 반례가 됨 (역은 성립은 안한다는 말)



## [Miller-Rabin Primality Test](https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test)

> A prime number $$N=d \times 2^s+1$$ where $$s > 0$$, $$d$$ is odd number, $$a$$ called a base is coprime to $$N$$ and $$(a < N)$$ 는 다음의 두 식중 하나를 만족하며, 역은 성립하지 않는다. <br/>
> $$ a^d \equiv 1 \pmod{N} $$  <br/>
> $$a^{d \times 2^r} \equiv -1 \pmod{N} $$ for some $$r$$, $$(0 \leq r < s)$$ 


위 조건을 만족하는 수를 _Strong Probable Prime_ 이라고 하고, 이 중에 합성수인 수를 Strong Pseudo Prime 이라고 한다.

어떤 합성수 $$N'$$ 에 대해 위 테스트를 통과시키지 않는 $$a$$ 를 _witness_ for the compositeness of $$N'$$ 이라고 한다. 모든 합성수는 하나 이상의 witness 를 가지고 있음이 알려져 있으므로 적절한 $$a$$ 의 집합을 찾는 것이 중요하다. 

기본적으로 역이 성립하지 않지만 몇개의 bases 에 대해서 테스트를 반복하면 상당히 큰 범위 내에서 역이 만족됨이 알려져 있다. 혹은 랜덤한 수를 이용해 False Positive 의 확률을 낮추는 방법도 있다. 잘 알려진 집합에 대해서는 위키를 참고.

증명은 매우 간략하므로 위키 참조.

#### 시간복잡도

테스트 할 Bases 의 갯수를 $$K$$ 라고 하자.

시간 복잡도는 곱셈을 어떻게 처리하느냐에 따라 달라진다. 
+ cpu 가 한번에 처리할 수 있는 범위의 수에 대한 곱셈을 하는 아래의 코드는 O($$K\log{N}^2$$) 이다.
+ Big Number 에 대한 곱셈을 필요로 한다면 [Naive 한 곱셈](https://codeforces.com/blog/entry/50202) 을 수행 시 O($$K\log{N}^3$$) 가 되며, FFT 를 사용하면 더 빠르게 할 수 있다.

#### 코드

탐색 하는 방향에 따라 두가지 버전을 만들 수 있으며 각각 장단점이 있다.
+ BottomUP 방식은 Big Number 에 대해서 FFT 도 적용할 수 있어서 더 확장성이 있다. 
+ TopDown 을 수행하면 True Nagative 인 경우 빠르게 판단이 가능하다. Bottom Down 은 1 이 나오지 않는 이상 break 를 할 수 없기 때문이다.


<details>
<summary>TopDown</summary>
{% highlight c++ %}

int64_t ModPow(int a, int64_t b, int MOD)
{
	int64_t r = 1;
	while (b)
	{
		if (b & 1) r = r * a % MOD;
		a = a * a % MOD;
		b >>= 1;
	}
	return r;
}

int witness[] = { 2,3,5,7,11,13,17, 19,23,29,31,37 }; // if n < 18,446,744,073,709,551,616 = 2^64 
bool Miller(int n)
{	
	if (n <= 1) return false;

	for (int a : witness)
	{
		if (a >= n) continue;
	
		int64_t t = n - 1;
		while (1)
		{
			int64_t at = ModPow(a, t, n);
			if (at == n-1) break;  // mod 한 값이 -1 이므로 sqrt 끝
			if (t % 2)             // a^d 인 경우
			{
				if(at != 1) return false;
				break;
			}
			t >>= 1;
		}
	}
	return true;
}
{% endhighlight %}
</details>


<details>
<summary>BottomUp</summary>
{% highlight c++ %}

ll ModMul(ll a, ll b, ll MOD)
{
	ll r = 0;
	while (b)
	{
		if (b & 1) r = (r + a) % MOD;
		a = (a << 1) % MOD;
		b >>= 1;
	}
	return r;
}

bool Miller(ll n)
{
	if (n <= 1) return false;

	for (int a : witness)
	{
		if (a >= n) break;

		ll d = n - 1;
		while (!(d & 0b1)) d >>= 1;

		ll t = ModPow(a, d, n);
		if (t == 1 || t == n-1) continue;

		while (d != n - 1)
		{
			t = ModMul(t, t, n);
			if (t == n-1) break;
			// t 가 1 이면 sqrt(t) 는 -1 또는 1 이어야한다. 이는 모순이다.(만약 그렇다면 진작에 break, return 됨) 
			if (t == 1)   return false; 
			d <<= 1;
		}
		if (d == n - 1) return false;
	}
	return true;
}
{% endhighlight %}
</details>

<br/>


## [Euler's Theorem](https://en.wikipedia.org/wiki/Euler%27s_theorem)

> if $$n$$ and $$a$$ are coprime positive interger and $$\varphi(n)$$ is Euler's Totient Function(count of coprime number $$1 \sim n-1$$ with $$n$$) then $$a^{\varphi(n)} \equiv 1 \pmod{n} $$, vice versa.
