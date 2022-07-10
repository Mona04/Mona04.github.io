---
excerpt: "jekyll - Minimal Mistakes Thems, BreadCrumbs Edits"
tag: [Jekyll]
---

## BreadCrumbs

### 기본

[BreadCrumbs](https://developers.google.com/search/docs/advanced/structured-data/breadcrumb)는 탐색경로라고도 불리며 SEO(Search Engine Optimization) 중에 하나로 검색을 쉽게 하기 위해 사용된다. 예를들어
Jerkll 에서 ```/A/B/_posts/posts.md``` 가 있으면 ```A / B / post.md``` 처럼 Directory 구조를 페이지에 두는 것이다. 

이러한 것을 Minimal Mistakes Thems 은 미리 만들어 놨다. ```Single.md``` 등을 살펴보면 아래와 같은 부분이 BreadCrumbs 가 삽입되는 부분이다.

```
{\% include breadcrumbs.html path=page.path title=page.title %\}
```



<br/>

Linq 구문이므로 우리가 원하는 부분에 임의로 추가할 수도 있고, 해당 파일인 ```breadcrumbs.html``` 을 수정해서 커스타마이즈 할 수 있다.

그 파트를 삽입처리해주는 위 코드를 Layout, Include 등의 어딘가에 추가하면 됨.
+ 개인적으로 ```page__meta.html``` 에 추가하니까 이쁘게 나왔음.
+ ```margin``` 조정을 하면 위아래 격차가 왠만한건 됨.
+ ```ol``` 이 들어가므로 __```p``` 안쪽에 넣으면 안되는 것에 주의__
  + 자동으로 ```ol``` 을 바깥으로 빼고 ```p``` 를 밑에 추가로 넣어서 이상해짐
  + 특히 ```p``` 에 위아래 패딩 붇고 그러면...

<br/>

아이콘도 옆에 달면 이쁘게 나왔음.
+ ```<i class="fas fa-fw fa-folder-open" aria-hidden="true"></i>``` <= 이거
+ Icon 이 삐뚫어지면 css 에 ``` display: flex; align-items: center; ``` 이거 넣으면 됨.


### 커스터마이즈

기본은 카테고리로 정렬한 문서에 ```#category``` 로 접근함.

나는 내 계층형 카테고리에 적용되도록 커스터마이즈를 할 필요가 있었음.

문서 자체는 간단해서 말로도 설명 가능함.

```assign crumbs = page.url | split: '/'``` 으로 디렉토리 명을 분리 할 수 있음.
+ 이하 파트는 이  ``` for crumb in crumbs offset: 1 ```  으로 베이스경로는 무시해서 처리하는 것을 알 수 있음.
+ 이러한 ```crumbs``` 를 ```string``` 에 차곡차곡 더하면 계층형 경로를 얻을 수 있었음.

<br/>

코드분석을 살짝만 하자면

```if forloop.first``` 부분은 Root 이하를 ```Home``` 으로 해놓는 것임.

```if forloop.last``` 부분은 파일명 부분을 처리하는 부분임. 난 길어져서 뺐음.

```if forloop.last``` 의 ```else``` 이하가 Directory 에 대한 하이퍼링크임.
+ 하이퍼링크  연결할 때 ```/Category/``` 이렇게 가야지 루트 경로에 하이퍼링크 값을 추가하는 것임. ```Category/``` 이러면 현재 경로에서 하이퍼링크 값을 추가하게 됨.
+ html 잘 안쓰니까 여기서 시간낭비...