---
excerpt: "C# 고급문법. ValueType, Pattern Match, Type Inferrence"
tag: [c sharp]
use_math: true
---


## ValueTuple (C# 7.0, 7.1)

{% highlight c# %}

public class Program
{
    class AAA
    {
        // 예약어로 추가가 됨
        public void Deconstruct(out int x, out int y) => (x, y) = (1, 2);        
    }
    static (int x, int y) D() {  return (10, 12); }
    static public async Task Main()
    {
        // 기존의 값을 함께 할당
        int a, b, c, d;
        (a, b, c, d) = (1, 2, 3, 4);

        // 리턴되는 튜플 처리
        var r1 = D();
        Console.WriteLine(r1.x);

        (int x, int y) r2 = D();
        Console.WriteLine(r2.x);

        (int x, int y) = D();
        Console.WriteLine(x);

        (int x1, int y1) = D();
        Console.WriteLine(x1);
        
        // Object Deconstruct
        (int x2, int y2) = new AAA();
        Console.WriteLine(x2);

        // Local 에서 초기화
        int v1 = 1, v2 = 2;
        var t1 = (v1: v1, v2: v2);
        Console.WriteLine(t1.v1);
            
        // C# 7.1 의 Local 초기화 시 타입추론과 함께 필드명도 추론
        var t2 = (v1, v2);
        Console.WriteLine(t2.v1);
    }
}

{% endhighlight %}

C# 3.0 의 Class 타입인 ```Tuple``` 과 달리 C# 7.0 에는 Struct 인 ```ValueType``` 이 추가가 되었다. 여기에 ```TupleElementNames``` Attribute 를 컴파일러가 지원해주어 ```Item1``` 이 아니라 원하는 feild name 을 사용할 수 있게 되었다.

또한 값을 할당할 때 기존의 변수를 튜플처럼 모아서 한번에 할당할 수도 있게 되었다.

```void Deconstruct(out T x1, out T x2 ...)``` 를 사용하면 별도의 메소드 없이 값을 분리할 수도 있다.

C# 7.1 부터 Local 에서 초기화 할 때 타입추론과 함께 변수명 이름도 추론할 수 있게 되었다.



## Pattern Match (C# 7.0)

{% highlight c# %}

void Do(object var)
{
    // if 문에서 패턴 인식 후 할당 가능
    if(var is List<int> list)
    {
        // switch 문에서 패턴 인식후 할당 및 when 문 가능
        switch(var)
        {
            case List<int> list: break;
            case var list when ( MyCheckFunc(var) ):
            break;
       }
    }

    // C# 7.3 부터 필드, 속성, 생성자, LINQ 쿼리 등에서 패턴 매치할 때 변수선언도 가능
    string txt = "asdf";
    var text2 = txt is string txt2 ? txt2 : "asdf2";
}
{% endhighlight %}

C# 7.x 에서는 ```is``` 연산자와 ```switch``` 문에 Pattern Match 기능이 추가되었다.


{% highlight c# %}

void Do(object var)
{
    // C# 8.0 switch expression version
    object v = 3;
    Console.WriteLine( v switch
    {
        int v1 when (v1 % 2 == 1) => "ODD",
        string v2 => "STRING",
        _ => "NONE"               // default 
    });

    // switch expression version 에서 타입을 추론가능하면 Property Match 가능
    AAA a = new AAA() { value = 1 };
    Console.WriteLine(a switch
    {
        { value: 1 } => 1,
        { value: 2 } => "False",
        { value: 3 } => "TRUE",
        _ => "NONE"
    });

    (int a, int b) v = (10, 12);
    // if 문에서의 Property Match
    if(v is { a: 10, b:_})
    {
    }

    // switch expression 에서는 Tuple Property Match 적용가능
    Console.WriteLine(v switch
    {
        (_, 1) => 1,
        (1, _) => 2,
        _ => 3
    });
    
}

{% endhighlight %}

c# 8.0 에는 swtich expression 이 나오면서 패턴인식이 막강해졌다. 특히 튜플에서 막강한데 몇가지 팁이 있다.
+ lambda 등을 이용해서 즉석으로 객체를 튜플로 바꾸거나 ```(a) => (a.v1, a.v2) switch {}```
+ ```Deconstruct()``` 를 이용해 자동으로 튜플로 바꾸면 쉽게 적용할 수 있다.

또한 Property Matching 의 경우 ```{A: {A1: 1, A2: 2}}``` 처럼 재귀적으로 이용할 수 있어 편하다.
+ C# 10.0 에선 ```{A?.A1: 1, A.A2: 2}``` 처럼 사용할 수 있어, 중괄호를 줄이고 널체크를 더 쉽게 할 수 있다.


{% highlight c# %}

static bool Do(object var)
    => var is int i && i switch
    {
        > 10 and < 12 => true,
        _ => false
    };


{% endhighlight %}

C# 9.0 에는 기본타입에 관계 연산자와 ```and, or, not``` 을 쓸 수 있어서 더 다채롭게 쓸 수 있게 되었다.



## Type Inference

C# 3.0 에서 할당하는 타입을 알고 있을 때 자동으로 타입을 추론하는 ```var``` 이 도입되었다. 

C# 9.0 에선 할당되는 타입이 정해져 있으면 ```Tuple<int, int> a = new(1, 2);``` 처럼 ```new``` 뒤에 타입이 생략 가능하다. 이는 배열 및 컬렉션 코드를 간단하게 해준다.


