---
excerpt: "백준 4233. 페르마의 소정리에서 유사소수 판별"
tag: [PS. 정수론]
use_math: true
---

## 문제

[백준 4233](https://www.acmicpc.net/problem/4233)


### 설명

굳이 에라토스테네스의 체를 안써도 시간초과가 나지 않음.

분할정복을 통해서 빠르게 제곱을 계산하는게 포인트.


### 시간 복잡도

O($$\log{(p)}$$)

### 코드

{% highlight c++ %}

int64_t dp[100000];
int primes[10000]; int n_primes;

void Init()
{
	int spp = sqrt(2000000000) + 1;
	for (int i = 2; i < spp; i++)
		for (int j = i+i; j < spp; j += i)
			dp[j] = true;

	for (int i = 2; i < spp; i++)
		if (!dp[i]) primes[n_primes++] = i;
}

bool IsPrime(int p)
{
	for (int i = 0; i < n_primes; i++)
	{
		if (p <= primes[i]) return true;
		if (p % primes[i] == 0) return false;
	}
	return true;
}

void Calc(int a, int p)
{
	int idx = p; int64_t base = a, res = 1;
	while (idx)
	{
		if (idx & 1)  res = (res * base) % p;
		base = (base * base) % p;
		idx >>= 1;
	}

	cout << (res % p != a ? "no\n" : IsPrime(p) ? "no\n" : "yes\n");
}

int main()
{
	Init();

	while (1)
	{
		int p, a;
		scanf("%d %d", &p, &a);
		if (!a) break;
		Calc(a, p);		
	}	
}

{% endhighlight %}