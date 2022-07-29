---
excerpt: "std::vector 의 reserve 때문에 망했던 문제"
tag: [PS. Graph, PS. Topological Sort]
use_math: true
---

## 문제

[문제 사이트](https://www.acmicpc.net/problem/13344)

## 방법 1

### 코드

{% highlight c++ %}

const int MAX_IN = 50001;
int rootTB[MAX_IN];
void Init(int n)
{
	for (int i = 0; i <= n; i++) rootTB[i] = i;
}

int Find(int a)
{
	if (rootTB[a] == a) return a;
	return rootTB[a] = Find(rootTB[a]);
}

void Union(int from, int to)
{
	from = Find(from);
	to = Find(to);
	if (from == to) return;
	rootTB[from] = to;
}

vector<pair<int,int>> relates;
vector<int> lines[MAX_IN];
bool res = true;
bool stTB[MAX_IN], edTB[MAX_IN];

void DFS(int cur)
{
	cur = Find(cur);
	stTB[cur] = true;
	for (int l : lines[cur])
	{
		if (!stTB[l]) DFS(l);
		else if (!edTB[l]) res = false;
	}
	edTB[cur] = true;
}

int main()
{
	int n, m;
	cin >> n >> m;

	Init(n);
	
	for (int i = 0; i < m; i++)
	{
		int a, b; char c;
		cin >> a >> c >> b;
		if (c == '=') Union(a, b);
		else {
			if (c == '<') swap(a, b);
			relates.push_back({ a,b });
		}
	}
	for (auto& r : relates) lines[Find(r.first)].push_back(Find(r.second));
	for (int i = 0; i < n; i++) { if (!res) break; if (!stTB[Find(i)]) DFS(i); }
	cout << (res ? "consistent" : "inconsistent");
}

{% endhighlight %}

### 시간 복잡도

O($$\mathrm{N} + \mathrm{M}$$)

### 설명

등호가 붙은 번호끼리 먼저 분리집합을 수행한다. 그리고 미리 저장해놓은 ```<```, ```>``` 에 대한 관계를 분리집합의 대표 번호로 환원해서 그래프의 인접 리스트를 만든다. 그리고 DFS 로 Directed Graph 의 Cycle 을 찾아내면 된다.


## 방법 2 (삽질)

### 코드

{% highlight c++ %}

const int MAX_IN = 50001;
int n_targets[MAX_IN];
vector<int> srcs[MAX_IN];

int rootTB[MAX_IN], sizeTB[MAX_IN];
void Init(int n)
{
	for (int i = 0; i <= n; i++) rootTB[i] = i;
}

int Find(int a)
{
	if (rootTB[a] == a) return a;
	return rootTB[a] = Find(rootTB[a]);
}

bool Union(int from, int to)
{
	from = Find(from);
	to = Find(to);
	if (from == to) return false;
	rootTB[from] = to;
	return true;
}

int main()
{
	fastio;

	int n, m;
	cin >> n >> m;
	Init(n);
	
	for (int i = 0; i < m; i++)
	{
		int a, b; char c;
		cin >> a >> c >> b;
		if (c == '=') {
			Union(a, b);
			continue;
		}
		if (c == '<') swap(a, b);
		srcs[a].push_back(b);
		n_targets[b]++;
	}
	
	for (int i = 0; i < n; i++)
	{
		int dest = Find(i);
		if (dest != i)
		{
			// srcs[dest].reserve(srcs[dest].size() + srcs[i].size());
	        for(int s : srcs[i])  srcs[dest].push_back(s);
			//srcs[i].clear();
			n_targets[dest] += n_targets[i];
			n_targets[i] = -1;
		}
	}
	
	queue<int> q;
	for (int i = 0; i < n; i++)
		if (n_targets[i] == 0) q.push(i);
	
	bool inconsist = false;
	while (!q.empty())
	{
		int cur = q.front(); q.pop();
		cur = Find(cur);
		for (auto l : srcs[cur])
		{
			int ll = Find(l);
			if (ll == cur) {
				inconsist = true;
				break;
			}
			if (--n_targets[ll] == 0)
				q.push(ll);
		}
		if (inconsist) break;
	}
	
	if(!inconsist)
		for(int i = 0; i < n; i++)
			if (n_targets[i] > 0) {
				inconsist = true;
				break;
			}
	cout << (inconsist ? "inconsistent" : "consistent");
}

{% endhighlight %}

### 시간 복잡도

O($$\mathrm{N} + \mathrm{M}$$)

### 설명

맨 처음에 시도했던 방법으로, 위상정렬을 사용하였다. AC 는 나왔지만 3초가 나와서 벙쪘었는데. 나중에 생각해보니 위에서 주석처리한 ```reserve()``` 함수가 문제였다. 왜냐하면 최악의 경우 ```reserve()``` 함수만 거의 ```m``` 번 사용할 수도 있기 때문이다. ```vector``` 의 삽입 함수는 amortized O(n) 이라는 걸 생각해보면 매우 멍청한 짓이었다. 그래서 메모해둔다.