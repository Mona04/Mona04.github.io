---
excerpt: "WPF 의 Dependency Property 에서 주의해야할 점들"
tag: [wpf]
use_math: true
---

## Reference Type

[SO](https://stackoverflow.com/questions/5850859/how-to-set-default-value-of-dependencyproperty-of-a-type-derived-from-dependency) 에도 나와있듯이 참조 타입으로 Dependency Property 를 만들면 공유가 된다. 그러므로 Dependency Property 를 생성할 때 기본값으로 ```null``` 을 사용하고, 초기값이 필요하다면 생성자에서 할당하면 된다. 