---
excerpt: "Ioc Container 를 통한 DI 로 IDisposable 을 생성할 경우 주의할 점"
tag: [DI, c sharp]
use_math: true
---

## DI 와 IDisposable

Dependency Injection 을 수행하는 Ioc Container 는 ```IDisposable``` 을 상속받은 객체를 생성하는 경우 그 객체의 생성과 소멸을 관리한다. 이 작업은 Ioc Container Interface 이기도 한 Scope 생성을 통해서 이루어진다.

Scope 를 만들지 않으면 프로그램이 종료 시 ```Dispose()``` 가 호출될 수도 있고 아닐 수도 있다. 예를들어 .Net 에서 제공하는 ```Microsoft.Extensions.Host``` 의 ```IHost``` 에서 ```Dispose()``` 를 호출하는 경우 관리되는 모든 객체들의 ```Dispose()``` 가 호출된다. 또는 기본 Scope 를 미리 만들어 프로그램이 종료될 때 ```Dispose()``` 를 수행할 수도 있다. 구현하기 나름이다.

__주의할 점은 Ioc Container 에서 Dispose 되지 않는 객체는 Ioc 내부적으로 참조되어 GC 되지 않는다는 것이다.__ 



## Scope 를 사용하지 않는다면?

새로운 윈도우를 만든다거나 팝업을 띄운다던가 그런 경우 다른 방법보다 Scope 를 사용하는 것이 현명할 수가 있다. 

아래는 내가 해본 삽질이다.


### Prism ```IDestructible```

Prism 의 ```IDestructible``` 은 Navigation Stack 에서 벗어날 때 ```Destroy()``` 를 호출해 ```Dispose()``` 와 유사하게 관리되는 리소스를 해제하도록 한다.[^prism]

문제는 Navigation Stack 을 직접 제어할 일이 적을 뿐더러, 단순히 DI 를 통해 ViewModel Binding 을 수행하는 경우 등에는 적용이 되지 않는다는 것이다.


### WPF ```Unloaded```

```Unloaded``` 같은 이벤트에서 직접 ```Dispose()``` 를 구독시키면 어떨까 생각할 수도 있다. 

하지만 ```TabControl``` 등에서 여러번 호출될 가능성이 있기 때문에 적절하지 못하다. ```LogicalTreeHelper.GetParent()``` 를 사용하는 경우 일부는 해결이 되지만, 해당되는 Control 이 여러 Layer 로 감싸여 있다면 적용할 수 없다.[^msforum]




## 참고자료

[SO](https://stackoverflow.com/questions/51501578/how-to-correctly-and-safely-dispose-of-singletons-instances-registered-in-the-co)

[^prism]: [PrismLibrary](https://prismlibrary.com/docs/xamarin-forms/creating-your-first-prism-app.html)

[^msforum]: [MSForum](https://social.msdn.microsoft.com/Forums/vstudio/en-US/529350a0-400e-4366-8a20-8245d0faf377/unloaded-event-firing-on-a-usercontrol-when-it-shouldnt?forum=wpf)