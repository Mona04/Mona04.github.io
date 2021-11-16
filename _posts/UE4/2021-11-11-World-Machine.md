---
excerpt: "World Machine 에서 Height Map 뽑아서 UE4 에 적용시키기"
categories: UE4
tag: [UE4]
---

## World Machine

### 다운

[다운로드 링크](http://www.world-machine.com/download.php)

### 간단한 생성 방법

1. Project->Project Setting
	+ 여기서 중요한 것은 Resolution
	+ 어떤게 되는지는 [언리얼 공식 문서](https://docs.unrealengine.com/4.27/en-US/BuildingWorlds/Landscape/TechnicalGuide/)
	
2. Node 기반으로
	+ 맨 아래쪽 툴바에도 있고, 맨 위의 툴바의 Devices 이하들이 전부 노드임
	+ 기본으로 넣어둔 Advanced Perlin, Curves, Erosion 으로 기본적인것 가능.
	+ Advanced Perlin
		+ 기본 랜덤 생성기로 ```Ctrl + R``` 로 랜덤가능 (우클릭으로 확인가능)
		+ 더블클릭해서 Style 을 바꾸면 다양한 스타일 연출 가능
	+ Curve
		+ 높이에 따라 가중치 부여 가능
	+ Terrace
		+ 넣으면 등고선 느낌으로 들어감
		
3. Height Output
	+ 여기서 가장 중요한 것은 16bit 이미지로 추출하는 것임
	+ 그냥 저장하면 ```Document/World Machine Documents/``` 경로에 있음 

4. Import 후
	+ Z 는 World Machine 은 0~2048 임에 반해서 UE4 은 -1024 ~ 1024 라서 z 는 x,y scale 의 절반을 하면 world Machine 과 같은 값이 나옴
	+ material 추가시 layer 옆에 ```+``` 버튼을 눌러서 Landscape Layer Info 를 추가


