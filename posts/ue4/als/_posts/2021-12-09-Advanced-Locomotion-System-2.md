---
excerpt: "Advanced Locomotion System V4 분석 - 기본 Layer"
tag: [UE4]
---

## Base Layer

### Locomotion Cycle

#### Animatioin Asset <br/>

Direction Animation (Blend Space)
+ 바라보는 방향에 따라 3종류, 앞뒤로 2종류로 총 6개의 BS 가 필요함.
+ 2가지 축으로 Stide(0~1) 와 Walk/Run(0, 1) 이 들어감
+ Walk / Run 은 보간을 위한게 아니라 한번에 처리하기 위함임
+ Stride 로 Walk 와 Run 의 속도에 따른 보간을 독립적으로 실행하게 됨.

Sprint / Sprint Impulse (Anim Sequence)
+ Sprint 와 거기서 몸을 조금 더 숙인 Sprint_Impulse 애니메이션임
+ ```RelativeAcceleration.X``` 에 따라서 몸을 더 굽히기 위해 Blend 됨.
+ 이것을 Sprint 상태일 때 전방방향으로 사용함.

Lean Animation (BlendSpace)
+ 가속도에 따라 몸을 기울리기 위해 사용됨
+ F<->B, L<->R 의 축으로 -1~+1 의 정규화된 값이 들어감
+ Base Run Pose 의 Addictive Animation 으로 구성되어 있음
+ 따라서 Gait 가 Run 또는 Sprint 의 상태일 때 Apply Addictive 됨

#### Used Values <br/>

이하는 ```ShouldMove``` 가 True 일 때 업데이트 됨.

```struct VelocityBlend { float F, B, R, L; }```
+ Blend Space 의 보간을 위해 사용되며 Velocity 를 Character 의 LocalSpace 로 변환 후 특수한 정규화를 거친 값
+ Locomotion Cycle 에서 FBLR 방향의 Anim 을 보간하는데 쓰임. 

```float WalkRunBlend```
+ __Locomotion Cycle 에 쓰이는 6가지 방향의 BlendSpace 의 Input 값임__
+ ```Gait``` 가 Walk 이면 0, Run, Sprint 면 1을 줌. 

```float StrideBlend```
+ __Locomotion Cycle 에 쓰이는 6가지 방향의 BlendSpace 의 Input 값임__
+ StrideBlendNWalk 와 StrideBlendNRun 라는 FloatCurve 에서 ```Speed``` 로 값을 얻어옴. 
  + Maxinum Walk/Run Speed(150, 350) 범위의 Sigmoid 함수와 비슷한 그래프임
+ 각각에서 얻어온 값은 ```Weight_Gait``` 라는 Anim Curve 로 보간 받음.
+ __Walk 와 Run 을 독립적으로 Blend 하려고 사용함.__

```float StandingPlayRate```
+ __Locomotion Cycle 에 쓰이는 6가지 방향의 BlendSpace 의 Input 값임__
+ ```StrideBlend``` 와 비슷한 작업을 거침
+ ```WorldScale``` 과 ```StrideBlend``` 를 나눠서 보정함.

```FVector RelativeAccelerationAmount```
+ Locomotion Cycle 에서 Sprint_F 와 Sprint_Impulse 라는 Anim 을 보간하는데 쓰임.
+ ``` float MaxValue = Dot(Acceleration, Velocity) > 0 ? CharacterMovement->GetMaxAcceleration() : CharacterMovement->GetMaxBrakingDeceleration();
		FVector RelativeAccelerationAmount = ClampSizeMax(Acceleration, MaxValue) / MaxValue;
		RelativeAccelerationAmount = Character->GetActorRotation().Unrotate(RelativeAccelerationAmount);
```

```struct LeanAmount { float R, F;}```
+ Lean Animation 의 Input 값으로 사용됨
+ ```LeanAmount = Interp(cur, RelativeAccelerationAmount.XY);```
+ 즉 앞에서 구한 상대가속도를 사용해 DeltaTime 으로 보간한 것.

```enum MovementDir{ F, B, L, R}``` 
+ Locomotion 의 Cycle 전환에 사용되며 현재 캐릭터가 바라보는 Angle 을 Descrete 화 한 값.

```float FYaw, BYaw, LYaw, RYaw```
+ ```Yaw Offset``` Curve 를 이 값으로 업데이트함
+ Locomotion Cycle 에서 대각선 방향으로 움직일 때 캐릭터가 그 방향으로 회전하게 해줌


