---
excerpt: "Swig Window 환경에서 사용하기"
tag: [c++, Swig]
use_math: true
---

## Swig 란

[Wiki](https://en.wikipedia.org/wiki/SWIG)

[Official Document](https://www.swig.org/Doc4.0/Sections.html#Sections)


## 사용법

SwigWin 을 다운받아서 ```Swigwin-4.0.2/Examples/[이식할언어]``` 에 들어가면 언어별 지원기능에 대한 예제가 들어있다. 

### C#

C# 의 경우 VS 파일이 들어있는데, [Blog](https://www.technical-recipes.com/2013/getting-started-with-swig-interfacing-between-c-and-c-visual-studio-projects/) 에서 시키는 대로 하면 잘 작동한다. 이때 C# 프로젝트를 실행하면 dll 을 찾을 수 없다는 에러를 볼 수 있는데, Swig 가 [P/Invoke](https://docs.microsoft.com/ko-kr/dotnet/standard/native-interop/pinvoke) 기반으로 래핑되므로 C# 의 실행파일이 있는 곳에  c++ 을 빌드해서 나온 dll 을 넣으면 된다. 