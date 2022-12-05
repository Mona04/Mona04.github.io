---
excerpt: "시작하세요 C# 10.0 프로그래밍 보고 정리중"
tag: [c sharp]
use_math: true
---

## 기본요소

### Keyword / Identifier

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

### Variable / Literal

__Literal__ 은 Source Code 에 포함된 값을 의미한다. 

__Variable__ 은 Value Type 과 Reference Type 이 있는데 전자는 Stack 에 저장되고 후자는 Heap 에 저장된다.

### Operator

### Punctuator


## Type

### Type Conversion

Implicit Conversion 은 단순히 대입해도 컴파일러가 오류로 간주하지 않고 Type 을 바꾸는 것이다. 범위가 작은 자료형에서 큰 자료형으로 담는 경우, 

Explicit Conversion 은 개발자가 직접 ```(int)var``` 같이 Cast Operator 를 넣어주는 변환이다.

## Class

#### Finalizer

일반 reference object 와 달리 더 복잡한 과정이 필요해서 성능에 차이를 준다. 그래서 .Net 이 관리하지 않는 시스템 자원을 얻는 경우에만 정의하는 것이 추천된다. GC Finalization Queue 에 들어가지 않기를 원한다면 ```IDispose``` 를 사용할 수도 있다.

참고로 .Net 은 Memory 를 관리하지 Resource 를 관리하는게 아니다. 자세한건 [SO](https://stackoverflow.com/questions/35386769/why-net-cannot-manage-unmanaged-memory)를 참고하자.

#### Static Intializer

c++ 과 다르게 Static Member 를 초기화할 수 있는 함수를 만들 수 있다. 클래스의 멤버에 접근하는 시점에 단 한번만 실행된다.

여기서 오류가 발생하면 해당 클래스 자체를 사용할 수 없으며 에러를 잡기도 까다로우므로 주의해야한다.