module.exports = function (Mongoose) {

	const categorySchema = new Mongoose.Schema({
		title: {
			type: String,
			unique: true
		}
	});

	const categories = Mongoose.model("Category", categorySchema);
}