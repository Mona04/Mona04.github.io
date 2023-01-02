---
excerpt: "시작하세요 C# 10.0 프로그래밍 보고 정리중"
tag: [c sharp]
use_math: true
---

## Attribute

```[[target:] Attribute]``` 형식으로 사용된다.

Attribute 에는 Attribute Class 를 지정하면 되는데 다양한 방법이 있다.
+ ```[MyAttribute]``` 처럼 해당 Attribute Type 만 둘 수도 있고 
+ ```[My]``` 처럼 클래스 이름에 Attribute 접미사가 있으면 생략할 수도 있고
+ ```[My()]``` 처럼 생성자를 호출 할 수도 있다. 이 경우 매개변수도 넣을 수 있다.

target 에는 ```method```, ```field```, ```property```, ```event```, ```param```, ```return```, ```type```,  ```typevar```,  ```module```, ```assembly``` 의 예약어가 들어가 적용대상을 지정한다. 기본적으로 생략가능하지만 꼭 명시해야하는 경우가 있다.
+  기본적으로 Method 에는 ```method``` 가 적용되므로 ```[return: marshalAs(UnmanagedType.I4)]``` 같은 경우 명시적으로 지정해야한다.
+ parameter 에는 ```void AAA([CallerLineNumber] int lineNumber = 0)``` 처럼 적용할 수 있는데 보통 default value 를 넣어줘야한다.
+ 관례 상 사용되는 ```AssemblyInfo.cs``` 에는 ```[assembly: AssemblyVersion("1.0.0.0")]``` 식으로 Attribute 를 넣어둔다. 이때 Assembly 는 코드가 없으므로 적용가능 대상을 자동으로 유추할 수 없어 직접 쓴다.


### AttributeUsage

Attribute Class 에 적용하는 Attribute 로 ```AttributeUsage``` 라는 Attribute 가 있다. 이를 이용해서 Attribute 의 기능에 제약을 걸 수 있다.

생성자로 받을 수 있는 ```valindOn``` 은 ```AttributeTargets``` 라는 Enum 을 받는다. Attribute Target 예약어와 일대다로 대응되며 Flag 연산이 가능하다. 예를들어 ```[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]``` 이렇게 쓸 수 있다.


### 이외 잘 쓰이는 것들

```Conditional``` Attribute 는 특정 전처리 상수가 있는 경우에만 컴파일을 한다는 것으로 ```#if``` / ```#endif``` 문이랑 비슷한 기능을 한다.

C# 5.0 에 디버깅 용으로 좋은 ```CallerLineNumber```, ```CallerMemberName```, ```CallerFilePath``` 가 추가되었다. 적용가능 대상은 ```param``` 이다. Default Value 를 요구하는데 컴파일러에 의해 적절한 값으로 치환되는 방식으로 구현된다.

C# 10.0 에 ```CallerArgumentExpression``` 이 추가되어 Argument 에 있는 Expression 을 문자열로 얻을 수 있다. 적용가능 대상은 ```param``` 이다.



## Exception

CLR 에서 정의된 예외는 ```System.SystemException``` 을 상속받고, 사용자가 정의한 예외는 ```System.ApplicationException``` 을 상속받는 것이 관례였으나 요즘은 그냥 ```System.Exception``` 에서 직접 상속받는 것이 추천된다. 큰 프로젝트가 아니라면 번거로움 때문에 상속도 하지 않고 그냥 문자열 인자로만 에러를 구분하는 경우도 많다.

```throw``` 와 ```try```/```catch``` 문은 보통 다음처럼 쓰인다.
+ ```public``` 메서드에서 인지값 등이 옳바르지 않으면 던지는 것이 좋다.
+ ```try```/```catch``` 문은 보통 스레드 단위마다 단 한번만 전역적으로 쓰인다. 예외처리 구간이 많으면 Swallowing Exceptions 가 발생할 수 있기 때문이다.
+ Resource 수거 목적인 ```try```/```finally``` 는 권장된다.


```catch``` 문에서 ```throw;``` 만하면 기존 예외를 이어서 던질 수 있어서 호출스택 등의 정보가 보존이 된다. 만약 ```catch() { if(A) throw; }``` 를 쓰게된다면 C# 6.0 부터는  ```try ... catch() when (!A)``` 을 사용할 수도 있다. IL 수준에서 지원하는 기능이었는데 C# 6.0 이 되서야 쓸 수 있게 되었다.





## LINQ (C# 3.0)

LINQ 는 Language Integrated Query 의 준말로 ```select a from aaa where a = 10``` 같은 SQL Query Clause 가 .Net 언어에 통합되었다는 의미이다. MS 는 __SQL Standard Query Operator__ 를 정의해서 이를 .Net 언어에 구현하는 방식을 취했는데 언어마다 지원하는 정도가 다르다.

C# 3.0 에서는 LINQ 를 지원하기 위해서 여러 기능이 추가되었다. 
+ ```from```, ```where```, ```join in on into``` 등 SQL 예약어가 추가되었고
+ 간단한 쿼리문과 중첩 쿼리문을 위한 ```var```, 객체 Intialize, Anonymous Type, Lamba Expression 가 추가되었고
+ 기존 ```IEnumerable<T>```, ```IOrderedEnumerable<T>``` 의 Extension Method 로 Linq Method 가 추가되었다.

LINQ 는 Collection 뿐만 아니라 관계형 DB, XML 등의 다른 데이터들에 대한 접근법을 통일한다. ```IEnumerable<T>``` 를 상속받은 LINQ Provider 를 만들면 간단하게 연동할 수 있기 때문이다.


#### 지연실행

