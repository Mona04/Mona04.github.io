---
excerpt: "WPF 에 DirectX 로 직접 렌더링 하면서 한 삽질"
tag: [c++, c#, DirectX]
use_math: true
---

## WPFDXInterop



WPF 는 Dx9 로 하드웨어 가속을 사용한다. 그래서 WPF 는 사용자가 DirectX 를 통해 화면을 직접 렌더링할 수 있다. 하지만 기존에 사용된 D3DImage 같은 방법은 DX9 이후의 버전과 호환이 되지 않는 문제가 있었다. 그래서 호환가능한 모듈을 찾다가 발견한 것이 이것([Git](https://github.com/microsoft/WPFDXInterop))이다. (DX12 는 확인은 안해봤지만 아마 가능할 것이다.)

예제를 보면 기본적인 작동방식을 알 수 있다. 간단하게 설명하면, 위 소스코드에서 제공하는 ```D3D11Image``` 는 디바이스 간 공유자원이 되도록 만든 텍스쳐를 생성한다. 이에 대한 포인터로 사용자는 ```D3D11Device``` 에 있는 ```CreateShaderHandle()``` 를 통해서 ```ID3D11Texture2D``` 같은 텍스쳐 인터페이스를 얻을 수 있다. 여기에 ```D3D11RenderTargetView``` 를 만들던지 해서 텍스쳐에 값을 쓰면 된다.

#### Adapter 문제

GPU 간의 데이터 공유는 ```CreateShaderHandle()``` 로 할 수 없음에 주의하자. __만약 ```D3D11Image``` 에 접근하는  ```D3D11Device``` 가 기본 Adapter 로 만든 것이 아니면 낭패를 볼 수 있다.__

그럼 ```D3D11Image``` 가 우리가 원하는 Adapter 를 선택하면 되지 않나 생각할 수 있다. Adapter 를 선택하는 코드를 추가하는 것은 DirectX 튜토리얼만 공부해도 쉽게 할 수 있다. 하지만 WPF 가 Dx9 로 장치를 만들 때 사용할 Adapter 를 지정하는 방법이 매우 제한적인걸 생각하면 좋은 접근은 아닌 듯 하다. 


## Nvidia Optimus

만약 자신의 컴퓨터(노트북)가 Nvidia 의 Optimus 기능을 사용한다면 기본 Adapter 를 프로그램 실행 중에 바꿀 수 있다. 보통은 특정 프로그램이 아니면 내장 그래픽을 기본 장치로 잡지만, 약간의 코드 추가로 외장 그래픽이 기본 장치가 되는 것이다.

C++ 에서는 [Nvidia Doc](https://developer.download.nvidia.com/devzone/devcenter/gamegraphics/files/OptimusRenderingPolicies.pdf) 에 있는 전역변수 Export 방법을 쓰면 간단히 수행할 수 있다. 이 문서를 접하게된 [SO](https://stackoverflow.com/questions/10535950/forcing-nvidia-gpu-programmatically-in-optimus-laptops) 에서는 안된다는 이야기도 있지만 나에겐 잘 작동했다.

C# 에서는 [SO](https://stackoverflow.com/questions/17270429/forcing-hardware-accelerated-rendering) 에서 소개한 방법이 잘 작동했다. 사용되는 ```nvapi64.dll``` 의 ```LoadNvApi64()```  가 무엇을 하는 함수인지는 찾아봤는데 정보가 별로 없었다.

