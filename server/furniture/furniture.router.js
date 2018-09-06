// curent folder "./""
var FurnitureManager = require("./furniture.manager")

module.exports = function (Mongoose, app){

	var furnitureManager = new FurnitureManager (Mongoose);
	

	app.post("/furniture/add",function (req,res){

		furnitureManager.addProducts(req.body, function(data){
				res.status(200).json(data)	
			},

			function(data) {
				res.status(500).json(data);
		})
	});

	app.get("/furniture/get", function (req,res){
		console.log(req.query.andreea)
		furnitureManager.getAll(function(data){
			res.status(200).json(data);
		},
		 function(error){
			res.data(500).json(error);
		})

	});

	app.delete("/furniture/delete",function(request,response){
		furnitureManager.delete(request.body._id,function(data){
			console.log(data,request.body.id);
			response.status(200).json(data);
		},
		function(error){
			response.status(500).json(error);
		});
	});

	app.put("/furniture/update/:id",function(request,response){
		furnitureManager.update(request.params.id,request.body,function(data){
			console.log(data)
			response.status(200).json(data);

		},
		function(error){
			response.status(500).json(error);
		});
	});



}