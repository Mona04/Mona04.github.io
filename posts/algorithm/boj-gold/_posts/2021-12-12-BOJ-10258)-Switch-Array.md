---
excerpt: "발상이 어려운 문제"
tag: [PS. 능지]
use_math: true
---
## 문제

[문제 사이트](https://www.acmicpc.net/problem/10258)

### 코드

{% highlight c++ %}

using INT = int64_t;

int main()
{
	fastio;

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

### 시간 복잡도

O(자리수=32)

### 설명

BruteForce 로 풀면 Log(2^n) 이 걸려서 시간초과가 걸림.

따라서 규칙을 찾아야함.

한번 ```1000``` 이 어떻게 되는지 확인해보자.

```
1000 => 1001 => 1011 => 1010 => 1110 => 1111 => 1101 => 1100 =>
0100 => 0101 => 0111 => 0110 => 
0010 => 0011 =>
0001 =>
0000
```

여기서 우리가 볼 수 있는 것은 __1로 시작하는 조합__ 이 맨 처음에 몰빵되어 있다는 것임.
+ ```1000 ~ 1111``` 까지 확인할 수 있음.
+ 그러면 Input 값이 저 사이의 값일텐데, 그 사이의 정확히 무엇인지 어떻게 알 수 있을까?
+ 위 예시를 보면 Input => ```1000``` 로 가는건   __처음 외의 나머지 수가 0 으로__ 가는 것과 같음
+ 즉 ```1010``` 을 구한다면 ```1000의 경로 - 10의 경로``` 가 되는 것임.
+ 만약 1이 여러개가 있다면 1로 쌍을 구해서 위처럼 서로 빼주면 될 것임

```1000``` 은 4자리 수로 0 까지 가는데 ```2^4-1``` 가 걸림
  + 1 로 시작하는 n자리 수는 ```2^n-1``` 가 걸릴 것임

위에서 생각한 2가지 아이디어를 조합해 낮은자리부터 1이 나올 때마다 더했다 빼줬다를 반복해주면 됨.