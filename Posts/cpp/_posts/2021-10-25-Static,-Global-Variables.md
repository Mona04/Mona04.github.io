---
excerpt: "c++ 의 전역/정적 변수의 초기화에 대해서"
categories: c++
tag: [c++]
use_math: true
---
## Initializations

### 기본적 개념 <br/>

[정적 변수 초기화의 안정성에 대해서](https://pabloariasal.github.io/2020/01/02/static-variable-initialization/)

[정적 변수의 초기화에 대해서](https://www.kdata.or.kr/info/info_04_view.html?field=&keyword=&type=techreport&page=21&dbnum=183425&mode=detail&type=techreport)

### 전역 혹은 정적 변수가 저장되는 영역 - Data -

+ Data 영역은 3가지로 나뉨  
	+ [참고](https://m.blog.naver.com/rhkdals1206/221519863419)
+ .rodata 
	+ 읽기 전용으로 상수 문자열, 상수 리터럴 등이 저장됨
+ .data
	+ 초기화 된 값들이 저장되는 영역
	+ exe 파일에 실행 이미지가 저장되어 프로세스 시작시 복사됨
+ .bss(Blocked State Symbol)
	+ 초기화 되지 않은 전역/정적 변수가 저장됨
	
	
### CRT 

+ 전역 변수를 초기화 하는 C 의 라이브러리
+ 큰 종류로 ```/MD```, ```/MT``` 가 있음 
	+ [간단한 설명](https://blog.naver.com/PostView.naver?blogId=ppusarida&logNo=40167344277&redirect=Dlog&widgetTypeCall=true&directAccess=false)
	+ [dll 간 CRT 개체 전달 시 주의](https://docs.microsoft.com/ko-kr/cpp/c-runtime-library/potential-errors-passing-crt-objects-across-dll-boundaries?view=msvc-160)
	+ [MS 문서](https://github.com/MicrosoftDocs/cpp-docs/blob/master/docs/c-runtime-library/crt-library-features.md)
+ dll 간의 Heap 메모리가 공유되느냐가 달라 동적메모리 할당에 주의해야함.


### Static Local Variable 의 초기화에 대해서

+ 초기화 여부를 판단하는 정적변수를 만들어서 어셈블리 단위에서 한번만 초기화되게 체크함.
+ 컴파일러에 따라서 ```Mutex``` 를 넣어서 __Thread 안정성을 보장할 수도 아닐수도__ 있음 
{% highlight c++ %}
int x, y;
int F(){ return x + y; }

int main()
{
    x = 10; y = 15;
    static int a = F();
    cout << a;   // print 25
}
{% endhighlight %}


###  Static Link

+ Static Link 는 c++ standard 의 일부임

+ Static Link 는 최적화로 인해초기화가 일어나지 않을 수 있음.
	+ [자세한건 여기](https://stackoverflow.com/questions/9459980/c-global-variable-not-initialized-when-linked-through-static-libraries-but-ok)
	+ 해결법은 링크 커맨드에 ```WholeArchive``` 를 추가하는 것
	+ [자세한건 이거](https://docs.microsoft.com/ko-kr/cpp/build/reference/wholearchive-include-all-library-object-files?view=msvc-160)
	
+ 또한 Defered Dynamic Initialization 으로 인해 ```main()``` 이전에 초기화가 안될 수도 있음
	+ [자세한건 여기](https://en.cppreference.com/w/cpp/language/initialization)
	+ [Stack Overflow 의 답변](https://stackoverflow.com/questions/6372032/dynamic-initialization-phase-of-static-variables)

### Dynamic Link

+ [dll 동작에 대해서](http://egloos.zum.com/sweeper/v/2991972)

+ dllmain 을 호출하기 전에 crt initialze 가 이루어져 정적/전역 변수가 초기화 됨.

+ 암시적 Link
	+ 실행파일내에 dll Module에 대한 참조가 있으면 프로그램이 실행될 때 Module 을 로딩함.
	+ .lib 파일이 필요함.
	+ 참조가 없으면 Link 가 이루어지지 않으므로 주의

+ 명시적 Link
	+ main 이후에 직접 함수를 호출해서 Module 을  로딩함
	+ .dll 만 있으면 됨

#### Dll 에 Static Lib 과 연결시

+ Singleton 처럼 전역 변수는 복사본이 들어오므로 기피해야함
	+ [링크](https://stackoverflow.com/questions/6935541/c-a-singleton-class-with-dll)
	+ [링크](https://stackoverflow.com/questions/37740662/singleton-class-in-a-static-library)
