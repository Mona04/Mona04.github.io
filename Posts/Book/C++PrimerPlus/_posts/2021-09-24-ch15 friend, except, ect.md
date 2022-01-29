---
excerpt: "c++ 기초플러스 15장 요약본"
categories: Book
tag: [c++]
---

## Friend, Nested Class

{% highlight c++ %}
class List {
public:
	int GetFront() { return begin.value; }  // friend 로 value 접근하게 해야함.

protected:
	class Item {
		//friend class List;           // 전방선언으로 떼울 수 있음
		friend int List::GetFront();   // 메소드가 앞에 선언되어야 가능
		friend ostream& operator<<(ostream& stream, const Item& in) { return stream << in.value; }
		int value = 10;
		Item* next;
	};
private:
	Item begin;

};
{% endhighlight %}

### Friend

특정 클래스가 다른 클래스가 __자신의 접근 제한자(access specifier) 를 무시__ 하고 자신의 Method, Member 를 사용할  수 있게 __열어주는 접근 제한자__.

클래스 내부에서 설정하고 밖에서 수정할 수 없기 때문에 객체지향에 유연성을 더해주면서 객체지향 프로그래밍 철학을 위반한게 아니라나 뭐라나.

위 코드에선 ```GetFront()``` 를 위해선 List 가 Item 에 접근할 수 있어야 함.

이를 위한 방법이  2가지가 있음.(더 있는지는 모름)

1. ```friend class List```

	```class``` 는 이미 전방선언 되어있으면 안적어도 됨
	
	모든 멤버변수, 함수가 다 열림.
	
2. ```friend int List::GetFront()``` 

	메소드가 앞에 선언되어 있지 않으면 못써서 헤더 꼬일 수 있음.

* ```friend ostream& operator<<(ostream& stream, const Item& in);```

	클래스 메소드가 friend 일 수 없기 때문에 위 함수는 그냥 함수임
  
	friend 는 ```in.value``` 에 접근을 허용하고 동시에 이게 그냥 함수임을 명시화 함.
  
	만약 여러 클래스의 private 을 동시에 해야하는 함수는 위와같은 함수는 필수가 될 것.

### Nested Class

+ 위의 Item 이 바로 Nested Class(내포 클래스) 임
+ List 클래스 외부에서 Item 을 접근하려면 List::Item 이렇게 가야함
+ 즉 public 안에 정의되어 있으면 그냥 namespace 가 class 라고 생각하면 됨.
+ protected 나 private 접근자에서 정의되었으면 접근자를 다른것과 똑같이 적용하면 됨.
+ 예를들어 위는 protected 니까 가령 main 에선 List::Item 을 쓸 수 없음.

## Exception

예외처리하고 싶은 상황이 올 때 어떻게 함?
+ abort() 함    => cerr (에러로그 스트림) 에 "비정상적인 종료" 이런 메시지 보내고 종료
+ exit() 함       => 강종 => 이용자 빡침
+ 예외코드     => define 혹은 전역변수 => 강종안하게 처리가능하나 코드관리가 어려움
+ try-catch 문 => 추천

{% highlight c++ %}
int HMean(int x, int y)
{
	if (x == -y) throw 3.141592f;
	return 2 * x * y/(x + y);
}

void main()
{
	int t = 2;
	while (1)
	{
		try {
			HMean(5, t--);
		}
		catch (int a) {
			cout << a; 
			break;
		}
		catch (float a) {  // <= 얘가 호출됨
			cout << a; 
			break;
		}
		catch (...) { // catch all
			cout << "다잡아";
            break;
		}
	}
}
{% endhighlight %}

### exception 으로 뭘 보냄?

