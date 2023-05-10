---
excerpt: "DirectX12 관련 메모"
use_math: true
tag : [Graphics, DirectX]
---

## PSO

## Heap

[MSDN](https://learn.microsoft.com/en-us/previous-versions//dn899216(v=vs.85)?redirectedfrom=MSDN)

[Descripor-Heap](https://velog.io/@15ywt/DirectX12-Descriptor-Heap)

[Heap](https://zhangdoa.com/posts/walking-through-the-heap-properties-in-directx-12)


## .etc

Vertex Buffer 의 Slot 은 보통은 많이 있으면 성능상 좋지 않다. 보통은 대개 1~3 개를 사용한다.

Constant Buffer 역시 성능상의 이유로 쉐이더가 5개 미만 사용하는 것을 권한다.^[dxtex1](p327)

hlsl 은 matrix 저장 순서가 [column major](https://learn.microsoft.com/ko-kr/windows/win32/direct3dhlsl/dx-graphics-hlsl-per-component-math?redirectedfrom=MSDN#matrix-ordering) 이다. 그래서 ```m[0][0]```, ```m[1][0]``` 이런식으로 저장되는데 cpu 에선 보통 row major 방식을 많이 써서 Transposed 된 듯한 느낌을 준다.

```wrl.h``` 의 ```Microsoft::WRL::ComPtr``` 을 이용해 Com Smart Pointer 를 이용할 수 있다.


[Multi-Adapter System](https://learn.microsoft.com/en-us/windows/win32/direct3d12/multi-engine)


## Issue

[DX12 는 VisualStudio 의 Debugging 을 못한다?](https://devblogs.microsoft.com/pix/download/)


## Multi Threading

[MSDN - Multi Engine](https://learn.microsoft.com/en-us/windows/win32/direct3d12/user-mode-heap-synchronization)

[MSDN - Recording Command List and Bundles](https://learn.microsoft.com/en-us/windows/win32/direct3d12/recording-command-lists-and-bundles)

[MSDN - Synchronizing Command Lists](https://learn.microsoft.com/en-us/windows/win32/direct3d12/executing-and-synchronizing-command-lists)

### Command Queue

Compute / 3D Rendering 에서 GPU 의 다른 부분을 쓸 수도 있기 때문에 각각에 용도에 맞게 생성하면 동시성 강화 가능

### Command Allocator

```Reset()```
+ 하기 전에 여기에 있는 커맨드들이 실행 중이 아님이 보장되어야 한다. 연결된 Command Queue 가 끝나고 호출하면 된다.

메모리가 증가는 하는데 줄지는 않는다.

### Command List

```Reset()```
+ Command Allocator 와 연결하며 자신은 쓰기 상태가 된다. Allocator 에 한번에 하나의 List 만 쓸 수 있다. 즉 한 Allocator 에 여러 List 가 연결될 수 는 있으나 각 List 가 다른 Thread 에 있다면 Critical Section 이 필요하다는 뜻이다. 그래서 보통 Thread 당 Allocator 와 List 를 하나씩 둔다.
+ 언제든지 가능하므로 일정 단위마다 ```Close()``` 한 후에 Queue 에 넣고 다시 ```Reset()``` 해서 진행하는 패턴이 잘 사용된다.



## 참고자료

[MSDN Direct3D Learning](https://learn.microsoft.com/en-us/windows/win32/direct3d12/direct3d-12-graphics)

^[dxtex1]: [DirectX12 를 이용한 게임프로그래밍 입문](https://www.hanbit.co.kr/store/books/look.php?p_code=B5088646371)

