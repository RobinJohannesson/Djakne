var request = require('request');
request.get('http://localhost:3000/categories', function (error, response, body) {
	if(error) {
		console.log('Error when requesting port 3000');
		console.log(error);
	}
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});


var http = require('http');
  /**
   * Create HTTP server.
   */
var server = http.createServer();

server.listen(8000, function() {
    console.log('Server started on ' + server.address().port);
});

