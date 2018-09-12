// curent folder "./""
var FurnitureManager = require("./product.manager");

module.exports = function (Mongoose, app){
	var furnitureManager = new FurnitureManager(Mongoose);

	/**
	 * Get all products.
	*/
	app.get('/api/products', function(request, response) {
		furnitureManager.getProducts(function(data) {
			response.status(200).json(data);
		}, function(error) {
			response.status(500).json(error);
		});
	});

	/**
	* Get category by id.
	*/

	app.get("/api/products/:id", function (request, response) {
		var id = request.params.id
		furnitureManager.getByIdProducts(id, function (data) {
			response.status(200).json(data);
		}, function (error) {
			response.status(500).json(error);
		});
	})

	/**
	 * Get products by limit for filter and pagination.
	*/
	app.post('/api/products', function(request, response) {
		
		const index = parseInt(request.query.index);
		const count = parseInt(request.query.count);
		const title = request.query.title;
		

		furnitureManager.getProductsLimit(index, count, title, function(data) {
			response.status(200).json(data);
		}, function(error) {
			response.status(500).json(error);
		});
	});

	/**
	 * Get products by category id.
	*/
	app.get("/api/products/categories/:id", function (request, response) {
		var id = request.params.id	
		furnitureManager.getProductByIdCategories(id, function (data) {
			response.status(200).json(data);
		}, function (error) {
			response.status(500).json(error);
		});
	})
	
	/**
	 * Add new products
	*/
	app.post("/api/products/add", function (request, response) {
		furnitureManager.addProducts(request.body, function(data) {
			response.status(200).json(data)	
		}, function(data) {
			response.status(500).json(data);
		});
	});

	
	/**
	 * Delete product by id
	*/
	app.delete("/api/products/delete", function(request, response) {
		furnitureManager.deleteProducts(request.body._id,function(data) {
			response.status(200).json(data);
		},
		function(error){
			response.status(500).json(error);
		});
	});


	/**
	 * Update product
	*/
	app.put("/api/products/:id",function(request, response) {
		furnitureManager.updateProducts(request.params.id,request.body,function(data) {
			response.status(200).json(data);
		},
		function(error){
			response.status(500).json(error);
		});
	});



}