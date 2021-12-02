---
excerpt: "Advanced Locomotion System V 분석 - 기본 Layer"
categories: UE4
tag: [UE4]
---

## Locomotion Layer

### Locomotion Cycle

#### Animatioin Asset

바라보는 방향에 따라 3종류, 앞뒤로 2종류로 총 6개의 BS 가 필요함.

BS 는 Stide(0~1) 와 Walk/Run(0, 1) 이 들어감
+ Walk / Run 은 보간을 위한게 아니라 한번에 처리하기 위함임
+ Stride 로 Walk 와 Run 의 속도에 따른 보간을 독립적으로 실행하게 됨.

또한 Sprint 와 거기서 몸을 조금 더 숙인 Sprint_Impulse 애니메이션이 필요함.
+ ```RelativeAcceleration.X``` 에 따라서 몸을 조금 더 숙이는데 사용됨

#### 설명 <br/>

캐릭터가 움직일 때 적절한 방향으로 움직이는 모션을 만들어냄.

중요한 포인트는 총 5가지임
+ 방향에 따른 F, B, FR, FL, BR, BL 노드를 통해서 방향에 따른 일관적인 움직임을 보임
	+ 왼쪽을 보며 앞으로 가다가 오른쪽으로 갈 때 왼쪽을 보며 뒤로가게 함으로써 오른쪽으로 가게 함. 그 반대 방향도 마찬가지.
	+ 이때 State 간 Fade 시간을 0.7 로 둬서 부드러운 전환을 만듬
	+ 여기서 BR, BL 에서의 ```State Weight == 1``` 의 경우 FR, BR 로 바꾸어 자연스러운 전환을 만듬 
+ 방향 전환시 ```HipsDirection``` 을 Notify 로 바꾸어줌.
	+ 이는 Stop Motion 등에서 사용됨
+ 방향이 정반대로 전환 시 ```pivot``` 을 Notify 로 On 해줌.
	+ ```pivot = TriggerPivotSpeedLimit > speed```
	+ Locomotion Detail 에서 가속느낌의 기울기를 주게 됨.
		+ CharacterMovement 의 MaxAcceleration 을 1500 근처로 둬야 자연스러운 느낌이 남.
		+ 6000 등 큰 값에서는 이 옵션을 사용하면 타이밍을 조절해야함.
	+ 0.1 초 Delay 후에 값을 다시 꺼줌.
+ Sprint 의 경우 가속때 적절하게 Sprint/Sprint_Impulse 를 섞어주고, 가속도에 따라 캐릭터를 기울려줌.
+ ```Yaw Offset``` AnimCurve 값을 조정해 Looking Direction(카메라 방향으로 캐릭터가 보게함) 모드일 때 자연스럽게 캐릭터를 회전시킴.
	+ CurveVector 2개를 통해 캐릭터와 카메라의 각도차에 따른 FBLR 의 값을 조정함 
	+ 이건 대각선으로 움직였을 때 그 방향으로 캐릭터가 회전할 수 있게 함.
	  + 안그러면 대각선으로 움직이다 멈췄을 때 다시 정면을 보게 될 거임.

그 밖으로
+ HipOrientation_Bais/Feet_Crossing 이라는 Curve 값으로 추가적인 방향전환
+ IK Scale 하기 
등이 있는데 큰 차이가 안보여서 넘어감.

### Locomotion Detail

#### Animation Asset

Accel_F/B/L/R 를 사용함.  

#### 설명

```Velocity Blend``` 로 Accel Animation 을 LocomotionCylce 에 더함
+ State 내의 Accel Animation 은 loop 끄고 State 끼리 Group Name 으로 묶어서 Sync Group 을 맞춤.
+ ALS 의 Animation 은 ```PlayRate = 1.25, StartPoint = 0.25``` 로 따로 조절함

이때 ```Pivot``` 값에 따라서 PivotState 를 돌리는데 사용하는 옵션이 꽤 있음.
+ 앞에서 말했듯이 CharacterMovement 의 MaxAcceleration 을 1500 근처일 때의 기준임.
+ State 간 Transition 에서 Duration 이 0.1 이고, Blend Logic 을 ```Inertialization``` 을 씀.
 + 이는 LocoCycle 의 Notify 가 이 값을 0.1 초만 켜놓기 때문임

