//exportam fisierul si trimitem la app la mongoose (argument)
module.exports =function (Mongoose) {

	var furnitureSchema = new Mongoose.Schema({
		title: String,
		price: Number,
		description: String,
		colors: [String],
		img: String,
		categories: [String],
		design: String
	});

	var furnitures = Mongoose.model("Furniture", furnitureSchema);
}