---
excerpt: "Tone Mapping 관련 참고할 자료들"
use_math: true
tag : [Graphics]
---

## ToneMapping

## Eye Adaptation

Auto Exposure 이라고도 불리는 이 기법은 Tone Mapping 과는 별개지만 비슷한 역할을 한다. Pixel 의 Luminance 를 일반적으로 Average Luminance 를 통해 HDR 의 값을 Scaling 을 한다. 

이때 Average Luminance 를 계산하는 방법은 크게 2가지 종류가 있다.[^UE4, Auto Exposure] 
1. Geometric Average. 특이값에 민감할 수 도 있다.
2. Histogram Average. 보통 전체 구간을 logarithmic representation 으로 바꾸어 255 개의 구간으로 나눈다. 그래서 아무리 값이 커져도 최댓값으로 바뀌지 않아서 극단적인 값에 민감하지 않다. [관련 구현](https://bruop.github.io/exposure/)




## 참고자료

[Learn Opengl, Gamma Collection](https://learnopengl.com/Advanced-Lighting/Gamma-Correction)

[Bruno Opsenica, 2019, Tone Mapping](https://bruop.github.io/tonemapping/)

[Delta, 2019, Tone Mapping](https://64.github.io/tonemapping/#extended-reinhard-luminance-tone-map)

[Unity, Eye Adaptation](https://docs.unity3d.com/560/Documentation/Manual/PostProcessing-EyeAdaptation.html)

[^UE4, Auto Exposure]: [UE4 4.26, Auto Exposure](https://docs.unrealengine.com/4.26/en-US/RenderingAndGraphics/PostProcessEffects/AutomaticExposure/)