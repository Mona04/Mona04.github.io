---
excerpt: "백준 6206. 임의의 길이의 반복된 문자열 찾기"
tag: [PS. hash, PS. string, PS. suffix/lcp array]
use_math: true
---

## 문제

[백준 6206](https://www.acmicpc.net/problem/6206)


## 라빈카프

이분탐색과 라빈카프를 합쳐서 풀었다. 

상수커팅을 안하면 시간제한에 걸릴 모양.

### 시간 복잡도

O($$ \mathrm{N}\log{\mathrm{N}} $$)


### 코드

{% highlight c++ %}

#include <bits/stdc++.h>
using namespace std;
#define fastio cin.tie(0)->ios::sync_with_stdio(0); cout.tie(0); setvbuf(stdout, nullptr, _IOFBF, BUFSIZ);
#pragma warning(disable:4996)

using ll = long long;
using ii = pair<ll, ll>;

template<int SIZE = 1000005, int CSIZE = 1000001>
struct SuffixArray
{
	int src[SIZE]; int len = -1;
	int sa[SIZE], lcp[SIZE];

	// 내부사용값
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
};
SuffixArray sa;

int main()
{
	fastio;

	int n, k, r = 0;
	cin >> n >> k;
	if (n == 1)
	{
		cout << 0;
		return 0;
	}

	for (int i = 0; i < n; i++) cin >> sa.src[i];
	sa.len = n;
	sa.Init();

	queue<int> saQueue;
	int tmp = 0;
	for (int i = 0; i < n - 1; i++)
	{
		if (sa.sa[i] > sa.sa[i + 1])
		{
			while (sa.sa[i + 1] + tmp + 1 < n && sa.src[sa.sa[i] + tmp] == sa.src[sa.sa[i + 1] + tmp]) tmp++;
			saQueue.push(tmp);
			if (saQueue.size() == k)
				saQueue.pop();
			if (saQueue.size() == k - 1)		
				r = max<int>(r, saQueue.front());			
		}
		else {
			queue<int> tmpq;
			swap(tmpq, saQueue);
			tmp = 0;
		}
		for (int j = sa.sa[i]; j < n; j++)
			cout << sa.src[j] << ' ';
		cout << endl;
	}

	cout << r;
}

{% endhighlight %}


## LCP

### 시간 복잡도

O($$ \mathrm{N}\log{\mathrm{N}} $$)


### 코드

{% highlight c++ %}



{% endhighlight %}