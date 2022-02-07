---
excerpt: "리눅스 어셈블리로 System Call"
tag: [OS]
use_math: true
---

## x86-64 Linux System Call

[Dream Hack](https://dreamhack.io/) 에서 제공하는 어셈블리 중에 매번 가기 귀찮아 메모

### Parameter

+ rax => System Call 
+ rdi -> rsi ->rdx -> rcx -> r8 -> r9 -> stack

### System Call Table

| 이름 | rax | rdi | rsi | rdx |
|-----|-----|------|----|-----|
|read|0x00|uint fx (std-io : 0x01)|char* buf|size_t count|
|write|0x01|uint fx|const char* buf|size_t count|
|open|0x02|const char* file_name|int flags|umode_t mode|
|close|0x03|uint fx| | |
|mprotect|0x0a|ulong start|size_t len|ulong prot|
|connect|0x2a|int sockfx|struct sockaddr* addr|int addrlen|
|execve|0x3b|const char* filename|const char* const* argv|const char* const* envp|