---
excerpt: "Shadow 정리"
use_math: true
tag : [Graphics]
---

## 주의

아래 코드는 모두 행우선이다.

## 그림자 종류

Shadow 는 크게  __Umbra__(본그림자, 빛이 완전히 가려진 영역) 와 __Penumbra__(반그림자, 빛이 일부만 가려진 영역) 로 나눌 수 있다. Penumbra 의 경우 광원이 가깝고 광원의 크기가 클때 광원의 일부가 가려져 생기는 것으로 Directional Light 에서는 생기지 않는다. 이때 물체에서 빛이 가려지는 영역을 __Caster__ 라고 하고 그림자가 지는 영역을 __Receiver__ 라고 한다. 

옛날에는 스텐실 버퍼를 이용한 Stencil Shadow 를 사용했다. 이는 그림자 안에 있는지 밖에 있는지 두가지 상태만을 가져 그림자의 경계가 뚜렷해 Hard Shadow 라고 불린다. 이와 반대로 반그림자를 구현하는 알고리즘을 Soft Shadow 라고 부른다.

## ShadowMap

### Artifacts

The pixel of the GBuffer is not mapped by one-to-one ratio with the texel of the Shadow Map. 원인은 이것이 주이며 결과 Case 별로 해결책이 달라져 Artifacts 를 분류한다.

#### Perspective Aliasing

그래서 그림자가 Grid 처럼 각지게 나오는 현상이다. 

Camera 에 가까운 Directional Light 에 대한 그림자에서 특히 잘 생긴다. 왜냐하면 View Frustrum 앞부분이 매핑되는 ShadowMap 의 Texel 의 수가 적기 때문이다.

해결법은 여러가지가 있다.
1. Shadow Map Resolution Increasing. 구현이 간단하고 일정 해상도까지는 효과가 좋다. 하지만 일정 크기를 넘어서면 그렇지 않은데 ShadowMap 을 그리는 View 와 Camera View 가 일치하지 않는 이상 완벽히 매칭될 수 없기 때문이다. 보통은 적당히 큰 해상도로 ShadowMap 을 그린다.
2. CSMs(Cascade Shadow Maps). 거리에 따라 ShadowMap 을 따로 처리한다. ShadowMap 이 달라지는 지점이 거슬릴 수 있지만 그래도 효과가 좋아서 많이 쓰인다.
3. PSMs, LSPSMs. Frustrum 앞쪽의 좁은 부분을 편다고 하는데 자세한건 모르겠다.

#### Projective Aliasing

Perspective Aliasing 과 비슷한 원인이고 해결책도 같다.

Light Ray 와 Tangent Plane of Geometry 가 평행할 때 생긴다. 수평선에서 ShadowMap 의 Texel 하나 차이가 World Space 에서는 엄청난 거리가 되는 것이 이러한 경우이다. 굳이 먼 수평선에서는 문제가 안생기겠지만 가까운 곳에서 생기면 그림자가 각지게 나온다.

#### Shadow Acne(erroneous self-shadowing)

A texel of ShadowMap 에 pixels of GBuffer 가 할당되는 것이 주된 원인이며 부동소수점 오차 Projective aliasing 등이 부가적인 원인이다.

해결법은 ShadowMap 을 그릴때 Bias 를 주어 실제보다 더 먼 곳에 Rastering 하는 것이다. 너무 Bias 를 크게 주면 그림자가 본체와 떨어지는 Peter Panning 현상이 일어난다.

