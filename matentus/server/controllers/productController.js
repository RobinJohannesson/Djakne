var models  = require('../models');
var express = require('express');
var bodyParser = require('body-parser');
var router  = express.Router();
var fs = require('fs');
var moment = require('moment');
var status = require('./httpStatusCodes');
var userController = require('./userController');

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
				res.status(status.OK);
				res.json(product);
			} else {
				res.sendStatus(status.NOT_FOUND);
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
			if(products) {
				res.status(status.OK);
				res.json(products);
			} else {
				res.sendStatus(status.NOT_FOUND);
			}
		});
	},

	getSuggestion:	function(req, res) {

		userController.isAdmin(req)
		.then(function(isAdmin) {
			if(!isAdmin) {
				res.sendStatus(status.NOT_ADMIN);
				return;
			}
		})
		.then(function() {
			var id = req.params.id;
				models.Product.find({
					where: {
						id: id,
						approved: false
					}
				})
				.then(function(products) {
					res.json(products);
				});
		});
	},

	getAllSuggestions: function(req, res) {

		userController.isAdmin(req)
		.then(function(isAdmin) {
			if(!isAdmin) {
				res.sendStatus(status.NOT_ADMIN);
				return;
			}
		})
		.then(function() {
			models.Product.findAll({
				where: {
					approved: false
				}
			})
			.then(function(products) {
				res.json(products);
			});
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

	createSuggestion: function(req, res) {
		models.Product.create({
			title: req.body.title, 
			description: req.body.description, 
			keyword: req.body.keyword, 
			supplier: req.body.supplier, 
			rating: 0, 
			approved: 0, 
			likeAmount: 100, 
			category_id: req.body.category_id, 
			created: moment().format().slice(0, 19)
		})
		.then(function(product) {
			var file = req.file;
			if(file) {
				updateProductImage(product.id, file.filename);
			}
			return product;
		})
		.then(function(product) {
			if(product) {
				res.sendStatus(status.CREATED);
			} else {
				res.sendStatus(status.BAD_REQUEST);
			}
		});
	},

	createProduct:	function(req, res) {

		console.log(req.res);

		userController.isAdmin(req)
		.then(function(isAdmin) {
			if(!isAdmin) {
				res.sendStatus(status.NOT_ADMIN);
				return;
			}
			console.log("Is admin...");
		})
		.then(function() {
			models.Product.create({
				title: req.body.title, 
				description: req.body.description, 
				keyword: req.body.keyword, 
				supplier: req.body.supplier, 
				rating: 0, 
				approved: 1, 
				likeAmount: 100, 
				category_id: req.body.category_id, 
				created: moment().format().slice(0, 19)
			})
			.then(function(product) {
				var file = req.file;
				if(file) {
					updateProductImage(product.id, file.filename);
				}
				return product;
			})
			.then(function(product) {
				if(product) {
					res.sendStatus(status.CREATED);
				} else {
					res.sendStatus(status.BAD_REQUEST);
				}
			});
		});
		
	},

	update: 	function(req, res) {

		userController.isAdmin(req)
		.then(function(isAdmin) {
			if(!isAdmin) {
				res.sendStatus(status.NOT_ADMIN);
				return;
			}
		})
		.then(function() {
			models.Product.update({
				title: req.body.title,
				description: req.body.description,
				keyword: req.body.keyword,
				supplier: req.body.supplier,
				category_id: req.body.category_id,
				approved: req.body.approved,
			}, {
				where: {
					id: req.params.id
				}
			})
			.then(function(product) {
				var file = req.file;
				if(file) {
					updateProductImage(req.params.id, file.filename);
				}
				return product;
			})
			.then(function(product) {
				if(product) {
					res.sendStatus(status.OK);
				} else {
					res.sendStatus(status.BAD_REQUEST);
				}
			});
		});
	},


	delete:	function (req, res){

		userController.isAdmin(req)
		.then(function(isAdmin) {
			if(!isAdmin) {
				res.sendStatus(status.NOT_ADMIN);
				return;
			}
		})
		.then(function() {
			models.Product.find({
				where: {
					id: req.params.id
				}
			})
			.then(function(product) {
				console.log(product);
				if(product) {
					product.destroy();
					try {
						console.log("Removing image...");
						console.log('public/images/' + product.image);
						fs.unlinkSync('public/images/' + product.image);
					} catch(error) {
						console.log("Could not remove image");
					}
					res.sendStatus(200);
				} else {
					res.sendStatus(404);
				}
			});
		});
	}
}


function updateProductImage(id, filename) {
	models.Product.update({
		image: filename
	}, {
		where: {
			id: id
		}
	});	

}