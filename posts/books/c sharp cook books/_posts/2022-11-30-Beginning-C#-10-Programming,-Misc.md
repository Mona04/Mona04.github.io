---
excerpt: "시작하세요 C# 10.0 프로그래밍 보고 정리중"
tag: [c sharp]
use_math: true
---

## Misc

### Attribute

```[MyAttribute]```, ```[My]```, ```[My()]``` 모두 적용 가능하다.
+ 후자의 경우 생성자가 호출되는 것으로 생성자를 오버로딩해서 매개변수도 넣을 수 있다.

Attribute 에 적용이 가능한 ```AttributeUsage``` 라는 Attribute 로 제약을 걸 수 있다.
+ Attribute 에 ```[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]``` 처럼 적용가능 대상을 한정할 수 있다.
+ 또한 적용 가능 대상을 지정할 수도 있다. 예를들어 리턴타입에만 적용을 할 경우 기본값인 ```method``` 로는 처리할 수 없다. 이때 ```[return: marshalAs(UnmanagedType.I4)]``` 처럼 직접 지정해야한다.
+ ```AllowMultible```, ```Inherited``` 같은 다른 옵션은 생성자에서 지정할 수 있다.

관례쌍 사용되는 ```AssemblyInfo.cs``` 에는 ```[assembly: AssemblyVersion("1.0.0.0")]``` 식으로 Attribute 를 넣어둔다. Assembly 는 뒤에 나오는 코드가 없으므로 적용가능 대상을 자동으로 유추할 수 없어 직접 쓰는 것이다.

```Conditional``` Attribute 는 특정 전처리 상수가 있는 경우에만 컴파일을 한다는 것으로 ```#if``` / ```#endif``` 문이랑 비슷한 기능을 한다.

### Exception

CLR 에서 정의된 예외는 ```System.SystemException``` 을 상속받고, 사용자가 정의한 예외는 ```System.ApplicationException``` 을 상속받는 것이 관례였으나 요즘은 그냥 ```System.Exception``` 에서 직접 상속받는 것이 추천된다. 큰 프로젝트가 아니라면 번거로움 때문에 상속도 하지 않고 그냥 문자열 인자로만 에러를 구분하는 경우도 많다.

```throw``` 와 ```try```/```catch``` 문은 보통 다음처럼 쓰인다.
+ ```public``` 메서드에서 인지값 등이 옳바르지 않으면 던지는 것이 좋다.
+ ```try```/```catch``` 문은 보통 스레드 단위마다 단 한번만 전역적으로 쓰인다. 예외처리 구간이 많으면 Swallowing Exceptions 가 발생할 수 있기 때문이다.
+ Resource 수거 목적인 ```try```/```finally``` 는 권장된다.


```try```/```catch``` 문에서 
+ ```catch``` 에 타입만 적어도 된다. 
+ 또한 ```catch``` 문에서 다시 에러르 던질 때 ```throw;``` 만하면 기존 에러를 이어서 던질 수 있어 정보가 보존된다.




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


### unsafe

배열의 경계 체크, 네이티브 함수나 포인터를 가능하게 하지만 대부분은 사용하지 않는 기능이다.
+ native dll 을 호출할 땐 필요하지만 P/Invoke 기능을 이용할 것이 권장된다. 
+ Managed Type 은 Value Type 에 대해서만 포인터 연산이 가능하다.


```fixed``` 는 다양하게 사용될 수 있다.
+ gc 가 메모리 재배치를 못하게 막는 ```fixed``` context 가 있다.
+ c# 에서 배열은 참조형이므로 구조체 내에 고정크기 버퍼를 만들 수 없다. 하지만 ```fixed int data[3]``` 처럼 ```fixed``` 배열을 사용하면 가능하다.

{% highlight c# %}
unsafe
{
    int[] ar = { 123, 456 };
    fixed(int*a = &ar[0]) // fixed context
    {
        Console.WriteLine(a[1]);
    }
}
{% endhighlight %}

```stackalloc``` 은 c++ 처럼 스택에 배열을 할당하기 위해 사용된다.



### Namespace

FQDN(Fully Qualified Domain Name) 은 Namespace 까지 다 적은 클래스 명이다. 예를들어 ```System.Console``` 이 있다.


