// -----------------------------------------------------
// Require node modules
// -----------------------------------------------------
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var models= require('./models');
var bodyParser = require('body-parser');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwt = require('jsonwebtoken');

// -----------------------------------------------------
// Require local modules
// -----------------------------------------------------
var users = require('./routes/users');
var categories = require('./routes/categories');
var products = require('./routes/products');
var login = require('./routes/login');
var cities = require('./routes/cities');


// -----------------------------------------------------
// Create express application
// -----------------------------------------------------
var app = express();


// -----------------------------------------------------
// Add middleware necessary for REST API's
// -----------------------------------------------------

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// -----------------------------------------------------
// Allow CORS requests
// -----------------------------------------------------

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log("Auth");
	console.log('payload received', jwt_payload);
	var user =  models.User.find( {
		where: {id: jwt_payload.id}
	})
	.then(function(user) {
		if (user) {
			next(null, user);
		} else {
			next(null, false);
		}
	});
});

passport.initialize();
passport.use(strategy);



// -----------------------------------------------------
// Define API routes
// -----------------------------------------------------
app.use('/api/users', users);
app.use('/api/categories', categories);
app.use('/api/products', products);
app.use('/api/login', login);
app.use('/api/cities', cities);

// -----------------------------------------------------
// Error handler - Catch error and forward
// -----------------------------------------------------
app.use(function(req, res, status) {
  var err = new Error();
  err.status = status;
  next(err);
});


// -----------------------------------------------------
// Error handler - Send error message to client
// -----------------------------------------------------
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send(err);
});


// -----------------------------------------------------
// Local exports
// -----------------------------------------------------
module.exports = app;
