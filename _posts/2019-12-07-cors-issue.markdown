---
layout: post
title: "냥터레스트, CORS를 모르는 프론트엔드 아깽이"
date: 2019-12-05
comments: true
categories: 1stHomecomingday 
---


## 간단 소개

* 안녕하세요. 정혜인님과 사이드 프로젝트 냥터레스트를 진행중인 조윤우라고 합니다.

* 냥터레스트는 유기묘 정보를 제공해주는 웹서비스이며 프론트엔드는 React, 백엔드는 node.js로 구성되어 있습니다.

* 냥터레스트에 대한 좀 더 자세한 내용은 [사이드 프로젝트 냥터레스트](https://yoonucho.github.io/side_project/2019/10/14/nyangterest_view.html){: target="_blank" }에 있습니다.
  
* 냥터레스트를 진행하면서 겪은 문제점이 많은데 그중 CORS 이슈에 대해서 여러분들과 공유해보려고 합니다. 

* 내용은 당시 겪었던 내용에 발표자료를 준비하면서 테스트한 내용을 추가하였습니다.


## 문제발생!

*  유기묘들의 정보를 [공공데이터포털](https://www.data.go.kr/){: target="_blank" }에서 제공받았는데 API주소를 프론트쪽에 직접적으로 넣으면 이슈를 뿜는걸 처음으로 알게 되었습니다. 
  
![error_msg](https://yoonucho.github.io/post_img/cors1.jpg "안녕 CORS 이슈 월드에 온 것을 환영해")

* 말로만 듣던 CORS 이슈를 정면으로 마주하게 되었습니다. 😢
  

## 3가지 키워드

* 우선 내용을 좀 더 쉽게 이해하실 수 있도록 3가지 키워드에 대해서 설명을 해보려고 합니다. 


### CORS

* CORS? Cross-Origin Resource Sharing의 약자로 교차 출처 자원 공유를 말합니다.

* 서버와 클라이언트가 정해진 헤더를 통해 서로 요청이나 응답에 반응할지 결정하는 방식입니다. 

* 원래 도메인과 다른 도메인에서 요청한 웹페이지 자원에 대해 허가하는 메커니즘을 말합니다. 

* SOP를 우회하는 방법중 하나입니다.
  

### SOP

* Same-origin policy의 약자로 동일출처정책을 말합니다. 

* 어떤 출처에서 불러온 문서나 스크립트가 다른 출처에서 가져온 리소스와 상호작용을 하는것을 제한하는 중요한 보안방식입니다.
  
* Cross Domain Issue에 대한 근본적인 원인이기도 합니다.

* 두 페이지의 프로토콜, 호스트, 포트가 같아야 합니다.


### Cross Domain Issue

* 데이터를 호출하는 도메인과 데이터를 반환하는 도메인이 다른것을 말합니다.
  

## 방법모색 1 (테스트)

*  CORS 이슈를 해결하기 위해서 프론트에서만 해결할 수 있는 방법들을 모색하였습니다.  당시에는 백엔드 세팅을 안하고 간단하게 테스트만 해보고 싶었습니다.

   1. 크롬확장 프로그램 설치 - [Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf){: target="_blank" }

   2.  크롬에서 --disable-web-security 옵션을 추가하고 실행

   3.  JSONP방식으로 요청

   4. API 요청서버에서 CORS 설정을 지원하는지 확인 


*  3번은  여러 보안상 이슈로 인하여 W3C에서는 2009년 채택된 CORS 방식의 HTTP 통신을 권장하고 있다고 해서 패스하였고

*  4번은 공공데이터포털에서 CORS 이슈에 대한 문서를 제공하는 걸 보니 CORS설정을 지원하지는 않는거 같아 1번과 2번을 시도하게 되었습니다.


## 시도결과

1. Allow CORS: Access-Control-Allow-Origin 설치 
 
  *  냥터레스트에 적용할 당시에 있던 크롬확장프로그램은 없어졌습니다. 

  *  같은 기능을 하는 다른 확장프로그램을 설치하였고 화면이 제대로 나오는걸 확인할 수 있었습니다.

	
     * Before		
     ![sop우회전](https://yoonucho.github.io/post_img/cors2.jpg)


     * After
     ![sop우회1](https://yoonucho.github.io/post_img/cors3.jpg)



2. --disable-web-security 옵션추가

  *  크롬 바로가기에 오른쪽마우스를 클릭하고 속성을 열어서 --disable-web-security을 추가해보았습니다. 하지만 달라지는게 없었습니다.

  *  다시 검색해보니 --disable-web-security에 --user-data-dir="C:\chrome"를 추가하고 아이콘을 실행하면  C드라이브에 chrome이라는 폴더와 데이터가 생성이 되며 도메인 이슈를 무시하는 브라우저가 새로 열립니다.

   ![sop우회2](https://yoonucho.github.io/post_img/cors4.jpg)


## 방법 모색2 

* 1번과 2번은 개발자가 테스트하기에는 편리한거 같습니다. 하지만 사용자에게 크롬에 확장프로그램을 추가하게 하거나 옵션추가를 요구할 수는 없지요 

* 어짜피 백엔드에서 설정을 해주어야 한다는 사실을 깨닫게 되었습니다.


## 해결과정

1. 서버 응답헤더에 직접 추가 코드를 설정
  
	```javascript 
			app.all("/*", function(req, res) {
				res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
				res.setHeader("Access-Control-Max-Age", "3600");
				res.setHeader(
					"Access-Control-Allow-Headers",
					"Origin, Accept, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
				);
			});

	```

2. Express 미들웨어 CORS모듈을 설치
   
      * npm install cors --save


	```javascript 

		const cors = require("cors");
		const fetch = require("node-fetch");

		// 중략

		router.get("/", (req, res) => {
			fetch(
				"openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?serviceKey="발급받은 서비스키"
			)
				.then(response => response.json())
				.then(json => {
					res.send(json);
				})
				.catch(() => {
					res.send(JSON.stringify({ message: "System Error" }));
				});
		});

		// 중략
		app.use(cors());

	```



## 삽질 이유를 정리해보자면

1. 냥터레스트를 진행하기 전에 비슷한 튜토리얼을 보면서 따라 만들어봤었는데  당시 이용했던 API는 CORS설정을 지원해주는 API여서 별도의 백엔드설정은 없었던 것을 이제야 알게 되었습니다. 

2. 어짜피 있어야 할 서버인데 서버를 만들고 싶지 않은 이상한 고집때문에 며칠을 몸고생 맘고생을 하였습니다. 😔

3. 전체적인 흐름을 이해하지 못한게 가장 큰 원인이라 생각하였습니다.


## 느낀점

1. 고집을 부리면 몸과 마음이 고생한다는걸 몸소 느꼈습니다. 아니다 싶으면 빨리 포기할 줄도 알아야 한다고 생각했습니다.

2. 사실 몇 달전에 혼자 진행하다 보류한 사이드 프로젝트가 있었는데 그 때는 CORS모듈이 왜 필요한지도 모르고 설치를 했어서 이런 문제는 겪어본적이 없이

   무난히 지나갔었습니다. 그당시 그냥 지나간 댓가를 톡톡히 치뤘다고 생각합니다. 작은 모듈 설치도 가볍게 여기지 말자는 생각을 했습니다.

 

## 참고 사이트

* [node.js express에서 CORS 허용하기](http://guswnsxodlf.github.io/enable-CORS-on-express){: target="_blank" }  

* [CORS vs JSONP](https://sjh836.tistory.com/96){: target="_blank" } 

* [크로스-오리진 리소스 공유 CORS](https://zetawiki.com/wiki/%ED%81%AC%EB%A1%9C%EC%8A%A4-%EC%98%A4%EB%A6%AC%EC%A7%84_%EB%A6%AC%EC%86%8C%EC%8A%A4_%EA%B3%B5%EC%9C%A0_CORS){: target="_blank" } 

* [CORS (Cross-Origin Resource Sharing)와 SOP(Same Origin Policy)에 대한 이해](https://www.slideshare.net/DohunKim2/about-cors?qid=04c92f17-1eff-4829-8dc7-c64f91f6f114&v=&b=&from_search=1){: target="_blank" } 
  
* [JSONP란?](https://velog.io/@yesdoing/JSONP%EB%9E%80-jujowt4jy7){: target="_blank" }
