---
layout: post
title: "사이드프로젝트 냥터레스트3"
date: 2020-01-14
comments: true
categories: side_project
---

## 냥터레스트를 진행중에 리팩토링한 코드가 있나요?

### Getter

* get을 이용하면 호출시 ()없이 변수처럼 사용할 수 있다는 멘토님의 말씀을 듣고 코드를 정리해 보았습니다.
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/get

* 그런데 수정해야 할 코드가 listStore파일(store)에 있고 Mobx에서는 javascript의 getter에만 사용할 수 있는
@computed라는 데코레이터를 지원한다고 합니다.

* @computed를 사용하면 동작에는 큰차이가 없지만 성능적으로는 최적화를 할 수 있다고 합니다. 

   
### 함수로 만들 코드를 찾아보자.
	
1. happenFrom과 happenTo 
2. totalPage


####  happenFrom과 happenTo 

* 수정 전 

```javascript

		@action
		loadList = async () => {

			try {
				const { items, pageNo, numOfRows } = this;
				const url = `/page/${happenFrom}/${happenTo}/${numOfRows}/${pageNo}`;
				const { from, to } = this.root.searchStore;
				const happenFrom = moment(from).format("YYYYMMDD")
				const happenTo = moment(to).format("YYYYMMDD")
				// 중략
				}
			};

```
* 수정 후

```javascript

		@action
		loadList = async () => {

			try {
				const { items, pageNo, numOfRows, happenFrom, happenTo } = this;
				const url = `/page/${happenFrom}/${happenTo}/${numOfRows}/${pageNo}`;
				// 중략
				}
			};

			@computed
			get happenFrom() {
				const { from } = this.root.searchStore;
				const happenFrom = moment(from).format("YYYYMMDD");
				return happenFrom;
			}

			@computed
			get happenTo() {
				const { to } = this.root.searchStore;
				const happenTo = moment(to).format("YYYYMMDD");
				return happenTo;
			}

```

* 코드 부연 설명: happenFrom()과 happenTo()는 시작일의 변수인 from과 종료일의 변수인 to의 데이타타입을 맞추기 위해서 Date타입에서 YYYYMMDD형식의 스트링으로 변환한 함수입니다. moment 라이브러리를 이용하였습니다.

#### totalPage

* 기존에는 totalPage코드가 listStore.js(store)의 loadMore()와 Home.js에 중복되어서 들어가 있었습니다.

// listStore.js
```javascript
	@action
		loadMore = () => {
			const { pageNo, numOfRows, totalCount } = this;
			const { pageNo, items, numOfRows, totalCount } = this;
			let totalPage = Math.ceil(numOfRows * pageNo) >= totalCount;
			// 중략 
			if (totalPage) {
				return console.log(message.return)
			// 중략
			}
		}

```	

// Home.js
```javascript

	render() {

		let totalPage = Math.ceil(numOfRows * pageNo) >= totalCount;

	}

```	

* loadMore()안의 totalPage를 함수로 만들고 Home.js에는 props로 넘기면  중복없이 사용할 수 있을거 같았습니다. 마찬가지로 computed를 사용하여 코드를 정리를 해보았습니다.

// listStore.js
``` javascript
		@computed
		get totalPage() {
			const { pageNo, numOfRows, totalCount } = this;
			let paging = Math.ceil(numOfRows * pageNo) >= totalCount;

			return paging;
		}
```		
// Home.js
``` javascript
		const { items, isLoading, loading, hasMore, totalPage, totalCount } = this.props.listStore;
		
```		
* 코드 부연 설명: totalPage()는 불리언타입으로 한 페이지에 나타낼 수 있는 아이템 갯수를 나타내는 변수 numOfRows와 페이지수를 나타내는 pageNo를 곱한 값이  총갯수인 totalCount의 값보다 크거나 같으면 리턴을 하는 함수입니다.
   
