---
excerpt: "Curve Tip"
tag: [UE4]
---

## GamePlay Debugger

### 설명

Gameplay 중에 ```'``` 를 누르면 뜨는 Gameplay Debugger 를 편집하는 법

### 구현

{% highlight c++ %}

// .h
class EX_API FCustomDebugger : public FGameplayDebuggerCategory
{
public:
	FCustomDebugger();
	~FCustomDebugger();

public:
	virtual void CollectData(APlayerController* OwnerPC, AActor* DebugActor) override;
	virtual void DrawData(APlayerController* OwnerPC, FGameplayDebuggerCanvasContext& CanvasContext) override;
	
private:
	FCanvasLineItem item_line;
	FCanvasNGonItem item_ngon = FCanvasNGonItem(FVector2D(), FVector2D(5, 5), 15, FLinearColor::Red);
	FVector2D res_scale;
}

{% endhighlight %}

{% highlight c++ %}

// .cpp
FLevelSplineDebugger::FLevelSplineDebugger()
{
	bShowOnlyWithDebugActor = false; // 선택된 Actor 가 있어야지만 킬 것인가
	item_line.LineThickness = 5;
	item_line.SetColor(FLinearColor::Green);
}

FLevelSplineDebugger::~FLevelSplineDebugger()
{
}

void FLevelSplineDebugger::CollectData(APlayerController* OwnerPC, AActor* DebugActor)
{
	FGameplayDebuggerCategory::CollectData(OwnerPC, DebugActor);

	if (!OwnerPC) return;
	ACharacter* character = OwnerPC->GetCharacter();
	if (!character) return;
	UCameraComponent* camera = Cast<UCameraComponent>(character->GetComponentByClass(UCameraComponent::StaticClass()));
	if(!camera) return;
	
	// Viewport may be has a different resolution;
	res_scale = FLevelSplineHelpers::GetGameViewportSize() / FLevelSplineHelpers::GetGameResolution();
	
	FVector2D cha_loc_cs, cam_loc_cs;
	OwnerPC->ProjectWorldLocationToScreen(character->GetActorLocation(), cha_loc_cs);
	OwnerPC->ProjectWorldLocationToScreen(camera->GetComponentLocation(), cam_loc_cs);
	
	cha_loc_cs *= res_scale;
	cam_loc_cs *= res_scale;
	
	item_line.Origin = FVector(cam_loc_cs.X, cam_loc_cs.Y, 0);
	item_line.SetEndPos(cha_loc_cs);
	item_ngon.SetupPosition(cha_loc_cs, FVector2D(10, 10));
}

void FLevelSplineDebugger::DrawData(APlayerController* OwnerPC, FGameplayDebuggerCanvasContext& CanvasContext)
{
	FGameplayDebuggerCategory::DrawData(OwnerPC, CanvasContext);

	CanvasContext.Printf(FColor(0, 255, 0), L"%f", 3.14f);
	
	CanvasContext.DrawItem(item_line, item_line.Origin.X, item_line.Origin.Y);
	CanvasContext.DrawItem(item_ngon, 0, 0);
}
{% endhighlight %}


### 설명

위 예제는 카메라 위치에서 Player 의 위치까지 선을 긋고, Player 위치에 원을 그리는 예제임.

오버로드 된 두 함수는 틱마다 호출이 되며 한쪽에선 데이터를 저장하고 다른쪽에선 렌더링을 하면 됨.
+ 추측인데 두 함수는 호출되는 스레드가 달라며 렌더링쪽에는 최대한 부하를 줄이는게 맞음

주의사항은 World->Screen 변환 시 StandAlone 이 아니라 Viewport 에서 렌더링 되는 경우 좌표가 안맞는다는 것임.
+ 이는 Viewport 해상도에 맞도록 좌표를 변환시켜줘야함.
+ [해상도 얻는법](https://answers.unrealengine.com/questions/94342/how-to-get-current-screen-sizeresolution.html)
+ ViewportRes / GameRes 하면 됨

Line 의 경우 ```DrawItem``` 의 두번째, 세번째 인자가 시작 위치가 되는게 특이점
+ ```0, 0``` 넣으면 좌상단부터 선이 그려짐

### 적용

Project Settings -> Gameplay Debugger 에서 세팅가능
+ Override Slot Idx 로 몇번에 쓸지 변경가능