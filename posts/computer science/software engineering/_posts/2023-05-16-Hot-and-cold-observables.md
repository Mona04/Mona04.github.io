---
excerpt: "MSTest 에서 c++ dll 같은 외부 dll 을 사용할 때 IOFileNotFoundException 이 뜨는 경우 해결"
tag: [unit test]
use_math: true
---

## 원인

{% highlight c# %}

    static void Main(string[] args)
    {
        var o1 = Observable.Create<int>(observer => {
            int cnt = 0;
            while(cnt < 100)
            {
                Thread.Sleep(1000);
                Console.WriteLine("Produce Data " + cnt);
                observer.OnNext(cnt++);
            }
            observer.OnCompleted();
            return Disposable.Create(() => { });
        });
        var connectable = o1.SubscribeOn(new EventLoopScheduler()).Publish();
        //connectable.Connect();        
        Thread.Sleep(3000);
        //connectable.Subscribe(v => { Console.WriteLine(v); });
        o1.Subscribe(v => { Console.WriteLine(v); });
        Thread.Sleep(10000);
    }

{% endhighlight %}

https://stackoverflow.com/questions/2521277/what-are-the-hot-and-cold-observables