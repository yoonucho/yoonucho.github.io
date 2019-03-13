---
layout: post
title: "axios VS fetch"
date: 2019-03-13
comments: true
categories: review
---

### 무엇을 할때 사용하는가?

* 애플리케이션에서 사용할 데이터를 요청할때 

### 왜 사용해야 하는가

#### **[fetch]**

* import를 하지 않고 사용할 수 있다.
* Promise기반이다

#### **[axios]**

* JSON 데이터의 자동 변환을 수행한다.
* Promise기반 비동기  API 라이브러리
* API URL의 기본 인스턴스를 만들 수 있다.
* fetch보다 다양한 기능을 지원한다.  

### 단점은 뭐가 있나

#### **[fetch]**

* 요청을 취소하는 abort 메서드를 지원하지 않는다.
* IE 지원안함
* response timeout API 제공이 안된다.
  
#### **[axios]**

* IE 지원안함
* fetch보다 무겁다(?)
  
### 실제 사용 예시

**[fetch 사용 예시]**


~~~javascript
let url = 'https://someurl.com';
let options = {
	method: 'POST',
	mode: 'cors',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json;charset=UTF-8'
	},
	body: JSON.stringify({
		property_one: value_one,
		property_two: value_two
	})
};
let response = await fetch(url, options);
let responseOK = response && response.ok;
if (responseOK) {
	let data = await response.json();
	// do something with data
}
~~~


**[axios 사용 예시]**

~~~javascript
let url = 'https://someurl.com';
let options = {
	method: 'POST',
	url: url,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json;charset=UTF-8'
	},
	data: {
		property_one: value_one,
		property_two: value_two
	}
};
let response = await axios(options);
let responseOK = response && response.status === 200 && response.statusText === 'OK';
if (responseOK) {
	let data = await response.data;
	// do something with data
}
~~~

### 주관적인 결론은

* 리액트같은 SPA에서는 기존 요청을 취소할 수 있는 axios 라이브러리를 사용하는게 유지보수를 위해서도 좋을거 같다라는 생각이 들었다. 그리고 IE를 지원안하는거 말고는 안 쓸 이유가 없다. 
  

### 참고사이트

* https://developer.mozilla.org/ko/docs/Web/API/Fetch_API
  
* https://medium.com/little-big-programming/%EB%82%B4%EA%B0%80-fetch-api%EB%A5%BC-%EC%93%B0%EC%A7%80-%EB%AA%BB%ED%96%88%EB%8D%98-%EC%9D%B4%EC%9C%A0-3c23f0ec6b82
  
* https://css-tricks.com/using-data-in-react-with-the-fetch-api-and-axios/
  
* http://www.realhanbit.co.kr/books/87/pages/1563/preview
  
* https://stackoverflow.com/questions/40844297/what-is-difference-between-axios-and-fetch
  
* https://medium.com/@kkak10/javascript-fetch-api-e26bfeaad9b6



