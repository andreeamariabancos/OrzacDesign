// curent folder "./""
var FurnitureManager = require("./product.manager");

module.exports = function (Mongoose, app){
	var furnitureManager = new FurnitureManager(Mongoose);
	
	app.get('/api/products', function(request, response) {
		const index = parseInt(request.query.index);
		const count = parseInt(request.query.count);

		furnitureManager.getProductsLimit(index, count, function(data) {
			response.status(200).json(data);
		}, function(error) {
			response.status(500).json(error);
		});
	});

	app.get('/api/products', function(request, response) {
		furnitureManager.getProducts(function(data) {
			response.status(200).json(data);
		}, function(error) {
			response.status(500).json(error);
		});
	});


	//add products
	app.post("/products/add", function (request, response) {
		furnitureManager.addProducts(req.body, function(data) {
			res.status(200).json(data)	
		}, function(data) {
			res.status(500).json(data);
		});
	});

	

	//find all product
	// app.get("/products", function (req,res){
	// 	furnitureManager.getAllProducts(function(data){
		
	// 	var items = data.length;
	// 	var perPage = 12;
	// 	var nrOfPage = items / perPage;
	// 	nrOfPage = Math.ceil(nrOfPage);

	// 	if (parseInt(req.query.p)) {
	// 		var page = parseInt(req.query.p);
	// 	} else {
	// 		var page = 1;
	// 	}
	// 	if(page < 1) page = 1;
	// 	if(page > nrOfPage) page = nrOfPage;

	// 	var from = (page-1) * perPage +1;
	// 	var to = items * page;
	
	// 		res.json({
	// 		    posts: data.slice(from - 1, to + 1).reverse(),
	// 		    page,
	// 		    nrOfPage
	// 		});
	// 	},
	// 	 function(error){
	// 		res.data(500).json(error);
	// 	})

	// });

	
	
	//delete product by id
	app.delete("/products/delete",function(request,response){
		furnitureManager.deleteProducts(request.body._id,function(data){
			response.status(200).json(data);
		},
		function(error){
			response.status(500).json(error);
		});
	});


	//update product by id
	app.put("/products/update/:id",function(request,response){
		furnitureManager.updateProducts(request.params.id,request.body,function(data){
			response.status(200).json(data);
		},
		function(error){
			response.status(500).json(error);
		});
	});



}