$(document).ready(function() {

	init()

	function init() {
		renderProductDetails();
	}

	function renderProductDetails() {
			
			$.ajax({
				type: 'GET',
				url: '/api/products/',
				contentType:"application/json",
				success: handlePage
			});
	}

	/**
	 * Handle the success result of the page request.
	*/
	function handlePage(data) {
		render(data);
		console.log(data)
	}

	function render(products) {

		for (var i = 0; i < products.length; i++) {	
	
			$("#containerDetails").append(`
				<div class="product-name">${products[i].title}</div>
					<div class="product-price">
						<span >Price:</span>
						<span>${products[i].price}</span>
					</div>

					<div class="product-colors">
						<p>Colors</p>
						<ul class="colors-selector ">
							<li  class="colors black"></li>
							<li  class="colors red"> </li>
							<li  class="colors white"> </li>
							<li  class="colors brown"> </li>
						</ul>
					</div>
					
					<div class="product-quantity">
						<span>Quantity</span>
						<input class="input-quantity" type="text" value="1">
						<button class="add-cart red">
							<span>Add to Cart</span>
							<i class="fas fa-cart-plus"></i>
						</button>
					</div>
				`);
		}
	}

});