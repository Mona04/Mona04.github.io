---
excerpt: "jekyll - Minimal Mistakes, Entries_Layout Simple Custumize"
tag: [Jekyll]
---


## Entries_Layout

### 선행지식

[Liquid](https://jekyllrb.com/docs/liquid/)

### 전략

```entries_layout``` 은 ```_config.yml``` 의 ```Default:``` 혹은 Front Matter 에서 지정할 수 있는 값임.
+ 이 값에 따라서 게시글 목록의 Layout 을 정하게 됨.
+ 예를들어 ```grid```, ```list``` 가 있음.

<br/>


```
{\% assign entries_layout = 'grid' %\}

...

<div class="entries-{{ entries_layout }}">
  {\% for post in category.last %\}
    {\% include archive-single.html type=entries_single %\}
  {\% endfor %\}
</div>
...

```
<br/>

게시글 목록을 보여주는 Layout 같은 데를 보면 위와 같음 (위는 ```Categories.html```)
+ 특정 클래스로 된 ```<div>``` 가 있고
+ 그안에 들어가는 ```archive_single.html``` 이 있음

여기서 Layout 과 관련이 큰 부분은 __후자__ 임.
+ 그래서 나는 ```archive_single.html``` 를 __복사__ 한 후
+ 필요한 부분을 교체하는 전략을 썼음.
+ 이는 ```Categories.html``` 같은 Layout 용 마크다운에 적용되었음
  + ex) 내가 쓰는 ```navi-portfolio.md```

```Archive_Single``` 에서 주로 수정해야할 부분은 ```class``` 임.


+ ```<div class="{\{ include.type | default: 'list' }\}__item">``` 로 묶이는데
+ 몇행으로 구성할지, excerpt 를 표시할지 등이 __scss__ 에서 정할 수 있기 때문임


```_archive.scss``` 가 바로 그것
+ 위에서 보다시피  ```[entries_layout]__item``` 꼴로 클래스가 적용됨
+ ```[entries_layout]``` 을 바꾸긴 뭐하니까 나는 뒷부분을 바꿈.
  +  scss 내의 스타일을 복붙해 ```grid__item2```를 만들고
  + ```div``` 가 가지는 Style 의 뒷부분을 ```__item2``` 로 바꿈.

scss 에서 보면```@include breakpoint($small)``` 같이 크기에 따른 반응형 스타일이 적용되어 있는데 무시해도 되고 적당히 수정해주면 끝.