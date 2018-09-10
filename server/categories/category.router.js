var CategoryManager = require("./category.manager");

module.exports = function (Mongoose, app) {
    var categoryManager = new CategoryManager(Mongoose);

    /**
	 * Get all category.
	*/
	app.get("/api/categories", function (request, response) {
		categoryManager.getCategories(function (data) {
			response.status(200).json(data);
		}, function (error) {
			response.status(500).json(error);
		});
	})

	/**
     * Get category by id.
    */
    app.get("/api/categories/:id", function (request, response) {
        var id = request.params.id
        categoryManager.getByIdCategories(id, function (data) {
            response.status(200).json(data);
        }, function (error) {
            response.status(500).json(error);
        });
    })


	/**
	 * Add new category.
	*/
	app.post("/api/categories/add", function (request, response) {
		categoryManager.addCategories(request.body, function(data) {
			console.log(data);	
			response.status(200).json(data)
		}, function(data) {
			response.status(500).json(data);
		});
	});


};
