---
excerpt: "Advanced Locomotion System V4 분석 - 사용되는 변수들 정리"
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
+ Stop Motion, Rotation 에서 제자리 회전 가능 여부를 의미함
+ 0 이 불가능, 1 이 가능을 의미함.

Feet_Position
+ Walk/Run/Sprint Animation 에 값이 있음
+ -1 이면 왼발 1 은 오른발이 땅에 닿음이며 0은 두발 모두 떠있음을 의미함
+ Locomotion State 의 Stop State 에서 쓰임

RotationAmount, YawOffset
+ Rotate/Turn Animation 에 값이 있지만 쓰진 않고 직접 값을 구해 Curve 값을 업데이트함.
+ 이 Curve 값을 가지고 캐릭터를 회전시킴.
+ 전자는 Locomotion State 의 NotMoving, Rotate 90L/R 에서 사용됨 (서있을 때)
+ 후자는 Locomotion Cycle 에서 업데이트 됨. (움직일 때)

BasePoseN, BasePoseCLF
+ 서있는지 앉아있는지를 파악하기 위한 Anim Curve
+ 두 Curve Value 를 가지고 뒤 Layer 에서 서있는 포즈와 앉은 포즈를 Blend 함

FootLockL/R
+ FootLock 에서 사용되는 값. 1이면 위치를 고정시키고 0이면 떼는 것임.
+ Transition, Turn Animation 과 LocoStates 의 Not Moving 에서 업데이트 됨

EnableFootIK L/R
+ MainMovementStates 에서 Grounded State 에서 업데이트 됨
+ 이게 On 되어 있어야 FootLock 관련 변수를 업데이트 함.

Mask_LandPrediction
＋MainMovementStates 에서 InAirs 관련 State 에서 사용됨
+ Jump 관련 Animation 에서 업데이트함.
+ 1이면 착륙동작과 Blend 를 하지 않고, 0 이면 땅에 곧 추락할지 계산해 착륙동작과 Blend 함

### Values Update In Character <br/>

아래는 ```ALS_Base_CharacterBP``` 에서 업데이트 되는 값들임. Tick 마다 아래의 Essential Values 가 업데이트 된 후 Cache Values 가 업데이트 됨. States Values 는 이벤트 혹은 직접 호출로 업데이트 되며 몇몇 변수는 값 변경시 이전값을 저장해둠. 사실 AnimBP 에서 업데이트 해도 크게 상관은 없음

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

```bool ShouldMove = (IsMoving && HasMovementInput) || Speed > 150``` 
	여러곳에서 사용됨
	
나머지는 해방 부분에서 설명


## Inertialization

[Inertialization](https://youtu.be/BYyv4KTegJI)