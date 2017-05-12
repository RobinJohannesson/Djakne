// -----------------------------------------------------
// Require node modules
// -----------------------------------------------------
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');


// -----------------------------------------------------
// Require local modules
// -----------------------------------------------------
var users = require('./routes/users');
var categories = require('./routes/categories');
var subcategories = require('./routes/subcategories');
var products = require('./routes/products');
var register = require('./routes/register');
var login = require('./routes/login');

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
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// -----------------------------------------------------
// Define API routes
// -----------------------------------------------------
app.use('/api/users', users);
app.use('/api/categories', categories);
app.use('/api/subcategories', subcategories);
app.use('/api/products', products);
app.use('/api/register', register);
app.use('/api/login', login);

// -----------------------------------------------------
// Error handler - Catch 404 and forward
// -----------------------------------------------------
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
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
