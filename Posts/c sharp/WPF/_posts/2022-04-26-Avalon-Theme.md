---
excerpt: "Avalon Theme 적용법"
tag: [WPF, Avalon]
use_math: true
---
## Avalon Theme 적용

[AvalonDock](https://github.com/Dirkster99/AvalonDock) 에서 Theme 적용하는 방법은 간단하다. 

```DockingManager``` 의 ```Theme``` 에 해당하는 클래스를 다음처럼 집어 넣으면 된다.

{% highlight xml %}
<dock:DockingManager>
    <dock:DockingManager.Theme>
        <dtheme:Vs2013DarkTheme/>
    </dock:DockingManager.Theme>
</dock:DockingManager>
{% endhighlight %}

이러한 방법은 특정 컨트롤만 적용시키는 방식이다. 만약 Theme 을 전역적으로 처리하고 싶으면 어떻게 할까? ```Theme``` 이 작동하는 방식은 ```BlueTheme.xaml``` 같은 특정 Xaml 파일을 컨트롤에 적용시키는 것이다. 그러한 파일을 까보면 다음과 같다.

{% highlight c++ %}
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation">
	<ResourceDictionary.MergedDictionaries>
		<ResourceDictionary Source="/AvalonDock.Themes.VS2013;component/BlueBrushs.xaml" />
		<ResourceDictionary Source="/AvalonDock.Themes.VS2013;component/Themes/Generic.xaml" />
	</ResourceDictionary.MergedDictionaries>
</ResourceDictionary>
{% endhighlight %}

그래서 위 파일을 자기 자신의 ```App.xaml``` 에 합치면 전역적으로 적용이 된다.

이때 ```DockingManager``` 의 스타일을 오버로드 할 때 주의점이 있다. ```Generic.xaml``` 안에 ```DockingManager``` 에 대한 기본 스타일이 있기 때문에 한 Xaml 내에서 ```DockingManager``` 의 스타일도 작성하고 Theme 관련 Xaml 도 합치면 안된다.  ```App.xaml``` 에 Theme 관련된 Xaml 을 합치고 다른 Xaml 에서 ```DockingManager```의 스타일을 작성 후 합치는 식으로 해야한다.