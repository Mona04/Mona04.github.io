---
excerpt: "최대 유량 문제를 위한 이론과 알고리즘"
categories: Algorithm
tag: [PS. Network Flow]
use_math: true
---

<br/>

[가젤 블로그의 글](https://gazelle-and-cs.tistory.com/60?category=875540)

위 글이 매우 잘 정리되어 있고, 여기에는 상기용으로 요점만 메모?함.



## Network Flow

큰 방향은 다음과 같음.
+ Augmenting Path 의 성질에서 __Max-Flow -> No Augmenting Path__
+ Max-Flow Min--Cut Theorm 에서 __No Augmenting Path -> Max-Flow__

#### Flow Network

다음 두 조건을 만족하며, 간선이 총량 $$c$$ 과 현재흐름 $$f$$ 정보를 갖는 Directed Graph
+ __Capacity Constraint__
  + 모든 점에 대해
  + $$e \in E, \quad 0 \le f(e) \le c(e) $$ 를 만족
+ __Flow Conservation Constraint__
  + 시점 $$s$$ 와 종점 $$t$$ 이 아닌 모든 점에 대해
  + $$\sum_{\text{e out of v}} {f(e)} = \sum_{\text{e in of v}} {f(e)} $$ 를 만족

다음과 같은 특징은 무시해도 상관없음
+ Loop(자기 자신으로 돌아오는 간선)은 의미가 없음
+ Parallel Edge (동일한 Head/Tail 을 갖는 간선) 은 합치면 됨

#### Residual Network

어떤 Network Flow $$(G = (V, E),\  c,\ f)$$ 가 있으면, 다음을 만족하는 Residual Network $$(G_f = (V, E_f),\ c_f )$$ 가 존재함.

$$ E_f = \{(u, v) | (u, v) \in E,\   f(u, v) < c(u, v)\} \cup  \{(v, u) | (u, v) \in E,\  f(u, v) > 0\} $$
+ 더 흘릴 여유분을 보여주는 전자가 __Forward Edge__
  + $$c_f(u, v) = c(u, v) - f(u, v)$$ 를 가짐
+ 무언가 흘러가고 있음을 보여주는 Edge 가 __Backward Edge__
  + $$c_f(v, u) = f(u, v)$$ 를 가짐
+ 하나의 Edge 에 Forward, Backward 가 둘다 생길 수도 있음
+ 완전히 꽉찬 흐름이거나 아무것도 흐르지 않으면 둘중 하나만 생기게 됨.

#### Augmenting Path

Residual Network 가 시점 $$s$$ 와 종점 $$t$$ 를 잇는 단순경로 $$ P \subset E_f $$ 가 존재한다면 이를 __Augmenting Path__ 라고 하며, 다음과 같은 작업을 할 수 있음.

$$ f_{P} = min(c_f(e)\ |\ e \in P) $$

$$ f \uparrow f_{P}(u, v) = \left\{\begin{array}{lr}
  f(u, v) + f_{P},\ \text{if } (u,v) \in P \\
  f(u, v) - f_{P},\ \text{if } (v,u) \in P \\
  f(u, v),\ \text{otherwise} 
  \end{array}\right. $$ 

위와 작업을 해도
+ Capacity Constraint, Flow Conservation Constraint 를 만족하고,
+ 흐름량이 $$ \lvert f \rvert + f_{P}  $$ 이 됨
  + $$P$$ 가 단순경로이므로 $$k = (s, t) \in P $$ 가 존재하고,
  + Forward Edge, Backward Edge 두 경우 따져보면 $$s$$ 에서의 유량이 증가하기 때문

__=> Max-Flow 이면 Augmenting Path 가 존재하지 않는다.__

#### Network Flow Cut

Network Flow $$(G = (V, E),\  c,\ f)$$ 에서 $$V$$ 를 두개의 집합 $$S, V \backslash S $$으로 나누는걸 cut 이라고 함.
+ 나뉜 집합 각각이 $$s$$, $$t$$ 를 갖게 되는걸 __s-t cut__  이라고 함
  + Network Flow 에서 cut 하면 보통 s-t cut 을 의미함
+ $$S \rightarrow  V \backslash S $$ 의 간선의 집합을 $$ \delta^+(S) $$, 반대방향을 $$ \delta^-(S)$$ 이라고 함.
+ __Cut Capacity(절단 용량)__ 를 $$c(S) = \sum_{e \in \delta^+(S)} {c(e)} $$ 라고함
+ __Net Flow Value(순 흐름양)__ 을 $$ f(S) = \sum_{e \in \delta^+(S)} {f(e)} - \sum_{e \in \delta^-(S)} {f(e)} $$ 라고함
+ 항상 $$f(S) = \mid {f} \mid $$ 를 만족함. 

#### Max-Flow Min-Cut Theorem

_Weak Duality between Net Flow Value and Cut Capacity_
+ Cut Capacity 가 가장 작은 cut 을 $$S^*, V \backslash S^*$$ 라고 하고, 최대 흐름 $$f^*$$ 에 대해서
+ __$$ f(S) =  \mid {f} \mid  \leq  \mid {f^*} \mid \leq c(S^*) \leq c(S) $$__ 를 만족함
  + 각 부등호는 그 정의에 의해 자명하고 
  + 등호는 바로 위의 순흐름양의 동일성으로 됨.

Residual Network $$G_f$$ 에서  _Augmenting Path 가 없는 경우_ $$s$$ 에서 도달가능한 모든 정점을 $$S$$ 라고 하면
+ $$k \in G_f $$ 의 방향은  $$ V \backslash S $$ 에서 $$ S $$ 로 가야만 함.
+ $$k$$ 가  $$\delta^+(S) $$ 의 간선으로 생성된 경우 Backward Edge 로  $$f(k) = c(k)$$ 임.
+ $$k$$ 가  $$\delta^-(S) $$ 의 간선으로 생성된 경우  Forward Edge 로  $$f(k) = 0$$ 임.
+ 그러면 __$$ f(S) = c(S) $$ 를 만족함__
+ Weak Duality 의 부등식이 등식으로 바뀌면서 이 경우가 최대 유량이 됨.

Max-Flow Min-Cut Theorem(최대흐름 최소절단 정리)
+ 어떤 Network Flow 의 Max-Flow 는 Min-Cut Capacity 와 같음.
+ 이는 Residual Network 의 Augmenting Path 가 없는 경우에서 위를 만족하므로 증명됨.

__=>Augmenting Path 가 존재하지 않으면 Max-Flow 이다.__



## Ford-Fulkerson Method

$$G_f$$ 에서 Augmenting Path 가 없을 때 까지 $$ f \uparrow f_{P}(u, v) $$ 를 반복함

시간복잡도는 모든 Weight 가 정수일 경우 최대 유량을 $$F^*$$ 라고 하면 $$(O(F^*)$$ 가 됨
+ 한번  $$ f \uparrow f_{P}(u, v) $$ 를 할때마다 적어도 1씩 향상되기 때문
+ 무리수가 올 경우 무한루프에 빠지는 경우가 존재하고, 애초에 좀 느림




## Edmonds-Karp Algorithm

Ford-Fulkerson Method 에서 Augmenting Path 를 가장 짧은 경로로 구하는 방법.

시간복잡도가 O($$V * E^2$$) 가 되며 그 근거는 대략 다음과 같이 흘러감
+ $$ f' := f \uparrow f_{P} $$ 를 할수록 각 __정점__ 은  $$d_f$$ 가 같거나 늘어남.
+ 최단거리로 $$P$$ 를 찾아 $$ f' := f \uparrow f_{P} $$ 를 할수록 $$P$$ 의 병목 간선의 정점의 $$d_f$$ 가 늘어남.

### 개념

#### Residual Network 위에서 거리의 증가성

Residual Network $$G_f$$ 에서  $$ f' := f \uparrow f_{P} $$ 를 하고, $$v \in V$$ 인 임의의 정점 $$v$$ 에 대해

$$ d_f(v) = \left\{\begin{array}{lr}
  \text{num of edges on shortest path from } v \text{ to } e \text{ in } G_f ,\ \text{if shortest path exists} \\
  \infty\,\ \text{otherwise} 
  \end{array}\right. $$ 

가 정의될 때,  __임의의 정점 $$v \in V$$ 에 대해서 $$d_{f'(v)} \geq d_{f(v)} $$__ 를 만족함.

증명은 __증가시킨 후의 흐름 $$f'$$ 에 대해서 모든 정점을 $$d_{f'(v)}$$ 로 정렬__ 시킨 후, 수학적 귀납법을 사용함.
+ 첫번째 정점은 $$t$$ 로 $$d_{f'(t)} = d_{f(t)} = 0 $$ 임
+ $$d_{f'(v)} = \infty $$ 이면 무조건 만족함
+ $$d_{f'(v)} < \infty $$ 이면 $$G_{f'}$$ 에서 $$v$$ 의 최단경로 중 $$v$$ 의 바로 앞의 정점 $$u$$ 에 대해서
  + 바로 다음 정점이므로 $$d_{f'(v)} = d_{f'(u)} + 1 $$ 는 자명함
  + $$u$$ 가 $$v$$ 이전에 오므로  $$d_{f'(u)} + 1 \geq d_{f(u)} + 1 $$ 는 점화식의 전제임.

+ $$(v, u) \in E_f$$ 이라면 $$ d_{f'(v)} = d_{f'(u)} + 1 \geq d_{f(u)} + 1 \geq d_{f(v)} $$ 이 성립함.
  + $$v$$ 에서 $$u$$ 거치고 최단거리로 가면 $$d_{f(u)} + 1 = d_{f(v)} $$ 이거나 또는 $$d_{f(u)} \geq d_{f(v)} $$ 이므로
  + $$d_{f(u)} + 1 \geq d_{f(v)} $$ 를 만족하기 때문임.

+ $$(v, u) \notin E_f$$ 이라면 $$ d_{f'(v)} = d_{f'(u)} + 1 \geq d_{f(u)} + 1 =  d_{f(v)} + 2  \geq d_{f(v)} $$ 이 성립함.
  + $$G_f$$ 에서는 모든 정점에서 Forward 또는 Backward 간선 중 하나는 존재함.
  + $$(v, u) \notin E_f$$ 이면 $$(u, v) \in E_f$$  라는 소리임.
  + 또한  $$ f' := f \uparrow f_{P} $$ 를 한 후에 간선이 바뀌었으므로 $$(u, v) \in P$$ 임
  + 즉 $$v$$ 에서 $$u$$ 를 거쳐 $$t$$ 까지가는 최단거리가 $$G_f$$ 에 존재한다는 것.
  + 그러므로 $$  d_{f(u)} + 1 =  d_{f(v)} + 2 $$ 가 됨.

####  증가경로를 찾는 횟수의 상한

$$P$$ 의 가장 작은 용량을 갖는 간선을 병목 간선이라고 하면, Augmenting Path 의 병목 간선이 될 수 있는 횟수는, __가능한 $$P$$ 중 최단경로를 고른다면__,  $$\mid V \mid / 2 $$ 를 최대로 가짐.
+ __최단경로를 찾아서 가므로__ $$  d_{f_3(u)} =  d_{f_3(v)} + 1 $$ 이고 $$  d_{f_2(v)} =  d_{f_2(u)} + 1 $$ 를 만족함
+ $$(u, v) \in E_{f_1} $$ 가 병목 간선이면 $$(v, u) \in E_{f_2}$$ 가 성립함.
  + 왜냐하면 $$f(u, v) = 0 \text{ or } c(u, v)$$ 만 가능해 Forward, Backward 중 하나만 오기 때문.
  + $$ f_2 $$ 이후에 $$(v, u)$$ 에 변화를 줘야지 이후 $$(u, v)$$ 이 다시 Augmenting Path 에 있을 수 있음. 
  + 이때를 $$f_3$$ 라고 하겠음.

+ __거리의 증가성__ 에 따라   $$  d_{f_3(u)} =  d_{f_3(v)} + 1 \geq d_{f_2(v)} + 1 =  d_{f_2(u)} + 2 \geq d_{f_1(u)} + 2 $$ 임.
+ 즉 __병목간선은 적어도 거리가 2 멀어지고 다시 병목간선이 될 수 있음__
+ $$d_f$$ 는 $$\mid V-1 \mid$$ 를 못넘으므로  $$\mid V \mid / 2 $$ 가 $$(u, v)$$ 가 병목간선이 될 수 있는 상한.

#### 시간복잡도


+ $$E_f$$ 는 $$E$$ 당  Forward, Backward 가 있으므로 최대 $$2 \times E$$ 개를 가짐. 
+ Augmenting Path 에 하나 이상의 병목간선이 있고, 최소거리로 $$P$$ 를 잡으면, 각 $$E_f$$ 는 최대  $$ V/2 $$ 번 거리가 벌려짐. 
+ 그래서 최대 $$ VE $$ 번 $$ f \uparrow f_{P}  $$ 를 해야함.
  + $$ f \uparrow f_{P}  $$ 는 O($$\mid V \mid $$) 이지만
  + 최단거리를 찾기 위해 BFS 를 해야해서 O($$E$$) 임.
+ 합쳐서 $$O(V \times E^2)$$ 가 됨.


### 코드

[이 문제](https://www.acmicpc.net/problem/6086) 를 푼 것으로 인풋 빼면 거의 공식임.

{% highlight c++ %}

vector<int> lines[MAX_IN]; 
int c[MAX_IN][MAX_IN], f[MAX_IN][MAX_IN], d[MAX_IN];
const int T = 'Z' - 'A',  S = 'A' - 'A';

int Edmonds_Karps()
{
	int res = 0;
	while (1)
	{
		fill(d, d + MAX_IN, -1);

		queue<int> works;
		works.push(S);
		while (!works.empty()) 
		{
			int cur = works.front();
			works.pop();
	
			for (auto l : lines[cur])
				if (c[cur][l] - f[cur][l] > 0 && d[l] == -1) 
				{
					d[l] = cur;
					works.push(l);
				}				
		}
	
		if (d[T] == -1) break;
	
		int add = 1e9;
		for (int i = T; i != S; i = d[i])
			add = min(add, c[d[i]][i] - f[d[i]][i]);
		for (int i = T; i != S; i = d[i])
		{
			f[i][d[i]] -= add;
			f[d[i]][i] += add;
		}
		res += add;
	}
	return res;
}

int main()
{
	int n;
	cin >> n;

	for (int i = 0; i < n; i++)
	{
		char from, to; int ic;
		cin >> from >> to >> ic;
		from -= 'A'; to -= 'A';
	
		if(find(lines[from].begin(), lines[from].end(), to) == lines[from].end())
		{
			lines[from].push_back(to);
			lines[to].push_back(from);
		}
		c[from][to] += ic; c[to][from] += ic;
	}
	
	cout << Edmonds_Karps();
}

{% endhighlight c++ %}

<br/>

```lines``` 에 저장하는 것은 __단방향 그래프라도 양방향을 저장함__
+ 왜냐하면 $$G_f$$ 에서는 $$G$$ 의 간선마다 Forward / Backward 가 만들어질 수 있기 때문

또한 __```f[u][v] == -f[v][u]``` 를 다음과 같은 이유로 만족하게 함__ (유량의 대칭성)
+ ```c[u][v] - f[u][v]``` 식 자체가 $$c_f$$ 가 됨
  +  $$(u, v) \in G $$ 인 경우 Forward 그 자체므로 자명하고
  +  $$(v, u) \in G $$ 의 경우 단방향 간선의 경우 ```c[i][j] - f[i][j] == 0 - f[i][j] == f[j][i]``` 라 위에서 했던 정의대로이나, 양방향 간선의 경우 Backward Edge 를 취소하는 것 뿐만 아니라 흐르는 방향을 바꿔서 넣을 수도 있으므로, 이를 고려하면 $$c_f$$ 가 됨.  

+  Forward / Backward 안나누고 ```f[u][v] += f_p, f[v][v] -= f_p``` 로 한번에 증가연산이 가능함
    + $$(u, v) \in G $$ 인 Forward 의 경우 ```f[u][v] >= 0``` 으로 유량이 증가하게 됨.
    + $$(v, u) \in G $$ 인 Backward 의 경우 ```f[u][v] <= 0``` 으로 유량이 감소하게 됨.

![NetworkFlow](/Posts/Algorithm/Algorithms Concept/Network-Flow-01.png)
+ ``` 
7
AB 3
AD 5
DC 5
BC 1
BE 5
CZ 3
EZ 5
```
+ 위 데이터에 대해서, 현재 흐르는 간선으로 단방향 그래프를 생각해 그린 잔여네트워크.
+ ```B->C``` 에서 증가연산 한번으로 방향이 바뀜


## Dinitz' Algorithms

### 개념

#### Layered Network

$$G_f$$ 가 있을 때, 가능한 Augmenting Path 중 가장 짧은 $$P$$ 를 이루는 간선의 갯수를 $$l$$ 이라고 하면
+ $$ U_i^f = \left\{ v \in V  \mid\  d_f(s, v) = i,\ d_f(v, t) = l - i  \right\}  $$ 로 $$V$$ 를 Layer 로 나눌 수 있고
+ $$ U^f = U_0^f \cup U_1^f \cup \text( ... ) \cup U_l^f $$ 로 Layer 의 집합을 만들 수 있음
+ $$ F_{i \rightarrow i+1}^f = \left\{(u, v) \in E_f \mid\  u \in U_i^f,\ v \in U_{i+1}^f  \right\} $$ 로 Layer 두개를 연결하는 간선의 집합을 만들고
+ $$ F^f = F_{0 \rightarrow 1}^f \cup F_{0 \rightarrow 1}^f \cup \text( ... ) \cup F_{l-1 \rightarrow l}^f $$ 로 Layer 간의 간선의 집합을 만들 수 있음.
  + 여기서 만든 경로는 그 정의상 최단경로가 될 수밖에 없음.
+ $$L_f = (U^f, F^f)$$ 를 Layered Network 라고 함.

#### Layered Network Update

$$ f' := f \uparrow f_{P} $$ 를 할 때 Layered Network 에는 중요한 특성이 있음.
+ $$G_f$$ 에서 병목간선들이 최대 $$\mid P \mid = l$$ 만큼 사라짐.
+ $$L_f = (U^f, F^f)$$ 의 해당 병목간선들을 없애는 Update 를 한 것을 $$\hat{L_f} = (\hat{U^f}, \hat{F^f})$$ 라고 함
+ 만약 $$G_f$$ 와 $$G_{f'}$$ 의 __최단 Augmenting Path 가 $$l$$ 로 같다고 하면__
+ __$$F^{f'} \subseteq \hat{F^f} \subseteq E_{f'}$$ 를 만족하게 됨__

이에 대한 증명은 
+ 뒤쪽 부등식은 E_{f'} 가 E_{f} 에서 병목간선을 뺀것이므로 자명하고
+ 앞쪽 부등식은 어떤 $$(u, v) \in F^{f'} \backslash \hat{F^f} $$ 가 존재하지 않음을 보임으로 가능함.
  + $$(u, v) \in  F^{f'}$$ 라면 $$d_{f'}(s, u) + 1 + d_{f'}(v, t) = l$$ 이 됨.
  + 이러한 $$(u, v)$$ 가 만약 $$(u, v) \in E_f$$ 라고 하면
    + $$ d_{f}(s, u) + 1 + d_{f}(v, t) \leq d_{f'}(s, u) + 1 + d_{f'}(v, t) = l $$ 를 거리의 증가성으로 만족하고, $$G_f$$ 의 Augmenting Path 의 최단거리는 $$l$$ 보다 작을 수 없기 때문에 이 식은 등식이 됨.
    + 그러면 $$(u, v)$$ 는 최단거리를 지나므로 $$(u, v) \in F^f$$ 가 됨
    + $$(u, v) \in F^{f'} \subseteq E_{f'}$$ 이므로 $$ f' := f \uparrow f_{P} $$ 과정에서 사라지는 간선은 $$(u, v)$$ 가 아니고, 이런 간선을 $$F^f$$ 에서 뺀게 $$\hat{F^f}$$ 이므로, 우리가 보일 것은 존재하지 않음.
  + 이러한 $$(u, v)$$ 가 만약 $$(u, v) \notin E_f$$ 라고 하면
    + Residual Network 의 특성 상 $$(v, u) \in E_f$$ 이고 $$P$$ 위에서 업데이트 된 것임.
    + 따라서 최단거리 즉, $$ d_{f}(s, v) + 1 + d_{f}(u, t) = l $$ 을 만족함.
    + 그러면 $$ (d_{f}(s, v) + 1 + d_{f}(u, t)) + (d_{f'}(s, u) + 1 + d_{f'}(v, t)) = 2l $$ 인데 
    + $$ 2l = d_{f}(s, u) + d_{f}(u, t) + d_{f}(s, v) + d_{f}(v, t) \leq (d_{f}(s, v) + d_{f}(u, t)) + (d_{f'}(s, u) + d_{f'}(v, t)) $$ 이니까 $$ 2l + 2 \leq 2l $$ 로 모순임

그러므로 $$ f' := f \uparrow f_{P} $$ 후에도 $$G_{f'}$$ 의 최단 Augmenting Path 의 길이가 같다면 
+ $$\hat{F^{f'}}$$ 는 모든 최단 Augmenting Path 를 포함하고
+ $$\hat{F^{f'}}$$ 의 $$s$$에서 $$t$$로 가는 길은 모두 $$E_{f'}$$ 에 포함되어 최단 Augmenting Path 이므로
+ $$\hat{F^{f'}}$$ 의 $$s$$에서 $$t$$로 가는 길은 최단 Augmenting Path 임.
+ 만약 $$s$$에서 $$t$$로 가는 길이 존재하지 않으면 Layered 가 하나 더 필요하므로 Network Layer 를 새로 만들어야함.


#### 시간복잡도


+ Layered Network 는 최대 Layer 가 1개짜리부터 최대 $$\mid V \mid - 1$$ 짜리까지 만들어야하므로 O($$\mid V \mid$$) 번임.
  + Layered Network 는 만드는데 BFS 를 써서 O($$\mid E \mid $$) 걸림.
  + Layered Network 는 $$f := f \uparrow f_p$$ 마다 병목간선 하나는 없어지기 때문에 최대 O($$\mid E \mid$$) 번 Update 해서 재사용할 수 있음 
    + $$f := f \uparrow f_p$$ 를 하기위해선 $$s$$ 에서 $$t$$ 로 가는 경로를 찾아야함
      + DFS 로 중간에 막힘없이 바로 찾으면 O($$\mid V \mid$$)
      + 중간에 막힌건 다시 안찾아가게 마크하므로 Layered Network 당 O($$\mid E \mid$$) 므로 상관없음.
    + $$f := f \uparrow f_p$$ 를 하는데 O($$\mid V \mid$$) 
    + Layered Network Update 에 O($$\mid V \mid$$) 
+ 정리하면 O($$ \mid V \mid  \times \mid E \mid  \times \mid V \mid $$)


### 코드

[이 문제](https://www.acmicpc.net/problem/2367) 를 푼 것으로, 인풋 빼면 거의 공식임.

{% highlight c++ %}

const int MAX_IN = 400;

vector<int> lines[MAX_IN];
int c[MAX_IN][MAX_IN], f[MAX_IN][MAX_IN], layer[MAX_IN], prune[MAX_IN];
const int T = 0, S = 1;

bool BFS()
{
	fill(layer, layer + MAX_IN, -1);
	layer[S] = 0;
	
	queue<int> works;
	works.push(S);
	while (!works.empty())
	{
		int cur = works.front();
		works.pop();

		for (auto l : lines[cur])
			if (c[cur][l] - f[cur][l] > 0 && layer[l] == -1)
			{
				layer[l] = layer[cur]+1; 
				works.push(l);
			}
	}

	return layer[T] != -1;
}

int DFS(int cur, int fp)
{
	if (cur == T) return fp;

	for (int &i = prune[cur]; i < lines[cur].size(); i++)
	{
		int l = lines[cur][i];
		if (layer[cur] + 1 == layer[l] &&  c[cur][l] - f[cur][l] > 0)
		{
			int res = DFS(l, min(c[cur][l] - f[cur][l], fp));
			if (res > 0)
			{
				f[cur][l] += res;
				f[l][cur] -= res;
				return res;
			}
		}
	}

	return 0;
}

int Dinitz()
{
	int ans = 0;
	while (BFS())
	{
		fill(prune, prune + MAX_IN, 0);
		while (1)
		{
			int flow = DFS(S, 1e9);
			if (flow == 0)
				break;
			ans += flow;
		}
	}

	return ans;
}

int main()
{
	fastio;

	int n, k, d;
	cin >> n >> k >> d;

	// 2~d+1 는 음식 노드
	for(int i = 2; i < 2+d; i++)
	{
		cin >> c[i][T];
		lines[i].push_back(T); lines[T].push_back(i);
	}

	// d+2~n+d+1 는 사람노드
	for (int i = d+2; i < n+d+2; i++)
	{
		int t1, t2;
		cin >> t1;
		while (t1--)
		{
			cin >> t2; t2 += 1;
			lines[i].push_back(t2); lines[t2].push_back(i);
			lines[S].push_back(i); lines[i].push_back(S);
			c[i][t2] = 1;
			c[S][i] = k;
		}
	}

	cout << Dinitz();
}

{% endhighlight c++ %}

<br/>

Edmonds-Karp 와 비슷한 논리를 사용하고 다음이 좀 다름.
+ BFS 로 ```layer``` 로 각 정점마다 몇번째 layer 인지 저장함
+ DFS 로 현재 정점에서 다음 정점으로 갈 때 layer 가 증가하는지 판단함
  + 이때 한번 탐색한 길은 다시 가지 않아야함.
  + 이게 ```prune``` 으로 각 정점별로 Adjacent List 에서 탐색 중인 인덱스를 유지함.

이 문제 기준으로 결과는 다음과 같음
+ |  | Edmonds-Karp | No Prune Dinitz | Prune Dinitz |
|---:|:---:|:---:|:---:|
|  결과(ms) |144 |16 |4 |
