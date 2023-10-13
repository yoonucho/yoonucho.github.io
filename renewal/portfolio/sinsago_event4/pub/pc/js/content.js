$(document).ready(function(){
  addUrl();
});


// Url추가
function addUrl(){
	var urlwrap = $('.lst_inputform');
	var urllength = 1;
	var urlnode = '<li>';
  urlnode += '<input type="text" placeholder="스크랩 URL을 입력해주세요." style="width:557px;margin-top:20px" title="URL 입력">';
		urlnode += '<li>';
	$('.loc_btn_add').on('click',function(){
		if(urllength == 3){return;}
		urlwrap.append(urlnode);
		urllength++;
	});
}


