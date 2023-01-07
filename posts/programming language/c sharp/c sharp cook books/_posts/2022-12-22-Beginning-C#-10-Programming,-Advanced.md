---
excerpt: "C# 고급문법. Generic, Yeild, Nullable, ref/out/in, Lambda"
tag: [c sharp]
use_math: true
---

## Generic (C# 2.0, 7.1, 7.3)

C# 1.0 부터 있던 ```ArrayList``` 는 ```object``` 형식으로 값을 받아 무조건 Boxing 이 일어난다. 그래서 C# 2.0 에는 Generic 이 적용된 ```List<T>``` 를 지원하여 Value Type 에서 GC 부하를 줄인다. 
+ ```List``` 처럼 Generic 버전에서 미름이 바뀐 다른 Container 로는 ```HashTable``` => ```Dictionary<TKey, TValue>```, ```SortedList``` => ```SortedDictionary<TKey, TValue``` 가 있다. ```Stack```, ```Queue``` 는 동일하다.
+ ```IEnumerable``` 같은 인터페이스도  Generic 버전이 제공된다.
+ 이전 버전은 호환을 위해 남아있는 것으로 기본적으로 Generic 쪽을 쓰는 것이 좋다.

```where Type : U [, ...]``` clause 를 추기해서 Type 을 제한할 수 있다.
+ ```U``` 에는 기본적으로 자료형을 넣어서 그 자료형이거나 그것으로부터 상속받음을 확인한다. 
+ 또한 값 형식으로 제한하는 ```class``` 와  ```struct```그리고 기본 생성자가 포함됨을 지정하는 ```new()``` 를 사용할 수도 있다.
+ 여러 Type 에 대해서 제한할 때는 쉼표없이 이어쓰면 된다.

```where T : unmanaged``` 가 C# 7.3 에 추가되었는데, ```T``` 에 대해서 ```struct``` 제약에 추가로 field 로 value type 만 가질 것을 요구한다. 이때의 ```unmanaged``` 는 GC 에 의한 참조가 아니라는 의미로 [SO](https://stackoverflow.com/questions/54790276/managed-vs-unmanaged-types) 참고. 
+ 그러면 클래스나 구조체의 메소드의 ```unsafe``` context 에서 ```T``` 에 대한 포인터 연산이 가능해진다.
+ Generic Struct 는 형식 매개변수에 뭐가 올지 몰라 그동안 ```unsafe``` context 에서 포인터 연산이 불가능했다. 그런데 C# 8.0 부터 ```struct``` 이면서 형식 매개변수가 ```managed``` 로 한정되고 다른 참조형식의 field 가 없으면 가능하도록 바뀌었다.

```default(Type)``` 으로 Generic 함수 등에서 타입에 맞는 기본생성자를 호출할 수 있다. 이때 ```T``` 는 타입 변수가 아니라 타입 그 자체 임에 주의하자. 그리고 C# 7.1 부터 타입을 자동으로 추론해서 생략해도 된다.





## yield (C# 2.0)

