$(document).ready(function() {

	const RESULTS_PER_PAGE = 12 ;

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
		pages[currentPage].selected = false;
		currentPage = index;
		pages[currentPage].selected = true;

		requestPage(index);
	}

	/**
	 * Request a page by index.
	*/
	function requestPage(index) {
		$.ajax({
			type: 'POST',
			url: `/api/products?index=${index * RESULTS_PER_PAGE + 1}&count=${RESULTS_PER_PAGE}`,
			contentType:"application/json",
			success: handlePage

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
	 * Render the entire page.
	*/
	function render(array) {
		$(".products").empty();

		for (var i = 0; i < array.length; i++) {
			$(".products").append(`
				<div class="product-card">
				    <div class="product-info">
				      <img src="${array[i].img}" title="${array[i].title}" value="${array[i].description}"}">
				      <h4 class="product-title">${array[i].title}</h4>
				      <h5>${array[i].price} RON</h5> 
				      <div class="product-overlay">
					    <h6>${array[i].description}</h6>
					    <button class="button-overlay">Details</button>
					    <button class="button-overlay">Add Cart</button>
					  </div>
				    </div>
				 </div>`);
		}

		pages = Math.ceil(totalResults / RESULTS_PER_PAGE);
		renderNavigation(pages);
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



	 function requestCategory(index) {
	 	$.ajax({
			type: 'GET',
			url: '/api/categories',
			contentType:"application/json",
			success: handleCategory
		});
	}

	function handleCategory(data) {
		render(data);
		console.log (data);
	}	
	

	//filter items concomitantly
	function filter () {

		var result = [];

		var filterSearch = $('#searchFilter').val().toLowerCase().trim(); 
		
		var filterColor = {
			red: $("#red").prop("checked"),
			white: $("#white").prop("checked"),
			black: $("#black").prop("checked"),
			brown: $("#brown").prop("checked")
		};

		var filterCategory = $('#select').val();
		var filterPrice = $("[type=range]").val();
		var filterDesign = $('input[name=radioGroup]:checked').val()

		for (var i = 0; i < database.length; i++) {

			var item = database[i];
			var title = item.title.toLowerCase().indexOf(filterSearch.toLowerCase()) + 1;
			var description = item.description.toLowerCase().indexOf(filterSearch.toLowerCase()) + 1;

			if (filterSearch && !((title || description) > 0)) {
				continue;
			}

			if (filterColor.red && !(item.colors.findIndex(function(item) { return item.toLowerCase() == "red" }) > -1)) {
				continue;
			}

			if (filterColor.white && !(item.colors.findIndex(function(item) { return item.toLowerCase() == "white" }) > -1)) {
				continue;
			}
			if (filterColor.black && !(item.colors.findIndex(function(item) { return item.toLowerCase() == "black" }) > -1)) {
				continue;
			}

			if (filterColor.brown && !(item.colors.findIndex(function(item) { return item.toLowerCase() == "brown" }) > -1)) {
				continue;
			}


			if (filterCategory && filterCategory != "All" && !(item.categories.indexOf(filterCategory) > -1)) {
				continue;
			}
			
			if(filterPrice && !(item.price <= filterPrice)) {	
				continue;

			} 
			
			if (filterDesign && !(item.design.indexOf(filterDesign) > -1)) {	
					continue;		
			}
			
			result.push(item);
			
		}
		displayAllItems(result);		
	};

	//calls the filter function for each event
	$('#searchFilter').keyup(function() {
		filter();
	 });

	$(".input-color").click(function() {
		filter(); 
	});


	$('#select').change(function() {
		requestCategory();
		filter();					
	});

	$('.radio-input').one('click', function() {
		var price = $('#radioPrice').prop('checked');
		var design = $('#radioDesign').prop('checked');
		if(price) {
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
				filter();
			});

		} else if (design) {
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
					filter();
		    });
		}

		$('.hideSecond').click(function() {	
			$('.li').removeClass('none');
	        $('#rangeInput').addClass('none');
	        $('.range-value').addClass('none');	
		});

		$('.showFirst').click(function() {
	        $('#rangeInput').removeClass('none');
	        $('.range-value').removeClass('none');
			$('.li').addClass('none');
		});				
	});

	$('#radioNan').click(function() {
		$('.radio').remove();
		$('.range-price').remove();
	});

});

