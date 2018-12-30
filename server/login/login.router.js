var Users = require("./login.manager");

module.exports = function (Mongoose, app) {
    var usersOn = new Users(Mongoose);

    /**
	 * Get all category.
	*/
	app.get("/api/users", function (request, response) {
		usersOn.getUsers(function (data) {
			response.status(200).json(data);
		}, function (error) {
			response.status(500).json(error);
		});
	})

		app.post("/api/users/add", function (request, response) {
		usersOn.addUsers(request.body, function(data) {
			console.log(data);	
			response.status(200).json(data)
		}, function(data) {
			response.status(500).json(data);
		});
	})

		app.delete("/api/users", function (request, response) {
        usersOn.removeAll(
            function (data) {
                response.status(200).json(data);
            },
            function (data) {
                response.status(500).json(data);
            });
    });

};