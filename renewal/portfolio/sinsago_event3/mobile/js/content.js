$(document).ready(function(e){
	videoList();
});


$(function(){
	$('img[usemap]').rwdImageMaps();
});

// function videoList() {
// 	$(".video_lst li>a").on("click focusin", function () {

// 		$(".quick_nav li").parent().children().removeClass("on");
// 		$(".quick_nav li>a").find(".sp_img").removeClass("on");

// 		$(this).parent().addClass("on");
// 		$(this).find(".sp_img").addClass("on");
// 	});
// }


function videoList() {
	$(".video_lst>li>a").on("click focusin", function () {
		$(this).parent().addClass("on").siblings().removeClass("on");
		return false;
	});
}

/* 맨위로 가기 */
$(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 55) {
			$('.loc_top').fadeIn();
		} else {
			$('.loc_top').fadeOut();
		}
	});

	$('.btn_top').click(function () {
		$('body,html').animate({ scrollTop: 0 }, 400);
		return false;
	});
});



