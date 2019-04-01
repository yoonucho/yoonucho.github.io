---
layout: post
title: "Rest와 WebSocket의 차이"
date: 2019-04-01
comments: true
categories: review
---

### Rest와 WebSocket의 차이
 
*  가장 큰 차이점은 접속을 유지하는지의 여부이다.
  
  
### WebSocket이전의 양방향 통신 방법

### Rest

#### Polling 

* 클라이언트가 서버에서  Http Request를 주기적으로 요청하고 서버가 응답하는 방식
* 가장 쉬운 방법이지만 클라이언트의 수가 증가하면 서버의 부담도 커진다.

#### Long Polling 

* 클라이언트가 서버에 Http Request를 요청하면  서비는 대기하고 있다가 이벤트 발생시 클라이언트에게 응답하는 방식
* Polling 처럼 불필요한 요청에 계속 응답하는 것이 아니기 때문에 요청에 따른 커넥션 맺는 과정에서 발생하는 비용이 줄어든다. 하지만 클라이언트의 수가 증가하면, 
그에 따른 응답을 해야하는 수도 증가하기 때문에 Polling과 큰 차이는 없게 된다. 또한. 다수의 클라이언트가 동시에 이벤트가 발생할 경우 
서버는 각 클라이언트에게 응답을 하게 되고 그 다수의 클라이언트는 서버에게 곧바로 요청을 하기 때문에 이 순간 서버의 부담도 커진다.

#### Streaming 

* Long Polling과 마찬가지로 클라이언트에서 서버로 일단  Http Request를 요청한다 서버에서 클라이언트로 이벤트를 전달할 때 해당 요청을 끊지 않고 필요한 메시지만 보내기를(flush) 반복하는 방식이다. 
* Long Polling에 비해 서버에서 메시지를 보내고도 다시 Http Requestt 연결을 하지 않아도 되어 부담이 경감될것으로 보인다.

#### AJAX

* AJAX는 Javascript의 XmlHttpRequest 객체를 기반으로 한다. 비동기 Javascript 및 XML의 축약 된 양식이다 . XmlHttpRequest 객체를 사용하면 전체 웹 페이지를 다시 로드하지 않고도 Javascript를 실행할 수 있다. AJAX는 웹 페이지의 일부만 송수신

* 서버가 요청없는 클라이언트에게 먼저 통신을 할수 있는 방법이 없음. 반이중 통신

### WebSocket

![WebSockets-Diagram](https://yoonucho.github.io/post_img/WebSockets-Diagram.png "WebSockets-Diagram")

* 순수 웹 환경에서 실시간 (양방향) 통신을 위한 스펙

* 서버와 클라이언트가 지속적으로 연결된 TCP라인을 통해 실시간으로 데이터를 주고 받을 수 있도록하는 HTML5의 새로운 사양

* 일반적인 TCP소켓과 같이 연결지향 양방향 전이중 통신이 가능하다.

* 채팅, 게임, 실시간 주식차트와 같은 실시간이 요구되는 응용프로그램 개발에 사용가능

* 클라이언트와 서버간에 전이중 통신을 수행하려면 클라이언트가 서버로 HTTP UPGRADE 요청을 보내야 한다. 이를 웹 소켓 프로토콜 핸드 쉐이크라고한다.
 
### 참고사이트

* http://blog.naver.com/PostView.nhn?blogId=foxmann&logNo=90140923533

* https://www.pubnub.com/blog/2015-01-05-websockets-vs-rest-api-understanding-the-difference/

* https://lkhlkh23.tistory.com/121

* https://medium.com/@flsqja12_33844/http%EC%97%90%EC%84%9C%EB%B6%80%ED%84%B0-websocket%EA%B9%8C%EC%A7%80-94df91988788

* https://adrenal.tistory.com/20

* https://m.mkexdev.net/98


