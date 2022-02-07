---
excerpt: "Address Mode, Paging / Segment, Virtual Memory"
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
+ __MMU (Memory Management Unit)__ 장치를 통해 
+ 주어진 주소(__Logic / Virtual Adress__) 를 자신이 실제로 할당된 주소(__Physics Adress__) 로 매핑하므로
+ 다른 프로그램이나 OS 를 손상시킬 염려가 없고 (애초에 접근을 못하니까)
+ 여러 프로그램을 동시에 돌릴 수 있게 해줌 (물리 주소로 코딩된게 아니니까)


### MMU

MMU(Memory Management Unit) 는 CPU 와 Memeory 사이에 존재함
+ Page-Segment Table 이 Process 마다 있어서 크기가 큼
+ 그래서  __TLB(Table Lookaside Buffer)__ 에 __일부만__ 담음.
  + SRam 등으로 이루어진 Cache 에 일부, 나머지는 Memory 에.
  + $$P_{Hit} * (T_B + T_M) + (1-P_{Hit})(T_B + 2 * T_M) $$ 정도 걸림.
  + Hit 비율이 95% 이상임.
+ 요즘은 CPU 안에 있음

다양한 기능 수행
+ Address Mapping
  +  __Logic / Virtual Address__ 를 __Physics Address__ 로 매핑함
  + Paging - Segment Table
  + Base / Limit Register 범위를 넘기면 Interrupt 를 보내게 됨.
+ Protection
  + ```r```, ```w```, ```e``` bit 가 추가로 있음.
    + 예를들어 Code Segment 는 ```r```, ```e``` 로 Read/Excute
  + 권한 밖이면 Interrupt 를 넣음
+ Sharing
  + 같은 프로그램을 여러개 실행 시 
  + Re-Entriant Code (Pure Code) 등 공통부분은 하나만 Load 해서 매핑함.
+ Virtual Memory 
  + ```valid``` bit 가 추가로 있어 Memory 에 Page 가 있는지 확인
    + 들어온 주소가 ```invalid``` 하면 Interrupt 를 넣음
    + ISR 가 메모리에 적재시켜주게 됨.
  + ```modified``` bit 가 추가로 있어 없는 애들 위주로 victim 선택.




## Process Load

### Fragmentation

1. 외부 단편화 => 프로그램 실행 종료의 반복으로 생기는 단편화
2. 내부 단편화 => Load(적재) 방식으로 인해 생기는 단편화

이하는 __단편화를 해결하기 위한 기법임__


### 연속 메모리 할당

+ 최초적합(First Fit), 최적적합(Best Fit), 최악적합(Worst Fit) 방식이 있음.
+ 외부 단편화로 1/3 정도의 메모리가 낭비가 됨
+ Compaction
  + 외부 단편화로 인한 공간을 Process Memory 를 직접 옮겨서 해결
  + 느리고 최적 알고리즘도 없음.


### Paging

Process 를 Page 단위로 Load 함. 
+ Memory 를 Page 단위로 나눈걸 __Frame__ 이라고 부름
+ __Extern Fragmentation 대신 Inner Fragmentation__ 이 생김.
  + Process 갯수 * (Page Size - 1) 가 최대낭비로 미비함.

Page Table
+ 32 bit System 이고 Page 단위가 1KB 이면
+ 상위 22 bit 가 Page Number 또는 Index of Page Table
  + 얘가 Mapping 되어서 변환됨.
  + Page Table 의 크기이기도 함.
+ 하위 10 bit 가 Page Offset 이 됨. (보통 가리키는 단위가 1 byte)

