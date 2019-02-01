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

   * (https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html) **[리액트 공식사이트 블로그]** 

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

방법 2번대로 Promise로 구현해보고 싶었으나 내가 느끼기에는 코드가 너무 길어보여서
비효율적이라는 생각이 들었다.  또한 내생각대로 제대로 되는거 같지도 않아 (Promise를 잘 몰라서 그런걸지도) 좀 더 글을 검색해보다가 
(https://www.facebook.com/groups/react.ko/permalink/1676709252589240) **[리액트 코리아]** 
이 글의 이재호님의 댓글을 보고 결정하게 되었다. 

 
### 최종 과정과 해결

우선 멘토님이 내 포스팅을 보시고 코드리뷰 후 async/await로 비동기를 동기식코드처럼
작성하는 코드를 알려 주셨고 그때의 문제의 원인은 setState가 비동기안에 있어서 발생한 문제라 생각했었다.
그래서 이 코드면  _isMounted는 필요가 없겠구나 생각했다.
 
다음날 나는  멘토님이 알려주신대로 코드를 바꿔보았다.

~~~javascript

    componentDidMount() {
        this.getTodos();
    }

    getTodos = async () => {
        try {
            const response = await axios.get("http://localhost:4000/todos/");
                this.setState({ todos: response.data });
        } catch (error) {
            console.log(error);
        }
    };

    componentDidUpdate() {
        this.getTodos();
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

~~~

  사실 맨 처음 코드에서 생략한 부분이 있었는데 튜토리얼시 componentDidMount()와 componentDidUpdate()코드가 똑같았었다.그걸 이번엔 중복을 줄여보려고 getTodos라는 함수를 만들어서 각각 넣어주었다.
  그런데 결과는 처음 마주했던 워닝 코드가 또 뜨는 것이다. 😢

  또  _isMounted를 넣어주니 워닝 코드는 사라졌으나 찜찜한 마음으로 멘토님께 메일을 보냈고 멘토님께서 내가 놓친 부분을 피드백으로 알려주셨다.
  문제의 원인은 component DidUpdate()에 setState였다! 

  워낙 리액트 초보(공부한지 1Mㅋ)에 한동안 리액트코드를 안봐서 그런지 라이프사이클도 다 까먹어서 결국 난 또 삽질을 하고 말았다.😐

  멘토님의 피드백을 토대로 코드를 수정하니 이제 _isMounted와 componentWillUnmount()를 제거할 수 있었다! 😁

**[최종코드]**

~~~javascript

export default class TodosList extends Component {
	constructor(props) {
		super(props);
		this.state = { todos: [] };
	}

	componentDidMount() {
		this.getTodos();
	}

	getTodos = async () => {
		try {
			const response = await axios.get("http://localhost:4000/todos/");
			this.setState({ todos: response.data });
		} catch (error) {
			console.log(error);
		}
	};

	componentDidUpdate(prevProps) {
		return this.state.todos !== prevProps.todos;
	}

	todoList() {
	// 중략
	}
	render() {
	// 중략
}

~~~

### 삽질 이유를 정리해보자면

1. 워닝코드에서 update에 대한 메시지가 있었는데 내가 보고싶은 것만 보고 그부분에 대해서만 해결하려고 했다. (영알못이라 더 그런거 같음)
2. 유투브채널 강의자를 너무 믿었다. (?) 
  * componentDidMount()와 componentDidUpdate()코드가 같은게 계속 마음에 걸리긴 했었다. 하지만 코딩 관련아카데미도 운영하는데 코드가 잘못 될리 없다고 생각하기도 했다 "**세바스찬**아재 이러깁니까" 😠
3. 제일 결정적인건 내가 리알못이라는거 라이프사이클을 이해못한 내가 제일 잘못했다 ㅋ; 
  