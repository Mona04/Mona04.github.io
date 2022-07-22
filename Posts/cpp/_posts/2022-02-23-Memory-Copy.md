---
excerpt: "Memcpy, Memmove, std::Copy 의 차이점"
categories: c++
tag: [c++]
use_math: true
---

## POD

[Trivial, Standard Layout, POD](https://docs.microsoft.com/en-us/cpp/cpp/trivial-standard-layout-and-pod-types?view=msvc-170) 에 대한 이해가 필수임.

+ 위 세가지의 공통된 특징은
  + 가상함수는 쓰면 안되고
  + 성질이 멤버변수도 적용되어야함
+ __Trivial__
  + 기본생성자(파라미터 없는거)와 대입연산자, 소멸자가 ```default``` 여야함. 
+ __Standard Layout__
  + C 등의 다른 언어와의  Memory Layout 의 상호운용을 위한 것
  + 여러 Access Specifier에 걸쳐서 멤버변수를 두면 안되고, 멤버변수 각각도 마찬가지임.
    + Access 지정자에 따라 컴파일러마다 멤버변수의 메모리 할당이 다름 - [참고](https://stackoverflow.com/questions/25479373/how-memory-is-allocated-for-private-and-public-members-of-the-class)
    + 그러니 만약 있으면 Layout 이 컴파일러, 혹은 c/c++ 에서 달라질 수 있음
  + 상속에서 자식이든 부모든 멤버변수는 한쪽 클래스에만 있어야함.
    + 아니면 변수 Layout 이 컴파일러마다 달라질 수 있음
+ __POD(Plain Old Data)__
  + Trivial 이면서 Standard Layout 인것 
  + C 와 완전히 상호작용이 가능한 구조체임.


## Memcpy, Memmove

### 차이점

```memmove()``` 는 메모리 겹침을 막을 수 있음.
+ ```dest ---- source ---- dest end ---- source end```
+ 이런 경우는 ```->``` 이 방향이면 ```source``` 가 복사중에 변경됨 - [참고](https://stackoverflow.com/questions/67205245/how-to-implement-memmove-not-just-memcpy-in-assembly)
+ 이는 __역방향으로 복사하면 해결됨__
+ 그래서 처음 메모리 위치를 비교해서 복사할 방향을 결정함
+ 그런데 캐시 아키텍쳐 등에 따라 __역방향이 느려질 수 있음__ - [참고](https://stackoverflow.com/questions/22158053/memmove-vs-copying-backwards)
+ ```memmove()``` 가 임시버퍼를 쓴다는 말은 구라임 - [참고](https://stackoverflow.com/questions/55370165/does-memmove-use-dynamic-memory-for-its-temporary-array)

### 주의점

#### Non-Trivial Copiable 의 경우 문제 발생

[관련 SO](https://stackoverflow.com/questions/27009178/when-is-a-type-in-c11-allowed-to-be-memcpyed)

{% highlight c++ %}
std::shared_ptr<int> dst;
{
    std::shared_ptr<int> src = std::make_shared<int>();
    memcpy(&dst, &src, sizeof(src));
}
cout << dst.use_count() << endl;
{% endhighlight %}

```
-572662307
```

위처럼 POD 가 아닌 값은 대입 연산자에서 수행하는 동작을 못해서 오류가 있을 수 있음.

<br/>

{% highlight c++ %}
struct AAA
{
    virtual void Do() { cout << "AAA\n"; }
};

struct BBB : public AAA
{
    virtual void Do() { cout << "BBB\n"; }
};

int main()
{
    AAA src[1]; BBB dst[1];
    copy(src, src + 1, dst);
    ((BBB*)dst)->Do();
    memcpy(dst, src, sizeof(src));
    ((BBB*)dst)->Do();
}
{% endhighlight %}

```
BBB
AAA
```

위처럼 가상함수 포인터도 카피해서 문제가 생길 수도 있음.


## std::copy

```memmove()``` 처럼 메모리 겹침을 허용함.

[Memcpy 와의 비교 SO](https://stackoverflow.com/questions/4707012/is-it-better-to-use-stdmemcpy-or-stdcopy-in-terms-to-performance)
+ stdlib 에서 지원하므로 inline 최적화가 가능해서 ```std::copy``` 가 조금더 빠를 수 있다고 함.

Non-Trivial Copyable 한 자료형도 지원해줌
+ 이때는 일일이 Copy Assignment Operator 를 수행해서 조금 느릴 수 있음.
+ 아닌 경우는 ```memcopy()``` 나 그에 흡사한 동작을 수행한다고 함. 