D3D10 Hardware 는 이때 View 를 바라보는 기울기가 커짐에 따라 Bias 를 추가로 두는 Slope-Scale Depth Bias 기능도 생겼다. 관련 공식은 [MSDN Depth Bias](https://learn.microsoft.com/en-us/windows/win32/direct3d11/d3d10-graphics-programming-guide-output-merger-stage-depth-bias) 를 참고하자.


### Near/Far Z 

광원을 기준으로 ViewProj 행렬이 필요한데, 이때 ```nearZ``` 는 광원이 영향을 주는 가능한 먼 거리를 주는 것이 좋다.

AABB 등을 사용해서 ViewFrusturm 과의 거리를 매 틱마다 재며 사용할 수 도 있다.


## PCF(Percentage Closer Filtering)

Shadow Map 으로는 Hard Shadow 만을 판별 가능하다. 가장자리를 부드럽게 하기 위해서 ShadowMap 의 인접 픽셀에 대해 랜덤 샘플링을 하여 부드러운 가장자리를 구현한다. 중심 픽셀과 주변 픽셀간의 거리에 의해 이 영역의 범위가 달라지므로
Penumbr(반그림자) 구현을 위해 주로 쓰이는 기법이다.

```SampleCmpLevelZero()```. bilinear interpolation of the pass-fail test. 깊이 자채를 보간해서 비교연산을 한번만 하면 부정확한 결과를 얻는다. 그래서 여러 샘플을 뽑아 비교연산을 하고 보간해야하는데, 이 함수로 간편하게 처리할 수 있어 PCF 에서 유용하게 쓰이는 함수이다.

## Cascade Shadow

Directional Light 는 그 범위가 커서 Camera View Frustrum 범위에 대해서만 ShadowMap 을 업데이트하는 것이 합리적이다. 그런데 Frustrum 의 맨 앞에 해당되는 좁은 부분에는 적은량의 Texel 만이 해당되게 되어 Artifacts 가 생길 여지가 커진다. 

CSMs 는 이를 해결하기 위해 Camera 부터의 거리에 따라 ShadowMap 을 차등을 두어서 가까운 거리에서도 많은 Texel 을 사용할 수 있도록 하는 알고리즘이다.


가장자리를 자연스럽게 하기 위해선 Cascade Range 와 PCF Sampling 범위를 조절하면 된다.


### 코드

<details markdown="1">

<summary>자세히</summary>

#### ViewProj Main

{% highlight c++ %}

void DirectionalUpdate(UCamera* camera)
{
	// Initialize
	_cascade_offset_x = 1e9;
	_cascade_offset_y = 1e9;
	_cascade_scale = 1e9;

    float cascade_radii[3];
	Matrix view, proj, trans, scale;
	auto [center, radius] = ExtractFrustumSphereBound(camera, _cascade_ranges[0], camera->Get_Far());

    // Calc Base ViewProj
	const Vector3 forward = LightDirection;
	const Vector3 up = Vector3::Cross(forward, { 1,0,0 }); // rotation is not important so choose {1,0,0}
	view.LookAtUpLH(center, center + forward, up);
	if constexpr (USE_REVERSE_Z)
		proj.OrthographicLH(2 * radius, 2 * radius, radius, -radius);
	else
		proj.OrthographicLH(2 * radius, 2 * radius, -radius, radius);
	_viewprojs[0] = proj * view;

    // Total Loop Count is Cascade Shadow Map Array Number
	for (int i = 0; i < cascade_level; i++)
	{
		// sphere 을 써서 rotation 에 의존적이지 않게 함
		auto [cas_center, cas_radius] = FWorldHelpers::ExtractFrustumSphereBound(camera, _cascade_ranges[i], i == cascade_level - 1 ? camera->Get_Far() : _cascade_ranges[i + 1]);
		_cascade_radii[i] = std::fmaxf(cas_radius, _cascade_radii[i]);
	
		// pixel 단위로 업데이트 함으로써 translation 에 의존적이지 않게함
		Vector3 offset = { 0 };
		if (CascadeNeedsUpdate(view, i, cas_center, offset))
			_cascade_centers[i] += view.Transpose() * offset;
	
		// it is relative to frustrum center so multiply with viewproj to make it in viewproj space 			
		auto trans_offset = (_viewprojs[0] * _cascade_centers[i]);
		_cascade_offset_x[i] = -trans_offset.x;
		_cascade_offset_y[i] = -trans_offset.y;
		trans = Matrix::PositionToMatrix({ _cascade_offset_x[i], _cascade_offset_y[i], 0 });
	
		// zoom in
		_cascade_scale[i] = radius / _cascade_radii[i];
		scale = Matrix::ScaleToMatrix({ _cascade_scale[i], _cascade_scale[i] , 1});
	
		// Cascade View Proj
		_viewprojs[i+1] = scale * trans * _viewprojs[0];  // scale 먼저면 trans 도 scale 되어 있어야하니 전체를 곱해야
	}
}

{% endhighlight %}

```_viewprojs[4]``` 에서 ```0``` 인덱스는 View Frustrum 을 포괄하는 __Orthogonal__ Projection Matrix 가 저장된다. 이 Projeciton 에서 Translation 과 Scaling 을 하여 View Frustrum 을 여러 ShadowMap 에 담게 된다. 이때 ```XY``` 좌표면 변경할 뿐이고 ```Z``` 좌표는 변하지 않게 한다는 것에 유의하자. 이를 만족시키려면 Translation 을 먼저하고 그 뒤에 Scaling 을 해야한다. 

```_cascade_ranges[4]``` 은 사전에 정해지는 값이다. ```_cascade_centers[3]``` 는 Cache 를 이유로 저장되는 값이고
```_cascade_radii[3]``` 는 그냥 임시변수이다.

 ```_cascade_offset_x```, ```_cascade_offset_y```, ```_cascade_scale``` 는 Shader 에서 사용되는 값이다.


#### 회전에서의 Artifacts 제거

{% highlight c++ %}

std::pair<Vector3, float> ExtractFrustumSphereBound(UCamera* camera, float nearZ, float farZ)
{
    const auto& view = camera->GetView();
    const auto& proj = camera->GetProj();
    const auto& pos = camera->GetCameraPos();

    std::pair<Vector3, float> result;

    Vector3 axisX = Vector3(view._11(), view._12(), view._13());
    Vector3 axisY = Vector3(view._21(), view._22(), view._23());
    Vector3 axisZ = Vector3(view._31(), view._32(), view._33());

    // The center of the sphere is in the center of the frustum
    result.first = pos + axisZ * (0.5f * (nearZ + farZ));

    // Radius is the distance to one of the frustum far corners
    result.second = (pos + (axisX / proj._11() + axisY / proj._22() + axisZ) * farZ - result.first).Length();

    return result;
}

{% endhighlight %}

위처럼 Frustrum 을 감싸는 Sphere 을 찾는다. 방법을 여러가지가 있겠다. 위 코드는 Frustrum 의 모든 꼭짓점을 지나지는 않겠지만 어느정도 비슷한 결과를 얻을 수 있다. 

위의 Projection Matrix 는 [D3dxMatrixPerspectiveFovLH](https://learn.microsoft.com/en-us/windows/win32/direct3d9/d3dxmatrixperspectivefovlh) 기준이다.

위에서 얻은 ```[Center, Radius]``` 를 기준으로 Projection 을 한다면 카메라 회전의 영향에서 벗어난다.


#### 이동에서의 Artifacts 제거

{% highlight c++ %}

bool CascadeNeedsUpdate(const Matrix& shadow_view, uint cascade_index, const Vector3& new_center, Vector3& out_offset)
{
	const Vector3 old_center_view = shadow_view * _cascade_centers[cascade_index];
	const Vector3 new_center_view = shadow_view * new_center;
	const Vector3 diff_center = new_center_view - old_center_view;

	// Find the pixel size based on the diameters and map pixel size. size / 2radius
	const float pixel_size = (float)shadowMap->GetWidth() / (2.0f * _cascade_radii[cascade_index]);

	float pixel_off_X = diff_center.x * pixel_size;
	float pixel_off_Y = diff_center.y * pixel_size;

	// Check if the center moved at least half a pixel unit
	bool r = abs(pixel_off_X) > 0.5f || abs(pixel_off_Y) > 0.5f;
	if (r)
	{
		// Round to the 
		out_offset.x = floorf(0.5f + pixel_off_X) / pixel_size;
		out_offset.y = floorf(0.5f + pixel_off_Y) / pixel_size;
		out_offset.z = diff_center.z;
        return true;
	}
	
	return false;
}

{% endhighlight %}


카메라가 이동하면 약간의 World Space 의 XY 좌표 차이로 다른 Shadow Map Texel 과 매핑될 수 있다. 이는 그림자의 끝부분에서 울렁거림을 유발시킨다. 

이를 방지하는 방법은 Shadow Map 의 한 Texel 이 World Space 에서 나타내는 길이가 정해져 있음을 이용하면 된다(Orthogonal Projection 을 사용하므로). Shadow Mapping 을 위한 ```Center``` 를 이러한 길이 단위로 움직이면 그림자의 끝부분의 모양이 유지된다


#### Shadowing 

{% highlight c++ %}

Texture2DArray<float> _shadowCascadeMap : register(t9);
float CacadeShadowPCF(float3 pos)
{
    // Transform the world position to shadow space
	float4 posShadowSpace = mul(float4(pos, 1.0), gshadow_viewproj);

	// Transform the shadow space position into each cascade position
	float4 posCascadeSpaceX = (cascade_offset_x + posShadowSpace.xxxx) * cascade_scale;
	float4 posCascadeSpaceY = (cascade_offset_y + posShadowSpace.yyyy) * cascade_scale;
    
	// Check which cascade we are in
	float4 inCascadeX = abs(posCascadeSpaceX) <= 1.0;
	float4 inCascadeY = abs(posCascadeSpaceY) <= 1.0;
	float4 inCascade = inCascadeX * inCascadeY;
    
	// Prepare a mask for the highest quality cascade the position is in
	float4 bestCascadeMask = inCascade;
	bestCascadeMask.yzw = (1.0 - bestCascadeMask.x) * bestCascadeMask.yzw; // mask0 이 true 면 나머지는 0이 됨
	bestCascadeMask.zw = (1.0 - bestCascadeMask.y) * bestCascadeMask.zw;
	bestCascadeMask.w = (1.0 - bestCascadeMask.z) * bestCascadeMask.w;
	float bestCascade = dot(bestCascadeMask, float4(0.0, 1.0, 2.0, 3.0));

	// Pick the position in the selected cascade
	float3 uvd;
	uvd.x = dot(posCascadeSpaceX, bestCascadeMask);
	uvd.y = dot(posCascadeSpaceY, bestCascadeMask);
	uvd.z = posShadowSpace.z;
	uvd.xy = pack_uv(uvd.xy);
    
	// Compute the hardware PCF value
	float shadow = 0;
    [unroll]
	for (int i = 0; i < 8; i++) // poisson sampling
	{
		float comp = _shadowCascadeMap.SampleCmpLevelZero(samp_pcf, float3(uvd.xy + poisson_disk16[i] * 0.002 * uvd.z, bestCascade), uvd.z);
#ifdef REVERSE_Z
		shadow += (1-comp) * 0.125f;
#else
        shadow += comp * 0.125f;
#endif
	}

	// set the shadow to one (fully lit) for positions with no cascade coverage
	shadow = saturate(shadow + 1.0 - any(bestCascadeMask));

	return shadow;
}

{% endhighlight %}

위 코드는 부드러운 가장자리를 위해 PCSS 를 약간 섞었다.

</details>


## 참고자료

도론 파인스타인, 고급 셰이더 언어와 Direct 11 로 구현하는 3D 렌더링

[MSDN. Common Techniques to Improve Shadow Depth Maps](https://learn.microsoft.com/ko-kr/windows/win32/dxtecharts/common-techniques-to-improve-shadow-depth-maps?redirectedfrom=MSDN)