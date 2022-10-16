---
excerpt: "Material Parameter Editor using WPF"
header:
  teaser: https://img.youtube.com/vi/MRHyCOg8RrI/0.jpg
tags: [WPF, DirectX]

use_math: true
---

## Description

<iframe width="560" height="315" src="https://www.youtube.com/embed/MRHyCOg8RrI" frameborder="0" allowfullscreen></iframe>

<br/>

DirectX Porfolio 용으로 제작한 WPF Editor 입니다.

Native C++ 로 작성된 게임로직을 Cpp/Cli Wrapper 로 연결하였습니다.

### Control

대부분 기본 Control 을 변형해서 사용했고, [TimeLine](https://mona04.github.io/posts/c%20sharp/wpf/Timelines/) Control 을 직접 제작했습니다.


### Module

```System.Windows.Media.Imaging.BitmapImage``` 가 기본적으로 지원하지 않는 Tga, DDS 이미지를 ```BitmapImage``` 형태로 로딩하는 간단한 모듈을 제작했습니다.

Nuget Module
+ [AvalonDock](https://github.com/Dirkster99/AvalonDock)
  + [처음으로 이슈 보낸게 커밋 받아서 자랑](https://github.com/Dirkster99/AvalonDock/issues/344)
+ ```Xceed.Wpf.Toolkit```
+ ```Microsoft.Wpf.Interop.DirectX-x64```
+ ```Microsoft.Xaml.Behaviors.Wpf```
+ ```Newtonsoft.Json```