{% highlight c# %}

static public class EnumerableGen
{
    int a = 0;
    public IEnumerable<int> Create()
    {
        while (true)
       {
            if (a > 100) yield break;
            yield return a++;
        }
    }
}

{% endhighlight %}

```IEnumerable<T>``` Type 을 Return 하는 Method 에서 사용할 수 있는 예약어이다. 정확히는  ```yield return``` 과 ```yield break``` 를 사용할 수 있다. 

내부적으로는 해당 Method 의 내용이 의미하는 대로 동작하는   ```IEnumerable<T>``` 과 ```IEnumerator<T>``` 를 생성한다. 그리고 해당 Method 는 생성한 ```IEnumerable<T>``` 를 리턴한다. 위 코드는 대략 다음과 같이 변경된다.


{% highlight c# %}

static public class EnumerableGen
{
    public class MyEnumerable : IEnumerable<int>
    {
        public IEnumerator<int> GetEnumerator() 
        {
            return new IEnumerator();
       }

        ...
    }

    public class MyEnumerator : IEnumerator<int>
    {
        int _a;
        public bool MoveNext()
        {
            _a++;
            return a > 100;
        }

        ...
    }

    public IEnumerable<int> Create() { return new MyEnumerator(); }
}

{% endhighlight %}


이는 Linq 등에서 ```IEnumerable<T>``` 또는 ```IOrderedEnumerable<T>``` 를 리턴하는 Method 에서 사용되는 __Lazy Evaluation__ 의 원리가 된다.




## Nullable (C# 2.0, 7.0, 8.0)

C# 2.0 에서 생긴 ```System.Nullable<T>``` 를 사용하면 ```HasValue()``` 와 ```Value``` 라는 Method 를 통해 Value Type 도 Null Check 를 가능하다. 약식으로 ```?``` 를 Type 앞에 붙인다.

C# 7.0 에서 Null 조건 연산자가 추가되어 ```a?.Do()``` 같은걸 사용할 수 있게 된다. 리턴 값이 있는 경우```a ? a.Do() : null``` 과 비슷하다.

C# 8.0 에서 기존의 ```a = a ?? "1";``` 을 ```a ??= "1"``` 로 간단히 쓸 수 있게 되었다.

C# 8.0 에서 nullable aware context 가 도입이 되어 reference type 에 ```?``` 를 붙여 Nullable 인지 체크하게 만들었다. Nullable 이 아닌데 ```null``` 로 초기화하거나, Nullable 인데 Null Check 를 안하면 경고를 던진다. 
+ 멤버에 접근할 때 null-forgiving operator 인 ```!.``` 를 사용하여 널체크를 생략할 수 있다.
+ ```[NotNullWhen(false)]``` 같은 Attribute 를 파라미터에 넣으면 다른 함수를 통해 널체크를 하는걸 컴파일러가 인지할 수 있다. 말고도 관련 Attribute 가 많다.

이러한 nullable aware context 는 크게 Annotation Context 와 Warning Context 로 나뉘고 각각 설정할 수 있다. 설정하는 방법은 두가지가 있는데, 프로젝트 수준의 설정은 프로젝트 파일의 ```<Nullable>enable</Nullable>``` 에서 설정할 수 있고, ```#nullable [Option]``` 으로 코드단위로 조절할 수 있다.






## Out / Ref / In

{% highlight c# %}

class AAA
{
    int value = 0;

    // ref return function
    ref int REF()
    {
        // local variable ref
        ref int a = ref value;

        // ternary operator ref + local realloc
        a = ref(a > 1) ? ref a : ref a;

        a = 15;
        return ref a;
    }
    public void Do()
    {
        ref int b = ref REF();
        b++;
        Console.WriteLine(value);
    }
}


{% endhighlight %}

C# 7.0 부터 ```int.TryParse("5", out var res);``` 처럼 선언과 동시에 값을 받을 수 있게 되었다. 컴파일러가 예전 코드처럼 변수를 자동으로 생성해주기 때문에 가능한 것이다.

C# 7.0 부터 ```ref``` 를 지역변수와 반환값에 적용할 수 있게 되었다. C# 7.2 부터는 삼항 연산자에도 가능하게 되었다. C# 7.3 부터는 지역변수에 재할당이 가능해졌다.

C# 7.2 부터 ```in``` 키워드가 지원되었다. 또한 반환값에 ```ref readonly``` 가 가능해졌다.



## Function

### Extension Method (C# 3.0, 6.0, 9.0)

상수 클래스의 메소드를 만들어서 첫번째 파라미터를 해당 타입 + ```this``` 예약어를 사용시켜, 상속 없이 클래스를 확장할 수 있게 한다. 컴파일 타임에 인자를 직접 넣어주는 방식으로 구현되므로 public 이 아닌 필드나 메소드를 사용할 수 없는 한계를 갖는다.

C# 6.0 부터는 ```IEnumerable<T>``` 를 상속하고 Extension Method 로 ```static void Add(this CONTAINER c, T v);``` 를 구현하면 Collection Initializer 를 적용할 수 있게 되었다.

C# 9.0 부터는 ```static void IEnumerator<T> GetEnumerator(this T s);``` 로 Extension Method 를 구현하면 ```IEnumerable<T>``` 를 상속하지 않아도 ```foreach``` 구문을 사용할 수 있게 된다.




### Anonymous (C# 2.0, 3.0)

{% highlight c# %}

// C# 2.0, Method Name is anonymous
var anom_func = delegate(int a) { Console.WriteLine(a); };

// C# 3.0, Type name is anonymous
var anom_type = new { Count = 1, Name = "asfd" };

{% endhighlight %}

익멩 메소드는 컴파일 때 해당 클래스에 중복되지 않는 이름으로 Method 가 생긴다. 더 간단한 Lamda 를 많이 쓴다. 

익명 타입은 컴파일 때 중복되지 이름으로 Type 이 생긴다. 이는 Value Tuple 에 의해 보통 대체된다.


### Lambda (C# 3.0)

Code 에서의 Lamda Method 은 Anonymous Method 의 간편화된 버전으로 내부적으로 동일하게 컴파일된다. 
이때 Statement 와 Expression 이라는 두가지 버전을 갖는다.
+ 전자는 중괄호를 포함한 ```() => {}``` 이런 문법을 가진다. 
+ Lamda Expression 이라고도 불리는 후자는 ```(a, b) => a + b``` 식으로 구현부가 ```Expression``` 인 경우 중괄호 없이 표현한다.

이때 Method 가 할당될 Delegate Type 을 직접 정의해야하는 번거로움이 있다. 그래서 MS 는 최대 16 개의 인자 버전이 있는 ```Action<>``` 과 ```Func<>``` 를 만들어 기본적으로 이 타입이 되도록 했다.

Data 로서의 Lamda Expression 은 ```System.Linq.Expressions.Expression``` 타입의 인스턴스를 말한다. 런타임에서 코드를 생성해서 호출할 때 사용된다.

C# 10.0 에는 ```RT () => {}``` 꼴리 리턴타입을 지정할 수 있어 ```var``` 을 이용한 타입 추론을 용의하게 해준다.


### Local Function (C# 7.0)

C# 7.0 에서의 TopLevel Statement 에서 함수를 정의해서 쓰거나, Pin/Invoke 를 쓰기 위해서 많이 사용된다.







## Misc

### Dynamic (c# 4.0)

Strong Type 기반의 Static Language 와는 달리 Ruby, Python 같은 Dynamic Language 는 __Duck Typing__  으로 작동한다. ```dynamic``` 은 이러한 언어들과의 Type 연동을 위해 만들어진 예약어이다.

내부적으론 ```System.Runtime.CompilerServices.CallSite<>``` 등으로 바뀌며 Reflection 을 기반으로 작동한다. 

대부분의 경우 사용할 것이 지향되지만, ```string.IndexOf()``` 와 ```List.IndexOf()``` 를 일일히 타입 구분하지 않고 사용하기에 좋을 수도 있다.



### Literial (C# 7.0)

C# 7.0 에서 콤마 대신 ```int a = 0xFFFF_FFFF;``` 처럼 밑줄을 추가할 수 있게 되었다.

#### Constant Interpolcated String (C# 10.0)

String 은 Immutable Object 이므로 문자열을 바꾸거나 합치는 연산은 비교적 계산량이 많다. 대신 ```String.Format``` 을 이용하면 ```StringBuilder``` 처럼 하나의 메모리 영역만 힙에 생성하므로 더 빠르다.

```$``` 접두사는 이를 축약한 것이고 형식 문자열도 지원해서 다음과 같이 할 수도 있다.

{% highlight c# %}

// {값, [, 정렬][:형식문자열]}
$"이름: {Name,10}, 나이: {Age, 5:X}";

{% endhighlight %}

이를 String Interpolation 이라고 한다.

C# 10.0 에선 보간식에 사용된 문자가 상수인 경우 ```String.Format``` 을 사용하지 않고 컴파일 시간에 상수 문자열로 치환한다. 그래서 상수 문자열이 필요한 곳에서도 문자열 보간을 사용할 수 있게 되었다.