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

이렇게 Category 는 해주는데 Jerky - Minimal Mistakes Theme 은 네이버 블로그처럼 계층구조를 지원하지 않음.

다시말해 모든 게시글을 다 보여준다는 것. 

=> 너무나도 꼬우므로 커스터마이즈를 함.

![완성본](/Posts/Jekyll/category.png){: width="50%" height="50%"}

#### 준비사항

간단한 html, css, js 검색할 능력.

[Liquid](https://jekyllrb.com/docs/liquid/) 가 중요하게 사용됨.
+ ```{\%%\}``` 에서 백스래쉬를 뺀 구문을 jekyll 가 특정 구문으로 변경해줌
+ md 본문에도 다른 html 문법과는 달리 처리를 해줌.
+ 이미 Theme 에 있는 예제나 위 문서에서 필요할 때 찾아서 쓰면 됨.


## SideBar

{% highlight html %}
...
  {\% if page.sidebar.nav %\}
    {\% include nav_list nav=page.sidebar.nav %\}
  {\% endif %\}
...
{% endhighlight %}

```sidebar.html``` 을 보면 저렇게 되어 있음. 

내용은 ```nav_list``` 라는 확장자 없는 파일에 있는 구문을 파라미터 적용해서 사용한다는 것임.

즉 저 파일을 수정하면 디렉토리를 커스터마이즈 가능함.
+ [nav_list](https://github.com/Mona04/Mona04.github.io/blob/main/Posts/Jekyll/_posts/nav_list)
+ [nav_list_li](https://github.com/Mona04/Mona04.github.io/blob/main/Posts/Jekyll/_posts/nav_list_li)
+ [nav_list_ul](https://github.com/Mona04/Mona04.github.io/blob/main/Posts/Jekyll/_posts/nav_list_ul)
+ ```nav_list``` 는 원래있는걸  수정한 거고 나머지는 새로 만든 것임.

디렉토리-카테고리 정보는 ```_daa/navigation.yml``` 에 있는데 자세한건 나중에 설명함.

### nav_list_li

이 부분은 카테고리의 하이퍼링크와 버튼부분이 들어감. 

```nav_list``` 에 넣다간 코드가 너무 복잡해져서 따로 뺏음.

```span``` 으로 묶은 이유는 ```<a>``` 옆에 ```<button>``` 이 붙어서 그럼.

```style``` 이라는 문자열을 인자로 받는데 Catelogy Level 에 따라 ```margin-right```, ```font-size``` 등을 바꾸기 위해 사용됨.

```id``` 를 접두사와 url 로 연결해 Category 와 Button 을 연결하는데 id 는 valid character set 이 한정되어서 ```replace``` 를 해줘야 함.

#### icon

접혀져 있는지에 따라 아이콘을 바꿔줘야 있어보임.

아이콘은 [여기](https://fontawesome.com/v5.15/icons?d=gallery&p=2) 에서 들고옴.
+ 쓰려면 ```_includes/head/custom.html``` 여기에 아래를 추가해줘야하니 참고.

```
<script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
```

#### click

[관련 블로그](https://it-ing.tistory.com/53#) 를 참고해서 만들었음.

아래의 코드를 ```_includes/head/custom.html``` 에 추가해서 클릭함수를 정의해줘야함.

<details markdown="1">
<summary>header js code</summary>

{% highlight html %}
<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<script>
    var style_spreaded = { "is_spreaded" : true };

    function fn_spread(id) {
        var child = $('#Category' + id);
        var icon = $('#Icon' + id);
        var auto_h = child.css("display", "block").css('overflow', 'visible').css('height', 'auto').height(); 
    
        if (child.attr('spreaded') == "true")
        {
            child.attr('spreaded', 'false');
    
            child.height(auto_h).stop(true, false).clearQueue().animate({ height: 0 },
                {
                    duration: 400, complete: function () {
                        child.css('height', 0).css('height', 'auto'); 
                        child.css('overflow', 'hidden').css("display", "none").css("opacity", "0%").css("z-index", "10").css("max-height", "0%");
                    }
                });
    
            icon.toggleClass("fas fa-angle-up");
        }
        else
        {
            child.attr('spreaded', 'true');
    
            // without max-height make overlaped results as minimal-mistakes toggle button do somthing.
            child.css("opacity", "100%").css("z-index", "0").css("max-height", "100%");
    
            child.height(0).stop(true, false).clearQueue().animate({ height: auto_h },
                {
                    duration: 400, complete: function () {
                        child.css('height', auto_h).css('height', 'auto');
                    }
                });
    
            icon.toggleClass("fas fa-angle-down");
        }
    }
</script>
{% endhighlight %}
</details><br/>

위에서 ```hidden``` 체크가 모바일 호환 때문에 굉장히 중요함.
+ 모바일 화면 등 화면크기가 작으면 Sidebar 가 Toggle Button 으로 접히고 열림
+ 이때 ```display``` 가 아니라 ```overflow:hidden;``` 으로 열고닫기 때문에 위 코드에서도 똑같이 적용시켜줘야함.<br/><br/>



html 부분에선 ```id``` 를 어떻게 지정하는지가 핵심 포인트인데

```
id="{\{"Icon" | append: nav2.url | replace: "/", "-"}\}"
```

위처럼 ```navigation.yml``` 에서 지정한 URL 에서 전처리를 해줘서 Icon 과 ```nav_list``` 에 있을 Collapsed 의 ID 를 설정함
+ ```/``` 를 쓰면 jquery 가 id 로 제대로 인식을 못해서 replace 를 해줘야함.

#### scss

```_sass/minimal-mistakes/_navigation.scss``` 를 다음과 같이 수정했음.

두가지를 수정했는데
1. 나는 Root 포함 계층 3개를 사용하므로 거기에 맞는 ```font-size, margin``` 수정
2. button 위치 이쁘게 만들기

<details markdown="1">
<summary>css code</summary>

{% highlight css %}

.nav__sub-title, .nav__sub-title2, .nav__sub-title3 {
    display: block;
    margin: 0.5rem 0;
    padding: 0.25rem 0;
    font-family: $sans-serif-narrow;
    font-size: $type-size-6;
    font-weight: bold;
    text-transform: uppercase;
    border-bottom: 1px solid $border-color;
    align-content: stretch;
}

.nav__sub-title2 { 
    margin-left: 1em;
    font-size: $type-size-7;
    font-weight: normal;
}
.nav__sub-title3 {
    margin-left: 2em;
    font-size: $type-size-8;
    font-weight: normal;
}

.nav__sub-button {
    width: 100%;
    float: right;
    margin: 0;
    margin-left: 0.5em;
    border: none;
    border-width: 0em;
    outline: none;
    font-size: $type-size-8;
    background: rgba(0,0,0,0);
}
.nav__sub-button:hover {
    background: rgba(0,0,0,0);
}
.nav__sub-button:focus {
    outline: none;
}

{% endhighlight %}
</details>

### nav_list_ul

2가지 역할이 있음.

1. ```id``` 를 위에서 설명한대로 ```<ul>``` 에 부여하는 것. 얘가 접히게 됨.
2. 해당 디렉토리에 있으면 자동으로 그 부분만 펼쳐지게 해놓는 것.
  + 디렉토리 구조이므로 ```nav.url``` 이 ```Page.url``` 를 포함하면 됨.
  + 이때 대소문자가 자동으로 처리되는 부분이 있으므로 대문자로 통일함.
  + Root 부분인 ```CATEGORIES``` 는 이 방법으로 안되서 야매로 처리	

### nav_list

{% highlight html %}
...
<ul class="nav__items" id="{\{"Category" | append: nav.url | replace: "/", "-"}\}" style="display: none;" >
{\% for nav2 in nav.children %\}
...
{% endhighlight %}

파일 중간에 저기부분이 포함된 문단이 원래 있던 거에서 크게 수정된 부분임

```nav``` 의 children 마다 ```<ul>``` 안에 ```<li>``` 를 채우는게 다인데, Liquid 문법이 있어서 복잡해 보일 뿐임.

이때 ```<li>``` 의 구조는 앞에서 살펴본 ```nav_li``` 와 새로운 ```<ul>``` 임.
+ 새로운 ```<ul>``` 안에는 Subdirectory 가 들어가게 됨.
+ 포문을 돌려 내려간 단계가 곧 표현가능한 계층의 갯수로 내가 만든건 2번만 돌리고 끝남.
+ 같은 구조로 계속 포문을 돌릴 수 있으므로 계층 추가도 쉽게 가능함.

#### scss

{% highlight css %}
.sidebar::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
.sidebar::-webkit-scrollbar-thumb {
    background: #FF0000;
}
{% endhighlight %}

위를 ```_sidebar.scss``` 에 추가하면 스크롤바 없앨 수 있음.




## navigation.yml

계층구조를 html 내에서 탐색하는건 구현도 어렵고 필요한 추가 파일도 있어서 사용안함.

사용할 전략은 2가지임.
1. ```navigation.yml``` 에 미리 Directory 정보를 넣어두는 것임.
  + 위에서 살펴보았듯 이 정보는 ```site.data.navigation[page.sidebar.nav]``` 에서 접근가능함.
2. directory 마다 md 파일을 만들고, 거기서 Category Filtering  을 함.
  + 이때 Liquid 로 Include 를 하면 편하겠지만 상위디렉토리에 접근이 안되서 직접 넣어줘야함.
  + Category Filtering 은 ```_layout/categories.html``` 을 조금만 수정해서 구현함.

이를 수동으로 하면 귀찮아서 프로그램을 하나 만들었음 [링크](https://github.com/Mona04/GitBlogHelper/blob/master/README.md)


## 결론

1. SideBar 관련 html 파일 커스터마이즈 
2. Directory 정보 반영된 navigation.yml 

두부분만 수정하면 계층형 카테고리를 GitBlog 에서 구현할 수 있음.



