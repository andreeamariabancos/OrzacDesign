$(document).ready(function() {

	init()

	function init() {
		renderProductDetails();
	}

	function renderProductDetails(index) {
		const url = window.location.pathname;
		const id = url.substring(url.lastIndexOf('/') + 1);
		console.log(url, id);
			
			$.ajax({
				type: 'GET',
				url: "http://localhost:4002/api/products/" + id,
				contentType :'application/json',
				success: handlePage
			});
	}

	/**
	 * Handle the success result of the page request.
	*/
	function handlePage(data) {	
		render(data);
		
	}

	function render(prod) {	
		let exhibit = prod.exhibit;
		for(var i = 0; i<exhibit.length; i++) {
			$("#small").append(`
			<a href="#" data-full="${window.location.origin}/${exhibit[i]}">
				<img src="${window.location.origin}/${exhibit[i]}"> 
			</a> `)		
		}

		$("#small").children().first().addClass('selected');

		$("#full").append(`
			<img src="${window.location.origin}/${prod.img}"> 
		`);

		$('a').click(function() {
			var largeImage = $(this).attr('data-full');
			$('.selected').removeClass();
			$(this).addClass('selected');
			$('.full img').hide();
			$('.full img').attr('src', largeImage);
			$('.full img').fadeIn();
		}); 

		$("#containerDetails").append(`
			<div class="product-name">${prod.title}</div>
				<div class="product-price">
					<span >Price:</span>
					<span>${prod.price}</span>
				</div>
			<div class="product-colors">
				<p>Colors</p>
				<ul class="colors-selector">
				</ul>
			</div>

			<div class="product-quantity">
				<span>Quantity</span>
				<input class="input-quantity" type="text" value="1">
				<button class="add-cart red">
					<span>Add to Cart</span>
					<i class="fas fa-cart-plus"></i>
				</button>
			</div>`)

		let colors = prod.colors;
		for(var i = 0; i<colors.length; i++) {
			$(".colors-selector").append(`
			<li  class="colors ${colors[i].toLowerCase()}"></li>`)		
		}
	}


});