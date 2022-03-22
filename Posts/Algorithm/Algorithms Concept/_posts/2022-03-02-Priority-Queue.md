---
excerpt: "우선순위 큐"
categories: Algorithm
tag: [PS. Data Structure]
use_math: true
---

## Priority Queue


<details> 
<summary>코드</summary> 

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

</details>



## Key Priority Queue

<details> 
<summary>코드</summary> 

{% highlight c++ %}

template<typename T, size_t Size>
struct PQ
{
	struct Key { T v; struct PQ<T, Size>::Node* p; };
	struct Node
	{
		bool operator<(const Node& in) const { return key->v < in.key->v; }  // max first
		Key* key;
	};
	Node heap[Size];
	Key keys[Size];
	int end = 1;

	inline bool Empty() const { return end <= 1; }
	inline T Top() const { return heap[end - 1].key->v; }
	inline int TopKey() const { return heap[1].key - keys; }
	
	inline void Swap(int a, int b)
	{
		swap(heap[a], heap[b]);
		heap[a].key->p = &heap[a];  // swap 마다 heap 내 위치를 유지
		heap[b].key->p = &heap[b];
	}
	
	void IncreaseKey(const Key& key)  // bubble this key up 
	{
		if (key.p - heap >= end) return;
		int cur = key.p - heap, next = cur >> 1;
		while (next && heap[next] < heap[cur])
		{
			Swap(cur, next);
			cur = next, next >>= 1;
		}
	}
	
	void Push(const T& in)
	{
		heap[end].key = &keys[end];
		keys[end].v = in;
		keys[end].p = &heap[end]; end++;
		int cur = end - 1, next = cur >> 1;
		while (next && heap[next] < heap[cur])
		{
			Swap(cur, next);
			cur = next, next >>= 1;
		}
	}
	
	T Pop()
	{
		if (end <= 1) return {};
	
		Key* res = heap[1].key;
		heap[1].key = heap[--end].key;
		int cur = 1, next = cur << 1;
		while (next < end)
		{
			if (next + 1 < end && heap[next] < heap[next + 1]) next++;
			if (heap[next] < heap[cur]) break;
			Swap(cur, next);
			cur = next, next <<= 1;
		}
		return res->v;
	}
};

{% endhighlight c++ %}

</details>

<br/>

Heap 내의 요소의 위치를 바로 알 수 있게 해주는 자료구조.
+ Priority Queue 에서 정적인 배열 ```keys[]``` 가 있고
+ 이에 대한 포인터로 heap 을 운용하며
+ 이때 ```keys[]``` 는 ```heap[]``` 내의 포인터를 가져서 위치에 바로 접근하게 함.

```IncreaseKey()``` 가 핵심 기능으로
+ ```Key``` 를 외부에서 변화시킨 후
+ 이 함수를 호출해서 heap 내부의 위치를 조정함
+ 우선순위를 높히는 것이 주로 쓰이며, 반대방향은 ```Pop()``` 을 본따 구현하면 됨
