---
excerpt: "Scheduling 의 간략한 정리"
tag: [OS]
use_math: true
---

## Multi Programming

한정된 CPU 가 여러개의 Process 를 __동시에__ 실행시키기 위해 필요함. (Multi Process)
+ cf) RealTime OS 는 DeadLine 이 있어 그 안에 끝내려는 OS 고 Mutil Process 와는 다름.


### PCB

[Process Control Block](https://en.wikipedia.org/wiki/Process_control_block) 의 줄임말

메모리에 저장되는 Process 관련된 모든 정보
+ PID(Process ID), Process State ( Running, Ready), PC, Registers, MMU Infos(Base, Limit), CPU Time(실행시간), List of Open File, ...

Process 가 CPU 를 점유하다가 Context-Switching 때 저장되고 복구됨.
+ 특별히 보호된 메모리 영역에 저장됨


### Process State

+ New, Job Queue => Memory 로 올라온 상태
+ Ready, Ready Queue => 실행할 준비가 된 상태
+ Waiting, Device Queue => I/O 등으로 대기중인 상태, 끝나면 Ready State
+ Running => CPU, Time Expired 이면 Ready State
+ Terminate => 끝


## Scheduling

[Wiki](https://en.wikipedia.org/wiki/Scheduling_(computing)) 에 워낙 잘 설명되어 있음

상용되는 운영체제는 아래 알고리즘을 포함해 이것저것 다 조합함.


### Scheduler 종류

+ Short Term Scheduler (Ready Queue) 
+ Long Term Scheduler (Job Queue)
  + 한정된 크기의 Job Queue 혹은 Memory 에 Process 를 얼마나 올릴지 관리  
  + Virtual Memory 를 쓰면 Medium Term 이 일을 대체하게 됨.
  + CPU, I/O Bound Process 가 적절히 배분되어야 함. 
+ Medium Term Scheduler (Swapping)
  + Memory 에 빈자리가 날 때 까지 새 Process 를 못올리는게 싫음.
  + 그래서 Memory 에서 I/O 등으로 안쓰거나 하면 Swapping 을 함.
  + Virtual Memory 를 쓰는 경우 [Demanding Paging](https://en.wikipedia.org/wiki/Demand_paging) 라고 볼 수 있음.
+ Dispatcher
  + Ready Queue -> CPU
  + Context Switching - PCB Store / Restore
  
### Scheduling Criteria

+ Preemptive / Non-Preemptive (선점, 비선점)
  + 높은 우선순위의 프로세스가 있을 때 바로 바꿔주느냐 - Preemptive

|종류|설명|
|------|--|
|CPU Utilization| % |
|Throughput     | 단위시간당 프로세스가 완료되는 갯수 |
|Average Response Time | Ready Qeue ~ First Execute,  Interactive OS 에서 중요함 |
|Average Turnaround Time|  Ready Queue ~ Terminate |
|Average Wait Time      |  Ready Queue 에 있던 총 시간 |

### 기본 Algorithms

FCFS (First Come First Serve)
+ Non-Preemptive
+ 오래 걸리는 일이 앞에 있으면 Average Wait Time 이 커짐 (호위효과)

SJF (Shortest Job First)
+ Preemptive / Non-Preemtive
+ Average Wait TIme 은 제일 좋음
+ Job 이 얼마나 걸리는지 알 수가 없어서 불가능하거나 예측해야함
  + 예측 = Overhead

Priority Scheduling
+ Preemptive
+ Priority 기준은 다양할 수 있는데, 낮은 우선순위는 Starvation 이 가능함.
  + Aging 을 도입해 오래 기다리면 우선순위를 올려줌

RR(Roung Robin)
+ Preemptive
+ 10~100 ms 로 Time Quantum 을 둠
  + 일정시간이 지나면 Ready Queue 로 보내고, 끝나면 다음거 실행
  + 너무 작으면 Context-Switching Overheads 가 커지고
  + 또 값에 따라 성능도 달라져서 적절히 조절해야함 

### 중첩 Queue 알고리즘

Muti-Level Queue 
+ System, Interactive 등 Process 종류를 두어서 각각 Queue 를 둠
+ Queue 마다 CPU Time 을 차등 배분.
+ Queue 마다 Scheduling Algorithms 이 다름.

Muti-Level Feedback Queue
+ 모두 낮은 Level Queue 로 시작하고 안끝나면 점점 더 높은 큐로 보냄



