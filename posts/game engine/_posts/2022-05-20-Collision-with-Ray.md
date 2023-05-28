---
excerpt: "충돌 관련  정리"
use_math: true
tags: [collision]
---

## Triangle and Ray

<details>
<summary> 코드 </summary>
<div markdown="1">

{% highlight c++ %}


bool Math::RayTriangleIntersection(
	const Vector3& ray_pos, const Vector3& ray_dir, 
	const Vector3& p0, const Vector3& p1, const Vector3& p2, 
	Vector3& out_hit_pos, Vector3& out_hit_norm, float& farT)
{
	// Find the triangles normal
	Vector3 v10 = p1 - p0;
	Vector3 v20 = p2 - p0;
	Vector3 normal = Vector3::Cross(v10, v20).Normalize();

	// Facing Check
	const float d = Vector3::Dot(normal, ray_dir);
	if (abs(d) >= 1e-5f)
	{
		const float hitT = Vector3::Dot(normal, p0 - ray_pos) / d;
		if (hitT > 0.0f && hitT * ray_dir.Length() < farT)
		{
			Vector3 hit_pos = ray_pos + ray_dir * hitT;
			Vector3 vh0 = hit_pos - p0;

			float dot1010 = Vector3::Dot(v10, v10);
			float dot2020 = Vector3::Dot(v20, v20);
			float dot1020 = Vector3::Dot(v10, v20);

			float dot20h0 = Vector3::Dot(v20, vh0);
			float dot10h0 = Vector3::Dot(v10, vh0);

			const float det = 1.0f / (dot1020 * dot1020 - dot1010 * dot2020);
			float u = (dot1020 * dot20h0 - dot2020 * dot10h0) * det;
			float v = (dot1020 * dot10h0 - dot1010 * dot20h0) * det;

			if (u >= 0.0f && v >= 0.0f && u + v <= 1.0f)
			{
				farT = hitT;
				out_hit_pos = hit_pos;
				out_hit_norm = normal;
				return true;
			}
		}
	}

	return false;
}

{% endhighlight %}

</div></details>

<details>
<summary> 설명 </summary>
<div markdown="1">

<br/>

