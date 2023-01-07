---
excerpt: "Advanced Locomotion System V4 분석 - IK Layer, Overlay Layer"
tag: [UE4]
---
## Overlay Layer

### 전략

Outlay Layer 에서는 어떤 무기를 들거나 했을 때  Base_N(CLF) 를 기반으로 한 Base Layer 을 유지하면서 특정부위만 보정하는 것을 원함.

이를 위한 Animation 은 3가지가 필요함
+ Base_N(CLF) 기반의 Base Layer
+ Base_N(CLF)
+ Base_N 에 원하는 부위만 수정시킨 Animation 

그리고 __Dynamic Addictive 를 구함 (Base Layer -  Base_N(CLF)__
+ 이때 __Mesh Space Additive 옵션을 꼭 켜줘야__ 함

위의 재료를 통해 우리는 2가지 경우의 애니메이션을 Blend by Bone 여부로 만들 수 있음
+ Base Layer 그대로
+ OutLay Animation + Base Addictive ( With Alpha )
	+ Alpha == 0 는 정지포즈처럼 Outlay 의 다리모양을 그대로 쓸때 같은 경우
	+ Alpha > 0 는 달릴 때 Locomotion 의 팔 휘두름을 추가해줘야 할때 같은 경우 

이때 애니메이션마다 State 를 두는건 귀찮으므로 Anim Curve 를 만듬
+ ```Layering_Legs, Layering_Spine, Layering_Arm_L ...``` 
	+ Base Layer 를 쓸지  OutLay Animation + Base Addictive 를 쓸지 정할 수 있음
+ ```Layering_Spine_Add, Layering_Arm_L_Add ...```
	+ OutLay Animation + Base Addictive 의 Alpha 를 조절


### How to make overlay animation

Record Function of Animation Blueprint Editor 를 이용함. 
+ Base is Base_N Animation 
+ Blend Base by bones with a wannted Animation Pose
+ Record
+ Take a one frame from the recorded and combine all to make it eazy to handle.
	+ Is also reduced occupied memories.
+ Edit Anim Curve


## IK Layer

### Foot IK

```Enable_FootIK_L/R``` 이라는 AnimCurve 가 켜져 있을 때 이하의 변수도 업데이트하고 ```TwoBoneIK``` 도 실행함

#### Foot Lock

```FootLock_L/R``` 이 1일 때 IKFoot 의 위치로 Component Space 상의 값인 Locked Loc/Rot 을 업데이트함.

```FootLock_L/R``` 이 0 이상일 때  Locked Loc/Rot 이 World 에서 같은 위치가 되도록 값을 변경시킴.

그러면 말 그대로 커브값이 1일 때 Locked 된 Transform 이 재설정되고 0 이 될때까지 그곳을 유지하게 됨. 

이 커브값을 Alpha 로 사용하기 때문에 0~1 의 값이 될 경우 서서히 그곳에서 떼어지는 모양이 됨.

#### Foot Grounded

애니메이션은 RootBone 의 Z 값을 높이로 갖는 평면 위에 있다는 전제로 만들어짐.

그래서 IKBone 의 XY 값과 RootBone 의 Z 값에서 -Z 방향으로 LineTrace 를 함.
+ ```FVector Floor = {IKBone.XY, RootBone.Z}```
+ 즉 RootBone 의 Z 값을 기준으로 발을 올리고 내리는 것이지 실제 발 위치로 계산하지 않음.
+ 그리고 Loc 의 경우 Floor 와 뺀 값을 사용함.
+ 여기서 구한 World 공간 상의 Loc / Rot 으로 Add 하는 TwoBoneIk 를 실행함.
+ Pelvis 는 두 발중 낮은 Z 를 갖는 Loc 으로 Add 시킴.

경사면에서 발을 땅에 대게 하는 방법이 인상적인데
+ ```(FVector(0, 0, 1) - hitResult.ImpactNormal) * FloorHeight``` 를 위에서 구한 Loc 에서 빼줌.
+ 여기서 FloorHeight 는 발의 높이로 보면 되는데 15 가 쓰임.
