---
excerpt: "우선순위 큐"
categories: Algorithm
tag: [PS. UnionFind, PS. DFS]
use_math: true
---

## 우선순위 큐

### 코드

{% highlight c++ %}

template<typename T, size_t Size>
struct PQ
{
	struct Node
	{
		friend bool operator<(const T& l, const Node& r) { return l < r.v; } // max first
		bool operator<(const Node& in) { return v < in; }
		T v;
	};
	Node heap[Size];
	int end = 1;

	void Push(const T& in)
	{
		heap[end++].v = in;
		int cur = end - 1, next = cur >> 1;
		while (next && heap[next] < heap[cur])
		{
			swap(heap[next], heap[cur]);
			cur = next, next >>= 1;
		}		
	}

	T Pop()
	{
		if (end <= 1) return {};

		T res = heap[1].v;
		heap[1].v = heap[--end].v;
		int cur = 1, next = cur << 1;
		while (next < end)
		{
			if (next+1 < end && heap[next] < heap[next+1]) next++;
			if (heap[next] < heap[cur]) break;
			swap(heap[cur], heap[next]);
			cur = next, next <<= 1;
		}
		return res;
	}
};

{% endhighlight c++ %}

### 설명

혹시 쓸지 몰라서 저장함




