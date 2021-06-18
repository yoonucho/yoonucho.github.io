$(document).ready(function(){
  bxSlider();
  addUrl();
  radioBox();
});


// bxslider 롤링
function bxSlider() {
  var slider = $(".bxslider").bxSlider({
    mode: 'vertical',  
    speed:300,
    //  pause: 4000,
    pager: false,
    // minSlides:3,

    auto: true,
    controls: true,
    // autoControls: true,
    // stopAutoOnClick: true,
    infiniteLoop: true,
    // hideControlOnEnd:true,
    touchEnabled: true
  });
  // 오토진행상태에서 화살표를 컨트롤하면 정지된다.
  //이를방지하기 위해선 아래 코드를 넣어줘야 한다.

  $(document).on('click', function () {
    slider.stopAuto();
    slider.startAuto();
  });
}


// Url추가
function addUrl(){
	var urlwrap = $('.lst_inputform');
	var urllength = 1;
	var urlnode = '<li>';
  urlnode += '<input type="text" placeholder="스크랩 URL을 입력해주세요." style="width:762px;margin-top:20px" title="URL 입력">';
		urlnode += '<li>';
	$('.loc_btn_add').on('click',function(){
		if(urllength == 3){return;}
		urlwrap.append(urlnode);
		urllength++;
	});
}



function radioBox(){
	$(".radio_box_wrap input[type=radio]").change(function () {
		if ($(".radio_box_wrap input[type=radio]").is(":checked")) {
			// alert("라디오박스 체크했음!");
			$(this).prev().addClass("on").parent().siblings().children('.check_item').removeClass('on');
		} 
	});
}


// 모달 스크롤
$(function () {
	$('#modal .md-close').bind('click',function(){
		$('html').removeClass('md-perspective');
	});
	$('.md-trigger').on('click', function(){
		$('body').css({ overflow: 'hidden' });
	});
	$('.md-close').on('click', function(){
		$('body').css({ overflow: 'auto' });
	});
});

