---
layout: post
title: "이슈노트 7"
date: 2019-01-25
comments: true

categories: issue_note
---

## 이슈 내용

사이드프로젝트에 백엔드서버를 Express와 Mongoose를 이용해 만들 계획을 하고 구글링을 통해 유투브 채널 CodingTheSmartWay.com의 The MERN Stack Tutorial을 알게 되었었는데 드디어 마지막 컨텐츠가 업데이트가 되어서 [The MERN Stack Tutorial - Building A React CRUD Application From Start To Finish - Part 4](https://www.youtube.com/watch?v=GIITXvYD7pc)를 통해 튜토리얼을 진행중 개발자도구 콘솔창에 워닝코드가 발생함.

### 원인 

todos-list.component에 라이프사이클 메서드중 componentDidMount에서  axios를 통하여  데이터를 요청했는데 componentWillUnMount를 써서 수정을 하거나 취소를 해줘야 메모리 누수가 없다는 거 같다. 

![waring_msg](https://yoonucho.github.io/post_img/code5.jpg "componentWillUnMount Warning")
  

### 과정

1. 워닝 코드 확인

2. 구글링

### 방법  

1. (https://github.com/material-components/material-components-web-react/issues/434)

2. 기존에는 isMounted()를 지원하였으나 현재는 안티 패턴이라고 한다.

- [리액트 공식문서 블로그](https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html)

### 해결

- 나는 1번으로 해결하였다. 

~~~javascript

export default class TodosList extends Component {
	_isMounted = false; // 추가코드

	constructor(props) {
		super(props);
		this.state = { todos: [] };
	}

	componentDidMount() {
		this._isMounted = true; // 추가코드
		axios
			.get("http://localhost:4000/todos/")
			.then(response => {
				if (this._isMounted) {
					this.setState({ todos: response.data });
				}
			})
			.catch(error => {
				console.log(error);
			});
	}
	// 중략

	componentWillUnmount() {
		this._isMounted = false; // 추가코드
		console.log("componentWillUnmount");
	}

	// 중략
}

~~~ 

### 이유
 1. 방법 2번대로 Promise로 구현해보고 싶었으나 내가 느끼기에는 코드가 너무 길어보여서
  비효율적이라는 생각이 들었다.  또한 내생각대로 제대로 되는거 같지도 않아 (Promise를 잘 몰라서 그런걸지도) 좀 더 글을 검색해보다가 [리액트 코리아 ](https://www.facebook.com/groups/react.ko/permalink/1676709252589240) 
 이 글의 이재호님의 댓글을 보고 결정하게 되었다. 
