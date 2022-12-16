---
excerpt: "시작하세요 C# 10.0 프로그래밍 보고 정리중"
tag: [c sharp]
use_math: true
---


## Collection

### Array

{% highlight c# %}

var a = new int[10]{1,2,3,4};
var b = new int[]{1,2,3,4};

var c = new int[10, 10]; // uniform array
var d = new int[10][];   // jagged array
d[0] = new int[4];
d[1] = new int[5];

{% endhighlight %}


### String.Format

String 은 Immutable Object 이므로 문자열을 바꾸거나 합치는 연산은 비교적 계산량이 많다. 대신 ```String.Format``` 을 이용하면 ```StringBuilder``` 처럼 하나의 메모리 영역만 힙에 생성하므로 더 빠르다.

```$``` 접두사는 이를 축약한 것이고 형식 문자열도 지원해서 다음과 같이 할 수도 있다.

{% highlight c# %}

// {값, [, 정렬][:형식문자열]}
$"이름: {Name,10}, 나이: {Age, 5:X}";

{% endhighlight %}


## Serialize

Binary 로 바꾸려면
+ 기본 Value Type 은 ```System.BitConverter``` 를 이용한다.
+ 그 값을 ```System.IO.MemoryStream``` 을 이용하면 편하게 넣을 수 있다.  
  + 이때 ```MemoryStream``` 에 넣을 ```byte[]``` 로 변환하는 과정을 대신 해주는 클래스가 있다.
  + 문자열로 변환해 특정 인코딩 방식으로 변환하는 ```System.IO.StreamWriter/Reader```
  + Binary Data 로 변환하는 ```System.IO.BinaryWriter```

복합타입에 대한 직렬화 용도로 ```BinaryFormatter```, ```XmlSerializer```, ```DataContractJsonSerializer``` 등이 있다.

