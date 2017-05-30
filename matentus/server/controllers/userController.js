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

		var sent = false;

		this.isAdmin(req)
		.then(function(isAdmin) {
			if(!isAdmin) {
				res.sendStatus(status.NOT_ADMIN);
				sent = true;
			}
		})
		.then(function() {
			models.User.findAll({
				attributes: ['id', 'name', 'email', 'city', 'street', 'zipcode', 'admin']
			})
			.then(function(users) {
				if(!sent) {
					res.json(users);
				}
			});
		});
	},

	get:    function(req, res) {

		var sent = false;

		this.isAdmin(req)
		.then(function(isAdmin) {
			if(!isAdmin) {
				res.sendStatus(status.NOT_ADMIN);
				sent = true;
			}
		})
		.then(function() {
			models.User.find({
				attributes: ['id', 'name', 'email', 'city', 'street', 'zipcode', 'admin']
			}, {
				where: {
					id: req.params.id
				}
			})
			.then(function(user) {
				if(!sent) {
					res.json(user);
				}
			});
		});
	},

	getThisUser: function(req, res) {
		var token = req.headers.authorization.replace("JWT ", "");
		var id = jwtDecode(token).id;

		models.User.find({
			attributes: ['id', 'name', 'email', 'city', 'street', 'zipcode']
		}, {
			where: {
				id: id
			}
		})
		.then(function(user) {
			res.json(user);
		})
		.catch(function (err) {
			res.sendStatus(status.BAD_REQUEST);
		});
	},

	updateByUser: function(req, res) {

		var token = req.headers.authorization.replace("JWT ", "");
		var id = jwtDecode(token).id;

		var name = req.body.name;
		var email = req.body.email;
		var city = req.body.city;
		var street = req.body.street;
		var zipcode = req.body.zipcode;

		models.User.find({ 
			where: { 
				id: id 
			} 
		})
		.then(function(user){

			if(name !== null) {
				user.updateAttributes({
					name: name
				});
			}
			if(email) {
				user.updateAttributes({
					email: email
				});
			}
			if(city !== null) {
				user.updateAttributes({
					city: city
				});
			}
			if(street !== null) {
				user.updateAttributes({
					street: street
				});
			}
			if(zipcode !== null) {
				user.updateAttributes({
					zipcode: zipcode
				});
			}
		})
		.then(function() {
			res.sendStatus(status.OK);
		})
		.catch(function(err) {
			res.sendStatus(status.BAD_REQUEST);
		});
	},

	updateByAdmin: function(req, res) {

		var name = req.body.name;
		var email = req.body.email;
		var city = req.body.city;
		var street = req.body.street;
		var zipcode = req.body.zipcode;
		var admin = req.body.admin;
		var id= req.body.id;
		this.isAdmin(req)
		.then(function(isAdmin) {
			if(!isAdmin) {
				res.sendStatus(status.NOT_ADMIN);
			}
			return isAdmin;
		})
		.then(function(isAdmin) {
			if(isAdmin) {
				models.User.find({ 
					where: { 
						id: id
					} 
				})
				.then(function(user){				
					if(name !== null) {
						user.updateAttributes({
							name: name
						});
					}
					if(email) {
						user.updateAttributes({
							email: email
						});
					}
					if(city !== null) {
						user.updateAttributes({
							city: city
						});
					}
					if(street !== null) {
						user.updateAttributes({
							street: street
						});
					}
					if(zipcode !== null) {
						user.updateAttributes({
							zipcode: zipcode
						});
					}
					if(admin !== null) {
						user.updateAttributes({
							admin: admin
						});
					}

				})
				.then(function() {
					res.sendStatus(status.OK);
				})
				.catch(function(err) {
					res.sendStatus(status.BAD_REQUEST);
				});
			}
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
			})
			.catch(function (err) {
				res.sendStatus(status.BAD_REQUEST);
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