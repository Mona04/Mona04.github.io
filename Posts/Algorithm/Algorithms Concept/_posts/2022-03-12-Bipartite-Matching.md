---
excerpt: "이분탐색"
categories: Algorithm
tag: [PS. Network Flow]
use_math: true
---

<br/>

[가젤 블로그의 글](https://gazelle-and-cs.tistory.com/35?category=794321)

[Wiki](https://en.wikipedia.org/wiki/Hopcroft%E2%80%93Karp_algorithm)

위 글이 매우 잘 정리되어 있고, 여기에는 상기용으로 요점만 메모?함.

## Matching 에서의 Augmenting Path

#### Matching

> 임의의 그래프 $$G = (V, E)$$ 에 대해서, 부분집합 $$ M \subseteq E $$ 의 모든 간선이 정점을 공유하지 않을 때 이를 Matching 이라고 부름.

+ __Maxinum Matching Problem__

#### Vertex Cover

> 임의의 그래프 $$G = (V, E)$$ 에 대해서, $$ U \subseteq V $$ is __vertex cover__ iff  every $$(u, v) \in E$$ satisfy $$u \in U \text{ or } v \in U $$. 

+ 간선과 연결되지 않는 잉여 정점이 $$U$$ 에 있어도 되고
+ 간선을 이루는 모든 정점이 $$U$$ 에 있어도 됨.
+ __Minimum Vertex Cover Problem__

#### Symmetric Difference 

> $$\begin{multline} \shoveleft A \oplus B = (A \backslash B) \cup (B \backslash A) \end{multline} $$ 

+ 대칭차집합으로도 불리며 Xor 비슷한 것임.


#### Augmenting Path

> Matching $$M \subseteq E$$ 이 주어졌을 때 <br/>
$$k \in V$$ is __exposed__ iff $$k$$ satisfies $$k \neq u$$ and $$k \neq v $$  for any $$(u, v) \in M$$ <br/>
$$M$$ 과 $$E \backslash M$$ 에 속하는 edge 가 번갈아가면서 나타나는 경로를 __Alternative path__ 라고 함  <br/>
처음과 끝이 exposed vertex 인 alternative path 를 __Augmenting Path__ 라고 함. 

+ Augmeting Path 에서 $$E \backslash M$$ 인 부분은 Forward, $$M$$ 인 부분은 Backward Edge 임.
+ exposed vertex 의 순서쌍마다 각각을 시작과 끝점으로 삼은 Bidirected Network Flow 가 있다고 보면 됨.


Matching $$M$$ 과 Alternative Path 인 $$P$$ 에 대해서 $$M \oplus P$$ 를 할 수 있음.
+ 이는 Networkflow 에서 증가연산하는 것과 똑같음.
+ $$M \oplus P$$ 를 하면 Matching Count 를 1 만큼 올려줌.
  + 상식적으로 해보면 그렇기도 하고
  + capacity of all edge is 1 이기도 하고.

#### Augmenting Path 와 Maximum Matching

> Augmenting Path does not exist iff $$M$$ is Maximum Matching

+ 최대매칭에서 Augmenting Path 가 존재하면 $$M \oplus P$$ 가 가능해 최대매칭이 아니라서 모순. 
+  Augmenting Path 가 존재하지 않으면 경우를 나눌 수 있음.
    + exposed vertex 가 2개 미만이면 Maximum Matching 임.
    + exposed vertex 가 2개 이상이면 
        + 가능한 순서쌍이 Network Flow 의 시작점, 끝점이라고 생각할 수 있음.
        + 구성 가능한 모든 Network Flow 에서 Augmenting Path 가 없다는 것이므로 최대매칭임.

#### Augmenting Path 성질 1

> 임의의 Matching 을 $$M$$ 이라고 하고, Maximum Matching 을 $$M^*$$ 라고 하면 <br/> 
__적어도 하나의 Augmenting Path 는 $$2 \left\lfloor \cfrac{\vert M \vert }{\vert M^* \vert - \vert M \vert }  \right\rfloor + 1$$ 의 길이를 넘지 않음__

$$M \oplus M^*$$ 에는 최소한 $$\vert M^* \vert - \vert M \vert $$ 만큼 __서로 정점을 공유하지 않는__ Augmenting Path 가 존재함
+ $$M^*$$ 에 있는 간선은 모두 $$\vert M^* \vert $$ 개로 서로 떨어져 있고, $$M$$ 에 대해서 모두 Augmenting Path 임.
+ Num of $$e$$ that satisfies $$e \in M \text{ and } e \in M^*$$ 만큼 간선을 떼내야함.
+ Num of $$e$$ that satisfies $$e \in M \text{ and } e \notin M^*$$ 의 수만큼 간선이 합쳐짐.
  + 이때 합쳐진 결과는 Path 또는 Cycle 임.
  + 전자는 최악의 경우 Path 를 합쳐서 Augmenting Path 의 후보군 숫자를 하나 줄임.
  + 후자의 길이가 짝수인 경우 Augmenting Path 가 아니게 됨.
+ 두 경우를 모두 고려해서 $$M \oplus M^*  $$ 를 추적하면 최소한 $$\vert M^* \vert - \vert M \vert $$ 만큼의 Augmenting Path 가 서로 정점을 공유하지 않고 존재함.
 
Augmenting Path 의 길이의 합은 최대 $$2 \vert M \vert + 1$$ 만큼 가능하고, 그 길이는  $$M$$ 에서 온게 반절이고, $$M^*$$ 에서 온 것은 양쪽 끝이어야 하므로 하나가 더 많음.
+ 이를 비둘기집 원리로 적어도 하나의 Augmenting Path 에 대해서 $$M$$ 에서 온 간선은 $$\cfrac { \vert M \vert  } {\vert M^* \vert - \vert M \vert } $$ 보다는 작거나 같음.
+ 여기에 $$M^*$$ 에서 온 것은 1을 더하면 되므로 위 부등식이 증명됨.


#### Augmenting Path 의 성질 2

> 임의의 matching $$M$$ 에 대한 __가장 짧은__ Augmenting Path $$P$$ 에 대해서 <br/>
  $$M \oplus P$$ 에 대한 __임의의__ Augmenting Path 를 $$P'$$ 라고 하면 <br/>
  __$$ \vert P' \vert  \geq   \vert P \vert + \ 2 \vert P \cap P' \vert $$__ 가 됨. 


+ $$M$$ 에 다음처럼 대칭차연산을 두번한 것을 $$M' := M \oplus P  \oplus P' $$ 라고 함.
+ $$M \oplus M'$$ 를 한다면 성질 1 에서 본 것과 비슷하게 Augmenting Path 가 최소한 2개가 존재함.
+ 덧붙여 $$P$$ 는 최소거리므로  $$ \vert M \oplus M' \vert \geq 2 \vert P \vert $$  가 됨.
+ 그리고 $$M \oplus M' = M \oplus M \oplus P  \oplus P' = \emptyset \oplus P  \oplus P' =  P  \oplus P' $$ 임.


#### Augmenting Path 의 성질 2-2

가장 짧은 Augmenting Path $$P_1, P_2 \text{ ... } $$ 를 선택해 $$M \oplus P$$ 수행할 때 
1. $$M \oplus P$$ 의 반복마다 $$\vert P \vert$$ 는 같거나 더 길어짐
2. 임의의 서로다른 $$P_i$$ , $$P_j$$ 는 길이가 같다면 정점을 공유하지 않음.
    + 한쪽이 Matching $$M$$ 에서 가장 길이가 짧은 Augmenting Path 가 되도록, $$M \oplus P$$ 를 계속 수행한 후에 위 정리를 이용하면 됨. 
    + __겹치지 않으므로 같은 길이의 Layer 는 동시에 구해도 된다는 근거가 됨__

#### Augmenting Path 의 길이의 수

> __최단거리를 골라서 찾아간다면__ $$\vert P_1 \vert, \vert P_2 \vert, ... \vert P_k \vert $$ 의 서로다른 길이의 갯수는 $$ 2 \left\lfloor \sqrt{k} \right\rfloor+ 2 $$ 가 최대임.

$$ t = \left\lfloor k - \sqrt{k} \right\rfloor $$ 라고 하면
+ $$\vert P_1 \vert, \vert P_2 \vert, ... \vert P_t \vert $$ 까지는 총 O($$\sqrt{k}$$) 개가 있음.
  + $$ \vert P_t \vert \leq 
  2 \left\lfloor \cfrac{\vert M_t \vert }{\vert M_k \vert - \vert M_t \vert }  \right\rfloor + 1
  = 2 \left\lfloor \cfrac{ t}{ k - t }  \right\rfloor + 1 \leq 2 \left\lfloor \sqrt{k} \right\rfloor + 1 $$ 를 만족함.
  + $$M_t$$ 에서 위 부등식을 만족하는 Augmenting Path 가 적어도 하나 있고 
  + 우리는 최단거리부터 잡기 때문임.
+ $$\vert P_t+1 \vert, \vert P_t+2 \vert, ... \vert P_k \vert $$ 까지는 총 O($$\sqrt{k}$$) 개가 있음.
  + $$k - t + 1 = \left\lceil \sqrt{k} \right\rceil$$ 이므로, 최악의 경우로 모두 다르다고 해도 O($$\sqrt{k}$$) 이기 때문임.



## 이분매칭

#### Bipartite Graph

$$G = (L \cap U, E)$$ is a bipartite graph iff every $$(u, v) \in E$$ satisfy $$(u \in L \text{ and } v \in R )$$ or $$(v \in L \text{ and } u \in R)$$
+ Bipartite Matching Problem(이분탐색)

#### Kőnig's theorem

어떤 그래프 $$G$$, 그것의 Matching 을 $$M$$, Vertex Cover 를 $$G$$ 라고 하면 $$ \vert M \vert \leq \vert U \vert $$ 를 만족함.
+ 그러면 만약 등식이 성립한다면 각각 최대 최소가 될 것임.
+ 하지만 그 역인, 모든 그래프에서 등식이 성립한다는 것은 틀림.

그리고 Bipartite graph 에서 Maximum Matching 과 Minimal Vertex Cover 은 똑같다는 것이 쾨니그의 정리.



## Algorithms

이하는 [이 문제](https://www.acmicpc.net/problem/11376) 문제에 대한 코드임.

#### Input

{% highlight c++ %}

const int MAX_IN = 1001;
int n;
vector<int> lines[MAX_IN];

void Input()
{
    int m;
    cin >> n >> m;
    for (int i = 1; i <= n; i++)
    {
        int njob, job;
        cin >> njob;
        for (int j = 0; j < njob; j++)
        {
            cin >> job;
            lines[i].push_back(job);
        }
    }
}

{% endhighlight c++ %}

이하에서 코드를 간략하게 보여주기 위해 따로 뺌. 그냥 Input 부분 처리임.



### DFS

#### 코드 

{% highlight c++ %}

const int MAX_IN = 1001;

int n;
vector<int> lines[MAX_IN];
bool V[MAX_IN]; int B[MAX_IN];

bool DFS(int cur)
{
    if (V[l]) return false;          // DFS 에서 visit 확인. 
    V[l] = true;
        
    for (int l : lines[cur])
    {        
        if (B[l] == 0 || dfs(B[l]))  // exposed vertex 가 나올때까지 dfs
        {
            B[l] = cur;
            return true;
        }
    }
    return false;
}

int main()
{
	Input();
	
    int count = 0;
    for (int cnt = 0; cnt < 2; cnt++)
	    for (int i = 1; i <= n; i++)
		{
        	fill(V, V + MAX_IN, false);
        	if (DFS(i)) count++;
    	}
    
    printf("%d\n", n - count);
}

{% endhighlight c++ %}

#### 설명

##### Augmenting Path 를 찾는 원리

+ 이분매칭의 특징상 Forward Edge 는 매칭안된 edge 이고, Backward Edge 는 매칭된 edge 임.
  +  $$G = (L \cup R, E)$$ 에서 $$L$$ 과 $$R$$ 각각 하나씩 exposed vertex 가 존재 가능함

+ 우리는 시작과 끝이 exposed vertex 와 연결된 Alternative Path 를 찾아야함.
  +  $$L$$ 의 정점은 처음 사용하는 경우  ```B[]``` 에 없으므로 exposed vertex 임.
  + ```DFS()``` 의 ```B[l] == 0``` 이면 ```l``` 은 exposed vertex 임.

+ ```B[l] -> l``` 를 ```cur -> l``` 로 바꿈으로서 $$ M \oplus P $$ 를 수행함.


##### 이전 정점에서 다시 Augmenting Path 가 존재하는지 확인할 필요가 있을까?

+ 이전 정점이 Match 되었다면, Augmenting Path 로 영향을 받아도 여전히 Match 된 상태임.
+ 이전 정점이 Match 되지 않았다면
  + 우리는 $$L$$ 부분의 exposed vertex 를 이용해 $$R$$ 부분의 exposed vertex 를 탐색하기 때문에 이 정점은 여전히 exposed vertex 임.
  + 또한 Match 불가능이라는 점에서, 이 정점과 연결된 정점들에서부터 __탐색 가능한 모든__ Alternative Path 는 exposed vertex 와 연결되어 있지 않음.
  + 이는 어떤 $$L$$ 에 속한 exposed vertex 를 통해 다시 탐색해도 마찬가지임. 
  + 그러므로 다시 검사해도 Augmenting Path 는 존재하지 않음.

##### 시간 복잡도

+ DFS 에서 최대 깊이는 $$\vert E \vert$$ 이고 각 정점마다 검사하므로 시간복잡도는 O($$\vert V \vert \vert E \vert $$) 임.


### Hopcroft Karp Algorithms

#### 코드

{% highlight c++ %}

const int MAX_IN = 1001;

int n;
vector<int> lines[MAX_IN];
bool A[MAX_IN]; int B[MAX_IN], layer[MAX_IN];

bool BFS()
{
	queue<int> works;

	for (int i = 1; i <= n; i++)
	{
		if (!A[i]) {
			layer[i] = 0;
			works.push(i);
		}
		else layer[i] = -1;
	}

	while (!works.empty())
	{
		int cur = works.front();
		works.pop();

		for (auto l : lines[cur])
			if (layer[B[l]] == -1)
			{
				layer[B[l]] = layer[cur] + 1;
				works.push(B[l]);
			}
	}

	return true;
}

bool DFS(int cur)
{
	for (int l : lines[cur])
	{
		if (B[l] == 0 || (layer[cur] + 1 == layer[B[l]] && DFS(B[l])))
		{
			A[cur] = true;
			B[l] = cur;
			return true;
		}
	}

	return false;
}

int Hopcroft_Karp()
{
	int ans = 0;

	while (BFS())  // sqrt(n)
	{
		int flow = 0;
		for (int i = 1; i <= n; i++)   
			if (!A[i] && DFS(i))   
				flow++;
		if (!flow) break;
		ans += flow;
	}

	return ans;
}

int main()
{
	Input();
	
	int ans = n;
	ans -= Hopcroft_Karp();
	fill(A, A + MAX_IN, 0);
	ans -= Hopcroft_Karp();
	cout << ans;
}

{% endhighlight c++ %}

<br/>

#### 설명

+ 각각의 exposed vertex 에서부터 가능한 Alternative Path 를 BFS 를 수행해 탐색함.
+ 그리고 exposed vertex 로부터의 $$L$$ 에 속한 vertex 마다 가장 가까운 거리를 ```layer[]``` 에 기록함.
  + ```layer[]``` 값에 맞추어 DFS 를 하면 __겹치는 Augmenting Path 중에 가장 짧은 것이 선택됨.__
+ 한번의 BFS Phase 에서 여러 길이의 Augmenting Path 가 나올 수도 있음
  + 이때 DFS 로 얻는 Augmenting Path 는 모두 독립적임. (겹치면 ```layer[]``` 가 달라서 못가니까)
  + 독립적인 Augmenting Path 는 $$M \oplus P$$ 의 순서를 다르게 해도 결과가 같음.
  + 어떤 BFS Phase 에서 가능한 Augmenting Path 는 이전 Phase 의 Augmenting Path 와 겹치는 경우 길이가 같거나 더 길게됨. 
  + 그러므로 여러 길이를 한번해 처리해도 가장 가까운 것부터 처리하는 것과 같은 결과임


#### 시간복잡도

+ Augmenting Path 의  서로 다른 길이의 갯수만큼 이하를 시행 => 총 O($$\sqrt{ \vert V \vert }) $$)  
  + BFS 로 Layer 를 만드는 시간 => O($$E$$)
  + DFS 로 각 exposed vertex 로 시작하는 Augmenting Path 를 찾는 시간 => O($$\vert E \vert$$)
    + Dinitz 처럼 Layered Network 당 DFS 의 Visit 를 체크하면 복잡하게 생각 안해도 Phase 마다 O($$\vert E \vert $$) 가 보장됨.
      + DFS 에서 설명했듯 어떤 정점에서부터 $$R$$ 에 속한 exposed vertex 를 탐색하지 못했다면 다른 어떤 $$L$$ 에 속한 exposed vertex 가 와도 불가능하기 때문임.
    + 그게 아니더라도 ```layer[]``` 를 따라 가므로 탐색 당 $$\vert V \vert$$ 이상의 탐색을 못하고 이걸 exposed vertex 의 수만큼 반복하기 때문에 O($$\vert V \vert ^2 $$) 임. 
+ 정리하면 O($$(\vert \vert E \vert) \sqrt{\vert V \vert}$$)


### 결과 비교

|         | DFS | Hopcroft |
|:------:|:---:|:---:|
|결과(ms)|1056|120|