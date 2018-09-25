$(document).ready(function() {
	
	let arrayStorage = localStorage.getItem('itemToSave');
	let storage = JSON.parse(arrayStorage);

	/**
	 *  Open/close cart.
	*/

	$('#cartList').click(function() {
		return false;
	});	

	$('.cancel, #cart').click(function() {
		$('#cart').css({'display': 'none'});
	}); 

	$('#cartIcon').click(function() {
		renderCart();
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
							<div class="cart-name">${storage[i].title}</div>
							<div class="cart-color">${storage[i].colors}</div> 
							<div class="cart-quantity">1</div> 
							<div class="cart-price">${storage[i].price}</div>
					</li>`)
			}
		}  
});