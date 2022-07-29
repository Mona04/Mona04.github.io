---
excerpt: "Stack Frame 와 Calling Convention"
categories: [c++]
tag: [c++, thread]
use_math: true
---

## Stack Frame

### 코드

{% highlight c++ %}
#include <stdio.h>

__attribute__((cdecl)) int Callee(int a, int b, int c)
{
    printf("%d %d %d", a, b, c);
    return a;
}

void Caller()
{
    int a[8];
    a[3] = Callee(a[0], a[1], a[2]);
}

int main()
{
    Caller();
}
{% endhighlight %}

위 코드를 64bit x86-64 환경인 우분투에서 ```gcc -m32 -fno-stack-protector -fno-pic -g -o ex ex.cpp``` 로 빌드함.

그리고 gbd 를 사용해 어셈블리를 분석하면 아래와 같음

```
Caller()

push   ebp           // prolog
mov    ebp, esp      // prolog, update ebp
sub    esp, 0x28     // make stack space
mov    ecx, 0x0
mov    eax, 0x20
and eax, 0xfffffffc
mov    edx, eax
mov    eax, 0x0
mov    DWORD PTR[ebp + eax * 1 - 0x28], ecx
add    eax, 0x4
cmp    eax, edx
jb     0x8048461 < Caller + 26 >
mov    DWORD PTR[ebp - 0x28], 0x1    // a[0] = 1
mov    DWORD PTR[ebp - 0x24], 0x2    // a[1] = 2
mov    DWORD PTR[ebp - 0x20], 0x3    // a[2] = 3
mov    ecx, DWORD PTR[ebp - 0x20]
mov    edx, DWORD PTR[ebp - 0x24]
mov    eax, DWORD PTR[ebp - 0x28]
sub    esp, 0x4                      // not relevent with parameter
push   ecx                           // parameter push
push   edx                           // parameter push
push   eax                           // parameter push
call   0x8048426 < Callee >          // funcion call
add    esp, 0x10                     // parameter clear (0x4 + 4*3)
mov    DWORD PTR[ebp - 0x1c], eax    // a[4] = return
nop
leave   // epilog
ret     // epilog
```

```
Callee()

push   ebp           // prolog
mov    ebp, esp      // prolog, update ebp
sub    esp, 0x8
push   DWORD PTR[ebp + 0x10]      // parameter a push
push   DWORD PTR[ebp + 0xc]       // parameter b push
push   DWORD PTR[ebp + 0x8]       // parameter c push 
push   0x650                      // parameter loc of "%d %d %d" push
call   0x542 < Callee + 21 >      // Function Call
add    esp, 0x10                  // Clear Stack for Parameters
mov    eax, DWORD PTR[ebp + 0x8]  // return a;
leave              // epilog
ret                // epilog
```