* 위처럼 ```throw``` 에 어떤 자료형을 넣어도 됨. 

	cf) ```throw;``` 도 가능한데 이건 re-throw current exception 임.
	
    current exception 없으면 ```terminate()``` 함. [참고](https://stackoverflow.com/questions/2288692/what-happens-if-i-use-throw-without-an-exception-to-throw)

* Overloading 때 적합한 자료형을 찾아서 함수가 호출되듯 catch 문의 자료형보고 알아서 찾아 들어감. 

* 우리가 ```throw``` 옆에 보낸건 임시변수가 되며, catch 로 갈때 reference 로 받으면 복사없이 받고 아니면 복사본을 받게 됨.(또한 이렇게하면 파생클래스도 받음)

* __던지는 자료형에 따라 catch 구분이 갈리므로__ 보통 객체를 ```throw``` 하게 됨

* 이때 자료형의 부모자식관계가 있다면 다형성 때문에 catch 의 순서도 고려해야함. 

#### std::exception

* 자료형으로 catch 문 구문이 갈리니 객체로 보통 던짐.  

* 근데 아무 자료형을 쓰면 이곳 저곳에서 호환이 어려움. 

* 그래서 STL 은 예외용 자료형을 제공함. 

	예를들어 bad_alloc 같이 우리가 자주보는 예외도 모두 std:::exception 을 상속받음

{% highlight c++ %}
class my_exception : std::exception
{
public:
	const char* what() const override { return "내에러"; }
};
{% endhighlight %}

+ 위처럼 상속받아서 what 만 수정하면 됨. 

+ std::bad_alloc 같이 stl 에 포함된 exception 을 상속받아서 그 예외 내에서 예외를 구분도 함.

### exception 의 제어

+ 함수를 call 하면 stack 에 계속 쌓이는걸 알고 있을 거임.

+ 예외를 발생시키면  try 블록 혹은 main 함수의 본체가 나올 때 까지 stack 을 계속 풀게됨

+ 그래서 Stack 은 괜찮은데 try 구문 내에서 동적할당을 해체할 예정이었는데 예외가 발생하는 경우 메모리 관리에 주의해야함.

+ catch 를 실패하거나 따로 설정을 안하고 main 까지 가면 ```terminate()``` 를 수행함
	
	main 에서 걸리면 ```terminate()``` 가 호출되고 ```std::set_terminate()``` 로 따로 설정을 안하면 ```abort()``` 를 call 함.
	특히 catch 가 실패했을 땐 ```unexpected()``` 함수가 ```terminate()``` 를 콜하는데 ```std::set_unexpected()``` 로 다른 함수로 바꿀 수 있음. 이때 unexpected 는 예외를 던져야하는데 이때의 예외처리 규칙은 필요할 때 검색.

+ 위 코드 예시에서 break 를 써서 while 문을 탈출하는 것처럼 catch 블록에  exception 발생시 들어가는걸 제외하면 그냥 코드 짜는거랑 나머지는 똑같음. loop 문 아닌데서 break 넣을 수 없고 이런거.  

### noexcept

+ [이 문서에 책 대부분의 내용이 들어있으니 이거만 봐도 됨](https://www.modernescpp.com/index.php/c-core-guidelines-the-noexcept-specifier-and-operator)

+ [얘도 괜찮고](http://sweeper.egloos.com/3148916#:~:text=noexcept%20%ED%82%A4%EC%9B%8C%EB%93%9C%EB%8A%94%20%EC%97%B0%EC%82%B0%EC%9E%90%20%28operator%29%20%EC%9D%98%20%ED%98%95%ED%83%9C%EB%A1%9C%2C%20%EA%B7%B8%EB%A6%AC%EA%B3%A0%20%ED%95%9C%EC%A0%95%EC%9E%90,noexcept%EB%8A%94%20false%EB%A5%BC%20%EB%B0%98%ED%99%98%ED%95%98%EB%A9%B0%2C%20%EA%B7%B8%EB%A0%87%EC%A7%80%20%EC%95%8A%EC%9D%80%20%EA%B2%BD%EC%9A%B0%EC%97%94%20true%EB%A5%BC%20%EB%B0%98%ED%99%98%ED%95%9C%EB%8B%A4.)

#### 한정자 noexcept

+ noexcept 는 예외를 던지지 않곘다고 함수에 거는 __한정자__ 로 지금은 deprecated 될 throw __한정자__ 의 후예임.
+ 그냥 ```noexcept``` 이렇게도 되고 ```noexcept(true)``` 이렇게 bool 값도 넣음
	(true 가 예외 없다는 것. false 가 명시적으로 예외 넣을거라는 것.)
	+ 컴파일 상수로 ```m == 1``` 이런걸 넣어서 조절도 가능
+ 함수 내에서 try-catch 문이 있는건 상관없으나 함수 스택 밖으로 예외가 나가면 ```terminate()```를 호출함 ```void A() noexcept { throw 42;}``` 함수 호출 시 처럼.
+ 컴파일러가 암시적으로 noexcept 를 거는게 몇개가 있음.
	1. 명시적으로 noexcept(false) 안한 소멸자. 
		(Stack 을 푸는 과정에서 객체의 소멸자가 호출 될 수 있어서)
	2. 컴파일러가 만든 기본 생성자. 복사/이동 생성자 및 대입연산.		
+ 사용하는 이유
	+ 미비하나 컴파일러 최적화를 도움.
	+ stl container 의 move semantics 이 적용하려면 이동 생성자에 noexcept 가 있어야 해서 없는경우 특정상황에 느려질 수 있음..([Visutal Studio 에선 아직 적용 안된듯](https://stackoverflow.com/questions/28627348/noexcept-and-copy-move-constructors))
	+ 예외 뜨면 바로 ```terminate()```로 보낼 마음이라서

#### 연산자 noexcept

+ noexcept __연산자__ 도 있는데 __컴파일 단계__ 에서 들어오는 식이 예외를 던지는지 판단해줌
	
	이때 들어오는 것이 __표현식__ 임에 주의하자. 변수나 타입이 아님.

{% highlight c++ %}
template <typename T> 
T copy(T const& src) noexcept(noexcept(T(src))){   
  return src; 
}


struct AAA {
	int a = 10;
	void Print() { cout << a << endl; }
	AAA() { cout << "Create" << endl; }
	AAA(const AAA& in) { cout << "Copy" << endl; }
	AAA(const AAA&& in) noexcept(false) { cout << "Move" << endl; }
};

void Exceptable_Func() noexcept(false) {}
void Exceptable_Func2() noexcept(noexcept(Exceptable_Func())) {}

void main()
{
	cout << noexcept(Exceptable_Func()) << endl; // print 0
	cout << noexcept(Exceptable_Func2()) << endl; // print 0
	AAA a;
	AAA b = std::move_if_noexcept(a);  // AAA 의 이동생성자가 noexcept(false) 라 복사생성함
}
{% endhighlight %}
	
noexcept 안에 들어있는게 표현식인지 bool 값인지에 따라 연산자인지 한정자인지 쓰임이 갈라지는걸 확인할 수 있음.

```std::move_if_noexcept()``` 는 ```std::move``` 랑 거의 같은데 지 이름처럼 noexcept 가 아니면 복사함. 그래서 위 코드는 복사생성자가 호출됨.

## RTTI (Runtime Type Identification)

상속관계로 다형성을 갖는 c++ 의 객체의 타입을 런터임에서 식별하는 기능.

가상함수가 정의되면 객체에 들어가는 virtual table 을 이용한 기능임. (안해봤으면 가상함수 유뮤에 따라 sizeof 값이 어떻게 달라지는지 확인해보는 것도 좋음)

```dynamic_cast```, ```typeid()```, ```std::is_base_of<T1 T2>``` 등이 있음.

기본적으로 켜져있는데 꺼져있을 수도 있음. 그럼  Project Property -> C/C++ -> Language -> Enable Runtime Type  Information 을 켜면 됨.

## Casting

static_cast, dynamic_cast, const_cast, reinterpret_cast 가 있음.

c 에선 ```(int*)(&var)``` 이런식으로 쓰는데 잘못하면 위험해져 c++ 에서 제공하는 타입 캐스팅방법임.

static_cast 는 컴파일 시간에, dynamic_cast 는 런타임 시간에 형변환 가능한지 체크해줌.

dynamic_cast 는 보통 up_casting 용임. pointer 뿐만 아니라 reference 도 해주는데 실패하면 nullptr 을 못주니 ```bad_cast``` 예외를 던짐.

const cast 는 같은 타입의 포인터인데 const 만 붙였다 떼는 용도

reinterpret_cast 는 자료형 맘대로 바꿀 수 있으며 void* 여기에 적용이 가능한게 큼. 함수포인터와 데이터보인터를 바꾼다거나 큰 포인터형을 작은 포인터형으로 못바꾸는 제약도 있어 C 의 타입 변환과 똑같진 않음.





