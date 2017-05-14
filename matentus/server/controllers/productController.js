var models  = require('../models');
var express = require('express');
var bodyParser = require('body-parser');
var router  = express.Router();
var fs = require('fs');

module.exports = {
	getAll: 	function(req, res) {
					models.Product.findAll()
					.then(function(products) {
						console.log(products);
						res.json(products);
					});
				},

	get: 		function(req, res) {
					var id = req.params.id;
					models.Product.find( {
						where: {
							id: id
						}
					})
					.then(function(product) {
						if(product) {
							res.json(product);
						} else {
							res.sendStatus(404);
						}
					});
				},
	getSuppliers: 	function(req, res) {
						models.Product.aggregate('supplier', 'DISTINCT', { plain: false })
						.then(function(suppliers) {
							//res.json(suppliers);
							var list = [];
							suppliers.forEach(function(supplier) {
								if(supplier.DISTINCT) {
									list.push({supplier: supplier.DISTINCT});
								}
							});

							res.json(list);
						});
					},

	getKeywords: 	function(req, res) {
						models.Product.aggregate('keyword', 'DISTINCT', { plain: false })
						.then(function(keywords) {
							//res.json(keywords);
							var list = [];
							keywords.forEach(function(keyword) {
								if(keyword.DISTINCT) {
									list.push({keyword: keyword.DISTINCT});
								}
							});

							res.json(list);
						});
					},
	
	createProduct:		function(req, res) {
							console.log(req.body);


							models.Product.create({title: req.body.title, description: req.body.description, keyword: req.body.keyword, supplier: req.body.supplier, image: req.file.filename, rating: 0, approved: false, likeAmount: 0, category_id: req.body.category_id, created: 2017-05-01});
	},
	
	deleteProduct:		function (req, res){
							//TODO
	},
	
	approveProduct:		function (req, res){
						   //TODO
	}
	
}