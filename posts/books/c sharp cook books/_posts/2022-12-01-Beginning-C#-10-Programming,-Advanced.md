---
excerpt: "시작하세요 C# 10.0 프로그래밍 보고 정리중"
tag: [c sharp]
use_math: true
---

## Memory

### Garbage Collector

GC 의 기능 중에 하나는 메모리를 정리해서 Fragmentation 을 막는 것이 있다. 이를 효율적으로 하기위해 Genration 을 나누어 GC 빈도를 달리한다.
+ 처음 ```new``` 로 생성된 객체는 Generation 0 이고 ```GC.Collect()``` 에서 살아남으면 최대 Genration 2 까지 변한다. 이는```GC.GetGeneration(obj)``` 함수를 통해 확인할 수 있다.
+ 메모리가 큰 객체는 LOH(Large Object Heap) 에 저장되어 GC 에도 메모리 주소를 유지시킨다. 또한 처음부터 Generation 2 가 된다. 그래서 Fragmentation 을 주의해야한다.

Memory 가 아닌 Resource 의 경우 할당 해제 시점이 중요한 경우가 많아 ```IDisposable``` 인터페이스를 이용해 명시적으로 해제한다. 보통 ```try``` 에서 자원을 획득하고 예외를 대비해 ```finally``` 에 ```Dispose()``` 를 호출하거나, 내부적으로 같은 역할인 ```using``` 문을 사용한다.

### Finalizer

Finalizer 가 정의된 클래스의 객체는 GC 과정이 복잡하다.
+ Managed Heap 에 들어갈 때 Finalizer Queue 에도 등록된다.
+ 만약 객체가 더이상 참조되지 않는다면 Finalizer Queue 의 참조 때문에 살아남고, Finalizer Queue 에서 Freechable Queue 로 옮겨간다. 
+ Freechable Queue 에 항목이 들어올 때마다 호출되는 스레드가 Finalizer 를 호출하고 Queue 를 비운다. 
+ 더이상 참조되지 않으므로 메모리가 정리된다.

그래서 대부분 정의하지 않으며, 보통 ```Dispose()``` 를 넣어서 방어적인 코드를 넣는 정도이다. 그런경우 ```Dispose()``` 함수를 호출 할 때 ```GC.SuppressFinalize(this)``` 같은 코드를 넣어 Finalizer Queue 에서 명시적으로 객체를 제거해 GC 과부화를 막는다. 이런 코드 패턴은 다음과 같다.

{% highlight c# %}

void Dispose(bool disposing)
{
    if(_disposed == false) 
    {
        // Release Resource
        _disposed = true;
    }

    // Finalizer 에서 호출 시 disposing 은 true, 
    // 명시적으로 Dispose() 호출한 경우 disposing 은 false
    if(disposing == false)
    {
        GC.SuppressFinalize(this);
    }
}

{% endhighlight %}

