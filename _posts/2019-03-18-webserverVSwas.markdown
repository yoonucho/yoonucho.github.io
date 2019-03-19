---
layout: post
title: "Web Server와 WAS의 차이"
date: 2019-03-18
comments: true
categories: review
---

### Web Server

#### Web Server

* 클라이언트가 보내는 HTTP요청을 받아 서버에 있는  HTML, CSS, 자바스크립트를 전송하는 역할, 리소스 송신

#### 종류 

* 아파치
* nginx
* IIS 
* node.js
* WebtoB
* Mongoose
* Lighttpd
* LightSpeed
* Zeus


### Web Application Server 

#### Web Application Server

* 비즈니스 로직 수행 (서블릿(Servlet)을 통해 JSP를 처리하고, 서버 하드웨어의 쓰레드를 처리하고, 데이터베이스에 접속하여 SQL 쿼리문에 대한 결과값을 반환하는 역할)

*  대부분이 자바 기반으로 주로 자바 EE 표준을 수용하고 있으나, 자바 기반이지만 자바 EE 표준을 따르지 않는 제품과 .NET이나 Citrix 기반인 비 자바 계열도 존재함.

#### 종류 

* 톰캣 (Web Server 기능 포함)
* JEUS
* WebLogic
  
### Web Server와 WAS의 차이
 
* Web Server는 정적인 데이터를 처리 (ex: 이미지파일, HTML문서)
* WAS는 정적,동적처리 둘다 가능하지만 효율적인 자원관리를 위해 동적인 데이터를 처리 
  
### 참고사이트

* https://jeong-pro.tistory.com/84

* https://gmlwjd9405.github.io/2018/10/27/webserver-vs-was.html

* https://limmmee.tistory.com/4

* https://namu.wiki/w/%EC%9B%B9%20%EC%84%9C%EB%B2%84?from=%EC%9B%B9%20%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98%20%EC%84%9C%EB%B2%84#s-6

* https://ko.wikipedia.org/wiki/웹_애플리케이션_서버