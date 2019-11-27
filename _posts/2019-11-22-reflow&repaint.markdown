---
layout: post
title: "Reflow와 Repaint"
date: 2019-11-22
comments: true
categories: review 
---

### 11월 기술면접때 받은 질문이었는데 용어가 낯설어서 공부하면서 정리해 보았습니다.

  
#### Reflow

* 생성된 DOM 노드의 레이아웃 수치(너비, 높이, 위치 등) 변경 시 영향 받은 모든 노드의(자신, 자식, 부모, 조상(결국 모든 노드) ) 수치를 다시 계산하여(Recalculate), 렌더 트리를 재생성하는 과정이며 또한, Reflow 과정이 끝난 후 재 생성된 렌더 트리를 다시 그리게 되는데 이 과정을 Repaint 라 합니다.

* 문서 내 노드들의 레이아웃, 포지션을 재계산 후 다시 뿌려주므로 Repaint보다도 더 심각한 퍼포먼스 저하를 유발시키는 프로세스입니다. 
  
* 특정 엘리먼트에 대한 Reflow 발생 시, 페이지에서의 해당 요소는 즉시 Reflow State가 되며 해당 엘리먼트의 자식요소와 부모/조상 요소 역시 레이아웃 계산을 진행합니다. (결국은 페이지 전체를 다시 훑는 것이나 마찬가지) 

   
* 모든 엘리먼트의 위치와 길이 등을 다시 계산하는 것으로 문서의 일부 혹은 전체를 다시 렌더링합니다.
단일 엘리먼트 하나를 변경해도, 하위 엘리먼트나 상위 엘리먼트 등에 영향을 미칠 수 있습니다.
  
* 어떠한 액션이나 이벤트에 따라 html 요소의 크기나 위치등 레이아웃 수치를 수정하면 그에 영향을 받는 자식 노드나 부모 노드들을 포함하여 Layout 과정을 다시 수행하게 됩니다. 이렇게 되면 Render Tree와 각 요소들의 크기와 위치를 다시 계산하게 됩니다. 이러한 과정을 Reflow라고 합니다.

#### Repaint

* Reflow 과정이 끝난 후 재 생성된 렌더 트리를 다시 그리게 되는데 이 과정을 Repaint 라 합니다.

* 엘리먼트의 스킨에 변화가 발생하지만, 레이아웃에는 영향을 미치지 않을 때 유발됩니다. (visibility, outline, background-color 등이
포함) Opera에 따르면 Repaint는 해당 행위가 발생하는 순간, 문서내 DOM tree의 다른 노드들의 스킨까지도 검증해야 하므로 비용이 높다고 합니다.
   

* 레이아웃에는 영향을 주지 않지만, 가시성에는 영향을 주는 엘리먼트가 변경되면 발생합니다.
예를 들면, opacity, background-color, visibility, outline
오페라에 따르면, "브라우저가 DOM 트리에 있는 다른 모든 노드의 가시성을 확인해야 하므로 리페인트는 비용이 많이 든다"고 합니다.
  
* Reflow만 수행되면 실제 화면에 반영되지 않습니다. Render Tree를 다시 화면에 그려주는 과정이 필요합니다. 결국은 Paint 단계가 다시 수행되는 것이며 이를 Repaint 라고 합니다.


#### Reflow 발생하는 상황

* DOM 노드의 변경: 추가, 제거 업데이트

* DOM 노드의 노출 속성을 통한 변경: display:none은 리플로와 리페인트를 발생시키지만 비슷한 속성인 visibility:hidden은 요소가 차지한 영역을 유지해 레이아웃에 영향을 주지 않으므로 리페인트만 발생시킵니다.

* 스크립트 애니메이션: 애니메이션은 DOM 노드의 이동과 스타일 변경이 짧은 시간 내에 수차례 반복해 발생되는 작업입니다.

* 스타일: 새로운 스타일시트의 추가 등을 통한 스타일 정보 변경 또는 기존 스타일 규칙의 변경

* 사용자의 액션: 브라우저 크기 변경, 글꼴 크기 변경 등


#### Reflow를 최소화하고 성능을 향상시키는 방법 

1. Use Best-Practice Layout Techniques

   * 레이아웃을 위해 인라인 스타일이나 테이블을 사용하지 않아야 합니다.

   * 인라인 스타일은 HTML이 다운로드되고 추가 reflow를 트리거할 때 레이아웃에 영향을 미칩니다. 테이블은 셀 치수를 계산하기 위해 파서가 둘 이상의 패스를 필요로 하기때문에 비용이 많이 듭니다. 

   * 테이블 레이아웃 사용: fixed 는 열 너비는 헤더 행 내용을 기반으로 하므로 표 형식의 데이트를 표시할때 도움이 됩니다.

   * flexbox 의 위치와 크기가 HTML이 다운로드 될 때 변경될 수 있기 때문에 메인 페이지 레이아웃에 flex 아이템을 사용하면 성능이 저하 될 수 있습니다.


2. CSS 규칙의 수를 최소화합니다 (Minimize the Number of CSS Rules)
 
   * 사용하는 규칙이 적을수록 reflow가 빨라집니다. 가능한 경우 복잡한 CSS Selector를 피해야 합니다.

   * 이 문제는 부트스트랩과 같은 프레임워크를 사용하는 경우 특히 문제가 될 수 있습니다. 제공된 스타일중 일부를 사용하는 사이트는 거의 없습니다. 사용되지 않는 CSS, uCSS, grunt-uncss, gulp-uncss와 같은 도구는 스타일의 도구와 파일의 크기를 상당히 줄일 수 있습니다.


