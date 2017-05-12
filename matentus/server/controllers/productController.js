var models  = require('../models');
var express = require('express');
var bodyParser = require('body-parser');
var router  = express.Router();
var fs = require('fs');

module.exports = {
	getAll: 	function(req, res) {
					//var subcategoryId = req.params.id;
					models.Product.findAll()
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
	getSuppliers: 	function(req, res) {
						models.Product.findAll({ attributes: ['supplier'] })
						.then(function(suppliers) {
							var list = [];

							suppliers.forEach(function(supplier) {
								list.push(supplier.supplier);
							});

							res.json(list);
						});
					},
	
	createProduct:		function(req, res) {
							console.log(req.body);
							models.Product.create({title: req.body.title, description: req.body.description, supplier: req.body.supplier, image: req.file.filename, rating: 0, approved: false, likeAmount: 0, subcategory_id: req.body.subcategory_id, created: 2017-05-01});
	},
	
	deleteProduct:		function (req, res){
							//TODO
	},
	
	approveProduct:		function (req, res){
						   //TODO
	}
	
}