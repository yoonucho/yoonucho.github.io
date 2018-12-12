---
layout: post
title: "javascript"
date: 2018-12-12
published: false
comments: true
categories: javascript
---

## ParentNode.append()와 Node.appendChild()의 차이점

모멘텀 클론 강의를 보면서 코딩을 하다가

body.appendChild(image)을 body.append(image)로 해도

되지 않을까 싶어서 수정해보았다.

똑같은 결과물을 볼 수 있었다.

그럼 이 둘의 차이점은 무엇일까 궁금해졌다.

![1-1](https://yoonucho.github.io/post_img/code1.png "해당코드")

1. ParentNode.append()를 사용하면 DOMString객체도 추가 할 수 있지만 Node.appendChild()는 Node 객체만 허용한다

2. ParentNode.append()에는 반환 값이 없지만 Node.appendChild()는 추가 된 Node 객체를 반환한다.

3. ParentNode.append()는 여러 노드와 문자열을 추가 할 수 있지만 Node.appendChild()는 하나의 노드만 추가 할 수 있음.

예를 들어

text.append("야호")는 추가할 수 있지만

text.appendChild("야호")는 에러를 뿜는다.

![1-2](https://yoonucho.github.io/post_img/code2.png "해당코드")
