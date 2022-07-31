---
excerpt: "이분매칭"
tag: [PS. Network Flow]
use_math: true
---

<br/>

[가젤 블로그의 글](https://gazelle-and-cs.tistory.com/35?category=794321)

[Wiki](https://en.wikipedia.org/wiki/Hopcroft%E2%80%93Karp_algorithm)

위 글이 매우 잘 정리되어 있고, 여기에는 상기용으로 요점만 메모?함.

## Matching 에서의 Augmenting Path

#### Matching

> 임의의 그래프 $$G = (V, E)$$ 에 대해서, 부분집합 $$ M \subseteq E $$ 의 모든 간선이 정점을 공유하지 않을 때 이를 Matching 이라고 부른다.

+ __Maxinum Matching Problem__

#### Bipartite Graph

$$G = (L \cup R, E)$$ is a __bipartite graph__ iff every $$(u, v) \in E$$ satisfy $$(u \in L \text{ and } v \in R )$$ or $$(v \in L \text{ and } u \in R)$$
+ __Bipartite Matching Problem__


#### Symmetric Difference 

> $$\begin{multline} \shoveleft A \oplus B = (A \backslash B) \cup (B \backslash A) \end{multline} $$ 

+ 대칭차집합으로도 불리며 Xor 비슷하다.


#### Augmenting Path

> Matching $$M \subseteq E$$ 이 주어졌을 때 <br/>
$$k \in V$$ is __exposed__ iff $$k$$ satisfies $$k \neq u$$ and $$k \neq v $$  for any $$(u, v) \in M$$ 

> $$M$$ 과 $$E \backslash M$$ 에 속하는 edge 가 번갈아가면서 나타나는 경로를 __Alternative path__ 라고 한다. 

> 처음과 끝이 exposed vertex 인 alternative path 를 __Augmenting Path__ 라고 한다.

+ Augmeting Path 에서 $$E \backslash M$$ 인 부분은 Forward, $$M$$ 인 부분은 Backward Edge 에 속하게 된다.
+ exposed vertex 의 순서쌍마다 각각을 시작과 끝점으로 삼은 Bidirected Network Flow 가 있다고 보면 편하다.

Matching $$M$$ 과 Alternative Path 인 $$P$$ 에 대해서 $$M \oplus P$$ 를 할 수 있다.
+ 이는 Networkflow 에서 증가연산하는 것과 똑같다.
+ $$M \oplus P$$ 를 하면 Matching Count 를 1 만큼 올려준다.
  + 상식적으로 해보면 그렇기도 하고
  + capacity of all edge is 1 이기도 하고.


#### Augmenting Path 와 Maximum Matching

> Augmenting Path does not exist iff $$M$$ is Maximum Matching

+ 최대매칭에서 Augmenting Path 가 존재하면 $$M \oplus P$$ 가 가능해 최대매칭이 아니라서 모순. 
+ Augmenting Path 가 존재하지 않으면 경우를 나눌 수 있다.
    + exposed vertex 가 2개 미만이면 Maximum Matching 이다.
    + exposed vertex 가 2개 이상이면 
        + 가능한 exposed vertex 의 순서쌍이 Network Flow 의 시작점, 끝점이라고 생각할 수 있다.
        + 구성 가능한 모든 Network Flow 에서 Augmenting Path 가 없다는 것으로 최대매칭이다.

#### Augmenting Path 성질 1

> 임의의 Matching 을 $$M$$ 이라고 하고, Maximum Matching 을 $$M^*$$ 라고 하면 <br/> 
__적어도 하나의 Augmenting Path 는 $$2 \left\lfloor \cfrac{\vert M \vert }{\vert M^* \vert - \vert M \vert }  \right\rfloor + 1$$ 의 길이를 넘지 않는다.__

$$M \oplus M^*$$ 에는 최소한 $$\vert M^* \vert - \vert M \vert $$ 만큼 __서로 정점을 공유하지 않는__ Augmenting Path 가 존재한다.
+ $$M^*$$ 에 속하는 간선이 끝부분이고 $$M$$ 에 속하는 간선과 번갈아가면서 생기는 Path 는 $$M$$ 에서  $$M^*$$ 가 되기 위한  Augmenting Path 이다. $$M^*$$ 에서  $$M \oplus M^*$$ 의 과정에서 남게되는 Augmenting Path 를 추적해보자.
+ $$M^*$$ 에 있는 간선은 모두 $$\vert M^* \vert $$ 개로 서로 떨어져 있다. 
+ Num of $$e$$ that satisfies $$e \in M \text{ and } e \in M^*$$ 만큼 간선을 떼내야 한다.
+ Num of $$e$$ that satisfies $$e \in M \text{ and } e \notin M^*$$ 의 수만큼 간선이 합쳐진다.
  + 이때 합쳐진 결과는 Path 또는 Cycle 이다.
  + 전자는 최악의 경우 Path 를 합쳐서 Augmenting Path 의 후보군 숫자를 하나 줄인다.
  + 후자의 길이가 짝수인 경우 Augmenting Path 가 아니게 된다.
+ 두 경우를 모두 고려해서 $$M \oplus M^*  $$ 를 추적하면 최소한 $$\vert M^* \vert - \vert M \vert $$ 만큼의 Augmenting Path 가 서로 정점을 공유하지 않고 존재하게 된다.

Augmenting Path 의 길이는 최대 $$2 \vert M \vert + 1$$ 만큼 가능하다. 그 길이는  $$M$$ 에서 온게 반절이고, $$M^*$$ 에서 온 것은 양쪽 끝이어야 하므로 하나가 더 많다.
+ 이를 비둘기집 원리로 적어도 하나의 Augmenting Path 에 대해서 $$M$$ 에서 온 간선은 $$\cfrac { \vert M \vert  } {\vert M^* \vert - \vert M \vert } $$ 보다는 작거나 같다.
+ 여기에 $$M^*$$ 에서 온 것은 1을 더하면 되므로 위 부등식이 증명된다.


#### Augmenting Path 의 성질 2

> 임의의 matching $$M$$ 에 대한 __가장 짧은__ Augmenting Path $$P$$ 에 대해서 <br/>
  $$M \oplus P$$ 에 대한 __임의의__ Augmenting Path 를 $$P'$$ 라고 하면 <br/>
  __$$ \vert P' \vert  \geq   \vert P \vert + \ 2 \vert P \cap P' \vert $$__ 이다.


+ $$M$$ 에 다음처럼 대칭차연산을 두번한 것을 $$M' := M \oplus P  \oplus P' $$ 라고 한다.
+ $$M \oplus M'$$ 를 한다면 성질 1 에서 본 것과 비슷하게 Augmenting Path 가 최소한 2개가 존재한다.
+ 덧붙여 $$P$$ 는 최소거리므로  $$ \vert M \oplus M' \vert \geq 2 \vert P \vert $$  가 된다.
+ 그리고 $$M \oplus M' = M \oplus M \oplus P  \oplus P' = \emptyset \oplus P  \oplus P' =  P  \oplus P' $$ 이므로 위 식에 대입하면 원하는 결과가 나온다.


#### Augmenting Path 의 성질 2-2

가장 짧은 Augmenting Path $$P_1, P_2 \text{ ... } $$ 를 선택해 $$M \oplus P$$ 수행할 때 
1. $$M \oplus P$$ 의 반복마다 $$\vert P \vert$$ 는 같거나 더 길어진다.
2. 임의의 서로다른 $$P_i$$ , $$P_j$$ 는 길이가 같다면 정점을 공유하지 않는다.
  + __겹치지 않으므로 같은 길이의 Layer 는 동시에 구해도 된다는 근거가 된다.__

#### Augmenting Path 의 길이의 수

> __최단거리를 골라서 찾아간다면__ $$\vert P_1 \vert, \vert P_2 \vert, ... \vert P_k \vert $$ 의 서로다른 길이의 갯수는 $$ 2 \left\lfloor \sqrt{k} \right\rfloor+ 2 $$ 가 최대이다.

$$ t = \left\lfloor k - \sqrt{k} \right\rfloor $$ 일 때 최단거리부터 Augmenting Path 를 찾아 대칭차 연산을 한다고 하자.
+ $$\vert P_1 \vert, \vert P_2 \vert, ... \vert P_t \vert $$ 의 서로다른 값은 총 O($$\sqrt{k}$$) 개가 있다.
  + $$ \vert P_t \vert \leq 
  2 \left\lfloor \cfrac{\vert M_t \vert }{\vert M_k \vert - \vert M_t \vert }  \right\rfloor + 1
  = 2 \left\lfloor \cfrac{ t}{ k - t }  \right\rfloor + 1 \leq 2 \left\lfloor \sqrt{k} \right\rfloor + 1 $$ 를 만족하기 때문이다.
  + Augmenting Path 는 양 끝이 exposed 되어야해서 홀수이므로 $$\left\lfloor \sqrt{k} \right\rfloor + 1 $$ 만큼 가능하다.
+ $$\vert P_t+1 \vert, \vert P_t+2 \vert, ... \vert P_k \vert $$ 까지는 총 O($$\sqrt{k}$$) 개가 있다.
  + $$k - t + 1 = \left\lceil \sqrt{k} \right\rceil$$ 이므로, 최악의 경우로 모두 다르다고 해도 $$\left\lceil \sqrt{k} \right\rceil$$ 만큼 가능하다.



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

이하에서 코드를 간략하게 보여주기 위해 따로 뺏다. 그냥 Input 부분 처리이다.



### DFS

#### 코드 

{% highlight c++ %}

const int MAX_IN = 1001;

int n;
vector<int> lines[MAX_IN];
bool V[MAX_IN]; int B[MAX_IN];

bool DFS(int cur)
{
    if (V[cur]) return false;          // DFS 에서 visit 확인. 
    V[cur] = true;
        

    for (int l : lines[cur])
    {        
        if (B[l] == 0 || DFS(B[l]))  // exposed vertex 가 나올때까지 dfs
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

+ 이분매칭의 특징상 Forward Edge 는 매칭안된 edge 이고, Backward Edge 는 매칭된 edge 이다.
  +  $$G = (L \cup R, E)$$ 에서 $$L$$ 과 $$R$$ 각각 하나씩 exposed vertex 가 존재 가능하다.

+ 우리는 시작과 끝이 exposed vertex 와 연결된 Alternative Path 를 찾아야한다.
  +  $$L$$ 의 정점은 처음 사용하는 경우  ```B[]``` 에 없으므로 exposed vertex 이다.
  + ```DFS()``` 의 ```B[l] == 0``` 이면 ```l``` 은 exposed vertex 이다.

+ ```B[l] -> l``` 를 ```cur -> l``` 로 바꿈으로서 $$ M \oplus P $$ 를 수행한다.


##### 이전 정점에서 다시 Augmenting Path 가 존재하는지 확인할 필요가 있을까?

+ 이전 정점이 Match 되었다면, Augmenting Path 로 영향을 받아도 여전히 Match 된 상태이다.
+ 이전 정점이 Match 되지 않았다면
  + 우리는 $$L$$ 부분의 exposed vertex 를 이용해 $$R$$ 부분의 exposed vertex 를 탐색하기 때문에 이 정점은 여전히 exposed vertex 이다.
  + 또한 Match 불가능이라는 점에서, 이 정점과 연결된 정점들에서부터 __탐색 가능한 모든__ Alternative Path 는 exposed vertex 와 연결되어 있지 않다.
  + 이는 어떤 $$L$$ 에 속한 exposed vertex 를 통해 다시 탐색해도 마찬가지이다.
  + 그러므로 다시 검사해도 Augmenting Path 는 존재하지 않는다.

##### 시간 복잡도

+ DFS 에서 최대 깊이는 $$\vert E \vert$$ 이고 각 정점마다 검사하므로 시간복잡도는 O($$\vert V \vert \vert E \vert $$) 이다.


### Hopcroft Karp Algorithms

#### 코드

{% highlight c++ %}

const int MAX_IN = 1001;

int n;
vector<int> lines[MAX_IN];
bool A[MAX_IN];  // Match 되었는가
int B[MAX_IN];   // Match 된 A 정점
int layer[MAX_IN];

bool BFS()
{
	queue<int> q;

	for (int i = 1; i <= n; i++)
	{
		if (!A[i]) {
			layer[i] = 0;
			q.push(i);
		}
		else layer[i] = -1;
	}
	
	while (!q.empty())
	{
		int cur = q.front();
		q.pop();
	
		for (auto l : lines[cur])
			if (layer[B[l]] == -1)
			{
				layer[B[l]] = layer[cur] + 1;
				q.push(B[l]);
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

+ 각각의 exposed vertex 에서부터 가능한 Alternative Path 를 BFS 를 수행해 탐색한다.
+ 그리고 exposed vertex 로부터의 $$L$$ 에 속한 vertex 마다 가장 가까운 거리를 ```layer[]``` 에 기록한다.
  + ```layer[]``` 값에 맞추어 DFS 를 하면 __겹치는 Augmenting Path 중에 가장 짧은 것이 선택된다.__
+ 한번의 BFS Phase 에서 여러 길이의 Augmenting Path 가 나올 수도 있다.
  + 이때 DFS 로 얻는 Augmenting Path 는 모두 독립적이다. (겹치면 ```layer[]``` 가 달라서 못가니까)
  + 독립적인 Augmenting Path 는 $$M \oplus P$$ 의 순서를 다르게 해도 결과가 같다.
  + 어떤 BFS Phase 에서 가능한 Augmenting Path 는 이전 Phase 의 Augmenting Path 와 겹치는 경우 길이가 같거나 더 길게된다.
  + 그러므로 여러 길이를 한번해 처리해도 가장 가까운 것부터 처리하는 것과 같은 결과이다.


#### 시간복잡도

+ Augmenting Path 의  서로 다른 길이의 갯수만큼 이하를 시행 => 총 O($$\sqrt{ \vert V \vert }) $$)  
  + BFS 로 Layer 를 만드는 시간 => O($$E$$)
  + DFS 로 각 exposed vertex 로 시작하는 Augmenting Path 를 찾는 시간 => O($$\vert E \vert$$)
    + Dinitz 처럼 Layered Network 당 DFS 의 Visit 를 체크하면 복잡하게 생각 안해도 Phase 마다 O($$\vert E \vert $$) 가 보장된다.
      + DFS 에서 설명했듯 어떤 정점에서부터 $$R$$ 에 속한 exposed vertex 를 탐색하지 못했다면 다른 어떤 $$L$$ 에 속한 exposed vertex 가 와도 불가능하기 때문이다.
    + 그게 아니더라도 ```layer[]``` 를 따라 가므로 탐색 당 $$\vert V \vert$$ 이상의 탐색을 못하고 이걸 exposed vertex 의 수만큼 반복하기 때문에 O($$\vert V \vert ^2 $$) 이다.
+ 정리하면 O($$(\vert \vert E \vert) \sqrt{\vert V \vert}$$)


### 결과 비교

|         | DFS | Hopcroft |
|:------:|:---:|:---:|
|결과(ms)|1056|120|