### Locomotion State

#### Anim Asset

위에서 본 6 종류의 BS 를 만드는데 쓴 애니메이션을 사용함.

이때 주의할 것은 이 애니메이션에 ```Feet_Position``` 이 있다는 것임.
+ 1 이면 오른발이 땅에, -1 이면 왼발이 땅에, 0 이면 공중에 있음을 말함.

또한 Rotate, Turn 같은 Transition Animation 도 사용함
+ 90도의 경우 __길이가 1초__ 이고 ```RotationAmount``` Curve 의 그래프의 넓이가 대략 3임.
+  180도의 경우 __길이가 2초__ 이고 ```RotationAmount``` Curve 의 그래프의 넓이가 대략 6임.

#### 설명

Transition
+ ```StopL/R, QuickStop``` Notify 가 Moving->NonMoving 과 Stop State 에서 호출됨.
  + 이는 Transition Animation 을 ```Grounded``` Slot 에 넣어줌.
  + 이 애니메이션은 ```Enabled_Transition``` AnimCurve 가 들어가 있음.
  + NonMoving State 에서도 이 AnimCurve 를 1로 업데이트함
  + 이 Curve 값이 1인 경우 PlayerBP 에서 제자리 회전이 들어감
+ ```StopTransition``` 이 NotMoving->Moving 과 Moving State 에서 호출됨
  + ```Grounded```, ```Turn``` Slot 의 몽타주를 없애줌

Rotate
+ Locomotion State 는 __멈춰있는 상태__ 의 회전을 다룸.
+ NotMoving, Rotate R90/L90 State 에서 적용됨
+ 모두 ```RotationAmount``` 라는 Curve 값을 조정해 외부에서 이 값을 이용해 회전시킴
  + 이때 ```Rotate Rate``` 값을 이용해 ModifyCurve 에서 __Scale__ 을 시킴
  + 이 값을 사용해 PlayerBP 에서 캐릭터를 돌리는데 ```CurveValue * DeltaTime * 30``` 을 사용함
  + 위의 Animation 설명에서 나오듯 __90도 당 그래프의 넓이가 3정도__ 나오기 때문임.
+ Rotate R90/L90 은 __Aim__ 의 경우에만 적용됨
  + Rotate_L90/R90 Animation 이 들어감
  + 딱 카메라 정면으로 돌진 않고 약간 비정확한 경향이 있었음
+ NotMoving 에서는 __Looking Direction__ 의 경우에 회전시킴.
  + 여기에서 ```Turn/Rotate``` Slot 이 합쳐짐.
  + Looking Camera Direction 일 때, 이 Slot 에 TurnIP_L90/L180/R90/R180 Animation 을 넣음
  + 이는 카메라와 캐릭터가 다른 방향을 일정 시간 이상 볼 때 수행됨
+ ```RotMode``` 에 따라 회전이 다르게 들어감
  + Velocity Direction 의 경우 그냥 Velocity 방향으로 회전 시켜줌.
  + Looking Direction 의 경우 일정 시간이 초과하면 카메라 방향이 가게 ```RotationAmount``` 값을 바꿔줌
  + Aiming Direction 의 경우 앞에서 말한 Rotate R90/L90 State 에서 ```RotationAmount``` 값을 바꿔줌.

Foot Lock
+ Foot Lock 을 걸 때 ```Feet_Position``` 의 절댓값이 1에 가까운지 여부에 따라 __FootDown__, __FootUp__ 으로 나눔.
+ FootDown
  + 한쪽 발이 땅에 닿아있는 경우로, 그 발을 Lock 시킴
+ FootUp
  + 즉 모든 발이 떠있는 경우임.
  + 이때 어떤 발이 땅에 닿기 시작하면 그 발이 땅이 닿기 시작한 지점을 고정함
  + 이때 ```Evaluate Animation``` Node 를 사용하는데 그 시간을 보면 땅에 닿기 시작하는 시점임.
  + 그때의 땅이 닿는 쪽의 Thigh 와 IK 본을 Blend 를 통해 고정시켜둠.




Notify 를 통해 Transition 
NotMoving -> Moving 으로 옮길 때 ```StopTransition``` 이라는 Notify 를 호출함


Moving- > NotMoving 으로 옮길 때 