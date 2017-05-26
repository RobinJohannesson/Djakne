var models  = require('../models');
var express = require('express');
var router  = express.Router();
var status = require('./httpStatusCodes');
var passwordHash = require('password-hash');
var passwordHash2 = require('password-hash/lib/password-hash');
var jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');

module.exports = {

	getAll:   function(req, res) {
		this.isAdmin(req)
		.then(function(isAdmin) {
			if(!isAdmin) {
				res.sendStatus(status.NOT_ADMIN);
				return;
			}
		})
		.then(function() {
			models.User.findAll({
				attributes: ['id', 'name', 'email', 'city', 'street', 'zipcode', 'admin']
			})
			.then(function(users) {
				res.json(users);
			});
		});
	},

	get:    function(req, res) {
		this.isAdmin(req)
		.then(function(isAdmin) {
			if(!isAdmin) {
				res.sendStatus(status.NOT_ADMIN);
				return;
			}
		})
		.then(function() {
			models.User.find({
				attributes: ['name', 'id', 'email', 'city', 'admin', 'notes']
			}, {
				where: {
					id: req.params.id
				}
			})
			.then(function(user) {
				res.json(user);
			});
		});
	},

	updateByUser: function(req, res) {

		console.log("--> Update user by User: ");
		console.log(req.body);

		var token = req.headers.authorization.replace("JWT ", "");
		var id = jwtDecode(token).id;

		var name = (req.body.name) ? req.body.name : '';
		var city = (req.body.city) ? req.body.city : '';
		var street = (req.body.street) ? req.body.street : '';
		var zipcode = (req.body.zipcode) ? req.body.zipcode : '';

		models.User.update({
			name: name,
			city: city,
			street: street,
			zipcode: zipcode
		}, {
			where: {
				id: id
			}
		})
		.then(function(ok) {
			if(ok) {
				res.sendStatus(status.OK);
			}
		})
	},

	updateByAdmin: function(req, res) {

		console.log("--> Update user by Admin: ");
		console.log(req.body);

		var name = (req.body.name) ? req.body.name : '';
		var city = (req.body.city) ? req.body.city : '';
		var street = (req.body.street) ? req.body.street : '';
		var zipcode = (req.body.zipcode) ? req.body.zipcode : '';
		var admin = req.body.admin;

		this.isAdmin(req)
		.then(function(isAdmin) {
			if(!isAdmin) {
				res.sendStatus(status.NOT_ADMIN);
				return;
			}
		})
		.then(function() {
			models.User.update({
				name: name,
				city: city,
				street: street,
				zipcode: zipcode,
				admin: admin
			}, {
				where: {
					id: req.params.id
				}
			})
			.then(function(ok) {
				if(ok) {
					res.sendStatus(status.OK);
				}
			})
		});
	},

	delete:		function (req, res) {

		this.isAdmin(req)
		.then(function(isAdmin) {
			if(!isAdmin) {
				res.sendStatus(status.NOT_ADMIN);
				return;
			}
		})
		.then(function() {
			models.User.find({
				where: {
					id: req.params.id
				}
			})
			.then(function(user) {
				if(user) {
					user.destroy();
					res.sendStatus(200);
				} else {
					res.sendStatus(404);
				}
			});
		});
	},

	controlPassword: function(password, hashedPassword){
		return (passwordHash2.verify(password, hashedPassword));
	},

	isAdmin: function(req) {

		var token = req.headers.authorization.replace("JWT ", "");
		var id = jwtDecode(token).id;

		return 	models.User.find({
					where: {
						id: id
					}
				})
				.then(function(user) {
					return user.admin;
				});
	}
}