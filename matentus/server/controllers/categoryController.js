var models  = require('../models');
var express = require('express');
var router  = express.Router();
var status = require('./httpStatusCodes');

module.exports = {

	getAll: 	function(req, res) {
		models.Category.findAll()
		.then(function(categories) {
			if(categories) {
				res.status(status.OK);
				res.json(categories);
			} else {
				res.sendStatus(status.NOT_FOUND);
			}
			
		});
	},

	get: 		function(req, res) {
		var id = req.params.id;
		models.Category.find( {
			where: {id: id}
		})
		.then(function(category) {
			if(category) {
				res.status(status.OK);
				res.json(category);
			} else {
				res.sendStatus(status.NOT_FOUND);
			}
		});
	},
	
	create:		function(req, res){
		models.Category.create({
			title: req.body.title
		})
		.then(function(category) {
			if(category) {
				res.sendStatus(status.CREATED);
			} else {
				res.sendStatus(status.BAD_REQUEST);
			}
		});
	},

	update: 	function(req, res) {
		models.Category.update({
			title: req.body.title,
		}, {
			where: {
				id: req.params.id
			}
		})
		.then(function(category) {
			if(category) {
				res.sendStatus(status.OK);
			} else {
				res.sendStatus(status.BAD_REQUEST);
			}
		});
	},
	
	delete:		function (req, res) {
		models.Category.find({
			where: {
				id: req.params.id
			}
		})
		.then(function(category) {
			if(category) {
				category.destroy();
				res.sendStatus(status.OK);
			} else {
				res.sendStatus(status.BAD_REQUEST);
			}
		});
	}
}
