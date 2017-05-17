var models  = require('../models');
var express = require('express');
var router  = express.Router();
var userController=require('../controllers/userController.js')
var passwordHash = require('password-hash');
var passport = require("passport");
var request = require("request");
var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

module.exports = {
	fblogin: 	function(req, res) {
		var fbtoken = req.body.fbtoken;

		request.get({ url: 'https://graph.facebook.com/me?fields=name,email&access_token='+fbtoken },      function(error, response, body) { 

			if (!error && response.statusCode == 200) {

				var info =JSON.parse(response.body);
				var email = info['email'];
				var name = info['name'];

				models.User.find( {
					where: {
						email: email
					}
				})
				.then(function(user) {
					if(!user) {
						models.User.create({name: name, email: email, admin: 0})
						.then(function() {
							models.User.find( {
								where: {
									email: email
								}
							})
							.then(function(user) {
								var payload = {id: user.id};
								var token = jwt.sign(payload, jwtOptions.secretOrKey);
								res.json({token: token});
							});
						})
					}

					else {
						var payload = {id: user.id};
						var token = jwt.sign(payload, jwtOptions.secretOrKey);
						res.json({token: token});
					} 

				});

			}
		})
	},

	googlelogin: 	function(req, res) {

		var googletoken = req.body.googletoken;
		request.get({ url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token='+googletoken },      function(error, response, body) { 
			if (!error && response.statusCode == 200) {

				var info = JSON.parse(response.body);
				var email = info['email'];
				var name = info['name'];

				models.User.find( {
					where: {
						email: email
					}
				})
				.then(function(user) {
					if(!user) {
						console.log("No such user");
						models.User.create({name: name, email: email, admin: 0})
						.then(function() {
							models.User.find( {
								where: {
									email: email
								}
							})
							.then(function(user) {
								console.log("New user: ");
								console.log(user);
								var payload = {id: user.id};
								var token = jwt.sign(payload, jwtOptions.secretOrKey);
								res.json({token: token});
							});
						})
					}

					else {
						var payload = {id: user.id};
						var token = jwt.sign(payload, jwtOptions.secretOrKey);
						res.json({token: token});
					} 

				}) 
				}
		})

	},
	/*
	Local Login
	*/
	locallogin: 	function(req, res) {
		if(req.body.email && req.body.password){
			var email = req.body.email;
			var password = req.body.password;
		}
		var user = models.User.find( {
			where: {email: email}
		})
		.then(function(user) {
			if (!user) {
				res.sendStatus(401);
			} 
			if(userController.controlPassword(req.body.password, user.password)) {
				var payload = {id: user.id};
				var token = jwt.sign(payload, jwtOptions.secretOrKey);
				res.json({token: token});
			} else {
				res.sendStatus(401);
			} 
		});
	},

	/*
	Create Local User
	*/
	createEmailUser:	function(req, res){
		var hashedPassword = passwordHash.generate(req.body.password);       

		var user = models.User.find({
			where: {email: req.body.email}	   
		})
		.then(function(user) {
			if (user){
				res.json({status:1});
			}
			else if (!user) {
				models.User.create({name: req.body.name, email: req.body.email, password: hashedPassword, admin: 0});
				var user = models.User.find( {
					where: {email: req.body.email}
				})
				.then(function() {
					var payload = {id: user.id};
					var token = jwt.sign(payload, jwtOptions.secretOrKey);
					res.json({token: token});
				})
				}
		});
	}
}