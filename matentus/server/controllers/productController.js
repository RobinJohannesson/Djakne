var models  = require('../models');
var express = require('express');
var bodyParser = require('body-parser');
var router  = express.Router();
var fs = require('fs');

module.exports = {
	getAll: 	function(req, res) {
					var subcategoryId = req.params.id;
					models.Product.findAll({order: 'likeAmount desc'})
					.then(function(products) {
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

	// --> Hur skickar vi data och bildfil i response till klient?

	//get: 	function(req, res) {
	//				var id = req.params.id;
	//				models.Product.find( {
	//					where: {id: id}
	//				})
	//				.then(function(product) {
	//					console.log(product.image);
	//				})
	//				.then(function(product) {
	//					res.json("Hej");
	//				});
	//			},
	
	createProduct:		function(req, res) {
							models.Product.create({title: req.body.title, description: req.body.description, image: req.file.filename, rating: 0, approved: false, likeAmount: 0, subcategory_id: req.body.subcategory_id, created: 2017-05-01});
							res.json("Added new product");
							console.log("Added new product!");
	},
	
	deleteProduct:		function (req, res){
							//TODO
	},
	
	approveProduct:		function (req, res){
						   //TODO
	}
	
}