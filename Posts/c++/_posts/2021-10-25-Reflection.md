---
excerpt: "c++ 에서 Reflection 구현하기"
tag: [c++]
use_math: true
---
## Reflection

__CompileTime 이 아니라 Runtime__ 에서 Program 의 구조를 읽고 사용할 수 있는 기능.

추상화가 된 클래스 간의 동작을 처리하는 Framework 가 외부 모듈에서 구현된 Class 를 사용하고자 할 때 많이 쓰임. 

객체 A 가 B 의 부모클래스인가? 처럼 정적으로 해결할 수 없고 다형성으로도 해결할 수 없는 문제는 Reflection 이 요구됨.

c++ 은 Reflection 이 언어차원에서 지원하지 않지만, 다른 언어(특히 웹에서 많이쓰는)는 지원하는 경우가 많음.



### C++ 에서 구현 <br/>

[이 블로그를 참고함](https://spikez.tistory.com/55?srchid=BR1http://spikez.tistory.com/55)

이하는 ```Object``` 이하의 객체가 ```UClass``` 형태로 타입정보를 가지게 하여 구현됨

1. ```Object``` 이하 타입이 주어졌을 때 그 타입의 ```UClass``` 를 가져오는 ```StaticClass()```
2. ```Object```  의 객체가 주어졌을 때 RTT 을 ```UClass``` 로 가져오는 ```GetClass()```
3. ```UClass``` 가 주어졌을 때 그 타입의 객체를 생성하는 ```NewObject()```
4. 자료형 이름이 문자열로 주어졌을 때 ```UClass```를 찾아주는 ```FindClass()```
5. 객체 두개가 있을 때 서로 부모자식관계의 타입인지 확인하는 ```IsBaseOf()```

이때 주의사항은 ```static``` 공간의 초기화 순서는 규칙으로 정해진게 없기 때문에 함부로 ```static``` 상의 객체를 참조해서는 안된다는 것임.

```DECL_UCLASS``` 를 헤더에, ```IMPL_UCLASS``` 를 소스파일에 넣어주는 방식임.


### 코드

{% highlight c++ %}
// UCLASS.h
#pragma once
#include <string>
#include <functional>
#include <unordered_map>


class Context { };

class Object
{
public:
	Object(Context* context) {};
	virtual ~Object() = default;
	virtual void test() {};
	virtual const class UClass* const GetClass() = 0;
};

class UClass
{
public:
	explicit UClass(std::string this_name, std::string parent_name, std::function<Object* (class Context* context)> func);
	virtual ~UClass();

	std::string className;
	std::function<Object* (class Context* context)> createObject;
	
	template<typename T>
	static T* NewObject(const std::string& className, class Context* context) { 
		return dynamic_cast<T*>(CreateInstance(className, context)); 
	}
	
	static UClass* FindClass(const std::string& InclassName);
	static bool IsBaseOf(const UClass* parent, const UClass* child);
	static bool IsSameOrBaseOf(const UClass* parent, const UClass* child);

private:
	static Object* CreateInstance(const std::string& className, class Context* context);
	

private:
	struct FField
	{
		FField(const std::string& name) : name(name) {}
		
		class UClass* ptr = nullptr; // use name if ptr is not intialized.
		std::string name;      
	};
	FField parent;

private:
	static std::unordered_map<std::string, UClass*>* classes;
};


#define UCLASS(class_name) ((UClass*)(&class_name::class##class_name)) 

#define DECL_UCLASS(class_name) \
	public: \
	static const UClass class##class_name; \
	virtual UClass* StaticClass() const;   \
	virtual const class UClass* const GetClass() { return UCLASS(class_name); }

#define IMPL_UCLASS(class_name, parent_class) \
	const UClass class_name::class##class_name(#class_name, #parent_class, [](class Context* context)->Object* {return (Object*)new(std::nothrow) class_name (context); }); \
	UClass* class_name::StaticClass() const \
	{  return UCLASS(class_name); }


{% endhighlight %}

{% highlight c++ %}
// UCLASS.cpp
#include "UCLASS.h"
#include <cassert>
#include <stack>

std::unordered_map<std::string, UClass*>* UClass::classes;

UClass::UClass(std::string this_name, std::string parent_name, std::function<Object* (Context* context)> func)
	: className(this_name)
	, parent(parent_name)
	, createObject(func)
{
	// == Insert in hash map ================================================
	if (!classes) 
		classes = new(std::nothrow) std::unordered_map<std::string, UClass*>;
		
	auto iter = classes->find(this_name);
	assert(iter == classes->end());
	
	if (iter == classes->end())
		classes->insert({ this_name, this });
	// ======================================================================
}

UClass::~UClass()
{
	if (classes != nullptr) {
		auto iter = classes->find(className);
		if (iter != classes->end())
			classes->erase(iter);
		if (classes->empty())
		{
			delete classes;
			classes = nullptr;
		}
	}
}

Object* UClass::CreateInstance(const std::string& className, class Context* context)
{
	if (classes->find(className) != classes->end())
		return classes->at(className)->createObject(context);

	assert(false);
	return nullptr;
}

UClass* UClass::FindClass(const std::string& InclassName)
{
	if (classes->find(InclassName) != classes->end())
		return classes->at(InclassName);
	return nullptr;
}

bool UClass::IsBaseOf(const UClass* parent,const UClass* child)
{
	if (!child->parent.ptr) 
		const_cast<UClass*>(child)->parent.ptr = FindClass(child->parent.name);

	while (child->parent.ptr != nullptr)
	{
		if (parent == child->parent.ptr) 
			return true;
		child = child->parent.ptr;
		if (!child->parent.ptr)
			const_cast<UClass*>(child)->parent.ptr = FindClass(child->parent.name);
	}
	return false;
}

bool UClass::IsSameOrBaseOf(const UClass* parent, const UClass* child)
{
	return parent == child || IsBaseOf(parent, child);
}

{% endhighlight %}

{% highlight c++ %}
// main.cpp
#include "UCLASS.h"

class A : public Object
{
	DECL_UCLASS(A);
	A(Context* context) : Object(context) {}
	virtual void test()
	{
		printf("I'm A\n");
	};
};



class B : public A
{
	DECL_UCLASS(B);
	B(Context* context) : A(context){}
	virtual void test()
	{
		printf("I'm B\n");
	};
};
IMPL_UCLASS(A, Object)
IMPL_UCLASS(B, A)

int main() {
	Context context;
	Object* pA = UClass::NewObject<A>("A", &context);
	pA->test();
	Object* pB = UClass::NewObject<B>("B", &context);
	pB->test();
	
	std::cout << pA->GetClass()->className;
	std::cout << UClass::IsBaseOf(pA->GetClass(), pB->GetClass());
}
{% endhighlight %}

### Link 해서 사용하기

static lib 을 쓰면 dll 과 종속관계일 때 static variable 이 싹다 복사됨.

그러므로 static / dynamic link  를 병행해서 쓰면 안됨.

위 코드는 ```std::string``` 을 쓰고 있으므로 dll 로 빼기는 힘듦. 그래서 static lib 로 해서 ```WHOLEARCHIVED``` 링크 옵션을 추가하는게 제일 나음

