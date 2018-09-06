$( document ).ready(function() {

	var currentPage = 1;
	var nrOfPage = 0;
	var database = [];

	$.ajax({
	    type:"GET",
	    url:"/furniture/get",
	    contentType:"application/json",
	    success: function(data){
	    	database = data; 
	    	displayAllItems(database);	
	    }
	});


	//open and close lateral filter
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

	//displays items based on pagination
	function displayAllItems(array) {
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
		$(`.page:nth-child(${currentPage})`).removeClass('selected');
		currentPage = 1;
		$(`.page:nth-child(${currentPage})`).addClass('selected');
		displayPagination();
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

 	//next/prev + paging function
	function displayPagination() {
		currentPage = 1;
	
		var items = $(".product-card").length;
        var perPage = 12;
        nrOfPage = items / perPage;
        nrOfPage = Math.ceil(nrOfPage);

		for (var i = 1; i <= nrOfPage; i++) {
			$("#pagination").append('<div class="page">' + i + '</div>');
		}

		var totalPagenum = $(".page").length;
		if (totalPagenum  > nrOfPage) {
			$(".page").hide();
				for (var n = 1; n <= nrOfPage; n++) {
					$(".page:nth-child(" + n + ")").show();
				}
		}

		$(".product-card").hide();
			for (var j = 1; j <= perPage; j++) {
				$(".product-card:nth-child(" + j + ")").show();
			}

		$(".page").click(function () {
			$(`.page:nth-child(${currentPage})`).removeClass('selected');
			currentPage = $(this).text();
			$(`.page:nth-child(${currentPage})`).addClass('selected');
			$(".product-card").hide();
			var from = (currentPage-1) * perPage +1;
			var to = perPage * currentPage;
			for (var i = from; i <= to; i++) {
				$(".product-card:nth-child(" + i + ")").show();  
			}
		});	
	}

	$(`.page:nth-child(${currentPage})`).addClass('selected');
	$('#next').click(function () {
			$(`.page:nth-child(${currentPage})`).removeClass('selected');
	        if (currentPage >= 1 && currentPage <= nrOfPage) {
	        	if (currentPage == nrOfPage) {
		        		currentPage = 1;
		        } else {
		            	currentPage++;
		        }
	            
	            $(`.page:nth-child(${currentPage})`).addClass('selected');
	            var from = (currentPage-1) * 12 +1;
				var to =  10 * currentPage;
				$(".product-card").hide();
				for (var i = from; i <= to; i++) {
					$(".product-card:nth-child(" + i + ")").show();    
				}

        	}
    	});

    $('#prev').click(function () {
	        if (currentPage >= 2) {
	        	$(`.page:nth-child(${currentPage})`).removeClass('selected');
	            currentPage--;
	            $(`.page:nth-child(${currentPage})`).addClass('selected');
	            var from = (currentPage-1) * 12 +1;
				var to =  10 * currentPage;
				$(".product-card").hide();
				for (var i = from; i <= to; i++) {
					$(".product-card:nth-child(" + i + ")").show();    
				}
        	}
    	});	
});

