---
layout: post
title: "사이드프로젝트 냥터레스트2"
date: 2019-10-14
comments: true
categories: side_project
---

## 진행중 어려웠던 점은 무엇이며 어떻게 해결하였나요?


### 1. CORS 이슈

* 맨처음으로 겪었던 문제는 CORS 이슈였습니다.

* 유기묘들의 정보를 공공데이터포털(https://www.data.go.kr/)에서 제공받았는데 API주소를 프론트에서 직접적으로 넣으면 
  이슈를 뿜는걸 처음으로 알게 되었습니다.

![error_msg](https://yoonucho.github.io/post_img/code7.gif "안녕 CORS 이슈 월드에 온 것을 환영해")

  
### 과정

#### 방법 모색 1

*  Cors이슈를 해결하기 위해서 서버 세팅을 해야 하는게 처음에는 납득이 가지 않았습니다. 그래서 프론트에서만 해결할 수 방법들을 모색하였습니다. 
대략적으로 5가지 방법을 확인하였습니다.

   1. 구글확장 프로그램 설치 - [Allow-Control-Allow-Origin: *] (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?utm_source=chrome-ntp-icon)	

   2.  크롬에서 --disable-web-security 옵션을 추가하여 크롬 실행
   3.  JSONOP 방식으로 요청
   4. API 요청서버에서 cors 설정을 지원하는지 확인 

*  이 중에 3번은 우회적인 방법이라 마음이 내키지 않아서 보류하였고, 4번은 공공데이터포털에서 Cors 이슈에 대한 문서를 제공하는걸 보니 Cors설정을 지원하지는 않는거 같아서 포기하였고 , 1번과 2번을 시도해 보게 되었습니다.

#### 시도결과

1. Allow-Control-Allow-Origin: * 설치 - 이상하게도  해결이 되지 않았고 오히려 기존 유투브와 AWS사이트에서 에러를 발생하는 문제가 발생하여서 실패

2. --disable-web-security - 역시나 실패


#### 방법모색 2

* 결국 이런저런 삽질끝에 서버세팅을 하여야 해결할 수 있겠구나 깨닫게 되었습니다. 😢

#### 백알못의 고민

* 백알못 (백엔드를 알지 못함)이라 본인의 무지에 너무 답답하였습니다.  
 서버는 node.js로 세팅을 했는데 이걸 API서버와 어떻게 연결해야 할지
 서버와 프론트는 어떻게 연결해야 할까 ? DBMS가 있어야 하나 당장 DB는 필요없는데 같은 엉뚱하고 바보같은 고민에 휩싸였었습니다.

#### 해결과정

1. API서버와 어떻게 연결해야 할까

	* node-fetch를 설치하여 로컬 서버에서 fetch로 공공데이터 API주소를 요청하였습니다.

    	  * npm install node-fetch --save
 
 server.js (서버 http://localhost:8080)

```javascript 

const fetch = require("node-fetch");

// 중략

router.get("/", (req, res) => {
	fetch(
		"http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?serviceKey="발급받은 서비스키"
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

```

2. 서버와 프론트는 어떻게 연결해야 할까

   * 프론트 에서 fetch로 http://localhost:8080을 요청하였습니다.

App.js (프론트 http://localhost:8080) 

```javascript 

// 중략

	callApi = () => {
		return fetch("http://localhost:8080")
			.then(res => res.json())
			.then(json => json.response.body.items.item)
			.catch(err => console.log(err));
	};

// 중략

```


#### 삽질 이유를 정리해보자면

1. 어짜피 있어야 할 서버인데 서버를 만들고 싶지 않은 이상한 고집때문에 며칠을 몸고생 맘고생을 하였습니다. 😔

2. 전체적인 흐름을 이해하지 못한게 가장 큰 원인이라 생각하였습니다.

#### 느낀점

1. 고집을 부리면 몸과 마음이 고생한다는걸 몸소 느꼈습니다. 아니다 싶으면 빨리 포기할 줄도 알아야 한다고 생각했습니다.

2. 사실 몇 달전에 혼자 진행하다 보류한 사이드프로젝트가 있었는데 그 때 정확히 CORS모듈이 왜 필요한지도 모르고 설치를 했어서 이런 문제는 겪어본적이 없이

무난히 지나갔었습니다. 그당시 그냥 지나간 댓가를 톡톡히 치뤘다고 생각합니다. 작은 모듈설치도 가볍게 여기지 말자고 생각했습니다.
   

-------------------------------------------------------------------------------------------------------------------------------------------


### 2. 프로젝트에 MobX 적용하기

#### 과정

* eject 명령어로 CRA(Creat-React-App) 추출
  
<pre> yarn run eject </pre>

* yarn.lock파일 제거

* MobX 및 관련 라이브러리 설치

<pre> yarn add mobx mobx-react babel-preset-mobx </pre>

* package.json 파일을 연 뒤 babel 부분 수정

 ``` javascript

		"plugins": [
			[
				"@babel/plugin-proposal-decorators",
				{
					"legacy": true
				}
			],
			[
				"@babel/plugin-proposal-class-properties",
				{
					"loose": true
				}
			]
		]

```


*  state , action 로직 분류 및 위치 이동
  
   * setState는 불필요한 렌더링을 만듭니다.
   * @action으로 state를 동기적 방식으로 변경할수 있습니다.
  
 <pre> 기존 src폴더 구조 </pre>

![기존 src폴더 구조] (https://yoonucho.github.io/post_img/tree1.gif)

 <pre>MobX적용후 src 폴더 구조</pre>

 
 ![MobX적용후 src 폴더 구조] (https://yoonucho.github.io/post_img/tree2.gif)


* root에 있는 index.js에 Provider로 프로젝트에 스토어 적용
  
  
``` javascript

  	import { Provider } from "mobx-react";
	import RootStore from "./Stores";

	// 스토어 인스턴스 생성
	const root = new RootStore();

	// App 컴포넌트를 Provider컴포넌트로 살포시 감싸준다.
	ReactDOM.render(<Provider {...root}><App /></Provider>, document.getElementById("root"));  

```

* List.js에 @observer를 사용한다.
* 그 위에 @inject('listStore')를 넣어주면  listStore를 props로 전달받을 수 있게 된다.
  
``` javascript

	import { observer, inject } from "mobx-react";

	@inject('listStore')
	@observer
	class List extends Component {
		componentDidMount() {
		... 중략

```


* listStore.js에서 observable를 사용하여 state를 관리

``` javascript

	import { observable, action } from "mobx";

	@observable items = [];
	@observable numOfRows = 72;
	@observable pageNo = 1;
	@observable scrolling = false;
	@observable hasMore = true;
	@observable isLoading = false;
	@observable error = false;

```

* async, await은 state가 변화하는 코드를  runInAction 유틸리티로 감싸 action을 실행 할 수 있다.

``` javascript

	import { observable, action, runInAction } from "mobx";

	@action
	// 매개변수로 pageNo를 넣어준다.
	loadList = async (pageNo) => {

		try {
			const { items, pageNo, numOfRows } = this;
			const url = `/page/${numOfRows}/${pageNo}`;
			const response = await fetch(url);
			const json = await response.json();

			runInAction(() => {
				console.log(this)
				console.log(`${this}, "numOfRows:" ${numOfRows}, "pageNo:" ${pageNo}`);
				this.setItems([...items, ...json.items.item]);
			});


		} catch (err) {
			runInAction(() => {
				console.log(err);
				this.isLoading = false;
			})
		}
	};

```

* 기존 액션함수들도 문법에 맞게 코드를 수정해준다.
  
```javascript

	@action
	setItems = (items) => {
		this.items = items;
		this.isLoading = false;
		this.scrolling = false;
	}

	@action
	loadMore = () => {
		this.pageNo++;
		this.isLoading = true;
		this.scrolling = true;
		this.loadList();
	}

	... 중략
	

```

#### 어려웠던 점
	
* 정말 1도 모를때는 별도의 state관리 개념이 자식 컴포넌트까지 완전히 분리하는 작업인가라고 상상했었습니다. ㅋ
* 포스팅이나 관련 유투브를 보고 튜토리얼을 진행하면서  이걸 내 프로젝트에는 어떻게 적용해야하나 막막하고 어렵게 느껴졌습니다.
* 실제로 적용하면서는 보기에는 제대로 동작하는 코드를 다시 바꿔야하는 과정이 두려워서 코드를 바꾸는데 한없이 쭈구리가 되었었습니다.
* @observable를 붙이기만 해도 된다는 걸 의심했었습니다. 
* state가 적용되는 코드를 분류하는 과정이 이게 제대로 된게 맞는지 확신이 없었습니다.
* MobX적용하는 문법(?)이  검색해봤을때 개발자의 취향이나 필요에  따라서  조금씩 다른 부분이 있었고 저는 어떤걸 적용해야 할지 고민이 되었었습니다.
* MobX를 적용하면서 제대로 적용을 못했을때 에러를 뿜거나 제대로 실행이 안되어서 좌절도 하였었습니다.

#### 느낀 점

* state와 액션을 따로 분류하니 리액트 컴포넌트를 정말 뷰로 사용할 수 있겠구나 감탄하며 구조의 깔끔함을 경험하였습니다!
* 이래서 흑마법 흑마법하는구나라며 작은 공감을 하게 되었습니다.

-------------------------------------------------------------------------------------------------------------------------------------------

### 3. 상단 필터박스 달력으로 지정한 날짜 데이터  연동 구현


#### 발생 문제

- 기본 일주일치 날짜 데이터는  제대로 검색이 된걸 확인하였습니다.
- 그러나 출력되지 않은 일자에 대한 내용은 나오지 않았습니다.
   
#### 해결방법 모색
	
1. 백엔드에서 bgnde과 endde를 바디로 받은 주소를 fetch하는 방식
2. 달력 lib에서 featch관련 api 찾기
3. 제공되는 api가 없으면 다른 달력 lib로 바꾸기
4. result로 새로운페이지로 넘기기   

#### 백알못의 고민 

1. 우선 클라이언트에서 서버에 요청을 하면 서버는 응답을 해야겠지
2. 백엔드의 리퀘스트 파라미터를  react에 어떻게 넘기나
3. 또 react의 bgnde와 endde 값을 백엔드에 어떻게 요청해야 할까 고민의 연속이었습니다.

#### 나름의 전략

* 백엔드쪽 node.js 공공데이터포털 open Api의 요청변수 bgnde(공고 시작일)와 endde(종료일)을  post방식으로 body로 받아와서  리액트쪽에서 달력 날짜를 선택할 시 from과 to값으로 넣어서 원하는 날짜를 검색할시 결과물을 보여주는 방식이었습니다. 

1. 백엔드쪽에서 바디에 bgnde와 endde에 YYYYMMDD형식으로 스트링값을 넣어보자.

2. 달력은 전체 리스트에서 검색해야할텐데 그래서 infinite scroll이 아닌 result에서 넘겨야할거같다?

3. 리스트가 처음 나올때는 날짜가 필터링되기전의 데이터가 나와야할거같다 handleOnChange함수를 실행했을때 바뀌는걸로 

4. 달력 from, to값을 undefined로 설정하자.
   

#### 고통과 고난의 시간

* 거진 일주일 내내 삽질을 했었습니다. 요청변수값이 undefined가 나오니 뭘 어찌할 수가 없었습니다... ㅠ^ㅠ
더구나 post로 요청하려하니 웹에서는 확인도 할수 없고 포스트맨으로 하는것도 한계가 있고 그래서 get방식으로 바꿔서 시도해보았습니다.
개발자도구 네트워크탭에서 fetch url의 주소가 보이니 훨씬 수월해졌습니다.

* 다시 삽질끝에 알아낸 건 결국 저번과 비슷한 type의 충돌문제였습니다.
백엔드 요청변수 bgnde와 endde의 타입을 string으로 변경하니 드디어 검색이 되었습니다!!! 😹

 ```javascript

  // Node.js

	router.get("/page/:bgnde/:endde/:numOfRows/:id/", (req, res) => {

		const { bgnde, endde, numOfRows, id } = req.params;
		const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${id}`;

		fetch(url)
			.then(response => response.json())
			.then(json => {
				res.send(json.response.body);
				console.log(bgnde, endde, json.response.body.totalCount);
			})
			.catch(() => {
				res.send(JSON.stringify({ message: "System Error" }));
			});
	});

```


```javascript

 // React.js

	@action
		loadList = async () => {

			// 중략...
				const { items, pageNo, numOfRows, from, to } = this;
				const happenFrom = moment(from).format("YYYYMMDD")
				const happenTo = moment(to).format("YYYYMMDD")
				const url = `/page/${happenFrom}/${happenTo}/${numOfRows}/${pageNo}`;
			// 중략...
		}

```

#### 나의 착각

1. 요청변수를 post로 받으면 그값이 res.json에 담겨야 한다는 큰 착각을 하였었습니다.
제가 이렇게 착각한 이유중 하나는 검색해서 본 유투브 영상이나 글들은 새로운 값을 넣는 예시였기 때문에 그리 생각을 하게 되었었습니다.

2. 달력연동에서 fetch는 어떻게 연결을 해야하나 라이브러리 api를 찾아보았으나 없어서 막막했었습니다.
   달력에서 입력받는 value값이 to와 from인데 fetch와 어떻게 접목(?)시켜야하나 싶어서 엉뚱하게도 fetch기능을 제공하는 달력라이브러리가 있나 검색을 열심히 하였으나 마땅한 라이브러리를 찾지 못했었습니다.

3. 정말 부끄럽게도 이번에 삽질하면서야 안 사실인데 백엔드의 파라미터와 프론트에서의 파라미터이름이 동일해야 하는줄 알았습니다.	
   그래서 요청변수 bgnde와 endde에  날짜 value값 from과 to을 어떻게 넣어야 하나라고만 생각을 했었다가 
   파라미터이름이 동일하지 않아도 된다는게 기억나서 url에 파라미터로 바로 넣으면 되지 않을까라는 생각이 들었고 시도하였고 
   그 생각이 맞았음에 살짝 허무하면서도 신기하다고 생각했습니다. 

4. 이 후 Post방식을 해보고서야 알게 되었는데 Get방식은 url에 요청변수를 그대로 넣기 때문에 변수이름이 달라도 괜찮지만 Post는 Body에 싣는거기 때문에
   백엔드와 이름이 동일해야 백엔드가 제대로 값을 받아오는 걸 알게 되었습니다.


#### 느낀 점

 1. 혼자 머리싸매고 고민하다가 개발자 커뮤니티나 지인 개발자분에게 질문을 하려고 보니 내용정리가 필요했고  그 과정중에 이유를 발견할 수 있었습니다.
   해결이 되지 않을때는 풀리지 않는 문제에 대해서 생각을 정리 하는 시간이 필요하다고 깨달았습니다. 

 2. 문제가 해결되지 않을때는 잠시 그 환경에서 벗어나는 것도(?) 필요하다고 생각했습니다. 휴식으로 머리를 맑게 하고 다시 그 환경으로 들어갈 때 수월해지는 경험도 하게 되었습니다.
