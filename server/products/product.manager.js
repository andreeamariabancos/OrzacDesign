module.exports = function (Mongoose) {
	var Furniture = Mongoose.models.Furniture;

	/**
	 * Get product by limit for pagination and filter
	*/
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

	/**
	 * Get all products. 
	*/
	this.getProducts = function(success,fail) {
		Furniture.find(function(error, result) {
			error ? fail(error) : success(result);
		});		
	}

	/**
	* Get category by id.
	*/
	this.getByIdProducts = function (id, success, fail) {
			Furniture.findOne({
				_id: id
		}, function (error, result) {
			error ? fail(error) : success(result);
		});
	}

	/**
	 * Add new products
	*/
	this.addProducts = function(title, success, fail) {
		var newFurniture = new Furniture(title);
		newFurniture.save (function(error, result) {
			error ? fail(error) : success(result); //short if
		});
	}

	
	/**
	 * Delete products by id
	*/
	this.deleteProducts = function(id,succes,fail) {
		Furniture.deleteOne({_id: id}, function(error,result) {
			error ? fail(error) : succes(result);
		});
	}


	/**
	 * Update products
	*/
	this.updateProducts = function(id, data, succes,fail) {
		Furniture.findOneAndUpdate({ _id: id }, { $set: data }, { new: true }, function(error,result){
		 	console.log(result)
			error ? fail(error) : succes(result);
		});
	}

}