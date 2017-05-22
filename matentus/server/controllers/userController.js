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
			models.User.findAll()
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
			models.User.find( {
				where: {
					id: req.params.id
				}
			})
			.then(function(user) {
				res.json(user);
			});
		});
	},

	update: function(req, res) {

		var token = req.headers.authorization.replace("JWT ", "");
		var id = jwtDecode(token).id;

		models.User.update({
			name: req.body.name,
			city: req.body.city
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