var models  = require('../models');
var express = require('express');
var router  = express.Router();

module.exports = {

	getAll: 	function(req, res) {
		models.City.findAll()
		.then(function(cities) {
			res.json(cities);
		});
	}
}
