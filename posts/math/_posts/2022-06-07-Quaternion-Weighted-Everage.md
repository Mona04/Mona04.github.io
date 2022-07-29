---
excerpt: "쿼터니언의 가중평균에 대한 정리"
tag: [Quaternion]
use_math: true
---

## 배경

Skinned Animation 에서 각 정점은 Bone 에 대한 Weight 를 가진다. 보통 최대 4~8개로 잡는데, 이걸 쉐이더에 넘겨서 계산하려면 각 Weight 를 이용한 가중평균을 해야한다. Matrix 를 사용하는 경우 간략히는 선형으로 가중평균을 내어버리는데, 행렬에서 가중평균은 때때로 상당한 오차를 야기한다. 이는 행렬에서 회전파트의 Row 와 Col 들이 모두 수직임을 보장하지 않기 때문이며, 보통 이상한 Scaling 의 결과를 낳는다. 이 문제를 해결하기 위한 방법으로는 SRT 부분을 분해해서 각각 보간을 하는 것인데, Scaling 과 Translate 은 선형 가중평균을 내리면 되지만 Quaternion 은 그렇게 할 수 없다.

이에 대한 해답은 [SO](https://stackoverflow.com/questions/12374087/average-of-multiple-quaternions) 과 [SE](https://math.stackexchange.com/questions/61146/averaging-quaternions/3435296#3435296) 에서 잘 답변해주고 있다. 크게 2가지 방향의 답인데, 첫째는 비슷한 쿼터니언을 벡터로 간주해 선형보간을 해도 비슷한 회전의 경우 괜찮은 결과를 보인다는 것이다. 단, 쿼터니온 간 Dot 이 양수가 되도록 적당해 Negation 을 해줘야한다.(쿼터니온의 회전에 관해선 $$q = -q$$ 이므로). 둘째는 이 [논문](http://www.acsu.buffalo.edu/~johnc/ave_quat07.pdf) 에서 제시한 방법이다. 이는 선형대수에 관한 지식 없이는 이해하기 어렵고 약간 더 복잡하지만 더 나은 해답이다.


