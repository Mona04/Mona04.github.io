---
excerpt: "Quaternion 의 공식들, 특히 회전이 왜 그렇게 나왔는지에 대한 정리"
categories: Math
tag: [Quaternion]
use_math: true
---

## Complex Number

[잘 정리된 블로그](https://usle.tistory.com/25?category=717097)

### 복소수의 성질 <br/>

복소수의 __덧셈과 뻴셈__ 은 벡터의 계산과 같음(벡터가 여기서 온 것)

복소수의 __곱셈과 나눗셈__ 은 극좌표를  통해서 이해할 수 있음
+ 복소수 $$ x = a + ib $$ 가 있을 때
+ 절댓값 $$r$$ 과 편각 $$\theta$$ 을 통해 나타내면 $$ x = r(\cos\theta + i\sin\theta ) $$
+ r 은 따로 빠지기 때문에 1로 둬도 상관이 없음.
+ 두 수의 곱을 한다면 <br/> <br/>
  $$\begin{multline} 
  a = \cos\alpha + i\sin\alpha,    \quad   
  b = \cos\beta + i\sin\beta         \\ \\ \shoveleft
  a \times b = (\cos\alpha + i\sin\alpha) \times (\cos\beta + i\sin\beta)  \\ \shoveleft
  = \cos\alpha\cos\beta - \sin\alpha\sin\beta + i(\sin\alpha\cos\beta + \cos\alpha\sin\beta) \\ \shoveleft
  = \cos(\alpha + \beta) + i(sin(\alpha + \beta))   \\ \\ \shoveleft
  \frac{a}{b} = \frac{ \cos\alpha + i\sin\alpha}{\cos\beta + i\sin\beta }   
  = (\cos\alpha + i\sin\alpha)(\cos\beta - i\sin\beta)  \\ \shoveleft
  =  \cos\alpha\cos\beta + \sin\alpha\sin\beta + i(\sin\alpha\cos\beta - \cos\alpha\sin\beta)    \\ \shoveleft
  = \cos(\alpha - \beta) + i(sin(\alpha - \beta))   \\ \\ \shoveleft
  \end{multline}$$
  + 삼각함수의 덧셈공식을 사용하면 간단하게 정리할 수 있음.
  + 복소수의 곱과 나눗셈은 편각의 합이 됨을 알 수 있음. => __회전__

이러한 복소수는 실수계의 행렬로 나타낼 수 있음.
+ 복소수의 곱을 펼쳐서 $$i$$ 의 제곱만 -1 로 뺀 뒤 행렬로 빼면 됨 
+ 그러면 잘알려진 2D 의 회전행렬이 나옴<br/> <br/>
$$\begin{multline} 
x = a + ib = \cos\theta + isin\theta     \\ \shoveleft
= \left[\begin{array}{cc}
   cos(\theta) & -sin(\theta) \\
   sin(\theta) & cos(\theta) \\
\end{array}\right]     \\ \shoveleft
= \left[\begin{array}{cc}
   a & -b \\
   b & a \\
\end{array}\right]
\end{multline}$$

### 복소수와 Euler's Formula <br/>

[Euler's formula](https://ko.wikipedia.org/wiki/%EC%98%A4%EC%9D%BC%EB%9F%AC_%EA%B3%B5%EC%8B%9D) 에 따라 __Complex Exponential 로도 회전표현__ 이 됨.
+  $$ e^{ix} = \cos{x} + i\sin{x} $$  이므로
+ $$\theta$$ 만큼 $$v$$ 를 회전시킨다면 $$ v' = e^{\theta i} v $$ 가 됨

## Triple <br/>

[잘 정리된 블로그](https://jjycjnmath.tistory.com/242?category=738765)

3개의 수로 만든 Triple 은 곱셈에서 그 크기가 유지되기를 창시자 해밀턴은 원했음
  + 즉, 임의의 Triple $$(a_1, b_1, c_1), (a_2, b_2, c_2)$$ 에 대해
  + $$\begin{align} &  (a_1^2 + b_1^2 + c_1^2)(a_2^2 + b_2^2 + c_2^2) = (a_3^2 + b_3^2 + c_3^2) \end{align}$$ 를 만족하는 $$(a_3, b_3, c_3)$$ 을 찾기를 바랬음
  + 그런데 __자리를 하나 더 추가하면 가능__ 하다는 것을 발견함
$$\begin{align}&(a_1a_2 - (b_1b_2 + c_1c_2),\ a_1b_2 + b_1a_2,\ a_1c_2 + c_1a_2,\  b_1c_2 - c_1b_2)\end{align} $$ 가 바로 그것.
  + 이 사원수의 각 자리를 제곱해서 더하면  $$(a_1^2 + b_1^2 + c_1^2)(a_2^2 + b_2^2 + c_2^2)  $$ 가 됨
  + 이러한 __오일러의 네제곱수 항등식__ 에서 4사원수로 나아가게 됨.


## Quaternion 의 정의 <br/>

__(주의) 쿼터니온은 벡터와 달리 스칼라와 비슷하게 표기를 하므로 맥락에 맞게 구별해야함__

다음과 같이 정의됨
  + $$\begin{multline} 
    q = w + xi + yj + zk = (w, \vec{v})  \\ \\ \shoveleft
    i^2 = j^2 = k^2 = ijk = -1                \\ \\ \shoveleft
    q_1 \times q_2 = (w_1, \vec{v_1}) \times (w_2, \vec{v_2})     \\ \shoveleft
    = \left(\begin{array}{cc}
      w_1w_2 - x_1x_2 - y_1y_2 - z_1z_2  \\
      x_1w_2 + w_1x_2 - z_1y_2 + y_1z_2 \\
      y_1w_2 + z_1x_2 + w_1y_2 - x_1z_2  \\
      z_1w_2 - y_1x_2 + x_1y_2 + w_1z_2 \\
      \end{array}\right)   \\ \shoveleft
    = (w_1w_2 - \vec{v_1} \cdot \vec{v_2}, \  w_1\vec{v_2} + w_2\vec{v_1} + \vec{v_1} \times \vec{ v_2} )   \\ \\ \shoveleft
    \hat{q} = (w, -x, -y, -z)    \\ \\ \shoveleft
    q^{-1} = \frac{w - xi -yj -zk}{w^2 + x^2 + y^2 + z^2} = \frac{\hat{q}}{\|q\|}  \quad q \times q^{-1} = 1
    \end{multline} $$ 
  + $$w$$ 는 Scalar Part, $$\vec{v}$$ 는 Vector Part 라고 부름
  + $$ij, ik \dots $$ 등은 위 항등식을 통해 간단히 증명해서 쓰면 됨
  + Cross 계산 때문에 __결합법칙은 성립하고 교환법칙은 성립하지 않음__
  + 곱에서 사용되는 dot 과 cross 는 실수식 계산한 것을 정리한 것으로 vector 에서 쓰이는 계산의 원조임
    + Scalar Part 가 0 인 두 Quaternion 의 곱의 조합으로 Dot, Cross 표현가능
    + [관련 영상](https://youtu.be/ln3vI4JEArc)

이는 4x4 의 실수행렬로 나타낼 수 있음
+ 복소수에서 한것처럼 Quaterion 의 곱을 정리한 식에서 행렬로 빼내면 됨.
+ 정리하면  <br/> <br/>
$$\begin{multline} 
q = w + xi + yj + zk 
= \left[\begin{array}{cc}
   +w & -x & -y & -z  \\
   +x & +w & -z & +y \\
   +y & +z & +w & -x \\
   +z & -y & +x & +w \\
\end{array}\right]     \\ \\ \shoveleft
\end{multline}$$


## Quaternion and Euler's Formula

### Taylor Series 를 사용하는 방법 <br/>

[참고](https://www.youtube.com/watch?v=88BA8aO3qXA)

__Fully Imaginary Quaternion__ 은 Scalar Part 가 0 인 Quaternion 임
+ 이 경우 교환법칙이 성립함 <br/> <br/> $$\begin{multline} 
q_1 = (0, \vec{v_1}), \quad q_2 = (0,\vec{v_2})   \\ \shoveleft
q_1 \times q_2 = - \vec{v_1} \cdot \vec{v_2}  = q_2 \times q_1 \\ \\
\end{multline}$$
+ 제곱에 대해서 재밌는 성질이 생김. <br/> <br/> $$\begin{multline} 
q^2 = -\|\vec{v}\|^2     \\ \shoveleft
q^{2n} = (- \|\vec{v}\|^2)^n  \quad q^{2n-1} =  (-\|\vec{v}\|^{n-1})^2 q   \\ \\ \shoveleft
\end{multline}$$

제곱에 대한 성질을 생각하며 $$e^x$$ 의 [Maclaurin Series](https://ko.wikipedia.org/wiki/%ED%85%8C%EC%9D%BC%EB%9F%AC_%EA%B8%89%EC%88%98) 에 대입을 하면
+ $$ q = (0, \vec{v}) = (0, xi, yj, zk)  $$ 에 대하여
+ $$\begin{multline} 
  e^q = 1 + q + \frac{q^2}{2!} +  \frac{q^3}{3!} + \frac{q^4}{4!} \dots    \\ \shoveleft
  1 - \frac{\|v\|^2}{2!} + \frac{\|v\|^4}{4!} - \frac{\|v\|^6}{6!} \dots = \cos(\|v\|)  \\ \shoveleft
  \frac{1}{\|v\|} \left(\|v\| - \frac{\|v\|^3}{3!} + \frac{\|v\|^5}{5!} - \frac{\|v\|^7}{7!} \right)v  \dots = \sin(\|v\|) \frac{v}{\|v\|}   \\ \shoveleft
  e^q =  \cos(\|v\|) + \frac{\sin(\|v\|)}{\|v\|}(xi + yj + zk)   \\ \shoveleft
  \end{multline}$$ 

### Euler's Formula 를 사용하는 방법 <br/>

[참고](https://math.stackexchange.com/questions/41574/can-eulers-identity-be-extended-to-quaternions/41605#41605)

다음과 같이 정의했을 때 
+ $$\begin{multline} 
   r = \pm \sqrt{x^2 + y^2 + z^2} , \ \ (\frac{xi + yj + zk}{r})^2 = -1  \\ \shoveleft  
   q = w + xi+yj+zk = w + r \frac{xi + yj + zk}{r}  
   \end{multline}$$ 
+ $$\begin{multline} 
  e^q = e^{w + r\sqrt{-1}} = e^we^{r\sqrt{-1}} = e^w(cos(r) + \sqrt{-1} sin(r) )       \\ \shoveleft
  =  e^w\left(\cos{r} + \frac{\sin{r}}{r}(xi + yj + zk) \right)
  \end{multline}$$

### [Versor Form](https://en.wikipedia.org/wiki/Versor)

Quaternion $$q = (0, x, y, z) = (0, \vec{v})$$ 이 있어서 $$ x^2 + y^2 + z^2 = 1 $$ 를 만족할 때
 + $$\begin{multline} 
    e^{\theta q} = e^{\theta x i + \theta y j + \theta z k  }   \\ \shoveleft
    = \cos{\theta} + \frac{\sin{\theta} }{\theta}(\theta x i + \theta y j + \theta z k ) \quad \dots (\theta \neq 0)  \\ \shoveleft
    =  \cos{\theta}  + \sin\theta (xi + yi + zi) = \cos{\theta}  + \sin\theta \ \vec{v}
    \end{multline}$$
 + 예외인 0에서도 계산해보면 연속함수임을 알 수 있음
 + 위를 통해 $$i$$ 에서의 Euler Formula 가 Quaternion 으로 확장됨을 확인할 수 있음.

## Quaternion and Rotation

[참고](https://youtu.be/q-ESzg03mQc)

$$ v = (0, \vec{v}) $$ 과 크기가 1인 $$n = (0, \vec{n}) $$  가 있어 $$\vec{n}$$ 을 축으로 $$\theta$$ 만큼  $$\vec{v}$$ 를 회전시킨다고 하자.
+ 이때 __축은 원점을 지나므로__  $$\vec{v}$$ 는 위치/방향 벡터든 상관없음

축에 대한 회전은 축이 이루는 평면 상에서 회전하므로 $$\vec{n}$$ 를 쪼갬
+ $$\begin{multline} 
  \vec{v} = \vec{v_{\perp}} + \vec{v_{\parallel}}   \\ \shoveleft
  \vec{v_{\parallel}}  = ( \vec{n} \cdot \vec{v} ) \vec{v}   ,\quad \vec{v_{\perp}} =  \vec{v} - \vec{v_{\parallel}} 
  \end{multline}$$

추가로 네가지 성질이 필요함
+ 첫째는 Scalar Part 가 0 이라 벡터 외적을 쿼터니온 곱으로 바꾼 $$ \vec{n} \times \vec{v_{\perp} } = nv_{\perp} $$
+ 둘째는 위의 __Euler's formular__
+ 셋째는  $$ e^{\theta n}v_{\parallel} = v_{\parallel}e^{\theta n} $$
  +  $$\begin{multline} 
   ( \cos{\theta}, \sin\theta\vec{n})(0, \vec{v_{\parallel}} ) = (0, \vec{v_{\parallel}} )( \cos{\theta}, \sin{\theta}\vec{n})  \\ \shoveleft
    (0, \cos{\theta} \vec{v_{\parallel}} + \sin\theta\vec{n} \times  \vec{v_{\parallel}} ) = (0, \cos{\theta} \vec{v_{\parallel}} +  \vec{v_{\parallel}} \times \sin{\theta}\vec{n} ) = (0,  \cos{\theta} \vec{v_{\parallel}} )
    \end{multline}$$
+ 넷째는 $$ e^{\theta \vec{n}}v_{\perp} = v_{\perp}e^{-\theta \vec{n}} $$
  +  $$\begin{multline} 
   ( \cos{\theta}, \sin\theta\vec{n})(0, \vec{v_{\perp}} ) = (0, \vec{v_{\perp}} )( \cos{(-\theta)}, \sin{(-\theta)}\vec{n})  \\ \shoveleft
    (0, \cos{\theta} \vec{v_{\perp}} + \sin\theta\vec{n} \times  \vec{v_{\perp}} ) = (0, \cos{(-\theta)} \vec{v_{\perp}} +  \vec{v_{\perp}} \times \sin{(-\theta)}\vec{n} )     \\ \shoveleft
    (0, \cos{\theta} \vec{v_{\perp}} + \sin\theta\vec{n} \times  \vec{v_{\perp}} ) = (0, \cos{\theta} \vec{v_{\perp}} - \vec{v_{\perp}} \times \sin{\theta}\vec{n} )   \\ \shoveleft
    (0, \cos{\theta} \vec{v_{\perp}} + \sin\theta\vec{n} \times  \vec{v_{\perp}} ) = (0, \cos{\theta} \vec{v_{\perp}} + \sin\theta\vec{n} \times  \vec{v_{\perp}} )    \\ \shoveleft
    \end{multline}$$


우리가 할 $$\vec{n}$$ 을 축으로한 임의의 $$\vec{v}$$ 의 회전은
1. $$\vec{n}$$ __을 노말로 갖고 원점을 지나는 평면 상__ 에서 회전 후
2. 회전에 영향없는  $$\vec{v_{\parallel}}$$ 를 더해 완성됨

+  $$\begin{multline} 
  \vec{v}' = \vec{v_{\parallel}} + \cos{\theta}\ \vec{v_{\perp}} + \sin{\theta}( \vec{n} \times \vec{v_{\perp} })  \\  \shoveleft
  = \vec{v_{\parallel}} + \cos{\theta}\ \vec{v_{\perp}} + \sin{\theta}(n  v_{\perp})  \\  \shoveleft
  = \vec{v_{\parallel}} + (\cos{\theta} + \sin{\theta}n )v_{\perp}  \\  \shoveleft
  = v_{\parallel} + e^{\theta n} v_{\perp}  \\  \shoveleft
  \end{multline}$$

+ $$\begin{multline} 
  \vec{v}' =  v_{\parallel} + e^{\theta n} v_{\perp} \\  \shoveleft
  = e^{\frac{\theta}{2} n} e^{-\frac{\theta}{2} n} v_{\parallel}  + e^{\frac{\theta}{2} n} e^{\frac{\theta}{2} n} v_{\perp}   \\  \shoveleft
  = e^{\frac{\theta}{2} n} (v_{\parallel})  e^{-\frac{\theta}{2} n} + e^{\frac{\theta}{2} n} (v_{\perp})  e^{-\frac{\theta}{2} n}  \\  \shoveleft
  =  e^{\frac{\theta}{2} n}( v_{\perp} + v_{\parallel} ) e^{-\frac{\theta}{2} n}  \\  \shoveleft
  =  e^{\frac{\theta}{2} n} \  v \  e^{-\frac{\theta}{2} n}  \\  \shoveleft
  = qv\hat{q}
  \end{multline}$$

이렇게 해서 우리가 알고있는 쿼터니온 회전이 나오게 됨.

정리하면
1. Quaternion $$ q = e^{\theta n} = (\cos\theta, \sin\theta \ \vec{n}) $$ 에서 곱셈의 의미는
  + $$\vec{n}$$ 을 노말로 갖고 원점을 지나는 평면 상 - 의 점을 $$\theta$$ 만큼 회전하는 것임
  + 즉  $$ v_{\parallel} = 0 $$ 일 때의 회전을 의미함
  + 혹은 $$ v_{\parallel} $$ 만큼의 Scalar 와 그게 반영안되고 회전된 Vector 가 남음
2. 임의의 점에 대해서 회전한다면
  + $$ qv\hat{q} $$ 임
  + $$\vec{n_\parallel}$$ 은 앞에서 회전되고 뒤에서 원래대로 돌아가고
  + $$\vec{n_\perp}$$ 은 앞에서 회전되고 뒤에서도 회전되는데
  + 두 성분이 합해진 상태에서 한번에 처리 되는 것.
3. 덧붙여서
  + 쿼터니언 간 결합법칙이 성립하므로, 쿼터니언 간의 곱은 회전의 연쇄로 해석할 수 있음.

## Quaternion To Euler

[이전블로그](https://moksha1905.blogspot.com//search/label/Math?updated-max=2020-07-01T13:15:0%2B09:00&max-results=1&pgno=2)

## 기타

#### 계산성능

[Wiki](https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation#Performance_comparisons) 를 보면 회전행렬간의 체이닝은 행렬보다 효율적이지만, 벡터 회전은 행렬이 더 효율적이다.