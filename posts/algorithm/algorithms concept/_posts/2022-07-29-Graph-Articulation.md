---
excerpt: "그래프의 단절점과 단절선. Articulation"
tag: [PS. Articulation]
use_math: true
---


## 단절선

정점 ```A``` 와 ```B``` 를 잇는 간선이 단절선이 아니기 위한 조건이 무엇일까?

그건 바로 ```B``` 로부터 시작해 뻗어나가는 Sub Spanning Tree 로부터 ```A``` 로 이어지는 경로가 ```B->A``` 말고는 없어야한다는 것이다. 

이는 DFS 를 수행하면서 정점 방문 순서를 순서대로 기록해 그 대소관계를 비교하므로써 쉽게 구현할 수 있다.

아래는 [BOJ 문제](https://www.acmicpc.net/problem/11400) 에 대한 코드이다.

<details>
<summary>코드</summary>
<div markdown="1">

{% highlight c++ %}

vector<int> lines[100001];
int visits[100001], n_visit;

vector<pair<int, int>> ans;

int Articulate(int cur, int parent = -1)
{
	int res = visits[cur] = ++n_visit;

	for (auto l : lines[cur])
	{
		if (l == parent) continue;
		if (visits[l]) res = min(res, visits[l]); // 이미 방문한 노드는 제외
		else { // Spanning Tree
			int tmp = Articulate(l, cur);
			if (visits[cur] < tmp)
				ans.push_back({ min(l, cur), max(l, cur) });
			else res = min(res, tmp);
		}
	}

	return res;
}

int main()
{
	// Input 을 처리

	// 1번 Vertex 부터 n Vertex 까치 DFS
	for (int i = 1; i <= n; i++)
		if(visits[i] == 0 )Articulate(i);

	// 정렬 후 정답출력
}
{% endhighlight %}

</div>
</details>

## 단절점

단절선에서 약간만 수정하면 된다.

Spanning Tree 의 Root 가 아닌 Node 에 대해서 Subtree 가 자기 자신으로 이어지는 경우 역시 단절점이 될 수 있다. Parent 와 이어진 부분과 Subtree 부분으로 나눌 수 있기 때문이다. 그래서 ```visits[cur] < tmp``` 부분이 ```visits[cur] <= tmp``` 으로 바뀌었다.
+ 이에 따라 ```if (l == parent) continue;``` 부분이 생략이 가능하다. 이는 약간 기술적인데 정점 ```A``` 에서 Subtree 가 있어서 그 Node 중 하나인 ```B``` 가 있다고 하자. ```B->A``` 로 직접 가는 경로가 있는 것과 ```B``` 에서 Subtree 를 거슬러 올라와서 다시 ```A``` 에 도달하는 것과 결과적으로 차이가 없다. 어차피 둘다 다 단절점임을 나타내기 때문이다. 그래서 생략이 허용된다.

Spanning Tree 의 Root 가 되는 Node 인 경우 Childs 가 2개 이상이면 자기 자신이 단절점이 된다. 이를 위해서 ```nChilds``` 를 두어 갯수를 센다.
+ 이때 Graph 에서의 Edges 의 갯수가 아님에 주의하자. 예를들어 Graph ```A->B, A->C, B->C``` 의 경우 Spanning Tree 는 ```A->B->C``` 가 된다. ```A``` 와 이어진 Edges 는 2개이지만 Spanning Tree 의 Childs 는 1개 이다. 


아래는 [BOJ 문제](https://www.acmicpc.net/problem/11266) 에 대한 코드이다.

<details>
<summary>코드</summary>
<div markdown="1">

{% highlight c++ %}

int Articulate(int cur, int parent = -1)
{
	int res = visits[cur] = ++n_visit;

	int nChilds = 0;
	bool bArt = false; 
	for (auto l : lines[cur])
	{
		if (visits[l]) res = min(res, visits[l]);
		else { // Spanning Tree
			nChilds++;
			int tmp = Articulate(l, cur);
			if (visits[cur] <= tmp)
				bArt |= true;
			else res = min(res, tmp);
		}
	}
	if (bArt && parent != -1 || nChilds > 1 && parent == -1)
		ans.push_back(cur);

	return res;
}

{% endhighlight %}

</div>
</details>