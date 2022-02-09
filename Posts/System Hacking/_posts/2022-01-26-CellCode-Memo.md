---
excerpt: "CellCode Template, Linux System Call, GDB ect memo"
tag: [Linux]
use_math: true
---


## 기본 루틴

#### Compile

Inline Assembly Skeleton Code
1. ```vi ex.c```
2. ```gcc -o ex ex.c -masm=intel```
  + [masm](https://www.intel.com/content/www/us/en/develop/documentation/cpp-compiler-developer-guide-and-reference/top/compiler-reference/compiler-options/compiler-option-details/code-generation-options/masm.html)

Assembly Compile
1. ```nasm -f elf64 -o ex.o ex.s```
2. ```ld -o ex ex.o```

#### Debuging

1. ```gdb ex```
2. ```info func```
3. ```b run_sh```
4. ```run```
5. ```next```

#### Hex to Code

1. ```objdump -d ex```
2. 코드뽑기
  + [Escape 문자는 컴파일러가 해주는거](https://stackoverflow.com/questions/51864157/why-are-escape-characters-not-working-when-i-read-from-cin)
  + 그러므로 바로 집어넣는건 하면 안됨
  + ```echo -ne "\x48\xc7\xc0\x..." | nc host1.dreamhack.games 22819```
  + 혹은 txt 에 집어넣어서 Redirection


## Assembly

+[assembly string 넣기](https://stackoverflow.com/questions/19526725/what-is-the-syntax-to-define-a-string-constant-in-assembly)



## Skeleton Code

{% highlight c %}

__asm__(
".section .data\n"
".global run_sh\n"
"run_sh:\n"

"xor rdi, rdi      # rdi = 0\n"
"mov rax, 0x3c     # rax = sys_exit\n"
"syscall           # exit(0)");

void run_sh();
int main() { run_sh(); }

{% endhighlight %}

Inline Assembly 를 활용한 inline assemly code 임.
+ [Dream Hack](https://dreamhack.io/) 에 있는 커리큘럼에 있는데 복붙 귀찮아 메모.
+ 중간에 빈칸에 어셈코드를 ```"~\n"``` 로 싸서 넣으면 됨
+ 주석은 ```;``` 가 아니라 ```#```


### Data Section 사용?

Data Section 에 있으면 ```Read```, ```Write``` 권한만 있음.

근데 __내가 실행할 코드는 ```Excute``` 되어야함__

그래서 ```Read```, ```Excute``` 권한이 있는 Text Segment 에 값을 넣어줘야함.
+ 대신 ```mov byte ptr dir, 0x10 \n``` 처럼 값 변경은 못함.

또한 ```-no-pie``` 를 걸어줘야함.
+ [참고](https://krlrhkstk12.gitbook.io/hubcodes/engineering/general/undefined-1)

```
".text \n"
"dir: .string \"/home/shell_basic/flag_name_is_loooooong\" \n"
".global run_sh\n"
"run_sh:\n"
...
"mov rdi, offset dir # buf = dir ; \n"
...
```

이렇게 


## GDB 명령어

[gbd 명령어 블로그](http://egloos.zum.com/psyoblade/v/2653919)

잘쓰는거
+ 함수 assemble ```pd [func_name]```
+ 모든 break point 제거 ```d```
+ 함수에 break point => ```b [func_name]```
+ ```(step, next, continue, until, finish, return, step instruction, next instruction)``` 
+ 종료 => ```q``` 
+ 값 출력 => ```x/[범위][출력형식][범위단위]



## x86-64 Linux System Call

### Parameter

+ rax => System Call 
+ rdi -> rsi ->rdx -> rcx -> r8 -> r9 -> stack

### System Call Table

| 이름 | rax | rdi | rsi | rdx |
|-----|-----|------|----|-----|
|read|0x00|uint fd (std-io : 0x01)|char* buf|size_t count|
|write|0x01|uint fd|const char* buf|size_t count|
|open|0x02|const char* file_name|int flags|umode_t mode|
|close|0x03|uint fd| | |
|mprotect|0x0a|ulong start|size_t len|ulong prot|
|connect|0x2a|int sockfx|struct sockaddr* addr|int addrlen|
|execve|0x3b|const char* filename|const char* const* argv|const char* const* envp|

FD(File Descripter)
+ Unix 계열 운영체제에서 파일에 접근하는 운영체제에 제공하는 가상의 접근 제어자
+ ```stdin = 0```, ```stdout = 1```, ```stderr = 2```


## PwnLibs

```from pwn import *``` 후 시작

## 간단현 변환 코드

#### String 을 Stack 에 넣게 변환

{% highlight c++ %}
/*
 * @param in : what to convert.
 * order is revesred as little-endian. 
 * you should push from top
*/
void StringToHex(const string& in)
{
	const int RegSize = 8;
	const int StrSize = in.size()+1;

	for (int cur = StrSize - 1; cur >= 0;)
	{
		int next = max(cur - RegSize, -1);
		int step = next;
		string str;
		cout << "0x";
		for (; step < cur; cur--)
		{
			cout << setfill('0') << setw(2) << right << hex << (int)in[cur];
		}
		cout << endl;
		cur = next;
	}
}
{% endhighlight %}

결과 나온거 순서대로 ```push``` 해주면 됨


#### 셀코드용 hex->binary

{% highlight c++ %}

include <iostream>
#include <sstream>
#include <string>
#include <fstream>
#include <algorithm>

using namespace std;


static inline void ltrim(std::string& s) {
        s.erase(s.begin(), std::find_if(s.begin(), s.end(), [](unsigned char ch) {  return ch == ':'; })+1 );
        s.erase(s.begin(), std::find_if(s.begin(), s.end(), [](unsigned char ch) {  return !std::isspace(ch); }));
}

static inline void rtrim(std::string& s) {
        s.erase(std::find_if(s.rbegin(), s.rend(), [](unsigned char ch) { return !std::isspace(ch);}).base(), s.end());
}

static inline void trim(std::string& s) {
        ltrim(s);
        s = s.substr(0, 3 * 7);  // ( 2(hex) + 1(space) ) * col (7)
        rtrim(s);
}

void BinaryToShellCode()
{
        ofstream file("shellcode");
        string in;
        while(getline(cin, in))
        {
                trim(in);

                stringstream str(in);
                string tmp;
                char binary;
                while (!str.eof())
                {
                        str >> tmp;
                        binary = std::stoi("0x"+ tmp, nullptr, 16);
                        file << binary;
                }
        }
        file.close();
}

int main(int narg, char* argv[])
{
        BinaryToShellCode();
}

{% endhighlight %}