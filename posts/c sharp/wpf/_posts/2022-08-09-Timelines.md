---
excerpt: "WPF 에 Timeline 을 추가하면서 쓰는 메모"
tag: [c++, c#]
use_math: true
---

## Timeline

Scrollable Timeline Control 이 필요해 오픈소스를 뒤저보았다.

그러다 발견한 것이 몇개 있다.
+ [MillerMark's Git](https://github.com/MillerMark/TimeLine)
  + 간단한데, Item 하나당 한줄이 배당되는 단점이 있다.
+ [Codeplex 에 있던거 내려가서 카피해 보관중인 것](https://github.com/ido-ran/WpfTimelineControl)
  + 코드가 복잡하고 그래프 표현이라는 복잡한 동작도 들어가서 머리가 아프다.
+ [DannyStaten's Codeproject](https://www.codeproject.com/Articles/240411/WPF-Timeline-Control-Part-I)
  + ```DateTime``` 이 기준이라 경우에 따라 소스 수정이 불가피하다.
  + Drag & Drop 기능이 구현되어 있다.
  + 잡버그가 많다. (Sibling Sync 관련)
  + Timeline 이 길어지면 ```Grid``` 에 ```Line``` 을 엄청 넣게되는 구조라서 유의가 필요하다.


나는 DannyStaten's 의 소스를 변경하는 방침을 취했다. 왜냐면 우선 소스가 비교적 간단하고 내게 필요한 기능이 갖춰져 있어 스켈레톤 코드로는 괜찮았기 때문이다. 

여러 라인을 한번에 처리하도록 하고, 여러 추가 기능을 넣어서 [깃허브](https://github.com/Mona04/WPF-Timelines)에 저장했다.

아래는 수정 결과이다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Lpcw5k8PHvI" frameborder="0" allowfullscreen></iframe>