---
excerpt: "simple non-tracking reference cannot be bound to an entity on the managed heap. 관련"
tag: [c++, cli]
use_math: true
---

## Tracking / Non Tracking Reference

Non-Tracing Reference 는 주기적인 GC 에서 참조 추적이 되지 않는 참조를 말하며, Managed Cpp 에서 사용하는 ```%``` 가 아닌 Unmanaged Cpp 의 ```&``` 가 해당된다.

Tracking Reference 는 ```%``` 가 해당된다.

### 에러 1

{% highlight cpp %}

ref struct AAA
{
    System::String^ path;
};

void SomeFunc()
{
    AAA a;
    System::String^ const& k = a->path; // Error 발생
    marshal_as<std::wstring>(a->path);  // 파라미터가 System::String^ const& 므로 에러발생

    System::String^ b;
    System::String^ const& k = b->path; // Error 없음
}

{% endhighlight %}

위와 같이 Managed Entity 의 Member 등에 Non Tracking Reference 를 시도하면 생기는 에러이다. 

Managed Entity 의 멤버는 Managed Memory 공간에 있으므로, 여기에 대한 Simple Reference 를 허용하게 되면 GC 등에 의한 Dangling Pointer 참조같은 이상한 일이 발생하게 된다. 그래서 이를 막는 것이다.

비슷한 예로 Managed Entity 에 대해서 ```&``` 를 허용하지 않는 것이 있다. 

참고로 위의 ```b``` 같은 경우는  ```^``` 가 포인터이므로 ```*b``` 가 Managed Memory 에 있고 ```b``` 는 스택 공간에 존재한다. 그래서 에러를 발생시키지 않는다. 