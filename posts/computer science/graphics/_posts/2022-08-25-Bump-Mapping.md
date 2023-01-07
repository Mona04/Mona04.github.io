---
excerpt: "Bump Mapping 과 TBN Space"
use_math: true
tag : [Graphics]
---

## Bump Mapping

### Why?

모델 표면에 텍스쳐를 입혀서 굴곡을 표현하는 것을 Bump Mapping 이라고 한다.

이에 대한 대표적은 예시는 Normal Map 이다. Normal 은 Vertex 간의 정보를 통해서 얻을 수 있는 값이라 Geometry Shader 까지 가야지 값을 얻을 수 있어 Runtime 에 값을 얻기는 비싸지만, Texture 를 통해서 미리 얻으면 용량도 더 싸고 적용할 수 있는 범위도 더 크다. 

이제부터 Bump Mapping 이 어떻게 구현되는지 알아보자.


### Texture Space

Normal Map 을 ```(u, v, (rgb))``` 이렇게 생각해보자. 우리는 이것을  ```(u, v, w)``` 라는 세개의 축으로 구성된 삼차원 공간으로 생각할 수 있다. 이때의 ```u```, ```v``` 는 텍스쳐의 pixel 의 위치를 구할 때 쓰는 좌표이고 ```w``` 는 이와 수직인 축이 된다. 

이때 ```(r, g, b)``` 는 이 공간 내의 벡터이다. Normal Map 은 보통 파랑색이 많은데, 텍스쳐를 모델의 표면에 입힐 때 ```w``` 가 normal 에 해당되어 ```b``` 값이 보통 1에 가깝기 때문이다.

이러한 공간을 _Texture Space_ 라고 하자. 

우리는 Texture Space 에서는 할 일이 별로 없다. 모델을 그리기 위해서 ```rgb```  값을 사용하려면 이를 World Space 로 변환해야한다. 이는 어떻게 할까?


### TBN

이때 필요한 것이 TBN 이다.

TBN 은 Tangent, Bi-Tangent, Normal 의 줄임말이다. Normal 은 정점 간에서 구할 수 있는 그 Normal 이 맞다. 나머지는 Normal 에 수직하고 서로 수직인 벡터를 기본적으로 의미한다. 그런데 3D 모델에서 Normal 은 Unique 하지만 나머지 둘은 무한하지 않을까? 무한한 수직인 벡터 중 무엇이 Tangent 와 Bi-Tangent 일까?

이는 TBN 의 기본적인 목적인 Texture Mapping 에 맞도록 Model 위의 UV 의 축과 tangent / Bi-Tangent 가 일치하도록 정한다. (즉 uv 값이 없으면 Tangent, Bi-Tangent 를 구할 수 없다.) 이를 구하는 방법은 밑에서 다시 설명하겠다.

이제 TBN 을 구했으니 남은 것은 이게 어떤 공간의 벡터인지이다. Model 의 Vertex Information 으로 있는 TBN 은 당연히 Local 공간에서의 벡터들이다. 보통 Pixel Shader 에서 World 공간으로 변환된 TBN 을 사용한다. 

이제 어떤 공간 위에 있는 TBN 을 이용해 앞에서 말한 공간변환을 시도해보자.

$$ \begin{multline}

\begin{bmatrix} 
r & g & b 
\end{bmatrix}
\begin{bmatrix} 
T.x & T.y & T.z \\
B.x & B.y & B.z \\
N.x & N.y & N.z  
\end{bmatrix}
= 
\begin{bmatrix} 
n.x & n.y & n.z 
\end{bmatrix}

\end{multline}$$

위는 T, B, N 이 Ortho-Normal 한 Unit Vector 이기 때문에 성립한다. Ortho-Normal 한 벡터들로 이루어진 정방행렬 $$U = \{ u_1, u_2, ..., u_n \}$$ 가 있다면  $$UU^\mathsf{T} = I$$ 이기 때문이다.


### TBN 구하기

여러 방법이 있지만 많이 쓰이는 것이 삼각형 단위로 구하는 것이다. 이 방법의 단점은 노멀을 구할 때와 마찬가지로 오차가 심할 여지가 있다는 것이다. 하지만 설명하기는 가장 간단하다.

방법은 다음과 같다.

삼각형 정점 ```p0```, ```p1```, ```p2``` 가 있으면 그 점에서의 ```uv0```, ```uv1```, ```uv2``` 가 있을 것이다. 그러면 코드 상에서 다음과 같이 할 수 있다. 단, 이때 꼭 ```p1 - p0``` 과 ```p2 - p0``` 의 외적이 양수이어야 함에 주의하자.

{% highlight c++ %}

Vector3 p0 = vertices[index0].pos;
Vector3 p1 = vertices[index1].pos;
Vector3 p2 = vertices[index2].pos;

Vector3 e0 = p1 - p0;
Vector3 e1 = p2 - p0;

Vector2 uv0 = vertices[index0].uv;
Vector2 uv1 = vertices[index1].uv;
Vector2 uv2 = vertices[index2].uv;

float u0 = uv1.x - uv0.x;
float u1 = uv2.x - uv0.x;

float v0 = uv1.y - uv0.y;
float v1 = uv2.y - uv0.y;

{% endhighlight %}

그러면 다음이 성립한다.

$$ \begin{multline}

\begin{bmatrix} 
u_0 & v_0 \\
u_1 & v_1
\end{bmatrix}
\begin{bmatrix} 
T.x & T.x & T.x \\
B.y & B.y & B.y  
\end{bmatrix}
= 
\begin{bmatrix} 
e_0.x & e_0.y & e_0.z \\
e_1.x & e_1.y & e_1.z \\
\end{bmatrix}

\end{multline}$$

역행렬 공식을 이용하면 Tangent 와 BiTangent 를 구할 수 있다.

이때 부동소숫점 오차가 심할 여기가 있으므로 

```
Tangent = (Tangent - dot(Normal, Tangent) * Normal );

Tangent = Normalize(Tangent);

Binormal = Normalize(Cross(Normal, Tangent));
```

를 수행하는게 더 정확하다. 