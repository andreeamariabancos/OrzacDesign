module.exports = function (Mongoose) {
   
    var Type = Mongoose.models.Type;

     /**
     * Get all types.
    */
    
    this.getTypes = function(success, fail) {
        Type.find(function(error, result) {
            error ? fail(error) : success(result);
        });     
    }

    /**
     * Get type by id.
    */
    this.getByIdType = function (id, success, fail) {
            Type.findOne({
                _id: id
            }, function (error, result) {
                error ? fail(error) : success(result);
            });
        }

    /**
     * Add new type.
    */

    this.addType = function(title, success, fail) {
        var newType = new Type(title);
        newType.save (function(error, result) {
            error ? fail(error) : success(result); //short if
        });
    }

    /**
     * Delete by id types
    */

    this.remove = function (id, success, fail) {
        Type.deleteOne({
            _id: id
        }, function (error, result) {
            error ? fail(error) : success(result);
        });
    }

    /**
     * Delete all types
    */

    this.removeAll = function(success, fail) {
        Type.remove(function(error, result) {
            error ? fail(error) : success(result);
        });
    }

    /**
     * Update products
    */
    this.update = function(id, data, succes,fail) {
        Type.findOneAndUpdate({ _id: id }, { $set: data }, { new: true }, function(error,result){
            error ? fail(error) : succes(result);
        });
    }

    
};