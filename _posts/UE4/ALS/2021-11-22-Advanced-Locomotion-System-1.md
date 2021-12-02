---
excerpt: "Advanced Locomotion System V 분석 - 사용되는 변수들 정리"
categories: UE4
tag: [UE4]
---

## 개요


[다운링크](https://www.unrealengine.com/marketplace/ko/product/advanced-locomotion-system-v1)

자연스러운 동작변환, 계단 등에 적용되는 Foot IK, 등의 튜토리얼이 되는 프로젝트임. 

렉돌 등 몇몇 부분은 뺀, 나의 포폴에 적용하기 위한 부분들을 여기에 정리할 것임.

## 사용되는 값 

외울 필요는 없고 레퍼런스 용임. 적당히 알아볼 수 있게 약자화 했으니 주의, 

OOO Values 로 함께 업데이트 되는 변수를을 그룹화 했음.

### Anim Curve <br/>

Weight_Gait 
+ Locomotion Cycle 에서 쓰이는 6가지 방향의 BlendSpace 의 Animation 을 보면 있음.
+ Walk 모션은 1, Run 은 2, Sprint 는 3 이 들어가 있음

Enable_Transition
+ Transition Animation 에 값이 있고, Locomotion State 의 NotMoving State 에서 1로 업데이트함.
+ Stop Motion, Rotation 등에서 쓰임.
+ 0 이 불가능, 1 이 가능을 의미함.

Feet_Position
+ Walk/Run/Sprint Animation 에 값이 있음
+ 1 이면 오른발 -1 은 왼발이 땅에 닿음이며 0은 두발 모두 떠있음을 의미함
+ Locomotion State 의 Stop State 에서 쓰임

RotationAmount, YawOffset
+ Rotate/Turn Animation 에 값이 있지만 쓰진 않고 직접 값을 구해 Curve 값을 업데이트함.
+ 이 Curve 값을 가지고 캐릭터를 회전시킴.
+ 전자는 Locomotion State 의 NotMoving, Rotate 90L/R 에서 사용됨 (서있을 때)
+ 후자는 Locomotion Cycle 에서 업데이트 됨. (움직일 때)

BasePoseN, BasePoseCLF
+ 서있는지 앉아있는지를 파악하기 위한 Anim Curve
+ 두 Curve Value 를 가지고 뒤 Layer 에서 서있는 포즈와 앉은 포즈를 Blend 함

### Update In Character <br/>

아래는 ```ALS_Base_CharacterBP``` 에서 업데이트 되는 값들임. Tick 마다 아래의 Essential Values 가 업데이트 된 후 Cache Values 가 업데이트 됨. States Values 는 이벤트 혹은 직접 호출로 업데이트 되며 몇몇 변수는 값 변경시 이전값을 저장해둠.

+ Cache Values
	+ ```FVector Prev_Velocity = CharacterMovement->GetVelocity()``` 
	+ ```float Prev_AimYaw = GetControlRotation()->Yaw```
	
+ Essential Values
	+ ```FVector Velocity = CharacterMovement->GetVelocity()```
	+ ```FVector Acceleration = (GetVelocity() - Prev_Velocity) / DeltaTime ```
	+ ```float Speed = Len(GetVelocity().XY)```
	+ ```bool IsMoving = Speed > 0.1f```
	+ ```FVector MovementInput = CharacterMovement->GetCurrentAcceleration()``` 
	+ ```float MovementInputAmount = MovementInput.Len() / CharacterMovement->GetMaxAcceleration()```
	+ ```bool HasMovementInput = MovementInputAmount > 0.f```
	+ ```FRotator AimingRot = GetControlRotation()```
	+ ```float AimYawRate = Abs(GetControlRotation().Yaw - Prev_AimYaw) / DeltaTime```
	+ ```FRotator LastVelocityRot = Velocity.RotationFromXVector()```
		+ Update if ```IsMoving```  is true.
	+ ```FRotator LastMovementInputRotation = MovementInput.RotationFromXVector()```
		+ Update if ```HasMovementInput``` is true.

+ States Value
	+ ```PawnMovementMode = CharacterMovement->MovementMode```
	+ ```Movement State```
		+ Grounded, InAir, Mantling, Ragdoll 이 있음.
		+ 앞에 두개는 ```CharacterMovement->Movement``` 값과 연동됨
			+ ```Walking, Navmesh Walking``` 은 Grounded, ```Falling``` 은 InAir 임.
	+ ```Prev_MovementState```
	+ ```MovementAction```
		+ Low/High Manting, Rolling, GettingUp 이 있음.
	+ ```RotationMode```
		+ Velocity Direction, Looking Direction, Aiming 이 있음
	+ ```Gait```
		+ 뛰는 속도로, Walking, Running, Sprinting 이 있음.
	+ ```Stance``` => 서있냐 앉아있냐
	+ ```View Mode``` => 3인칭, 1인칭
	+ ```Overlay State``` => 들고있는 무기/도구 종류

### Update In AnimBlueprint <br/>

아래는 Animation BP 에서 Tick 마다 업데이트 되는 값임.

#### Update Inner

+ Inner Values
	+ ```enum HipsDir{ F, B, LF, RF, LB, RB}```
		+ Lomotion 의 Cycle 전환 시 Notify 로 업데이트 되며 후에 Stop Motion 때 사용됨
	+ ```bool bPivot```
		+ Locomotion 의 Cycle 전환 시 On 되어서 LocoDetail 에서 사용됨.
	+ ```bool ShouldMove = (IsMoving && HasMovementInput) || Speed > 150``` 
		+ 밑에 Grounded 쪽의 values 가 여기에 의해서 제어받고 몇몇 군데에서 사용됨.

#### Update by Every Frame

#### Update by Movement Mode

##### Gounded

아래는 ```ShouldMove``` 가 True 일 때 업데이트 됨.

+ Movement Values
	+  ```struct VelocityBlend { float F, B, R, L; }```
		+ Blend Space 의 보간을 위해 사용되며 Velocity 를 Character 의 LocalSpace 로 변환 후 특수한 정규화를 거친 값
		+ Locomotion Cycle 에서 FBLR 방향의 Anim 을 보간하는데 쓰임. 
	+ ```float WalkRunBlend```
		+ Locomotion Cycle 에 쓰이는 6가지 방향의 BlendSpace 의 Input 값임
		+ ```Gait``` 가 Walk 이면 0, Run, Sprint 면 1을 줌. 
	+ ```float StrideBlend```
		+ Locomotion Cycle 에 쓰이는 6가지 방향의 BlendSpace 의 Input 값임
		+ StrideBlendNWalk 와 StrideBlendNRun 이라는 FloatCurve 에서 ```Speed``` 로 값을 얻어옴. 
		+ 각각에서 얻어온 값은 ```Weight_Gait``` 라는 Anim Curve 로 보간 받음.
		+ Walk 와 Run 모션 독립적으로 Blend 하려고 사용함.
	+ ```float StandingPlayRate```
		+ Locomotion Cycle 에 쓰이는 6가지 방향의 BlendSpace 의 Input 값임
		+ ```StrideBlend``` 와 비슷한 작업을 거침
		+ ```WorldScale``` 과 ```StrideBlend``` 를 나눠서 보정함.
	+ ```float DiagonalScaleAmount```
		+ 아래는 이 변수에 대한 설명 전문인데, 여기선 사용하지 않을 값임.
		+ Calculate the Diagnal Scale Amount. This value is used to scale the Foot IK Root bone to make the Foot IK bones cover more distance on the diagonal blends. Without scaling, the feet would not move far enough on the diagonal direction due to the linear translational blending of the IK bones. The curve is used to easily map the value. 
	+ ```FVector RelativeAccelerationAmount```
		+ Locomotion Cycle 에서 Sprint_F 와 Sprint_Impulse 라는 Animation 을 보간하는데 쓰임.
		+ ```
		float MaxValue = Dot(Acceleration, Velocity) > 0 ? CharacterMovement->GetMaxAcceleration() : CharacterMovement->GetMaxBrakingDeceleration();
		FVector RelativeAccelerationAmount = ClampSizeMax(Acceleration, MaxValue) / MaxValue;
		RelativeAccelerationAmount = Character->GetActorRotation().Unrotate(RelativeAccelerationAmount);
```
	+ ```struct LeanAmount { float R, F;}```
		+ ```LeanAmount = Interp(cur, RelativeAccelerationAmount.XY);```
		+ 즉 앞에서 구한 상대가속도를 사용해 DeltaTime 으로 보간한 것.
	+ ```enum MovementDir{ F, B, L, R}``` 
		+ Locomotion 의 Cycle 전환에 사용되며 현재 캐릭터가 바라보는 Angle 을 Descrete 화 한 값.
	+ ```float FYaw, BYaw, LYaw, RYaw```
		+ ```Yaw Offset``` Curve 를 이 값으로 업데이트함
		+ Locomotion Cycle 에서 대각선 방향으로 움직일 때 캐릭터가 그 방향으로 회전하게 해줌

아래는 ```ShouldMove``` 가 False 일 때 업데이트 됨.

+ Rotation Values
	+ ```bool bRotateR/L; float RotationRate```
		+ Aiming 상태일 때 쓰이며 Locomotion States 에서 사용되는 값임.
	+ ```float ElapsedDelayTime```
		+ 멈춰있고 카메라 방향으로 보게 할 때, 일정 시간이 지나고 회전시킬 때 사용되는 임시값.


##### InAir

## Inertialization

[Inertialization](https://youtu.be/BYyv4KTegJI)