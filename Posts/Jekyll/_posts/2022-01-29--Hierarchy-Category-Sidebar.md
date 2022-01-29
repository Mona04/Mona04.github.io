---
excerpt: "Jerkll Heirachy Category Sidebar"
tag: [Jekyll]
use_math: true  
---

## 배경

Jerkll 는 디렉토리에 따라 Category 를 자동으로 분류함.

```/Dir1/Dir2/_posts/filename.md``` 이러면 ```categories = [Dir1, Dir2]``` 이렇게 되는 꼴임.
+ 단 마지막에 ```/_posts/``` 폴더 후에 md 파일을 넣어줘야함.

<br/>

그런데 Jerky - Minimal Mistakes Theme 은 네이버 블로그처럼 계층구조를 지원하지 않음.

너무나도 꼬우므로 커스터마이즈에 들어감.

#### 준비사항

간단한 html, css, js 검색할 능력.

[Liquid](https://jekyllrb.com/docs/liquid/) 가 중요하게 사용됨.
+ ```{\%%\}``` 에서 백스래쉬를 뺀 구문을 jekyll 가 특정 구문으로 변경해줌
+ 함수, 제어문 등을 사용할 수 있어서 매우 편리함
+ 이미 Theme 에 있는 예제나 위 문서에서 필요할 때 찾아서 쓰면 됨.


### SideBar

{% highlight html %}
...
  {\% if page.sidebar.nav %\}
    {\% include nav_list nav=page.sidebar.nav %\}
  {\% endif %\}
...
{% endhighlight %}

```sidebar.html``` 을 보면 저렇게 되어 있음. 

```nav_list``` 라는 확장자 없는 파일에 있는 구문을 파라미터 적용해서 사용한다는 것임.

저 부분을 수정하면 디렉토리를 만들 수 있을 것임.




## Button 넣기

[참고](https://codingbroker.tistory.com/68) 대로 했음.

참고로 ```_includes/head/custom.html``` 에 넣으면 됨

