---
layout: post
title: "콜백함수와 비동기 그리고 async await"
date: 2019-01-31
comments: true
categories: review
---

## 콜백함수와 비동기

### 콜백함수란 무엇일까요

#### 검색결과

1. 함수 실행결과값을 리턴이 아닌 매개변수로 넘어온 함수를 호출해서 넘겨주는 방식을 콜백이라 하며 이때  매개변수로 넘어온 함수를 콜백함수라고 합니다. 

   - 출처: 자바스크립트+jQuery 완전정복 스터디 1 - **[웹동네 김춘경님]**


2. 어떤 이벤트가 발생한 후 수행될 함수를 의미합니다.
 
   - 출처:  [victolee](https://victorydntmd.tistory.com/48){: target="_blank" } 


3. 일종의 식당 자리 예약과 같습니다. 일반적으로 맛집을 가면 사람이 많아 자리가 없습니다. 그래서 대기자 명단에 이름을 쓴 다음에 자리가 날 때까지 주변 식당을 돌아다니죠. 만약 식당에서 자리가 생기면 전화로 자리가 났다고 연락이 옵니다. 그 전화를 받는 시점이 여기서의 콜백 함수가 호출되는 시점과 같습니다. 손님 입장에서는 자리가 날 때까지 식당에서 기다리지 않고 근처 가게에서 잠깐 쇼핑을 할 수도 있고 아니면 다른 식당 자리를 알아볼 수도 있습니다.
자리가 났을 때만 연락이 오기 때문에 미리 가서 기다릴 필요도 없고, 직접 식당 안에 들어가서 자리가 비어 있는지 확인할 필요도 없습니다. 자리가 준비된 시점, 즉 데이터가 준비된 시점에서만 저희가 원하는 동작(자리에 앉는다, 특정 값을 출력한다 등)을 수행할 수 있습니다.

    - 출처:  [Captain Pangyo](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation){: target="_blank" }


4. 콜백 함수의 이름에서부터 알 수 있듯이, 전화를 다시 하다 (?) 라는 뜻이다. (물론 그런 의도가 아니었을지라도)
무엇인가 일을 다른 객체에게 시키고, 그 일이 끝나는 것을 기다리는 것이 아니라 그 객체가 나를 다시 부를때까지 내 할일을 하고 있는 것이다.

   - 출처:  [DalkomIT](https://dalkomit.tistory.com/65){: target="_blank" }


5. 다른 함수의 인자로써 이용되는 함수, 어떤 이벤트에 의해 호출되어지는 함수

   - 출처: [만족](https://satisfactoryplace.tistory.com/18){: target="_blank" }


6. 콜백함수란 어떠한 정보(또는 이벤트)를 관리하는 대상이 자신의 정보가 변경되거나 또는 이벤트가 발생할때 
자신의 변경된 정보나 이벤트에 따른 어떠한 처리를 할 수 있도록 제공하는 함수라고 할 수 있습니다.
어떤 정보를 원하는 쪽이 정보를 제공하는 쪽에게 반복적으로 정보를 요구(또는 확인)하는 방법보다
정보를 제공하는 쪽이 정보를 원하는 쪽에게 통보하는 것

   - 출처: [Only YOUng](https://smok95.tistory.com/193){: target="_blank" }


7. Callback function은, 특정 함수에 매개변수로서 전달된 함수를 지칭합니다.
그리고 그 Callback function은 그 함수를 전달받은 함수 안에서 호출되게 됩니다
{: target="_blank" }
   - 출처: [velopert](https://velopert.com/255){: target="_blank" }


#### 공통점: 이벤트 발생하는 시점에 원하는 동작을 호출하는 함수(비동기)

#### 멘토님: 내가 제어권을 가지지 않아 언제 호출될지 모르는 함수

#### ex: 회사에 입사지원을 하고 서류전형이 합격되어 연락을 받았고 면접날짜를 잡았다.


### 동기, 비동기  

#### 검색결과

1. 동기: 일반적으로 함수가 호출된 후 끝날때까지 다음 구문을 실행하지 않고 대기하고 있는 경우,
   비동기: 일반적으로 함수가 호출된 후 끝날때까지 기다리지 않고 바로 다음 구문을 실행하는 경우

    * 출처: 자바스크립트+jQuery 완전정복 스터디 1 - **[웹동네 김춘경님]**


2. * 동기는 말 그대로 동시에 일어난다는 뜻입니다. 요청과 그 결과가 동시에 일어난다는 약속인데요. 바로 요청을 하면 시간이 얼마가 걸리던지 요청한 자리에서 결과가 주어져야 합니다.

     * 요청과 결과가 한 자리에서 동시에 일어남
     * A노드와 B노드 사이의 작업 처리 단위(transaction)를 동시에 맞추겠다.


   * 비동기는 동시에 일어나지 않는다를 의미합니다. 요청과 결과가 동시에 일어나지 않을거라는 약속입니다.

     * 요청한 그 자리에서 결과가 주어지지 않음
     * 노드 사이의 작업 처리 단위를 동시에 맞추지 않아도 된다.

    * 동기와 비동기는 어떤 작업 혹은 그와 연관된 작업을 처리하고자 하는 시각의 차이입니다. 동기는 추구하는 같은 행위(목적)가 동시에 이루어지며, 비동기는 추구하는 행위(목적)가 다를 수도 있고, 동시에 이루어지지도 않습니다.

    * 출처: [공부해서 남 주자](https://private.tistory.com/24){: target="_blank" } 


   
3. 자바스크립트의 비동기 처리란 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 특성을 의미합니다.

     * 출처 : [Captain Pangyo](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation){: target="_blank" }


#### 공통점: 특정 로직이  끝날때까지 기다리지 않고 먼저 실행되는 경우 

### 콜백헬

* 어마무시한 중첩함수자체가 콜백헬을 만드는게 아니라 콜백함수는 비동기인데 그안에 동기적인 코드를 넣으려고 하니 콜백헬에 빠지게 되는것

### Promise

* 콜백함수의 단점
  
	* 가독성이 떨어진다.
	* 코드를 수정하기도 만들기도 어렵다.
	* 그리고 콜백헬...😈
  
* 비동기코드를 동기 코드로 짤 수 있게 만들어주는 패턴

### async/await

* ES8문법으로 Promise의 단점을 보완
* async/await이 Promise보다 좋은 이유
  
	* 코드가 간결하고 깔끔해진다.
	* try / catch로 에러 핸들링이 가능하다.
* 다른 언어에서는 이미 사용하고 있음
  
  * ex: C#(5.0부터), 스칼라, 파이썬(3.5부터) 등등 `en.wikipedia.org/wiki/Async/await`
  