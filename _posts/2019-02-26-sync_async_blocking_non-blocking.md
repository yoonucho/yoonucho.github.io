---
layout: post
title: "sync, async vs blocking, non-blocking"
date: 2019-02-26
comments: true
categories: review
---

## non-blocking, blocking

### 검색결과


1.  호출된 함수가 바로 리턴해서 호출한 함수에게 제어권을 넘겨주고, 호출한 함수가 다른 일을 할 수 있는 기회를 줄 수 있으면 NonBlocking이다.

    그렇지 않고 호출된 함수가 자신의 작업을 모두 마칠 때까지 호출한 함수에게 제어권을 넘겨주지 않고 대기하게 만든다면 Blocking이다.

    - 출처 : https://homoefficio.github.io/2017/02/19/Blocking-NonBlocking-Synchronous-Asynchronous/#btn-open-shareoptions **[HomoEfficio]**

2.  Non-blocking이란, 어떤 쓰레드에서 오류가 발생하거나 멈추었을 때 다른 쓰레드에게 영향을 끼치지 않도록 만드는 방법들을 말한다

    그렇지 않고 호출된 함수가 자신의 작업을 모두 마칠 때까지 호출한 함수에게 제어권을 넘겨주지 않고 대기하게 만든다면 Blocking이다.

    - 출처 : https://tech.peoplefund.co.kr/2017/08/02/non-blocking-asynchronous-concurrency.html **[Peoplefund Tech]**

3.  블로킹은 자신의 수행결과가 끝날 때까지 제어권을 갖고 있는 것을 의미합니다.

    논블로킹은 자신이 호출되었을 때 제어권을 바로 자신을 호출한 쪽으로 넘기며, 자신을 호출한 쪽에서 다른 일을 할 수 있도록 하는 것을 의미합니다.

    - 출처: https://victorydntmd.tistory.com/8 [victolee]

4.  애플리케이션 실행 시 운영체제 대기 큐에 들어가면서 요청에 대한 system call이 완료된 후에 응답을 보낼 경우 blocking

    애플리케이션 실행 시 운영체제 대기 큐에 들어가지 않고, 실행 여부와 관계없이 바로 응답을 보낼 경우 non-blocking

    - 출처: https://www.slipp.net/questions/367 **[SLiPP]**

## sync, async vs blocking, non-blocking 차이점

![non-blocking, blocking](https://yoonucho.github.io/post_img/IOmodels.gif "non-blocking, blocking")


### 검색결과

1. Blocking/NonBlocking은 호출되는 함수가 바로 리턴하느냐 마느냐가 관심사다.

   Synchronous/Asynchronous는 호출되는 함수의 작업 완료 여부를 누가 신경쓰냐가 관심사다.

   Blocking-Async의 대표적인 케이스가 Node.js와 MySQL의 조합이라고 한다.

     - 출처 : https://homoefficio.github.io/2017/02/19/Blocking-NonBlocking-Synchronous-Asynchronous/#btn-open-shareoptions **[HomoEfficio]**

2. 시스템콜이 즉시 리턴될때 데이터와 함께 오면 Nonblocking, 함께 오지 않으면 Asynchronous

	시스템콜의 리턴을 기다리는 동안 대기 큐에 머무는 것이 필수면  Synchronous, 필수가 아니면 Blocking
	- 출처: https://www.slideshare.net/unitimes/sync-asyncblockingnonblockingio **[Cheoloh Bae]**


3.  system call이 반환될 때 실행된 결과와 함께 반환될 경우 non-blocking, 
	system call이 반환될 때 실행된 결과와 함께 반환되지 않는 경우 asynchronous,
	시스템의 반환을 기다리는 동안 대기 큐에 머무는 것이 필수가 아니면 synchronous, 
	시스템의 반환을 기다리는 동안 대기 큐에 머무는 것이 필수이면 blocking
    - 출처: https://www.slipp.net/questions/367 **[SLiPP]**
