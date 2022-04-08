---
excerpt: "Mouse Capture 가 Menu 에서 어떻게 작동하고, 대체할 수 있는 방법은?"
tag: [wpf]
use_math: true
published: false
---

## 기본적 특징

```MenuItem``` which has subitems capture its parent only if it is ```Menu```. ```OnMouseLeftButtonDown``` of ```MenuItem``` makes ```Popup``` inside it open making ```Menu``` captured.

그래서 캡쳐 중에는 다른 컨트롤과 상호작용을 못하는데 이를 어떻게 해결해야할 지 모르겠음.
