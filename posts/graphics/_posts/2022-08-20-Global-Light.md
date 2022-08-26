---
excerpt: "Global Light 에 대한 대략적인 정리"
use_math: true
tag : [Graphics]
---

## 기본적 정보

### Forward? Deferred?

[VR 에서 Forward 를 쓴다는 기사](https://meshmatic3d.com/technical/improve-vr-performance-forward-rendering/)



### Phong Model

Diffuse 는 Lambert 조명이라고도 불리는 ```saturate(dot(Normal, Light)) * light_color * model_color``` 식을 사용함.

Specular 는 [Blinn-Phong Reflection Model](https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model)이라고 불리는  ``` saturate(dot(reflect, view))^shineness * light_color * model_color ```를 사용함.
