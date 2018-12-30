module.exports = function (Mongoose) {

	const userSchema = new Mongoose.Schema({
		name: {
			type: String,
			requierd: true
		},

		email: {
			type: String,
			requierd: true
		},
		username: {
			type: String,
			requierd: true
		},
		password: {
			type: String,
			requierd: true
		},
	});

	const users = Mongoose.model("User", userSchema);
}