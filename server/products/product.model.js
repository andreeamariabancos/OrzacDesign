//exportam fisierul si trimitem la app la mongoose (argument)
module.exports =function (Mongoose) {
	const furnitureSchema = new Mongoose.Schema({
		title: String,
		price: Number,
		description: String,
		colors: [String],
		img: String,
		categories: [{
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'Category'
		}],
		design: String
	});

	const furnitures = Mongoose.model("Furniture", furnitureSchema);
}