module.exports = function (Mongoose) {

	var Furniture = Mongoose.models.Furniture;

	this.addProducts = function(title, success, fail){
		var newFurniture = new Furniture(title);

		newFurniture.save (function(error, result){
			error ? fail(error) : success(result); //short if
		});
	}

	this.getAll = function(success,fail){
		Furniture.find(function(error, result){
			error ? fail(error) : success(result);

		});		
	}

	this.delete = function(id,succes,fail){
		Furniture.deleteOne({_id: id}, function(error,result){
			error ? fail(error) : succes(result);
		});
	}


	this.update = function(id, title, succes,fail){
		Furniture.findOneAndUpdate({ _id: id }, { $set: title }, { new: true }, function(error,result){
		 	console.log(result)
			error ? fail(error) : succes(result);
		});
	}

}