DirectX 예제에 [코드](https://gpgstudy.com/forum/viewtopic.php?t=9473) 가 유명한 것으로 알고 있다. 위 코드는 그건 아니고 어디서 본 코드를 약간 변형한 것이다. 이 방법은 [koreascience](http://www.koreascience.or.kr/article/JAKO201209640670424.pdf) 에서 제안한 것처럼 uv 체크만 바꿔서 평행사변형 충돌 체크로 확장 할 수도 있다.

다른 파라미터는 직관적인데 ```farT``` 는 설명이 필요하다. 이는 반직선의 길이를 의미하며(그래서 엄밀하게는 반직선이 아니다) 가장 가까운 면을 찾을 때 이 값을 업데이트 하며 사용하면 된다.

#### 평면과의 교점

```normal``` 이 만드는 평면과 ```ray_pos``` 에서 ```ray_dir``` 방향의 반직선과의 교점을 계산한다. 교점계산은 평면에 반직선을 투영시켜서 구하며 식은 다음과 같다.

$$ \mathrm{HitPos} = \mathrm{RayPos} + \vec{\mathrm{RayDir}} 
\cfrac { \vec{n} \cdot \vec{ (p_0 - RayPos)} } { \vec{n} \cdot \vec{RayDir} } $$

이때 분모가 0 이되면 안되는데, ```normal``` 과 ```ray_dir``` 이 평행한 경우에 해당한다. 이를 첫번째 분기에서 체크한다.

```ray_pos``` 에서 시작하는 선은 뒤로가면 안되므로 $$ \vec{\mathrm{RayDir}} $$ 의 계수가 양수가 되어야한다. 또한 그 길이가 ```farT``` 보다 작아야한다. 이를 두번째 분기에서 체크한다.

#### 삼각형 내부 판별

$$ \mathrm{A} =  \begin{bmatrix} \vec{v_{10} } & \vec{v_{20}} \end{bmatrix}  $$ 
이고, 
$$ \vec{hv_0}  = \mathrm{HitPos} - \mathrm{v}_0 $$ 라고하자. 그러면 $$u$$, $$v$$ 는 다음의 식으로 표현할 수 있다.

$$ \mathrm{A} \begin{bmatrix} u \\ v \end{bmatrix}   =  \vec{hv_0}$$

이때 $$\mathrm{A}$$ 의 Rank 가 2 이므로 [Left Inverse](https://en.wikipedia.org/wiki/Generalized_inverse#Construction) 를 사용해 위 식을 풀 수 있다.

$$ \begin{multline}
\begin{bmatrix} u \\ v \end{bmatrix}  
= 

(\mathrm{A}^T \mathrm{A})^{-1}  \mathrm{A}^T \vec{hv_0} 
=

\begin{bmatrix} 
\vec{v_{10} } \cdot \vec{v_{10}} &  \vec{v_{10} } \cdot \vec{v_{20}} \\
\vec{v_{20} } \cdot \vec{v_{10}} &  \vec{v_{20} } \cdot \vec{v_{20}} \\
\end{bmatrix} ^{-1}
\begin{bmatrix} 
\vec{v_{10} } \\
\vec{v_{20} } \\
\end{bmatrix} 
\vec{hv_0}
\\ \\ \shoveleft
=

\cfrac {1} {
\vec{v_{10} } \cdot \vec{v_{10}} \times  \vec{v_{20} } \cdot \vec{v_{20}} 
-
\vec{v_{10} } \cdot \vec{v_{20}}  \times \vec{v_{20} } \cdot \vec{v_{10}}
}
\begin{bmatrix} 
\vec{v_{20} } \cdot \vec{v_{20}} &  -\vec{v_{10} } \cdot \vec{v_{20}} \\
-\vec{v_{20} } \cdot \vec{v_{10}} &  \vec{v_{10} } \cdot \vec{v_{10}} \\
\end{bmatrix}
\begin{bmatrix} 
\vec{v_{10} } \cdot \vec{hv_0} \\
\vec{v_{20} } \cdot \vec{hv_0} \\
\end{bmatrix} 

\end{multline}$$

이렇게 구한 $$u$$, $$v$$ 를 가지고 삼각형 내부에 점이 있는지 판단하는 방법을 사용하면 된다.

</div></details>



## Box and Ray

### Kay-Kajiya test (Slab Test)

<details>
<summary> 코드 </summary>
<div markdown="1">

{% highlight c++ %}

bool CollideHelpers::Cube2Ray(const UCubeCollider* in, const Ray& ray, float& out_dist)
{
	if (!in) return false;

	// initalize
	const Matrix world = in->GetTransform()->GetWorldMatrix();
	const Vector3 size = in->size * 0.5f * in->GetTransform()->GetScale();
	const Vector3 center = in->GetTransform()->GetPosition();
	const Vector3 axis[3] = { 
		world.Rotate(Vector3(1, 0, 0)).Normalize(), 
		world.Rotate(Vector3(0, 1, 0)).Normalize(), 
		world.Rotate(Vector3(0, 0, 1)).Normalize() };
	const Vector3 p = center - ray.pos;

	float minValue = -FLT_MAX, maxValue = FLT_MAX;

	// X, Y, Z 축에 대해서 수행
	for (int i = 0; i < 3; i++)  
	{
		float e = Vector3::Dot(axis[i], p);
		float f = Vector3::Dot(axis[i], ray.dir);
		if (!Math::IsNearlyZero(f)) {
			float t1 = (e - size[i]) / f;   // minValue
			float t2 = (e + size[i]) / f;   // maxValue
			if (t1 > t2) std::swap(t1, t2); // 회전에 따라 대소역전 보정

			minValue = std::max(minValue, t1);
			maxValue = std::min(maxValue, t2); 

			if (minValue > maxValue) return false; // Check
			if (maxValue < 0) return false; 
		}
		else if (std::abs(e) >= size[i])
			return false;
	}
	
	out_dist = minValue;

	return true;
}

{% endhighlight %}

</div></details>


<details>
<summary> 설명 </summary>
<div markdown="1">

<br/>

![OBBRAY01](/Posts/Graphics/OBBRay.png)

RealTime Rending 2ed 에서 소개하는 3가지 방법 중 첫번째로 많이 알려져 있다.

우선 두가지 개념을 정의한다.
+ 충돌체크할 박스의 면을 연장시켜서 만든 영역을 __Slab__ 라 하자. (위 그림의 십자가 영역)
+ 박스는 서로 평행한 면이 한쌍씩 있는데, 각각에 겹치는 위치를 ```RayPos``` 부터의 길이를 기준으로 ```MinValue```, ```MaxValue``` 라고 부르자.

전략은 Slab 과 Ray 가 겹치는 구간을 확인하는 것이다. 만약 박스와 충돌한다면 위 그림처럼 ```MinValue``` 들은 ```MaxValue``` 들보다 작게 된다. 이를 체크하는 것이 요지이다.

#### Slab

그럼 어떻게 Slab 과 Ray 간의 교점을 구할까? 사실 교점까지 구할 필요는 없고 ```RayPos``` 부터 교점까지의 길이만 구하면 된다. 그래서 OBB 처럼 Projection 을 응용하면 된다.

우선 ```RayPos```부터 Box 의 Center 까지의 벡터를 구하고, 이를 Box 를 이루는 면에 투영한 길이를 구한다(내적으로 간단히 구해진다). 여기서 박스의 ```Size``` 를 더하고 빼면 Slab 을 이루는 두 면이 투영된 길이가 된다. (위 그림의 빨간선이 이를 나타내는 보조선이다.)

이 길이는 삼각형의 닮을을 사용해서 ```RayDir``` 상의 길이로 바꿀 수 있다. ```RayDir``` 의 길이는 ```1``` 이므로 ```RayDir``` 을 Box 에 면에 투영한 길이를 나누면 된다. 

만약 ```RayDir``` 과 면이 수직하다면 Box 의 ```Size``` 와 Center 까지의 벡터가 투영된 길이를 비교하면 된다. ```Size``` 보다 작야아지 박스 안에 있게된다.


</div></details>