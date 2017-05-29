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
var jwtDecode = require('jwt-decode');

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

module.exports = {

	// --------------------------------------------------------------------------------------------
	//	Login with Facebook. If user does not already exists, one will be created and stored in db.
	// --------------------------------------------------------------------------------------------

	facebookLogin: 	function(req, res) {
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
						sendTokenResponse(res, user, 200);				
					} 
					else {
						models.User.create({ 
							name: name, 
							email: email, 
							admin: 0,
							notes: 'Inga noteringar'
						})
							.then(function(user) {
							sendTokenResponse(res, user, 201);
						});
					}
				});
			} 
		});
	},

	// --------------------------------------------------------------------------------------------
	//	Login with Google. If user does not already exists, one will be created and stored in db.
	// --------------------------------------------------------------------------------------------

	googleLogin: 	function(req, res) {

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
						sendTokenResponse(res, user, 200);				
					} 
					else {
						models.User.create({ 
							name: name, 
							email: email, 
							admin: 0,
							notes: 'Inga noteringar'
						})
							.then(function(user) {
							sendTokenResponse(res, user, 201);
						});
					}
				});
			} 
		});
	},

	// --------------------------------------------------------------------------------------------
	//	Login with email. If user does not already exists, one will be created and stored in db.
	// --------------------------------------------------------------------------------------------

	localLogin: 	function(req, res) {

		console.log(req.body);

		var email = req.body.email;
		var password = req.body.password;

		models.User.find( {
			where: {
				email: email
			}
		})
			.then(function(user) {

			if (user.password!=null){
				if(user) {
					if(passwordHash.verify(password, user.password)){
						sendTokenResponse(res, user, 200);
					}
					else{
						res.status(201);
					}

				} 
				else {

					var hashedPassword = passwordHash.generate(password);
					var name = (req.body.name) ? req.body.name : '';

					models.User.create({ 
						name: name, 
						email: email, 
						password: hashedPassword,
						admin: 0,
						notes: 'Inga noteringar'
					})
						.then(function(user) {
						sendTokenResponse(res, user, 201);
					});
				}		
			}
			
			else if (user.password==null){
				res.status(201);
			}

		});
	},

	// --------------------------------------------------------------------------------------------
	//	Returns JSON response telling if user is admin or not.
	// --------------------------------------------------------------------------------------------

	getLoginStatus:	function(req, res){

		var token = req.headers.authorization.replace("JWT ", "");
		var id = jwtDecode(token).id;

		models.User.find( {
			where: {id: id}
		})
			.then(function(user) {
			res.json({
				isAdmin: user.admin
			});
		});
	}
}

function sendTokenResponse(res, user, status) {
	var payload = {id: user.id};
	var token = jwt.sign(payload, jwtOptions.secretOrKey);
	res.status(status);
	res.json({token: token});
}