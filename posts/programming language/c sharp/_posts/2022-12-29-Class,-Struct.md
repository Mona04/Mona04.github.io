---
excerpt: "C# 의 Class, Struct, Interface, Property, Readonly Struct, Record"
tag: [c sharp]
use_math: true
---


## Class

### Overriding

```virtual``` / ```override``` 키워드를 사용하거나 ```new``` 키워드를 사용할 수 있다. 후자는 다형성이 적용되지 않는다. ```abstract``` method 의 경우 ```virtual``` 의 특수한 경우에 해당된다.

다른 연산자와 달리 ```[]``` 인 경우는 ```ReturnType this[InputType value] { get{} set{} }``` 형식인 Indexer 를 구현해야한다. 

### Static Intializer

c++ 과 다르게 Static Member 를 초기화할 수 있는 함수를 만들 수 있다. 클래스의 멤버에 접근하는 시점에 단 한번만 실행된다.

여기서 오류가 발생하면 해당 클래스 자체를 사용할 수 없으며 에러를 잡기도 까다로우므로 주의해야한다.

### Instance Intialize (C# 3.0)

객체를 생성할 때 ```new AAA() { Value = 12 };``` 처럼 생성자를 사용하지 않고 public field 를 초기화 할 수 있다. 



## Struct

Interface 만 상속받을 수 있다. 


### Local Init
 
.Net 은 메모리를 할당할 때 기본적으로 0 초기화를 수행한다. 

여기서 명시적으로 초기화가 되지 않으면 컴파일러 오류가 뜨므로 ```new``` 등을 통해 0 으로 초기화를 하면 낭비다. 이를 위해 C# 9.0 에서  Local Init 을 막을 수 있는 방법으로 ```unsafe``` context 에서 ```SkipLocalsInitAttribute``` 를 제공한다. 큰 배열 등의 경우에서 약간의 성능향상을 꾀할 수 있다.


### 생성자

매개변수가 없는 생성자는 정의할 수는 없지만 호출할 수 있다. 이때의 모든 Field 가 0 으로 초기화된다. 매개변수가 있는 생성자는 모든 Field 를 초기화해야 컴파일 에러가 나지 않고, class 와 달리 기본생성자를 죽이지 않는다.

이러한 기본 생성자의 성질 때문에 Field 초기화가 불가능했다. 왜냐하면 Field 초기화는 생성자의 시작부분에 코드가 들어가는 것과 같기 때문이다.

그러다 C# 10.0 에서는 기본생성자를 만들 수 있게 변경되었고, Field 초기화는 생성자를 정의했을 경우 허용된다. 왜냐하면 사용자가 정의한 생성자의 앞부분에 들어가게 되기 때문이다. __만약 기본생성자를 정의하지 않은 경우 Field 초기화는 일어나지 않는다.__

헷갈리므로 Field 초기화는 ```record struct``` 경우 외에는 자제할 것이 권장된다.

### readonly struct (C# 7.2)

Mutable Object 는 생성자 이외에서 멤버가 바뀌지 않는 객체를 의미하며 보통 ```readonly``` 가 붙은 field 를 사용한다. ```System.String``` 이 대표적인 예이다.

그런데 value type 이 ```readonly``` 로 되어 있더라도 그것의 method 를 호출하면 내부 값을 바꿀 수 있다. 그런데 C# 은 defensive copy 를 value type 에 대해 적용하여 실제는 다음과 같이 처리된다.

