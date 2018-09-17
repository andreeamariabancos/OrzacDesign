module.exports = function (Mongoose) {
	var Furniture = Mongoose.models.Furniture;

	/**
	 * Get product by limit for pagination and filter
	*/

	this.getProductsLimit = function(index, count, title, description, colors, categories, design, price, success, fail) {
		const options = {};

		if (title) {
			options.$and = options.$and || [];
			options.$and.push({
				$or: [{
					title: new RegExp(title, 'i')
				}, {
					description: new RegExp(title, 'i')
				}]
			});
		} 

		if (colors && colors.length > 0) {
			options.$and = options.$and || [];
			options.$and.push({
				colors: {
					$in: colors
				}
			});
		}

		if(categories && categories != "All") {
			options.$and = options.$and || [];
			options.$and.push({
				categories
			});
		}

		if (design) {
			options.$and = options.$and || [];
			options.$and.push({
				design: design
			});
		}

		if (price) {
			options.$and = options.$and || [];
			options.$and.push({
			 price: { "$lte":price}
			});
		}

		Furniture.count(options, function(error, total) {
			if (error) {
				fail(error);
			} else {
				Furniture.find(options).skip(index - 1).limit(count).exec(function(error, result) {
					error ? fail(error) : success({
						total: total,
						result: result
					});
				});
			}
		});
	}

	/**
	 * Get all products. 
	*/
	this.getProducts = function(success,fail) {
		Furniture.find(function(error, result) {
			error ? fail(error) : success(result);
		});		
	}

	/**
	* Get products by id.
	*/
	this.getByIdProducts = function (id, success, fail) {
			Furniture.findOne({
				_id: id
		}, function (error, result) {
			error ? fail(error) : success(result);
		});
	}

	/**
	* Get product by category id.
	*/

	this.getProductByIdCategories = function (id, success, fail) {
		Furniture.find({
			categories: id
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
			error ? fail(error) : succes(result);
		});
	}

}

