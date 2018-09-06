//npm init for json-pack
var Express=require("express");//npm intall express
var BodyParser = require("body-parser"); //npm intall body-parser
var Mongoose = require("mongoose");//npm intall mongose
var BlueBird = require("bluebird");//npm intall bluebird
var app = new Express();

//folosim bodyparser
app.use(BodyParser.json());
app.use("/", Express.static(__dirname + "/client"));
var path = require("path");

Mongoose.connect("mongodb://localhost/database", function() {

	console.log("OrzacDesign");
	require("./server/furniture/furniture.model")(Mongoose);
	require("./server/furniture/furniture.router")(Mongoose, app);
});

app.listen(4002, function () {
	console.log("server started")
});