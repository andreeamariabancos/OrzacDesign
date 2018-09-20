var TypeManager = require("./type.manager");

module.exports = function (Mongoose, app) {
    var typeManager = new TypeManager(Mongoose);

    /**
	 * Get all types.
	*/
	app.get("/api/types", function (request, response) {
		typeManager.getTypes(function (data) {
			response.status(200).json(data);
		}, function (error) {
			response.status(500).json(error);
		});
	})

	/**
     * Get types by id.
    */
	app.get("/api/types/:id", function (request, response) {
		var id = request.params.id
		typeManager.getByIdType(id, function (data) {
			response.status(200).json(data);
		}, function (error) {
			response.status(500).json(error);
		});
	})


	/**
	 * Add new types.
	*/
	app.post("/api/types/add", function (request, response) {
		typeManager.addType(request.body, function(data) {
			console.log(data);	
			response.status(200).json(data)
		}, function(data) {
			response.status(500).json(data);
		});
	});


};
