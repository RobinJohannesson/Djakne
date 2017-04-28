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
				},
	create:		function(req, res){
					models.Subcategory.create({title: req.body.title, category_id: req.body.categoryid });
				},
	
	delete:		function (req, res){
				//TODO
	}
	
}