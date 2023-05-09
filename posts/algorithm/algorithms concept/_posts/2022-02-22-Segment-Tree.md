---
excerpt: "매우 많은 종류가 있는 세그트리 공부하는대로 정리"
tag: [PS. Segment Tree]
use_math: true
---

## Segment Tree

### Top-Down

#### 코드 

{% highlight c++ %}

template<typename T, size_t _H>
class SegmentTree
{
	template<typename F>
	struct Node {
		Node() {}
		Node(F v) : v(v) {}
		F operator+(const Node& in) { return v + in.v; }
		F v = 0;
	};
public:
	void Init() { for (int i = INDEX_MAX - 1; i > 0; i--) nodes[i] = nodes[i << 1] + nodes[i << 1 | 1];}
	void Update(int i, T v) { assert(i <= INDEX_MAX); _t1 = i; _t3 = v; Update_Recursive(1, 1, INDEX_MAX); }
	Node<T> Query(int l, int r) { assert(r <= INDEX_MAX); _t1 = l; _t2 = r; return Query_Recursive(1, 1, INDEX_MAX); }

private:
	void Update_Recursive(int x, int s, int e)
	{
		if (s == e && s == _t1) {
			nodes[x] = T(_t3);
			return;
		}

		int m = (s + e) / 2;
		if (_t1 <= m) Update_Recursive(2 * x, s, m);
		else Update_Recursive(2 * x + 1, m + 1, e);
		nodes[x] = nodes[2 * x] + nodes[2 * x + 1];
	}
	
	Node<T> Query_Recursive(int x, int s, int e)
	{
		if (_t2 < s || e < _t1) return T();
		if (_t1 <= s && e <= _t2) return nodes[x];
		int m = (s + e) / 2;
		return Query_Recursive(x * 2, s, m) + Query_Recursive(x * 2 + 1, m + 1, e);
	}

public:
	Node<T> nodes[1 << _H];
	int INDEX_MAX = 1 << _H - 1;
	int _t1, _t2;
	T _t3;
};

{% endhighlight %}

#### 설명

계산 편의를 위해 ```0``` 번 노드는 사용하지 않음
+ ```1``` 번 노드가 기본적으로 루트임.

초기값은 ```nodes``` 에 직접넣고 ```Init()``` 으로 처리하면 빠름.
+ 이후에도 적용됨.

```INDEX_MAX``` 는 첫번째 리프노드의 위치를 의미함.


### Bottom-Up

#### 코드
{% highlight c++ %}

template<typename T, size_t _H>
class SegmentTree
{
	template<typename F>
	struct Node {
		Node() {}
		Node(F v) : v(v) {}
		F operator+(const Node& in) { return v + in.v; }
		F v = 0;
	};

public:
	void Init() { for (int i = INDEX_MAX - 1; i > 0; i--) nodes[i] = nodes[i << 1] + nodes[i << 1 | 1]; }
	
	void Update(int i, const T& v) {
		for (i += INDEX_MAX - 1, nodes[i] = v; i > 1; i >>= 1)
			nodes[i >> 1].v = nodes[i] + nodes[i ^ 1];
	}
	
	Node<T> Query(int l, int r) {
		T rs = T();
		for (r += INDEX_MAX - 1, l += INDEX_MAX - 1; l <= r; r >>= 1, l >>= 1)
		{
			if (l & 1) rs = nodes[l++] + rs;
			if (!(r & 1)) rs = nodes[r--] + rs;
		}
		return rs;
	}
	
	Node<T> nodes[1 << _H];
	int INDEX_MAX = 1 << _H - 1;
};

{% endhighlight %}

#### 설명

이진트리의 특성을 이용해서 부모 및 형제 노드로 움직여서 구현함.

```Update()```
+ 형제 노드는 자신이 홀이면 ```-1``` 한 값, 짝이면 ```+1``` 한 값임
  + ```xor``` 을 쓰면 한방에 구할 수 있음

```Query()```
+ ```l``` 인 경우
  + __계속 2를 나누다가 홀수가 되면 ```l``` 이상의 값만 포함하는 최상위 노드__ 
    + 짝수일 때는 부모노드가 결과에 포함이 됨
    + 홀수인 경우엔 아님. 형제 노드가 범위 밖이라 부모노드를 더하면 안됨
  + 이 노드는 __```l``` 이상의 모든 값을 포함하는 게 아님__
    + 바로 ```l++``` 해줘서
    + 그 이상의 값을 포함하는 최상위 노드를 똑같은 방법으로 구하면 됨
+ ```r``` 의 경우도 마찬가지

예를들어 8개의 수가 있을 때 [2, 7] 의 숫자합은 (1부터 셈)
+ 노드는 총 15 개가 있을 것이고
+ 위에서부터 높이 순으로 값을 넣었을 때
+ ```l``` 은 9, 5 = (9+1)/2, 3 = (5+1)/2 ...
+ ```r``` 은 14, 6 = (14-1)/2, 2 = (6 - 1)/2 ...
+ 그래서 9, 5, 6, 14 번 노드를 더하게 됨.



