---
excerpt: "Interrupt, OS Dual Mode"
tag: [OS]
use_math: true
---


## Interrupt

CPU 가 지금 처리하는 Process 를 잠깐 중단하고 다른 작업을 하도록 하는 요청.  
+ Interrupt 가 없다면 Process 가 끝날 때 까지 CPU 는 다른일을 못할 것임.
+ 이러한 Interrupt 가 발생 시 Kernel Mode 로 전환되고 ISR 을 수행함
+ 원래는 하드웨어와의 소통 수단이었는데 소프트웨어로도 확장됨

Instruction Boundary 에서 수행됨. 
+ 즉 명렁어 중간에 수행되지 않는다는 소리.

### ISR

하던 작업을 멈추고 시작할 작업 또는 함수를 __ISR(Interrupt Service Routine)__ 또는 __Interrupt Handler__ 라고 부름.
+ 이러한 루틴은 __OS 의 일부로 Kernal 에 존재함__
+ OS 에 기본적으로 있거나 혹은 [Device Driver](https://docs.microsoft.com/en-us/windows-hardware/drivers/kernel/writing-an-isr) 로 탑재함. 

### IVT / IDT

이러한 함수가 저장된 공간을 __[IVT(Interrupt Vector Table)](https://en.wikipedia.org/wiki/Interrupt_vector_table)__ 또는 __IDT(Interrupt Description Table)__ 라고함.  
+ 위 둘의 [차이점](https://stackoverflow.com/questions/11540095/what-is-the-difference-between-ivt-and-idt)
  + 전자는 [Real Mode](https://en.wikipedia.org/wiki/Real_mode), 곧 부팅할 때 쓰고 
  + 후자는 Protected Mode 에서 쓰며 더 복잡한 정보를 가짐
+ BIOS 가 메모리에 OS 를 올리면서 메모리의 특정한 주소에 저장됨.
+ 보통 256 의 크기를 가지며 Register 에 따라서 다양한 동작을 할 수 있게 함.


#### 설명

대충 다음의 단계를 거침
1. Interrupt Occur 
2. After current instruction finished, save Current State([PCB](#pcb))
3. Look __IVT__/__IDT__ and goto __ISR__
4. After __ISR__ Finished, Resume or Stop Process

우선순위에 따라 Maskable / NMI(Non Maskable) 로 나뉨
+  NMI 에서 대표적인게 Timer Interrupts 로 지연이 안되고 우선순위가 가장 높음.
+ 동시에 여러 Interrupts 가 발생시 우선순위에 따라 순서대로 처리됨.
+ 관련된 작업은 [NVIC(Nested Vecctor Interrupt Control)](https://www.motioncontroltips.com/what-is-nested-vector-interrupt-control-nvic/) 등에서 처리됨

크게 Hardware / Software Interrupts 로 나뉨.
+ 후자는 함수의 SubRoutine 처럼 쓰이지만, 전자는 Context Switching 에 더 가까움.

### Hardware

Software-Interrupt 와 대조되는 맥락일 때 그냥 Interrupt 를 말하면 이걸를 의미함.

프로세스 외적인 원인이므로 Cpu Clock 과 비동기적이라서 __Asynchronous__ 하다고 함.
+ Instruction 간의 Execution Boundary 에서 처리되게 됨.

대표적인 예를 들자면
+ Timer
  + 1초에 18번인가 Interrupt 를 발생해 Multi-Process 등을 가능하게 함.
+ I/O
  + Keyboard 입력, 이어폰 잭 꼽기 등에서 일어남.


### Software

Software Interrupts 는 또 나뉘는데 정확히 합의된 정의는 없음. [자세한건 Wiki 참고](https://en.wikipedia.org/wiki/Interrupt#Terminology)
+ 명확히 정의된 맥락이 아니면 Trap, Syscall 과 비슷하게 받아드리면 됨.

Process 를 실행하면서 발생하며 특정 Instruct 이후에 바로 수행되므로 __Synchronous__ 함

설명하기 편하게 나누자면 크게 2가지 분류가 있음.
1. Program Check Interrupt 
  + Devide by Zero, Overflow / Underflow
  + Program call Wrong Instruction
2. [```Syscall```](#systemcall)    


## Dual Mode

보안, 시스템 안정성 등을 위해 중요한 명령(Privileged Instruction)은 OS 만이 사용할 수 있으며, User Program 에서 관련 명령이 필요시 OS 에게 대행시킴.
+ CPL 이 Kernal Mode 가 아닐 때
+ Privileged Instruction 을 수행하려고 하면
+ Interrupt 을 던짐
+ 대신 System Call 을 통해서 Kernal 이 대신 수행해야함.

### CPL

User mode / Kernal mode 전환에서 사용되는 것이 CPL(Current Privileged Level) 임.

Mode bit, Monitor bit 등으로 불리는 CPL 이 저장되는 위치는 운영체제마다 다름.
+ x86 의 경우 segment register 중 하나인 cs 에 저장이 되어 있음. [Related SO](https://stackoverflow.com/questions/57926177/what-register-in-i386-stores-the-cpl)

체크하는 방법(블로그에서 읽은거라 확실한지는 몰?루)
+ [Instruction Cycle 의 Decode State](https://en.wikipedia.org/wiki/Instruction_cycle#Decode_stage)  에서 Mode Bit 를 체크
+ 불법적이면 Interrupt 을 던짐.


### Privileged Instruction

Kernel Mode 에서만 가능한 명령을  __Privileged Instruction(특권 명령)__ 이라 함.

I/O 관련, Timer 관련, IPC(Inter Process Communication) 등 보안이 필요한 명령을 의미.
+ 어셈블리어에서 할 수 있는걸 생각하면 생각 외로 별로 없음.

RISC-V 는 User / Privileged ISA 로 나누었음.
+ [Privileged ISA 에 관한 영상](https://youtu.be/fxLXvrLN5jA)


### SystemCall

__User Program__ 이 Privileged Instruction 이 필요할 때가 있음.
+ 이는 __Interrupt__ 를 발생시켜 특정한 ISR 를 수행시키는 방법으로 동작함
+ 이를 위한 Interface 가 __[System Call](https://ko.wikipedia.org/wiki/%EC%8B%9C%EC%8A%A4%ED%85%9C_%ED%98%B8%EC%B6%9C)__ 으로 __Libray Call__ 과 [대조됨](https://www.it-note.kr/3)
+  특정 환경에서는 [SVC(SuperViser Call)](https://en.wikipedia.org/wiki/Supervisor_Call_instruction) 이라고도 부르기도 함..
+ C 같은 고급언어에서는 바로 사용이 안되고 관련 dll 등에서 제공하는 API 를 통함

작동원리
+ x64-86 의 ISA 중에 ```INT``` 라는 명령어가 있음.
  + 예외를 발생시키는 명령어이며, operand 로 IDT 의 번호를 받음. 
  + ```0x80``` 이 SystemCall 을 의미함 
+ 256 개의 고정된 크기를 갖는 IDT 에서 어떻게 다양한 OS 의 기능이 수행될까?
  + OS 가 수행할 함수의 주소가 저장된 [System Call Table](https://filippo.io/linux-syscall-table/) 이 따로 있음.
  + Register 의 값들로 System Call Table 을 조회함.
  + Register 는 인자 및 리턴값으로도 사용됨.
+ [Related SO](https://stackoverflow.com/questions/1817577/what-does-int-0x80-mean-in-assembly-code)
+ [Display Key Input Exam](https://www.tutorialspoint.com/assembly_programming/assembly_system_calls.htm)
+ [단국대의 관련 설명](http://embedded.dankook.ac.kr/~baeksj/course/2016_LKI/Chapter_05.pdf)

