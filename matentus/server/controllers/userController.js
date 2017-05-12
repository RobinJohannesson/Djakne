var models  = require('../models');
var express = require('express');
var router  = express.Router();
var passwordHash = require('password-hash');
var passwordHash2 = require('password-hash/lib/password-hash');

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
			where: {id: id}
		})
			.then(function(user) {
			res.json(user);
		});
	},

	controlPassword: function(password, hashedPassword){
		console.log(hashedPassword);
		console.log(passwordHash2.isHashed(hashedPassword));
		return (passwordHash2.verify(password, hashedPassword));
	}


}