---
excerpt: "울퉁불퉁한 지형에 온전히 발을 딛게 하는 방법"
tag: [UE4]
---


## 방법 1

![FeetIK1](/Posts/UE4/FeetIK-1.png)

많은 유튜브 영상에서 설명하는 방식
+ 양 발이 무조건 땅에 닿는다는 전제에서 작동함. 
+ 그래서 걷기, 뛰기 등의 한쪽발만 닿는 상황에서 작동하지 않음.

방법은 간단함.
+ 양 발을 땅을 향해 Trace 를 시킴
+ ```ImpactPoint - CharBottom``` 의 차를 각각 ```Offset_L, Offset_R``` 이라고 함.
+ ```HeightOffset = Min(Offset_L, Offset_R)``` 이 녹색괄호의 크기가 됨
  + 위에서는 음수가 될 것임
+ ```(Offset_L or Offset_R) - HeightOffset``` 만큼 양발을 움직임
  + 그럼 위 그림의 ```1->2``` 처럼 한쪽 다리만 움직이게 될 것임.
  + 어차피 양발이 땅에 닿는다는 전제라, ```-HeightOffset``` 또는 ``` 0``` 임.
+ Pelvis 를 ```HeightOffset``` 만큼 내리면 됨
  + 그러면 위 그림의 ```2->3``` 처럼 진행이 될 것임.


## 방법 2