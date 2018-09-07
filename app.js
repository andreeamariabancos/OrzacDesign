//npm init for json-pack
var Express = require("express");//npm intall express
var BodyParser = require("body-parser"); //npm intall body-parser
var Mongoose = require("mongoose");//npm intall mongose
var BlueBird = require("bluebird");//npm intall bluebird

var app = new Express();

app.use(BodyParser.json());
app.use("/", Express.static(__dirname + "/client"));

app.use('/products', Express.static(`${__dirname}/client/products.html`));

Mongoose.Promise = BlueBird;
Mongoose.connect("mongodb://localhost/database", function() {
	require("./server/furniture/product.model")(Mongoose);
	require("./server/furniture/product.router")(Mongoose, app);
});

app.listen(4002, function () {
	console.log(" OrzacDesign server started");
});

