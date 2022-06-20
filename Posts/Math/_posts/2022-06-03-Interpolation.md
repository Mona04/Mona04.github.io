---
excerpt: "그래픽스에서 사용되는 보간에 대해서 간단한 정리"
categories: Math
tag: [Interpolation, Quaternion]
use_math: true
---

## Lerp

## [Slerp](https://en.wikipedia.org/wiki/Slerp)

>> $$r = \frac{\sin{(\theta(1-t))}}{\sin{\theta}}P_1 + \frac{\sin{(\theta t)}}{\sin{\theta}}P_2 $$

spherical linear interpolation 의 약자로 회전에서 사용된다.

수식을 보면 알겠지만 $$\sin{theta} = 0$$ 에선 정의되지 않는다. 구의 극점 간의 최단거리는 무한하다는 것을 생각하면 당연한 결과이다.

<details>
<summary>증명 </summary>
<div markdown="1">

#### 기하를 이용한 증명

위 식은 삼각형에 평행사변형을 그려보면 쉽게 유도할 수 있다.

<details>
<summary>참고그림</summary>
<div markdown = "1">

![slerp1](/Posts/Math/Interpolate01.png){: width="50%"} 

</div>
</details>
<br/>

위 그림에서 주황선을 $$P_1$$, $$P_2$$ 라고 하자. 그러면 우리가 원하는 좌표는 $$r = n P_1 + m P_2$$ 가 된다. 즉 $$n$$, $$m$$ 이라는 가중치를 조정하므로써 보간이 수행되는 것이다. 이러한 가중치는 $$r$$ 에서 $$P_1$$ 그리고 $$P_2$$ 으로 수직으로 그은 선에 대한 길이를 구하는 두 식에 의해서 쉽게 도출된다. 

예를들어 $$r$$ 에서 $$P_1$$ 로 수직으로 그은 선인 $$h$$ 를 구해보자. $$h = m\sin{\theta}$$ 이고 $$h = \sin{(\theta t)}$$ 이다. 이를 항등식으로 엮어서 $$m$$ 만 한쪽으로 빼내면 $$m$$ 이 $$\theta$$ 와 $$t$$ 로 환원된다.

#### 대수적 증명

위 식을 $$r = c_1(t) P_1 + c_2(t) P_2$$ 로 표현하자. 이때 $$c_1(), c_2()$$ 는 0~1 사이의 값을 받아서 0~1 사이의 값으로 연속적으로 매핑해주는 함수이다.

$$P_1$$ 과 $$P_2$$ 사이의 각도가 $$\theta$$ 라고 하자. 우리는 Slerp 를 원하므로 $$P_1$$ 과 $$r$$ 간의 각도는 $$t\theta$$ 가 되고, $$r$$ 과 $$P_2$$ 사이의 각도는 $$(1-t)\theta$$ 가 된다. 이러한 각도를 내적을 통해 다음과 같은 관계식을 세울 수 있다.

$$\cos{t\theta} = P_1 \cdot r = c_1(t) + c_2(t) \cos{\theta}$$

$$\cos{(1-t)\theta} = r \cdot P_2 = c_1(t)\cos{\theta} + c_2(t) $$

위 식을 연립해서 $$c_2()$$ 를 구하면 다음과 같다.

$$c_2(t) = \frac{\cos{(1-t)\theta} - \cos{t\theta}\cos{\theta}}{\sin^2{\theta}} 
= \frac{\sin{\theta} \sin{t\theta} + \cos{t\theta}\cos{\theta} - \cos{t\theta}\cos{\theta}}
{\sin^2{\theta}}$$

정리하면 위 공식의 부분을 구할 수 있고 $$c_1(t)$$ 도 마찬가지로 하면 된다.


</div></details>



### Quaternion 의 Slerp

