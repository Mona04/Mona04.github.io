---
excerpt: "LIS 를 푸는 3가지 방법"
categories: Algorithm
tag: [PS. LIS, PS. DP, PS. Segment Tree]
use_math: true
---
## 개요

최장 증가 부분수열은 자주 나오는 문제고 비슷한 문제가 이걸로 쉽게 환원이 되어 Well Known Problem 이라고 풀이방법을 많이 외우고 있음.

푸는 방법이 크게 3가지로, 하나는 DP 이고 하나는 Binary Search 를 응용한 방법, 다른 하나는 Segment Tree 를 응용한 방법임.

가장 긴 증가 부분 수열을 __증가 -> 감소__ , __긴 -> 큰__ 으로 변형한 [가장 큰 감소 부분 수열](https://www.acmicpc.net/problem/17216)  문제를 기반으로 설명하겠음.


## DP

이 방법은 다른 변형에 쉽게 적용가능하다는 특징이 있음.

DP 용 cache 에는 cache 에 등록한 최소수와 누적합을 쌍으로 둬서 배열로 만듬. 그리고 __배열 인덱스 이하의 수만 cache 에 적용__시킴.

그리고 for 문을 두개 돌려서 첫째는 __Input Data 를 하나씩 적용__ 하고, 두번째는 __현 인덱스 이하의 수만 넣음__ .

Gridy 전략으로 각 cache에는 그 cache의 인덱스 이하의 수만 들어가게됨. 

만약 이번에 적용시키는 값이 cache 에 적용한 최소 수보다 크게 되면, 이 값이 적용될 수 있는 cache 와 현 cache 를 비교해서 최댓값을 적용시킴. 

### 코드

{% highlight c++ %}

int inputs[1001];
pair<int, int> cache[1002]; // total_v, max_v

int main()
{
	fastio;

	int n; 
	cin >> n;
	for (int i = 0; i < n; i++) cin >> inputs[i];

	for (int i = n-1; i >= 0; i--) // 아래 포문과 방향만 같으면 됨.
	{
		for (int j = 1001; j > 0; j--)
		{
			if (inputs[i] < j)
			{
				if(cache[j].second < inputs[i])
				{
					cache[j].first = cache[j].first + inputs[i];
					cache[j].second = inputs[i];
				}
				else if(cache[j].first <= cache[inputs[i]].first + inputs[i]){
					cache[j].first = cache[inputs[i]].first + inputs[i];
					cache[j].second = inputs[i];
				}

			}
		}
	}

	cout << cache[1000].first;
}
{% endhighlight %}

### 시간 복잡도

O(n^2)


## Binary Search

### 길이 구하기 <br/>

접근은 되게 간단한데 변형 문제를 풀게되면 머리가 아픔.

우선 LIS 라는 순열을 저장할 배열을 만듬.

이 배열에 input 값을 하나씩 넣는데,  __binary search__ 를 이용해 적당한 위치에 넣게 함.

그러면 __LIS 배열의 크기는 최대 증가 부분수열이 길이가 됨__ .

### 값 추적하기 <br/>

LIS 배열의 값이 실제 정답이 되는 값은 아니라서 이를 위해선 추적용 자료구조가 필요함.

각 input 의 값에 대해서 binary search 로 찾은 LIS 배열 내의 적절한 위치를 __index__ 라고 하면, __index__ 별로 container 를 만들어서 input 값을 저장함.

추적하는 방법은 다음과 같음.

수열의 길이의 끝에 해당되는 index 에 해당되는 container 에서부터 값을 찾고, 다음 index 의 container 에서는 이전의 찾은 값에 대해서 __조건(대소관계 등)에 해당되는 값__ 을 선택함. 이걸 반복함.

( 이때 아래 코드에서는 container 에서 __조건에 해당되는 값__ 중에선 __가장 나중에 추가된 값__ 이 이전 값에서 연결되는 값이 됨. idx 조건 때문에 이후에 추가되는 것들 중 안맞는게 사라지고, 조건에 맞는 것 중에선 가장 최신에 갱신된 값을 기준으로 LIS 가 계속 업데이트 되었기 때문. 이런건 문제마다 다름. ) 

이렇게 값을 추적하는 것은 O(n) 에 끝남.


### 코드

{% highlight c++ %}
#define MAX_LINE 1001
int lines[MAX_LINE];
vector<int> lis;
struct TRACK { int val, idx; };
unordered_map<int, vector<TRACK>> index_map;

unordered_map<int, int> cache[MAX_LINE];  // before_idx->max_value
int DFS(int cur, const TRACK& before, int sum = 0)
{
	if (cur == -1) return sum;
	
	if (cache[cur].find(before.idx) != cache[cur].end())
		return cache[cur][before.idx] + sum;

	TRACK local_max = { 0, 0 };
	for (auto c : index_map[cur])
		if (c.val > before.val && c.idx < before.idx)
			local_max = c;
	 
	int r = 0;
	r = DFS(cur - 1, local_max, sum + local_max.val);
	r = max(r, DFS(cur - 1, before, sum));

	cache[cur][before.idx] = r - sum;

	return r;
}

int main()
{
	int n;
	cin >> n;

	for (int i = 0; i < n; i++)
		cin >> lines[i];

	// LIS 업데이트
	for (int i = 0; i < n; i++)
	{
		auto p = lower_bound(lis.begin(), lis.end(), lines[i], [](int a, int b) { return a > b; });
		index_map[p - lis.begin()].push_back({ lines[i], i });
		if (p == lis.end()) lis.push_back(lines[i]);
		else *p = lines[i];
	}
	
	// 값 추적해서 최댓값 구하기
	DFS(index_map.size() - 1, {0, (int)1e8});

	cout << cache[index_map.size()-1].begin()->second;
}
{% endhighlight %}

### 시간 복잡도

O(nLogN)

## Segment Tree

### 코드

{% highlight c++ %}


{% endhighlight %}

### 시간 복잡도

asdf

