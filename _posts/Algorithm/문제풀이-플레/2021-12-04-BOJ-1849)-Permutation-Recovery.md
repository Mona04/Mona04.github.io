---
excerpt: "간단한 응용문제"
categories: Algorithm
tag: [PS. Segment Tree]
use_math: true
---
## 문제

[문제 사이트](https://www.acmicpc.net/problem/1849)

### 코드

{% highlight c++ %}

template<typename T, size_t _Size>
class SegmentTree
{
	template<typename F>
	struct Node {
		Node() : v(0) {}
		Node(F v) : v(v) {}
		Node operator+(const Node& in) { return v + in.v; }
		F v = 0;
	};
public:
	void Init(int s, int e) { _s = s; _e = e; }
	void Update(int i) { _t1 = i; Update_Recursive(1, _s, _e); }
	int Query(T x) { return Query_Recursive(x, 1, _s, _e); }

private:
	void Update_Recursive(int x, int s, int e)
	{
		if (s == e && s == _t1) { nodes[x] = op(); return; }
		int m = (s + e) / 2;
		if (_t1 <= m) Update_Recursive(2 * x, s, m);
		else Update_Recursive(2 * x + 1, m + 1, e);
		nodes[x] = nodes[2 * x] + nodes[2 * x + 1];
	}

	int Query_Recursive(T v, int x, int s, int e)
	{
		int m = (s + e) / 2;
		T left = nodes[x * 2].v;
		if (v <= left) return Query_Recursive(v, x * 2, s, m);
		else if (v - left <= nodes[x * 2 + 1].v) return Query_Recursive(v - left, x * 2 + 1, m + 1, e);
		return e;
	}

public:
	Node<T> nodes[_Size * 4];
	int _s, _e, _t1;
	function<T()> op;
};

SegmentTree<int, 1048576> seg;

int main()
{
	int n, t, arr[100001];
	cin >> n;
	
	seg.Init(1, n); seg.op = []() {return 1; };
	for (int i = 1; i <= n; i++) seg.Update(i);
	
	seg.op = []() {return 0; };
	for (int i = 1; i <= n; i++)
	{
		cin >> t;
		t = seg.Query(t+1);
		arr[t - 1] = i;
		seg.Update(t);
	}
	
	for (int i = 0; i < n; i++)
		cout << arr[i] << '\n';
}

{% endhighlight %}

### 시간 복잡도

O(n*Log(n))

### 설명

오름차순으로 순열을 채우고, ```i``` 번째 순열 값이 ```t``` 라고 하자.

```t``` 개의 빈자리 이후에 ```i``` 를 넣으면 됨.
+ 왜냐하면 ```i``` 보다 큰 값이 ```t``` 개가 이전에 와야하는데, 이후에 채울 값은 ```i+1``` 로 더 큰 값이므로, 딱 ```t``` 개의 공간만 앞에 남기면 되기 때문임.
+ 그러면 이 공간은 ```i``` 보다 크게 될 이후의 값들이 채우게 될 것임.

문제는 빈공간이 앞에 몇개 남았는지 세는 것인데, 이를 Segment Tree 로 해결하면 됨.
