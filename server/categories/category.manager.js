module.exports = function (Mongoose) {
   
    var Category = Mongoose.models.Category;

     /**
     * Get all category.
    */
    
    this.getCategories = function(success, fail) {
        Category.find(function(error, result) {
            error ? fail(error) : success(result);
        });     
    }

    /**
     * Get category by id.
    */
    this.getByIdCategories = function (id, success, fail) {
            Category.findOne({
                _id: id
            }, function (error, result) {
                error ? fail(error) : success(result);
            });
        }

    /**
     * Add new category.
    */

    this.addCategories = function(title, success, fail) {
        var newCategory = new Category(title);
        newCategory.save (function(error, result) {
            error ? fail(error) : success(result); //short if
        });
    }
};