LINQ Query 는 크게 __즉시실행__ 과 __지연실행__ 이 있으며 대부분 후자이다. 
+ 지연실행하는 쿼리의 결과를 얻어 값을 확정직는 것을 인스턴스화라고 한다. 
+ 인스턴스화는 즉시실행 쿼리를 수행하는 시점이나, 상식적으로 실제 결과 값이 쓰이는 지점인 ```foreach``` 등에서 일어난다.
+ Emmediate / Lazy 각각의 버전이 있는데 예를들어 ```ConvertAll()``` => ```Select()```, ```FindAll()``` => ```Where()```, ```Sort()``` => ```OrderBy()``` 등이 있다.


지연실행은 인스턴스화가 되기 전까지 값이 바뀌지 않으며, __인스턴스화를 할 때마다 지연실행하는 LINQ Query 가 실행된다.__ 예를들어 반복문에서 ```Count()``` 를 할 때마다 정렬을 수행할 수 있으니 주의해야한다.

```ToArray()``` 나 ```ToList()``` 는 즉시실행하며 전체 데이터가 필요하다. 그래서 아래처럼 일부 데이터만 얻으면 되고 데이터를 얻기위한 비용이 크다면 주의해야한다.

{% highlight c# %}
private static IEnumerable<int> enumSample()
{
    yield return 1;
    Task.Delay(1000).Wait();
    yield return 2;
}
public static void Main()
{
    var start = DateTime.Now;
    var q = enumSample();
    Console.WriteLine(DateTime.Now - start);

    start = DateTime.Now;
    var ar = q.ToArray(); // 1초 이상 걸림
    Console.WriteLine(DateTime.Now - start);
}
{% endhighlight %}


#### 성능

```Single()``` 과 ```First()``` 는 item 이 하나 뿐일 때는 전자가 갯수 검사 때문에 조금 더 시간이 걸린다. 둘 다 ```s.First(c => c == 'a');``` 같이 delegate 를 이용해 조건에 맞는 첫번째 혹은 유일한 요소를 얻을 수 있다. 

```IEnumerable ``` 의 ```Count()``` 는 루프를 돌아 값을 얻는다. 대신 ```ICollection``` 의 ```Count```, ```Array``` 의 ```Length``` property 를 대신 쓸 수 있다. 하지만 두 property 는 서로 호환이 안된다.

```IEnumerable``` 의 ```ElementAt()``` 같은 경우도 임의 접근처럼 보여도 순차접근이다.


#### 기타

```Cast<>()``` 는 ```IEnumerable``` 의 타입을 바꾸되 불가능하면 예외를 던지고 ```OfType<>()``` 은 형에 맞는 데이터만 들고온다.

```First()``` 대신 ```FirstOrDefault()``` 같이 기본값을 주는 메소드를 쓰면 예외를 피할 수 있다. 

```ToArray()``` 와 ```ToList()``` 는 큰 성능차이는 없는데, ```List<>``` 특성 상 ```foreach``` 도는 중에 원본 값이 바뀌면 에러를 내놓는다는 점에서 의도를 전할 수 있다.





## Container

### Array

{% highlight c# %}

var a = new int[10]{1,2,3,4};
var b = new int[]{1,2,3,4};

var c = new int[10, 10]; // uniform array
var d = new int[10][];   // jagged array
d[0] = new int[4];
d[1] = new int[5];

{% endhighlight %}

### Collection Intializer

{% highlight c# %}

// C# 3.0 에서 추가
// 컴파일러에서 a.Add() 함수 호출로 변경됨. 그래서 Dictionary 의 경우 키 중복 불가능
var a = new List<int, string>
{
  { 0, "asdf"},
  { 1, "asdf"}
};

// C# 6.0 에서 추가
// 컴파일러에서 b[0] = "asfd"; 로 변경됨. 그래서 키 중복 가능
var a = new Dictionary<int, string>
{
  [0] = "asdf"},
  [4] = "asdf"}
};

{% endhighlight %}

위는 ```ICollection<T>``` 의 상속을 받아야만 적용이 된다. 




## Misc

#### Serialize

기본 Value Type 은 ```System.BitConverter``` 를 이용한다. 복합타입은 ```BinaryFormatter```, ```XmlSerializer```, ```DataContractJsonSerializer``` 등을 이용할 수 있다.

위와 같은 데이터를 저장하는 방법은 보통 Sream 과 StreamWriter/Reader 를 이용한다. 
+ Stream 으로는 ```System.IO.MemoryStream``` 이나 ```System.IO.FileStream``` 가 있다.
+ 후자는 Stream 에 데이터를 넣는 것을 편하게 해주는 클래스로 다음과 같은 것들이 있다.
  + 문자열로 변환해 특정 인코딩 방식으로 변환하는 ```System.IO.StreamWriter/Reader```
  + Binary Data 로 변환하는 ```System.IO.BinaryWriter```


#### Window Registry

XCopy 배포를 선호해서 잘 쓰이진 않지만 시스텀 환경변수를 간단하게 조회할 수 있는 방법이 있다.

{% highlight c# %}

using Microsoft.Win32;

using (RegistryKey systemKey = Registry.LocalMachine.OpenSubKey(@"HARDWARE\DESCRIPTION\System\BIOS"))
{
    string biosDate = (string)systemKey.GetValue("BIOSReleaseDate");
    string biosMaker = (string)systemKey.GetValue("BIOSVendor");

    Console.WriteLine("BIOS 날짜: " + biosDate);
    Console.WriteLine("BIOS 제조사: " + biosMaker);
}

{% endhighlight %}



## 참고자료

[시작하세요 C# 10.0 프로그래밍](https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=303298623)

[C# 코딩의 기술 실전편](https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=88531749)