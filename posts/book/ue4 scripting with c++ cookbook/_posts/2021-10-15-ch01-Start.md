---
excerpt: "c++로 개발하는 언리얼엔진4 ch01 요약 및 정리. Tip 과 Test Code"
tag: [UE4, Vistual Studio]
---
## 환경

Visual Studio 19, UE4 4.26

[Test Code 파일]({% link assets/project/UE4_Cookbook_Test.zip %})

## VisualStudio Tip

### 단축키

```Ctrl + - ``` => 10줄 이내의 이전 위치로 이동 (같은 파일, 다른 파일 모두)

```Ctrl + Shift + - ``` => 10줄 이내의 이후 위취로 이동 (같은 파일, 다른 파일 모두)

```Ctrl + W ``` => 한 단어 드래그

```Ctrl + Shift + 방향키``` => 단어 단위로 드래그

```Ctrl + Alt + 방향키``` => 줄 단위로 드래그

``` Ctrl + M ``` => 블럭접기

### 스마트마우스

```Alt + 왼쪽클릭 + 드래그``` => 영역 선택 ( 줄단위 드래그랑 비슷)

```Ctrl + 왼쪽클릭 + 드래그``` => 단어 단위 선택 

### 클립보드 링

[참고사이트](https://marketplace.visualstudio.com/items?itemName=SirTobi.code-clip-ring)

최대 10개 까지 복사한걸 저장할 수 있는 스택

```Ctrl + C``` 를 여러번 하게되면 스택에 쌓이게 됨.

```Ctrl + Shift + V``` 를 하면 클립보드 리스트를 얻어서 원하는걸 선택가능.

## 경로 추가

{% highlight c++ %}
PublicIncludePaths.Add(ModuleDirectory);
PrivateIncludePaths.Add(ModuleDirectory);
{% endhighlight %}

## 추천 Extension

+ Unreal Macro Generator
	+ ```Ctrl + W``` 로 매크로 생성창, ```Ctrl + E``` 로 매크로 수정창을 띄움
+ Tomato
	+ 인텔리노센스를 개선시켜줌. 근데 비쌈. 


## UE4 Log

[위키참고](https://unrealcommunity.wiki/logging-lgpidy6i)

{% highlight c++ %}
// header
#include "Logging/LogMacros.h"
DECLARE_LOG_CATEGORY_EXTERN(MYLOG, Display, All);
{% endhighlight %}

{% highlight c++ %}
// cpp
DEFINE_LOG_CATEGORY(MYLOG);
//DEFINE_LOG_CATEGORY_STATIC(v, Display, All);

void Log()
{
	UE_LOG(MYLOG, Warning, TEXT("Hello"));
	
	FString name = "Tim";
	int32 mana = 450;
	TArray< FStringFormatArg > args;
	args.Add(FStringFormatArg(name));
	args.Add(FStringFormatArg(mana));
	FString string = FString::Format(TEXT("Name = {0} Mana = {1}"), args);
	UE_LOG(LogTemp, Warning, TEXT("Your string: %s"), *string);
}

void ScreenDebugMessage()
{
	GEngine->AddOnScreenDebugMessage(-1, 1.f, FColor::Red, TEXT("Hello"));
}

{% endhighlight %}

### UE_LOG

```Logging/LogMacros.h``` 에 있는 매크로이며, 콘솔창과 ```Saved/Logs/``` 에 있는 로그파일에 로그가 기록됨.

인자로 Category, Verbosity, Text 를 받음.



+ Text

	Text 는 ```_VA_ARGS_``` 를 받으며 유니코드 텍스트 ( ```TEXT()```) 여야함.

+ Verbosity

	```ELogVerbosity``` 로 되어 있으며 색깔, 로그여부, 종료여부의 옵션이 있음.

```
| Verbosity Level | Printed in Console? | Printed in Editor's Log? |                      Notes                       |
|-----------------|---------------------|--------------------------|--------------------------------------------------|
| Fatal           | Yes                 | N/A                      | Crashes the session, even if logging is disabled |
| Error           | Yes                 | Yes                      | Log text is coloured red                         |
| Warning         | Yes                 | Yes                      | Log text is coloured yellow                      |
| Display         | Yes                 | Yes                      | Log text is coloured grey                        |
| Log             | No                  | Yes                      | Log text is coloured grey                        |
| Verbose         | No                  | No                       |                                                  |
| VeryVerbose     | No                  | No                       |                     
```

+ Category 

1. UE4 가 지원하는 여러 카테고리

	이때 ```LogTemp``` 는 ```CoreGlobal.h``` 에 있는 임시 카테고리로 테스트 외의 목적으로 쓰지 않기를 권고함.

2. 직접 등록한 카테고리
	
	```DEFINE_LOG_CATEGORY_STATIC```

	위는 c++ 의 static 키워드랑 똑같음. cpp 에서만 등록 가능하고 거기 외에는 못씀.

	```DECLARE_LOG_CATEGORY_EXTERN, DEFINE_LOG_CATEGORY```

	위는 c++ 의 extern 키워드랑 똑같음. 여러곳에서 다 쓸 수 있음.

	이렇게 새로 만드는 경우 인자는 ```CategoryName, DefaultVerbosity, CompileTimeVerbosity``` 이렇게 셋임.

	CategoryName 은 로그시 ```CategoryName :  Text``` 하고 붙는데 이때 왼쪽문자열임.
   
    뒤에 두개는 로그 가능한 Verbosity 를 조절하는데 전자는 런타임에 후자는 컴파일타임에 조절함. 지정한 Verbosity 보다 Enum 상 숫자가 큰 것만 통과시키지 않음.

### 콘솔 팁

	Log LogName off
	Log LogName Log

위를 콘솔에 쳐서 ```LogName``` 개개별을 키고 끌 수 있음

### ScreenDebug <br/>

위 사이트에 잘 되어 있음.

key 가 중요한데 -1 이면 새 메세지가 밀려나고 자연수이면 해당 자리에서 업데이트 됨.

