---
excerpt: "MSAA 사용해보기"
use_math: true
---

## Alias 기본

[therealmjp Blog Post 1](https://therealmjp.github.io/posts/signal-processing-primer/) [2](https://therealmjp.github.io/posts/applying-sampling-theory-to-real-time-graphics/) [3](https://therealmjp.github.io/posts/msaa-overview/#fn:1) 에 대략적인 내용이 잘 정리되어 있다.





### MSAA (Multi Sampling Anti-Aliasing)

#### Runtime Magic

옛날에는 스왑체인 만들면서 ```SampDesc``` 를 설정하면 MSAA 를 사용할 수 있었다. 하지만 지금은 Runtime Magic 은 상황에 따라 성능 등에서 이슈가 생긴다고 직접 구현해 쓰라고 한다. DirectX11 에서는 ```SwapEffect``` 가 legacy blit-bit style mode 가 아니라 ```DXGI_SWAP_EFFECT_FLIP_SEQUENTIAL``` 나 ```DXGI_SWAP_EFFECT_FLIP_DISCARD``` 로 설정하면 Runtime Magic 을 사용할 수 없다. 구버전에서 사용법은 [SO](https://stackoverflow.com/questions/40275577/how-to-sample-a-srv-when-enable-msaa-x4directx11) 에 잘 설명되어 있다.

바뀌면서 달라진 점이 몇가지가 있다. 먼저 SwapChain 의 BackBuffer 를 생성할 때 SRGB 를 사용할 수 없다. 대신 Swapchain BackBuffer 의 RTV 에서는 SRGB 를 사용할 수 있다. 자세한건 [Wallbourn Blog 1](https://walbourn.github.io/care-and-feeding-of-modern-swapchains/), [Wallbourn Blog 2](https://walbourn.github.io/care-and-feeding-of-modern-swap-chains-2/) 등을 참고.

#### Alpha to Coverage

[Alpha to Coverage 관련 기사](https://bgolus.medium.com/anti-aliased-alpha-test-the-esoteric-alpha-to-coverage-8b177335ae4f)



### FXAA (Fast approximate anti-aliasing)

[Wiki](https://en.wikipedia.org/wiki/Fast_approximate_anti-aliasing) 에 장단점과 특징이 요약되어 있다.

[Nvidia FXAA 3 Public Domain](https://developer.download.nvidia.com/assets/gamedev/files/sdk/11/FXAA_WhitePaper.pdf)




### VR
