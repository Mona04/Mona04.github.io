---
excerpt: "OS 의 멀티스레드 동기화"
tag: [c++, os]
use_math: true
---

## Process(Task)

실행 중인 Program

운영체제 상, Process 간에는 직접적 메모리 공유가 불가능하게 되어 있음.
+ IPC(Inter Process Communication) 을 통한 간접적 통신
+ Kernel 에 요청한 Shared Memory 를 사용한 통신.

## Thread

Process 내에서 함수 단위로 쪼개짐.
+ Thread 간에서 공유되지 않는 것.
  + Register
  + Stack Memory / Stack Pointer
  + Program Counter
+ Memeory 등 나머지는 공유되는 것.
  + 그래서 Process 에 비해 굉장이 가벼움.
+ Scheduling 도 Thread 단위로 수행이 됨.

생성 가능 갯수의 한계보다 메모리가 더 빨리 소모되니 갯수 걱정은 안해도 됨 [관련 SO](https://stackoverflow.com/questions/18330189/windows-and-linux-max-threads)



### Kernel / User Level Thread 

[간단히 설명된 블로그](https://www.crocus.co.kr/1255)

Threads Scheduling 
+ Kernel / User - Level Thread 의 Mapping 에 따라 달라짐.

그런데 최신 OS 는 Kernel Thread 를 사용한다고 보는게 맞을 듯.
+ [관련 SO](https://stackoverflow.com/questions/70985020/should-i-just-believe-that-stdthread-is-implemented-not-by-creating-user-threa/70988136#70988136)


Thread Pool
+ 오버헤드를 줄이기 위한 기법


## Thread Synchronization

### 원인

1. [Data Race](https://en.wikipedia.org/wiki/Race_condition#Data_race)
  + 일반적인 CPU Instruction 은 R&W 가 Atomic 하지 않아서 생기는 문제 
2. [Out of Order Execution](https://en.wikipedia.org/wiki/Out-of-order_execution)
  + Instruction Cycle 내에서 효율성을 위해 Instruction 처리 순서를 바꿈.
  + 이는 Core 내에서 같은 결과를 내지만 Multi Thread 에선 아님.
3. [Cache Coherence](https://en.wikipedia.org/wiki/Cache_coherence)
  + Core 당 Cache 를 따로 가져서 생기는 일관성 문제.
  + 과거에는 Bus 를 잠궜지만 요즘은 하드웨어 차원의 Protocol 로 보장
  + [관련 SO](https://stackoverflow.com/questions/14758088/how-are-atomic-operations-implemented-at-a-hardware-level)
  + [비용관련 SO](https://stackoverflow.com/questions/2538070/atomic-operation-cost/2783981#2783981)

[기타로 잘 정리된 블로그](https://velog.io/@codingskynet/C11-Memory-Model-Atomic%EB%B6%80%ED%84%B0-Lock-Free-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EA%B9%8C%EC%A7%80)


### Atomic Instruction

수행 함 / 수행 안함 두가지 상태만 관측 가능한 명령어
+ [정리 잘된 블로그](https://preshing.com/20130618/atomic-vs-non-atomic-operations/)
+ Intel 에서는 [Lock Prefix SO](https://stackoverflow.com/questions/29880015/lock-prefix-vs-mesi-protocol) 를 통해 __캐시를 잠그므로서__ 원자성을 보장함
+ 명령어가 다루는 기본 단위에 대해서는 Data Race 가 해결됨.

#### CAS

[CAS(Compare And Swap)](https://en.wikipedia.org/wiki/Compare-and-swap)
+ 스레드 동기화를 위한 작업에서 잘쓰이는 Atomic Instruction
  + Mutex, Semaphore 의 구현
  + Non-Blocking Algorithms
+ [관련 SO](https://stackoverflow.com/questions/22339466/how-compare-and-swap-works)

[ABA 문제](https://en.wikipedia.org/wiki/Compare-and-swap#ABA_problem)
+ CAS 를 이용한 멀티스레드 프로그램이 메모리 재할당시 생기는 문제
+ 우연히 재할당된 주소가 비교할 주소와 같아서 버그를 일으킴
+ 많은 기법이 가능성을 줄여주는데, GC 가 있으면 이 문제가 완전히 해결됨.



### Memory Barrier

Memory Fence 라고도 부르며 Memory Order 를 관리하는 명령어
+ [x86 에서의 Memory Fence ](https://stackoverflow.com/questions/50323347/how-many-memory-barriers-instructions-does-an-x86-cpu-have)

Memory Barrier 를 이용해서 스레드간 Out of Memory Order 문제를 해결함.
+ [모두의 코드의 C++ 예제](https://modoocode.com/271)
+ [Mutex 에서의 필요한 Memory Order, SO](https://stackoverflow.com/questions/17046558/how-does-a-mutex-ensure-a-variables-value-is-consistent-across-cores)



## Critical Section

일정 이상의 Thread 가 동시에 접근하면 안되는 Code 의 일부   

많은 방법이 있겠지만 ```Lock/Unlock``` 함수로 영역을 구분함.
+ 어떤 정수에 대해 CAS(Atomic) 로 특정 값이 있을 때만 영역을 통과함.
+ Memory Barrier 를 통해 영역 전후의 코드가 영역 안에 들어가지 못하게 함. [관련 IO](https://stackoverflow.com/questions/50951011/how-does-a-mutex-lock-and-unlock-functions-prevents-cpu-reordering)



### Semaphore

보통 OS 차원에서 구현이됨
+ 그래서 조건에 따라 System Call 을 수행하기도 함. [관련 SO](https://stackoverflow.com/questions/5176130/does-mutex-call-a-system-call)
+ 값을 바꾸는 중에 Interrupt 를 끄기도 함 [참고 SO](https://stackoverflow.com/questions/27561084/semaphore-implementation-why-is-disabling-interrupts-required-along-with-test)

구현에 따라 다르지만 SpineLock 이 아니면 내부에 Queue 를 두게 됨.
+ 이는 Ready Queue, I/O Queue 와 비슷한 Queue 임.
+ ```Lock()``` 에 들어오면 Queue 에 넣게 되어 스케듈링이 안됨.
+ ```Release()``` 에 들어오면 Queue 에 있던게 Ready Queue 로 가게 됨.


__Binary Semaphore 는 Mutex 와 다름__
+ Mutex 와 달리 ```Lock()``` 과 ```Release()``` 의 Thread 가 다를 수 있음
+ 그래서 Event 혹은 __Producer-Consumer Synchronization__ 에 가까움. 
  + 세마포어 값을 0 으로 하고 
  + 한 코드는 끝에 ```Release()``` 다른쪽은 시작에 ```Lock()``` 을 하면 
  + __순서를 부여할 수 있고, 신호처럼 쓸 수 있음__ 
  + Server 에서 많이 쓰임.




### Conditional Variable

같은 Mutex 를 가진 스레드끼리 __순서를 두어__ 통신하기 위한 클래스
+ [모두의 코드의 관련 문서](https://modoocode.com/270)
+ [Mutex 가 인자로 필요한 이유](https://stackoverflow.com/questions/2763714/why-do-pthreads-condition-variable-functions-require-a-mutex)
  + Mutex Unlock 하고 Sleep 해야하니까
+ 서버 프로그래밍에서 Producer / Consumer 패턴에 쓰임.




### Monitor

Semaphore 를 사용하기 쉽게 객체화 한 것으로 Java 에서 특히 많이 사용됨.

객체지향(Wrapping) + Mutex + Conditional Var 와 비슷하며 두가지 동기화를 지원함.

__Mutual Exclusion Synchronize__
+ 공유자원을 래핑한 것으로, 공유자원에 접근하려면 Method 를 통해야만 함
+ 이러한 Method 는 Semaphore 등으로 막혀서 __상호배타__ 를 만족시켜줌
+ 자바는 앞에 ```synchronized``` 를 적으면 적용시켜줌.

__Conditional Synchronize__
+ 추가로 __실행 순서__ 를 도와주는 메소드.
+ 예를들어 아래처럼 할 수 있음
  + 나중에 실행되어야 하는 메소드는 처음에 ```wait()``` 를
  + 먼저 실행되어야하는 메소드는 끝에 ```notify()``` 를 둚.

[Mutex 를 사용한 C++ Monitor Class](https://stackoverflow.com/questions/12647217/making-a-c-class-a-monitor-in-the-concurrent-sense)



## DeadLock

[Wiki](https://ko.wikipedia.org/wiki/%EA%B5%90%EC%B0%A9_%EC%83%81%ED%83%9C)

[식사하는 철학자 문제가 정리된 블로그](https://simsimjae.tistory.com/72)

DeadLock 의 발생요건
1. 상호 배제 : 한 자원은 동시에 한 대상만이 사용가능 => 필수
2. 점유 대기 : 한 자원을 점유한 채로 다른 자원 점유를 대기함
  + 한번에 다 점유시켜 해결 => Starving 의 가능성이 커짐.
3. 비선점 : 다른 대상이 점유 중인 자원을 반환 전까지 선점 불가 => 필수
4. 환형 대기 : 서로의 자원에 대해 점유 대기 상태를 유지
  + 자원에 번호를 매겨 순서대로 할당시켜 해결  
  + 그러면 $$(0, 1), (1, 2) ... (n, 0)$$ 이 $$ (0, 1), (1, 2) ... (0, n)$$ 이 되어 순환이 깨짐..
  + 모두 메모리에 올릴 수도 없는거도 매기는게 힘듬

DeadLock Avoidence
+ Banker's Algorithms [이 정리된 블로그](https://jhnyang.tistory.com/102)

DeadLock Detection
+ GC 처럼 주기적 검출 => 비용이 너무 큼