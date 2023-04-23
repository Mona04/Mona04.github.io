---
excerpt: "맨날 헷갈리는 엔디안 정리"
tag: []
use_math: true
---


## MSB(Most Significant Bit) 와 LSB(Least Significant Bit)

위 명칭은 숫자의 크기에 얼마나 영향을 주느냐는 의미를 담고 있다. 다시말해, 단순히 정수를 이진수로 나타낼 때 MSB 는 가장 높은 자리수가 되고, LSB 는 가장 작은 자리수가 된다.

주위해야할 점은 위 구분은 사람이 생각했을 때의 Bit Position 을 의미한다는 점이다. _물리적 주소 상의 위치를 말하는 것이 아니다._


## [Endian](https://ko.wikipedia.org/wiki/%EC%97%94%EB%94%94%EC%96%B8)

Endian 은 한번에 처리 가능한 메모리 크기보다 더 큰 크기의 Literal 을 저장할 때 어떤 순서로 저장할 지에 관한 용어이다. 

낮은 주소 쪽을 LSB 로 두면 Little Endian, MSB 로 두면 Big Endian 이 된다. 네트워크가 아닌 대부분의 환경이 Little Endian 이다.

다음과 같이 런타임에 체크할 수 있다.

{% highlight c++ %}

bool IsLittleEndian()
{
	int value = 1;
	return *(char*)&value == 1;
}

{% endhighlight %}


Endianess 에 따른 성능차이는 주로 사용하는 연산이 무엇이냐 (홀짝, 부호판별) 에 따라 존재했었지만 요즘은 거의 없다고 한다.



### 헷갈리기 쉬운 것들

> Endian 은 컴퓨터 하드웨어와 관련된 것이다.

내가 처음에 헷갈렸던 것은 구조체 배열 할당에도 적용이 되느냐였다. 이는 Endian 의 적용범위를 헷갈렸기 때문에 생긴 의문이다. 

예를들어 c++ 에서는 구조체에서 선언된 순서되로 메모리가 할당이 된다. 그리고 이는 언어의 표준과 관련된 것이지 Endianess 와는 아무런 관련이 없다.


> Endian 은 Word Size 보다 작은 단위를 프로그램이 조작하기 때문에 필요하다. 

보통 프로그램은 Byte 단위의 메모리를 조작할 수 있다. 하지만 CPU 는 종종 Word Size 의 값을 읽고 조작한다. 예를들어 x86 의 ALU 는 4 byte 의 값을 읽어서 계산할 것이다. 그런데 프로그램이 Byte 단위로 값을 조정해서 이를 ```int``` 로 해석해 덧셈한다고 생각해보자. CPU 가 이를 해석하는 방법을 모른다면 난감해질 것이다.


> bit 가 어떤 순서대로 저장되는지는 그럼 안정하냐?

하드웨어 수준에는 byte 를 나타내는 순서가 유의미하겠지만 소프트웨어 수준에서는 의미가 없다. 왜냐하면 일반적으로 한번에 처리 가능한 최소 단위가 Byte 이기 때문이다. 

하지만 예를들어 2byte 단위로 처리가능한 장비에서 byte 단위의 값을 저장해야한다고 생각해보자. 이런 경우는 Endian 을 정할 필요가 생긴다.

또한 통신에서 1Bit 단위로 데이터를 주는 경우 LSB/MSB 우선해서 주는지가 중요하겠다. 하지만 메모리보다는 프로토콜에 가까운 것 같다.


### 신경써야하나?

프로그래밍할 때 이를 체크하면서 해야하느냐? 평범한 응용프로그래머라면 그럴 일은 거의 없다. 왜냐하면 Intel, ARM Cpu 는 Little Endian 이기 때문이다. MIPS 나 다른 특수목적용 CPU 환경이거나 Network, Embedded 환경이 아니라면 굳이 Little / Big Endian 환경인지 고민할 필요는 없다.

그리고 두 환경에 모두 노출되더라도 언어의 추상성에서 대개 처리가 된다.

c 에서 ```a & 0b1``` 의 결과가 Endian 에 따라 달라질 거라 헷갈릴 수도 있다. 답은 달라지지 않는다이다. 왜냐하면 ```a``` 의 자료형에 맞추어, 예를들어 ```int``` 로 해석되어 ```a & 0x0001``` 과 같을 것이기 때문이다.

비슷하게 C 같은 고수준 프로그래밍 언어에서는 Bit 단위 연산은 Endian 과 관련이 없다. Endian 은 메모리에 저장되는 방식에 관한 것이고, Bit 단위 연산은 MSB/LSB 와 관련이 있기 때문이다. ```0x1234``` 를 ```>> 8``` 하면 결과는 언제나 ```0x0012``` 이다.

하지만 Word 보다 더 작은 단위로 쪼개서 계산하다가 CPU 연산을 한다던가 그런 일을 한다면 주의해야한다.

예를들어 위 결과물인 ```0x0012``` 를 byte 단위로 쪼개서 해석한다고 하자. 그럼 Endianess 에 따른 차이가 생긴다. 첫번째 byte 를 Big Endian 에서 얻는다면 그 결과는 ```0``` 이 되지만 Little Endian 에선 ```0x12``` 가 되기 때문이다. 



## 참고자료

[Wiki](https://en.wikipedia.org/wiki/Endianness)

[GeeksForGeeks](https://www.geeksforgeeks.org/little-and-big-endian-mystery/)


[SO - bit-ordering-and-endianess](https://stackoverflow.com/questions/2635484/bit-ordering-and-endianess)

[SO - bitshifting-on-little-endian-and-big-endian](https://stackoverflow.com/questions/30246030/bitshifting-on-little-endian-and-big-endian)

[SO - ascii-strings-and-endianness](https://stackoverflow.com/questions/1568057/ascii-strings-and-endianness)