//nwpm init for json-pack
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

app.get(/^\/(?!api).*/, function(request, response) {
	let url = (request.originalUrl == '/' ? '/index' : request.originalUrl);

	if (url.indexOf('/details/') == 0) {
		url = '/details';
	} else {
		//console.log('nope')
	}
	response.sendFile(`./client${url}.html`, { root: __dirname });
});


Mongoose.Promise = BlueBird;
Mongoose.connect("mongodb://localhost/database", function() {
	require("./server/products/product.model")(Mongoose);
	require("./server/products/product.router")(Mongoose, app);
	require("./server/categories/category.model")(Mongoose);
	require("./server/categories/category.router")(Mongoose, app);
	require("./server/type/type.model")(Mongoose);
	require("./server/type/type.router")(Mongoose, app);
});

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//connect to MongoDB
mongoose.connect('mongodb://localhost/testForAuth');
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// serve static files from template
app.use(express.static(__dirname + '/templateLogReg'));

// include routes
var routes = require('./routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


app.listen(4002, function () {
	console.log(" OrzacDesign server started");
});

