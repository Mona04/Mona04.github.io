---
excerpt: "Global Light 에 대한 대략적인 정리"
use_math: true
tag : [Graphics]
---

## 앞서서

이 글은 전에 봤는데 뭐였더라... 사태를 막기위한 메모입니다. 

대충 주제별로 나누어서 빨리 찾기 위한 목적으로 쓰였습니다.


## Indirect Light

#### Encoding

[Zina H. Cigolle, 2014, Survey of Efficient Representation for Independent Unit Vectors](http://jcgt.org/published/0003/02/01/)
+ UnitVector 저장방법에 대해서 공부하기 좋음
+ 주 목적은 Octahedral Encoding


#### Light Probe

[Morgan McGuire, 2016, Global Illumination for static and dynamic objects using light probes](http://www.cse.chalmers.se/~uffe/xjobb/bowald_final_master_thesis_v2.pdf)
+ Grid 형식으로 Probe 배치. Occlusion Bitmask 를 사용한 차폐알고리즘. 결과는 둥근 물체에서 격자효과.
+ _Killzon3_ 과 _Tom Clancy's The Division_ 에서의 사례정리가 재밌음.

[Morgan McGuire, 2016, Real-Time Global Illumination using Precomputed Light Field Probes](http://casual-effects.com/research/McGuire2017LightField/index.html)
+ ACM SIGGRAPH, Best Paper Award
+ 아래 Majercik 를 읽으려면 이거 읽어야함.
+ Voxel Cone Tracing 에 영감을 받은 Real Time Indirect Light

[Zander Majercik, 2020?, Scaling Probe-Based Real-Time Dynamic Global Illumination for Production](https://arxiv.org/pdf/2009.10796.pdf)


[Light Probe Selection Algorithms for Real-Time Rendering of Light Fields(2016)](http://melancholytree.com/thesis.pdf)
+ 뭔가 많은데 나중에 읽어보자.

