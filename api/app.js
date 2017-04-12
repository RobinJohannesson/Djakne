// Import node modules
var express = require('express');
var bodyParser = require('body-parser');

// Import custom modules
var users = require.main.require('./database/users');
var categories = require.main.require('./database/categories');

// Set server port
var port = 3000;

// Init app and middleware
var app = express();

// Body parser to parse request body
app.use(bodyParser.json());

/*
* 	User end points
*/

// get user
app.get('/api/users/:id', function(req, res) {
	users.get(req.params.id, res);
});

// get all users
app.get('/api/users', function(req, res) {
	users.getAll(res);
});

// create user
app.post('/api/users', function(req, res) {
	var userData = [];
	userData.push(req.body.name);
	userData.push(req.body.email);
	userData.push(req.body.password);
	users.create(userData, res);
});

// change user 
app.put('/api/users', function(req, res) {
	var userData = [];
	userData.push(req.body.name);
	userData.push(req.body.email);
	userData.push(req.body.password);
	userData.push(req.body.id);
	users.update(userData, res);
});

// remove user
app.delete('/api/users/:id', function(req, res) {
	users.remove(req.params.id, res);
});

/*
* 	Category end points
*/

// get category
app.get('/api/categories/:id', function(req, res) {
	categories.get(req.params.id, res);
});

// get all categories
app.get('/api/categories', function(req, res) {
	categories.getAll(res);
});

// create category
app.post('/api/categories', function(req, res) {
	var categoryData = [];
	categoryData.push(req.body.title);
	categories.create(categoryData, res);
});

// change category
app.put('/api/categories', function(req, res) {
	var categoryData = [];
	categoryData.push(req.body.title);
	categoryData.push(req.body.id);
	categories.update(categoryData, res);
});

// remove category
app.delete('/api/categories/:id', function(req, res) {
	categories.remove(req.params.id, res);
});


// Start server
app.listen(port, function() {
	console.log('Express started on http://localhost:' + port);
});
