---
excerpt: "Observer Pattern 관련 정리. Hot and cold observables."
tag: [design pattern]
use_math: true
---

## [Reactive Programming](https://en.wikipedia.org/wiki/Reactive_programming)



## Hot and cold observables

{% highlight c# %}

static void Main(string[] args)
{
    var connectable = Observable.Create<int>(observer => {
        int cnt = 0;
        while(cnt < 100)
        {
            Thread.Sleep(1000);
            Console.WriteLine("Produce Data : " + cnt);
            observer.OnNext(cnt++);
        }
        observer.OnCompleted();
        return Disposable.Create(() => { });
    })
        .SubscribeOn(new EventLoopScheduler())
        .Publish();
    connectable.Connect();   

    Thread.Sleep(2000);

    connectable.Subscribe(v => { Console.WriteLine("a : " + v); });
    connectable.Subscribe(v => { Console.WriteLine("b : " + v); });
    connectable.Subscribe(v => { Console.WriteLine("c : " + v); });
    
    Console.ReadLine();
}

{% endhighlight %}

위의 [```Observable.Cretae<T>```](https://learn.microsoft.com/en-us/previous-versions/dotnet/reactive-extensions/hh229114(v=vs.103)) 는 기본적으로 ```Subscribe()``` 를 할 때 인자로 받는 delegate 가 호출이 된다. 여러 Subscriber 가 있다면 위의 예시에서 기본적으로 다음과 같은 결과가 된다.

```
Produce Data 0
a : 0
Produce Data 1
a : 1

...

Produce Data 0
b : 0

...

Produce Data 0
c : 0

...
```

하지만 만약 ```Publish()``` 를 하게 된다면 다음과 같게 된다.

```
Produce Data 2
a : 3
b : 3
c : 3
Produce Data 3
a : 4
b : 4
c : 4
...
```

후자의 경우가 Hot Observable 이다.


## 참고자료

[andrestaltz, The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

[SO. what-are-the-hot-and-cold-observables](https://stackoverflow.com/questions/2521277/what-are-the-hot-and-cold-observables)