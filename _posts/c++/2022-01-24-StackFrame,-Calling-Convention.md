---
excerpt: "Thread 기초"
categories: c++
tag: [c++, thread]
use_math: true
---

## Stack Frame

Process 의 시작점인 ```main()``` 을 포함한 함수는 Stack 으로 구현되어 있음.
+ 함수를 호출하고 끝낼 때 스택에서 관련 정보가 Push/Pop 됨.
+ 이때 일정한 규칙을 가지고 함수호출정보가 저장이 됨. 

이러한 

함수가 호출되었을 때 __Parameter, Return Address, Local Variable__ 등이 관리가 되어 

### 주의

함수 내부의 ```{ ... }``` 같은 Block Scope 는 스택과 비슷한 역할을 하지만 컴파일러와 관련이 없음. [관련질문](https://softwareengineering.stackexchange.com/questions/125792/in-c-c-are-block-scope-variables-stacked-only-if-the-block-is-executed)


### 예시 1

{% highlight c++ %}
#include <stdio.h>

int Func(int a, int b, int c)
{
    printf("%d %d %d", a, b, c);
    return a;
}

int main()
{
    int a[8] = {1, 2, 3};
    Func(a[0], a[1], a[2]);
}
{% endhighlight %}

를 바이너리로 분석하면

```
main()

0x000000000000067c <+0>:     push   rbp
0x000000000000067d <+1>:     mov    rbp,rsp
0x0000000000000680 <+4>:     sub    rsp,0x20
0x0000000000000684 <+8>:     mov    QWORD PTR [rbp-0x20],0x0
0x000000000000068c <+16>:    mov    QWORD PTR [rbp-0x18],0x0
0x0000000000000694 <+24>:    mov    QWORD PTR [rbp-0x10],0x0
0x000000000000069c <+32>:    mov    QWORD PTR [rbp-0x8],0x0
0x00000000000006a4 <+40>:    mov    DWORD PTR [rbp-0x20],0x1
0x00000000000006ab <+47>:    mov    DWORD PTR [rbp-0x1c],0x2
0x00000000000006b2 <+54>:    mov    DWORD PTR [rbp-0x18],0x3
0x00000000000006b9 <+61>:    mov    edx,DWORD PTR [rbp-0x18]
0x00000000000006bc <+64>:    mov    ecx,DWORD PTR [rbp-0x1c]
0x00000000000006bf <+67>:    mov    eax,DWORD PTR [rbp-0x20]
0x00000000000006c2 <+70>:    mov    esi,ecx
0x00000000000006c4 <+72>:    mov    edi,eax
0x00000000000006c6 <+74>:    call   0x64a <Func>
0x00000000000006cb <+79>:    mov    eax,0x0
0x00000000000006d0 <+84>:    leave
0x00000000000006d1 <+85>:    ret
```

```
Func()

0x000000000000064a <+0>:     push   rbp
0x000000000000064b <+1>:     mov    rbp,rsp
0x000000000000064e <+4>:     sub    rsp,0x10
0x0000000000000652 <+8>:     mov    DWORD PTR [rbp-0x4],edi
0x0000000000000655 <+11>:    mov    DWORD PTR [rbp-0x8],esi
0x0000000000000658 <+14>:    mov    DWORD PTR [rbp-0xc],edx
0x000000000000065b <+17>:    mov    ecx,DWORD PTR [rbp-0xc]
0x000000000000065e <+20>:    mov    edx,DWORD PTR [rbp-0x8]
0x0000000000000661 <+23>:    mov    eax,DWORD PTR [rbp-0x4]
0x0000000000000664 <+26>:    mov    esi,eax
0x0000000000000666 <+28>:    lea    rdi,[rip+0xf7]        # 0x764
0x000000000000066d <+35>:    mov    eax,0x0
0x0000000000000672 <+40>:    call   0x520 <printf@plt>
0x0000000000000677 <+45>:    mov    eax,DWORD PTR [rbp-0x4]
0x000000000000067a <+48>:    leave
0x000000000000067b <+49>:    ret
```

