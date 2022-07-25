---
excerpt: "깊이 정확도가 문제가 되는 이유와 해결하는 기법. Z Reverse."
use_math: true
tag : [Graphics]
---

## 기본적 정보

[Nvidia Reverse Z Infomation](https://developer.nvidia.com/content/depth-precision-visualized)

[Blog About Float Precision](https://blog.demofox.org/2017/11/21/floating-point-precision/)


## Depth Precision 이 중요할 때

기본적인 세팅에서 Projection Matrix 에 사용할 ```nearZ``` 를 ```0.0001``` 처럼 작게 넣고 ```nearF``` 를 ```1000``` 이렇게 넣고 그릴 물체에서 멀리 떨어지자. 그러면 우리는 Z Fighting 이나 앞뒤로 이동시 화면이 울렁거리는 것을 볼 수 있다. 바로 이런 현상이 Depth Precision 이 문제가 되는 상황이다. 


### 원인

당연히 부동소수점 오차가 원인이다. 이는 아래의 두 상황에서 모두 ```nearZ``` 와 가까운 값에 깊이 값이 몰려있게되어 더욱 심각해진다.

#### Projection 의 Z 매핑

[```D3DXMatrixPerspectiveFovLH()```](https://docs.microsoft.com/en-us/windows/win32/direct3d9/d3dxmatrixperspectivefovlh) 의 Remark 부분을 보자. OpenGl 에서 깊이를 ```[-1, 1]``` 로 매핑하는 것과는 달리 ```[0, 1]``` 로 매핑하는 매트릭스가 나온다. 이때 들어오는 벡터의 ```z``` 값에 대한 함수는 다음과 같다.

> $$\frac{\mathrm{zf}(\mathrm{z} - \mathrm{zn})}{\mathrm{z}(\mathrm{zf} \cdot \mathrm{zn}) }
= \frac{\mathrm{zf}}{(\mathrm{zf}-\mathrm{zn})} - \frac{\mathrm{zf} \mathrm{zn}}{\mathrm{z}(\mathrm{zf} - \mathrm{zn})}$$

![그래프1](/posts/graphics/depth-precision-1.png){: width="50%" }

이는 $$\mathrm{z}$$ 가 $$\mathrm{zn}$$ 이면 값이 ```0``` 이고 $$\mathrm{zf}$$ 이면 값이 ```1``` 이 되는 유리함수이다. ```[zn, nf] => [1, 1000]``` 으로 잡으면 위와 같은 그래프가 나온다. x 축이 View Space 상의 ```z``` 이고 y 축이 ```[0, 1]``` 로 매핑된 값을 나타낸다. 

그냥 봐도 ```z``` 의 초반 값에 대부분의 ```[0, 1]``` 상의 값이 할당됨을 알 수 있다. 그래서 먼거리에서 오차가 발생하게 된다.


#### Float 에서의 수 분포

```0 / 01111100 / 010 0000 0000 0000 0000 0000 ```

부동소수점은 [Wiki](https://en.wikipedia.org/wiki/Floating-point_arithmetic)에 잘 나와있지만 간략하게 상기해보자.

위 수는 부호가 양수이고 exponent 가 124 이다. fraction 은 가장 위에 암묵적으로 ```2^0``` 이 들와서 1.25 이 된다. exp 는 ```01111111``` 이 0 을 가리키기 위해서 ```127```을 빼므로 ```2^-3```가 곱해질 지수가 된다. 합쳐서 ```1.25 / 8 = 0.15625``` 가 된다. 


```
	// cpp 에서 쉽게 테스트 할 수 있는 코드
	float b = 0;
	unsigned int sign = 0, exponental = 126, frac = 0;
	*(unsigned int*)(&b) = (sign << 31) | (exponental << 23) | frac ;
	//*(unsigned int*)(&b) = 0b00111111000000000000000000000000u;
	printf("%0.38e", b);
```

감이 안잡히면 위 코드를 돌려보면서 공부해보자.


그럼 ```float``` 의 구조에 감이 잡혔으므로 0부터 1까지 어떻게 값이 나타나는지 생각해보자. 
+ ```0``` 의 경우 특수한 경우로 exponent 와 fraction 이 모두 0인 경우이다. 
+ 0 일 때에서 지수 값을 하나 올린 ```2^-126```에서 fraction 이 ```1``` 부터 대략```1.99999...``` 까지 분포한다. 이때의 최소 간격은 ```2^(-126-23)``` 이고 수의 범위는 ```2^-126 ~ 2^125``` 가 된다.
+ 지수를 하나 올린 ```2^125``` 에서도 비슷하게 계산하면 최소 간격은 ```2^(-125-23)``` 이고 수의 범위는 ```2^-125 ~ 2^124``` 가 된다. 
+ 이를 반복하면 지수가 ```01111110``` 에서 ```0.5 ~ 1``` 사이의 값을 갖고 최소간격은 ```2^-24``` 가 된다. 

이처럼 숫자의 크기가 커질수록 기본 단위는 지수단위로 증가함을 알 수 있다.


### 해결책

#### Reverse Z (Reverse Float)

Reverse Z 는 위의 Float 에서의 수 분포를 바꿔서 해결하는 방법이다. 위에 링크한 자료에서 분포가 어떻게 바뀌는지 그래프가 잘 되어 있다.

구현하는 방법은 간단하다.
1. Projection Matrix 에서 ```zNear``` 과 ```zFar``` 을 바꾸기
2. DepthStencilState 의 비교함수를 ```D3D11_COMPARISON_GREATER_EQUAL``` 로 바꾸기
3. DepthBuffer 초기화 시 ```1``` 에서 ```0``` 으로 바꾸기.
4. DepthBias 등이 있을 시 Negation 수행.

#### NearZ FarZ 조정

이는 Projection 의 Z 매핑 시의 분균형을 어느정도 완화시킨다. 

특히 ```NearZ``` 의 경우 값이 0 에 가까워질수록(0 이면 DevideByZero 이므로 안됨) 그래프가 급격한 경사를 이루게 된다. 그래서 ```1``` 또는 ```0.1``` 정도를 사용하고 그 이하는 사용하지 않을 것을 권장한다.

```FarZ``` 의 경우는 그래프 상 넓어봤자 크게 달라지지 않는데, 위 링크에서는 추천을 하고 있다. 왜 그런지는 잘 모르겠다. 그래프 그려보면 좁은게 더 이득인데 말이다.