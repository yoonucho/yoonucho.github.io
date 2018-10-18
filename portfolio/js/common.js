$(document).ready(function () {
	menuOpen();
	btnTop();	
})

// 헤더 모바일  gnb메뉴 클릭이벤트
function menuOpen() {
	$(".gnb_btn").on("click", function () {

		$("i", this).toggleClass("fa-times fa-bars ");
		if ($(".header.mobile").hasClass("active")) {
			$(".header.mobile").removeClass("active");
			
		}
		else {
			// alert("버튼온")
			$(".header.mobile").addClass("active");
		}
	});
}


/* 맨위로 가기 */
function btnTop() {
	// $(window).scroll(function () {
	// 	if ($(this).scrollTop() > 55) {
	// 		$('.btn_top').fadeIn();
	// 	} else {
	// 		$('.btn_top').fadeOut();
	// 	}
	// });

	$(".btn_top").on("click", function () {
		$('body,html').animate({ scrollTop: 0 }, 400);
		return false;
	});
};
