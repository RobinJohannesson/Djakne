// Import node modules
var express = require('express');
var bodyParser = require('body-parser');

// Set server port
var port = 3000;

// Init app and middleware
var app = express();

// Body parser to parse request body
app.use(bodyParser.json());

// Start server
app.listen(port, function() {
	console.log('Express started on http://localhost:' + port);
});