## Lazy Segment Tree

#### 코드

{% highlight c++ %}

template<typename T, size_t _H>
class SegmentTree
{
	template<typename F>
	struct Node {
		Node() {}
		Node(F v) : v(v) {}
		F operator+(const Node& in) { return v + in.v; }
		F operator*(const Node& in) { return v * in.v; }
		bool Lazy() { return lazy != 0; }
		void LazyPropa(F in) { lazy += in; }
		F v = 0, lazy = 0;
	};
public:
	void Init() { for (int i = INDEX_MAX - 1; i > 0; i--) nodes[i] = nodes[i << 1] + nodes[i << 1 | 1];}
	void Update(int l, int r, T v) { assert(r <= INDEX_MAX); _t1 = l; _t2 = r; _t3 = v; Update_Recursive(1, 1, INDEX_MAX); }
	Node<T> Query(int l, int r) { assert(r <= INDEX_MAX); _t1 = l; _t2 = r; return Query_Recursive(1, 1, INDEX_MAX); }

private:
	void LazyPropa(int x, int s, int e, T v)
	{
		nodes[x] = nodes[x] + (e - s + 1) * v; // 기존 업데이트에 겹쳐서 업데이트 중
		if (s != e) {
			nodes[2 * x].LazyPropa(v);
			nodes[2 * x + 1].LazyPropa(v);
		}
	}

	void Update_Recursive(int x, int s, int e)
	{
		if (nodes[x].Lazy()) // 기존에 Lazy 가 있는경우 자식으로 Propa 함
			LazyPropa(x, s, e, nodes[x].lazy);
	
		if (_t1 <= s && e <= _t2)  // 현재 범위가 업데이트할 범위 내에 있는 경우
			LazyPropa(x, s, e, _t3);
		else if(!(_t2 < s || e < _t1)) {  // 현재 범위가 업데이트할 범위에 걸치는 경우
			int m = (s + e) / 2;
			Update_Recursive(2 * x, s, m);
			Update_Recursive(2 * x + 1, m + 1, e);
			nodes[x] = nodes[2 * x] + nodes[2 * x + 1];
		}
	}
	
	Node<T> Query_Recursive(int x, int s, int e)
	{
		if (nodes[x].Lazy())
			LazyPropa(x, s, e, nodes[x].lazy);
	
		if (_t2 < s || e < _t1) return T();
		if (_t1 <= s && e <= _t2) return nodes[x];
		int m = (s + e) / 2;
		return Query_Recursive(x * 2, s, m) + Query_Recursive(x * 2 + 1, m + 1, e);
	}

public:
	Node<T> nodes[1 << _H];
	int INDEX_MAX = 1 << _H - 1;
	int _t1, _t2;
	T _t3;
};

{% endhighlight %}

#### 설명

값 하나가 아닌 연속된 값들을 바꾸는 경우 사용되는 최적화 기법.
+ ```Node``` 에 Lazy 용 변수를 하나 더 추가함.
+ __주어진 범위를 표현하는 최소한의 노드__ 만 수정함
  + 즉 __가능한 높은 노드__ 만 사용
  + 그래서 Bottom-Up 보다는 Top-Down 으로 많이 구현함
+ 수정할 노드의 포괄하는 범위가 수정해야하는 범위 내에 있는 경우
  + 현재 노드에서 ```수정할 값 * 현재 노드가 포괄하는 범위``` 만큼 수정하면  됨.
  + 수정한 노드의 바로 아래 자식 노드에게는 __```Lazy``` 값만 수정하고 재귀는 생략함.__
+ 후에 ```Lazy``` 값을 가진 노드에 __접근할 때 마다__
  + ```Lazy```를 바로 아래 자식에게 넘겨주고 자기자신만 업데이트해줌.



## Persistent SegmentTree

#### 코드

{% highlight c++ %}

template<typename T, size_t _H, size_t _NodeMax, size_t _TreeMax>
class PST
{
    template<typename F>
    struct Node {
        Node() : v(0), l(nullptr), r(nullptr) {}
        Node(F v) : v(v), l(nullptr), r(nullptr) {}
        Node(F v, Node* l, Node* r) : v(v), l(l), r(r) {}
        Node operator+(const Node& in) { return v + in.v; }
        F v; Node* l, * r;
    };

public:
    void Init()
    {
        node_cnt = (INDEX_MAX << 1) - 1;
        roots[0] = &nodes[1];
        for (int i = INDEX_MAX - 1; i > 0; i--)
            nodes[i] = Node<T>((nodes[i << 1] + nodes[i << 1 | 1]).v, &nodes[i << 1], &nodes[i << 1 | 1] );
    }
    void Update(int t_cnt, int i, T v) { _t1 = i; _t3 = v; roots[t_cnt] = Update_Recursive(roots[t_cnt], 1, INDEX_MAX); }
    void RootUpdate(int to, int from) { roots[to] = roots[from]; }
    Node<T> Query(int t_cnt, int l, int r) { _t1 = l; _t2 = r; return Query_Recursive(roots[t_cnt], 1, INDEX_MAX); }

private:
    Node<T>* Update_Recursive(Node<T>* node, int s, int e)
    {
        if (s > _t1 || e < _t1) return node;

        Node<T>* new_node = &nodes[++node_cnt];
        if (s == e && s == _t1) {
            new_node->v = node->v + _t3;
            return new_node;
        }
    
        const int m = (s + e) / 2;
        new_node->l = Update_Recursive(node->l, s, m);
        new_node->r = Update_Recursive(node->r, m + 1, e);
        new_node->v = new_node->l->v + new_node->r->v;
    
        return new_node;
    }
    
