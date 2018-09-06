$( document ).ready(function() {

	$('.icon-nav').on('click', '.fa-bars', function() {
		var nav = $('#responsiveNav'); 
		if ($(nav).hasClass('nav')) {
		$(nav).toggleClass('nav responsive')
	    } else {
    		$(nav).toggleClass('responsive nav')
	    }
	});

});