[Wiki](https://en.wikipedia.org/wiki/X86_calling_conventions) 에서 자세한 어셈블리 분석을 볼 수 있음.


### 개념 <br/>

__함수 호출 시 스택 영역에 저장되는 함수의 호출 정보를 Stack Frame 이라고 함__

+ Caller / Callee
  + ```Func()``` 함수를 ```Main()``` 에서 호출하고 있음.
  + 이때 ```Main()``` 을  __Caller__ 라고 부르고  ```Func()``` 을 __Callee__ 라고 함.<br/><br/>

+ Littile Endian 주의 
  + 헷갈리기 쉬운데 [Little Endian 참고](http://www.tcpschool.com/c/c_refer_endian)
  + 지금은 x86-64 를 쓰므로 Little Endian 임
  + Stack 이 __주소가 작아질수록 스택이 쌓이게 됨__
  + => ```sub``` 가 스택을 쌓는거고 ```add``` 가 스택을 빼는 것임 <br/><br/>

+ 기본적으로 2개의 값이 Stack 에 저장됨.
  1. __IP(```rip```/```eip```)__
    + ```call``` 명령어 시 ```push eip``` 가 수행된 후 Callee 로 점프함. 
    + Callee 가 끝날 때의 ```ret``` 명령시  ```pop eip``` 과 ```jmp eip``` 가 수행됨
  2. __SFP(Stack Frame Pointer)__
    + Caller 의 StackFrame 시작주소 혹은 Caller 의 ```ebp``` 를 말함. 
    + StackFrame 생성마다 스택에 저장되고 끝나면 다시 꺼냄.
  
  + Buffer Overflow 등으로 위 값들을 변경하면 의도치 않은 작동을 가능하게 함. <br/><br/>

+ Top of StackFrame 은 레지스터에서 계속 업데이트가 됨 
  + ```esp```/```rsp``` 가 StackFrame 의 Top 을 가르킴.
  + Callee 의 SFP 가 Caller 의 Top of StackFrame 이라 스택에 저장할 필요는 없음  <br/><br/>

+ 함수 내부의 ```{ ... }``` 같은 __Block Scope 는 스택과 비슷한 역할을 하지만 스택과 관련이 없음. [관련질문](https://softwareengineering.stackexchange.com/questions/125792/in-c-c-are-block-scope-variables-stacked-only-if-the-block-is-executed)

<br/>이하는 함수를 호출할 때 일어나는 순서대로 구분한 것임. <br/>


### Call <br/>

Parameter 를 Register 또는 Stack 에 집어 넣고  ```call [주소]``` 가 수행됨.

크게 2가지 동작을 함
  1. ```push eip``` 
  2. ```jmp [주소]```

### __Prolog__ <br/>

함수 앞부분에 나오는 ```push ebp``` 와 ```move ebp, esp``` 구문임.

1. ```push ebp``` 를 하면 ```ebp``` 가 스택에 저장되고 ```esp``` 가 포인터 크기만큼 감소함
2. ```move ebp, esp``` 를 하면 Caller 에서의 Top 인 ```esp``` 가 Callee 의 돌아갈 주소가 될 ```ebp``` 에 저장됨.

### Local Variable <br/>

함수 시작부분에 ```sub esp, 0x28``` 의 구문을 통해 스택공간을 확보함
+ 컴파일러 옵션에 따른 더미공간 + Local Variable Size 만큼 공간이 확보됨
+ Caller 를 보면 ```int a[8]``` 덕분에 ```4*8 = 0x20```만큼이 필요함
+ 그럼 나머지 ```0x08``` 은 더미임
  + Local Variable 이 없는 Callee 를 보면 ```sub esp, 0x8``` 을 확인 가능 

### __Epilog__ <br/>

함수 끝부분에 나오는 ```leave``` 와 ```ret``` 를 말함

+ ```leave``` 는 두가지 명령어의 축약으로 Prolog 의 정확한 역임
  1. ```mov esp, ebp``` 
     + ```esp``` 를 조작하지 않았다면 생략되기도 함.
  2. ```pop ebp```

+ ```ret``` 는 CALL 명령어에 의해 호출된 Callee 에서 Caller 로 복귀하는데 사용됨. 
  1. ```pop eip``` 
  2. ```jmp eip``` 


## Calling Convention

### 코드

```
Caller()

~
sub    esp,0x4      // not relevent with parameter
push   ecx
push   edx
push   eax
call   0x8048426 <Callee(int, int, int)>
add    esp,0x4      // not relevent with parameter
~
```

```
Callee()

~
leave
ret    0xc        // Clear stack for parameters
```

위는 원래 코드에서 호출규약만 ```stdcall``` 로 바꾼 걸 분석한 것임.


### 개념 <br/>

함수가 Parameter 등을 어떻게 전달하고 원상태로 돌리는지에 관한 규약
+ __parameters__, return values, return addresses and scope links 등의 정보가 
+ registers, stack or memory etc. 같은 장소에 저장되어
+ __함수 호출을 준비하고 호출 전 환경으로 복귀하는__ 방법

__기본적으로 x64 에서는 적용되지 않고 x86 에서만 적용됨__
+ x64 기본적으로 Register 를 쓴 후 미리 확보해놓은 Stack 에 나머지를 넣는 방식을 사용함.
+ 즉 이하에서 말하는 내용은 x64 에서는 적용안되며,  [```vectorcall```](https://docs.microsoft.com/ko-kr/cpp/cpp/vectorcall?view=msvc-170) 등이 적용가능함(Arm 제외) 

호출규약은 엄청 많은데 스택정리가 어떻게 되는지 위주로 여기서 살펴보려함

자세한 차이는 [위키 번역한 블로그](https://minusi.tistory.com/entry/%ED%95%A8%EC%88%98-%ED%98%B8%EC%B6%9C-%EA%B7%9C%EC%95%BDCalling-Convention) 나 [위키](https://en.wikipedia.org/wiki/Calling_convention) 참고.

### cdecl

+ C Declaration 의 약자로 x86 환경에서 기본적으로 사용됨

+ 인수는 오른쪽에서 왼쪽 순서대로 들어감.
  + 레지스터에 넣는경우(fastcall 등) 를 빼면 거의 이 순서임.<br/><br/>

+ __스택정리를 Caller 가 함__ 
  + Caller 가 ```push``` 를 통해 변수를 Stack 에 넣고
  + Caller 가```add esp, 0x10``` 을 통해 파라미터를 넣은 공간을 비움
  + 스택을 정리하는 코드가 호출때마다 있어서 용량이 약간 큼

### [stdcall](https://docs.microsoft.com/en-us/cpp/cpp/stdcall?view=msvc-170)

+ __ARM 이 아닌 x86 에서만 가능__ 하고 나머지에선 씹힘
+ WinApi, DirectX Api 등 MS 제공 API 에서 주로 사용됨
  + 멤버함수에 ```stdcall``` 를 쓰기도 하는데 자세한건 ```thiscall``` 참고

+ 인수는 오른쪽에서 왼쪽 순서대로 들어감

+ __스택정리를 Callee 가 함__
  + Caller 가 ```push``` 를 통해서 변수를 Stack 에 넣고
  + Callee 가 ```ret 0xc``` 를 통해서 스택을 정리함
    + 인자가 있어서 ```ret``` 에 추가로 ```add esp, 0xc``` 를 하는 것임.
  + 그래서 가변인자를 사용할 수 없음

### [thiscall](https://docs.microsoft.com/en-us/cpp/cpp/thiscall?view=msvc-170)

__ARM 이 아닌 x86 의 비정적 멤버함수__ 에서만 기본으로 적용되어 있음.
+ 즉 c++ 만 가능하며
+ x64, ARM 환경에서는 무시되고
+ 따로 안적으면 적용됨

어셈블리는 아래처럼 나타나며, 위는 적용안된 Ubuntu, 아래는 적용된 MSVN 환경임.

```
lea eax, this-pointer
push eax
call memberfunc
```

```
lea ecx, this-pointer
call memberfunc
```

위처럼 함수호출 전에 ```this``` 포인터를 레지스터에 넣는다는 것이 핵심임.
+ 어떤 레지스터인지, 인수정리는 누가 하는지는 컴파일러마다 다름
  + VS 에서 실험한 결과는 Callee 가 정리하고 으로 쓰면 Caller 가 정리함

다음과 같은 경우는 ```thiscall``` 이 적용이 안됨
  1. x64, ARM 환경이거나
  2.  ```...``` 를 붙이거나
  3.  ```cdecl```, ```stdcall``` 를 명시적으로 쓰는 경우

그런경우 위의 어셈블러가 보여주듯 ```this``` 를 __레지스터가 아니라 Stack 에 넣고__ , 인수정리는 각 호출규약이 하듯 처리함. 
+ DirectX 등을 보면 이런 경우가 많음