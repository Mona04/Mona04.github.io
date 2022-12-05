---
excerpt: "WPF 의 자원참조 방법인 Static/Dynamic Resource 의 특징에 대해서"
tag: [wpf]
use_math: true
---

## 기본적 특징

```StaticResource``` 와 ```DynamicResource``` 는 Resource 를 참조하는 방식이다.

전자는 대상의 주소를 컴파일 타임에 저장하고 후자는 ```Key``` 값을 이용해 Resource 를 사용할 때마다 검색해서 사용한다. 

예를들면

{% highlight xml %}
<StackPanel Orientation="Horizontal">
	<Border Background="{StaticResource SolidBrush}" Height="100" Width="100"/>
    <Border Background="{DynamicResource SolidBrush}" Height="100" Width="100"/>
</StackPanel>        
{% endhighlight %}

위처럼 되어 있을 때 

{% highlight csharp %}
Resources["SolidBrush"] = new SolidColorBrush(SystemColors.HighlightColor);     
{% endhighlight %}

위를 수행한다면 Resource 의 특정 키의 데이터가 바뀌므로 ```DynamicResource``` 로 참조하는 건 같이 변하지만, ```StaticResource``` 는 내부에 참조 값이 이미 있으므로 변하지 않는다.

{% highlight csharp %}
(Resources["SolidBrush"] as SolidColorBrush).Color = Colors.Blue;
{% endhighlight %}

덧붙여 위를 수행한다면 참조되는 Resource 내의 값이 바뀌므로  두 경우 모두 색이 바뀐다. (이는 Change 가 아니라 Modify 에 가깝다. 이를 Chage 로 표현하지 말자.)


## Storyboard 에서


### Storyboard 내의 Resource

[MSDN 의 Control Template 에서 Storyboard 제약](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/graphics-multimedia/storyboards-overview?view=netframeworkdesktop-4.8#animate-in-a-controltemplate) 을 보면 Storyboard 에서 ```DynamicResource``` 나 DataBinding 을 사용할 수 없음을 알 수 있다.

### Animate 대상인 Resource

#### ```Freezable```

```Freezable``` 과 관계가 깊어 이를 미리 알아둘 필요가 있다.  
+ [MSDN 의 Freezing 조건](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/advanced/freezable-objects-overview?view=netframeworkdesktop-4.8#freezing-a-freezable)
+ ```Freezable``` 은 ```Blush```, ```RotateTransform``` 것들에 해당이 되며 ```Freeze``` 되면 읽기 전용으로 바뀌고 ```Clone``` 기능이 활성화가 된다.
+ [MSDN 의 Indirect Targeting](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/graphics-multimedia/storyboards-overview?view=netframeworkdesktop-4.8#indirect-targeting) 을 보면 Freeze 된 Resource 는 수정할 수 없으므로 Storyboard 는 Clone 을 만들어서 Animation 을 동작시킴을 알 수 있다.
+ ```Style``` 에서 ```DynmaicResource``` 나 ```StaticResource``` 로 참조되는 Resource 는 자동으로 Freeze 된다. 
  + 단 ```x:Shared="False"``` 이면 Freeze 되지 않는다. 
  + 또한 ```ControlTemplate``` 내부에서는 ```StaticResource``` 의 경우 Freeze 되지 않는다.
  + 관련 질문([SO](https://stackoverflow.com/questions/9235428/style-setter-freezing-brush))은 찾았는데 괜찮은 답변이 없다. 최적화를 위해서 내부적으로 하는 듯하다. 

#### 테스트

[SO](https://stackoverflow.com/questions/71689409/relation-between-resource-referencing-way-and-sharing-regarding-storyboard) 의 코드 기준이다.

| 참조 방법 | ```x:Shared``` | <center>결과</center> |
|:------:|:--------:|:-------|
|```DynamicResource```|```True```| ```IsFrozen==true``` |
|```DynamicResource```|```False```|Cannot Animate `---` on an Immutable Object Instance Error|
|```StaticResource```|```True```|```IsFrozen==false```, ```CanFreeze==false``` => 모든 색이 하나가 됨|
|```StaticResource```|```False```|```IsFrozen==false```, ```CanFreeze==true```|

#### 설명

&nbsp; 위를 바탕으로 Indirect Targeting 을 이해해 볼 것이다.

&nbsp;  Animate 되는 속성 혹은 그것을 갖는 Resource 가 ```StaticResource``` 로 참조되는 경우를 생각해보자. 위에서 살펴보았듯 ```ControlTemplate``` 에서는 이 Resource 를 Freeze 시키지 않는다. 덧붙여  Resource 이면 이는 Freeze 제약조건에 따라 Freeze 될 수 없다. 이 자체는 Storyboard 의 동작과는 관계가 없다. 

&nbsp;  문제가 되는건 자원 공유이다. ```x:Shared="True"```이면 Resource 자체가 Animate 되어  이것을 참조하는 모든 대상이 영향을 받는다. 반대로 ```x:Shared="False"``` 로 복사를 강제하거나 ```o:Freeze="True"``` 로 Clone 을 만들도록 하면 정상적으로 작동된다. 혹은 해당 Xaml 코드 이전에 ```Style``` 에서 참조되어 미리 ```Freeze``` 되어 있어도 Clone 을 만들어 정상작동한다.

&nbsp; ```DynamicResource``` 로 참조하는 경우를 생각해보자. ```ControlTemplate``` 에서 참조하므로 ```Freeze``` 된다. 따라서 Storyboard 는 Resource 를 Clone 하므로 올바르게 Animate 된다. 하지만 만약 ```x:Shared="False"``` 인 Resource 를 참조하는 경우 ```Cannot Animate `---` on an Immutable Object Instance ...``` Error 가 발생한다. 강제로  ```o:Freeze="True"```를 해도 마찬가지이다. 왜 이런지는 잘 모르겠다.



#### 결론

&nbsp;  Storyboard 를 사용 시 Indirect Targeting 을 자제하거나 가능한  ```StaticResource``` 로 참조하고 자원이 복사되게 하자.

&nbsp; Direct Targeting 을 쓰면 ```TargetName``` 을 변경하는 속성과 가깝게 둘 수 있고, ```TargetProperty``` 의 길이를 짧게 사용할 수 있는 장점도 있으니 참고하자.