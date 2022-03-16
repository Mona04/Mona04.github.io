---
excerpt: "Algorithms regarding Spanning of Graph"
categories: Algorithm
tag: [PS. UnionFind, PS. Graph]
use_math: true
---

## Disjoint Set

DFS 랑 Union Find 가 자주 쓰임.
+ [뭐가 더 나을까](https://stackoverflow.com/questions/28398101/union-find-or-dfs-which-one-is-better-to-find-connected-component)
+ DFS 가 더 빠르지만 Graph 가 동적으로 변하는 상황에선 Union Find 가 나음.

[관련 문제](https://www.acmicpc.net/submit/9466/40529687)

### DFS

{% highlight c++ %}

vector<int> lines[MAX_IN];
bool visitTB[MAX_IN], recurTB[MAX_IN];

void DFS(int cur)
{
	for (auto& l : lines[cur])
	{
		if (recurTB[l])
		{
			// Cycle Check
			return;
		}
		else if(!visitTB[l])
        {
        	visitTB[l] = true; recurTB[l] = true;
        	DFS(line);
        	recurTB[l] = false;
        }
	}	
}

{% endhighlight c++ %}

<br/>

O($$N$$) 에 끝나며 정적인 그래프에서 사용가능함.

한번 Visit 한 곳은 다시 DFS 를 돌지 않기 위해 체크를 해야함.
+ Birected Graph 의 경우는 ```visitTB[]``` 면 충분함.
+ __Directed Graph 인 경우는 Visit 된 노드가 꼭 Cycle 을 보장하지 않음__ 
+ 그래서 현재 돌지 않은 가지와 구분하기 위해 BackTracking 으로 ```recurTB[]``` 를 사용하게 됨


### Union Find

{% highlight c++ %}

int rootTB[MAX_IN], rankTB[MAX_IN];
void Init(int n)
{
	for(int i = 0; i <=n; i++) rootTB[i] = i;
	fill(rankTB, rankTB+n, 0);
}

int Find(int a)
{
	if (rootTB[a] == a) return a;
	return rootTB[a] = Union(cycleTB[a]);
}

bool Union(int from, int to)
{
	from = Union(from);
	to = Union(to);
	if (from == to) return false;
	if(rankTB[to] < rankTB[from]) swap(from, to);
	if(rankTB[to] == rankTB[from]) rankTB[to]++;
	rootTB[from] = to;
	return true;
}

{% endhighlight %}

시간복잡도는 $$M$$ 번의 연산에서의 총 시간복잡도에 대해서 증명하고, 여기에 $$M$$ 을 나눠 ```Union()``` 연산 당 Amortized Time Complexity 를 구함.

총 시간복잡도는 아래의 두 최적화를 모두 하면 O($$\alpha(N)$$), 안하면 O($$N^2$$) 가 걸림.
+ Rank Optimization
  + Rank 가 합쳐진 Tree 의 최대 깊이를 의미함.
  + Append a root of shallow tree to a root of deeper one in ```Union()```.
  + 알고리즘 특성 상 최소 이진트리의 크기를 유지하게 되어 Amortized O($$\log{N}$$) 을 만듬  
+ Path Compression
  + 각 정점의 ```rootTB[]``` 는 현재 구성한 Tree 의 Root 만을 저장시키는 것.
  + 이 사용하면 O($$\log(N)$$) 를 만듬
  + 이것만 사용시 O($$M\log(N)) 이라함. [SE](https://cs.stackexchange.com/questions/48649/complexity-of-union-find-with-path-compression-without-rank), [Prinston 수업 PPT](https://www.cs.princeton.edu/~wayne/kleinberg-tardos/pdf/UnionFind.pdf)
+ 자세한건 [Samsung SW 블로그](https://www.secmem.org/blog/2021/04/19/Union-Find-Time-Complexity-Proof/) , [Wiki](https://en.wikipedia.org/wiki/Disjoint-set_data_structure) 참고


## MST

Minimum Spanning Tree 는 보통 Kruskal Algorithms 을 사용함

가장 weight 가 낮은 edge 부터 UnionFind 를 써서 tree 를 만드는 Gridy Algorithms.

이 [문제](https://www.acmicpc.net/problem/1197) 의 코드를 아래 기록함.

{% highlight c++ %}

int main()
{
	int v, e;
	cin >> v >> e;

	for (int i = 0; i < e; i++)
	{
		int a, b, c;
		cin >> a >> b >> c;
		a = min(a, b); b = max(a, b);
		lines[i] = { a, b, c };
	}
	Init(v);
	
	sort(lines, lines + e, [](E& a, E& b) { return a.w < b.w; });
	int ans = 0;
	for (int i = 0; i < e; i++)
	{
		if (Union(lines[i].a, lines[i].b))
			ans += lines[i].w;
	}
	cout << ans;
}

{% endhighlight %}
