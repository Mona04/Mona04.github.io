---
excerpt: "C# 의 Array 와 Span 관련 정리"
tag: [c sharp]
use_math: true
---

## Array

C# 에서 다룰 수 있는 배열은 3가지가 있다.
1. 기본적으로 사용하는 ```System.Array``` 를 상속하는 managed heap
3. unmanaged heap 
2. unsafe 에서 가능한 스택에 메모리를 할당하는 ```stackalloc```

### Index / Range (C# 8.0)

```System.Index``` 타입인 인덱스 연산자와 ```System.Range``` 인 범위 연산자가 새로 생겼다.
+ 인덱스 연산자는 ```a[^n]``` 로 사용하며 뒤에서부터 ```n``` 번째 위치로 맨 뒤가 1 이다. 앞/뒤부터인지 설정하는 옵션도 있다.
+ 범위 연산자는 ```a[n1..n2]``` 로 사용하며 ```[n1, n2)``` 범위를 리턴한다. ```[0..^0]``` 은 전체 범위가 된다.



## Span (C# 7.2)

```Span<T>``` 는 Array 에 대한 View 이다. 
+ 내부에서 Memory 를 할당하거나 해제하지 않는다. 당연히 ```Slice()``` 를 호출하거나 ```ReadOnlySpan``` 으로 타입을 바꿀 때 배열 데이터가 복사되지 않는다. 
+ ```stackalloc``` 을 unsafe 가 아니어도 쓸 수 있게 한다. 
+ 위 3가지 배열 모두 같은 클래스로 처리할 수 있게 된다.
+ Unmanaged Array 에서 Access Violation 오류로 프로그램이 강제로 종료하지 않고 예외를 발생시키게 해준다.

```Span<T>``` 는 GC 알고리즘 등을 이유로 Stack 에만 생성될 수 있는 ```ref struct``` 이므로 Field 등에 저장할 수 없는 제약을 갖는다. 



## 참고자료

[시작하세요 C# 10 프로그래밍]((https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=303298623))

[닷넷의 관리 포인터와 System.TypeReference](https://www.sysnet.pe.kr/2/0/11529)

[Span 을 사용해야할 5가지 이유](https://jacking75.github.io/NET_Span_5_Reasons_to_Use/)

[MSDN, StackAlloc](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/stackalloc)