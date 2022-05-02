---
excerpt: "Style Override 에서 헷갈렸던 부분"
tag: [WPF, Avalon]
use_math: true
---

## Generic.Xaml

wpf 에는 기본적으로 ```Theme/Generic.xaml``` 이 적용이 된다고 했다. 그런데 적용이 안되서 이것저것 실행해보니 우선 [SO](https://stackoverflow.com/questions/11149167/styles-from-generic-xaml-are-not-applied) 의 조건을 만족해야하고, 무엇보다도 기본 Control 은 적용대상이 아니었다. ( Custom Control 에만 적용이 된다.) Custom Control 용의 어셈블리에서는 App.xml 을 쓸 수 없으므로, ```Generic.xaml``` 혹은 해당 설정에 맞는 Xaml 파일을 자동으로 적용한다고 생각하면 합당한 것 같기도 하다.

## ResourceDictionary

```BaseOn``` 으로 보통 기존 스타일에 추가 및 수정을 한다. 그런데 다음처럼 되어있으면 어떻게 될까? 단 ```"/DockEx2;component/Themes/generic.xaml"``` 에는 ```Button``` 에 대해 기본 스타일(```key```를 정의 안했다는 말)을 정의하고 있다.

{% highlight xml %}
    <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <ResourceDictionary Source="/DockEx2;component/Themes/generic.xaml"/>
                <ResourceDictionary>
                    <Style TargetType="Button" BasedOn="{StaticResource {x:Type Button}}">
        				<Setter Property="Width" Value="333"/>
    				</Style>
                </ResourceDictionary>
        </ResourceDictionary>
{% endhighlight %}

 위의 방법으로는 같은 ResourceDictionary 내에 같은 ```key``` 를 가진 스타일이 중복되어서 하나만 적용되거나 둘다 적용되지 않는다. 만약 ```generic.xaml``` 에서의 스타일을 받아와서 ```width``` 만 변경하고 싶었다면 위의 방법으로 하면 안된다. 대신 따로 ```Dictionary``` 를 파서 거기에 구현을 해야한다. 예를 들어 ```mybutton.xaml``` 에 구현을 해서 다음처럼 합치면 된다.
 
 {% highlight xml %}
    <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <ResourceDictionary Source="/DockEx2;component/Themes/generic.xaml"/>
                <ResourceDictionary Source="/DockEx2;component/Themes/mybutton.xaml"/>
        </ResourceDictionary>
{% endhighlight %}
