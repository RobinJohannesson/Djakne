var models  = require('../models');
var express = require('express');
var router  = express.Router();

module.exports = {
	getAll: 	function(req, res) {
		models.Category.findAll().then(function(categories) {
			res.json(categories);
		});
	},

	get: 		function(req, res) {
		var id = req.params.id;
		models.Category.find( {
			where: {id: id}
		})
		.then(function(category) {
			res.json(category);
		});
	},
	
	create:		function(req, res){
		models.Category.create({title: req.body.title});
	},

	update: 	function(req, res) {
		models.Category.update({
			title: req.body.title,
		}, {
			where: {
				id: req.body.id
			}
		})
		.then(function() {
			res.sendStatus(200);
		})
		.catch(function(err) {
			res.sendStatus(500);
		});		
	},
	
	delete:		function (req, res){
		models.Category.find({
			where: {
				id: req.params.id
			}
		})
		.then(function(category) {
			if(category) {
				category.destroy();
				res.sendStatus(200);
			} else {
				res.sendStatus(404);
			}
		});
	}
	
}
