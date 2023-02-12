---
excerpt: "HwndHost 를 사용하면 WpfVisualTreeService 에서 자꾸 참조하는데 왜 계속 참조를 하는걸까..."
tag: [wpf]
use_math: true
---

## HwndHost 와 WpfVisualTreeService

내가 쓰는 라이브러리가 
[HwndHost](https://learn.microsoft.com/ko-kr/dotnet/desktop/wpf/advanced/hosting-win32-content-in-wpf?view=netframeworkdesktop-4.8)
를 사용해서 기존 Wpf Control 밑에 넣는 작업을 수행한다. 

문제는 VS 의 디버깅 모드에서 ```Microsoft.VisualStudio.DesignTools.WpfTap.WpfVisualTreeService``` 관련 클래스가 이 객체에 참조를 걸어놓는다는 것이다. ```HwndHost``` 의  ```DestroyWindowCore()``` 가 호출이 되도 이 꼴인 것을 보면 VisualStudio 잘못인거 같은데 관련 이슈를 이것[^dev] 말곤 찾기가 힘들었다.

대체 뭐가 잘못인걸까...




## 참고자료

[^dev]: [DevExpress 의 사례](https://supportcenter.devexpress.com/ticket/details/t744248/memory-is-not-released-after-closing-a-panel)