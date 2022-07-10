---
excerpt: "펠린드롬 능지문제"
tag: [PS. Palindrome]
use_math: true
---

## 문제

[문제 사이트](https://www.acmicpc.net/problem/3428)

### 코드

{% highlight c++ %}

const int MAXIN = 300005;
char in[MAXIN * 2]; int n;
int dp[MAXIN * 2];

void Mancher()
{
	int r = 0, p = 0;
	for (int i = 0; i < n; i++)
	{
		if (i <= r)
			dp[i] = min(dp[p * 2 - i], r - i);
		else dp[i] = 0;

		while (i - dp[i] - 1 >= 0 && i + dp[i] + 1 < n && in[i - dp[i] - 1] == in[i + dp[i] + 1])
			dp[i]++;

		if (r < i + dp[i])
		{
			r = i + dp[i];
			p = i;
		}
	}
}

int main()
{
	int T; scanf("%d", &T);
	while (T--)
	{
		scanf("%s", in); n = strlen(in);
		for (int i = n - 1; i >= 0; i--) in[(i << 1) + 1] = in[i];
		for (int i = 0; i < n; i++) in[(i << 1)] = '#';
		in[n << 1] = '#';
		n = n * 2 + 1;
		Mancher();

		int ans = 0;
		for (int i = 0; i < n; i += 2)
		{
			if (dp[i] == 0) continue;
			for (int j = ans + 2; j <= dp[i] / 2; j += 2)
			{
				if (dp[i - j] >= j)
					ans = j;
			}
		}

		printf("%d\n", 2 * ans);
		fill(dp, dp + n, 0);
	}
}


{% endhighlight %}


### 시간 복잡도

O($$ \mathrm{N} $$)

### 설명

이중 팰린드롬을 판별하는 문제이다. 

주어진 자료의 크기 상 O($$ \mathrm{N}^2 $$) 는 TLE 가 나므로 Manacher 알고리즘을 요구하고 있다. 그러면 Manacher 알고리즘을 통해 알게된 정보로 어떻게 2중 팰린드롬을 판별할 수 있을까? 이는 Manacher 알고리즘에서 사용된 팰린드롬의 대칭성을 사용하면 간단하게 구할 수 있다.

우선 이중 팰린드롬도 팰린드롬임을 이용해야한다. 부분 문자열 $$AA^R$$ 가 팰린드롬이라면 이는 이중 팰린드롬의 후보가 된다. 이러한 $$AA^R$$ 가 이중 팰린드롬이 되기 위해선 $$A$$ 가 $$CBB^R$$ ( $$C$$ 는 길이가 0 이상, $$B$$ 는 길이가 1 이상) 꼴이 되어야한다. 다시말해 후보 문자열이 $$CBB^RBB^RC^R$$ 꼴이 되는지 체크를 해야한다.

체크하는 방법은 앞쪽이 $$CBB^R$$ 임을 확인했다면 반대쪽은 팰린드롬의 대칭성으로 $$BB^RC^R$$ 이 보장됨을 이용한다. 우선 후보 팰린드롬의 중앙에서 앞(혹은 뒷)부분으로 몇칸 떨어진 부분에서 중심이 되는 팰린드롬을 살펴본다. 만약 이 팰린드롬의 길이가 중앙 팰린드롬의 반지름을 넘긴다면, 이 팰린드롬 역시 중앙 팰린드롬의 일부이므로 대칭성을 통해, 이중 팰린드롬이 성립하게 되는 것이다.
+ 예를들어 ```bbaab/baaba``` 같은 경우가 반지름을 넘기게 되는 경우다. 슬래쉬를 기준으로 반지름 4 인 팰린드롬이 있고 맨 앞에 ```bba/abb``` 로 길이가 3인 팰린드롬이 있다. 

이때 $$B$$ 길이를 1부터 $$\vert A \vert $$ 까지 체크하게된다면 TLE 가 나게 된다.
+ 이중 팰린드롬이 성립하려면 중심으로 부터 $$\vert A \vert / 2$$ 보다 멀리 떨어질 수 없다. 만약 더 커지만 기존 팰린드롬의 길이와 모순이 발생한다.
+ 우리는 최댓값만 필요하므로, 기존의 최댓값부터 계산하면 된다.

위 두 조건을 통해 우리는 1부터 가능한 최댓값까지 최대 한번 업데이트를 하게 되므로 선형시간이 보장된다.

#### 다른 풀이

Plain Sweeping 방법을 써서 ($$ \mathrm{N} \log(\mathrm{N}) $$) 시간 내에 풀 수도 있긴 한데, 구현에 따라 시간초과가 날 가능성이 크다. 풀이는 [여기](http://www.secmem.org/blog/2019/03/10/Manacher/) 를 참고하자.