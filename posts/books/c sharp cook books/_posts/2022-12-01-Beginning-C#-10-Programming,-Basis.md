---
excerpt: "시작하세요 C# 10.0 프로그래밍 보고 정리중"
tag: [c sharp]
use_math: true
---

## 기본요소

#### Keyword / Identifier

__Keyword(Reserved Word)__ 는 문법을 표기하기 위해 미리 예약된 언어를 말한다. 
Control Statement 의 ```if```, ```switch``` 나 
Jump Statement 의 ```return```, ```throw```, ```break```,
variable 관련으로 ```null```, ```var```, ```new``` 등이 있다.
+ C# 1.0 때 만들어진 __Reserved Keyword(예약 키워드)__ 는 더 추가되지 않는다.
+ 대신 __Contextual Keyword(문맥 키워드)__ 로서 추가된다.
  + C# 1.0 코드에서 Contextual Keyword 를 사용했어도 호환되는 이유.

 __Identifiers(식별자)__ 는 임의로 사용자가 지정할 수 있는 단어를 라고 한다.
+ Keyword 앞에 ```@``` 를 붙이면 Identifier 로 쓸 수도 있음 (드문 경우)
+ 앞에 ```__``` 로 시작되는 Keyword 가 훗날 추가될 수 있으니 Identifier 로 쓰지 말 것이 권장.
+ 유니코드 범위 내의 문자도 가능하며 이스케이프 시퀀스도 사용가능하나 거의 쓰지 않는다.

#### Variable / Literal

__Literal__ 은 Source Code 에 포함된 값을 의미한다. 

__Variable__ 은 Value Type 과 Reference Type 이 있는데 전자는 Stack 에 저장되고 후자는 Heap 에 저장된다.

#### Operator

#### Punctuator


## Type

### Type Conversion

Implicit Conversion 은 단순히 대입해도 컴파일러가 오류로 간주하지 않고 Type 을 바꾸는 것이다. 범위가 작은 자료형에서 큰 자료형으로 담는 경우 또는 일반화된 타입으로 변환하는 경우가 해당된다.

Explicit Conversion 은 개발자가 직접 ```(int)var``` 같이 Cast Operator 를 넣어주는 변환이다. 이때 참조형의 경우 형변환이 불가능하면 예외를 발생시키는데 이에 대한 대용으로 ```as``` 와 ```is``` 예약어가 추가되었다. ```is``` 와 달리 ```as``` 는 참조형에만 적용이 된다. 

또한 각각의 경우가 연산자 오버로딩으로 커스터마이즈가 가능하다.

