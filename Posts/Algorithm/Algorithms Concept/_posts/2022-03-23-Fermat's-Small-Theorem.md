---
excerpt: "페르마의 소정리와 연관된 것들"
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

### [Miller-Rabin Primality Test](https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test)

> 소수 $$N=d \times 2^s+1$$, $$(a < N),\ \text{ where } d \equiv 1 \pmod{2} \text{ and } s > 0$$ 는 자연수인 $$a$$ 에 대해 다음의 두 식중 하나를 만족함 <br/>
> $$ a^d \equiv 1 \pmod{N} $$  <br/>
> $$a^{d \times 2^r} \equiv -1 \pmod{N} $$ for some $$r$$, $$(0 \leq r < s)$$ 

역은 성립하지 않지만 임의의 $$a$$ 에 대해 위를 만족하지 않는 $$N$$ 은 합성수임이 보장됨. 이때의 $$a$$ 를 witness 라고 하며 witness 를 고르는 방법은 위키를 참조.

증명 또한 매우 간략하므로 위키 참조.

<details>
<summary>Code</summary>
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
			if(t%2)
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

<br/>


## [Euler's Theorem](https://en.wikipedia.org/wiki/Euler%27s_theorem)

> if $$n$$ and $$a$$ are coprime positive interger and $$\varphi(n)$$ is Euler's Totient Function(count of coprime number $$1 \sim n-1$$ with $$n$$) then $$a^{\varphi(n)} \equiv 1 \pmod{n} $$, vice versa.
