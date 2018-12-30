var bcrypt = require('bcryptjs');
module.exports = function (Mongoose) {
	const UserSchema = new Mongoose.Schema({
	 /* email: {
	    type: String,
	    unique: true,
	    required: true,
	    trim: true
	  },*/
	  username: {
	    type: String,
	    unique: true,
	    required: true,
	    trim: true
	  },
	  password: {
	    type: String,
	    required: true,
	  },
	  /*passwordConf: {
	    type: String,
	    required: true,
	  }*/
	});

	//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

const Users = Mongoose.model("User",UserSchema);
}