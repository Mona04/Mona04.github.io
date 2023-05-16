---
excerpt: "MSTest 에서 c++ dll 같은 외부 dll 을 사용할 때 IOFileNotFoundException 이 뜨는 경우 해결"
tag: [unit test]
use_math: true
---

## 원인

dll 에 대한 IOFileNotFoundException 은 실제로 dll 이 없거나 그것이 의존하는 다른 dll 등이 없을 때 발생한다. 

일반적인 해결법은 Working Directory 에 dll 과 의존되는 dll 을 복사해 넣어두는 것이다. 그런데 MSTest 같은 VisualStudio 환경의 Unit Test 에서는 이걸 인식을 하지 못한다. 

## 삽질

[MSDN .runsettings](https://learn.microsoft.com/ko-kr/visualstudio/test/configure-unit-tests-by-using-a-dot-runsettings-file?view=vs-2022) 에서 ```AssemblyResolution``` 를 넣어봐도 안되고, 찾아보면 ```TestResult/Deploy_xxx/out``` 에 넣어야한다는데 폴더가 자동으로 생성도 안되서 넘어갔다. ```TestContext``` 에서 테스트 런타임 관련 폴더 정보도 있는데 일반적인  ```bin/``` 과 다를바가 없었다.

```DeploymentItem()``` 도 해봤는데 안된다.


## 해결

[블로그](https://robor78.wordpress.com/2016/07/04/add-a-deployment-item-to-a-c-unit-test/) 를 보고, 솔루션 탐색기에 관련 dll 을 다 포함하니까 되었다. 이게 뭔지...?
