---
excerpt: "Modular Assets can make weird shadows after Light Build. How to fix? "
categories: UE4
tag: [UE4]
---

## 문제

### 원인

모듈식 어셋(벽이 여러 파트로 쪼개져서 하나의 벽을 이룬다거나)에서 각 모듈들이 각각 쉐도우를 가지면서 생기는 일. [증상](https://www.reddit.com/r/unrealengine/comments/6bibso/what_is_wrong_with_the_lighting/)

구글링을 해보면 Unreal 공식에서는 공식적인 해결법은 제시하지 않았고 모듈식을 쓰지 말라는 느낌인 듯. 


### 해결법

[해결법 1](https://youtu.be/2jYjbkWhk9U)
+ 쉐도우 맵을 자사하게 만들어서 해결함
+ 빌드시간이 진짜 오래걸림

해결법 2
+ [Dynamic Lighting](https://www.techarthub.com/lighting-companion-light-mobility-in-ue4-explained/) 만 쓰기
+ World Setting 의 Force No Precompute Light 을 켜면 편하게 할 수 있음.
+ 사실 문제를 회피하는 거지 해결하는건 아니긴 함.
+ Shadow Map Cashing 를 안하면 늦어지므로 물체들을 Static 으로 넣어줘야함