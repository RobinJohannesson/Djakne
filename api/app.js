// Import node modules
var express = require('express');
var bodyParser = require('body-parser');

// Import custom modules
var users = require.main.require('./database/users');

// Set server port
var port = 3000;

// Init app and middleware
var app = express();

// Body parser to parse request body
app.use(bodyParser.json());

/*
* 	User end points
*/

// get all users
app.get('/api/users', function(req, res) {
	users.getAll(res);
});

// get user
app.get('/api/users/:id', function(req, res) {
	users.get(req.params.id, res);
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

// add user
app.post('/api/users', function(req, res) {
	var userData = [];
	userData.push(req.body.name);
	userData.push(req.body.email);
	userData.push(req.body.password);
	users.add(userData, res);
});

// remove user
app.delete('/api/users/:id', function(req, res) {
	users.remove(req.params.id, res);
});






// Start server
app.listen(port, function() {
	console.log('Express started on http://localhost:' + port);
});
