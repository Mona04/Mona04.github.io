---
excerpt: "가변인자 템플릿"
categories: c++
tag: [c++, thread]
use_math: true
---

## 가변인자 템플릿

### 코드

{% highlight c++ %}

class AAA
{
public:
	template<typename... Args>
	AAA(Args const&... args) : aaa{ args... } 
	{
		for (int a : aaa) cout << a << ' ';
		cout << '\n';
	}

	template<typename T, typename... Args>
	auto Print(T const& arg, Args const&... args)
	{
		if constexpr(std::conjunction_v<std::is_same<T, Args>...>)
		//if constexpr ((std::is_same_v<T, Args> && ...))
		{
			((cout << typeid(args).name() << '\n'), ...);
			if constexpr (sizeof...(args) == 2) 
				Print1(arg, args...);
			return 1;
		}
		else {
			(Print2(args), ...);
			//static_assert(false, "Invalid");
			return false;
		}
	}

	template<typename T>
	void Print1(T arg, T arg2, T arg3)
	{
		cout << arg << ' ' << arg2 << ' ' << arg3 << '\n';
	}

	// After c++17
	template<typename T>
	void Print2(T arg)
	{
		cout << arg  << '\n';
	}

private:
	int aaa[10];
};

int main()
{
	fastio;

	AAA a;
	a.Print(1, 2, 3);
	a.Print(1, "as", "asdf");
}


{% endhighlight %}

```
0 0 0 0 0 0 0 0 0 0
int
int
1 2 3
as
asdf
```


### 설명

```Args``` 를 Template Parameter Pack 이라 부르고, ```args``` 를 Function Parameter Pack 이라고 부름

이 함수에 들어오는 __변수에 대해 각각 템플릿을 적용__ 시킴


```args...```
+ 가변인자 뒤에 ... 를 붙이면 가변인자들을 차례로 대입한 것과 같은 결과임
+ Expand 라고 함.
+ 위 예시에서 보이듯 템플릿에서 가변인자 타입형으로 가능함

Fold Expression
+ cpp17 부터 가능하며 재귀식을 컴파일 단계에서 괄호로 처리해줌.
+ ```()``` 로 Wrap 해줘야 컴파일 됨
+ 위처럼 템플릿에서도 가변인자 타입형으로 가능함.
+ 크게 4가지 타입이 있으니 순서 주의
	+ 식을 E 라고 하고, Args 와 대등한 값을 I 라고 할 때
	+ \\( (E \text{ op } ...) => (E_1 \text{ op } (... \text{ op } (E_{n-1} \text{ op } E_n))) \\)
	+ \\( (... \text{ op } E) => (((E_1 \text{ op } E_2) \text{ op } ... ) \text{ op } E_n) \\)
	+ \\( (E \text{ op } ... \text{ op } I) => (E_1 \text{ op } (... \text{ op } (E_n \text{ op } I))) \\)
	+ \\( (I \text{ op } ... \text{ op } E) => (((I \text{ op } E_1) \text{ op } ... ) \text{ op } E_n) \\)

```sizeof...```
+ 가변인자로 들어온 변수의 갯수를 리턴함

Initializer List
+ 가변인자를 초기화 리스트에 넣는 경우 빈 칸은 자동으로 0 으로 채워줌
+ 대입으로 ```aaa = {args...};``` 이런건 안되는 듯
