$(document).ready(function() {

	let arrayProduct = localStorage.getItem('itemToSave');
	let storage = JSON.parse(arrayProduct);
	if(!storage) {
		storage = [];
	}

	/*$('img').click(function() {
		location.reload();
	});*/	
		
	init();

	function init() {
		$.ajax({
			url:renderProductDetails(),
			success:function(){
			requestSimilar();
			
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
		let quantity = 1;

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
		            <div class="title">Quantity:&nbsp</div>
		            <div class="count">1</div>
		          </div>
		          <div class="counter">
		            <div class="sub">-</div>
		            <div class="num">1</div>
		            <div class="add">+</div>
		          </div>
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


		function chooseQuantity(obj, n) {
			$(obj).click(function() {
				if(n == -1) {
					( quantity <= 1 ) ? quantity == 1 : quantity += n;
				} else {
					quantity += n;  
				}
				$('.num').text(quantity);
				$('.count').text(quantity);
			});
		}
		chooseQuantity('.add', 1)
		chooseQuantity('.sub', -1)
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
				storage.push(data);
				localStorage.setItem('itemToSave', JSON.stringify(storage));	
			});
		}
});