var models  = require('../models');
var express = require('express');
var router  = express.Router();
var jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');

module.exports = {

	getAllLikesOfUser: 			function(req, res) {
		
		console.log("hejHej");
		token=req.headers.authorization;
		token=token.replace("JWT", "");
		token=token.replace(" ", "");
		var decoded = jwtDecode(token);
		userId=decoded.id;
		console.log("HEj");
		models.Like.findAll( {
			where: {user_id: userId}
		})
			.then(function(likes) {
				res.json(likes);
		});
	},

	getAllLikesOfProduct: 		function(req, res) {
        console.log("TESTAAAAR");
        var productId = req.body.productId;
        console.log(productId);
		var productId = req.params.id;
        console.log(productId);
		models.Like.findAll( {
			where: {product_id: 78}
		})
			.then(function(likes) {
			res.json(likes);
		});
	},

	postLike:		function(req,res){
		token=req.headers.authorization;
		token=token.replace("JWT", "");
		token=token.replace(" ", "");
		var decoded = jwtDecode(token);
		userId=decoded.id;
		productId=req.body.productId;
		console.log(productId);

		models.Like.find( {
			where: {user_id: userId,
					product_id: productId
				   }
		})
			.then(function(like) {
			if(!like){
				models.Like.create({user_id: userId, product_id: productId})
					.then(function() {
					console.log("test");
					res.sendStatus(200);
				})
			}
			else if(like){
				like.destroy();
				res.sendStatus(201);
			}
		});

	}

}