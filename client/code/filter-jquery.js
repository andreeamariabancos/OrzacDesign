$(document).ready(function() {

	const RESULTS_PER_PAGE = 12

	let totalResults = 0;
	let pages;
	let currentPage = 0;

	var nrOfPage = 0;
	var database = [];

	init();

	/**
	 * Initial function to be executed.
	*/
	function init() {
		addEventListeners();
		requestPage(currentPage);
		renderCategoryFilter();
	}

	/**
	 * Open and close navigation filter.
	*/
	$('.filter-trigger').on('click', '.fa-filter', function() {
		triggerFilter(true);
	});

	$('.filter-trigger').on('click', '.fa-times', function(){
		triggerFilter(false);
	});

	function triggerFilter(filter) {
		var elementsToTrigger = $([$('.filter-trigger'), $('.fa-filter'), $('.fa-times'), $('.filter-main'), $('.products-main')]);
		elementsToTrigger.each(function() {
			$(this).toggleClass('filter-is-visible', filter);
		});
	}

	/**
	 * Add all the global event listeners.
	*/
	function addEventListeners() {
		$('#next').click(function () {
			if (pages && currentPage < pages.length - 1) {
				selectPage(currentPage + 1);
			}
    	});

	    $('#prev').click(function () {
	    	if (pages && currentPage > 0) {
				selectPage(currentPage - 1);
			}
		});
	}

	function selectPage(index) {
		if (pages[currentPage]) {
			pages[currentPage].selected = false;
		}

		currentPage = index;

		if (pages[currentPage]) {
			pages[currentPage].selected = true;
		}

		requestPage(index);
	}

	/**
	 * Request a page by index.
	*/
	function requestPage(index) {
		const title = $('#searchFilter').val().trim();

		const $colors = $('#color-filter input[name]:checked');
		const colors = [];

		for (let i = 0; i < $colors.length; i++) {
			let value = $($colors[i]).val();
			value = value.substr(0, 1).toUpperCase() + value.substr(1);
			colors.push(value);
		}

		const categories = $('#select').val();
		const design = $('input[name=radioGroup]:checked').val();
		const price = $("[type=range]").val();
			
	 	$.ajax({
			type : "POST",
			url : `/api/products?index=${index * RESULTS_PER_PAGE + 1}&count=${RESULTS_PER_PAGE}`,
			contentType : "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({
				title : title,
				description : title,
				colors : colors, 
				categories : categories,
				design : design,
				price : price
			}),
			success: handlePage
		});
    }
	
    /**
	 * Render category filter.
	*/

    function renderCategoryFilter() {
			
			$.ajax({
				type: 'GET',
				url: '/api/categories',
				contentType:"application/json",
				success: successCategory
			});
	}

	/**
	 * Handle the success result of the page request.
	*/
	function handlePage(data) {

		totalResults = data.total;
		render(data.result);
	}

	/**
	 * Handle the success result of the category filter.
	*/

	function successCategory(data) {
		let all = $('<option>');
			all.attr('value', 'All');
			all.text('All');
			$('#select').append(all);

		for(let i = 0; i < data.length; i++) {
			let option = $('<option>');
			option.attr('value', data[i]._id);
			option.text(data[i].title);
			$('#select').append(option);
		}
	}

	/**
	 * Render the entire page.
	*/
	function render(array) {
		$(".products").empty();
		for (var i = 0; i < array.length; i++) {
			$(".products").append(`
			<div class="product-card" id="${array[i]._id}">
				<img src="${window.location.origin}/${array[i].img}" title="${array[i].title}" value="${array[i].description}"}"> 
				<div class="figcaption">
					<h2>${array[i].title}</h2>
					<p>${array[i].description}</p>	
					<p class="price">${array[i].price} RON</p>
    				<p class="button-overlay">Add Cart</p>
				</div class="figcaption">	
			</div>`);
		}

		pages = Math.ceil(totalResults / RESULTS_PER_PAGE);
		renderNavigation(pages);

			$(".product-card").click(function() {
				var id = $(this).attr("id");
				window.location = '/details/' + id;		
		});	
	}

	

	
	function createNavigation(pageCount) {
		pages = [];

		for (let i = 0; i < pageCount; i++) {
			pages.push({
				selected: i == currentPage,
				label: i + 1
			});
		}
	}

	function renderNavigation(pageCount) {
		if (!pages || (pageCount > 0 && pages.length != pageCount)) {
			createNavigation(pageCount);
		}

		$("#pagination").html('');

		for (let i = 0; i < pages.length; i++) {
			let $page = $(`<div class="page">${pages[i].label}</div>`);
			$page.on('click', function() {
				selectPage(i);
			});

			if (pages[i].selected) {
				$page.addClass('selected');
			}

			$("#pagination").append($page);
		}
	}


	$('#searchFilter').keyup(function() {
		selectPage(0);
	});


	$(".input-color").click(function() {
		selectPage(0);
	});	


	$('#select').change(function() {
		selectPage(0);				
	});


	$('.radio-input').on('click', function() {
	var price = $('#radioPrice').prop('checked');
	var design = $('#radioDesign').prop('checked');

	if(price) {
		$('.range-price').empty();
		$('#radioFilter').append(
					`<li class = "range-price">	
						  <div class="container-slider">
							  <input id="rangeInput"  step="100" class="range-input" type="range" min="100" max="3000"">
							  <span id="labelRange" class="range-value">1450</span>
						</div>
					</li>`);

			$("[type=range]").change(function() {
			var newVal=$(this).val();
			$(this).next().text(newVal);
			selectPage(0);
		});

	} else if (design) {
		$('.li').empty();
		$('#radioFilter').append(
		`<li class="li radio">
				<input value="Classic" class="radio-design" type="radio" name="radioGroup">
				<label class="radio-label" for="Classic">Classic</label>	  
			</li>
			<li class="li radio">
				<input value="Modern" class="radio-design" type="radio" name="radioGroup" >
				<label class="radio-label" for="Modern">Modern</label>	  
			</li>
			<li class="li radio">
				<input value="Vintage" class="radio-design" type="radio" name="radioGroup" >
				<label class="radio-label" for="Vintage">Vintage</label>	  
			</li>`);


		$(".radio-design").click(function() {
				selectPage(0);
	    });
	} 

	$('#hideSecond').click(function() {	
		$('.li').removeClass('none');
        $('#rangeInput').addClass('none');
        $('.range-value').addClass('none');	
	});

	$('#showFirst').click(function() {
        $('#rangeInput').removeClass('none');
        $('.range-value').removeClass('none');
		$('.li').addClass('none');
	});				
});

	$('#radioNan').click(function() {
		$('.radio').remove();
		$('.range-price').remove();
		selectPage(0);
	});
		
});

