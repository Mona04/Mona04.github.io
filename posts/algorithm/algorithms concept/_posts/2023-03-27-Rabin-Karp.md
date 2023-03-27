---
excerpt: "Rabin Karp 알고리즘"
tag: [PS. hash, PS. string]
use_math: true
---

## Rabin Carp

[BOG 16916 부분문자열](https://www.acmicpc.net/problem/16916)

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


https://www.acmicpc.net/problem/6206