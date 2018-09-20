//exportam fisierul si trimitem la app la mongoose (argument)
module.exports = function (Mongoose) {
	const furnitureSchema = new Mongoose.Schema({
		title: String,
		price: Number,
		description: String,
		colors: [String],
		img: String,
		exhibit: [String],
		categories: [{
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'Category'
		}],
		design: String,
		type: {
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'Type'
		}
	});

	const furnitures = Mongoose.model("Furniture", furnitureSchema);
}