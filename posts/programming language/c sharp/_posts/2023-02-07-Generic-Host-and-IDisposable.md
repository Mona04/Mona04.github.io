---
excerpt: "Generic Host 에서 DI 를 이용해 IDisposable 을 생성할 경우 주의할 점"
tag: [c sharp]
use_math: true
---

## DI 와 IDisposable

적어도 .Net 에서 제공하는 ```Microsoft.Extensions.DependencyInjection``` 은 ```IDisposable``` 의 생성과 소멸을 관리한다. 

다시말해 ```IHost``` 에서 ```Dispose()``` 를 호출하는 경우 관리되는 모든 객체들의 ```Dispose()``` 가 호출된다. 그리고 그 전에는 __내부적으로 참조를 유지하여 관리되는 객체의 GC 를 막는다.__


간과하기 쉬운 것은 ```IServiceCollection.AddTransient()``` 으로 생성해도 IOC Container 가 관리하게 된다는 것이다.  반면 ```IServiceCollection.AddScope()``` 으로 등록되어 생성된 객체는 Scope 에서 벗어날 경우 ```Dispose()``` 가 호출이 된다.



## 참고자료

[SO](https://stackoverflow.com/questions/51501578/how-to-correctly-and-safely-dispose-of-singletons-instances-registered-in-the-co)
