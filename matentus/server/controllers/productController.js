var models  = require('../models');
var express = require('express');
var bodyParser = require('body-parser');
var router  = express.Router();
var fs = require('fs');

module.exports = {

	getApproved:	function(req, res) {
						var id = req.params.id;
						models.Product.find({
							where: {
								id: id,
								approved: true
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

	getAllApproved: function(req, res) {
						models.Product.findAll({
							where: {
								approved: true
							}
						})
						.then(function(products) {
							res.json(products);
						});
					},

	getSuggestion:	function(req, res) {
						var id = req.params.id;
						models.Product.find({
							where: {
								id: id,
								approved: false
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

	getAllSuggestions: function(req, res) {
						models.Product.findAll({
							where: {
								approved: false
							}
						})
						.then(function(products) {
							res.json(products);
						});
					},

	getAllSuppliers: 	function(req, res) {
						models.Product.aggregate('supplier', 'DISTINCT', { plain: false })
						.then(function(suppliers) {
							var list = [];
							suppliers.forEach(function(supplier) {
								if(supplier.DISTINCT) {
									list.push({supplier: supplier.DISTINCT});
								}
							});

							res.json(list);
						});
					},

	getAllKeywords: 	function(req, res) {
						models.Product.aggregate('keyword', 'DISTINCT', { plain: false })
						.then(function(keywords) {
							var list = [];
							keywords.forEach(function(keyword) {
								if(keyword.DISTINCT) {
									list.push({keyword: keyword.DISTINCT});
								}
							});

							res.json(list);
						});
					},
	
	createProduct:	function(req, res) {
						models.Product.create({
							title: req.body.title, 
							description: req.body.description, 
							keyword: req.body.keyword, 
							supplier: req.body.supplier, 
							image: req.file.filename, 
							rating: 0, 
							approved: false, 
							likeAmount: 100, 
							category_id: req.body.category_id, 
							created: '2017-01-01'
						});
					},
	
	deleteProduct:	function (req, res){
						//TODO
					},
	
	approveProduct:	function (req, res){
						//TODO
					}
	
}