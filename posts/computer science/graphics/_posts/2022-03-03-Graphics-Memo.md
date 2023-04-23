---
excerpt: "복붙용"
use_math: true
---

## POD

DirectX 에 포함된 기능
+ DirectX 3D
+ DirectX 2D (dx11)
+ DXGI
+ RayTracing, ML, Physics (dx11)

## State

#### Sampler

Filter (Min Mag Mip)
+ 텍스쳐의 픽셀이 렌더타겟의 픽셀에 대응하지 않는 경우 그 차이를 어떻게 처리(보간 등) 할 것인가?
+ 보통 Min Mag 는 Point 를 많이 쓴다. 왜냐하면 텍스쳐가 칠해진 메시를 확대해서 보는 경우는 적기 때문이다.
AddressMode 가 중요한 요소


```float4``` 에서 ```w``` 는 픽셀쉐이더에서만 동차가 된다. viewproj 이후의 비율.

stdext::checked_array_iterator

[최적화 관련 문서](https://developer.amd.com/wordpress/media/2012/10/GDC2005_Performance.pdf)

Humas.Name 고급 쉐이더 사이트

### Buffer Usage

cpu, gpu 의 r/w 의 경우의 수로 생각하면 이야기가 좀 꼬인다.

```D3D11_Usage_Dynamic``` 의 경우도 ```UpdateSubresource()``` 로 Cpu 에서 업데이트 할 수도 있다. 단 이 경우는 예외적인 것으로, gpu 에 락을 걸어서 느리다. 

```D3D11_Usage_Staging``` 의 경우는 RenderTarget 으로 설정할 수 없고, 보통 복사해서 값을 읽어오는 경우가 많다.


### 3D Model

3Ds Max, Maya, Blender 가 유명한 3D Modeling Program 이다. 3Ds Max 를 개발했고 후에  Maya 를 인수한 Autodesk 에서 FBX 포맷을 만들었고 현재도 가장 대중적인 포맷으로 자리잡는다.