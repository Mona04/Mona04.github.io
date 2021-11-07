---
excerpt: "복붙용 코드"
categories: Math
tag: []
use_math: true
---
## Root Fiind Algorithms

### 가능한 알고리즘

[참고](https://ko.wikiqube.net/wiki/Root-finding_algorithms)

### Durand-Kerner Method

[위키](https://en.wikipedia.org/wiki/Durand%E2%80%93Kerner_method)

적당히 가까운 값이면 10~20 내외로 값이 나옴

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


