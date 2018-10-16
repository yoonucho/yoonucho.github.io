$(document).ready(function () {
	menuOpen();
})

// 헤더 모바일  gnb메뉴 클릭이벤트
function menuOpen() {
	$(".gnb_btn").on("click", function () {

		if ($(".header.mobile").hasClass("active")) {
			$(".header.mobile").removeClass("active");
			
		}
		else {
			$(".header.mobile").addClass("active");
			alert("버튼온")
		}

	});
}