---
excerpt: "jekyll - Minimal Mistakes Thems, BreadCrumbs Edits"
tag: [Jekyll]
---

## BreadCrumbs

### 기본

[BreadCrumbs](https://developers.google.com/search/docs/advanced/structured-data/breadcrumb)는 탐색경로라고도 불리며 SEO(Search Engine Optimization) 중에 하나로 검색을 쉽게 하기 위해 사용된다. 예를들어
Jerkll 에서 ```/A/B/_posts/posts.md``` 가 있으면 ```A / B / post.md``` 처럼 Directory 구조를 페이지에 두는 것이다. 

이러한 것을 Minimal Mistakes Thems 은 미리 만들어 놨다. 레이아웃에 이를 추가하는 구문을 찾을 수 있는데, 예를들면 ```Single.md``` 에서 아래와 같은 구문을 찾을 수 있다.

```
{\% include breadcrumbs.html path=page.path title=page.title %\}
```

<br/>


위 코드에서 나타나듯 ```breadcrumbs.html``` 을 수정하고 레이아웃의 적절한 위치에 위 코드를 삽입하는 방식으로 커스터마이즈를 할 수 있다. 넣는 장소는 ```page__meta.html``` 이 들어가는 곳 바로 위나 아래에 넣는 것이 위치 상 적절하다.


### 코드분석

문서 자체는 간단해서 말로도 설명할 수 있다.

```assign crumbs = page.url | split: '/'``` 으로 디렉토리 명을 분리해서  ``` for crumb in crumbs offset: 1 ```  으로 반복문을 돌린다. 
+ ```offset:1``` 인 이유는 url 이 ```/posts/jekyll/Breadcrumbs/``` 모양이라 맨 앞은 빈 문자열로 나와 이 부분을 무시하기 위함이다.
+ 이러한 ```crumbs``` 를 ```string``` 에 차곡차곡 더하면 계층형 경로를 얻을 수 있다.

반복문 내부에서는 
+ ```if forloop.first``` 부분은 Root 이하를 ```Home``` 으로 해놓는 것이다. 
+ ```if forloop.last``` 부분은 파일명 부분을 처리하는 부분이다. SEO 에 포함되지 않아서 나는 제외했다.
+ ```if forloop.last``` 의 ```else``` 이하가 Parent Directory 각각에 대한 하이퍼링크이다.
  + 하이퍼링크  연결할 때 ```/Category/``` 이렇게 가야지 루트 경로부터 적용이 된다. ```Category/``` 이러면 현재 경로에서 하이퍼링크 값을 추가하게 된다.


### 커스터마이즈

+ ```margin``` 조정을 하면 위아래 간격조절은 ```margin``` 을 통해서 하면 이쁘게 된다.
+ ```ol``` 이 들어가므로 ```p```를 [넣으면 안되는 것에 주의](https://stackoverflow.com/questions/5681481/should-ol-ul-be-inside-p-or-outside)
  + 자동으로 ```ol``` 을 바깥으로 빼고 ```p``` 를 밑에 추가로 넣어서 이상해진다.
  + 특히 ```p``` 에 위아래 패딩 붇고 그러면...

+ 아이콘도 옆에 달면 이쁘게 나왔다.
  + ```<i class="fas fa-fw fa-folder-open" aria-hidden="true"></i>``` <= 이거
  + Icon 이 삐뚫어지면 css 에 ``` display: flex; align-items: center; ``` 를 추가해보자.