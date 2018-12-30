module.exports = function (Mongoose) {

    var User = Mongoose.models.User;

     /**
     * Get all category.
     */

     this.getUsers = function(success, fail) {
        User.find(function(error, result) {
            error ? fail(error) : success(result);
        });     
    }

    /**
     * Get category by id.
     */
     this.getByIdUsers = function (id, success, fail) {
        User.findOne({
            _id: id
        }, function (error, result) {
            error ? fail(error) : success(result);
        });
    }

    /**
     * Add new category.
     */

     this.addUsers = function(title, success, fail) {
        // confirm that user typed same password twice
        if (req.body.password !== req.body.passwordConf) {
            var err = new Error('Passwords do not match.');
            err.status = 400;
            res.send("passwords dont match");
            return next(err);
        }

        if (req.body.email &&
            req.body.username &&
            req.body.password &&
            req.body.passwordConf) {

            var userData = {
              email: req.body.email,
              username: req.body.username,
              password: req.body.password,
              passwordConf: req.body.passwordConf,
          }

          User.create(userData, function (error, user) {
              if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });

      } else if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
          if (error || !user) {
            var err = new Error('Wrong email or password.');
            err.status = 401;
            return next(err);
        } else {
            req.session.userId = user._id;
            return res.redirect('/profile');
        }
    });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
};

};