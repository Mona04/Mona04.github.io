---
excerpt: "임시객체를 복사생성자로 쓸 때의 주의점"
categories: c++
tag: [c++]
use_math: true
---

## 문제 <br/>

{% highlight c++ %}
struct AAA
{
	AAA(int a) : a(a) { cout << "construct" << endl; }
	AAA(const AAA& in) :a(sqrt(in.a)) { cout << "copy" << endl; }
	AAA(AAA&& in) :a(sqrt(in.a)) { cout << "move" << endl; }
	AAA operator+(const AAA& in) { cout << a << "+" << in.a << endl; return a + in.a; }
	int a = 0;
};

int main()
{
	AAA aa = AAA(8) + AAA(8);
	cout << aa.a;
}
{% endhighlight %}

는 어떤 결과값을 줄까?

처음 기대한 결과는 아래와 같음

```
construct
construct
8 + 8
construct
copy
copy
4
```

혹은 임시변수니까 이동생성자가 호출이 되지 않을까하는 생각으로

```
construct
construct
8 + 8
construct
copy
move
4
```

실제 결과값은 다음과 같음

```
construct
construct
8 + 8
construct
12
```

왜 copy 가 사라지고 원하는 결과값인 4가 아닌 12가 나온 걸까?

## 원인 <br/>

[StackOverflow - Copy Elision](https://stackoverflow.com/questions/3663506/why-is-the-copy-constructor-not-called)

[Wiki - Copy Elision](https://en.wikipedia.org/wiki/Copy_elision)

당연히 컴파일러 최적화가 원인으로 크게 다음과 같은 경우에 일어남.
+ 같은 클래스의 임시변수를 인자로 복사 생성할 시 (경우 1)
+ Return Value Optimization (경우 2)

헷갈릴 수 있는게 복사래서 __복사대입도 해당되는가 할 수 있지만 복사생성만 해당됨__

이때  __Side Effect 가 존재하더라도 무시__ 하므로 주의해야함.
+ __그러므로 복사 시 Side Effect 는 없도록 설계해야함__

## 경우 1

{% highlight c++ %}
AAA a = AAA(12);
// AAA a(12);
{% endhighlight %}

같은 클래스의 임시변수로 인자를 복사생성이 일어날 경우임.

아래 주석처럼 생성 후 복사가 바로 생성으로 바뀜.

이로 인한 장점은 ```string``` 처럼 복사 때 부담이 큰 작업이라도 직관적으로 대입문을 쓸 수 있게 된다는 것임.

{% highlight c++ %}
string str = "ABCDEFG";
// string str("ABCDEFG");
{% endhighlight %}


## 경우 2 (RVO)

{% highlight c++ %}
AAA Func() { return AAA(); }
...
AAA a = Func();
{% endhighlight %}

컴파일러 최적화에 따라 3가지 결과가 나타날 수 있음 (최적화 없음, 1단계 최적화, 2단계 최적화)

마지막 단계만 보자면.

{% highlight c++ %}
void Func(AAA* tmp) { *tmp = AAA(); }
...
AAA a; Func(&a);
{% endhighlight %}

위와 비슷하게 됨 (어셈블리 차원에서 같진 않을거임)

대입할 ```a``` 에 ```Func()``` 의 리턴값이 바로 대입되는 것임.

이렇게 최적화 시, 앞에서 살펴본 경우 1에도 해당되므로 __생성자만 호출되고 끝남__

만약 로컬 변수를 리턴하는 함수라면 경우 1에 해당되지 않으므로
+ 리턴될 로컬 변수가 생성 된 후 __이동 생성자 유무에 따라__
+ 복사 생성자가 호출되거나 이동 생성자가 호출될 것임.
+ 이때 __이동/복사 생성자 후에 로컬변수가 소멸됨__ 
  + 위의 최적화가 어떻게 작동하는지 여기서 다시 확인할 수 있음.



## 예외 1.

Reference 로 바인딩 된 임시변수에는 적용되지 않음.

{% highlight c++ %}
const AAA& Func() { return AAA(); }
...
AAA aa = Func();
{% endhighlight %}

위와 같은 경우가 그렇게 될텐데, 생성 후 복사가 일어나게 됨.

물론 이런 경우는 ```리턴값 생성 -> 리턴값 소멸 -> 복사``` 이렇게 되므로 레퍼런스를 쓰면 안됨.

## 예외 2.

예외 시 ```Throw``` 로 보낸 객체 -> Exception Object,  그리고 Exception Object -> Catched Object 로 복사가 일어날 수도 있고 아닐 수도 있음.

위키에 잘 나와있으며 잘 쓰지도 않으니 여기서 마침.