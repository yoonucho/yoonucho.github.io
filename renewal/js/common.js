// 로딩 이미지
$(window).on("load",function() {
	$("#loading").hide(500);
});


$(document).ready(function () {
	aLink();
	menuOpen();
	btnClick();
	btnClose();
	tab();
	btnTop();	
})

// 앵커 클릭할때 스크롤 부드럽게
function aLink() {
	$("#gnb li a").on("click",function() {
		$("html, body").animate({
			scrollTop:$($.attr(this,"href")).offset().top
		}, 500)
		$(this).parent().addClass("active").siblings().removeClass("active");
		return false;	
	});
}

// 스크롤 내릴때 active 

// $(window).scroll(function () {
// 	var height = $(document).scrollTop();
// 	if (height > 0 && height < 1249) {
// 		$('.nav_wrap .menu').removeClass('on');
// 	} else if (height > 1250 && height < 2639) {
// 		$('.nav_wrap .menu').removeClass('on');
// 		$('.menu1').addClass('on');
// 	}
// 	else if (height > 2670 && height < 3875) {
// 		$('.nav_wrap .menu').removeClass('on');
// 		$('.menu2').addClass('on');
// 	}
// 	else if (height > 3450) {
// 		$('.nav_wrap .menu').removeClass('on');
// 		$('.menu3').addClass('on');
// 	}
// });


// 헤더 모바일  gnb메뉴 클릭이벤트
function menuOpen() {
	$(".gnb_btn").on("click", function () {
		$("i", this).toggleClass("fa-times fa-bars ");
		if ($(".header.mobile").hasClass("active")) {
			$(".header.mobile").removeClass("active");
		}
		else {
			$(".header.mobile").addClass("active");
		}
	});
}

// portfolio 탭
function tab() {
	var cats = $(".cats");
	
	$(".tab_list li").on("click",function(){
		var customType = $(this).data("filter");
		cats.hide();
		$(".tab_list li").removeClass("active");
		cats.filter(function(){
			return $(this).data("cat") === customType;
		})
		.show();
		$(this).addClass("active");
	});

	$(".tab_list li.all").on("click",function() {
		cats.show();
	})
}

// snippet 버튼 클릭시 모달창 열림, 닫힘
function btnClick(){
	$(".btn_click").on("click", function () {
		$(this).addClass("active").next().css({"display":"block"});

	});
}
function btnClose(){
	$(".btn_close").on("click", function(){
		$(this).parents(".modal").fadeOut(50);
	});
}

/* 맨위로 가기 */
function btnTop() {
	$(".btn_top").on("click", function () {
		$('body,html').animate({ scrollTop: 0 }, 400);
		return false;
	});
};
