module.exports = function (Mongoose) {

	const typeSchema = new Mongoose.Schema({
		title: {
			type: String,
			unique: true
		}
	});

	const categories = Mongoose.model("Type", typeSchema);
}