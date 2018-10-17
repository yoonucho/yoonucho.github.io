$(document).ready(function () {
	menuOpen();	
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

