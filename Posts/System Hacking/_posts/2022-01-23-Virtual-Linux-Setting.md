---
excerpt: "리눅스 가상마신으로 돌리는거 메모"
tag: [Linux]
use_math: true
---

## WSL2

### 설치

[DreamHack](https://dreamhack.io/) 의 System Hacking Inroduction 에 나와있는데 포맷때마다 찾기 귀찮을거 같아서 저장함.

1. winver >= 2004 부터 가능
  + ```Windows + R``` 로 실행창 열어서 ```winver``` 입력하면 바로 버전 알 수 있음.

2. 다음을 Window Powercell 에 입력
  + ```dism.exe /online /enable-feature /featurename:Microsoft-Windows-  Subsystem-Linux /all /norestart```
  + ```dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart``` 
  + ```wsl --set-default-version 2```

3. [여기](https://docs.microsoft.com/ko-kr/windows/wsl/install-manual) 서 Linux 커널 업데이트 패키지를 다운함

4. 기본으로 윈도우에 깔려 있는 Microsoft store 에서 Ubuntu 를 설치하고 실행함

### 패스워드 까먹었을 때 <br/>

Window Powercell 에서
+ ```wsl --user root``` 으로 루트로 로그인함
+ 루트를 바꾸려면 ```passwd``` 다른계정이면 ```passwd username``` 을 사용하면 됨  