[참고 자료](https://www.geometrictools.com/Documentation/Quaternions.pdf)

Quaternion 간의 [내적](https://pasus.tistory.com/33) 을 사용해서 $$\theta$$ 를 간단히 얻어낼 수 있다. 이를 이용해 위 공식에 그대로 적용하면 된다. 

#### Shortest Path

이때 Sphere 의 특성 상 경로가 $$\theta$$ 와 $$2\pi -\theta$$ 로 두 파트로 쪼개지는데 $$(q)v(\hat{q}) = (-q)v(-\hat{q})$$ 인 점을 이용하면 항상 짧은 길로 갈 수 있다. $$\cos{\theta} < 0$$ 일 때 각도를 negation 해주고, $$P_2$$ 에 해당하는 쿼터니언도 negation 시켜주면 된다. [예시 링크](https://stackoverflow.com/questions/51885082/quaternion-slerp-with-shortest-path-not-working)

#### Versor 형식

쿼터니온의 Slerp 에서는 $$q_1({q_1^{-1} q_2})^t$$ 로도 나타낼 수 있다. 직관적으론 이 식이 Slerp 하지 않을까 생각할 수 있겠다. 하지만 증명에 관해선, 직접 수식을 풀어서 Slerp 공식과 대조하는 방법 밖에 모르겠다. 직접 해보니 들어맞기는 하던데...

<details>
<summary> 노가다 증명의 일부 </summary>
<div markdown = "1">

$$ \begin{multline} 

q_1^{-1}q_2 
\\ \shoveleft
= (\cos{a}\cos{b} + \sin{a} \sin{b} (v_1 \cdot v_2),
  (\cos{a}\sin{b}) v_2 - (\cos{b}\sin{a}) v_1 - \sin{a}\sin{b}(v_1 \times v_2)) 
\\ \shoveleft
= \cos{\theta} + (\sin{\theta})v_3  
\\ \\ \shoveleft

q_1({q_1^{-1} q_2})^t   
\\ \shoveleft
= (\cos{t\theta}\cos{a} - \sin{t\theta}\sin{a} (v_1 \cdot v_3), 
 (\cos{t\theta} \sin{a}) v_1 + (\sin{t\theta}\cos{a})v_3 + \sin{t\theta}\sin{a}(v_1 \times v_3))  
\\ \\ \shoveleft

v_3 = \cfrac{ (\cos{a}\sin{b}) v_2 - (\cos{b}\sin{a}) v_1 - \sin{a}\sin{b}(v_1 \times v_2)}
{\sin{\theta}}
\end{multline}
$$

위처럼 풀어쓴 뒤 $$v_3$$ 을 없애면 된다. 외적이 들어간 항은 $$a \times (b \times c) = (a \cdot c)b - (a \cdot b)c$$ 를 이용하면 남은건 상쇄된다.

</div></details>


## Hermite Interpolation

[에르미트 보간법](https://en.wikipedia.org/wiki/Hermite_interpolation) 은 [뉴턴 보간법](https://subprofessor.tistory.com/67) 에서 한단계 나아간 기법으로 더 부드러운 곡선을 만든다.

{% highlight c++%}

T smoothstep(T s, T e, T x)
{
    T t = clamp((x - s) / (e - s), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
}

{% endhighlight %}


그래픽스에서는 [```smoothstep()```](https://thebookofshaders.com/glossary/?search=smoothstep) 같이 $$f(0)=0, f(1)=1, f'(0) = 0, f'(1) = 0$$ 인 에르미트 다항식을 만든다. 위키에서 제시하는 방법을 그대로 따라해보면 위 코드와 똑같은 다항식을 만들 수 있다.

<details>
<summary> 직접해보기 </summary>
<div markdown = "1">

```
z_0 = 0, f[z_0] = 0
                    f[z_1, z_0] = f'(0) = 0
z_1 = 0, f[z_1] = 0                          f[z_2, z_1, z_0] = 1
                    f[z_2, z_0] = 1                                 f[z_3, z_2, z_1, z_0] = -2
z_2 = 1, f[z_2] = 1                          f[z_3, z_2, z_1] = -1
                    f[z_3, z_2] = f'(1) = 0
z_3 = 1, f[z_3] = 1

h(x) = 0 + 0(x-0) + 1(x-0)(x-0) + -2(x-0)(x-0)(x-1) 
     = -2x^3 + 3x^2
```
</div></details>


## Matrix 의 보간

[SO](https://stackoverflow.com/questions/3093455/3d-geometry-how-to-interpolate-a-matrix)

SRT 분해를 해서 따로따로 처리하지 않으면 삐뚫어지고 스케일이 이상해진다. 