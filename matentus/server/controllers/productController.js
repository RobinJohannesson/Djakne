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

		var sent = false;

		userController.isAdmin(req)
		.then(function(isAdmin) {
			if(!isAdmin) {
				res.sendStatus(status.NOT_ADMIN);
				// res.set("Connection", "close");
				res.end();
				sent = true;
			}
		})
		.then(function() {
			models.Product.findAll({
				where: {
					approved: false
				}
			})
			.then(function(products) {
				if(!sent) {
					res.json(products);
				}
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

		var supplier = (req.body.supplier) ? req.body.supplier : 'Information saknas';
		var keyword = (req.body.keyword) ? req.body.keyword : 'Information saknas';
		console.log("--> KEYWORD");
		console.log(keyword);

		models.Product.create({
			title: req.body.title, 
			description: req.body.description, 
			keyword: keyword, 
			supplier: supplier, 
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

		var supplier = (req.body.supplier) ? req.body.supplier : 'Information saknas';
		var keyword = (req.body.keyword) ? req.body.keyword : 'Information saknas';

		userController.isAdmin(req)
		.then(function(isAdmin) {
			if(!isAdmin) {
				res.sendStatus(status.NOT_ADMIN);
				return;
			}
		})
		.then(function() {
			models.Product.create({
				title: req.body.title, 
				description: req.body.description, 
				keyword: keyword, 
				supplier: supplier, 
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

		var title = req.body.title;
		var description = req.body.description;
		var category_id = req.body.category_id;
		var approved = req.body.approved;
		var supplier = (req.body.supplier) ? req.body.supplier : 'Information saknas';
		var keyword = (req.body.keyword) ? req.body.keyword : 'Information saknas';
		var oldImageName;

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
				oldImageName = product.image;
			})
			.then(function() {
				models.Product.update({
					title: title,
					description: description,
					keyword: keyword,
					supplier: supplier,
					category_id: category_id,
					approved: approved,
				}, {
					where: {
						id: req.params.id
					}
				})
				.then(function(ok) {
					if(req.file) {
						updateProductImage(req.params.id, req.file.filename, oldImageName);
					}
					if(ok) {
						res.sendStatus(status.OK);
					} 
				});
			});
		});
	},


	delete:		function (req, res) {

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
					removeImageFromServer(product.image);
					res.sendStatus(200);
				} else {
					res.sendStatus(404);
				}
			});
		});
	}
}


function updateProductImage(id, imageName, oldImageName) {

	if(oldImageName) {
		console.log("--> Produkten hade en tidigare bild: " + oldImageName);
		removeImageFromServer(oldImageName);
	}

	// console.log("--> Old image path: " + oldImageName);
	// console.log("--> Updating image path to: " + imageName);
	// console.log("---> Productid: " + id);
	models.Product.update({
		image: imageName
	}, {
		where: {
			id: id
		}
	});	
}

function removeImageFromServer(image) {
	try {
		// console.log("--> REMOVING IMAGE FROM SERVER...");
		fs.unlinkSync('public/images/' + image);
	} catch(error) {}
}