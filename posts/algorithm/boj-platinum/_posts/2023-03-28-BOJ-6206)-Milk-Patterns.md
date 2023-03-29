---
excerpt: "백준 6206. 임의의 길이의 반복된 문자열 찾기"
tag: [PS. hash, PS. string, PS. suffix/lcp array, PS. binary search]
use_math: true
---

## 문제

[백준 6206](https://www.acmicpc.net/problem/6206)

임의의 길이의 반복된 부분 문자열을 찾는 문제이다.

기본적인 전략은 $$\mathrm{K}$$ 번 반복되는 부분 문자열의 길이인 $$\mathrm{M}$$ 를 이분탐색으로 찾아보는 것이다. 그러면 고정 길이의 부분 문자열이 몇번 반복되는지 찾는 문제로 환원된다. 


## Rabin Carp

상수커팅을 안하면 시간제한에 걸릴 모양.


### 시간 복잡도

O($$ (\mathrm{N} + \mathrm{N} \mathrm{K} )\log{\mathrm{N}} $$)
+ $$\mathrm{K}$$ 번 반복되는 문자열이 존재한다면 문자열 비교를 $$\mathrm{K}$$ 번 해야한다. 부분문자열의 길이는 알 수 없으므로 문자열 비교에 대충 O($$\mathrm{N}$$) 걸린다고 가정하고 러프하게 구했다.

### 코드

{% highlight c++ %}

using ll = long long;
using ii = pair<ll, ll>;

int arr[20001];
list<int> caches[20001];

struct RabinKarp
{
	using ll = long long;
	void Init(const int* in, int m)
	{
		Str.resize(m);

		M = m;
		P_Pow_M_Minus_1 = 1;
		h = H(in);

		for (int i = 0; i < m; i++)
		{
			Str[cur_i] = in[i];
			cur_i = (cur_i+1)% M;
		}

		ll p2 = P;
		m--;
		while (m)
		{
			if (m & 1) P_Pow_M_Minus_1 = (P_Pow_M_Minus_1 * p2) % M;
			p2 = p2 * p2 % M;
			m >>= 1;
		}
	}
	int H(const int* in)
	{
		ll h = 0;
		for (int i = 0; i < M; i++)
			h = (h * P + in[i]) % M;
		return h;
	}
	int Roll(int s_hat)
	{
		int s_m = Str[cur_i];
		Str[cur_i] = s_hat;
		cur_i = (cur_i + 1) % M;
		
		h -= (s_m * P_Pow_M_Minus_1) % M;
		h = (h + M) % M;
		return h = (h * P + s_hat) % M;
	}
	bool Check(const int* a, const int* pat)
	{
		for (int i = 0; i < M; i++)
			if (a[i] != pat[i]) return false;
		return true;
	}

	const int P = 20003;
	int M;
	ll h;
	ll P_Pow_M_Minus_1;
	vector<int> Str; 
	int cur_i = 0;
};

int main()
{
	int n, k, r = 0;
	cin >> n >> k;
	for (int i = 0; i < n; i++) cin >> arr[i];
	for (int i = 0; i < n; i++) caches[arr[i]%n].push_back(i);

	int s = 2, e = n;
	while(s <= e)
	{
		int m = (s + e) / 2;

		for (int i = 0; i < m; i++) caches[i].clear();
		RabinKarp rc;
		rc.Init(arr, m);

		caches[rc.h].push_back(0);
		for (int i = 0; i < n - m; i++)
			caches[rc.Roll(arr[i + m])].push_back(i + 1);
		
		bool bExist = false;
		for (int h = 0; h < m; h++)
		{
			for (auto i = caches[h].begin(); i != caches[h].end(); i++)
			{
				auto j = i; j++;
				int cnt = 0;
				for (; j != caches[h].end(); j++)
				{
					cnt += rc.Check(arr + *i, arr + *j);
					if (cnt >= k - 1)
					{
						bExist = true;
						goto END;
					}
				}
			}
		}
	END:;
		if (bExist) {
			r = max(r, m);
			s = m + 1;
		}
		else e = m - 1;
	}
	cout << r;
}

{% endhighlight %}






## LCP

longest common prefix array 로 길이가 ```m``` 이상의 부분문자열이 몇번 반복되는지 선형시간에 구할 수 있다.

좌표압축을 사용하면 사용공간을 꽤나 줄일 수 있다.



### 시간 복잡도

O($$ \mathrm{N}\log{\mathrm{N}} $$)


### 코드

{% highlight c++ %}

template<int SIZE = 20005, int CSIZE = 20001>
struct SuffixArray
{
	int src[SIZE]; int len = -1;
	int sa[SIZE], lcp[SIZE];

	int rk[SIZE], cnt[SIZE], tmp[SIZE];
	int o = 1;

	inline bool Cmp(int a, int b)
	{
		if (rk[a] != rk[b]) return rk[a] < rk[b];
		if (a + o < len && b + o < len)
			return rk[a + o] < rk[b + o];
		return  a + o > b + o;
	}

	void CountSort()
	{
		int m = max(rk[sa[len - 1]] + 1, CSIZE) + 1;
		fill(cnt, cnt + m, 0);
		for (int i = 0; i < len; i++) cnt[i + o < len ? rk[i + o] + 1 : 0]++;
		for (int i = 1; i <= m; i++) cnt[i] += cnt[i - 1];
		for (int i = len - 1; i >= 0; i--) tmp[--cnt[i + o < len ? rk[i + o] + 1 : 0]] = i;

		fill(cnt, cnt + m, 0);
		for (int i = 0; i < len; i++) cnt[rk[i]]++;
		for (int i = 1; i < m; i++) cnt[i] += cnt[i - 1];
		for (int i = len - 1; i >= 0; i--) sa[--cnt[rk[tmp[i]]]] = tmp[i];
	}

	void Init()
	{
		int p, i;

		//Manber-Myers Algorithms
		for (i = 0; i < len; i++) rk[i] = src[i];
		for (p = 0, o = 1; p + 1 < len; o <<= 1)
		{
			CountSort();
			p = tmp[sa[0]] = 0;
			for (int i = 1; i < len; i++)
				tmp[sa[i]] = Cmp(sa[i - 1], sa[i]) ? ++p : p;
			swap(tmp, rk);
		}

		// Kasai Algorithms
		// 여기서는 len 이 1 인경우 rank 가 알파벳 오프셋이 되어 작동하지 않음에 주의
		int num = 0;
		for (int i = 0; i < len; i++)
		{
			int k = rk[i];
			if (k) {
				while (src[i + num] == src[sa[k - 1] + num]) num++;
				lcp[k] = num;
				if (num) num--;
			}
		}
	}
}

SuffixArray sa;
int items[20001];

int main()
{
	int n, k, r = 0;
	cin >> n >> k;
	if (n == 1)
	{
		cout << 0;
		return 0;
	}

	for (int i = 0; i < n; i++)
	{
		// coordinate compression
		int c; cin >> c;
		if (items[c] == 0) items[c] = i + 1;
		sa.src[i] = items[c];
	}
	sa.len = n;
	sa.Init();

	int s = 1, e = n;
	while (s <= e)
	{
		int m = (s + e) / 2;
		bool bC = 0;

		for (int i = 0, nSucc = 0; i < n - 1; i++)
		{
			nSucc = sa.lcp[i + 1] >= m ? nSucc + 1 : 0;
			if (nSucc >= k - 1)
			{
				bC = true;
				break;
			}
		}

		if (bC) {
			r = max(r, m);
			s = m + 1;
		}
		else e = m - 1;

	}

	cout << r;
}

{% endhighlight %}