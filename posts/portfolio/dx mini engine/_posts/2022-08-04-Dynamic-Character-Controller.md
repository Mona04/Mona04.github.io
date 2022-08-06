---
excerpt: "Bullet Physics Dynmaic Character Controller"
header:
tags: [bullet]

use_math: true
---

## Description

<iframe width="560" height="315" src="https://www.youtube.com/embed/kqn6-0zCNJs" frameborder="0" allowfullscreen></iframe>

<br/>

Bullet Physics 에서 기본적으로 제공하는 Character Controller 는 없다고 봐도 무방하다. 그래서 직접 구현해보려다가 [Pierov Blog](https://www.pierov.org/2020/05/23/dynamic-character-controller-bullet/) 에 비슷한 시도가 있어서 이걸 가지고 수정을 해보았다.

Character Controller 에서 중요한 기능 세개는 점프와 경사면 이동, 그리고 계단 이동이다. 점프는 Impulse 를 주면 쉽게 구현할 수 있다. 경사면은 지면을 판별할 때 얻게되는 Normal 이 일정이상 수직에 가까우면 못걷도록 처리만하면 Bullet Engine 이 알아서 처리해준다. 문제는 Stepping 이다.

### Stepping

Steping 할지 판별하는 부분과 Stepping 을 업데이트하는 부분으로 나뉜다.


#### Steping Test

판별하는 부분은 기존에도 완벽하지 못했는데 대표적으로 HeightMap 에서 뚫고 지나가는 버그가 있었다. 일단 버그는 발생하지 않도록 수정했는데 위치렉 걸린 듯한 잡버그가 가끔 일어나 수정이 필요하다.

Step 판별식은 이곳저곳 많이 손댔는데 그중에 크게 바꾼 부분은 기존 코드의 노말이 위를 조금이라도 향해있으면 캔슬한 부분이다. 이는 완전히 수직인 계단이 아니면 올라가지 않겠다는 의미로 여기서 버그가 꽤 일어나서 수정했다.

나는 Stepping 은 계단같은 부분을 막힘없이 걷기 위함이기 때문에 HitPoint 가 계단의 끝이라는 가정을 했다. 그래서 기존 HitPoint 와 그것의 약간 위를 현재 바라보는 방향으로 RayTrace 하여 Hit 되면 Step 하지 않는 것으로 바꾸었다. 그럼에도 확장성을 위해 Hit 되더라도 그게 기존의 HitPoint 보다 Capsule 에 가깝거나, 기존의 HitPoint 간의 벡터가 이동가능한 Slop 보다 수직에 가까운 컷 했다.

#### Stepping Update

Stepping 을 구현하는 부분에서 달라진 점은 몇가지가 있다.

첫번째로 Stepping 에서 등속운동의 기준이 Height 가 아니라 XZ 평면이 되었다. Capsule 의 끝은 반구이기 때문에 현재 땅에서의 거리와 XZ(Gravity is Y Axis) 평면에서의 순간이동량을 알고있다면 높이의 순간이동량은 원의 방정식으로 쉽게 구할 수 있다. 이 성질을 이용한 것은 같지만, 기존에는 높이의 순간이동량이 등속이었고 나는 XZ 평면의 속도를 등속으로 처리했다. 내가 생각하는 Stepping 은 평면을 걷는 것처럼 Stairs 를 움직이는 것이라 이렇게 바꾸었다.

두번째로 대각선 Stepping 도 가능하게 했다. 처음 Stepping 해야할 거리와 방향을 미리 저장해놓고 Projection 을 통해 얼마나 갔는지 매 틱마다 구하는 방식으로 구현했다. 이때 ```CollisionFlags``` 을 ```CF_KINEMATIC_OBJECT``` 으로 안해놓으면 충돌처리가 Stepping 전후로 일어나서 진행방향이 약간 틀어진다. 특정시점에만 충돌효과를 없애는 방법이 이것밖에 안떠올라서 이 방법을 고수하지만 더 나은 방법이 있으면 바꿀 필요가 있어보인다. 