#### 설명 <br/>

캐릭터가 움직일 때 적절한 방향으로 움직이는 모션을 만들어냄.

중요한 포인트는 총 5가지임
+ 방향에 따른 F, B, FR, FL, BR, BL 노드를 통해서 방향에 따른 일관적인 움직임을 보임
	+ 왼쪽을 보며 앞으로 가다가 오른쪽으로 갈 때 왼쪽을 보며 뒤로가게 함으로써 오른쪽으로 가게 함. 그 반대 방향도 마찬가지.
	+ 이때 __State 간 Fade 시간을 0.7 로 둬서 부드러운 전환__ 을 만듬
	+ 여기서 BR, BL 에서의 ```State Weight == 1``` 의 경우 FR, BR 로 바꾸어 자연스러운 전환을 만듬 
+ 방향 전환시 ```HipsDirection``` 을 Notify 로 바꾸어줌.
	+ 이는 Stop Motion 등에서 사용됨
+ 방향이 정반대로 전환 시 ```pivot``` 을 Notify 로 On 해줌.
	+ ```bool pivot = TriggerPivotSpeedLimit > speed```
	+ Locomotion Detail 에서 가속느낌의 기울기를 주게 됨.
		+ CharacterMovement 의 MaxAcceleration 을 1500 근처로 둬야 자연스러운 느낌이 남.
		+ 6000 등 큰 값에서는 이 옵션을 사용하면 타이밍을 조절해야함.
	+ 0.1 초 Delay 후에 값을 다시 꺼줌.
+ Sprint 의 경우 가속때 적절하게 Sprint/Sprint_Impulse 를 섞어주고, 가속도에 따라 캐릭터를 기울려줌.
	+ Gait 가 Sprint 상태일 때 Run_F 를 대신해서 F 방향으로 사용됨
+ ```Yaw Offset``` AnimCurve 값을 조정해 Looking Direction(카메라 방향으로 캐릭터가 보게함) 모드일 때 자연스럽게 캐릭터를 회전시킴.
	+ CurveVector 2개를 통해 캐릭터와 카메라의 각도차에 따른 FBLR 의 값을 조정함 
	+ 이건 대각선으로 움직였을 때 그 방향으로 캐릭터가 회전할 수 있게 함.
	  + 안그러면 대각선으로 움직이다 멈췄을 때 다시 정면을 보게 될 거임.


### Locomotion Detail

#### Animation Asset

Accel_F/B/L/R (Anim Sequence)
+ 해당방향으로 몸을 기울이는 모양임
+ Run Base Pose 의 Addictive Animation 임

#### 설명

Accel_F/B/L/R 을 달리기 시작/끝 부분과 방향을 반대로 틀 때 Apply Addictive 하기 위한 States 임

```Velocity Blend``` 로 Accel Animation 을 LocomotionCylce 에 더함
+ State 내의 Accel Animation 은 loop 끄고 State 끼리 Group Name 으로 묶어서 Sync Group 을 맞춤.
+ __CharacterMovement 의 MaxAcceleration 을 1500 근처로 낮춰야__ 재생할 시간이 확보됨.
+ ```PlayRate = 1.25, StartPoint = 0.25``` 으로 Anim 타이밍을 조절함

이때 ```Pivot``` 값에 따라서 PivotState 를 돌리는데 사용하는 옵션이 꽤 있음.
+ State 간 Transition 에서 Duration 이 0.1 이고
+ Blend Logic 을 ```Inertialization``` 을 씀.


### Locomotion State

#### Anim Asset <br/>

Direction Animation (Anim Sequence)
+ Locomotion Cycle 에서 사용한 그것임
+ 이 애니메이션에 ```Feet_Position``` 이 있는데 이걸 정지모션의 분기점으로 사용함.
   + 1 이면 오른발이 땅에, -1 이면 왼발이 땅에, 0 이면 공중에 있음을 말함.

Rotate/Turn (Anim Sequence)
+ 90도의 경우 __길이가 1초__ 이고 ```RotationAmount``` Curve 의 그래프의 넓이가 대략 3임.
+  180도의 경우 __길이가 2초__ 이고 ```RotationAmount``` Curve 의 그래프의 넓이가 대략 6임.
+  ```FootLock L/R``` Curve 값이 있는데 1이면 고정, 1~0 이면 서서히 이동, 0 이면 완전히 이동임.
+ Rotate 는 Rotation Mode 가 Aiming 일 때 사용되며 90 도 회전만 있음.
+ Turn 은 Rotation Mode 가 Lock Direction 일 때 제자리 회전에서 사용됨. 
   + Rotate 가 발은 2번 움직이는데 Turn 은 발을 3번 움직이고 재생시간이 더 김.

