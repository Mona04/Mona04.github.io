var store = [{
        "title": "c++기초플러스",
        "excerpt":"가이드 14장 이후에는 필요할 때 찾아서 보는게 좋을 잡다한 내용이 많음. 그래서 한번에 다 보는게 아니면 보기 싫어서 미루기 쉬울것으로 예상됨. 그래서 그중에서도 개인적으로 기억에 남거나 중요하다고 생각되는 부분을 요약해놓음. 책을 안읽었다면 요약본과 겹치는 부분 위주로 읽으면 이해가 쉽고 빨리 읽을 수 있을 것임. 18장은 짧고 요약할게 없어서 직접보는걸 추천....","categories": ["Posts","Book","C++PrimerPlus"],
        "tags": ["c++"],
        "url": "/posts/book/c++primerplus/c++%EA%B8%B0%EC%B4%88%ED%94%8C%EB%9F%AC%EC%8A%A4/",
        "teaser": null
      },{
        "title": "ch13 상속",
        "excerpt":"상속 대부분의 이야기는 다 아는 이야기일 것임. 헷갈리거나 다시 정리하기 좋은 부분만 정리함. 동적결합과 가상함수 함수를 호출하면 바로 다음줄의 코드가 아니라 멀리 떨어진 어떤 블럭의 코드를 실행 해야함. 이를 컴파일러 가 해주면 정적결합(Static Binding) 이라고 하고 런타임 에서 연결되면 동적결합(Dynamic Binding, Lately Binding) 이라고 함. 동적결합은 가상함수에서 쓰임(다른경우가 또 있는진...","categories": ["Posts","Book","C++PrimerPlus"],
        "tags": ["c++"],
        "url": "/posts/book/c++primerplus/ch13-%EC%83%81%EC%86%8D/",
        "teaser": null
      },{
        "title": "ch14 상속, 템플릿",
        "excerpt":"멤버 초기화 struct AAA { AAA() : a(10), c(12) // 초기화 리스트 사용. { b = 10; // 생성자 내에서 사용 } int a, b; int c = 10; // 선언과 동시에 초기화. 근데 초기화리스트에 있어서 씹힘 }; (선언과 동시에 초기화 == 초기화 리스트) 후에 생성자 블록에 들어가게 됨. 위...","categories": ["Posts","Book","C++PrimerPlus"],
        "tags": ["c++"],
        "url": "/posts/book/c++primerplus/ch14-%EC%83%81%EC%86%8D,-%ED%85%9C%ED%94%8C%EB%A6%BF/",
        "teaser": null
      },{
        "title": "ch15 friend, except, ect",
        "excerpt":"Friend, Nested Class class List { public: int GetFront() { return begin.value; } // friend 로 value 접근하게 해야함. protected: class Item { //friend class List; // 전방선언으로 떼울 수 있음 friend int List::GetFront(); // 메소드가 앞에 선언되어야 가능 friend ostream&amp; operator&lt;&lt;(ostream&amp; stream, const Item&amp; in) { return stream &lt;&lt;...","categories": ["Posts","Book","C++PrimerPlus"],
        "tags": ["c++"],
        "url": "/posts/book/c++primerplus/ch15-friend,-except,-ect/",
        "teaser": null
      },{
        "title": "ch16 string",
        "excerpt":"String 생성자 void main() { string a(5, 'a'); // string(size_type n, char c); cout &lt;&lt; a &lt;&lt; endl; // aaaaa string b(\"abcefg\", 3); // string(const char* s, size_type n); cout &lt;&lt; b &lt;&lt; endl; // abc string c(b, 1, 3); // string(const string&amp; str, size_type pos, size_type npos); cout &lt;&lt;...","categories": ["Posts","Book","C++PrimerPlus"],
        "tags": ["c++"],
        "url": "/posts/book/c++primerplus/ch16-string/",
        "teaser": null
      },{
        "title": "ch17 Stream",
        "excerpt":"표준입출력(standard input output) CLI 에서 보통 쓰는게 표준 입출력. stdio 인 이유가 standard input output 임. 알고리즘 문제 풀 때 가끔 표준출력으로 제출하시오 이렇게 나옴. C/C++ 은 표준입출력이 언어에 내장 안됨 많은 언어들이 내부에 입출력 기능을 언어 자체에 내장하고 있으나 c, c++ 은 없음. 그래서 우리는 &lt;stdio.h&gt; 같은걸 Include 하는...","categories": ["Posts","Book","C++PrimerPlus"],
        "tags": ["c++"],
        "url": "/posts/book/c++primerplus/ch17-Stream/",
        "teaser": null
      },{
        "title": "Jekyll 구축관련",
        "excerpt":"Github Blog 용 메모 자주사용 커맨드 $bundle exec jekyll serve $git add --all $git commit -m \"Init\" $git push 자주 사용하는 사이트 http://127.0.0.1:4000 https://mmistakes.github.io/minimal-mistakes/docs 마크다운 문법 특수 마크업 Tip &lt;br/&gt; 는 강제 줄바꿈이 아니라서 레이아웃 설정이 그대로 됨 유튜브 링크 &lt;iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/[?v=뒤링크]\" frameborder=\"0\" allowfullscreen&gt;&lt;/iframe&gt; Color Code {\\% highlight...","categories": ["Posts","Jekyll"],
        "tags": [],
        "url": "/posts/jekyll/Jekyll-%EA%B5%AC%EC%B6%95%EA%B4%80%EB%A0%A8/",
        "teaser": "/assets/images/iruru.jpg"
      },{
        "title": "Knuth Morris Pratt",
        "excerpt":"KMP 이거보다가 이해안되서 정리함 해당 문제는 이거임 용어 단어 찾기 하는데 찾을 글자를 편의상 P(Pattern 약자) 라고 하고 찾을 텍스트를 T(Text 약자) 라고 하겠음. 글자의 길이는 len(P) 처럼 앞에 len 을 붙여서 최소한의 용어로 설명하겠음. 최소 복잡도 T 의 0번 글자부터 P가 맞는지 비교를 해야하는게 당연할 것임. 이때 매번 T의...","categories": ["Posts","Algorithm","Algorithms Concept"],
        "tags": ["PS. KMP","PS. String"],
        "url": "/posts/algorithm/algorithms%20concept/Knuth-Morris-Pratt/",
        "teaser": null
      },{
        "title": "BOJ 14601) 샤워실 바닥 깔기",
        "excerpt":"샤워실 바닥 깔기 문제 사이트) 코드 #include &lt;bits/stdc++.h&gt; using namespace std; #define fastio cin.tie(0)-&gt;ios::sync_with_stdio(0); cout.tie(0); setvbuf(stdout, nullptr, _IOFBF, BUFSIZ); #pragma warning(disable:4996) #include &lt;unordered_set&gt; int bwidth = 1; int board[129*129]; int nTile = 1; enum DIR { LT = 0, RT = 1, LB = 2, RB = 3}; void Fill2x2(int...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. Divide and conquer"],
        "url": "/posts/algorithm/boj-gold/BOJ-14601)-%EC%83%A4%EC%9B%8C%EC%8B%A4-%EB%B0%94%EB%8B%A5-%EA%B9%94%EA%B8%B0/",
        "teaser": null
      },{
        "title": "BOJ 2401) 최대 문자열 붙여넣기 ",
        "excerpt":"KMP 문제 사이트 코드 #include &lt;bits/stdc++.h&gt; using namespace std; #define fastio cin.tie(0)-&gt;ios::sync_with_stdio(0); cout.tie(0); setvbuf(stdout, nullptr, _IOFBF, BUFSIZ); #pragma warning(disable:4996) #include &lt;unordered_set&gt; string T; int32_t failTB[100001]; int32_t n; bitset&lt;100001&gt; cache_finded[501]; int32_t str_len[501]; int32_t cache[100001]; int main() { fastio; cin &gt;&gt; T &gt;&gt; n; string str; for (int p = 0; p...","categories": ["Posts","Algorithm","BOJ-Platinum"],
        "tags": ["PS. KMP","PS. DP","PS. String"],
        "url": "/posts/algorithm/boj-platinum/BOJ-2401)-%EC%B5%9C%EB%8C%80-%EB%AC%B8%EC%9E%90%EC%97%B4-%EB%B6%99%EC%97%AC%EB%84%A3%EA%B8%B0/",
        "teaser": null
      },{
        "title": "Cycle 찾기",
        "excerpt":"DFS? UnionFind? 뭐가 더 나을까 DFS 가 더 빠르지만 Edge, Node 가 동적으로 변하는 상황에선 Union Find 가 좋음. 코드 vector&lt;int&gt; lines[100001]; bool visitTB[100001], recurTB[100001]; void DFS(int cur) { visitTB[cur] = true; recurTB[cur] = true; for (auto&amp; line : lines[cur]) { if (recurTB[line]) { // Cycle Check visitTB[cur] = false;...","categories": ["Posts","Algorithm","Algorithms Concept"],
        "tags": ["PS. UnionFind","PS. DFS"],
        "url": "/posts/algorithm/algorithms%20concept/Cycle-%EC%B0%BE%EA%B8%B0/",
        "teaser": null
      },{
        "title": "기초 정수론 알고리즘",
        "excerpt":"참고 참고1. 확장 유클리드 참고2. 중국나머지정리위키 Euclidean algorithm 코드 int gcd(int m, int n) // m &gt;= n { int z, a, b; a = m, b = n; while (b) { z = a%b; a = b; b = z; } return a; } 설명 최대공약수(GCD) 구하는 알고리즘임. \\[a...","categories": ["Posts","Algorithm","Algorithms Concept"],
        "tags": ["PS. 정수론"],
        "url": "/posts/algorithm/algorithms%20concept/%EA%B8%B0%EC%B4%88-%EC%A0%95%EC%88%98%EB%A1%A0-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/",
        "teaser": null
      },{
        "title": "BOJ 16565) N포커",
        "excerpt":"Binomial Coefficient 문제 사이트 \\[\\begin{multline} {}_n \\mathrm{ C }_k = \\frac{n!}{k! (n-k)!} \\\\ \\\\ \\shoveleft \\shoveleft = \\frac{(n-1)! \\times n}{k! (n-k)!} \\\\ \\\\ \\shoveleft \\shoveleft = \\frac{(n-1)! \\times ( (n-k) + k ) }{k! (n-k)!} \\\\ \\\\ \\shoveleft \\shoveleft = \\frac{(n-1)!}{k! (n-k-1)!} + \\frac{(n-1)!}{(k-1)! (n-k)!} \\\\ \\\\ \\shoveleft \\shoveleft =...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. DP","PS. 정수론"],
        "url": "/posts/algorithm/boj-gold/BOJ-16565)-N%ED%8F%AC%EC%BB%A4/",
        "teaser": null
      },{
        "title": "BOJ 2283) 구간 자르기",
        "excerpt":"Sweeping 문제 사이트 코드 #include &lt;bits/stdc++.h&gt; using namespace std; #define fastio cin.tie(0)-&gt;ios::sync_with_stdio(0); cout.tie(0); setvbuf(stdout, nullptr, _IOFBF, BUFSIZ); #pragma warning(disable:4996) #define MAXRANGE 1000003 int weights[MAXRANGE]; int main() { fastio; int n, k; cin &gt;&gt; n &gt;&gt; k; int tmp1, tmp2; for (int i = 0; i &lt; n; i++) { cin...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. Sweeping"],
        "url": "/posts/algorithm/boj-gold/BOJ-2283)-%EA%B5%AC%EA%B0%84-%EC%9E%90%EB%A5%B4%EA%B8%B0/",
        "teaser": null
      },{
        "title": "BOJ 20415) MVP 다이아몬드",
        "excerpt":"DP 문제 사이트 코드 #include &lt;bits/stdc++.h&gt; using namespace std; #define fastio cin.tie(0)-&gt;ios::sync_with_stdio(0); cout.tie(0); setvbuf(stdout, nullptr, _IOFBF, BUFSIZ); #pragma warning(disable:4996) #include &lt;unordered_set&gt; int grade[6]; int months[40]; int teer2int[128]; int cache[40]; int main() { fastio; for (int i = 0; i &lt; 5; i++) teer2int[\"BSGPD\"[i]] = i; int n; cin &gt;&gt; n...","categories": ["Posts","Algorithm","BOJ-Platinum"],
        "tags": ["PS. DP"],
        "url": "/posts/algorithm/boj-platinum/BOJ-20415)-MVP-%EB%8B%A4%EC%9D%B4%EC%95%84%EB%AA%AC%EB%93%9C/",
        "teaser": null
      },{
        "title": "Longest Increasing Subsequence",
        "excerpt":"개요 최장 증가 부분수열은 자주 나오는 문제고 비슷한 문제가 이걸로 쉽게 환원이 되어 Well Known Problem 중 하나임. 푸는 방법이 크게 3가지로, 하나는 DP 이고 하나는 Binary Search 를 응용한 방법, 다른 하나는 Segment Tree 를 응용한 방법임. DP 문제 가장 긴 증가하는 부분 수열 코드 int inputs[1001]; pair&lt;int, int&gt;...","categories": ["Posts","Algorithm","Algorithms Concept"],
        "tags": ["PS. LIS","PS. DP","PS. Segment Tree"],
        "url": "/posts/algorithm/algorithms%20concept/Longest-Increasing-Subsequence/",
        "teaser": null
      },{
        "title": "BOJ 2995) POKLON",
        "excerpt":"LIS-BinarySearch 문제 사이트 코드 struct Line { int x, y; }; Line lines[100001]; vector&lt;Line&gt; LIS; vector&lt;Line&gt; ans; unordered_map&lt;int, vector&lt;Line&gt;&gt; index_map; int main() { fastio; int n; cin &gt;&gt; n; for (int i = 0; i &lt; n; i++) cin &gt;&gt; lines[i].x &gt;&gt; lines[i].y; sort(lines, lines + n, [](Line&amp; lh, Line&amp;...","categories": ["Posts","Algorithm","BOJ-Platinum"],
        "tags": ["PS. LIS"],
        "url": "/posts/algorithm/boj-platinum/BOJ-2995)-POKLON/",
        "teaser": null
      },{
        "title": "BOJ 11692) 시그마함수",
        "excerpt":"문제 문제 사이트 방법 1 코드 using INT = int64_t; int main() { INT n; cin &gt;&gt; n; // 2 다 빼고, 제곱수면 약수합이 홀수 // =&gt; sqrt 에서 홀수 + 여기서 2 곱해서 원래수 이하되는 수 // =&gt; sqrt(n) 홀수 + sqrt(n/2) 의 홀수 + sqrt(n/4) 의 홀수 INT...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. 정수론"],
        "url": "/posts/algorithm/boj-gold/BOJ-11692)-%EC%8B%9C%EA%B7%B8%EB%A7%88%ED%95%A8%EC%88%98/",
        "teaser": null
      },{
        "title": "BOJ 14258) XOR 그룹",
        "excerpt":"UnionFind 문제 사이트 코드 using INT = int64_t; INT board[1002 * 1002]; #define INTMAX 1000001 INT cycleTB[INTMAX]; INT xorTB[INTMAX]; INT Root(INT i) { if (i == cycleTB[i]) return i; return cycleTB[i] = Root(cycleTB[i]); } void Union(INT i, INT j, INT&amp; cur) { i = Root(i); j = Root(j); if (i...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. UnionFind"],
        "url": "/posts/algorithm/boj-gold/BOJ-14258)-XOR-%EA%B7%B8%EB%A3%B9/",
        "teaser": null
      },{
        "title": "BOJ 3273) Sum X",
        "excerpt":"문제 문제 사이트 방법 1 코드 int main() { int n, x; cin &gt;&gt; n; vector&lt;int&gt; as(n); for (int i = 0; i &lt; n; i++) cin &gt;&gt; as[i]; cin &gt;&gt; x; sort(as.begin(), as.end()); bool move_right = true; auto l_i = as.begin(); auto r_i = --as.end(); int ans = 0;...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": [],
        "url": "/posts/algorithm/boj-gold/BOJ-3273)-Sum-X/",
        "teaser": null
      },{
        "title": "ch01 Start",
        "excerpt":"환경 Visual Studio 19, UE4 4.26 Test Code 파일 VisualStudio Tip 단축키 Ctrl + - =&gt; 10줄 이내의 이전 위치로 이동 (같은 파일, 다른 파일 모두) Ctrl + Shift + - =&gt; 10줄 이내의 이후 위취로 이동 (같은 파일, 다른 파일 모두) Ctrl + W =&gt; 한 단어 드래그 Ctrl...","categories": ["Posts","Book","UE4-Scripting-with-C++-Cookbook"],
        "tags": ["UE4","Vistual Studio"],
        "url": "/posts/book/ue4-scripting-with-c++-cookbook/ch01-Start/",
        "teaser": null
      },{
        "title": "ch02 Class 및 마크업",
        "excerpt":"UClass native c++ 클래스와 다른점 에디터와 통신할 수 있으며 BP 로 생성도 가능함. UE4 의 메모리 관리 루틴을 따라서 별도의 메모리를 관리할 필요가 없음. 이름규칙 UObject 에서 파생된 클래스는 무조건 앞에 U 가 붙어야함. 이 중에 AActor 를 상속받는 경우 A 가 붙어야함. UEnum, UStruct 같은 경우는 강제받지 않지만 F...","categories": ["Posts","Book","UE4-Scripting-with-C++-Cookbook"],
        "tags": ["UE4","Vistual Studio"],
        "url": "/posts/book/ue4-scripting-with-c++-cookbook/ch02-Class-%EB%B0%8F-%EB%A7%88%ED%81%AC%EC%97%85/",
        "teaser": null
      },{
        "title": "ch03 Memory",
        "excerpt":"GC 언리얼 위키, 꼭 읽기 원리 Reference Graph 를 주기적으로 탐색해 메모리를 지움. Reference 에 잡는 법은 아래의 3가지 방법으로 1번째 방법으로 왠만한 경우가 해결 됨. UPROPERTY 로 잡은__,__ 포인터, static array(int a[10] 같은거) 또는 UE4 가 제공하는 컨테이너(TARRAY 같은거 ) UObject::AddReferencedObjects 의 오버라이드로 추가 Actor-Component 가 이걸로 기본으로 등록됨...","categories": ["Posts","Book","UE4-Scripting-with-C++-Cookbook"],
        "tags": ["UE4","Vistual Studio"],
        "url": "/posts/book/ue4-scripting-with-c++-cookbook/ch03-Memory/",
        "teaser": null
      },{
        "title": "ch04 Actor",
        "excerpt":"Actor   끄기   { \tSetActorTickEnabled(false); \tSetActorHiddenInGame(true); \tSetActorEnableCollision(false); }  Life Cycle     UE4 문서   Begin Play      AnimInstance 와 Actor 의 비교            전자가 BeginPlay 가 먼저 호출되는 듯. (이런경우를 확인은 해봤는데 무조건인지는 모름)           ","categories": ["Posts","Book","UE4-Scripting-with-C++-Cookbook"],
        "tags": ["UE4","Vistual Studio"],
        "url": "/posts/book/ue4-scripting-with-c++-cookbook/ch04-Actor/",
        "teaser": null
      },{
        "title": "ch05 Delegate",
        "excerpt":"Delegate 설명 공식문서 UE4 Delegate Guide 간략한 정리 this pointer 를 넣어서 Per-Instance 구현이 가능함 코드 void AEX_Actor_Object::BeginPlay() { Super::BeginPlay(); OnDelegateEx.BindUObject(this, &amp;AEX_Actor_Object::PrintLog); static NativeCPP native_class; OnDelegateMultiEx.AddUFunction(this, \"PrintLog\"); OnDelegateMultiEx.AddStatic(&amp;NativeCPP::PrintStaticLog); OnDelegateMultiEx.AddRaw(&amp;native_class, &amp;NativeCPP::PrintLog); OnDelegateDynamicEx.BindUFunction(this, \"PrintLog\"); OnDelegateMultiDynamicEx.AddDynamic(this, &amp;AEX_Actor_Object::PrintLog); FTimerDelegate on_sec = FTimerDelegate::CreateLambda([&amp;]() { PFCPP::Log(\"Delegate On\"); OnDelegateEx.ExecuteIfBound(); PFCPP::Log(\"Delegate Dynamic On\"); OnDelegateDynamicEx.ExecuteIfBound(); PFCPP::Log(\"Delegate Multi On\"); OnDelegateMultiEx.Broadcast();...","categories": ["Posts","Book","UE4-Scripting-with-C++-Cookbook"],
        "tags": ["UE4","Vistual Studio"],
        "url": "/posts/book/ue4-scripting-with-c++-cookbook/ch05-Delegate/",
        "teaser": null
      },{
        "title": "ch06 ,07 Input Interface",
        "excerpt":"Mapping UPlayerInput::AddEngineDefinedAxisMapping(FInputAxisKeyMapping(\"MoveRight\", EKeys::Left)); UPlayerInput::AddEngineDefinedAxisMapping(FInputAxisKeyMapping(\"MoveUp\", EKeys::Up)); UPlayerInput::AddEngineDefinedActionMapping(FInputActionKeyMapping(\"LeftClick\", EKeys::RightMouseButton)); 프로젝트 설정에서도 할 수 있고 코드로는 UPlayerInput 을 들고와서 함. 매핑을 위해서PlayerController 에서 UPlayerInput 를 들고와서 개개별로 매핑할 수 있고, 전역함수로 있는 Engine 붙은 함수를 바로 쓸 수도 있음. Interface 언리얼 위키 2등분 Interface 의 Interface 상속시 각각 처리해줘야함. UInterface UHT 로 리플렉션...","categories": ["Posts","Book","UE4-Scripting-with-C++-Cookbook"],
        "tags": ["UE4","Vistual Studio"],
        "url": "/posts/book/ue4-scripting-with-c++-cookbook/ch06-,07-Input-Interface/",
        "teaser": null
      },{
        "title": "ch08 Editor 1",
        "excerpt":"Editor 에서 값 변경시 자동 호출되는 함수 Property Change void AEX_Actor_Object::PostEditChangeProperty(FPropertyChangedEvent&amp; PropertyChangedEvent) { Super::PostEditChangeProperty(PropertyChangedEvent); if (!!PropertyChangedEvent.Property) { const FName name(PropertyChangedEvent.Property-&gt;GetName()); if (name == GET_MEMBER_NAME_CHECKED(AEX_Actor_Object, my_array)) { PFCPP::Print(my_array[0]); } } } 에디터에서 값 변경시 위 함수가 호출됨. Super 쪽의 호출을 생략시 이 함수만 호출되고 끝나고. 아니면 OnConstruction 와 BP 라면 ConstructScript...","categories": ["Posts","Book","UE4-Scripting-with-C++-Cookbook"],
        "tags": ["UE4","Vistual Studio"],
        "url": "/posts/book/ue4-scripting-with-c++-cookbook/ch08-Editor-1/",
        "teaser": null
      },{
        "title": "ch08 Editor 2",
        "excerpt":"모듈 모듈구축 아래는 책대로 에디터용 모듈을 만드는 목적임. 참고하면 좋은 블로그 .UProject \"Modules\": [ { \"Name\": \"Example\", \"Type\": \"Runtime\", \"LoadingPhase\": \"Default\", \"AdditionalDependencies\": [ \"Engine\" ] }, { \"Name\": \"ExampleEditor\", \"Type\": \"Editor\", \"LoadingPhase\": \"PostEngineInit\", \"AdditionalDependencies\": [ \"Engine\", \"CoreUObject\" ] } ] json 으로 작성되었으며, “Modules” 객체에 모듈을 위처럼 추가하면 됨. Type...","categories": ["Posts","Book","UE4-Scripting-with-C++-Cookbook"],
        "tags": ["UE4","Vistual Studio"],
        "url": "/posts/book/ue4-scripting-with-c++-cookbook/ch08-Editor-2/",
        "teaser": null
      },{
        "title": "BOJ 1107) 리모콘",
        "excerpt":"BruteForce 문제 사이트 코드 bool bTrash[10]; int Base(int c) { int r = 0; while (c &gt; 0) { c /= 10; r++; } return max(r, 1); } bool Able(int c) { if (c &lt; 0) return false; if (c == 0) return !bTrash[0]; while (c &gt; 0) { if...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. BruteForce"],
        "url": "/posts/algorithm/boj-gold/BOJ-1107)-%EB%A6%AC%EB%AA%A8%EC%BD%98/",
        "teaser": null
      },{
        "title": "BOJ 1167) 트리의지름",
        "excerpt":"GraphTheory 문제 사이트 코드 struct Line { int to, w; }; vector&lt;Line&gt; lines[100001]; int farest_idx, farest_weight; void DFS(int cur, int from, int weight = 0) { for (auto line : lines[cur]) { if (line.to == from) continue; DFS(line.to, cur, weight+line.w); } if (lines[cur].size() == 1) { if (farest_weight &lt; weight)...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. DFS"],
        "url": "/posts/algorithm/boj-gold/BOJ-1167)-%ED%8A%B8%EB%A6%AC%EC%9D%98%EC%A7%80%EB%A6%84/",
        "teaser": null
      },{
        "title": "BOJ 1201) NMK",
        "excerpt":"LIS, LDS 만들기 문제 사이트 코드 int main() { fastio; int n, m, k; cin &gt;&gt; n &gt;&gt; m &gt;&gt; k; if (n &lt; m + k - 1 || n &gt; m * k ) { cout &lt;&lt; -1; return 0; } vector&lt;deque&lt;int&gt;&gt; parts(m); int cur = 1; for...","categories": ["Posts","Algorithm","BOJ-Platinum"],
        "tags": ["PS. Constructive"],
        "url": "/posts/algorithm/boj-platinum/BOJ-1201)-NMK/",
        "teaser": null
      },{
        "title": "ch09 UI",
        "excerpt":"HUD head up display 의 줄임로 UI 가 여기에 렌더링되어서 게임 화면과 합쳐짐. AGameMode 에서 사용할 HUD 클래스를 지정할 수 있음. 이렇게 지정한 클래스는 게임 시작시 AGameMode 가 인스턴스를 하나 만듬 Player 는 이 인스턴스를 관리할 수 있음 내부에 UCanvas 가 있으며 HUD 의 UCanvas 는 PostRender() 후에 렌더링 됨....","categories": ["Posts","Book","UE4-Scripting-with-C++-Cookbook"],
        "tags": ["UE4","Vistual Studio"],
        "url": "/posts/book/ue4-scripting-with-c++-cookbook/ch09-UI/",
        "teaser": null
      },{
        "title": "ch10 AI",
        "excerpt":"Navi Mesh 확인하기 위해선 P 누르면 영역이 표시됨 AIMoveTo 는 Navi Mesh 를 사용하며 불가능하면 움직이지 않음 Behavior Tree Node Task 성공했는지에 따라 bool 값을 반듯이 리턴해야함 BPTask_BlueprintBase 를 상속해 사용 FinishExecution() 노드 등으로 가능 세가지의 명확한 이벤트를 가지며 AI 버전과 아닌버전이 있는데 보통 AI 버전을 씀 Receive Tick GameEngine...","categories": ["Posts","Book","UE4-Scripting-with-C++-Cookbook"],
        "tags": ["UE4","Vistual Studio"],
        "url": "/posts/book/ue4-scripting-with-c++-cookbook/ch10-AI/",
        "teaser": null
      },{
        "title": "ch11 Material",
        "excerpt":"Material   Shader 가 UE4 에선 Material 임   Vertex-Pragment Pipline 을 Block-Programming 가능 함수로 추상화 되어서 변하게 사용가능   Custom   아무데나 오른쪽 클릭 해서  Custom 누르고 Code 에 HLSL 코드를 바로 박을 수 있음   Material Function   Expose To Library 로 함수 라이브러리에 사용자 지정 함수를 표시 가능   Shader Parameter   ","categories": ["Posts","Book","UE4-Scripting-with-C++-Cookbook"],
        "tags": ["UE4","Vistual Studio"],
        "url": "/posts/book/ue4-scripting-with-c++-cookbook/ch11-Material/",
        "teaser": null
      },{
        "title": "유튜브 무료음악 괜찮은거",
        "excerpt":"기승전결 있음   CLUB - Andrew Huang     특히 후반부 하이라이트 좋음   BGM 용   Smile - Slynk   Enchantée feat. Mr Stabalina - Slynk     뭔가 설명할 때 괜찮음  ","categories": ["Posts","Memo"],
        "tags": [],
        "url": "/posts/memo/%EC%9C%A0%ED%8A%9C%EB%B8%8C-%EB%AC%B4%EB%A3%8C%EC%9D%8C%EC%95%85-%EA%B4%9C%EC%B0%AE%EC%9D%80%EA%B1%B0/",
        "teaser": null
      },{
        "title": "Thread Asynchronize",
        "excerpt":"Process(Task) 실행 중인 Program 운영체제 상, Process 간에는 직접적 메모리 공유가 불가능하게 되어 있음. IPC(Inter Process Communication) 을 통한 간접적 통신 Kernel 에 요청한 Shared Memory 를 사용한 통신. Thread Process 내에서 함수 단위로 쪼개짐. Thread 간에서 공유되지 않는 것. Register Stack Memory / Stack Pointer Program Counter Memeory 등...","categories": ["Posts","OS"],
        "tags": ["c++","os"],
        "url": "/posts/os/Thread-Asynchronize/",
        "teaser": null
      },{
        "title": "Reflection",
        "excerpt":"Reflection CompileTime 이 아니라 Runtime 에서 Program 의 구조를 읽고 사용할 수 있는 기능. 추상화가 된 클래스 간의 동작을 처리하는 Framework 가 외부 모듈에서 구현된 Class 를 사용하고자 할 때 많이 쓰임. 객체 A 가 B 의 부모클래스인가? 처럼 정적으로 해결할 수 없고 다형성으로도 해결할 수 없는 문제는 Reflection 이...","categories": ["Posts","c++"],
        "tags": ["c++"],
        "url": "/posts/c++/Reflection/",
        "teaser": null
      },{
        "title": "Static, Global Variables",
        "excerpt":"Initializations 기본적 개념 정적 변수 초기화의 안정성에 대해서 정적 변수의 초기화에 대해서 전역 혹은 정적 변수가 저장되는 영역 - Data - Data 영역은 3가지로 나뉨 참고 .rodata 읽기 전용으로 상수 문자열, 상수 리터럴 등이 저장됨 .data 초기화 된 값들이 저장되는 영역 exe 파일에 실행 이미지가 저장되어 프로세스 시작시 복사됨 .bss(Blocked...","categories": ["Posts","c++"],
        "tags": ["c++"],
        "url": "/posts/c++/Static,-Global-Variables/",
        "teaser": null
      },{
        "title": "Root Find Algorithms",
        "excerpt":"Root Find Algorithms 가능한 알고리즘 참고 Durand-Kerner Method 위키 방법은 Newton’s Method 의 연장으로, 다항식의 계수를 업데이트 하는 방법임 위키에 있는걸 간략하게만 정리하면 다항식 \\(F(X)\\) 가 주어질 때, \\(G_Z(X) = (x_1 - z_1)(x_2 - z_2)...(x_n - z_n)\\) 를 만듦 \\(F(X) = G_Z(X)\\) 가 만족하려면 X 에 대한 계수가 서로 같아야함....","categories": ["Posts","Math"],
        "tags": [],
        "url": "/posts/math/Root-Find-Algorithms/",
        "teaser": null
      },{
        "title": "MMD",
        "excerpt":"MMD 가져오는 법 리타게팅 본 리스트 리타게팅을 할 때 주의해야할 점은 Retagetting 옵션에서 Animation 의 Translate 를 사용하면 안된다는 것임. 대신 Skeletal Tree -&gt; Options -&gt; Show Retargetting Option 에서 Skeletal 을 쓰면 됨 Collision 기반으로 옷을 움직이려면 PhysicsAsset 에서 Collide 선택하고 위의 Enable Collision 을 체크해야지 자기들 끼리 부딪힘...","categories": ["Posts","UE4"],
        "tags": ["UE4"],
        "url": "/posts/ue4/MMD/",
        "teaser": null
      },{
        "title": "BOJ 3584) LCA",
        "excerpt":"Nearest Common Ancester 문제 사이트 코드 int lines[50001]; int main() { fastio; int t; cin &gt;&gt; t; while (t--) { int n, tmp1, tmp2; cin &gt;&gt; n; fill(lines, lines + n + 1, 0); for (int i = 0; i &lt; n - 1; i++) { cin &gt;&gt; tmp1 &gt;&gt;...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. LCA"],
        "url": "/posts/algorithm/boj-gold/BOJ-3584)-LCA/",
        "teaser": null
      },{
        "title": "BOJ 11438) LCA",
        "excerpt":"LCA 문제 사이트 코드 struct Node { vector&lt;int&gt; childs; int height = 0; }; #define MAX_SIZE 100001 Node nodes[MAX_SIZE]; int parentTB[MAX_SIZE][20]; int depthTB[MAX_SIZE]; void DFS(int cur, int parent, int height = 0) { auto cur_node = &amp;nodes[cur]; cur_node-&gt;height = height; // Distinguish for (int i = 0; i &lt; cur_node-&gt;childs.size();...","categories": ["Posts","Algorithm","BOJ-Platinum"],
        "tags": ["PS. LCA"],
        "url": "/posts/algorithm/boj-platinum/BOJ-11438)-LCA/",
        "teaser": null
      },{
        "title": "BOJ 2618) 경찰차",
        "excerpt":"DP 문제 사이트 방법 0 Gridy 방법으로 푸는 방법은 통하지 않음. 왜냐하면 경찰차 둘로부터 거리가 같은 경우 어느걸 먼저 선택할지 정할 수 없어서 모두 고려해야하기 때문임. 방법 1 코드 #define INT_MAX 200000000 struct LOC { LOC() : x(0), y(0) {} LOC(int x, int y) : x(x), y(y) {} int x,...","categories": ["Posts","Algorithm","BOJ-Platinum"],
        "tags": ["PS. DP"],
        "url": "/posts/algorithm/boj-platinum/BOJ-2618)-%EA%B2%BD%EC%B0%B0%EC%B0%A8/",
        "teaser": null
      },{
        "title": "World Machine",
        "excerpt":"World Machine 다운 다운로드 링크 간단한 생성 방법 Project-&gt;Project Setting 여기서 중요한 것은 Resolution 어떤게 되는지는 언리얼 공식 문서 Node 기반으로 맨 아래쪽 툴바에도 있고, 맨 위의 툴바의 Devices 이하들이 전부 노드임 기본으로 넣어둔 Advanced Perlin, Curves, Erosion 으로 기본적인것 가능. Advanced Perlin 기본 랜덤 생성기로 Ctrl + R 로...","categories": ["Posts","UE4"],
        "tags": ["UE4"],
        "url": "/posts/ue4/World-Machine/",
        "teaser": null
      },{
        "title": "BOJ 13164) 행복유치원",
        "excerpt":"문제 문제 사이트 코드 int n, k, arr[300001]; map&lt;int, int&gt; dist_map; int main() { fastio; cin &gt;&gt; n &gt;&gt; k; int tmp1, tmp2; cin &gt;&gt; tmp1; for (int i = 1; i &lt; n; i++) { cin &gt;&gt; tmp2; dist_map[tmp2 - tmp1]++; tmp1 = tmp2; } int ans = 0;...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. Griddy"],
        "url": "/posts/algorithm/boj-gold/BOJ-13164)-%ED%96%89%EB%B3%B5%EC%9C%A0%EC%B9%98%EC%9B%90/",
        "teaser": null
      },{
        "title": "BOJ 20543) 폭탄 던지는 태영이",
        "excerpt":"문제 문제 사이트 코드 using INT = int64_t; int n, m; INT board[2001 * 2001]; INT ans[2001 * 2001]; int main() { cin &gt;&gt; n &gt;&gt; m; for (int y = 0; y &lt; n; y++) for (int x = 0; x &lt; n; x++) cin &gt;&gt; board[n * y...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. Griddy"],
        "url": "/posts/algorithm/boj-gold/BOJ-20543)-%ED%8F%AD%ED%83%84-%EB%8D%98%EC%A7%80%EB%8A%94-%ED%83%9C%EC%98%81%EC%9D%B4/",
        "teaser": null
      },{
        "title": "BOJ 16928) 뱀과 사다리 게임",
        "excerpt":"문제 문제 사이트 코드 struct LINE { bool operator&lt;(const LINE&amp; in) { return from &lt; in.from; } friend bool operator&lt;(const LINE&amp; a, const LINE&amp; b) { return a.from &lt; b.from; } int from, to; }; LINE lines[61]; bool check[101]; int main() { fastio; int n, m, tmp1, tmp2; cin &gt;&gt;...","categories": ["Posts","Algorithm","BOJ-Silver"],
        "tags": ["PS. BFS"],
        "url": "/posts/algorithm/boj-silver/BOJ-16928)-%EB%B1%80%EA%B3%BC-%EC%82%AC%EB%8B%A4%EB%A6%AC-%EA%B2%8C%EC%9E%84/",
        "teaser": null
      },{
        "title": "BOJ 10982) 행운쿠키 제작소",
        "excerpt":"문제 문제 사이트 코드 pair&lt;int, int&gt; cookies[1001]; int dp[100001]; int main() { int t, n, ans; cin &gt;&gt; t; while (t--) { fill(dp, dp + 100001, 0); cin &gt;&gt; n; for (int i = 0; i &lt; n; i++) cin &gt;&gt; cookies[i].first &gt;&gt; cookies[i].second; int sum = 0; for (int...","categories": ["Posts","Algorithm","BOJ-Platinum"],
        "tags": ["PS. DP"],
        "url": "/posts/algorithm/boj-platinum/BOJ-10982)-%ED%96%89%EC%9A%B4%EC%BF%A0%ED%82%A4-%EC%A0%9C%EC%9E%91%EC%86%8C/",
        "teaser": null
      },{
        "title": "BOJ 11048) 이동하기",
        "excerpt":"문제 문제 사이트 코드 int n, m; int board[1001][1001]; int dp[1001][1001]; int main() { fastio; cin &gt;&gt; n &gt;&gt; m; for (int i = 0; i &lt; n; i++) for (int j = 0; j &lt; m; j++) cin &gt;&gt; board[i][j]; dp[0][0] = board[0][0]; for (int i = 1; i...","categories": ["Posts","Algorithm","BOJ-Silver"],
        "tags": [],
        "url": "/posts/algorithm/boj-silver/BOJ-11048)-%EC%9D%B4%EB%8F%99%ED%95%98%EA%B8%B0/",
        "teaser": null
      },{
        "title": "BOJ 18045) Frogs",
        "excerpt":"문제 문제 사이트 코드 struct Frog { int r, s; }; Frog frogs[200001]; vector&lt;int&gt; startTB[200001], endTB[200001]; int n; int main() { int t, tmp1, tmp2; cin &gt;&gt; t; while (t--) { cin &gt;&gt; n; for (int i = 0; i &lt; n; i++) { startTB[i].clear(); endTB[i].clear(); } for (int i...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. Sweeping"],
        "url": "/posts/algorithm/boj-gold/BOJ-18045)-Frogs/",
        "teaser": null
      },{
        "title": "BOJ 1389) 케빈베이컨의 6단계 법칙",
        "excerpt":"문제 문제 사이트 코드 int dp[101][101]; int main() { fastio; int n, m, t1, t2; cin &gt;&gt; n &gt;&gt; m; // Self : 0, No Weighted Link : 1, No Link : INF fill(dp[0], dp[100] + 101, 1000000); for (int i = 1; i &lt;= n; i++) dp[i][i] = 0;...","categories": ["Posts","Algorithm","BOJ-Silver"],
        "tags": ["PS. Floyd-Warshall"],
        "url": "/posts/algorithm/boj-silver/BOJ-1389)-%EC%BC%80%EB%B9%88%EB%B2%A0%EC%9D%B4%EC%BB%A8%EC%9D%98-6%EB%8B%A8%EA%B3%84-%EB%B2%95%EC%B9%99/",
        "teaser": null
      },{
        "title": "BOJ 2805) EKO",
        "excerpt":"문제 문제 사이트 방법 1 코드 long long arr[1000001]; int n, m; long long Calc(long long h) { long long ans = 0; for (int i = 0; i &lt; n; i++) ans += max(arr[i] - h, 0ll); return ans; } int main() { fastio; cin &gt;&gt; n &gt;&gt; m;...","categories": ["Posts","Algorithm","BOJ-Silver"],
        "tags": ["PS. Sweeping","PS. BinarySearch"],
        "url": "/posts/algorithm/boj-silver/BOJ-2805)-EKO/",
        "teaser": null
      },{
        "title": "BOJ 3164) pruge",
        "excerpt":"문제 문제 사이트 코드 using INT = int64_t; int main() { fastio; pair&lt;INT, INT&gt; lb, rt; cin &gt;&gt; lb.first &gt;&gt; lb.second &gt;&gt; rt.first &gt;&gt; rt.second; INT ans = 0, max_lb = max(lb.first, lb.second), min_rt = min(rt.first, rt.second); bool b_sq_start = max_lb % 2 == 1; bool b_sq_end = min_rt %...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. 능지"],
        "url": "/posts/algorithm/boj-gold/BOJ-3164)-pruge/",
        "teaser": null
      },{
        "title": "BOJ 3973) TTL",
        "excerpt":"문제 문제 사이트 코드 int n; vector&lt;int&gt; lines[100001]; int cost, ans, tmp; int DFS(int cur, int parent, int local_max_cost = 0) { auto node = &amp;lines[cur]; int max_1 = 0, max_2 = 0, base = cost; for (int c : *node) { if (c == parent) continue; cost += 1;...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. DFS"],
        "url": "/posts/algorithm/boj-gold/BOJ-3973)-TTL/",
        "teaser": null
      },{
        "title": "BOJ 2243) 사탕상자",
        "excerpt":"문제 문제 사이트 코드 template&lt;typename T, size_t _Size&gt; class SegmentTree { template&lt;typename F&gt; struct Node { Node() : v(0) {} Node(F v) : v(v) {} Node operator+(const Node&amp; in) { return v + in.v; } F v = 0; }; public: void Init(int s, int e) { _s = s;...","categories": ["Posts","Algorithm","BOJ-Platinum"],
        "tags": ["PS. Segment Tree"],
        "url": "/posts/algorithm/boj-platinum/BOJ-2243)-%EC%82%AC%ED%83%95%EC%83%81%EC%9E%90/",
        "teaser": null
      },{
        "title": "BOJ 1695) 펠린드롬 만들기",
        "excerpt":"문제 문제 사이트 코드 int arr[5001], dp1[5001], dp2[5001], dp3[5001]; int main() { int n; cin &gt;&gt; n; for (int i = 0; i &lt; n; i++) cin &gt;&gt; arr[i]; for (int i = 0; i &lt; n - 1; i++) dp1[i] = arr[i] != arr[i + 1]; for (int i...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. DP"],
        "url": "/posts/algorithm/boj-gold/BOJ-1695)-%ED%8E%A0%EB%A6%B0%EB%93%9C%EB%A1%AC-%EB%A7%8C%EB%93%A4%EA%B8%B0/",
        "teaser": null
      },{
        "title": "BOJ 2098) 외판원문제",
        "excerpt":"문제 문제 사이트 코드 int n, arr[16][16]; bitset&lt;16&gt; visits; int cost; int dp[16][65537]; int DFS(int cur) { if (visits.count() == n) return arr[cur][0] &gt; 0 ? cost + arr[cur][0] : 50000000; if (dp[cur][visits.to_ulong()] &gt; 0) return dp[cur][visits.to_ulong()] + cost; int local_min = 50000000; for (int i = 0; i &lt;...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. DP"],
        "url": "/posts/algorithm/boj-gold/BOJ-2098)-%EC%99%B8%ED%8C%90%EC%9B%90%EB%AC%B8%EC%A0%9C/",
        "teaser": null
      },{
        "title": "BOJ 1849) Permutation Recovery",
        "excerpt":"문제 문제 사이트 코드 template&lt;typename T, size_t _Size&gt; class SegmentTree { template&lt;typename F&gt; struct Node { Node() : v(0) {} Node(F v) : v(v) {} Node operator+(const Node&amp; in) { return v + in.v; } F v = 0; }; public: void Init(int s, int e) { _s = s;...","categories": ["Posts","Algorithm","BOJ-Platinum"],
        "tags": ["PS. Segment Tree"],
        "url": "/posts/algorithm/boj-platinum/BOJ-1849)-Permutation-Recovery/",
        "teaser": null
      },{
        "title": "BOJ 4375) Ones",
        "excerpt":"문제 문제 사이트 코드 int main() { int x, t, cnt; while (1) { cin &gt;&gt; x;; if (cin.eof()) break; if (x == 1) { cout &lt;&lt; \"1\\n\"; continue; } cnt = t = 1; while (t) { t = t * 10 + 1; t %= x; cnt++; }...","categories": ["Posts","Algorithm","BOJ-Silver"],
        "tags": ["PS. 정수론"],
        "url": "/posts/algorithm/boj-silver/BOJ-4375)-Ones/",
        "teaser": null
      },{
        "title": "BOJ 17425) 약수의 합",
        "excerpt":"문제 문제 사이트 코드 #include &lt;bits/stdc++.h&gt; using namespace std; long long f[1000001]; long long g[1000001]; int main() { cin.tie(0)-&gt;ios::sync_with_stdio(0); cout.tie(0); setvbuf(stdout, nullptr, _IOFBF, BUFSIZ); const int MAX = 1000000; for (int j = 1; j &lt;= MAX; j++) for (int i = 1; i*j &lt;= MAX; i++) f[i*j] += i;...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. 정수론"],
        "url": "/posts/algorithm/boj-gold/BOJ-17425)-%EC%95%BD%EC%88%98%EC%9D%98-%ED%95%A9/",
        "teaser": null
      },{
        "title": "Modular Assets Weird Shadow",
        "excerpt":"문제 원인 모듈식 어셋(벽이 여러 파트로 쪼개져서 하나의 벽을 이룬다거나)에서 각 모듈들이 각각 쉐도우를 가지면서 생기는 일. 증상 구글링을 해보면 Unreal 공식에서는 공식적인 해결법은 제시하지 않았고 모듈식을 쓰지 말라는 느낌인 듯. 해결법 해결법 1 쉐도우 맵을 자사하게 만들어서 해결함 빌드시간이 진짜 오래걸림 해결법 2 Dynamic Lighting 만 쓰기 World Setting...","categories": ["Posts","UE4"],
        "tags": ["UE4"],
        "url": "/posts/ue4/Modular-Assets-Weird-Shadow/",
        "teaser": null
      },{
        "title": "Advanced Locomotion System 1",
        "excerpt":"개요 다운링크 자연스러운 동작변환, 계단 등에 적용되는 Foot IK, 등의 튜토리얼이 되는 프로젝트임. 렉돌 등 몇몇 부분은 뺀, 나의 포폴에 적용하기 위한 부분들을 여기에 정리할 것임. 사용되는 값 외울 필요는 없고 레퍼런스 용임. 적당히 알아볼 수 있게 약자화 했으니 주의, OOO Values 로 함께 업데이트 되는 변수를을 그룹화 했음. Anim...","categories": ["Posts","UE4","ALS"],
        "tags": ["UE4"],
        "url": "/posts/ue4/als/Advanced-Locomotion-System-1/",
        "teaser": null
      },{
        "title": "Advanced Locomotion System 2",
        "excerpt":"Base Layer Locomotion Cycle Animatioin Asset Direction Animation (Blend Space) 바라보는 방향에 따라 3종류, 앞뒤로 2종류로 총 6개의 BS 가 필요함. 2가지 축으로 Stide(0~1) 와 Walk/Run(0, 1) 이 들어감 Walk / Run 은 보간을 위한게 아니라 한번에 처리하기 위함임 Stride 로 Walk 와 Run 의 속도에 따른 보간을 독립적으로 실행하게...","categories": ["Posts","UE4","ALS"],
        "tags": ["UE4"],
        "url": "/posts/ue4/als/Advanced-Locomotion-System-2/",
        "teaser": null
      },{
        "title": "Advanced Locomotion System 3",
        "excerpt":"Base Layer Grounded State Anim Assets Roll 등 땅에서 움직이는 Anim Montage Notify 로 끝나는 부분에서 EntryMode 를 바꿔줘야함 Used Value struct GroundedEntryState { Idle, Roll } Grounded States 에서 Montage 가 끝나고 다시 Machine States 가 돌 때 어디로 갈지 판단할 때 쓰임. 설명 Grounded 에서 Montage 가 돌아가는...","categories": ["Posts","UE4","ALS"],
        "tags": ["UE4"],
        "url": "/posts/ue4/als/Advanced-Locomotion-System-3/",
        "teaser": null
      },{
        "title": "Advanced Locomotion System 4",
        "excerpt":"Overlay Layer 전략 Outlay Layer 에서는 어떤 무기를 들거나 했을 때 Base_N(CLF) 를 기반으로 한 Base Layer 을 유지하면서 특정부위만 보정하는 것을 원함. 이를 위한 Animation 은 3가지가 필요함 Base_N(CLF) 기반의 Base Layer Base_N(CLF) Base_N 에 원하는 부위만 수정시킨 Animation 그리고 Dynamic Addictive 를 구함 (Base Layer - Base_N(CLF) 이때...","categories": ["Posts","UE4","ALS"],
        "tags": ["UE4"],
        "url": "/posts/ue4/als/Advanced-Locomotion-System-4/",
        "teaser": null
      },{
        "title": "BOJ 14912) 숫자 빈도수   コピー",
        "excerpt":"문제 문제 사이트 코드 int NthNum(int x, int th) { int t = 1; while (th-- &gt; 1) t *= 10; return (x / t) % 10; } int main() { int a, b, ans = 0; cin &gt;&gt; a &gt;&gt; b; for (int i = 1, cnt = 1;...","categories": ["Posts","Algorithm","BOJ-Silver"],
        "tags": ["PS. BruteForce"],
        "url": "/posts/algorithm/boj-silver/BOJ-14912)-%EC%88%AB%EC%9E%90-%EB%B9%88%EB%8F%84%EC%88%98-%E3%82%B3%E3%83%94%E3%83%BC/",
        "teaser": null
      },{
        "title": "BOJ 2110) 공유기 설치",
        "excerpt":"문제 문제 사이트 코드 int n, m; int arr[200001]; int Count(int l) { int cnt = 1, cur = arr[0]; for (int i = 1; i &lt; n; i++) { if (arr[i] - cur &lt; l) continue; cur = arr[i]; cnt++; } return cnt; } int main() { cin &gt;&gt;...","categories": ["Posts","Algorithm","BOJ-Silver"],
        "tags": ["PS. BinarySearch"],
        "url": "/posts/algorithm/boj-silver/BOJ-2110)-%EA%B3%B5%EC%9C%A0%EA%B8%B0-%EC%84%A4%EC%B9%98/",
        "teaser": null
      },{
        "title": "UE4 Tips",
        "excerpt":"Engine Asset Engine Icon Directory C:\\Program Files\\Epic Games\\UE_4.26\\Engine\\Content\\Editor\\Slate\\Icons Asset Curve 에서 루프 돌리는 법 오른 쪽 위의 key 속성 지정하는 툴바에서 “Choose how the curve is evaluated if sampled before the first key” 라고 Tooltip 이 뜨는 버튼에서 조정 Game Blueprint Delay Node 내부적으로 Timer 로 변환됨. Animation, Rendering 등은...","categories": ["Posts","UE4"],
        "tags": ["UE4"],
        "url": "/posts/ue4/UE4-Tips/",
        "teaser": null
      },{
        "title": "BOJ 10258) Switch Array",
        "excerpt":"문제 문제 사이트 코드 using INT = int64_t; int main() { fastio; int t; scanf(\"%d\\n\", &amp;t); while (t--) { char tmp; deque&lt;bool&gt; cur; while (1) { scanf(\"%c\", &amp;tmp); if (tmp == '\\n') break; cur.push_back(tmp == '1'); } INT ans = 0; bool bToggle = true; for (int i = 0;...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. 능지"],
        "url": "/posts/algorithm/boj-gold/BOJ-10258)-Switch-Array/",
        "teaser": null
      },{
        "title": "Gameplay Debugger",
        "excerpt":"GamePlay Debugger 설명 Gameplay 중에 ' 를 누르면 뜨는 Gameplay Debugger 를 편집하는 법 구현 // .h class EX_API FCustomDebugger : public FGameplayDebuggerCategory { public: FCustomDebugger(); ~FCustomDebugger(); public: virtual void CollectData(APlayerController* OwnerPC, AActor* DebugActor) override; virtual void DrawData(APlayerController* OwnerPC, FGameplayDebuggerCanvasContext&amp; CanvasContext) override; private: FCanvasLineItem item_line; FCanvasNGonItem item_ngon = FCanvasNGonItem(FVector2D(), FVector2D(5,...","categories": ["Posts","UE4"],
        "tags": ["UE4"],
        "url": "/posts/ue4/Gameplay-Debugger/",
        "teaser": null
      },{
        "title": "Template Variadic Arguments",
        "excerpt":"가변인자 템플릿 코드 class AAA { public: template&lt;typename... Args&gt; AAA(Args const&amp;... args) : aaa{ args... } { for (int a : aaa) cout &lt;&lt; a &lt;&lt; ' '; cout &lt;&lt; '\\n'; } template&lt;typename T, typename... Args&gt; auto Print(T const&amp; arg, Args const&amp;... args) { if constexpr(std::conjunction_v&lt;std::is_same&lt;T, Args&gt;...&gt;) //if constexpr ((std::is_same_v&lt;T,...","categories": ["Posts","c++"],
        "tags": ["c++","thread"],
        "url": "/posts/c++/Template-Variadic-Arguments/",
        "teaser": null
      },{
        "title": "ProjectileMovement And HitEvent",
        "excerpt":"Root 와 Collision      Root 가 Collision 이 아니면 나머지 Component 의 HIt Event 가 거의 발생하지 않음   SetUpdatedComponent 를 이용해 Projectile 이 이동하는 Component 를 설정하면 HIt Event 는 발생하지만 Root 의 위치는 유지되기 때문에 완벽한 해결방안은 아님.  ","categories": ["Posts","UE4"],
        "tags": ["UE4"],
        "url": "/posts/ue4/ProjectileMovement-And-HitEvent/",
        "teaser": null
      },{
        "title": "Slate Tip",
        "excerpt":"Style 찾기 SAssignNew(ComboButton, SComboButton) .ButtonStyle( FEditorStyle::Get(), \"PropertyEditor.AssetComboStyle\" ) .ForegroundColor(FEditorStyle::GetColor(\"PropertyEditor.AssetName.ColorAndOpacity\")) 위와 같은 Style 은 구글링해도 안나오고 다음과 같은 방법을 통해 찾아야한다. Window -&gt; DeveloperTools -&gt; Widget Reflector 를 켠다. Pick Hit-Testable Widgets 을 통해 원하는 스타일을 가진 위젯에 커서를 옮기고 Esc 를 누른다. WidgetName 이 Tree 에 밀리면 Filter 를 통해...","categories": ["Posts","UE4"],
        "tags": ["UE4"],
        "url": "/posts/ue4/Slate-Tip/",
        "teaser": null
      },{
        "title": "Quaternion 개념",
        "excerpt":"Complex Number 잘 정리된 블로그 복소수의 성질 복소수의 덧셈과 뻴셈 은 벡터의 계산과 같음(벡터가 여기서 온 것) 복소수의 곱셈과 나눗셈 은 극좌표를 통해서 이해할 수 있음 복소수 \\(x = a + ib\\) 가 있을 때 절댓값 \\(r\\) 과 편각 \\(\\theta\\) 을 통해 나타내면 \\(x = r(\\cos\\theta + i\\sin\\theta )\\) r...","categories": ["Posts","Math"],
        "tags": [],
        "url": "/posts/math/Quaternion-%EA%B0%9C%EB%85%90/",
        "teaser": null
      },{
        "title": "Virtual Linux Setting",
        "excerpt":"WSL2 설치 DreamHack 의 System Hacking Inroduction 에 나와있는데 포맷때마다 찾기 귀찮을거 같아서 저장함. winver &gt;= 2004 부터 가능 Windows + R 로 실행창 열어서 winver 입력하면 바로 버전 알 수 있음. 다음을 Window Powercell 에 입력 dism.exe /online /enable-feature /featurename:Microsoft-Windows- Subsystem-Linux /all /norestart dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart...","categories": ["Posts","System Hacking"],
        "tags": ["Linux"],
        "url": "/posts/system%20hacking/Virtual-Linux-Setting/",
        "teaser": null
      },{
        "title": "StackFrame, Calling Convention",
        "excerpt":"Stack Frame 코드 #include &lt;stdio.h&gt; __attribute__((cdecl)) int Callee(int a, int b, int c) { printf(\"%d %d %d\", a, b, c); return a; } void Caller() { int a[8]; a[3] = Callee(a[0], a[1], a[2]); } int main() { Caller(); } 위 코드를 64bit x86-64 환경인 우분투에서 gcc -m32 -fno-stack-protector -fno-pic -g...","categories": ["Posts","System Hacking","c++"],
        "tags": ["c++","thread"],
        "url": "/posts/system%20hacking/c++/StackFrame,-Calling-Convention/",
        "teaser": null
      },{
        "title": "x86_64 레지스터 메모",
        "excerpt":"x86-64 레지스터 Dream Hack 에서 제공하는 운영체제에 있는 내용으로 자주 참고할 내용이라 메모함 General Register 주용도는 있으나 다양한 용도로도 사용되는 레지스터 이름 주용도 rax (accumulator register) 함수의 반환 값 rbx (base register) x64에서는 주된 용도 없음 rcx (counter register) 반복문의 반복 횟수, 각종 연산의 시행 횟수 rdx (data register) x64에서는...","categories": ["Posts","System Hacking"],
        "tags": ["OS"],
        "url": "/posts/system%20hacking/x86_64-%EB%A0%88%EC%A7%80%EC%8A%A4%ED%84%B0-%EB%A9%94%EB%AA%A8/",
        "teaser": null
      },{
        "title": "Ubuntu 어셈블리 분석환경조성 및 메모",
        "excerpt":"VI 설명 우분투를 설치하면 기본으로 딸려오는 파일 에디터임. 문맥에 따른 색깔구분 같은 추가 기능이 없으며 이건 VIM 을 쓰면 가능함. 사용 파일 생성 및 열기 =&gt; vi test.c 현재 커서가 위치한 곳으로 입력모드 전환 =&gt; i 명령모드 전환 =&gt; esc 저장 및 나가기 =&gt; :wq 현재 커서에서 붙여넣기 =&gt; p...","categories": ["Posts","System Hacking"],
        "tags": ["Linux"],
        "url": "/posts/system%20hacking/Ubuntu-%EC%96%B4%EC%85%88%EB%B8%94%EB%A6%AC-%EB%B6%84%EC%84%9D%ED%99%98%EA%B2%BD%EC%A1%B0%EC%84%B1-%EB%B0%8F-%EB%A9%94%EB%AA%A8/",
        "teaser": null
      },{
        "title": "Elision of Copy Operation   コピー",
        "excerpt":"문제 struct AAA { AAA(int a) : a(a) { cout &lt;&lt; \"construct\" &lt;&lt; endl; } AAA(const AAA&amp; in) :a(sqrt(in.a)) { cout &lt;&lt; \"copy\" &lt;&lt; endl; } AAA(AAA&amp;&amp; in) :a(sqrt(in.a)) { cout &lt;&lt; \"move\" &lt;&lt; endl; } AAA operator+(const AAA&amp; in) { cout &lt;&lt; a &lt;&lt; \"+\" &lt;&lt; in.a &lt;&lt; endl;...","categories": ["Posts","c++"],
        "tags": ["c++"],
        "url": "/posts/c++/Elision-of-Copy-Operation-%E3%82%B3%E3%83%94%E3%83%BC/",
        "teaser": null
      },{
        "title": "Addressing Mode, Virtual Memory",
        "excerpt":"Addressing Mode Memory 관련 기법으로 Dual Mode 가 Instruction 관련 기법인 것과 비교됨. 여러 모드가 있지만 Real Mode와 Protected Mode 가 대표적임. Protected 모드에서 Process 의 주소가 물리 메모리 주소와 일치하지 않지만, Real Mode 는 일치해서 이런 명명이 됨. 옛날 DOS 같은건 Real Mode 로 실행되었지만 요즘은 부팅 시 Real...","categories": ["Posts","OS"],
        "tags": ["OS"],
        "url": "/posts/os/Addressing-Mode,-Virtual-Memory/",
        "teaser": null
      },{
        "title": "Interrupts, Dual Mode",
        "excerpt":"Interrupt CPU 가 지금 처리하는 Process 를 잠깐 중단하고 다른 작업을 하도록 하는 요청. Interrupt 가 없다면 Process 가 끝날 때 까지 CPU 는 다른일을 못할 것임. 이러한 Interrupt 가 발생 시 Kernel Mode 로 전환되고 ISR 을 수행함 원래는 하드웨어와의 소통 수단이었는데 소프트웨어로도 확장됨 Instruction Boundary 에서 수행됨. 즉...","categories": ["Posts","OS"],
        "tags": ["OS"],
        "url": "/posts/os/Interrupts,-Dual-Mode/",
        "teaser": null
      },{
        "title": "Scheduling",
        "excerpt":"Multi Programming 한정된 CPU 가 여러개의 Process 를 동시에 실행시키기 위해 필요함. (Multi Process) cf) RealTime OS 는 DeadLine 이 있어 그 안에 끝내려는 OS 고 Mutil Process 와는 다름. PCB Process Control Block 의 줄임말 메모리에 저장되는 Process 관련된 모든 정보 PID(Process ID), Process State ( Running, Ready), PC,...","categories": ["Posts","OS"],
        "tags": ["OS"],
        "url": "/posts/os/Scheduling/",
        "teaser": null
      },{
        "title": "CellCode Memo",
        "excerpt":"기본 루틴 Compile Inline Assembly Skeleton Code vi ex.c gcc -o ex ex.c -masm=intel masm Assembly Compile nasm -f elf64 -o ex.o ex.s ld -o ex ex.o Debuging gdb ex info func b run_sh run next Hex to Code objdump -d ex 코드뽑기 Escape 문자는 컴파일러가 해주는거 그러므로 바로 집어넣는건...","categories": ["Posts","System Hacking"],
        "tags": ["Linux"],
        "url": "/posts/system%20hacking/CellCode-Memo/",
        "teaser": null
      },{
        "title": "Breadcrumbs",
        "excerpt":"BreadCrumbs 배치 Jerkll 는 /~/_posts/posts.md 구성으로 되어있으면 앞부분의 디렉토리가 자동으로 Category 로 순서대로 적용됨. 이러한 Directory 구조를 보여주는 부분을 Minimal Mistakes Thems 은 미리 만들어 놨음. {\\% include breadcrumbs.html path=page.path title=page.title %\\} 그 파트를 삽입처리해주는 위 코드를 Layout, Include 등의 어딘가에 추가하면 됨. 개인적으로 page__meta.html 에 추가하니까 이쁘게 나왔음. margin...","categories": ["Posts","Jekyll"],
        "tags": ["Jekyll"],
        "url": "/posts/jekyll/Breadcrumbs/",
        "teaser": null
      },{
        "title": "Chaos Destruction",
        "excerpt":"Chaos Destruction   튜토리얼 영상 을 매번 보기 귀찮아서 메모함   UDestructibleComponent is deprecated, use Chaos Destruction 라고 해서 사용함.   준비   ue4 4.26 쓰는데 디폴트로 안되어 있음 세팅 영상 튜토리얼   작성중…  ","categories": ["Posts","UE4"],
        "tags": ["UE4"],
        "url": "/posts/ue4/Chaos-Destruction/",
        "teaser": null
      },{
        "title": "Hierarchy Category Sidebar",
        "excerpt":"배경 Jerkll 는 디렉토리에 따라 Category 를 자동으로 분류함. /Dir1/Dir2/_posts/filename.md 이러면 categories = [Dir1, Dir2] 이렇게 되는 꼴임. 단 마지막에 /_posts/ 폴더 후에 md 파일을 넣어줘야함. 이렇게 Category 는 해주는데 Jerky - Minimal Mistakes Theme 은 네이버 블로그처럼 계층구조를 지원하지 않음. 다시말해 모든 게시글을 다 보여준다는 것. =&gt; 너무나도 꼬우므로...","categories": ["Posts","Jekyll"],
        "tags": ["Jekyll"],
        "url": "/posts/jekyll/Hierarchy-Category-Sidebar/",
        "teaser": null
      },{
        "title": "DreamHack) Shell Basic",
        "excerpt":"문제 문제 사이트 5fa: 6a 00 pushq $0x0 5fc: 48 b8 6f 6f 6f 6f 6f movabs $0x676e6f6f6f6f6f6f,%rax 603: 6f 6e 67 606: 50 push %rax 607: 48 b8 61 6d 65 5f 69 movabs $0x6c5f73695f656d61,%rax 60e: 73 5f 6c 611: 50 push %rax 612: 48 b8 63 2f 66...","categories": ["Posts","System Hacking"],
        "tags": ["Linux","SystemHacking"],
        "url": "/posts/system%20hacking/DreamHack)-Shell-Basic/",
        "teaser": null
      },{
        "title": "Custumize Entry_Layout",
        "excerpt":"Entries_Layout 선행지식 Liquid 전략 entries_layout 은 _config.yml 의 Default: 혹은 Front Matter 에서 지정할 수 있는 값임. 이 값에 따라서 게시글 목록의 Layout 을 정하게 됨. 예를들어 grid, list 가 있음. {\\% assign entries_layout = 'grid' %\\} ... &lt;div class=\"entries-\"&gt; {\\% for post in category.last %\\} {\\% include archive-single.html type=entries_single...","categories": ["Posts","Jekyll"],
        "tags": ["Jekyll"],
        "url": "/posts/jekyll/Custumize-Entry_Layout/",
        "teaser": null
      },{
        "title": "Cpp Console MiniGame",
        "excerpt":"Github Repository   Description                Log   c++ 도 잘 모를때 만든 프로젝트.   매우 간단하므로 블로그에 올릴 포트폴리오의 블루프린트 겸 올림.  ","categories": ["Posts","Portfolio"],
        "tags": [],
        "url": "/posts/portfolio/Cpp-Console-MiniGame/",
        "teaser": "/Posts/Portfolio/Cpp-Console-MiniGame/screenshot2.png"
      },{
        "title": "DirectX 2D",
        "excerpt":"Description           ","categories": ["Posts","Portfolio"],
        "tags": [],
        "url": "/posts/portfolio/DirectX-2D/",
        "teaser": "/Posts/Portfolio/DirectX-2D/screenshot2.png"
      },{
        "title": "BOJ 1644) 소수의 연속합   コピー",
        "excerpt":"방법 1 문제 사이트 코드 const int MAX_IN = 4000001; bool bNonPrimes[MAX_IN]; void Prime(int limit) { bNonPrimes[1] = 1; // 1 is not prime for (int i = 2; i &lt; limit; i++) { // primes =&gt; 0; if (bNonPrimes[i] == 1) continue; for (int j = 2 * i;...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. 정수론"],
        "url": "/posts/algorithm/boj-gold/BOJ-1644)-%EC%86%8C%EC%88%98%EC%9D%98-%EC%97%B0%EC%86%8D%ED%95%A9-%E3%82%B3%E3%83%94%E3%83%BC/",
        "teaser": null
      },{
        "title": "BOJ 2504) 괄호의 값",
        "excerpt":"문제 문제 사이트 코드 stack&lt;int&gt; var_stack; stack&lt;char&gt; char_stack; void Push(char c) { char_stack.push(c); var_stack.push(0); // local } void Pop(int v) { int cur = var_stack.top(); var_stack.pop(); if (cur == 0) cur = v; else cur *= v; int local = var_stack.top(); var_stack.pop(); local += cur; var_stack.push(local); char_stack.pop(); } int main()...","categories": ["Posts","Algorithm","BOJ-Silver"],
        "tags": ["PS. Implement"],
        "url": "/posts/algorithm/boj-silver/BOJ-2504)-%EA%B4%84%ED%98%B8%EC%9D%98-%EA%B0%92/",
        "teaser": null
      },{
        "title": "BOJ 10327) 피보나치 문제해결전략   コピー",
        "excerpt":"문제 문제 사이트 코드 / * * a, b, a+b, a + 2b, 2a+3b, 3a + 5b, 5a + 8b, 8a + 13b, ... p1*a + p2*b * get minimal a, b from given p1 and p2 */ pair&lt;int, int&gt; BruthForce(int input, int p1, int p2) { for (int b...","categories": ["Posts","Algorithm","BOJ-Platinum"],
        "tags": ["PS. 정수론"],
        "url": "/posts/algorithm/boj-platinum/BOJ-10327)-%ED%94%BC%EB%B3%B4%EB%82%98%EC%B9%98-%EB%AC%B8%EC%A0%9C%ED%95%B4%EA%B2%B0%EC%A0%84%EB%9E%B5-%E3%82%B3%E3%83%94%E3%83%BC/",
        "teaser": null
      },{
        "title": "BOJ 15686) 치킨배달",
        "excerpt":"문제 문제 사이트 방법 1 (틀림) 시간 복잡도 O(n * 13) 설명 각 치킨 집마다 모든 가정집으로부터의 거리를 누적해서 더해줌. 그리고 정렬해서 가장 낮은 m 개를 선택해줌. 근데 반례가 생김 모든 가정집 옆집에 치킨집을 줌. 그리고 아무데나 치킨집을 하나 더 넣어줌. m 이 가정집 갯수 - 1 인 경우 무조건...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. BruteForce"],
        "url": "/posts/algorithm/boj-gold/BOJ-15686)-%EC%B9%98%ED%82%A8%EB%B0%B0%EB%8B%AC/",
        "teaser": null
      },{
        "title": "BOJ 2718) 타일 채우기",
        "excerpt":"문제 문제 사이트 코드 int dp[151]; int main() { dp[0] = 1; dp[1] = 1; dp[2] = 5; for (int i = 3; i &lt;= 150; i++) { dp[i] = dp[i - 1] + 4 * dp[i - 2]; for(int j = 3; j &lt;= i; j++) dp[i] += (j...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. DP"],
        "url": "/posts/algorithm/boj-gold/BOJ-2718)-%ED%83%80%EC%9D%BC-%EC%B1%84%EC%9A%B0%EA%B8%B0/",
        "teaser": null
      },{
        "title": "BOJ 12094) 2048(Hard)",
        "excerpt":"문제 문제 사이트 코드 int MAX_TIME = 10; int n, nn; int board[21 * 21]; int ans = 0; enum DIR { L, R, U, D }; void Do(DIR dir) { int pivot, p_offset, l_offset; switch (dir) { case L: pivot = 0; p_offset = n; l_offset = 1; break;...","categories": ["Posts","Algorithm","BOJ-Platinum"],
        "tags": ["PS. BruteForce"],
        "url": "/posts/algorithm/boj-platinum/BOJ-12094)-2048(Hard)/",
        "teaser": null
      },{
        "title": "Segment Tree",
        "excerpt":"Segment Tree Top-Down 코드 template&lt;typename T, size_t _H&gt; class SegmentTree { template&lt;typename F&gt; struct Node { Node() {} Node(F v) : v(v) {} F operator+(const Node&amp; in) { return v + in.v; } F v = 0; }; public: void Init() { for (int i = INDEX_MAX - 1; i...","categories": ["Posts","Algorithm","Algorithms Concept"],
        "tags": ["PS. Segment Tree"],
        "url": "/posts/algorithm/algorithms%20concept/Segment-Tree/",
        "teaser": null
      },{
        "title": "BOJ 1517) 버블 소트",
        "excerpt":"문제 문제 사이트 코드 template&lt;typename T, size_t _SIZE&gt; struct BIT { void Update(int i, const T&amp; v) { while (i &lt; _SIZE) { nodes[i] += v; i += (i &amp; -i); } } T Query(int i) { T ans = 0; while (i &gt; 0) { ans += nodes[i]; i...","categories": ["Posts","Algorithm","BOJ-Platinum"],
        "tags": ["PS. Segment Tree","PS. Inversion Counting"],
        "url": "/posts/algorithm/boj-platinum/BOJ-1517)-%EB%B2%84%EB%B8%94-%EC%86%8C%ED%8A%B8/",
        "teaser": null
      },{
        "title": "Memory Copy",
        "excerpt":"POD Trivial, Standard Layout, POD 에 대한 이해가 필수임. 위 세가지의 공통된 특징은 가상함수는 쓰면 안되고 성질이 멤버변수도 적용되어야함 Trivial 기본생성자(파라미터 없는거)와 대입연산자, 소멸자가 default 여야함. Standard Layout C 등의 다른 언어와의 Memory Layout 의 상호운용을 위한 것 여러 Access Specifier에 걸쳐서 멤버변수를 두면 안되고, 멤버변수 각각도 마찬가지임. Access 지정자에...","categories": ["Posts","c++"],
        "tags": ["c++"],
        "url": "/posts/c++/Memory-Copy/",
        "teaser": null
      },{
        "title": "BOJ 11404) 플로이드",
        "excerpt":"문제 문제 사이트 코드 int n; int dp[101][101]; int main() { fastio; int n, m; cin &gt;&gt; n &gt;&gt; m; fill(dp[0], dp[100] + 101, 100000000); for (int i = 0; i &lt; m; i++) { int a, b, c; cin &gt;&gt; a &gt;&gt; b &gt;&gt; c; dp[a][b] = min(dp[a][b], c);...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. Floyd-Warshall"],
        "url": "/posts/algorithm/boj-gold/BOJ-11404)-%ED%94%8C%EB%A1%9C%EC%9D%B4%EB%93%9C/",
        "teaser": null
      },{
        "title": "BOJ 1918) 후위 표기식",
        "excerpt":"문제 문제 사이트 코드 inline bool IsOp(char in) { return in == '+' || in == '-' || in == '*' || in == '/'; } inline bool NotLessPrior(char top, char cur) { return (top == '*' || top == '/') || (cur == '+' || cur == '-'); }...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. Stack"],
        "url": "/posts/algorithm/boj-gold/BOJ-1918)-%ED%9B%84%EC%9C%84-%ED%91%9C%EA%B8%B0%EC%8B%9D/",
        "teaser": null
      },{
        "title": "BOJ 11658) 구간 합 구하기 3",
        "excerpt":"문제 문제 사이트 방법 1 코드 template&lt;typename T, size_t _SIZE&gt; struct BIT { inline void Update(int x, int y, const T&amp; v) { for (int j = y; j &lt;= _SIZE; j += j &amp; -j) for (int i = x; i &lt;= _SIZE; i += i &amp; -i) nodes[j][i]...","categories": ["Posts","Algorithm","BOJ-Platinum"],
        "tags": ["PS. Segment Tree"],
        "url": "/posts/algorithm/boj-platinum/BOJ-11658)-%EA%B5%AC%EA%B0%84-%ED%95%A9-%EA%B5%AC%ED%95%98%EA%B8%B0-3/",
        "teaser": null
      },{
        "title": "BOJ 2263) 트리의 순회",
        "excerpt":"문제 문제 사이트 코드 int in_or[100001]; int post_or[100001]; void DFS(int l_range, int r_range, int post_pivot) { int cur_node, cur_p; cur_node = post_or[post_pivot]; cur_p = in_or[cur_node]; if (cur_p &gt;= r_range || cur_p &lt;= l_range) return; printf(\"%d \", cur_node); DFS(l_range, cur_p, post_pivot - (r_range - cur_p)); DFS(cur_p, r_range, post_pivot - 1); }...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. Floyd-Warshall"],
        "url": "/posts/algorithm/boj-gold/BOJ-2263)-%ED%8A%B8%EB%A6%AC%EC%9D%98-%EC%88%9C%ED%9A%8C/",
        "teaser": null
      },{
        "title": "BOJ 2650) 교차점 개수",
        "excerpt":"문제 문제 사이트 코드 struct P { int p1, p2; }; P pt[51]; int ans[51]; inline int Intep(int t, int p) { switch (t) { case 1: return 1 * 1000 + p; case 4: return 2 * 1000 + p; case 2: return 3 * 1000 - p; case...","categories": ["Posts","Algorithm","BOJ-Gold"],
        "tags": ["PS. Geometry"],
        "url": "/posts/algorithm/boj-gold/BOJ-2650)-%EA%B5%90%EC%B0%A8%EC%A0%90-%EA%B0%9C%EC%88%98/",
        "teaser": null
      },{
        "title": "BOJ 17216) 가장 큰 감소 부분 수열",
        "excerpt":"문제 문제 사이트 방법 1 코드 int inputs[1001]; pair&lt;int, int&gt; dp[1002]; int main() { int n; cin &gt;&gt; n; for (int i = 0; i &lt; n; i++) cin &gt;&gt; inputs[i]; for (int i = n-1; i &gt;= 0; i--) // 아래 포문과 방향만 같으면 됨. { for (int j...","categories": ["Posts","Algorithm","BOJ-Silver"],
        "tags": ["PS. LIS"],
        "url": "/posts/algorithm/boj-silver/BOJ-17216)-%EA%B0%80%EC%9E%A5-%ED%81%B0-%EA%B0%90%EC%86%8C-%EB%B6%80%EB%B6%84-%EC%88%98%EC%97%B4/",
        "teaser": null
      },{
        "title": "잡다한 설정",
        "excerpt":"Highlight 의 Tab 크기 조절 처음에 설정된거 보니까 탭이 8정도 된거 같음 해결법 이거보고 _syntax.scss 의 .highlight pre { width: 100%; } 부분에 tab-size: 4; 추가하니 VS 와 비슷하게 나옴. 제목 대소문자 강제변경 해제 해결법 _plugins/[아무이름].rb 를 만들어 module Jekyll module Utils def titleize_slug(slug) slug.split(\"-\").join(\" \") end end end 를...","categories": ["Posts","Jekyll"],
        "tags": ["Jekyll"],
        "url": "/posts/jekyll/%EC%9E%A1%EB%8B%A4%ED%95%9C-%EC%84%A4%EC%A0%95/",
        "teaser": null
      },{
        "title": "Priority Queue",
        "excerpt":"우선순위 큐 코드 template&lt;typename T, size_t Size&gt; struct PQ { struct Node { friend bool operator&lt;(const T&amp; l, const Node&amp; r) { return l &lt; r.v; } // max first bool operator&lt;(const Node&amp; in) { return v &lt; in; } T v; }; Node heap[Size]; int end = 1; void...","categories": ["Posts","Algorithm","Algorithms Concept"],
        "tags": ["PS. UnionFind","PS. DFS"],
        "url": "/posts/algorithm/algorithms%20concept/Priority-Queue/",
        "teaser": null
      },{
        "title": "BOJ 2529) 부등호",
        "excerpt":"문제 문제 사이트 코드 struct TopologyData { int n_targets[11]; vector&lt;int&gt; srcs[11]; }; TopologyData min_data, max_data; int arr[11], idx2var[11]; int n; void Solve(TopologyData&amp; data, int start, int offset) { priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; q; auto&amp; n_targets = data.n_targets; auto&amp; srcs = data.srcs; for (int i = 0; i &lt;= n; i++) if...","categories": ["Posts","Algorithm","BOJ-Silver"],
        "tags": ["PS. Topological Sort"],
        "url": "/posts/algorithm/boj-silver/BOJ-2529)-%EB%B6%80%EB%93%B1%ED%98%B8/",
        "teaser": null
      },{
        "title": "Graphics Memo",
        "excerpt":"POD   ","categories": ["Posts","Graphics"],
        "tags": [],
        "url": "/posts/graphics/Graphics-Memo/",
        "teaser": null
      },{
        "title": "UE4 Blueprint",
        "excerpt":"Description 적을거 DataTable 사용 흑백효과, 죽을때 효과, 좌우키로 타게팅, IK, Camera Sequence, GamePath, Camera 가리기, 보스맵은 전체적으로 설명해서 한컷? Hit 데이지 HitPopManager 에서 풀링해놓고 랜덤위치로 Widget Anim 돌릴 뿐 Anim 도중에 Project World Location To Widget Location 쓰네 Minimap? Cinematic? 이제부터는 구현방법보단 기술위주로 적어야함. Work Records 작업 틈틈히 기록한 영상들입니다....","categories": ["Posts","Portfolio"],
        "tags": [],
        "url": "/posts/portfolio/UE4-Blueprint/",
        "teaser": "/Posts/Portfolio/UE4-Blueprint/screenshot2.png"
      },{
        "title": "UE4 CPP",
        "excerpt":"Description            Work Records   작업 틈틈히 기록한 영상들입니다.     ","categories": ["Posts","Portfolio"],
        "tags": [],
        "url": "/posts/portfolio/UE4-CPP/",
        "teaser": "/Posts/Portfolio/UE4-CPP/screenshot2.png"
      },{
        "title": "DirectX 3D",
        "excerpt":"Description      Work Records   작업 틈틈히 기록한 영상들입니다.     ","categories": ["Posts","Portfolio"],
        "tags": [],
        "url": "/posts/portfolio/DirectX-3D/",
        "teaser": "/Posts/Portfolio/DirectX/screenshot2.png"
      }]
