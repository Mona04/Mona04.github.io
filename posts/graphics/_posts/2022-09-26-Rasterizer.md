---
excerpt: "Shadow 정리"
use_math: true
tag : [Graphics]
---

## Rasterizer

참고자료[^1] 에 있는 내용을 주로 정리한 글이다.

DirectX-11 기준으로 Hardware 에서 처리되는 단계가 IA(Input Assembler), Output Stream, Rasterizer, Tesselator, Output Merger 로 총 5가지가 있다. 이중에 Rasterizer 를 알아보자.

### Visiblity Problem

2D Texture 에 컴퓨터 내의 공간을 표현한다고 해보자. 각 픽셀이 나타내는 색상을 어떻게 알 수 있을까? 이를 위한 방법은 크게 Ray-Tracing 과 Rasterization 이 있다. 
+ Ray-Tracing 은 각 픽셀마다 픽셀과 (pin-hole) Camera 와의 각도를 이용해서 Ray 의 Camera 와 Light 를 잇는 경로를 추적하는 방법이다. Rasterization 보다 속도면에서 떨어지지만 반사, 간접광 등의 정밀한 Lighting 이 가능하다.
+ Rasterization 은 그려야할 대상을 View-Frustrum 에 투영시킨 후 가장 가까운 대상만을 그리는 기술이다. __Ray-Tracing 이 Camera 에서 Object 로 이동한다면 Rasterization 은 반대방향으로 이동한다고 볼 수 있다.__

아래에서 Rasterization 에 대해 자세히 살펴보자.


### Projection

최종적으로 Pixel Shader 에 ```SV_POSITION``` 의 값은 다음과 같다. 
+ ```SV_POSITION```. ```XY``` 가 Viewport Space 의 좌표
+ ```Z```. NDC 상의 Depth
+ ```W```. Viewport Space 의 ```Z``` 값

#### Screen Space(Clip Space)

Projection Matrix 에 View Space 에서 Screen Space 로 변환이 된다. 

이는 바로 뒤 단계인 NDC Space(Cartesian) 의 Homogeneous Coordinates 형태 또는 Un-Normalized 된 형태이다. NDC Space 와 달리 원점을 나타낼 수 있지만 이외의 특징은 없다.[^3]

