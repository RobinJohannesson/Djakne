var models  = require('../models');
var express = require('express');
var bodyParser = require('body-parser');
var router  = express.Router();

module.exports = {
	getAll: 	function(req, res) {
					var subcategoryId = req.params.id;
					models.Product.findAll({
						where: {SubcategoryId: subcategoryId}
					}).then(function(products) {
						res.json(products);
					});
				},

	get: 		function(req, res) {
					var id = req.params.id;
					models.Product.find( {
						where: {id: id}
					})
					.then(function(product) {
						res.json(product);
					});
				},
	
	createProduct:		function(req, res) {
							models.Product.create({title: req.body.title, description: req.body.description, image: 'imagelink', rating: 0, approved: false, likeAmount: 0, subcategory_id: req.body.subcategoryid});
	}
	
}