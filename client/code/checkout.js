$(document).ready(function(){

$('.form-title a').click(function () {
  var open = $(this).attr('href');
  	event.preventDefault();
  	$( open).slideToggle( 500 );
});

$('input.btn').click(function () {
  var open = $(this).parent().parent('ul');
  var next = $(this).attr('data-id');
  	event.preventDefault();	$('div.almost').slideUp( 500 );  
  	$( open ).slideUp( 500, function(){
  $( '#' + next ).slideDown(500, function() {
  
    
     $('html,body').animate({
          scrollTop:  $( '#' + next ).offset().top
        }, 1000);
  });
  });
});

});