__메모리 할당은 Page 단위로 이루어짐__
+  페이지가 꽉 차야 System Call 을 하는 경우가 최적화 면에서 도움이 됨.
+  즉 ```new``` 를 해도 매번 System Call 을 하진 않음  [관련 SO](https://stackoverflow.com/questions/6530355/is-memory-allocation-a-system-call)


### Segmentation

Segment 는 논리 단위로 메모리를 나눔
+ 기본적으로 Code, Data, BSS, Stack, Heap 이 있음.
+ __Protection 과 Sharing 측면에서 Paging 보다 쉽고 안전하게__ 구현가능.
  + Page 로 하면 필요한 부분과 아닌 부분이 섞일 수 있으므로
+ 하지만 __Extern Fragmentation__ 가 있음.

x86-64 의 Linux 에서의 Segment 구조
+ |이름|역할|권한|예|
|------|---|---|--|
|Code|실행 가능한 코드|R, E|```main()```|
|Data|컴파일 시점에서 값이 정해진 전역 변수|R, W|전역 변수|
|Rodata|Read-only Data|R|상수문자열|
|BSS|컴파일 시점에서 값이 정해지지 않은 전역 변수|R, W|전역 변수|
|Stack||R, W||
|Heap||R, W||



Segment Table

+ Page Table 과 비슷하나
+ Page Index 대신 Base / Limit(Size) 을 가리키는 2개의 Column 이 있음.
+ Limit 를 넘어가도록 Offset of Address 가 되면 Interrupt 를 날림.


### Paged Segmenation

+ 장점
  + Protection, Sharing (Segmentation)
  + Non Extern Fragmentation(Paging)
+ 단점
  + 주소변환에 시간 더 걸림
  + Table 크기가 큼.




## Virtual Memory

### Swapping

옛날에 쓰이던 Process 단위 기법

Process Image
+ PCB(Process Controll Block) 은 Context Switch 에서 사용되는 정보라면
+ 이건 Swapping 으로 보조 메모리에 저장/복구 되는 정보로 __Process 단위__ 임.

Backing Store (Swap Device)
+ Process Image 가 Swapping 으로 보조 메모리에 저장될 영역
+ 그 목적 상 최댓크기는, 프로세스 갯수 * Memory 크기. 

### Demanding Paging

__Page 단위__ 로 필요할 때 메모리에 올리는거.
+ Page Table 에 ```valid```, ```modified``` bit 추가
+ Virtual Memory 의 핵심기능임

__Page Fault__
+ 들어온 주소가 없으면 __Interrupt__ 로 메모리에 적재시킴. 
  + Page Fault Serving Routine 가 메모리에 적재 후 valid bit 를 on 해줌.
+ Effective Access Time

__Page Replacement__
+ Victim 선택 시 ```modified``` 안된 애를 위주로 선택함. 
  + 왜냐하면 Backing Store 에 변경사항 저장 안해도 되므로
+ Page Replacement Algorithms
  + FIFO => Belady's Anomaly. Frame 이 커졌는데 Fault 가 커지는 현상
  + LRU(Least Resently Used) => 여기에 통계기법 섞어서 많이 씀
+ Global Replacement
  + 다른 Process Frame 도 합쳐서 알고리즘을 돌리는게 보통은 성능이 좋음.

#### Frame Alloc

Trashing 
+ 일정 이상을 넘어 Degree Of MultiProgramming 가 커지면
+ Page Fault 등으로 인해 I/O 가 커져서
+ CPU Utilization 이 낮아짐.
+ 그래서 Global Replacement 와 Local Replacement 를 섞고 
+ 프로세스당 할당한 Frame 의 수가 한정되어야 함.

Dynamic Frame Allocation
1. Locality 
  + Scheduling 등에 따라서 일정 시간에 필요한 페이지 수가 있음.
2. Working Set Window
  + 미래를 몰라서 일정 길이의 과거의 기록을 봄. 
3. PFF(Fage Fault Frequency)

Page Size
+ 4KB ~ 4MB 로 점차 커지는 경향.
+ 크면 내부 단편화가 커짐.
+ 대신 Page Table 크기가 작아지고 Page Fault 가 줄어듬. 
+ 한번의 Disk I/O 는 커지지만 효율면에선 한번에 하는게 나음.

