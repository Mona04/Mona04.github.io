---
excerpt: "Projectile Movement and Hit Event"
categories: UE4
tag: [UE4]
---

## Root 와 Collision

+ Root 가 Collision 이 아니면 나머지 Component 의 HIt Event 가 거의 발생하지 않음
+ SetUpdatedComponent 를 이용해 Projectile 이 이동하는 Component 를 설정하면 HIt Event 는 발생하지만 Root 의 위치는 유지되기 때문에 완벽한 해결방안은 아님.
