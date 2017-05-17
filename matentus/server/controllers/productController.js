var models  = require('../models');
var express = require('express');
var bodyParser = require('body-parser');
var router  = express.Router();
var fs = require('fs');
var moment = require('moment');

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
			approved: req.body.approved, 
			likeAmount: 100, 
			category_id: req.body.category_id, 
			created: moment().format().slice(2, 19)
		})
		.then(function() {
			res.sendStatus(201);
		})
		.catch(function(err) {
			res.sendStatus(500);
		});;
	},


//	editProduct:	function(req, res){
//		var id = req.body.id;
//		models.Product.find({
//			where: {
//				id: id
//				//approved: true
//			}
//		})
//			.then(function(product) {
//			console.log(product.title)
//			if(product) {
//				if (product.title!=req.body.title){
//					product.update({ title: req.body.title});
//
//				}
//				if (product.description!=req.body.description){
//					product.update({ description: req.body.description});
//				}
//				if (product.category_id!=req.body.category_id){
//					product.update({ category_id: req.body.category_id});
//				}
//				if (product.supplier!=req.body.supplier){
//					product.update({ supplier: req.body.supplier});
//				}
//				res.json(product)	
//			} else {
//				res.sendStatus(404);
//			}
//		});
//	}, 


	updateProduct: 	function(req, res) {

		var id = req.body.id;
		var file = req.file;

		if(file) {
			updateImage(id, file.filename);
		}

		models.Product.update({
			title: req.body.title,
			description: req.body.description,
			keyword: req.body.keyword,
			supplier: req.body.supplier,
			category_id: req.body.category_id,
			approved: req.body.approved
		}, {
			where: {
				id: id
			}
		})
		.then(function() {
			res.sendStatus(200);
		})
		.catch(function(err) {
			res.sendStatus(500);
		});
	},


	deleteProduct:	function (req, res){
		var id = req.params.id;
		models.Product.find({
			where: {
				id: id
			}
		})
		.then(function(product) {
			if(product) {
				product.destroy();
				fs.unlinkSync('public/images/' + product.image);
				res.sendStatus(200);
			} else {
				res.sendStatus(404);
			}
		});
	}
}


function updateImage(id, filename) {
	models.Product.update({
		image: filename
	}, {
		where: {
			id: id
		}
	});	

}