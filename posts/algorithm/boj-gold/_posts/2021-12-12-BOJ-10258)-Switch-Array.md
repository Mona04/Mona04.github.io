---
excerpt: "백준 10258. 발상이 어려운 문제"
tag: [PS. Inclusion and Exclusion]
use_math: true
---
## 문제

[백준 10258](https://www.acmicpc.net/problem/10258)


### 설명

BruteForce 로 풀면 Log(2^n) 이 걸려서 TLE 가 된다. 따라서 규칙을 찾아야한다.

한번 ```1000``` 이 어떻게 되는지 확인해보자.

```
1000 => (1001) => (1011 => 1010) => (1110 => 1111 => 1101 => 1100) =>
0100 => (0101) => (0111 => 0110) => 
0010 => (0011) =>
0001 =>
0000
```

여기서 우리는 1이 오직 하나인 경우에 특별한 규칙이 있다는 것을 알 수 있다.
+ 편의상 ```n``` 번째 자리수만 ```1``` 인 경우를 $$a_n$$ 이라고 하자.
+ 첫번째는 $$a_n$$ 이 ```0``` 으로 가는 경로에 $$a_{n-1}, a_{n-2}, ... \ a_0 $$ 이 있다는 것이다.
+ 두번째는 $$a_n \rightarrow a_{n-1}$$ 의 경로에도 $$a_{n-1}, a_{n-2}, ... \ a_0 $$ 이 있다는 것이다.
+ 세번째는 $$a_n \rightarrow 0$$ 까지의 경로는 $$2^n-1$$ 이다.

이를 이용해 포함 배제의 원리로 문제를 해결할 수 있다.

높은자리부터 1이 나올 때마다 $$a_{th} \rightarrow 0$$ 까지의 경로의 수를 더했다 빼줬다 반복해주면 된다.


### 시간 복잡도

O(자리수=32)


### 코드

{% highlight c++ %}

using INT = int64_t;

int main()
{
	int t;
	scanf("%d\n", &t);
	while (t--)
	{
		char tmp; 
		deque<bool> cur;

		while (1)
		{
			scanf("%c", &tmp);
			if (tmp == '\n') break;
			cur.push_back(tmp == '1');
		}

		INT ans = 0;
		bool bToggle = true;
		for (int i = 0; i < cur.size(); i++)
		{
			if (cur[i])
			{
				if(bToggle) ans += (1 << cur.size() - i) - 1;
				else ans -= (1 << cur.size() - i) - 1;
				bToggle = !bToggle;
			}
		}

		cout << ans << '\n';
	}
}

{% endhighlight %}