{% highlight c#%}

static public implicit operator Won(Yen yen){ ... }

{% endhighlight %}

### Object

 ```object``` 는 값형식도, 참조형식도 가능하다.
+ Value Type 은 ```System.Object``` 를 상속한 ```System.ValueType``` 을 상속한 Type 이다.
+ Reference Type 은 이를 제외한 형식이다.
+ ```ToString()```, ```GetType()```, ```Equals()```, ```GetHashCode()``` 등의 함수를 가지며 오버로딩할 수 있다.
  + ```GetHashCode()``` 는 ```Equals()``` 와 밀접하여 클래스를 상속하여 ```Equals()``` 를 재정의하면 ```GetHashCode()``` 도 바꾸라고 컴파일 경고를 준다. Value Type 에서는 기본적으로 값이 같으면 ```GetHashCode()``` 는 같은 값을 내뱉는다.(당연히 역은 성립안함)

### Class

#### Overriding

```virtual``` / ```override``` 키워드를 사용하거나 ```new``` 키워드를 사용할 수 있다. 후자는 다형성이 적용안된다.

```abstract``` method 의 경우 가상함수에 해당된다.

다른 연산자와 달리 ```[]``` 인 경우는 ```ReturnType this[InputType value] {}``` 형식인 인덱서를 구현해야한다. 

#### Finalizer

일반 reference object 와 달리 더 복잡한 과정이 필요해서 성능에 차이를 준다. 그래서 .Net 이 관리하지 않는 시스템 자원을 얻는 경우에만 정의하는 것이 추천된다. GC Finalization Queue 에 들어가지 않기를 원한다면 ```IDispose``` 를 사용할 수도 있다.

참고로 .Net 은 Memory 를 관리하지 Resource 를 관리하는게 아니다. 자세한건 [SO](https://stackoverflow.com/questions/35386769/why-net-cannot-manage-unmanaged-memory)를 참고하자.

#### Static Intializer

c++ 과 다르게 Static Member 를 초기화할 수 있는 함수를 만들 수 있다. 클래스의 멤버에 접근하는 시점에 단 한번만 실행된다.

여기서 오류가 발생하면 해당 클래스 자체를 사용할 수 없으며 에러를 잡기도 까다로우므로 주의해야한다.



### Struct

+ Instance 생성을 ```new``` 로 해도 되고 안해도 된다.
  + value type 은 ```new``` 로 생성하면 모든 값을 0 으로 초기화 한 것과 같다.
+ 매개변수를 갖는 생성자를 정의해도 마치 기본 생성자가 있는 것처럼 지원된다.
  + 단 생성자에서 모든 매개변수를 초기화 해야한다.


### Interface

{% highlight c#%}

class Notebook : Computer, IMonitor
{
    void IMonitor.TurnOn() {}
}

{% endhighlight %}

위처럼 하면 인터페이스로 형 변환 해야지만 사용가능하다.


### Enum

정수형 타입(보통 System.Int32)을 상속받아 ```ToString()``` 부분을 재정의한 타입이다. 단 암시적 형변환은 막혀있어 명시적으로 정수형으로 바꿔야한다.

```[Flags]``` Attribute 를 사용하면 편리하게 조합을 디버깅 할 수 있다.


### Ect

Mutable Object 는 생성자 이외에서 멤버가 바뀌지 않는 객체를 의미하며 보통 ```readonly``` 가 붙은 field 를 사용한다. ```System.String``` 이 대표적인 예이다.

```const``` 는 생성자가 아니라 컴파일 타임에 값이 치환되는 방식으로 구현된다. 그래서 반드시 정의와 함께 값을 대입해야한다. ```static``` 와 같이 쓰일 수 없는데 이미 적용된거나 다름 없어서 그런듯 하다.


## Function

### CBV, CBR

Reference Type 이는 Value Type 이든 함수 호출에 의한 스택 값은 복사(Call By Value)가 된다. 대신 Call By Reference 를 할 수 있는 방법이 ```ref``` 과 ```out``` 이다.

Reference Type 의 경우 보통은 CBV 나 CBR 나 차이가 없지만 다음과 같이 참조할 대상을 바꾸는 경우 차이를 낳는다.

{% highlight c#%}

void Change(ref Point pt)
{
    pt = new Point();
    pt.x = 1;
}
{% endhighlight %}

### 가변인자

``int Add(params object[] values) {}``` 같은 방식으로 사용할 수 있다. 


### Delegate

```delegate``` 는 ```System.Delegate``` 를 상속받은 ```System.MulticastDelegate``` 클래스의 약식이다. 
+ ```System.Delegate``` 는 인스턴스와 함수포인터를 저장해서 ```Invoke()``` 를 지원하는 클래스라고 생각하면 된다. 하지만 직접 상속한 구문은 허용되지 않는다. 
+ 원래는 ```new MyDelegate(MethodName);``` 처럼 생성해야하는데 C# 2.0 부터 그냥 대입해도 같은 역할을 한다.
+ ```System.MulticastDelegate``` 이므로 ```+=```, ```-=``` 으로 여러 Method 를 할당할 수도 있다. 컴파일하면 ```MyDelegate.Combine()``` 을 사용하는 꼴으로 변환된다.
+ Signature(파라미터, 리턴 모양) 가 Delegate 에 정의된 것과 같으면 된다.


Delegate 의 존재로 다음 3가지 특성을 만족시켜 First-Class Function 이 C# 에서 지원된다. 
+ Method 의 Return 으로 Method 가 가능.
+ Method 의 Params 로  Method 가 가능.
+ Method 의 Member 로 Method 가 가능.

```event``` 는 delegate 를 private 으로 지정하고 메소드를 이용해 외부에서 등록/해재만 가능하게 한 것을 간략하게 한 것에 불과하다. 다시말해 내부에서만 호출 가능한 delegate 패턴을 간략히 한 것이다.

