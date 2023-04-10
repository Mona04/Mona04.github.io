---
excerpt: "Suffix Array and Longest Common Prefix Array"
tag: [PS. String, PS. suffix/lcp array]
use_math: true
---

## Suffix Array

[Wiki](https://en.wikipedia.org/wiki/Suffix_array) 에 기본적인 사항들이 잘 정리되어 있다. 용도가 많아서 개발도 활발하고 개선에 따라 여러 버전이 있어 내용이 많지만, PS 용으로는 오리지널 버전이 기본적으로 사용된다.

공간복잡도는 배열이 길이만 생각하면 O($$\mathrm{N}$$) 으로 선형이다. 하지만 비트단위로 들어가면 O($$\mathrm{N}\log{\mathrm{N}}$$) 으로 텍스트 크기인 O($$\mathrm{N}\log{\alpha}$$) 보다 같거나 크다. ($$\alpha$$ 는 ```char``` 의 크기이고 $$\mathrm{N}$$ 을 텍스트 길이). Suffix Array 가 저장하는 정보는 텍스트의 시작 인덱스이기 때문에 텍스트가 매우 길면 로그단위로 공간을 더 잡아먹기 때문이다.

Suffix Array 구축에 대한 시간복잡도는 구현에 따라 다르다. 많이 알려진 SA-IS Algorithms 은 O($$\mathrm{N}$$) 으로 끝낼 수 있고, 글쓰는 현 시점에서 상용되는 Yuta Mori 의 알고리즘도 마찬가지이다. PS 에서 주로쓰는 Manber-Myers Algorithms 는 시간복잡도가 O($$\mathrm{N}\log{\mathrm{N}}$$) 이다.

### Manber-Myers Algorithms

#### 직관적인 버전과 대략적 설명

<details>
<summary>Code</summary>

{% highlight c++ %}

template<int SIZE = 500001>
struct SuffixArray
{
	string src; int len = -1;
	int sa[SIZE], rk[SIZE], rk_tmp[SIZE];
	int o = 1;

	inline bool Cmp(int a, int b)
	{
		if (rk[a] != rk[b]) return rk[a] < rk[b];
		if (a + o >= len || b + o >= len)
			return a + o > b + o;      // 초과하는 Suffix 가 앞쪽에 오도록
		return  rk[a + o] < rk[b + o];   
	}
	
	void Init()
	{
		len = src.size();
		for (int i = 0; i < len; i++) { sa[i] = i; rk[i] = src[i]; }
	
		//Manber-Myers Algorithms
		for (o = 1; o < len; o <<= 1)
		{
			// Quick Sort
			sort(sa, sa + len, bind(&SuffixArray::Cmp, this, placeholders::_1, placeholders::_2));
			
			// Regrouping
			rk_tmp[sa[0]] = 0;
			for (int i = 1; i < len; i++)
				rk_tmp[sa[i]] = Cmp(sa[i-1], sa[i]) ? rk_tmp[sa[i - 1]]+1 : rk_tmp[sa[i - 1]];
			swap(rk_tmp, rk);
		}
	}
};

{% endhighlight %}

</details>

<details>
<summary>설명</summary>
<div markdown="1">
<br/>
총 $$\log{\mathrm{N}}$$ 번 정렬을 하고 퀵소트를 사용해서 O($$\mathrm{N}\log{\mathrm{N}}^2$$) 의 시간복잡도가 된다. 그래서 계수정렬 버전보단 느리지만 간단해서 먼저 소개한다. 

##### 배열

핵심적인 배열이 두개가 존재한다.
+ ```sa[]``` 는 Suffix Array 의 약자로, Suffix 자체가 들어가진 않고 Suffix 가 시작하는 인덱스가 들어간다. "banana" 에서  ```sa[2] = 4``` 라면 ```2``` 번째 Suffix 가 "na" 라는 뜻이 된다.
+  ```rk[]```는 Rank 의 약자로, ```sa[]``` 의 역배열(역함수와 비슷한 개념)이다. ```rk[4] = 2``` 라면 Suffix ```"na"``` 가 ```sa[]``` 에서 2번째에 있다는 뜻이 된다.

##### 분할정복

```sa[]``` 에 Suffix 를 넣었으므로 이제 정렬을 해야한다. 먼저 Suffix 의 첫번째 문자를 이용해서 ```rk[]``` 를 채운다. 그리고 분할정복의 방식을 이용해 $$\log{\mathrm{N}}$$ 번 정렬을 반복한다. 원리는 기본적으로 자신의 ```rk[]``` 순서대로 ```sa[]``` 를 정렬하되, 만약 ```rk[]``` 가 같으면 2의 지수승 뒤의 ```rk[]``` 를 사용해 비교하는 것이다. 즉 루프마다 1, 2, 4, 8 등의 뒤의 ```rk[]``` 를 보는 것이다.

왜 이것이 가능한지는 수학적 귀납법으로 간단히 보일 수 있다. Suffix 의 첫번째 문자와 2의 제곱수인 ```o``` 번째 뒤의 문자를 사용해서 ```rk[]``` 를 구성해두었다고 하자. 그리고 다음 루프에서 ```rk[i]``` 와 ```rk[j]``` 를 비교한다고 하자.
+ ```rk[i] != rk[j]``` 인 경우 이미 비교가 끝난 대상이다. 
+ ```rk[i] == rk[j]``` 의 경우 전제에 의해 Suffix 의 ```o/2``` 번째 문자까지는 서로 같은 상황이다. 그리고 지금 ```o``` 번째 문자까지 고려해서 비교를 해야한다. 그런데 ```rk[i+o]``` 는 그것의 ```o/2``` 번째 문자까지 비교가 마친 상황이고, 이 범위는 ```rk[i]``` 에 해당되는 Suffix 의 ```o/2``` 부터 ```o``` 번째의 문자에 해당된다. 이는 ```rk[j+o]``` 도 마찬가지이다. 그러므로 ```rk[i+o] < rk[j+o]``` 를 수행해도 지장이 없다.


##### Suffix Array 출력

{% highlight c++ %}
void Print()
{
	cout << endl;
	for (int i = 0; i < len; i++)
		cout << src.substr(sa[i], len - sa[i]) << endl;
}
{% endhighlight %}



</div></details>


#### 계수정렬 버전

<details>
<summary>Code</summary>

{% highlight c++ %}

template<int SIZE = 500002, int CSIZE = 26>
struct SuffixArray
{
	string src; int len = -1;
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
		int m = max(rk[sa[len - 1]] + 1, CSIZE)+1;
		fill(cnt, cnt + m, 0);
		for (int i = 0; i < len; i++) cnt[i + o < len ? rk[i + o]+1 : 0]++;
		for (int i = 1; i <= m; i++) cnt[i] += cnt[i - 1];
		for (int i = len-1; i >= 0; i--) tmp[--cnt[i + o < len ? rk[i + o]+1 : 0]] = i;
	
		fill(cnt, cnt + m, 0);
		for (int i = 0; i < len; i++) cnt[rk[i]]++;
		for (int i = 1; i < m; i++) cnt[i] += cnt[i - 1];
		for (int i = len - 1; i >= 0; i--) sa[--cnt[rk[tmp[i]]]] = tmp[i];
	}
	
	void Init()
	{
		len = src.size();
		int p, i;
	
		//Manber-Myers Algorithms
		for (i = 0; i < len; i++) rk[i] = src[i] - 'a';
		for (p = 0, o = 1; p+1 < len; o <<= 1)
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


{% endhighlight %}

</details>

<details>
<summary>설명</summary>
<div markdown="1">
<br/>

총 $$\log{\mathrm{N}}$$ 번 계수정렬을 하므로 O($$\mathrm{N}\log{\mathrm{N}}$$) 의 시간복잡도가 된다. 

계수정렬은 총 2부분으로 나뉜다.
+ Suffix 에서 ```o``` 만큼 떨어진 Suffix 에 대한 Counting Sort. 
  + ```rk[i+o]``` 가 일어나는 빈도를 구하고 누적합을 수행한다. 그러면 ```cnt[i]``` 에는 Rank 가 ```i+o``` 인 Suffix 가 최대 몇번째의 ```sa[]``` 인지가 저장된다.
  + Count Sort 의 나머지 과정을 수행한다. ```tmp[]``` 에는 __시작 위치가 ```i+o``` 인 Suffix 의 Rank 순__ 으로 ```i```(Suffix 의 시작 인덱스)가 저장된다.
  + 이때 주의할 부분이 ```i+o>=len``` 의 경우로, 이땐 다른 경우보다 앞에 와야하므로 ```0``` 이 되도록 하고, 나머지는 한칸을 미뤄쓰도록 했다.

+ 시작위치가 ```i+o``` 인 Suffix 의 Rank 순서를 고려한 Counting Sort
  + 기존 ```rk[]``` 에 대해 위와 똑같이 수행한다. 단 이번에는 같은 Rank 끼리 순서가 중요하다. 이 순서는 위에서 구한 ```tmp[]``` 에 의해 결정이 된다. 
  + ```tmp[]``` 에서 뒤에오는게 나중에 와야하므로 꼭 뒤에서부터 세줘야한다.

중간에 Rank 의 서로다른 갯수가 src 문자열의 길이와 같아지면 더 정렬을 할 필요가 없으므로 ```for``` 문 탈출과정에 이를 반영시켰다. 정렬 하나하나가 오래걸려서 이 최적화가 성능을 상당히 많이 올려주므로 꼭 넣자.

</div></details>


### SA-IS Algorithms

[볼거](https://zork.net/~st/jottings/sais.html)


## LCP Array

위에서 구한 Suffix Array 의 Longest Common Prefix 를 계산해두면 Suffix Array 로 Suffix Tree 와 같은 문제를 풀 수 있다. 이를 구하는 방법은 많이 있지만 PS 에서 자주 사용되는 알고리즘이 Kasai Algorithms 이다.


### Kasai Algorithms

<details>
<summary>Code</summary>

{% highlight c++ %}

...
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

{% endhighlight %}

</details>

<details>
<summary>설명</summary>
<div markdown="1">
<br/>

```lcp[]``` 는  ```sa[i]``` 와 ```sa[i-1]``` 간의 LCP 를 저장한다. 

작동하는 방식은 다음과 같다. 먼저 가장 긴 Suffix 부터 계산해서 그것의 LCP 를 구한다. 이 값을 ```A``` 라고 하자. 만약 ```A``` 가 0 보다 크다면 그것보다 바로 다음으로 긴 Suffix 는 ```A-1``` 보다 같거나 크다. 이를 고려해 다음 문자열 비교는 ```max(A-1, 0)``` 번째 문자부터 수행한다.

 이해를 돕기위해 예를들어 ```"abcabbc"``` 에서 Suffix Array 를 구하면 다음과 같다.

```
abbc
abcabbc
bbc
bc
bcabbc
c
cabbc
```

여기서 처음 구한 ```A``` 은 ```"abcabbc"``` 와 ```"abbc"``` 의 공통부분인 ```len("ab")``` 가 된다. 그런데 전 Suffix 의 앞글자만 뺀 ```"bcabbc"``` 와 ```"bbc"``` 도 Suffix 이다. 그래서 다음 순서인 ```"bcabbc"``` 의 LCP 는 ```len("ab")-1``` 보다 무조건 같거나 크다. 이 예제에는 그 사이에 다른 Suffix 가 있어서 LCP 가 이보다 더 긴 ```len("bc")``` 가 된다.

이러한 LCP 값을 추적하는 ```num``` 은 최고 $$2\mathrm{N}$$ 을 넘어서 증가 감소할 수 없으므로 시간복잡도는 O($$\mathrm{N}$$) 이 된다.

</div></details>


<br/>