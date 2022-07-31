---
excerpt: "전처리 안하면 빡센 문제"
tag: [PS. Graph]
use_math: true
---

## 문제

[문제 사이트](https://www.acmicpc.net/problem/11112)

### 코드

{% highlight c++ %}

struct E {
	int g;
	char state[9]; int void_p;
};

using Q = queue<E>;
char dest[9] = { '1', '2', '3', '4', '5', '6', '7', '8', '0' }; int64_t dest_code;
unordered_map<uint64_t, int> visitTB;

uint64_t Encode(char* s)
{
	int res = 0;
	for (int i = 0, e = 1; i < 9; i++, e *= 10)
		res += e * (s[i] - '0');
	return res;
}

void Insert(Q& q, E& prev, E& cur, int t, int64_t prev_code)
{
	swap(cur.state[prev.void_p + t], cur.state[prev.void_p]);
	int code = Encode(cur.state);
	if (visitTB.find(code) == visitTB.end())
	{
		cur.void_p += t; cur.g = prev.g + 1; 
		q.push(cur);
		cur.void_p -= t; cur.g = prev.g; 
	}
	swap(cur.state[prev.void_p + t], cur.state[prev.void_p]);
}

void BFS(E& start)
{
	Q q;
	q.push(start);

	while (!q.empty())
	{
		E cur = q.front(); q.pop();
		int64_t cur_code = Encode(cur.state);
		if (visitTB.find(cur_code) != visitTB.end()) continue;
		visitTB[cur_code] = cur.g;

		int x = cur.void_p % 3;
		int y = cur.void_p / 3;
		E tmp = cur;
		if (x > 0) Insert(q, cur, tmp, -1, cur_code);
		if (x < 2) Insert(q, cur, tmp, 1, cur_code);
		if (y > 0) Insert(q, cur, tmp, -3, cur_code);
		if (y < 2) Insert(q, cur, tmp, 3, cur_code);
	}
}

int main()
{
	fastio;

	int T;
	cin >> T;

	dest_code = Encode(dest);
	E start;
	start.g = 0; start.void_p = 8;
	copy(dest, dest + 9, start.state);
	BFS(start);
    
	while (T--)
	{
		for (int i = 0; i < 9; i++)
		{
			cin >> start.state[i];
			if (start.state[i] == '#')
				start.state[i] = '0';
		}
		auto iter = visitTB.find(Encode(start.state));
		if (iter != visitTB.end()) cout << iter->second << '\n';
		else cout << "impossible\n";
	}
}

{% endhighlight %}

### 시간 복잡도

O($$9!$$)

그냥 대충 9칸 짜리 조합으로 계산했음.

실제로는 더 작을 것임.


### 설명

 테스트 케이스마다 거리 계산하면 망함., 가능한 모든 경우가 많지 않으므로, 모든 경우에 대해서 가장 짧은 거리를 구해놓고, 테스트 케이스마다 한번에 확인하는 방식으로 처리해야함.

 사실 이 문제를 기록하는 이유는 [다른 블로그](https://ddae9.tistory.com/8) 에서 본 Priority Queue + Failed Cases 의 아이디어 때문임. 각각의 최적화가 독립적으로 시행되었을 경우는 TLE 가 나지만, 동시에 처리되었을 경우는 통과함. 
 
 그래서 궁금해서 Test Case 가 하나뿐인 버전인 [이 문제](https://www.acmicpc.net/problem/1525) 에 가서 Priority Queue 버전은 속도차이가 나는지 확인해봤는데, 별로 차이가 안남. 오버헤드가 커서 그렇지 경우의 수가 더 많으면 달라지는건지 잘 모르겠음.
 
 아래는 위 블로그에서 쓴걸 c++ 버전으로 바꾼 것
 
<details>
<summary>코드</summary>
{% highlight c++ %}

struct E {
	int f, g, h; 
	char state[9]; int void_p;
};
namespace std {
	template<> struct greater<E> {
		bool operator()(const E& a, const E& b) const { return a.f > b.f; }
	};
}

using Q = priority_queue<E, vector<E>, greater<E>>;
char dest[9] = { '1', '2', '3', '4', '5', '6', '7', '8', '0' }; int64_t dest_code;
unordered_map<uint64_t, bool> visitTB, impossible;

int Heuristic(char* s)
{
	int h = 9, i = 8;
	while (i--) if (s[i] == dest[i]) h--;
	return h;
}

uint64_t Encode(char* s)
{
	int res = 0;
	for (int i = 0, e = 1; i < 9; i++, e *= 10)
		res += e * (s[i] - '0');
	return res;
}

void Insert(Q& q, E& prev, E& cur, int t, int64_t prev_code)
{
	swap(cur.state[prev.void_p + t], cur.state[prev.void_p]);
	int code = Encode(cur.state);
	if (visitTB.find(code) == visitTB.end())
	{
		cur.g = prev.g + 1; cur.h = Heuristic(cur.state); cur.f = cur.g + cur.h;
		cur.void_p += t;
		q.push(cur);
		cur.g = prev.g;
		cur.void_p -= t;
	}
	swap(cur.state[prev.void_p + t], cur.state[prev.void_p]);
}

void Astar(E& start)
{
	visitTB.clear();
	Q q;

	q.push(start);

	while (!q.empty())
	{
		E cur = q.top(); q.pop();
		int64_t cur_code = Encode(cur.state);

		if (dest_code == cur_code)
		{
			cout << cur.g << '\n';
			return;
		}
		if (impossible.find(cur_code) != impossible.end()) break;
		if (visitTB.find(cur_code) != visitTB.end()) continue;
		visitTB[cur_code] = true;

		int x = cur.void_p % 3;
		int y = cur.void_p / 3;
		E tmp = cur;
		if (x > 0) Insert(q, cur, tmp, -1, cur_code);
		if (x < 2) Insert(q, cur, tmp, 1, cur_code);
		if (y > 0) Insert(q, cur, tmp, -3, cur_code);
		if (y < 2) Insert(q, cur, tmp, 3, cur_code);

	}
	cout << "impossible\n";
	for (auto k : visitTB)
		impossible.insert(k);
}

int main()
{
	int T;
	cin >> T;

	dest_code = Encode(dest);
	E start;
	while (T--)
	{
		for (int i = 0; i < 9; i++)
		{
			cin >> start.state[i];
			if (start.state[i] == '#')
			{
				start.void_p = i;
				start.state[i] = '0';
			}
		}
		start.g = 0; start.f = start.h = Heuristic(start.state);
		Astar(start);
	}
}

{% endhighlight %}
</details>