var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'ddwap.mah.se',
	user: 'AB7455',
	password: 'matensus',
	database: 'ab7455'
});

connection.connect(function(error) {
	error ? console.log(error) : console.log('Connected to database.');
});

module.exports = {
	connection: connection
};