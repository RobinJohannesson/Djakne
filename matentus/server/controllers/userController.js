var models  = require('../models');
var express = require('express');
var router  = express.Router();
var passwordHash = require('password-hash');
var passwordHash2 = require('password-hash/lib/password-hash');
var jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');

module.exports = {

	getAll:   function(req, res) {
		models.User.findAll()
			.then(function(users) {
			res.json(users);
		});
	},

	get:    function(req, res) {
		var id = req.params.id;
		models.User.find( {
			where: {
				id: id
			}
		})
		.then(function(user) {
			res.json(user);
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
					console.log("Got user from db: ");
					console.log(user);
					var isAdmin = (user.id === 1) ? true : false;
					return isAdmin;
				});
	}


}