---
excerpt: "Interleaving String 문제"
tag: [PS. DP]
use_math: true
---

## 문제

[문제 사이트](https://leetcode.com/problems/interleaving-string/)

## 방법 1

### 코드

{% highlight c++ %}

struct P {int i, j;};
class Solution {
public:
    int dp[101][101];
    bool isInterleave(string s1, string s2, string s3) {
        if(s1.size() + s2.size() != s3.size()) return false;
        
        fill(dp[0], dp[101], 0);
        queue<P> q; q.push({0, 0});
        while(!q.empty())
        {
            auto cur = q.front(); q.pop();
            if(cur.i == s1.size() && cur.j == s2.size()) return true;
            if(dp[cur.i][cur.j]) continue;
            dp[cur.i][cur.j] = true;
            if(s1.size() > cur.i && s3[cur.i+cur.j] == s1[cur.i]) q.push({cur.i+1, cur.j});
            if(s2.size() > cur.j && s3[cur.i+cur.j] == s2[cur.j]) q.push({cur.i, cur.j+1});
        }
        return false;
    }
};

{% endhighlight %}

### 시간 복잡도

O($$NM$$)

### 설명

Interleaving String 이라는 유명한 문제이다.

```s3``` 의 문자는 ```s1``` 나 ```s2``` 에 순서대로 속해야한다. 그래서 기본적인 아이디어는 ```s1```, ```s2``` 내의 위치를 가리키는 ```i```, ```j``` 를 두어서 ```s3``` 의 문자들과 순차적으로 비교해 포인터를 증가시키는 것이다. 예를들어 ```s1[i] == s3[i+j]``` 일때 ```i++``` 를 해주는 식. 

두 포인터 모두 증가할 수 없다면 조합 불가능이다. 두 포인터 중 하나만 증가하면 간단하겠지만, 두 포인터가 모두 증가할 수 있다면 경우의 수가 나뉘어진다. 하지만 ```i``` 와 ```j``` 가 증가한 순서는 중요하지 않다. 정확히는 증가한 순서에 따라서 결과값은 달라지지만 그 이후 비교에는 영향을 주지 않는다. 그래서 메모이제이션으로 해결할 수 있다.

위는 이를 BFS 로 해결한 것으로 DFS 를 해도 크게 상관은 없다. 중요한건 중복제거이다.


## 방법 2

### 코드

{% highlight c++ %}

struct P {int i, j, k;};
class Solution {
public:
    bool dp[102][102] = {0,};
    bool isInterleave(string s1, string s2, string s3) {
		dp[0][0] = true;
        if(s1.size() + s2.size() != s3.size()) return false;
		for(int i = 0; i <= s1.size(); i++)
			for (int j = 0; j <= s2.size(); j++)			
				if (dp[i][j])
				{
					if (s1[i] == s3[i + j]) dp[i + 1][j] = true;
					if (s2[j] == s3[i + j]) dp[i][j + 1] = true;
				}			

		return dp[s1.size()][s2.size()];
	}
};

{% endhighlight %}

### 시간 복잡도

O($$NM$$)

### 설명

위에서 설명한 것을 DP 방식으로 푼 것이다.


### 1차원

{% highlight c++ %}

class Solution {
public:
    bool dp[102] = {0,}; 
    bool isInterleave(const string& s1, const string& s2, const string& s3) {
        if(s1.size() + s2.size() != s3.size()) return false;
        dp[0] = true;
        
		for(int i = 0; i <= s1.size(); i++)
			for (int j = 0; j <= s2.size(); j++)			
				if (dp[j])
				{
					if (s2[j] == s3[i + j]) dp[j + 1] = true;
					dp[j] = s1[i] == s3[i + j]; 
				}			
	
		return dp[s2.size()];
	}
};

{% endhighlight %}