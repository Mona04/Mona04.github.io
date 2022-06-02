---
excerpt: "Matrix Decomposition 기법들 배운대로 추가"
categories: Math
tag: [Math for Graphics]
use_math: true
---

## [LU Decompostion](https://en.wikipedia.org/wiki/LU_decomposition#Code_examples)

```mxm``` 크기의 Lower Triangle Matrix $$L$$ 과 ```m x n``` 크기의 echelon form matrix $$U$$ 로 행렬을 분해한다. 이렇게 분해한 행렬을 사용하면 더 빨리 계산하고 메모리도 적게 사용할 수 있어 컴퓨터에서 자주 쓰인다. 예를들어 $$Ax = b$$ 라는 식에서 $$x$$ 를 구하기 위해  $$A^{-1}$$ 를 구하거나, $$Ax = y$$ 를 통채로 Row Reduction 을 하는 것보다, $$Uy = b$$, $$Ux = y$$ 의 두단계의 Row Reduction 을 거쳐서 계산하면 연산량이 상당히 줄어든다. 

자세한건 내가 본 책의 챕터를 정리한 [블로그](https://deep-learning-study.tistory.com/311) 를 참고하자. 


## Polar Decomposition

