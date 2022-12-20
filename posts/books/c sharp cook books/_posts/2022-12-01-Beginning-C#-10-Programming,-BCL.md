---
excerpt: "시작하세요 C# 10.0 프로그래밍 보고 정리중"
tag: [c sharp]
use_math: true
---


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

### Collection

C# 1.0 부터 있던 ```ArrayList``` 는 ```object``` 형식으로 값을 받아 Boxing 이 일어난다. 그래서 C# 2.0 에는 Generic 이 적용된 ```List<T>``` 를 지원하여 Value Type 에서 부담없이 사용할 수 있다.

```Hashtable```, ```SortedList``` 는 모두 Key / Value 로 값을 보관한다.



### String.Format

String 은 Immutable Object 이므로 문자열을 바꾸거나 합치는 연산은 비교적 계산량이 많다. 대신 ```String.Format``` 을 이용하면 ```StringBuilder``` 처럼 하나의 메모리 영역만 힙에 생성하므로 더 빠르다.

```$``` 접두사는 이를 축약한 것이고 형식 문자열도 지원해서 다음과 같이 할 수도 있다.

{% highlight c# %}

// {값, [, 정렬][:형식문자열]}
$"이름: {Name,10}, 나이: {Age, 5:X}";

{% endhighlight %}



## Threading

스레드 동기화를 위해 제공되는 건 다음과 같다.
+ ```Monitor.Enter()``` 과 ```Monitor.Exit()```  을 사용하면 그 구간에는 한 스레드만이 진입해서 실행할 수 있다. 이는 ```lock``` Context 로 축약해서 사용할 수 있다.
+ ```Interlocked.Exchange()``` 처럼 단순한 유형의 Atomic 연산을 지원한다.

```ThreadPool.QueueUserWorkItem()``` 을 이용하면 일정 시간동안 해당 스레드가 종료되도 삭제되지 않고 유지된다. 이때 ```Thread.Join()``` 을 하는 방법은 ```EventWaitHandle``` 을 파라피터로 넣어서 지원되는 메소드를 사용하는 것이다. 이때 리셋를 자동 옵션을 꺼두면 대기하는 여러 스레드 중에 하나만 깨어나게 조절할 수 있다.

### Async

Thread 를 이용해서 동기적 함수를 호출했을 경우 스레드에서 불필요한 작업을 할 수 있다. 예를들어 A 함수 내에서 동기화를 위해 내부적으로 Thread 를 생성한다면, A 함수를 굳이 다시 Thread 로 생성해서 호출할 이유가 없다. 이를 위해서 비동기적 함수라는 개념이 도입되었다.

+ 과거에는 delegate 에서 지원하는 ```BeginInvoke()``` 를 사용하는 패턴을 썼지만 .Net Framework 에만 지원된다. 
+ 지금은 ```Task``` 를 이용하는 [TAP 패턴](https://learn.microsoft.com/ko-kr/dotnet/standard/asynchronous-programming-patterns/task-based-asynchronous-pattern-tap) 을 쓰도록 권장한다. ```async``` 예약어를 붙여서 ```Task<T>``` 가 리턴되게 해서 동기화를 지원한다.







## Serialize

기본 Value Type 은 ```System.BitConverter``` 를 이용한다. 복합타입은 ```BinaryFormatter```, ```XmlSerializer```, ```DataContractJsonSerializer``` 등을 이용할 수 있다.

위와 같은 데이터를 저장하는 방법은 보통 Sream 과 StreamWriter/Reader 를 이용한다. 
+ Stream 으로는 ```System.IO.MemoryStream``` 이나 ```System.IO.FileStream``` 가 있다.
+ 후자로는 다음과 같은 예가 있다.
  + 문자열로 변환해 특정 인코딩 방식으로 변환하는 ```System.IO.StreamWriter/Reader```
  + Binary Data 로 변환하는 ```System.IO.BinaryWriter```

