---
excerpt: "Addressing Mode, Scheduling"
tag: [OS]
use_math: true
---


## Addressing Mode

Memory 관련 기법으로 Dual Mode 가 Instruction 관련 기법인 것과 비교됨.

여러 모드가 있지만 [Real Mode](https://en.wikipedia.org/wiki/Real_mode)와 [Protected Mode](https://en.wikipedia.org/wiki/Protected_mode) 가 대표적임.
+ Protected 모드에서 Process 의 주소가 물리 메모리 주소와 일치하지 않지만, Real Mode 는 일치해서 이런 명명이 됨.

옛날 DOS 같은건 Real Mode 로 실행되었지만 요즘은
+ 부팅 시 Real Mode 로 BIOS(Basic I/O System) 가 Kernel 을 메모리에 올리고
+ 바로 Protected Mode 로 전환해서 시스템이 종료될 때 까지 돌아오지 않음.


### Protected Mode

중요한 특징으로는 아래와 같음
+ Process 가 Memory 에 접근할 때
+ MMU (Memory Management Unit) 장치를 통해 
+ 주어진 주소(__Virtual Adress__) 를 자신이 실제로 할당된 주소(__Physics Adress__) 로 매핑하므로
+ 다른 프로그램이나 OS 를 손상시킬 염려가 없고 (애초에 접근을 못하니까)
+ 여러 프로그램을 동시에 돌릴 수 있게 해줌 (물리 주소로 코딩된게 아니니까)

### PCB

[Process Control Block](https://en.wikipedia.org/wiki/Process_control_block) 의 줄임말

메모리에 저장되는 Process 관련된 정보
+ Process 가 CPU 를 점유하다가 Scheduling 나 Interrupt 에 의해 반환할 때 저장하는 것이 이것.
+ 특별히 보호된 메모리 영역에 저장됨


## Scheduling

한정된 CPU 가 여러개의 Process 를 __동시에__ 실행시키기 위해 필요함.

[Wiki](https://en.wikipedia.org/wiki/Scheduling_(computing)) 에 워낙 잘 설명되어 있어서 핵심 단어만 기록함. 
+ Todo: 나중에 정리하기. 너무 귀찮다.

### Scheduler 

+ Short Term Scheduler
  + Ready Queue 
+ Long Term Scheduler
  + 한정된 크기의 Jop Queue 혹은 Memory 에  Process 를 얼마나 올릴지 관리  
  + Virtual Memory 를 쓰면 사양되는 스케듈러.
+ Medium Term Scheduler
  + Memory 에서 I/O 등으로 안쓰거나 하면 Swapping 을 함.
  + Virtual Memory 를 쓰는 경우 [Demanding Paging](https://en.wikipedia.org/wiki/Demand_paging) 라고 볼 수 있음.
+ Dispatcher
  + Context Switching

### Sceduling Algorithms

비교 척도
+ Preemptive / Non-Preemptive (선점, 비선점)
  + 높은 우선순위의 프로세스가 있을 때 바로 바꿔주느냐 - Preemptive
+ Throughput - 단위시간당 프로세스가 완료되는 갯수
+ CPU Utilization,  Average Waiting Time
+ Turnaround Time, Response Time

