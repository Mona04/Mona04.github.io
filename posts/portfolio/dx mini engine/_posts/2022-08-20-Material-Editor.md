---
excerpt: "Material Parameter Editor using WPF"
header:
  teaser: https://img.youtube.com/vi/rk1LzrO1rdU/0.jpg
tags: [WPF, DirectX]

use_math: true
---

## Description

<iframe width="560" height="315" src="https://www.youtube.com/embed/rk1LzrO1rdU" frameborder="0" allowfullscreen></iframe>

<br/>

Unreal 처럼 여러 기능을 넣고 싶었지만 프로젝트에 따라 쉐이더의 구조가 계속 바뀔 것이라 Parameter 수정 기능만 넣었다.

### Parameters

Material Editor 의 구현에 대해 설명하기 위해선 Engine 내의 Material 구현을 먼저 설명해야한다.

나는 Material 을 다음과 같이 구현했다
+ Shader 는 주어진 바이트 값을 Reinterpret 해서 값을 사용한다. 
+ 그러므로 Material 은 몇십바이트 정도의 고정된 Buffer 에 Parameters 값을 저장하고, Material 에 따로 저장한 정보로 이 Buffer 를 Reinterpret 하여 값을 읽고 쓴다.
+ 이때 Material 에 관련 정보는 Shader 내에서 사용되는 Material 관련 구조체를 묘사해야한다. 이 둘을 일치시키는 것은 앞에서 설명했듯 아직 수동이다.

위 Editor 의 Parameter 수정부는 이러한 Material 관련 정보를 통해 Parameter 의 순서대로 자료형에 맞게 래퍼를 생성하고 이 랩퍼의 값을 바꾸면서 구현되었다.