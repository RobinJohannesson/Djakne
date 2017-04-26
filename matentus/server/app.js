var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Create express application
var app = express();

var users = require('./routes/users');
var categories = require('./routes/categories');
var subcategories = require('./routes/subcategories');
var products = require('./routes/products');


// Add middleware necessary for REST API's

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// app.use(function(req, res, next) {
// 	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
// 	res.header('Access-Control-Allow-Methods', 'GET');
// 	res.header('Access-Control-Allow-Headers', 'Content-Type');
// 	next();
// });

// app.use('/test', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5555");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", 'DELETE');
//     next();
// });

app.delete('/test', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:5555");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'DELETE');
	console.log('Deleting');
	res.send('SUCCESSFULLY DELETED');
});

app.get('/test', function(req, res, next) {
	res.send('Test test test!!');
});

app.use('/users', users);
app.use('/categories', categories);
app.use('/subcategories', subcategories);
app.use('/products', products);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
