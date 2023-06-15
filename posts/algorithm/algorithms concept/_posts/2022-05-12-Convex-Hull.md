---
excerpt: "Convex Hull 과 연관된 기법들"
tag: [PS. geometry, PS. convex hull]
use_math: true
---

## Convex Hull

<details>
<summary>펼치기</summary>
<div markdown="1">
### 코드

{% highlight c++ %}

using ll = long long;
template<typename ll = long long>
struct VEC {
    ll x, y;
    VEC    operator+(const VEC& in) const { return { x + in.x, y + in.y }; }
    VEC    operator-(const VEC& in) const { return { x - in.x, y - in.y }; }
    bool operator  <(const VEC& in) const { return x == in.x ? y < in.y : x < in.x; }
    bool operator ==(const VEC& in) const { return x == in.x && y == in.y; }
    ll Cross(const VEC& in) const { return  x * in.y - y * in.x; }
    ll Dist2(const VEC& in) const {
        return (x - in.x) * (x - in.x) + (y - in.y) * (y - in.y);
    }
    friend ll CCW(const VEC& a, VEC b, VEC c)
    {
        b = b - a;
        c = c - a;
        return  b.x * c.y - b.y * c.x;
    }    
};

using ii = VEC<long long>;
ii arr[100001];

int main()
{
    int n; cin >> n;
    for (int i = 0; i < n; i++) cin >> arr[i].x >> arr[i].y;
    
    swap(arr[0], arr[min_element(arr, arr + n) - arr]);
    sort(arr + 1, arr + n, [base = arr[0]](ii& a, ii& b) {
        ll c = CCW(base, a, b);
        return c != 0 ? c > 0 : base.Dist2(a) < base.Dist2(b);
    });
    
    deque<int> st; st.push_back(0); st.push_back(1);
    for (int i = 2; i < n; i++)
    {
        while (st.size() > 1 && 0 >= CCW(arr[st[st.size() - 2]], arr[st[st.size() - 1]], arr[i]))
            st.pop_back();
        st.push_back(i);
    }
    
    cout << st.size();
}

{% endhighlight %}

### 설명 

위는 [이 문제](https://www.acmicpc.net/problem/1708) 를 해결하는 코드이다.

먼저 정점을 일정 방향으로 (보통 시계 반대방향) 으로 정렬을 해야한다. 이는 가장 구석에 있는 정점을 기준으로 ```CCW()``` 를 써서 비교하면 된다.
+ 구석에 있는 정점을 찾는 이유는 기준점이 정점들의 중앙에 있으면 __대소관계가 순환을 이룰__ 수 있기 때문이다. 
+ 만약 ```CCW()``` 가 0이라면, 즉 세 점이 같은 직선 위에 놓여져 있다면, 기준점과의 거리를 사용해 대소관계를 정의한다.
+ 위에선 ```CCW(base, a, b)``` 가 양수일 때 ```a < b``` 이므로, ```a - base``` 기준으로 ```b``` 가 왼쪽에 있다면 ```a < b``` 이다. 다시말해 기준점 기준으로 시계반대방향 순으로 정렬이 된다. 따라서 ```CCW() == 0``` 인 경우 거리가 짧은걸 먼저 오게 해야한다.

다음 단계는 일정 방향으로(여기선 시계 반대방향) 정렬된 정점을 하나씩 살펴가면서  다른 정점을 포함하는 최외곽 정점들을 찾아야한다. 이는 스택을 사용해 구할 수 있다.
+ 먼저 두 정점을 넣어 놓는다. 그리고 스택 위의 두개의 점과 정렬된 정점목록을 비교한다.
+ 스택 위에 차례로 ```a```, ```b``` 가 있어서 ```b - a``` 를 기준으로 새로 비교하는 정점 ```c``` 가 왼쪽/오른쪽에 있는지 ```CCW(a, b, c)``` 로 알 수 있다. 만약 이 값이 0보다 크면(왼쪽에 있으면) 스택에 추가한다. 만약 작다면(오른쪽에 있으면) 새로나온 ```c``` 를 ```a``` 로 대체할 수 있다. ```c``` 가 왼쪽에 올 때까지 스택을 비워내고 ```c``` 를 추가한다.
+ 스택에 들어오는 정점은 정점의 갯수를 넘을 수 없으므로 선형복잡도를 가지게 된다.

</div>
</details>


## Rotating Calipers


<details>
<summary>펼치기</summary>
<div markdown="1">
### 코드

{% highlight c++ %}

using ll = long long;
template<typename ll = long long>
struct VEC {
    ll x, y;
    VEC    operator+(const VEC& in) const { return { x + in.x, y + in.y }; }
    VEC    operator-(const VEC& in) const { return { x - in.x, y - in.y }; }
    bool operator  <(const VEC& in) const { return x == in.x ? y < in.y : x < in.x; }
    bool operator ==(const VEC& in) const { return x == in.x && y == in.y; }
    ll Cross(const VEC& in) const { return  x * in.y - y * in.x; }
    ll Dist2(const VEC& in) const {
        return (x - in.x) * (x - in.x) + (y - in.y) * (y - in.y);
    }
    friend ll CCW(const VEC& a, VEC b, VEC c)
    {
        b = b - a;
        c = c - a;
        return  b.x * c.y - b.y * c.x;
    }    
};

using ii = VEC<long long>;
ii arr[100001];

int main()
{
    // 위의 Convex-Hull 코드
    
	int s = st.size();
	ll ans = max(ans, arr[st[0]].Dist2(arr[st[1]]));
	for (int l = 0, r = 1; r != 0; )
	{
		ll theta = (arr[st[(l + 1) % s]] - arr[st[l]]).Cross(arr[st[r]] - arr[st[(r + 1) % s]]);
		theta > 0 ? l = (l + 1) % s : r = (r + 1) % s;
		ans = max(ans, arr[st[l]].Dist2(arr[st[r]]));
	}
}

{% endhighlight %}

### 설명 

위는 [이 문제](https://www.acmicpc.net/problem/2049)를 푸는 코드이다. 이 알고리즘을 적용할 수 있는 영역이 굉장히 많으므로 [Wiki](https://en.wikipedia.org/wiki/Rotating_calipers) 의 관련 챕터를 한번 읽어보자.

관련설명은 [ruz 블로그](https://aruz.tistory.com/entry/rotating-calipers) 가 그림이 잘 되어 있어 좋다.
+ 단 좌표평면상 최대/최소 지점을 ```l``` 과 ```r``` 로 두면 문제가 생긴다. [반례](https://www.acmicpc.net/board/view/90315)
+ 위 코드처럼 ```l```, ```r``` 을 처음부터 순차적으로 계산해나가는 것이 안전하다.


</div>
</details>

<br/>



