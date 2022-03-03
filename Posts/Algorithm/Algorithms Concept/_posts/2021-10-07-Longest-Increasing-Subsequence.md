---
excerpt: "LIS 를 푸는 3가지 방법"
categories: Algorithm
tag: [PS. LIS, PS. DP, PS. Segment Tree]
use_math: true
---

## 개요

최장 증가 부분수열은 자주 나오는 문제고 비슷한 문제가 이걸로 쉽게 환원이 되어 Well Known Problem 중 하나임.

푸는 방법이 크게 3가지로, 하나는 DP 이고 하나는 Binary Search 를 응용한 방법, 다른 하나는 Segment Tree 를 응용한 방법임.


## DP

#### 문제

[가장 긴 증가하는 부분 수열](https://www.acmicpc.net/problem/11053)

### 코드

{% highlight c++ %}

int inputs[1001];
pair<int, int> dp[1002]; // total_v, max_v

int main()
{
	int n;
	cin >> n;
	for (int i = 0; i < n; i++) cin >> inputs[i];
	for (int i = 0; i < n; i++) 
	{
		for (int j = 0; j < 1002; j++)
		{
			if (inputs[i] >= j) continue; 

			if (dp[j].first < inputs[i]) // 마지막수보다 큰 수가 나오면 그냥 더해줌
			{
				dp[j].first = inputs[i];
				dp[j].second++;
			}
			else if (dp[j].second <= dp[inputs[i]].second + 1)
			{
				dp[j].first = inputs[i];
				dp[j].second = dp[inputs[i]].second + 1;
			}
		}
	}
	
	cout << dp[1001].second;
}

{% endhighlight %}

#### 시간 복잡도

O($$NM$$)

### 설명

dp 에는 등록한 최소수와 누적합을 쌍으로 둬서 배열로 만듬.  
+ ```dp[i]``` 는 ```i``` 보다 작은 수로만 업데이트됨.
+ ```dp[i].first``` 는 이루는 수열의 가장 끝부분이 들어가게 됨
+ ```dp[i].second``` 는 이루는 수열의 길이가 들어가게 됨

for 문을 두개 돌려서 첫째는 __Input 을 하나씩 적용__ 하고, 두번째는 __가능한 숫자 범위를 하나씩 적용함__ .
+ ```dp[i].first``` 가 현재 input 보다 크면 그냥 배열에 추가하면 됨
+ 아니면 ```dp[input]``` 를 이용함
  +  ```input``` 값 보다 작은 값으만 이루어진 수열이라 Input 값이 바로 적용됨
  + ```dp[5]``` 가 예를들어 ```1, 2, 4``` 이면 여기에 바로 ```5``` 를 적용해 ```1, 2, 4, 5``` 를 만들 수 있기 때문임.   

시간이 오래걸리나 다양한 문제에 적용할 수 있는 장점이 있음



## Binary Search

#### 문제

[가장 긴 증가하는 부분 수열 5](https://www.acmicpc.net/problem/14003) 

### 코드

{% highlight c++ %}

#define MAX_LINE 1000001
int inputs[MAX_LINE], indices[MAX_LINE];
int lis[MAX_LINE], cnt = 0;
int ans[MAX_LINE];

int main()
{
	int n;
	cin >> n;

	// LIS 업데이트
	for (int i = 0; i < n; i++) cin >> inputs[i];
	for (int i = 0; i < n; i++)
	{
		int * p;
		p = lower_bound(lis, lis + cnt, inputs[i]);
		*p = inputs[i];
		if (p - lis == cnt) cnt++;
		indices[i] = p - lis;
	}
	for (int i = n-1, p = cnt -1; i >= 0; i--)
		if (indices[i] == p)
			ans[p--] = inputs[i];
	
	cout << cnt << '\n';
	for (int i = 0; i < cnt; i++)
		cout << ans[i] << ' ';
}

{% endhighlight %}

#### 시간 복잡도

O(nLogN)

### 설명

#### 길이 구하기

우선 LIS 라는 순열을 저장할 배열을 만듬.
+ 이 배열에 input 값을 넣는데,  __binary search__ 를 이용해 적당한 위치에 넣게 함.
+ 그러면 __LIS 배열의 크기는 최대 증가 부분수열이 길이가 됨__ .

#### 값 추적하기

LIS 배열에는 우리가 원하는 값이 들어있을 수 없음
+ ```2 3 1 4``` 이 왔다면 LIS 가 ```1 3 4``` 가 들어있어 ```2 3 4``` 와 다름

위와 같이 LIS 가 오염되는 경우는 LIS 가 중간에 업데이트 되는 경우임
+ 이를 LIS 의 Index 로 나타내면 ```0 1 0 2``` 가 됨.
+ 이는 뒤에서부터 차례대로 __LIS 의 Index 가 줄어드는 대로__ 가져오면 해결됨.
+ 이때 가장 최신값을 사용해야하는데, 가장 최신 값을 바탕으로 LIS 가 작성되기 때문임.



## Segment Tree

### 코드

{% highlight c++ %}


{% endhighlight %}

### 시간 복잡도

asdf