이때 ```Z``` 값이 헷갈리는 부분이다. 뒤에서 설명하겠지만 OpenGL 과 DirectX 는 처리하는 방법이 약간 다르다. DirectX 의 [Project Matrix, MSDN](https://learn.microsoft.com/en-us/windows/win32/direct3d9/d3dxmatrixperspectivefovlh)  을 기준으로 하면 ```z``` 값은 다음처럼 변환된다.

$$ z := \cfrac{\mathrm{zf}(z-\mathrm{zn})}{(\mathrm{zf}-\mathrm{zn})} $$

이는 ```Z``` 가 $$\mathrm{zn}$$ 일때는 0 이 되고 $$\mathrm{zf}$$ 일때는 $$\mathrm{zf}$$ 이 되는 비선형 함수이다. 모양이 자연로그와 비슷해서 이후 NDC Space 로 변환한 값을 저장한 Depth Buffer 의 대부분의 값이 ```1``` 에 가깝게 되는 이유이기도 하다.


#### NDC(Normalized Device Coordinates)

위에서 변환한 Screen Space 를 View Space 의 ```Z``` 값(보통 ```w``` 에 저장됨) 으로 나누어 정규화한 것이다. ```[-1, 1]``` 외의 범위의 값은 버린다. 

이때  ```Z``` 축에 대한 범위는 OpenGL 은 ```[-1, 1]``` 이며 DirectX 는 ```[0, 1]``` 으로 차이가 난다. 둘다 작은 값이 더 가까운 값이다. 

이 차이는 DirectX 는 Reverse-Z 테크닉을 구현하기가 편하다던가 Depth Buffer 에서 값을 변환하는 알고리즘 등에서 차이를 낳는다. 


#### Viewport Space (Rasterizer Space)

 ```XY``` 좌표가 ```[0, Resolution)``` 이 되어 Rasterize 에서 처리를 용의하게 한다. 

```
X = (X + 1) * Viewport.Width * 0.5 + Viewport.TopLeftX
Y = (1 - Y) * Viewport.Height * 0.5 + Viewport.TopLeftY
Z = Viewport.MinDepth + Z * (Viewport.MaxDepth - Viewport.MinDepth)
```

NDC Space 에서 Viewport Space 로 DirectX 에서 변환하는 코드[^2] 는 위와 같다.

두가지 특징이 있다. 첫째로 NDC 와 ```Y``` 축이 반대방향이다. 둘째로 빠른 계산 등의 장점을 위해 ```XY``` 좌표는 가장 가까운 정수로 반올림 된다. 즉 __정수값이다.__


### Pixel Choosing

_1988, Juan Pineda, "A Parallel Algorithm for Polygon Rasterization"_ 가 요즘 사용되는 방법의 기초 아이디어라고 한다.[^1] 이때 사용되는 함수인 Edge Function 은 다음과 같다.

$$E(P, V_0, V_1) = (P.x - V_0.x)(V_1.y - V_0.y) - (P.y - V_0.y)(V_1.x - V_0.x) $$

이는 ```z``` 좌표를 0 으로 두어 3차원 Vector 로 만들었을 때 $$(P - V_0) \times (V_1 - V_0)$$ 의 Magnitude 에 해당된다. 혹은 2x2 matrix 의 determinant 이기도 하다. 즉 CCW 알고리즘이다.

Rasterizer Space 에서의 Pixel $$P$$ 와 Triangle Primitive 의 각 선분에 대해서 위 함수를 수행해서 모두 부호가 같으면 Primitive 안에 포함된 것으로 간주한다. 또한 부호에 따라서 Face Culling 을 처리할 수 있다.

판별 함수가 선형적인 특성상 여러개의 Pixel 을 병렬 프로그램으로 한번에 처리할 수 있어 빠르다.

#### Top-Left Rule

한 픽셀이 삼각형의 Edge 와 정확히 일치하는 경우 여러 삼각형에 포함될 수가 있다. 이 경우 어느쪽 삼각형으로 처리할지 정하는 규칙이다.

방법은 Left 또는 Top Edge 위에 있는 픽셀만 포함된 것으로 간주하고 나머지 Edge 위에 있는 것은 배제하는 것이다. 이는 주어진 정점의 순서대로 삼각형의 선분을 만들었을 때 이를 4가지로 나눌 수 있다는 점에서 착안한다. ( Y 축으로 증가(Left), Y 축으로 감소, Y 축은 그대로. X 축은 증가(Top), Y 축은 그대로. X 축은 감소 )

Face Culling 이 적용되었다면 이 중에 연속된 Left 와 Top Edge 는 다른 삼각형의 Left 와 Top Edge 와 겹칠 수가 없다. 

#### Barycentric Coordinates

Edge Function 의 결과를 이용해 삼각형 무게중심좌표를 쉽게 얻을 수 있다. 그리고 이를 통해 Interpolation 을 적용할 수 있다.

삼각형 $$(V_0, V_1, V_2)$$ 에 대한 정점 $$P$$ 에 대한 무게중심좌표는 삼각형의 세 꼭짓점에 대한 weights 로 표현한다. 이때 weight 는 꼭짓점의 반대편에 있는 선분과 ```P``` 가 이루는 넓이와 비례한다. 그래서 $$V_0$$ 에 대한 weight 는 다음의 식으로 얻을 수 있고 나머지도 비슷하게 구할 수 있다.

 $$\lambda_0 = \cfrac{E(P, V_1, V_2)}{E(V_0, V_1, V_2)}$$ 

하지만 이를 곧바로 쓸 순 없는데 Perspective Projection 이 하드웨어에서 수행되기 때문이다. 대신 다음 식을 수행하면 된다.

$$C = Z[\cfrac{C_0}{Z_0}(1-q) + \cfrac{C_1}{Z_1}q] $$




### Depth Sorting

Rasterization 은 Screen 과 가장 가까운 물체만을 그려야한다. 이를 위한 알고리즘을 visible surface algorithms 이라고 하며 Z-Buffer, Painter Algorithms 등이 해당된다. 보통의 Graphic Cards 는 Z-Buffer Algorithms 만을 지원한다.

Z-Buffer 는 빠르지만 오직 하나의 Depth 만을 유지하기 때문에 반투명 물체에서는 약하다. Alpha Blending 과 CPU 에서 Painter Algorithms 을 수행해 어느정도 해결할 수 있지만 Pixel 마다 Point List 를 유지하는 것이 아니기 때문에 한계가 있어 요즘은 사용하지 않는다. 이를 해결하기 위해 Alpha-Cover 등의 기술이 사용된다.

#### Interpolate

$$ z := \cfrac{\mathrm{zf}(z-\mathrm{zn})}{(\mathrm{zf}-\mathrm{zn})} $$

DirectX 에서의 Screen Space 에서의 Depth 를 되짚어보자. 이는 __Affine Transformation 으로 상대적 거리를 유지하므로 Linear Interpolation 을 사용할 수 있다.__ 

하지만 NDC 에서의 Depth 로는 불가능하다. __Perspective Projection 을 Line 은 보존하지만 Distance 는 보존하지 않기 때문이다.__

대신 아래의 식을 사용할 수 있다.

$$ \cfrac{1}{Z} = \cfrac{1}{Z_0}(1-q) + \cfrac{1}{Z_1}q$$ 

이에 대한 증명은 여러방법이 있지만 다음의 방법이 가장 간단해서 소개한다. [^1]

삼각형이 놓여져 있는 평면을 $$AX_{\text{camera}} + BY_{\text{camera}} + CZ = D$$ 라고 하자.

$$ X_{\text{screen}} = \cfrac{X_{\text{camera}}}{Z_{\text{camera}}}$$ 가 성립하고 $$Y$$ 에 대해서도 비슷하다.

그러면 $$ \cfrac{1}{Z_{\text{camera}}} = \cfrac{A}{D} X_{\text{screen}} +  \cfrac{B}{D} Y_{\text{screen}} +  \cfrac{C}{D} $$ 가 만족한다. 이는 곧 NDC 의 XY 좌표가 $$ \cfrac{1}{Z_{\text{camera}}} $$ 와 선형관계라는 의미와 같다.



#### Z-Buffer

Early-Z/Stencil optimizations 이 있어서 보통 Pixel Shader 이전에 테스트 된다. 하지만 ```clip()``` 같은 Pixel 을 버리는 함수를 사용하는 Shader 의 경우 이후로 바뀐다. 또한 Depth Buffer 에 대한 compression 도 사용할 수 없다. 그래서 ```Clip()``` 같은 픽셀값을 버리는 함수는 Depth Buffer 를 사용하고 있으면 성능상 다른 방법을 쓰는게 권장된다.[^4] 



## 참고자료

[^1]: [ScratchApp](https://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation)

[^2]: [MSDN](https://learn.microsoft.com/en-us/windows/win32/direct3d11/d3d10-graphics-programming-guide-rasterizer-stage-getting-started)

[^3]: [SO. When does the transition from clip space to screen coordinates happen?](https://stackoverflow.com/questions/21841598/when-does-the-transition-from-clip-space-to-screen-coordinates-happen)

[^4]: [GameDev1](https://forum.unity.com/threads/hlsl-is-there-any-point-to-clip-early.608692/) 