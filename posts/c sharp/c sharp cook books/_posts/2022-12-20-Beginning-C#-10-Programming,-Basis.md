---
excerpt: "시작하세요 C# 10.0 프로그래밍 보고 정리중"
tag: [c sharp]
use_math: true
---

## 기본요소

소스코드는 Keyword/Identifier, Variable/Literal, Operator, Functuator 로 크게 구분된다.

실행단위는 Expression 과 Statement 가 있다.
+ __Expression__ 은 Variable 로 평가될 수 있는 코드이다. 
+ __Statement__ 는 프로그램이 끊어서 수행하는 코드의 단위로 Variable 로 평가될 수 없다. 
+ c 계열 언어는 ```if``` Statement 대신 삼항 연산자 ```?``` 을 사용하여 복잡한 Expression 을 만든다.
+ 요즘 언어는 Expression 만을 채택해서 심지어 ```while()``` 도 리턴값이 있다. 자세한건 [SO](https://stackoverflow.com/questions/19132/expression-versus-statement) 참고. 

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

Value Type 을 ```object``` 에 넣으면 Boxing 이 일어나며 힙에 메모리가 할당됨에 주의하자. 그래서 ```Console.WriteLine()``` 처럼 Value Type 을 인자로 쓸 수 있으면 오버로딩 등을 사용해서 Boxing 을 피하는 경우가 많다. Generic 이 나온 이유기도 하다.


#### Enum

정수형 타입(보통 System.Int32)을 상속받아 ```ToString()``` 부분을 재정의한 타입이다. 단 암시적 형변환은 막혀있어 명시적으로 정수형으로 바꿔야한다.

```[Flags]``` Attribute 를 사용하면 편리하게 조합을 디버깅 할 수 있다.



## Params

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


### Optional Parameter / Named Arguement (C# 4.0)

Method 호출 때 도움이 되는 두가지 기능이다. 서로 같이 혼용될 수 있다.
+ Optional Parameter 는 Parameter 에 기본값으로 Constant Expression 을 넣어두는걸 말한다. 
+ Name Arguement 는 Method 호출 때 ```a.Do(V1 : 12, V2 : 13);``` 처럼 직접적으로 인자를 설정하는 걸 말한다. 




## Delegate

```delegate``` 는 ```System.Delegate``` 를 상속받은 ```System.MulticastDelegate``` 클래스의 약식이다. 
+ ```System.Delegate``` 는 인스턴스와 함수포인터를 저장해서 ```Invoke()``` 를 지원하는 클래스라고 생각하면 된다. 하지만 직접 상속한 구문은 허용되지 않는다. 
+ 원래는 ```new MyDelegate(MethodName);``` 처럼 생성해야하는데 C# 2.0 부터 그냥 대입해도 같은 역할을 한다.
+ ```System.MulticastDelegate``` 이므로 ```+=```, ```-=``` 으로 여러 Method 를 할당할 수도 있다. 컴파일하면 ```MyDelegate.Combine()``` 을 사용하는 꼴으로 변환된다.
+ Signature(파라미터, 리턴 모양) 가 Delegate 에 정의된 것과 같으면 된다.


Delegate 의 존재로 다음 3가지 특성을 만족시켜 First-Class Function 이 C# 에서 지원된다. 
+ Method 의 Return 으로 Method 가 가능.
+ Method 의 Params 로  Method 가 가능.
+ Method 의 Member 로 Method 가 가능.

### Event

```event``` 는 delegate 를 private 으로 지정하고 메소드를 이용해 외부에서 등록/해제만 가능하게 한 것을 간략하게 한 것에 불과하다. 다시말해 내부에서만 호출 가능한 delegate 패턴을 간략히 한 것이다.





## Context

### extern

{% highlight c#%}

[DllImport("user32.dll)]
static extern int MessageBeep(uint uType);

{% endhighlight %}

코드가 없어도 컴파일 되게 하는 역할을 한다. 

자주 쓰이는 용법 중 하나가 바로 위처럼 __P/Invoke(Platform Invocation)__ 방식으로 managed code 를 호출하는 것이다.


### checked

{% highlight c# %}
checked // unchecked
{
    // overflow chekable
}
{% endhighlight %}

default context 가 ```unchekced``` 이지만 overflow 를 의도했을 경우 명시하는게 좋다. ```checked``` 의 경우 약간 느려진다.

```checked``` context 에서 함수호출을 할 경우 적용되지 않는다.

부동소수점 자료형의 ```infinity``` 등에는 적용되지 않는다. ```decimal``` 은 발생시킨다.



## Misc

#### const

```const``` 는 생성자가 아니라 컴파일 타임에 값이 치환되는 방식으로 구현된다. 그래서 반드시 정의와 함께 값을 대입해야한다. ```static``` 와 같이 쓰일 수 없는데 이미 적용된거나 다름 없어서 그런듯 하다.

#### goto

제약이 들어가서 scope 밖이거나 이전 label 로만 이동가능하다. 초기화 등이 완료되지 않은 상태를 야기하는 이동을 막는 것이다. 허용된 goto 문은 코드를 실행하지 않을 뿐이라 비교적 안전하다.

메소드 바깥도 고려한다면 예외를 던지는 것도 좋지만 실행속도를 생각하면 꼭 그렇지는 않으므로 적절히 사용해도 괜찮다.

switch 문에서 ```goto case [case];``` 로 fall through 처리 가능하다.
+ fall through 는 기본적으론 막혔지만 ```case``` 문의 실행코드가 없다면 가능하다.


#### Namespace

FQDN(Fully Qualified Domain Name) 은 Namespace 까지 다 적은 클래스 명이다. 예를들어 ```System.Console``` 이 있다.

C# 10.0 에선 Global Using Directive 가 나왔다. 파일 하나에 ```global using System...``` 을 해놓으면 다른 파일에도 적용이 된다. 
+ 프로젝트 파일에서 ```<ImplicitUsings>enable</ImplicitUsing>``` 로 해놓으면 자동으로 생성되는 파일에서 ```System``` 관련해서 자동으로 추가해준다.

C# 10.0 에선 File Scope Namespace 가 나와서 대괄호 하나를 줄여준다.
