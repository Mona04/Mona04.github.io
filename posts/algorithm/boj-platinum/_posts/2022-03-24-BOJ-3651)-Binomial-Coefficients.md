---
excerpt: "조합을 메모리 안쓰고 오버플러우 안나게 하면서 이분탐색을 돌리는 문제"
tag: [PS. 정수론]
use_math: true
---

## 문제

[문제 사이트](https://www.acmicpc.net/problem/3651)

## 방법 1

### 코드

{% highlight c++ %}

using namespace std;
using ll = long long;
vector<pair<ll, ll>> ans;

int primes[9] = { 2, 3, 5, 7, 11, 13, 17, 19, 23 };
int factors[27][9], facts[9];

void CombInit()
{
    int p2i[27];
    for (int i = 0; i < 9; i++)
        p2i[primes[i]] = i;

    for (int i = 2; i < 27; i++)
    {
        int cur = i;
        for (int p : primes)
            while (cur % p == 0) {
                cur /= p;
                factors[i][p2i[p]]++;   // k 가 될 수 있는 값인 i 를 미리 소인수분해를 함
            }
    }
    
    // Factorial 이므로 누적합을 함. factors[k] 는 k! 의 소인수분해 결과임.
    for (int k = 2; k < 27; p++)
    	for (int fi = 0; fi < 9; fi++)
    		factors[k][fi] += factors[k-1][fi];
}

ll Comb(ll n, int k)
{
	// 임시값에 k! 의 소인수분해 결과를 업데이트 함.
    for (int fi = 0; fi < 9; fi++)
        facts[fi] = factors[k][fi];

    ll r = 1;
    for (int i = 0; i < k; i++)
    {
        ll cur = n - i;
        for (int fi = 0; fi < 9; fi++)
            while (facts[fi] && cur % primes[fi] == 0) // 나눌 수 없을 때 까지 분모의 소인수로 나눔.
            {
                cur /= primes[fi];
                facts[fi]--;
            }
       
        if (r > 1e16 / cur) return 1e16;  // 오버플로우 시 적당히 큰 수를 통해 이분탐색이 동작하게 함. 
        r *= cur;
    }
    
    return r;
}

void Check(ll m, int k)
{
    ll s = k * 2, e = 1e15, c;  // 이분탐색을 함. 이때 2*k ~ 1e15 사이에 N 이 존재함.
    while (s <= e)
    {
        c = s + e >> 1;
        ll tmp = Comb(c, k);
        if (tmp == m)
        {
            ans.push_back({ c, k });
            ans.push_back({ c, c - k });
            return;
        }
        if (tmp < m) s = c + 1;
        else e = c - 1;
    }
}

int main()
{
    ll m;
    cin >> m;
    CombInit();
    for (int k = 1; k < 27; ++k)
        Check(m, k);

    sort(ans.begin(), ans.end());
    ans.erase(unique(ans.begin(), ans.end()), ans.end());
    cout << ans.size() << endl;
    for (auto& a : ans)
        cout << a.first << " " << a.second << '\n';
}

{% endhighlight %}


### 시간 복잡도

O($$\log{M} \times (26 + 26!\text{ 의 소인수의 갯수})$$)


### 설명

#### $$k$$ 의 한계
+ $${}_{n} C_{k} = {}_{n} C_{n-k}$$ 는 고등학교 수준에서 자명함.
+ 우리는 중복된 값을 배제하기 위해  $$k \leq n - k$$ 를 만족하는 것만 구하고 짝을 추가하면 됨.
  + 단  $$ {}_{6} C_{3} $$ 같이 위 부등식이 등식이 되는 경우는 짝이 없음에 주의 
+ 따라서 우리가 구할 수열은 $$\left\{ {}_{n_i} C_{k_i} \vert \  k_i \in N,\ n_i \in N,\ 2k_i \leq n_i ,\ {}_{n_i} C_{k_i} = m \right\}$$ 가 됨.
  + 단, $$m$$ 은 주어진 인풋값이고, $$N$$ 은 자연수 집합.
+ 이러한 수열의 끝은 조건에 따라서 $$ {}_{2k} C_{k} $$ 보다 같거나 커야함.
+ $$k=27$$ 일 때 $$ {}_{2k} C_{k}$$ 는 ```1.946939425E+15``` 으로 주어진 범위인 ```1.0E+15``` 를 최초로 넘기므로 가능한 $$k$$ 의 최댓값은 ```26``` 임을 알 수 있음.


#### 탐색

$$  {}_{n} C_{k} = m $$ 을 만족하는 $$1 \leq n \leq m$$ 인 $$n$$ 을 찾아야함.

조합은 $$n$$ 에 대해서 증가함수이므로 이분탐색을 하면 됨.

혹은 $$k=1$$ 인 경우($$  {}_{m} C_{1} $$, $$  {}_{m} C_{m-1} $$ )를 바로 구하고, $$k=2$$ 에서 이차방정식의 해가 자연수인지 판단해 바로 구한 후, $$k > 2$$ 에서 완전탐색을 돌리면 이때 범위가 ```100000``` 내로 돌아가게 됨.


#### Combination 구현

이 문제에서 가장 어려웠던 부분으로, Overflow 가 안나도록 구현을 해야함,
+ 결과값은 Overflow 나지 않는 값이지만, 구하는 과정에서 터질 수 있음.
+ $$ {}_{n} C_{k} = \cfrac { {}_{n} P_{k} }{k!} $$ 에서 __분자를 먼저 구하고 분모를 나누면 터짐.__
+ 이를 해결하기 위해선 분자를 구하면서 최대한 작게 만들어야 함.

처음엔 나이브하게 생각해서 ```n ~ n-k+1``` 의 수는, ```1 ~ k``` 에 중에 적어도 하나로 나누어 떨어질 것이므로, 미리 나누어 사용하면 될거라 생각했음. 하지만 ```42%``` 근처에서 터졌음. 

이유를 살펴보니 ```n==16, k==8``` 의 경우에서 ```16, 15, 14, 13, 12, 11, 10, 9``` 를 ```2, 3, 4, 5, 6, 7, 8``` 로 나눌 수 있으면 나눌 때, ```6``` 으로 ```12```를 나누면 ```4```  를 못나누고 반대의 경우도 마찬가지인 반례가 있었음. 
+ [관련된 증명](https://cubane.tistory.com/8)

이를 해결하기 위해선 처음부터 ```1 ~ k``` 까지 소인수분해를 해서 나온 수들을 ```n ~ n-k+1``` 까지 가능한 나누면 해결이 됨.

