---
excerpt: "최대 독립 집합, 최소 버텍스 커버"
categories: Algorithm
tag: [PS. Graph, PS. Network Flow]
use_math: true
---

## 기본 개념

#### Vertex Cover

> 임의의 그래프 $$G = (V, E)$$ 에 대해서, $$U$$ which satisfy $$ (U \subseteq V)$$ is __vertex cover__ iff  every $$(u, v) \in E$$ satisfy $$u \in U \text{ or } v \in U $$. 

+ 간선과 연결되지 않는 잉여 정점이 $$U$$ 에 있어도 된다는 것에 주의.
+ __Minimum Vertex Cover Problem__

#### Independent Cover

> 임의의 그래프 $$G = (V, E)$$ 에 대해서, $$U$$ which satisfy $$ (U \subseteq V)$$ is __Independent set__ iff  every $$u, v \in U' \subseteq U$$ satisfy $$ (u, v) \notin E  $$. 

+ __Maximum Independent Cover 은 Minimum Vertex Cover 의 여집합이 된다__

#### Vertex Cover 와 Matching 의 관계

> 임의의 그래프 $$G = (V, E)$$에 대해서, $$G$$의 어떤 Matching $$M$$과 Vertex Cover $$U$$가 있을 때, $$\vert M \vert \leq \vert U \vert $$가 성립한다.

여기서 만약 등식이 성립하게 된다면, 최대 Matching, 최소 Vertex Cover 가 됨을 알 수 있다.


## Tree

