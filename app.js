//npm init for json-pack
var Express = require("express");//npm intall express
var BodyParser = require("body-parser"); //npm intall body-parser
var Mongoose = require("mongoose");//npm intall mongose
var BlueBird = require("bluebird");//npm intall bluebird

var app = new Express();

app.use(BodyParser.json());

app.use(/.*\.js/, function(request, response) {
	response.sendFile(`${__dirname}/client/${request.originalUrl}`);
});
app.use(/.*\.css/, function(request, response) {
	response.sendFile(`${__dirname}/client/${request.originalUrl}`);
});
app.use(/.*\.jpg/, function(request, response) {
	response.sendFile(`${__dirname}/client/${request.originalUrl}`);
});

// app.use('/products', function(request, response) {
// 	response.sendFile(`${__dirname}/client/products.html`);
// });
app.get(/^\/(?!api).*/, function(request, response) {
	const url = (request.originalUrl == '/' ? '/index' : request.originalUrl);

	response.sendFile(`./client${url}.html`, { root: __dirname });
});
// app.use('/*', Express.static(`${__dirname}/client/index.html`));
// app.use("/*", Express.static(__dirname + "/client"));
//app.use('/products/:id', Express.static(`${__dirname}/client/details.html`));

Mongoose.Promise = BlueBird;
Mongoose.connect("mongodb://localhost/database", function() {
	require("./server/products/product.model")(Mongoose);
	require("./server/products/product.router")(Mongoose, app);
	require("./server/categories/category.model")(Mongoose);
	require("./server/categories/category.router")(Mongoose, app);
});

app.listen(4002, function () {
	console.log(" OrzacDesign server started");
});

