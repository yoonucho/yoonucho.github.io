$(document).ready(function(){
  children();
  star();
  addUrl();
});



function children(){
    setInterval(function(){
    $('.child1').animate({'top' : '-20px'}, 500).animate({ 'top': '-30px'}, 500,'easeInOutQuad');

  },0);

  setInterval(function(){
    $('.child2').animate({'top' : '0'}, 500).animate({ 'top': '10px'}, 500,'easeInOutQuad');

  },400);

  setInterval(function(){
    $('.child3').animate({'top' : '-24px'}, 500).animate({ 'top': '-34px'}, 500,'easeInOutQuad');

  },700);




}


function star() {
  setInterval(function(){
    $('.star1').animate({'opacity':.3},550).animate({'opacity':1},550);
  },0);
  setInterval(function(){
    $('.star2').animate({'opacity':.3},550).animate({'opacity':1},550);
  },400);
  setInterval(function(){
    $('.star3').animate({'opacity':.3},550).animate({'opacity':1},550);
  },700);

}


function addUrl(){
	var urlwrap = $('.lst_inputform');
	var urllength = 1;
	var urlnode = '<li>';
		urlnode	+= '<input type="text" placeholder="쎈수학 사용후기 URL을 입력해주세요." style="width:667px" title="URL 입력">';
		urlnode += '<li>';
	$('.loc_btn_add').on('click',function(){
		if(urllength == 3){return;}
		urlwrap.append(urlnode);
		urllength++;
	});
}
