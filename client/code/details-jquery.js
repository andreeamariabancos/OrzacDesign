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
		$("#imgDetails").append(`
			<img src="${window.location.origin}/${prod.img}"> 
		`);

		$("#containerDetails").append(`
		<div class="product-name">${prod.title}</div>
			<div class="product-price">
				<span >Price:</span>
				<span>${prod.price}</span>
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
	
});