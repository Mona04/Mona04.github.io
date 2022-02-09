---
excerpt: "DreamHack 의 가장 기초 문제"
tag: [Linux, SystemHacking]
use_math: true
---

## 문제

[문제 사이트](https://dreamhack.io/wargame/challenges/410/questions) 

```
 5fa:   6a 00                   pushq  $0x0
 5fc:   48 b8 6f 6f 6f 6f 6f    movabs $0x676e6f6f6f6f6f6f,%rax
 603:   6f 6e 67
 606:   50                      push   %rax
 607:   48 b8 61 6d 65 5f 69    movabs $0x6c5f73695f656d61,%rax
 60e:   73 5f 6c
 611:   50                      push   %rax
 612:   48 b8 63 2f 66 6c 61    movabs $0x6e5f67616c662f63,%rax
 619:   67 5f 6e
 61c:   50                      push   %rax
 61d:   48 b8 65 6c 6c 5f 62    movabs $0x697361625f6c6c65,%rax
 624:   61 73 69
 627:   50                      push   %rax
 628:   48 b8 2f 68 6f 6d 65    movabs $0x68732f656d6f682f,%rax
 62f:   2f 73 68
 632:   50                      push   %rax
 633:   48 89 e7                mov    %rsp,%rdi
 636:   48 31 f6                xor    %rsi,%rsi
 639:   48 31 d2                xor    %rdx,%rdx
 63c:   48 c7 c0 02 00 00 00    mov    $0x2,%rax
 643:   0f 05                   syscall
 645:   48 89 c7                mov    %rax,%rdi
 648:   48 89 e6                mov    %rsp,%rsi
 64b:   48 83 ee 30             sub    $0x30,%rsi
 64f:   48 c7 c2 30 00 00 00    mov    $0x30,%rdx
 656:   48 c7 c0 00 00 00 00    mov    $0x0,%rax
 65d:   0f 05                   syscall
 65f:   48 c7 c7 01 00 00 00    mov    $0x1,%rdi
 666:   48 c7 c0 01 00 00 00    mov    $0x1,%rax
 66d:   0f 05                   syscall
 66f:   48 31 ff                xor    %rdi,%rdi
 672:   48 c7 c0 3c 00 00 00    mov    $0x3c,%rax
 679:   0f 05                   syscall
```

### 설명

Littile endian 이라는 것만 주의하면 되는 튜토리얼.