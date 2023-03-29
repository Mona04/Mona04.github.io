---
excerpt: "Rabin Karp 알고리즘"
tag: [hash, PS. string]
use_math: true
---

## Rabin Carp

$$S$$ is a string of length $$N$$ and $$P$$ is a pattern string of length $$M$$. How to know does $$P$$ exist in the $$S$$?
 
Brute Force 방법을 사용한다면 O($$NM$$) 이 된다. 패턴 매칭을 위한 문자열 비교의 시간복잡도가 O($$M$$) 이나 되기 때문에 매우 느린방법이다.

Rabin Carp 의 방법은 Hash Function 을 이용해 True Positive 와 False Positive 경우에만 문자열 비교를 하게하여 확률적으로 문자열 비교를 상수시간으로 만든다. 
+ 랜덤한 Input 을 가정하면 해시 값이 같을 확률이 $$1/M$$ 이고 문자열 비교의 시간복잡도는 O($$M$$) 이므로 평균 시간복잡도는 O($$1$$) 이 된다. 
+ Rolling Hash Function 을 이용해 연속된 Substring 간의 Hash Value 를 상수시간에 구한다. 

최악의 경우 O($$NM$$) 이나 대개의 경우 O($$M+N$$) 에 가까울 것이므로 매우 빠른 속도를 기대할 수 있다. 또한 알고리즘 특성 상 매칭되는 횟수를 구하는 경우 그 횟수에 비례해 시간복잡도가 복잡해지므로 주의해야한다.


#### 예제

[BOG 16916 부분문자열](https://www.acmicpc.net/problem/16916) 문제를 통해 살펴보자.

<details>
<summary>코드</summary>

{% highlight c++ %}

struct RabinKarp
{
	using ll = long long;
	void Init(const char* in, int m)
	{
		queue<char> tmp;
		swap(tmp, Str);

		M = m;
		P_Pow_M_Minus_1 = 1;
		h = H(in);

		for (int i = 0; i < m; i++) Str.push(in[i]);

		ll p2 = P;
		m--;
		while (m)
		{
			if (m & 1) P_Pow_M_Minus_1 = (P_Pow_M_Minus_1 * p2) % M;
			p2 = p2 * p2 % M;
			m >>= 1;
		}
	}
	int H(const char* in)
	{
		ll h = 0;
		for (int i = 0; i < M; i++)
			h = (h * P + in[i]) % M;
		return h;
	}
	int Roll(char s_hat)
	{
		char s_m = Str.front(); 
		Str.pop(); Str.push(s_hat);
		h -= (s_m * P_Pow_M_Minus_1) % M;
		h = (h + M) % M;
		return h = (h * P + s_hat) % M;
	}
	bool Check(const char* a, const char* pat)
	{
		for (int i = 0; i < M; i++)
			if (a[i] != pat[i]) return false;
		return true;
	}

	const int P = 7979;
	int M;
	ll h;
	ll P_Pow_M_Minus_1;
	queue<char> Str;
} Rabin;


int main() 
{
	string a, b;
	cin >> a >> b;
	if (a.size() < b.size())
	{
		cout << 0;
		return 0;
	}

	int m = b.size();
	
	Rabin.Init(a.data(), m);
	int hash = Rabin.H(b.data());
	if (hash == Rabin.h)
		if (Rabin.Check(a.data(), b.data()))
		{
			cout << 1;
			return 0;
		}

	for (int i = 0; i < a.size() - m; i++)
		if (hash == Rabin.Roll(a[i + m]))
			if(Rabin.Check(a.data() + i + 1, b.data()))
			{
				cout << 1;
				return 0;
			}
	
	cout << 0;
}

{% endhighlight %}

</details>