---
excerpt: "Json Parser 관련"
tag: [c++, Json]
use_math: true
---

## 자료

[성능 Benchmark](https://github.com/miloyip/nativejson-benchmark)

JsonCpp 가 블로그 사이에선 유명하던데, 쓰기는 편하지만 상대적으로 꽤 느리니 주의하자.


## Binary in Json

보통 base64 encoding 을 사용한다고 한다. [Wiki](https://en.wikipedia.org/wiki/Base64), [SO-something better than base64?](https://stackoverflow.com/questions/1443158/binary-data-in-json-string-something-better-than-base64) 참고.

구현은 [base64 encoding](https://stackoverflow.com/questions/10812053/binary-data-jsoncpp) 참고. 별거없고 3byte 씩 모아서 4byte 로 나누는 작업이다.



