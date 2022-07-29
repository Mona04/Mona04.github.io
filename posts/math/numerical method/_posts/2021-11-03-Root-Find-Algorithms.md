---
excerpt: "변수가 하나인 n차 다항식의 해를 구하는 방법"
tag: []
use_math: true
---
## Root Find Algorithms

### 가능한 알고리즘

[참고](https://ko.wikiqube.net/wiki/Root-finding_algorithms)

### Durand-Kerner Method

[위키](https://en.wikipedia.org/wiki/Durand%E2%80%93Kerner_method)

방법은 [Newton's Method](https://en.wikipedia.org/wiki/Newton%27s_method) 의 연장으로, 다항식의 계수를 업데이트 하는 방법임
+ 위키에 있는걸 간략하게만 정리하면
+ 다항식 $$F(X)$$ 가 주어질 때, $$ G_Z(X) = (x_1 - z_1)(x_2 - z_2)...(x_n - z_n) $$ 를 만듦
+ $$ F(X) = G_Z(X) $$ 가 만족하려면 X 에 대한 계수가 서로 같아야함.
+ 이는 임의의 $$ Z = z_1 ... z_n $$ 에 대해 $$ W = w_1 ... w_n $$ 가 있어서 $$ F(X) = G_{Z+W}(X) $$ 를 만족하는 $$W$$ 를 안다면 등식을 만들 수 있음.
+ 그리고 위 식은 n차원 에 대한 Newton's Method 를 이용해서 Increment Equaltion 으로 해결할 수 있음. 
    + Z 에 대한 탄젠트 직선을 구하면 다음과 같음.
	+ $$\begin{multline} 
	  F(X) = \sum_{k=1}^{k=n}\left(\frac{\delta G_Z(X)}{\delta z_k}*(X - z_k)\right) + G_Z(X)    \\  \shoveleft
	 	   = \sum_{k=1}^{k=n}\left(\frac{\delta G_Z(X)}{\delta z_k}*w_k\right) + G_Z(X)
      \end{multline}$$
    + $$\begin{multline} \\  \shoveleft
		F(X) - G_Z(X) 
		= F(X) -  \prod_{j=1}^{j=n} ( X - z_j ) \\  \shoveleft
		= \sum_{k=1}^{k=n} w_k \frac{\delta G_Z(X)}{\delta z_k}
		= -\sum_{k=1}^{k=n} w_k \prod_{j!=k} ( X - z_j )                    	\end{multline}$$
+ 위 식에서 $$ X = z_k $$ 일 때  $$ F(z_k) - 0  = w_k G_Z'(z_k)  = -w_k \prod_{j!=k} ( X - z_j )$$
+ 곧 $$ w_k = - \frac{ F(z_k) } {G_Z'(z_k)} = -\frac{ F(z_k) } { \prod_{j!=k} ( z_k - z_j ) }  $$

모든경우에 수렴하지 않으며, 주기적으로 근사하는 경우가 있을 수 있음.
+ 초기값에 따라 달라지지만 보통 10~20 반복으로 e-6 정도의 오차의 해를 얻을 순 있음.
+ 초기값과 해의 차이를 w 라고 하면 O(w^2) 의 복잡도를 가짐.

방법 상 복소수를 써야하고, 값 업데이트는 한번에 처리해야함.

#### 코드

[코드 참고](https://blog.naver.com/PostView.nhn?blogId=kmc7468&logNo=221738443587&parentCategoryNo=&categoryNo=413&viewDate=&isShowPopularPosts=true&from=search)

{% highlight c++ %}
// Polynomial.h
class Polynomial final
{
	using complex = std::complex<double>;
public:
	Polynomial(const TArray<double>& coefs);
	int32 DurandKerner(TArray<double>& out, uint32 max_iter = 120, double precision = 0.001);
	complex PlugIn(complex x) const noexcept;
	int32 GetDegree() const;
	
private:
	TArray<double> coefficients;
};
{% endhighlight %}

{% highlight c++ %}
// Polynomial.cpp

#include "Util_Polynomial.h"

Polynomial::Polynomial(const TArray<double>& coefs) : coefficients(coefs)
{
}

int32 Polynomial::GetDegree() const
{
	for (int32 i = coefficients.Num() - 1; i >= 0; i--)
		if (coefficients[i] != 0) return i;
	return 0;
}

// 값을 대입해서 결과값 얻어내는거
Polynomial::complex Polynomial::PlugIn(Polynomial::complex x) const noexcept
{
	complex result = coefficients[0];
	for (int i = 1; i <= GetDegree(); ++i)
		result += std::pow(x, i) * coefficients[i];
	return result;
}

int32 Polynomial::DurandKerner(TArray<double>& out, uint32 max_iter,double precision)
{
	const int32 degree = GetDegree();

	if (coefficients[degree] != 1.0) {
		for (auto& coef : coefficients)
			coef /= coefficients[degree];
	}
	
	TArray<complex> result, resultTemp;
	for (int32 i = 0; i < degree; ++i)
		result.Add(std::pow(complex(0.1, 0.2), i + 1));
	resultTemp = result;
	
	uint32 loop_count = 0;
	bool loop = true;
	while (loop && loop_count < max_iter) {
		loop = false;
		for (int32 j = 0; j < degree; ++j) {
			complex d = 1;
			for (int32 k = 0; k < degree; ++k) {
				if (j == k) continue;
				d *= result[j] - result[k];
			}
			d = result[j] - PlugIn(result[j]) / d;
	
			if (std::abs(d - result[j]) > precision)
				loop |= true;
	
			resultTemp[j] = d;
		}
	
		result = resultTemp;
		loop_count++;
	}
	
	const int32 digit = static_cast<int32>(-std::log10(precision));
	for (int32 i = 0; i < degree; ++i) {
		result[i].real(std::floor(result[i].real() * std::pow(10, digit) + 0.5) / std::pow(10, digit));
		result[i].imag(std::floor(result[i].imag() * std::pow(10, digit) + 0.5) / std::pow(10, digit));
	}
	
	out.Empty();
	for (const auto r : result)
		if(FMath::IsNearlyZero(r.imag()))
			out.Add(r.real());
	
	return loop_count;
}
{% endhighlight %}

