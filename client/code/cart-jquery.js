$(document).ready(function() {

	let arrayStorage = localStorage.getItem('items');
	let storage = JSON.parse(arrayStorage);

		if(!storage) {
			storage = [];
		}

	init();
	
	function init() {
		renderCart();
	}

	/**
	 *  Open/close cart.
	*/

	$('.cancel, #cart').click(function() {
		$('#cart').css({'display': 'none'});
	}); 

	$('#cartIcon').click(function() {
		$('#cart').css({'display': 'flex'});		
	});

	function renderCart() {
		
		for (let i = 0; i < storage.length; i++ ) {
			$("#itemsCart").append(`<li> 
					<div class="desc"> 
						<div class="cart-img">
							<img src="${window.location.origin}/${storage[i].img}"/">
						</div>
					</div> 
						<div class="cart-name"  >${storage[i].title}</div>
						<div class="cart-color">${storage[i].colors}</div> 
						<div class="cart-quantity">${storage[i].quantity}</div> 
						<div class="cart-price" value="${storage[i].price}">${storage[i].price}</div>
				</li>`)
		}
	} 

	$('#removeItems').click(function() {
		window.localStorage.removeItem("items"); 
		location.reload();	
	});


});