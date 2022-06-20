---
excerpt: "소멸자와 가상함수"
tag: [c++]
use_math: true
---

## 소멸자에서 가상함수?

{% highlight c++ %}

class AAA
{
public:
	AAA() {}
	~AAA() { Clear(); }

	virtual void Clear() { cout << "AAA" << endl; }
};

class BBB : public AAA
{
public:
	BBB() {}
	virtual ~BBB() { }

	virtual void Clear() override { AAA::Clear(); cout << "BBB" << endl; }
};

int main()
{
	BBB a;
}

{% endhighlight %}


위 코드의 결과는 어떻게 될까?

1. ```
AAA
``` 

2. ```
BBB
AAA
```

정답은 1번이다.

[SO](https://stackoverflow.com/questions/12092933/calling-virtual-function-from-destructor) 를 보면, 생성자와 소멸자 중에 객체의 실제 유형이 바뀐다고 한다. 그래서 소멸자에서는 가상함수의 다형성을 기대할 수 없다. 덧붙여 순수가상함수의 경우 오류의 여지가 있으니 소멸자에서 가상함수는 자제하는 것이 좋을 듯 하다.