3. DOM의 깊이를 최소화합니다 (Minimize DOM depths)
   * DOM 트리의 크기와 각 branch의 요소 수를 줄여야합니다. 문서가 작고 얕을수록 reflow 될 수 있습니다. 이전 브라우저를 지원하지 않는 경우 불필요한 wrapper 요소를 제거할 수 있습니다.


4. 하단의 DOM 트리에서 클래스를 변경합니다 (Update Classes Low in the DOM Tree)

   * 가능한 한 최대한 하단의 DOM 트리의 요소(즉, 중첩된 하위 항목이 여러 개 없는 요소)에서 클래스를 변경합니다. 이렇게 하면 reflow 범위가 필요한 만큼의 노드로 제한 될 수 있습니다. 본질적으로 중첩된 child 노드에 대한 영향이 최소인 경우에만 wrapper와 같은 부모 노드에 클래스 변경 사항을 적용합니다.

5. 복잡한 애니메이션 flow에서 제거합니다 (Remove Complex Animations From the Flow)

   * 애니메이션이 position: absolute; 나 position: fixed; 로 문서의 flow 로 부터 제거되어 단일 요소로 적용되어 있는지 확인합니다. 이렇게 하면 문서의 다른 요소에 영향을 주지 않고 치수 및 위치를 수정할 수 있습니다.

6. 숨겨진 요소를 변경합니다 (Modify Hidden Elements)
   * display: none; 로 숨겨진 요소는 변경될 때 repaint 나 reflow 를 유발하지 않습니다. 가능한 경우 요소를 표시하기 하기전에 변경합니다.


7. Batch 로 요소 업데이트 (Update Elements in Batch)

   * 한 번의 작업으로 모든 DOM 요소를 업데이트하여 성능을 향상시킬 수 있습니다. 이 간단한 예는 세가지 reflow를 발생시킵니다.

	// before
	```javascript

		var myelement = document.getElementById('myelement');
		myelement.width = '100px';
		myelement.height = '200px';
		myelement.style.margin = '10px';

	```
	// after
	```javascript

		var myelement = document.getElementById('myelement');
		myelement.classList.add('newstyles');

	```

	```css
		.newstyles {
			width: 100px;
			height: 200px;
			margin: 10px;
		}
	```
   * 또한 DOM을 건드리는 시간을 최소화할 수 있습니다. bullet 목록을 만들겠다고 가정해 보겠습니다.

   * 각 요소를 하나씩 추가하면 한 번에 최대 7개의 reflow 가 발생합니다.(하나는 <ul>이 추가 될 때, 다른 하나는 <li>에 대해 3개, 텍스트에 대해 3개입니다.) 그러나, DOM fragment 을 사용하여 구현하고 메모리에 노드를 먼저 빌드하면 단일 reflow 가 구현 될 수 있습니다.

   ```javascript

		var
		i, li,
		frag = document.createDocumentFragment(),
		ul = frag.appendChild(document.createElement('ul'));

		for (i = 1; i <= 3; i++) {
			li = ul.appendChild(document.createElement('li'));
			li.textContent = 'item ' + i;
		}

		document.body.appendChild(frag);

   ```

8. 영향을 받는 요소를 제한합니다. (Limit the Affected Elements)
많은 수의 요소가 영향을 받을 수 있는 상황을 피하십시오. 탭을 클릭하면 다른 콘텐츠 블록이 활성화되는 캡 콘텐츠 컨트롤을 고려하세요. 각 컨텐츠 블록의 높이가 다른 경우 주변 요소에 영향을 미칩니다. container 에 대한 고정 높이를 설정하거나 document 의 flow 에서 컨트로를 제거하여 성능을 향상 시킬 수 있습니다.


9. 부드러운 애니메이션은 성능을 떨어뜨린다는 것을 알아야합니다. (Recognize that Smoothness Compromises Performance)

10. 브라우저 툴로 repaint 이슈 분석 (Analyze Repaint Issues with Browser Tools)
모든 mainstream 브라우저는 reflow 가 성능에 미치는 영향을 강조하는 개발자 도구를 제공합니다. Chrome, Safari 및 Opera와 같은 Blink/Webkit 브라우저에서 TimeLine 패널을 열고 작업을 기록하세요.

![reflow_timeline](https://minjung-jeon.github.io/assets/res/web/reflow_timeline.png)


### 내용을 정리하면서 생각난 것들

* 부끄럽게도 여태 작업하면서 성능 최적화는 굉장히 어려울거라고 막연히 생각해서 공부해본 적이 없는데
막상 알아보니 그렇게 어려워서 적용을 못할 부분도 아니라는 생각이 들었습니다.

* 냥터레스트를 시작하기전에 이러한 부분도 좀더 생각했었으면 좋았을텐데 리팩토링을 할수 있는 부분을 찾아봐야 겠다는 생각이 들었습니다.


### 참고사이트

* [Web Club](https://webclub.tistory.com/346){: target="_blank" }  

* [Reflow 원인과 마크업 최적화 Tip](https://lists.w3.org/Archives/Public/public-html-ig-ko/2011Sep/att-0031/Reflow_____________________________Tip.pdf){: target="_blank" } 


* [Reflow 와 Repaint](https://github.com/wonism/TIL/blob/master/front-end/browser/reflow-repaint.md){: target="_blank" } 

* [박스여우 - BoxFox](https://boxfoxs.tistory.com/408){: target="_blank" } 
  
* [sitepoint](https://www.sitepoint.com/10-ways-minimize-reflows-improve-performance/){: target="_blank" }

* [MINJUNG](https://minjung-jeon.github.io/10-Ways-to-Minimize-Reflows-and-Improve-Performance/){: target="_blank" }


