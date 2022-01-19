---
excerpt: "Advanced Locomotion System V4 분석 - 기본 Layer"
categories: UE4
tag: [UE4]
---

## Base Layer

### Grounded State

#### Anim Assets

Roll 등 땅에서 움직이는 Anim Montage
+ Notify 로 끝나는 부분에서 EntryMode 를 바꿔줘야함

#### Used Value

```struct GroundedEntryState { Idle, Roll }```
+ Grounded States 에서 Montage 가 끝나고 다시 Machine States 가 돌 때 어디로 갈지 판단할 때 쓰임.

#### 설명

Grounded 에서 Montage 가 돌아가는 경우 FootLock 을 실행하고 싶음.
+ 이를 위해선 Transition Animation 이 끝부분에 재생되야함.
+ 이를 위한 States

Grounded Slot 에서 돌던 Montages 가 끝나면 Grounded State 는 __처음부터 다시 평가 받음__.
+ Montage 는 끝부분에 EntryMode 변수를 Notify 로 바꾸어줌
+ EntryMode 를 보고 특정 State 로 이동시킴. 
  + Montage 의 끝부분을 Evaluate 함과 동시에 FootLock 을 1로 켜주는 State 임
+ 곧바로 Locomotion 재생하는 States 으로 이동시킴
  + 이때 Transition Animation 을 틀어주는 Montage 를 수행함
+ __Transition Animation 은 Additional Animation 이므로 중간에 취소시킬 필요는 없음.__


### MainMovement States

#### Anim Assets

Landed (Anim Sequence)
+ Light Landed 랑 Heavy Landed 의 차이는 소리의 차이가 더 큼
+ Additive Version 과 그냥 버전이 있는데 전자는 착지중 달릴 때 쓰임.

Jump (Anim Sequence)

Fall Loop (Anim Sequence)
+ 일반버전과 Fast 버전이 있음

Lean Falling
+ Fall Loop 의 Additive Animation 으로 당연히 몸 기울리는데 쓰임

#### Used Values

```float FallSpeed```
+ ```Velocity.Z``` 값을 사용함
+ 이 값이 얼마나 큰지에 따라 Fall Loop 를 빠른버전을 쓸지 말지, Landed 를 Heavy 를 할지 정함

```float LandPrediction```
+ ```Velocity``` 에 따라서 CapsuleTrace 를 시행한 결과를 이용함
+ ```HitResult.Time``` 을 ```Mask_LandPrediction``` 이라는 Anim Curve 상태를 보고 보간해 사용함
  + ```Lerp(HitResult.Time, 0, Mask_LandPrediction```
  + 값이 1 이면 Landed 시작 모션을 Falling/Jump State 에서 재생함 

```struct LeamAmount { float LR, FB;} ```
+ SKMesh 의 Component Space 로 ```Velocity``` 를 변환시킴
+ 그 값을 300으로 나누고 -1~1 사이의 범위는 LeanAirAmount 라는 Curve 에 ```FallSpeed``` 로 값을 가져와 곱함
+ 이를 구보전 값과 DeltaTime 으로 보간해서 업데이트함

#### 설명

MovementMode 에 따라서 애니메이션을 실행하는 부분.

중요한 특징이 몇가지 있음.
+ Grounded State 에서 Enable_Foot_Lock_L/R 을 켜주는 것.
+ Falling 상태에서 몸일 기울이는 것.
+ ```LandPrediction``` 에 따라서 시작모션을 미리 준비하는 것.
