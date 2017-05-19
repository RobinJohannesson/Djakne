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

	// --------------------------------------------------------------------------------------------
	//	Login with Facebook. If user does not already exists, one will be created and stored in db.
	// --------------------------------------------------------------------------------------------

	fblogin: 	function(req, res) {
		var fbtoken = req.body.fbtoken;

		request.get({ url: 'https://graph.facebook.com/me?fields=name,email&access_token=' + fbtoken }, function(error, response, body) { 

			if(!error && response.statusCode == 200) {

				var info = JSON.parse(response.body);
				var email = info['email'];
				var name = info['name'];

				models.User.find({
					where: {
						email: email
					}
				})
				.then(function(user) {
					if(user) {
						sendTokenResponse(res, user);				
					} 
					else {
						models.User.create({ 
							name: name, 
							email: email, 
							admin: 0
						})
						.then(function(user) {
							sendTokenResponse(res, user);
						});
					}
				});
			} 
		});
	},

	// --------------------------------------------------------------------------------------------
	//	Login with Google. If user does not already exists, one will be created and stored in db.
	// --------------------------------------------------------------------------------------------

	googlelogin: 	function(req, res) {

		var googletoken = req.body.googletoken;
		request.get({ url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token='+googletoken },      function(error, response, body) { 
			
			if(!error && response.statusCode == 200) {

				var info = JSON.parse(response.body);
				var email = info['email'];
				var name = info['name'];

				models.User.find({
					where: {
						email: email
					}
				})
				.then(function(user) {
					if(user) {
						sendTokenResponse(res, user);				
					} 
					else {
						models.User.create({ 
							name: name, 
							email: email, 
							admin: 0
						})
						.then(function(user) {
							sendTokenResponse(res, user);
						});
					}
				});
			} 
		});
	},

	// --------------------------------------------------------------------------------------------
	//	Login with email. If user does not already exists, one will be created and stored in db.
	// --------------------------------------------------------------------------------------------

	locallogin: 	function(req, res) {

		var email = req.body.email;
		var password = req.body.password;

		models.User.find( {
			where: {
				email: email
			}
		})
		.then(function(user) {
			if (!user) {
				res.sendStatus(401);
			} 
			if(userController.controlPassword(password, user.password)) {
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
	createEmailUser:	function(req, res) {

		console.log(req.body);

		var hashedPassword = passwordHash.generate(req.body.password);       

		models.User.find({
			where: {email: req.body.email}	   
		})
		.then(function(user) {
			if(!user) {
				console.log("There was no such user...");
				models.User.create({name: req.body.name, email: req.body.email, password: hashedPassword, admin: 0})
				.then(function() {
					models.User.find({
						where: {email: req.body.email}
					})
					.then(function(user) {
						console.log("Now there is one");
						console.log(user);
						var payload = {id: user.id};
						var token = jwt.sign(payload, jwtOptions.secretOrKey);
						res.json({token: token});
					});
				});
			} else {
				var payload = {id: user.id};
				var token = jwt.sign(payload, jwtOptions.secretOrKey);
				res.json({token: token});
			}
		})
	}
}

function sendTokenResponse(res, user) {
	var payload = {id: user.id};
	var token = jwt.sign(payload, jwtOptions.secretOrKey);
	res.json({token: token});
}