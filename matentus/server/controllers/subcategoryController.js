var models  = require('../models');
var express = require('express');
var router  = express.Router();

module.exports = {
	getAll: 	function(req, res) {
					var id = req.params.id;
					models.Subcategory.findAll()
					.then(function(subcategories) {
						res.json(subcategories);
					});
				},

	get: 		function(req, res) {
					var id = req.params.id;
					models.Subcategory.find( {
						where: {id: id}
					})
					.then(function(subcategory) {
						res.json(subcategory);
					});
				}
}