{% highlight c# %}

MyValueType tmp = v;
tmp.MyMethod();

{% endhighlight %}

즉 변화가 적용이 되지 않으며 이런 경우를 인지하기도 쉽지 않다.

그래서 .Net 은 적어도 내부 값이 바뀌는지 않는다는걸 확신할 수 있는 방법을 만들었다. C# 7.2 에서 구조체 자체를 ```readonly``` 로 정의해 defensive copy 를 만들지 않는 문법이 생겼다. C# 8.0 에서 Method 를 ```readonly``` 로 만들 수 있게 되면서 더 넓은 선택지가 생겼다. 





### Ref Struct (C# 7.2)

```ref struct``` 는 보통의 프로그래밍에선 쓸 일이 없고 ```Span<T>``` 을 위해서 나왔다고도 볼 수 있는 타입이다. Managed Heap 에서 관리되면 안되고 Stack 에서만 할당될 수 있는 특징을 가진다.

```ref struct``` 는 인터페이스도 상속할 수 없다. 대신 C# 8.0 부터는 ```Dispose()``` 함수를 구현하면 ```using``` context 는 사용할 수 있다.



## Interface

{% highlight c#%}

class Notebook : Computer, IMonitor
{
    void IMonitor.TurnOn() {}
}

{% endhighlight %}

인터페이스의 함수는 ```class``` 의 ```virtual``` 이 아니므로 자식에게 ```virtual``` 로 인터페이스의 함수를 구현할지 여부가 달려있다.

또한 위처럼 해당 interface 로 형 변환 해야지만 사용가능하도록 할 수 있다.

C# 8.0 부터는 interface 도 Method 구현부를 가질 수 있게 된다. 이때 다이아몬드 상속을 막기위해서 명시적 형변환을 해야지 interface 의 구현부를 호출할 수 있게 된다. 
+ ```interface``` 와 ```abstract``` 의 차이는 ```field``` 생성이 불가능하고 다중상속이 가능하다는 정도가 남게된다.



## Property

C# 3.0 에 Auto-Implemented Properties 로 간단하게 ```int a {get; set; }``` 이 가능해졌다.

C# 6.0 에선 Initialize for Auto-Properties 가 생겼다. 이때 ```int a {get;} = 10;``` 같은 경우 ```readonly``` 로 필드가 자동생성 된다. 

C# 6.0 에선 Method 나 Readonly Property 를 정의 시 ```=> Expression``` 꼴로 간략히 할 수 있게 되었다.
+ C# 7.0 에선 Property 의 ```get```, ```set``` 각각 적용 가능해지고, 생성자, event 등에도 가능해졌다.

C# 9.0 에선 ```int a {get; init;}``` 을 하면 초기화 때 외부에서 값 설정을 할 수 있으면서 ```readonly``` 로 만들 수 있게 된다.

또한 불변타입일 때 특정 값만 값을 바꾼다면 메소드로 새로운 값을 만들어야 했다. C# 10.0 에선 ```Point pt2 = pt with {X = pt.X + 2 };``` 처럼 간략히 쓸 수 있다.



## Record (C# 9.0, 10.0)

{% highlight c# %}

// GetHashCode(), Equal(), operator ==, 등이 자동으로 생성 
record AAA
{
    public int a;
    public int b;
}

// readonly 에 생성자를 함께 정의
record BBB(int a, int b);

{% endhighlight %}

Value Object Pattern 을 위해 class 를 쓰는 경우가 많다. 이때 ```Equals()``` 등에 대해서 재정의를 해야하는데 이게 노가다작업이라 C# 9.0 에서는 ```class``` 대신 ```record``` 를 이용하면 기본 코드를 자동으로 생성해준다.

C# 10.0 에선 ```record struct``` 도 가능하게 되었다. 그래서 ```record``` 는 ```record class``` 의 약식이 되었다. 또한 ```struct``` 에서 기본생성자와 필드초기화가 지원되게 되었다.




## 참고자료

[시작하세요 C# 10 프로그래밍]((https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=303298623))

[닷넷의 관리 포인터와 System.TypeReference](https://www.sysnet.pe.kr/2/0/11529)

[SO. why-virtual-is-allowed-while-implementing-the-interface-methods](https://stackoverflow.com/questions/4470446/why-virtual-is-allowed-while-implementing-the-interface-methods)
