module.exports = function (Mongoose) {
	var Furniture = Mongoose.models.Furniture;

	this.getProductsLimit = function(index, count, success, fail) {
		Furniture.count({}, function(error, total) {
			if (error) {
				fail(error);
			} else {
				Furniture.find().skip(index - 1).limit(count).exec(function(error, result) {
					error ? fail(error) : success({ total, result });
				});
			}
		});
	};

	//add product 
	this.addProducts = function(title, success, fail){
		var newFurniture = new Furniture(title);
		newFurniture.save (function(error, result){
			error ? fail(error) : success(result); //short if
		});
	}

	//find all product
	this.getProducts = function(success,fail){
		Furniture.find(function(error, result){
			error ? fail(error) : success(result);
		});		
	}

	//delete product by id
	this.deleteProducts = function(id,succes,fail){
		Furniture.deleteOne({_id: id}, function(error,result){
			error ? fail(error) : succes(result);
		});
	}

	//update product by id
	this.updateProducts = function(id, title, succes,fail){
		Furniture.findOneAndUpdate({ _id: id }, { $set: title }, { new: true }, function(error,result){
		 	console.log(result)
			error ? fail(error) : succes(result);
		});
	}

}