---
layout: post
title: "사이드프로젝트 냥터레스트1"
date: 2019-10-14
comments: true
categories: side_project
---

## 사이드프로젝트 냥터레스트에 대해서 설명해보세요.

 * 냥터레스트는 유기묘의 정보를 제공해주는 웹서비스입니다.

 {% include nyangtest.html id="Jg1u7te4EYI" %}  


* 기본셋은 오늘 날짜의 유기묘의 리스트를 한 페이지에서 무한 스크롤 형식으로 다음 리스트를 볼 수 있습니다.

![냥터레스트 소개 ](https://yoonucho.github.io/post_img/nyangterest1.jpg)

* 토글버튼아래에 툴팁박스에 안내버튼을 누르면 24시간동안 툴팁박스가 보이지 않게 됩니다.

![냥터레스트 툴팁박스 안내 ](https://yoonucho.github.io/post_img/nyangterest2.jpg)

* 토글버튼을 누르면 검색필터가 보이고 다시 누르면 숨겨집니다.
  
![냥터레스트 토글버튼 ](https://yoonucho.github.io/post_img/nyangterest2-1.jpg)

* 상단검색필터는  엔터없이 선택이나 입력시 원하는 리스트를 바로 볼 수 있게 구현하였습니다.


* 원하는 날짜를 시작일과 종료일로 선택할 수 있습니다.

![냥터레스트 상단필터 날짜선택 ](https://yoonucho.github.io/post_img/nyangterest3.jpg)


* 품종 셀렉트박스로 원하는 품종을 선택한 후 

![냥터레스트 상단필터 품종선택 ](https://yoonucho.github.io/post_img/nyangterest4.jpg)


* 키워드를 넣어서 검색할 수 있습니다.

![냥터레스트 상단필터 키워드 입력 ](https://yoonucho.github.io/post_img/nyangterest5.jpg)


* 리스트를 클릭하면 팝업창이 열리며 상세정보를 볼 수 있는데 보호중은 스카이블루색이 기본이며
  
![냥터레스트 팝업(보호중) ](https://yoonucho.github.io/post_img/nyangterest6.jpg)


* 종료시(입양,안락사,자연사 등등)는  빨강색으로 되어 있습니다.
  
![냥터레스트 팝업(종료) ](https://yoonucho.github.io/post_img/nyangterest7.jpg)



## 냥터레스트를 만들게 된 이유를 설명해주세요.

 * 협업자 한분과 같이 진행했는데 둘다 고양이를 좋아하여 고양이를 먼저 떠올렸고 
 그 중 유기묘에 대한 서비스를 만드는게 좋겠다 생각하며 만들게 되었습니다.


## 냥터레스트는 무슨뜻인가요 ?

 * 고양이를 일컫는 냥 + 이미지공유 SNS 핀터레스트를 합쳐서 만든 이름입니다.
  

## 냥터레스트에서 사용된 기술 스택은 무엇인가요?

 * 프론트엔드 :  React.js

 * 백엔드 : Node.js

 * DBMS(DB관리툴): SQL - MYSQL 

 * 미들웨어 : Express 

 * 상태관리 라이브러리 : Mobx
  
 * 진행 단계

	1단계 레이아웃 잡기 `ovenapp.io`

	2단계 회원가입 시스템 이용약관 구축

	3단계 게시물 검색 시스템 구축


##  협업으로 진행시 어떤 방식으로 진행하였나요?

 *  우선 저 혼자 진행하는게 아니라  간단한 협업 규칙을 만들었고. [냥터레스트 협업규칙](https://github.com/henyy1004/nyangterest/blob/master/collaboration_report/collaboration_rules.md){: target="_blank" }
 
 각자 할 영역을 정하여 해당 영역의 프론트와 백엔드를 전부 맡는 방식으로 진행하였습니다.
 
 * 진행하다가 의문점이 있거나 의논할게 있으면 서로의 시간이 허락하는 시간과 날짜에 온라인과 오프라인으로  회의를 하였으며 회의내용은 협업문서에 기록해두었습니다.
 
 * 기본적으로는 깃헙의 projects를 이용하여 각자 한 일들과 할 일들을 감시(?)또는 파악 할 수 있습니다.
 [냥터레스트 Projects ](https://github.com/henyy1004/nyangterest/projects/1){: target="_blank" }


 내용이 길어져서 페이지를 나누었습니다. [냥터레스트 진행시  이슈와 해결과정 보기](https://yoonucho.github.io/side_project/2019/10/14/nyangterest_issue.html){: target="_blank" }