Transition (Anim Sequence)
+ __BasePose 에 대한 Additional Animation 임__
  + 그래서 Montage 로 사용해도 중간에 취소안해도 크게 상관이 없음
  + 관련 애니메이션이 기본 포즈랑 차이가 별로 안나서 그럼
+ ```FootLock L/R``` Curve 와 ```Enable Transition``` Curve 가 있음
  + Addictive 라 기존 값에서 더하기 때문에 -1 ~ 0 범위를 가짐
+ ```Enabled_Transition``` AnimCurve 가 들어가 있음
  + 처음은 0, 후반부에 1이 되어 후반 딜레이를 줄이는 역할을 함

#### Used Values <br/>

이하는 ```ShouldMove``` 가 False 일 때 업데이트 됨.(제자리 회전)

```bool bRotateR/L; float RotationRate```
+ Aiming 상태일 때 쓰이며 Locomotion States 에서 사용되는 값임.
 
```float ElapsedDelayTime```
+ 멈춰있고 카메라 방향으로 보게 할 때, 일정 시간이 지나고 회전시킬 때 사용되는 임시값.

```FRotator AimingAngle```
+ 카메라 방향인 ControlRotation 과 캐릭터 방향인 ActorRotation 의 Normalized Delta
+ 정확히는 위 값을 XY = {Yaw, Pitch} 순으로 해놓은 값.
+ Aim 상태에서도 쓰이고 여기서는 X 값이 일정범위를 넘기면 회전시킬 용도로 쓰임.

```enum HipsDir{ F, B, LF, RF, LB, RB}```
+ Lomotion 의 Cycle 전환 시 Notify 로 업데이트 되는 값.
+ F/B/L/R 애니메이션에서 막 땅에 닿는 순간으로 Evaluate 할 때 LF/LB 인지 RF/RB 인지 파악할 때 쓰임.

#### 설명 <br/>

멈췄을 때 FootLock 관련 Animation 을 실행시키고, 제자리 회전을 실행시키는 부분임.

Transition / Stop
+ ```StopL/R, QuickStop``` __Notify__ 가 Moving->NonMoving 과 Stop State 에서 호출됨.
  + Foot Lock 을 걸어주기 위한 동작을 실행하기 위해 사용됨
  + Notify 에서 Transition Animation 을 ```Grounded``` Slot 에 넣어줌.
  + ```Enabled_Transition``` AnimCurve 가 들어가 있음
    + NonMoving State 에서도 이 AnimCurve 를 1로 업데이트함
    + 이 Curve 값이 1인지 보고 PlayerBP 에서 제자리 회전을 할지 판단함(아래설명)
+ ```StopTransition``` 이 NotMoving->Moving 과 Moving State 에서 호출됨
  + ```Grounded```, ```Turn``` Slot 의 몽타주를 없애줌

Foot Lock Stop
+ ```Feet_Position``` 의 절댓값이 1에 가까운지 여부에 따라 __FootDown__, __FootUp__ 으로 나눔.
+ FootDown
  + 한쪽 발이 땅에 닿아있는 경우로, 그 발을 Lock 시킴
+ FootUp
  + 모든 발이 떠있는 경우로 ```Feet_Position``` 에 따라 가장 땅과 가까운 발을 Lock 시킴.
  + 땅과 가까운 발이 , F/B/L/R 애니메이션에서 막 땅에 닿는 파트를 Evaluate 해서 잠깐 가져옴.(Blend Duration 0.1 초 정도)
  + 또한 그때의 땅이 닿는 쪽의 Thigh 와 IK 본을 Blend 를 통해 고정시켜둠.

 
Rotate / TurnInPlace
+ RotationMode 에 따라 회전이 다르게 들어감
  + Velocity Direction 의 경우 그냥 Velocity 방향으로 회전 시켜줌 (여기랑 관계 x).
  + Looking Direction 의 경우 일정 시간이 초과하면 카메라 방향이 가게 ```RotationAmount``` 값을 바꿔줌 (NotMoving State)
  + Aiming Direction 의 경우 앞에서 말한 Rotate R90/L90 State 에서 ```RotationAmount``` 값을 바꿔줌. (Rotate R90/L90 State)
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