[트리의 독립집합](https://www.acmicpc.net/problem/2213). 

트리에서의 다이나믹 프로그래밍으로 풀 수 있다.

<details>
<summary>위 문제 정답 코드</summary><br/>
{% highlight c++ %}

int weights[10001], dp[10001][2];
vector<int> lines[10001], ans;

int Find(int cur, int parent, int bSelect)
{
	if (dp[cur][bSelect]) return dp[cur][bSelect];

	dp[cur][bSelect] = bSelect ? weights[cur] : 0;
	for (auto l : lines[cur])
	{
		if (l == parent) continue;
		if (bSelect) dp[cur][bSelect] += Find(l, cur, false);
		else {
			dp[cur][bSelect] += max(Find(l, cur, false), Find(l, cur, true));
		}
	}
	return dp[cur][bSelect];
}

void Print(int cur, int parent, int bSelect)
{
	if (bSelect) ans.push_back(cur);

	for (auto l : lines[cur])
		if (l != parent)
	    	Print(l, cur, bSelect ? false :  dp[l][1] > dp[l][0]);
}

int main()
{
    int n; cin >> n;
	for (int i = 1; i <= n; i++)  cin >> weights[i];
	for (int i = 0; i < n - 1; i++)
	{
		int tmp1, tmp2;
		cin >> tmp1 >> tmp2;
		lines[tmp1].push_back(tmp2);
		lines[tmp2].push_back(tmp1);
	}

	cout << max(Find(1, -1, false), Find(1, -1, true)) << '\n';
	Print(1, -1, dp[1][1] > dp[1][0]);
	
	sort(ans.begin(), ans.end());
	for (auto l : ans)
		cout << l << ' ';
}

{% endhighlight%}
</details>



## Bipartite Graph

### Kőnig's theorem

> Bipartite graph 에서 Maximum Matching 과 Minimal Vertex Cover 은 똑같다.

어떤 그래프 $$G$$, 그것의 Matching 을 $$M$$, Vertex Cover 를 $$U$$ 라고 하면 $$ \vert M \vert \leq \vert U \vert $$ 를 만족한다. 만약 등식이 성립한다면 각각 최대 최소가 될 것이지만 모든 그래프에서 등식이 성립하지는 않는다. 하지만 이분 그래프에선 만족한다는 것이 쾨니그의 정리이다.

[가젤 블로그](https://gazelle-and-cs.tistory.com/12?category=794321) 에서 자세하게 설명하고 있으니 찾아보자.


### 구성적 증거

#### 쉽게 빠질 수 있는 오류

실제 Minimal Vertex Cover 을 구성하는건 매칭된 간선에서 $$L$$ 과 $$R$$ 중에 하나가 된다. 그렇다고 아무생각 없이 $$L$$ 과 $$R$$ 중에 잘못 선택하면 Vertex Cover 가 성립하지 않을 수 있다. 예를들어 4:1 로 좌우가 완전히 연결된 경우 $$R$$ 에 속한 하나의 정점만 답이다. 그렇다고 많이 연결된 정점만 선택한다고 Vertex Cover 가 되는건 아니다. 

![Bipartitie Vertex Cover Sample](/Posts/Algorithm/Algorithms Concept/Vertex-Cover-01.png)

위와 같은 경우는세번째가 매칭에서  $$R$$이 정점이 더 많다고 이 정점을 Vertex Cover 라고 하면 ```3 -> 4``` 연결을 놓치게 된다.

#### 구성적 증거

Minimum Vertex Cover 를 구하는 방법은  [Wiki 의 구성적 증거](https://en.wikipedia.org/wiki/K%C5%91nig%27s_theorem_(graph_theory)#Proofs) 파트에서 나와있다. 짧은 내용이지만 헷갈리기 때문에 설명하겠다. 우선 __$$L$$ 의 exposed vertex 에서 시작하는 Alternative Path 를 Z-Path 라고 하자(간선 하나도 포함).__  논의 대상은 __이분최대매칭이 완료된 그래프__ 이다.  총 2단계로 증명이 된다. 
1. 그래프의 모든 Z-Path 를 이루는 정점의 집합을 $$Z$$ 라고 하면 모든 간선은 $$K = (L \backslash Z) \cup (R \cap Z)$$ 에 연결되어 있으므로 $$K$$ 는 Vertex Cover 이다.
2. $$(L \backslash Z)$$ 와 $$(R \cap Z)$$ 간을 매칭하는 간선이 없으며, 각각의 집합을 이루는 모든 정점이 매칭된 정점이므로 $$\vert K \vert $$ 가 최대 매칭의 크기와 같게된다. 곧 Minimum Vertex Cover 임이 증명되었다.

<details>
<summary>자세한 증명 메모</summary><br/>
<div markdown="1">

1번은 자명하고 2번을 증명하기 위해서는 모든 간선을 Z-Path 인지 아닌지로 나눈다. 만약 Z-Path 라면 그 간선의 $$R$$ 부분은  $$(R \cap Z)$$ 에 속하고 $$L$$ 부분은 $$(\mathrm{L} \backslash \mathrm{Z})$$ 에 속하지 않는 것이 정의 상 자명하다. 만약  Z-Path 가 아니라면 바로 판단하기가 힘드므로 경우를 매칭하는 간선인지 아닌지로 또 나눈다. 

 Z-Path 가 아니고 매칭하는 간선의 경우, 간선을 이루는 양끝의 정점은 모두 Z-Path 에 속할 수 없다 (곧 $$(\mathrm{L} \backslash \mathrm{Z})$$ 이다.). 이를 보이자면, $$L$$ 부분이 exposed vertex 가 아니므로 이 간선은 Z-Path 의 시작점이 될 수 없다. 그래서 만약  $$L$$ 부분이 Z-Path 와 연결되려면 Z-Path 인 backward edge 와 연결되는 경우 뿐인데, 이는 한 정점이 두개의 backward edge 를 만들 수 없으므로 불가능이다. 한편 $$R$$ 부분으로 Z-Path 인 forward edge 가 온다면 지금 논의되는 간선이 곧바로 Z-Path 가 되므로 모순이다. 

 Z-Path 가 아니고 매칭하지 않는 간선의 경우 역시 마찬가지이다. 왜냐하면 $$L$$ 부분이 exposed vertex 가 될 수 없으므로(그러면 위의 정의상 Z-Path 이다.) $$L$$ 부분과 Z-Path 가 연결되는 경우는 $$L$$ 부분과 매칭하는 backward edge 가 Z-Path 인 경우 뿐인데, 그러면 지금 논의되는 간선과 곧바로 이으면 Z-Path 가 되므로 모순이기 때문이다. 또한 $$R$$ 부분에 Z-Path 인 backward edge 가 연결된다면 비슷하게 모순을 이끌어 낼 수 있다.

그러므로 Z-Path 가 아닌 간선을 이루는 $$L$$ 쪽 정점만  $$(\mathrm{L} \backslash \mathrm{Z})$$  에 속하게 된다 . 따라서 위 증명에서 $$(L \backslash Z)$$ 와 $$(R \cap Z)$$ 를 동시에 만족하는 간선은 없음이 드러났다. 즉 두 그룹을 잇는 간선이 없다는 것이다. 이러한 Vertex Cover 의 크기는 최대매칭과 같게 되고 곧 Minimal Vertex Cover 가 된다.

</div>
</details><br/>

관련문제로 [최소 버텍스 커버 문제](https://www.acmicpc.net/status?user_id=dh0450&problem_id=2051&from_mine=1) 가 있으니 연습해보자.


### 최소 버텍스 커버 예제

[돌멩이 제거](https://www.acmicpc.net/problem/1867) 를 통해 쾨니그의 정리를 활용해보자.

돌멩이 제거에서는 돌멩이의 좌표가 (```x```, ```y```) 라고 하면 이 돌멩이를 X축의 ```x``` 와 Y축의 ```y```을 잇는 간선이라고 생각할 수 있다. 우리는 모든 돌멩이와 연결되는 X,Y 축의 최소의 집합을 원한다. 그러면 문제는 모든 간선이 포함되는 최소의 정점을 찾는 Minimal Vertex Cover 문제가 된다. __그리고 이분매칭이므로 쾨니그의 정리로 최대 매칭되는 수를 찾는 문제가 된다.__

### 최대 독립 집합 예제

[틀렸습니다](https://www.acmicpc.net/problem/5398) 를 통해 쾨니그의 정리를 활용해보자.

문제에서 가로는 가로끼리 겹치지 않고 세로 역시 마찬가지이다. 그래서 가로 글자 그룹과 세로 글자 그룹 간의 이분매칭이 가능하다. 문제에서 원하는 것은 서로 겹치는 글자가 없는 최대의 단어 갯수이다. 이는 곧 최대 독립 집합의 크기를 묻는 것과 같고, 최소 버텍스 커버의 역집합을 묻는 것과 같다. 이분매칭이므로 쾨니그의 정리로 최대 매칭을 구해 전체 글자 갯수에서 빼주면 된다.



## DAG