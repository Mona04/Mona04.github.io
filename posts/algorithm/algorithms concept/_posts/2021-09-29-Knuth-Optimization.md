---
excerpt: "Cycle 찾기"
categories: Algorithm
tag: [PS. Knuth Optimization]
use_math: true
---

[문제](https://www.acmicpc.net/submit/11066/40429781)

언제 한번 해야하는데

{% highlight c++ %}

#include <bits/stdc++.h>
using namespace std;
#define fastio cin.tie(0)->ios::sync_with_stdio(0); cout.tie(0); setvbuf(stdout, nullptr, _IOFBF, BUFSIZ);
#pragma warning(disable:4996)

// http://web.cs.unlv.edu/bein/pubs/knuthyaotalg.pdf
// https://js1jj2sk3.tistory.com/3
// C[a][c]+C[b][d]<=C[a][d]+C[b][c] (a<=b<=c<=d)        Quadrangle Inequality
// C[b][c]<=C[a][d] (a<=b<=c<=d)                       Monotonity
// dp[i][j] = min(i < k < j){dp[i][k] + dp[k][j]} + C[i][j]   Recurrence relation
// then.  k[i][j-1]  <= k[i][j] <= k[i+1][j]

using INT = int;
#define SIZE 501
int n;
INT cache[SIZE][SIZE];
INT kCache[SIZE][SIZE];
INT rangeCache[SIZE];
int files[SIZE];

int main()
{
	for (int i = 0; i < SIZE; i++)
		kCache[i][i + 1] = i + 1;

	fastio;
	int t;
	cin >> t;
	while (t--)
	{
		cin >> n;
		for (int i = 0; i < n; i++)
			cin >> files[i];;
		for (int i = 0; i <= n; i++)
			fill(&cache[i][0], &cache[i][0] + n + 1, 0);
		rangeCache[0] = 0;
		for (int i = 0; i < n; i++)
			rangeCache[i+1] = rangeCache[i] + files[i];
	
		for (int offset = 2; offset <= n; offset++)
			for (int i = 0; i <= n - offset; i++)
			{
				static int j;
				j = i + offset;
				cache[i][j] = numeric_limits<int>::max();
				for (int k = kCache[i][j - 1]; k <= kCache[i + 1][j]; k++)
				{
					static INT tmp;
					tmp = cache[i][k] + cache[k][j] + rangeCache[j] - rangeCache[i];
					if (tmp < cache[i][j])
					{
						cache[i][j] = tmp;
						kCache[i][j] = k;
					}
				}
			}
		cout << cache[0][n] << '\n';
	}
}

{% endhighlight %}

