---
excerpt: "c++로 개발하는 언리얼엔진4 ch06, 07 요약 및 정리"
tag: [UE4, Vistual Studio]
---

## Mapping

{% highlight c++ %}
UPlayerInput::AddEngineDefinedAxisMapping(FInputAxisKeyMapping("MoveRight", EKeys::Left));
UPlayerInput::AddEngineDefinedAxisMapping(FInputAxisKeyMapping("MoveUp", EKeys::Up));
UPlayerInput::AddEngineDefinedActionMapping(FInputActionKeyMapping("LeftClick", EKeys::RightMouseButton));
{% endhighlight %}

프로젝트 설정에서도 할 수 있고 코드로는 ```UPlayerInput``` 을 들고와서 함.

매핑을 위해서```PlayerController``` 에서  ```UPlayerInput``` 를 들고와서 개개별로 매핑할 수 있고,  전역함수로 있는 ```Engine``` 붙은 함수를 바로 쓸 수도 있음.

## Interface

[언리얼 위키](https://unreal.gg-labs.com/wiki-archives/macros-and-data-types/interfaces-in-c++)

### 2등분

Interface 의 Interface 상속시 각각 처리해줘야함.

+ UInterface
	+ UHT 로 리플렉션 정보와 Blueprint 와의 연결코드 등이 채워짐
	+ 그러니 손댈 일은 거의 없음
+ IInterface
	+ Cpp 내의 Class 에 상속을 넣을 때 이걸 넣음.
	+ 실질적인 구현부분인  IInterface 로 나뉨
	+ Blueprint 에 노출하기위해선 ```UFUNCTION``` 을 넣으면 됨.
	+ 기본적으로 virtual 안넣거나 BlueprintImplementableEvent 또는 BlueprintNativeEvent 가 아닌 함수는 UE 에서 지원을 안하며 컴파일 에러남

### BP 노출

+ Blueprint 에서 구현하고 싶을 시
	+ BlueprintImplementableEvent 나 BlueprintNativeEvent 로 virtual 빼고 넣어주면 됨. 
+ Blueprint 에서 호출하고 싶을 시
	+ __BlueprintCallable 을 위의 옵션 두개 중 하나랑 같이__ 넣어줘야함.
	+ BlueprintCallable 단독으로만은 use cannot implement blueprint in interface" 라고 뜨는데 뭔지 모르겠음.
+ Interface 는 BlueprintPureFunction 이 적용 안됨
+ __return value 가 없으면__ Event Graph 에서 처리가 되고, 있으면 Function 으로 인식함. ( 둘다 Override 는 가능 )

### 주의사항

+ 호출 시
	+ cpp 내에선 컴파일 시간에서 Blueprint 내의 함수를 알 수가 없음. 
	+ 따라서 __Blueprint 에서 적용된 함수를 사용하고 싶으면 ```Execute_``` Prefix 가 있는 스택틱 함수를 호출해야함__ .
	+ 이때 인자로 사용할 객체의 포인터를 받는데, ```this``` 등이 들어가면 됨.

+ 상속 확인 시
	+ 단순히 ```Cast``` 해도 cpp 기반은 확인 가능함. 
	+ BP 로 구현된 Interface 의 경우 아래와 같이 함.
	+ ```if(iter->GetClass()->ImplementsInterface(UEX_Interface::StaticClass()))```



### 순수가상함수

Interface 에서는 native cpp 의 순수가상함수를 쓸 수 있음.

하지만 ```UCLASS``` 인 클래스에서는 그렇지 못하고 편법이 존재함.

```
virtual void Begin_Equip() PURE_VIRTUAL(ACWeapon::Begin_Equip,);
```

pure 함수는 위처럼 하거나 ```unimplemented();``` 를 넣어주면 ```debug assert``` 등으로 구현되지 않은 클래스에 대해 컴파일 에러를 낼 수 있음.


## TActorIterator

{% highlight c++ %}
int counter = 0;
for (TActorIterator<AActor> iter(GetWorld()); !!iter; ++iter)
	counter++;
PFCPP::Log(FString::Printf(L"IEx_Interface Num is %d", counter));
{% endhighlight %}

끝부분에 가면 알아서 ```nullptr``` 이 되므로 ```end``` 랑 비교 안하고 널확인만 하면 됨.

```AActor``` 이하만 들고 올 수 있어서 Interface 같은거만 처리는 못함.