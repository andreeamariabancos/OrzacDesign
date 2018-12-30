module.exports = function (Mongoose) {
   
    var User = Mongoose.models.User;
    
    this.getUsers = function(success, fail) {
        User.find(function(error, result) {
            error ? fail(error) : success(result);
        });  
    }

    this.addUsers = function(title, success, fail) {
        var newUser = new User(title);
        newUser.save (function(error, result) {
            error ? fail(error) : success(result); //short if
        });
    }

     this.removeAll = function(success, fail) {
        User.remove(function(error, result) {
            error ? fail(error) : success(result);
        });
    }

};