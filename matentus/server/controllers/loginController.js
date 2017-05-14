var models  = require('../models');
var express = require('express');
var router  = express.Router();
var userController=require('../controllers/userController.js')
var passwordHash = require('password-hash');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var jwt = require('jsonwebtoken');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var request = require('request');

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
	console.log('payload received', jwt_payload);
	var user =  models.User.find( {
		where: {id: jwt_payload.id}
	})
	.then(function(user) {
		if (user) {
			next(null, user);
		} else {
			next(null, false);
		}
	});
});

var authenticate = new Promise(function() {
});

module.exports = {
	//TODO:Fixa så vi får ut email från vår access-token.
	fblogin: 	function(req, res) {
		var fbtoken = req.params.token;
		request.get({ url: 'https://graph.facebook.com/me?access_token='+fbtoken },      function(error, response, body) { 
			if (!error && response.statusCode == 200) {
				var info =JSON.parse(response.body);
				email=info['email'];

				var user = models.User.find( {
					where: {email: email}
				})
				.then(function(user) {
					if (!user) {
						models.User.create({name: info['name'], email: info['email'], admin: 0});
						var user = models.User.find( {
							where: {email: req.body.email}
						})
						.then(function() {
							var payload = {id: user.id};
							var token = jwt.sign(payload, jwtOptions.secretOrKey);
							res.json({status: 0, token: token});
						})
						if(user) {
							var payload = {id: user.id};
							var token = jwt.sign(payload, jwtOptions.secretOrKey);
							res.json({status: 0, token: token});
						} 
					};
				}) 
				}
		})
	},
	googlelogin: 	function(req, res) {

		// authenticate to google api

	},

	checkLoginStatus: 	function(req, res) {

		// Return status OK is Matentus-token is valid.

	},

	/*
	Local Login
	Status, 0 : User authenticated, token returned.
	Status, 1 : User dont exist.
	Status, 2 : User exist, wrong password.
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
				res.status(401).json({status:"1"});
			} 
			if(userController.controlPassword(req.body.password, user.password)) {
				var payload = {id: user.id};
				var token = jwt.sign(payload, jwtOptions.secretOrKey);
				res.json({status: 0, token: token});
			} else {
				res.status(401).json({status:"2"});
			} 
		});
	},

	/*
	Create Local User
	Status, 0 : User created, token returned.
	Status, 1 : User already exist.
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
					res.json({status: 0, token: token});
				})
				}
		});
	}
}