    Node<T> Query_Recursive(Node<T>* node, int s, int e)
    {
        if (_t2 < s || e < _t1) return Node<T>();
        if (_t1 <= s && e <= _t2) return node->v;
        const int m = (s + e) / 2;
        return Query_Recursive(node->l, s, m) + Query_Recursive(node->r, m + 1, e);
    }


private:
    Node<T>  nodes[_NodeMax];
    Node<T>* roots[_TreeMax];
    const int INDEX_MAX = 1 << _H - 1;
    int _t1, _t2, node_cnt;
    T _t3;
};

{% endhighlight %}


#### 설명

[간단 유튜브 설명](https://youtu.be/aLLC0Bi6I-Q)

TopDown 방식과 거의 비슷하나, 업데이트 될 때마다 새로운 노드로 덮어쓰는게 다름.
+ 그래서 기존 힙과는 다르게 포인터로 노드를 직접 연결해줘야함.



## Fenwick Tree

#### 코드

{% highlight c++ %}

template<typename T, size_t _SIZE>
struct BIT
{
	void Update(int i, const T& v) {
		for(;i < _SIZE; i += i & -i)
			nodes[i] += v;
	}

	T Query(int i) {
		T ans = 0;
		for(; i > 0; i -= i&-i)
			ans += nodes[i];
		return ans;
	}
	
	T nodes[_SIZE + 1];
};

{% endhighlight %}

#### 설명

Bindary Indexed Tree (BIT) 라고도 불림.

[구현 관련 BOJ Blog](https://www.acmicpc.net/blog/view/21)
+ [2의 보수](https://st-lab.tistory.com/189?category=872072) 를 응용해 __가장 낮은 1의 위치를 찾아냄__ 
  + ```idx & -idx``` 가 바로 그것
+ ```Nodes[idx]``` 는 ```Input[idx - (idx & -idx) + 1] ~ Input[idx]``` 의 합을 나타냄
  + 예를들어 1~7 번째 까지의 합을 구한다 하면
  + ```Nodes[1000]``` 은 1 ~ 4 번째의 합
  + ```Nodes[1010]``` 은 5 ~ 6 번째의 합
  + ```Nodes[1011]``` 은 7 ~ 7 번째의 합
  + 1 ~ 7 => ```Nodes[1000] + nodes[1010] + odes[1011]``` 이 됨.


누적합과 매우 비슷함
+ 누적합이 값을 수정하는데 O(n), 값을 구하는데 O(1) 이지만
+ BIT 는 값을 수정하는데 O(logN), 값을 구하는데 O(logN) 이 걸림.
+ 이미 주어진 리스트에 초기값을 구성하는데 O(nLogN) 이 걸림.

Segtree 와도 비슷함
+ 탐색 및 수정은 똑같이 O(logN) 이지만 조금 더 빠름.
+ 그리고 공간 복잡도가 O(n) 임
+ 하지만 Lazy, Persistent 등의 응용은 힘듬.




## 2D Fenwick Tree

#### 코드

{% highlight c++ %}

template<typename T, size_t _SIZE>
struct BIT
{
	void Update(int x, int y, const T& v) {
		for (int j = y; j <= _SIZE; j += j & -j)
			for (int i = x; i <= _SIZE; i += i & -i)
				nodes[j][i] += v;
	}

	T Query(int x, int y) {
		T ans = 0;
		for (int j = y; j > 0; j -= j & -j)
			for (int i = x; i > 0; i -= i & -i)
				ans += nodes[j][i];
		return ans;
	}
	
	inline T Query(int x1, int y1, int x2, int y2)
	{
		return Query(x2, y2) - Query(x1 - 1, y2) - Query(x2, y1 - 1) + Query(x1 - 1, y1 - 1);
	}
	
	T nodes[_SIZE + 1][_SIZE + 1];
};

{% endhighlight %}


#### 설명

검색, 수정에 O(logN * logN) 이 걸림
+ n 개의 펜윅트리를 구현하는 하기좋은 실수가 있는데 이러면 O(nlogN) 이 됨.

같은 방법으로 다차원 펜윅 트리를 만들 수 있음.
+ 세그먼트 트리도 차원을 펼칠 수 있지만 펜윅이 훨신 코드가 쉬움

<br/>

예를들어 ```Query(2, 3)``` 이러면 ```(x = 1 ~ 2, y = 1 ~ 3)``` 범위의 합이 됨.
+ 특정 구간을 원하면 직사각형 범위를 쪼개서 ```A - B - C + D``` 이런 식이 필요함

