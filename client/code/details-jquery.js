$(document).ready(function() {


	/*$('img').click(function() {
		location.reload();
	});*/	
		
	init();

	function init() {
		$.ajax({
			url:renderProductDetails(),
			success:function(){
			requestSimilar(),
			incrementQuantity()
			}
		})	
	}


	/**
	 * Request a page by product id.
	*/

	function renderProductDetails() {
		const url = window.location.pathname;
		const id = url.substring(url.lastIndexOf('/') + 1);
			
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
		renderDetails(data);	
		saveInLocalStorage(data);
	}

	/**
	 * Render details section.
	*/

	function renderDetails(prod) {	

		let exhibit = prod.exhibit;
		let colors = prod.colors;
		let full = $("#full");
		let small =$("#small");


		for(var i = 0; i < exhibit.length; i++) {
			small.append(`
			<a href="#" data-full="${window.location.origin}/${exhibit[i]}">
				<img src="${window.location.origin}/${exhibit[i]}"> 
			</a> `)		
		}

		small.children().first().addClass('selected');

		full.append(`
			<img value="${prod.type}" src="${window.location.origin}/${prod.img}"> 
		`);
		
		$('#full img').click(function() {
			var value = $(this).attr("value");
			alert(value)
			
		}); 
		

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
				<div class="quantity">
		          <div class="text">
		            <div class="title-quant">Quantity:</div>
		          </div>     
				<div class="minus"> - </div>
				<div class="quantity-input">
					<input type="text"  value="1">
				</div>
				<div class="plus"> + </div>
		    </div>
				<button id="addCart" class="add-cart red">
					<span>Add to Cart</span>
					<i class="fas fa-cart-plus"></i>
				</button>
			</div>`)
		
		for(let i = 0; i<colors.length; i++) {
			$(".colors-selector").append(`
			<li  class="colors ${colors[i].toLowerCase()}"></li>`)		
		}

	}

	function incrementQuantity() {

		$('.plus').on('click', function() {
			let oldValue = $('input').val();
			let newValue = parseInt(oldValue) + 1;
			$('input').val(newValue);
		});

		$('.minus').on('click', function() {
			let oldValue = $('input').val();
			if (oldValue > 0){
				let newValue = parseInt(oldValue) - 1;
				$('input').val(newValue);
			}	
			console.log(newValue)
		});

	}
	

	/**
	 * Request types for similar products.
	*/

    function requestSimilar() {
			
	 	const type = $('#full img').attr("value");
			
	 	$.ajax({
			type : "POST",
			url : `/api/products`,
			contentType : "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({
				type : type,
			}),
			success: successProductsTypes
		});
	}

	/**
	 * Handle the success result.
	*/
	function successProductsTypes(types) {
		renderCarousel(types.result)	
	}

	function renderCarousel(types) {
		for (var i = 0; i < types.length; i++) {
			$("#slide").append(`
				<div class="item">
                    <div id = "similar" class="tile" >                     
                           <img src="${window.location.origin}/${types[i].img}" id = "${types[i]._id}" >
                    </div>
                </div>`)

		} 

		$("#similar img").click(function() {
				var id = $(this).attr("id");
				window.location = '/details/' + id
		});	
		
	}

	
	function saveInLocalStorage(data) {
			$('#addCart').on('click',function() {
				let quantity = $('.quantity-input input').val();
				console.log('quantity', quantity);
				data.quantity = quantity;

				let arrayProduct = localStorage.getItem('items');
				let storage = JSON.parse(arrayProduct);
				if(!storage) {
					storage = [];
					storage.push(data);
					localStorage.setItem('items', JSON.stringify(storage));
					location.reload();	
				} else {
					var exista = 0;
					//parcurg store
					for (var i = 0; i< storage.length; i++) {
						//verific daca data exista deja in store
						console.log(storage[i])
						if (storage[i]._id === data._id) {
							exista++;

						}
					}
					if (exista == 0) {
						storage.push(data);
						localStorage.setItem('items', JSON.stringify(storage));
					} else {
						for (var i = 0; i< storage.length; i++) {
						//verific daca data exista deja in store
							if (storage[i]._id === data._id) {
								storage[i].quantity = parseInt(storage[i].quantity)+parseInt(quantity);
								localStorage.setItem('items', JSON.stringify(storage));
							}
						}
					}
				location.reload();
				}
				
			});

			let itemCount = 0;

			$('#addCart').click(function (){
				itemCount ++;
				$('#itemCount').html(itemCount).css('display', 'block');
			});
		}

		$('#checkoutButton').click(function () {
				window.location = '/checkout'		
		});

		
});