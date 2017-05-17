var models  = require('../models');
var express = require('express');
var router  = express.Router();
var jwt = require('jsonwebtoken');
module.exports = {

	getAllLikesOfUser: 			function(req, res) {
									var userId = req.params.id;
									models.Like.findAll( {
										where: {UserId: userId}
									})
									.then(function(likes) {
										res.json(likes);
									});
								},

	getAllLikesOfProduct: 		function(req, res) {
									var productId = req.params.id;
									models.Like.findAll( {
										where: {ProductId: productId}
									})
									.then(function(likes) {
										res.json(likes);
									});
								},
	
	postLike:		function(req,res){
						token=req.headers.authorization;
						token=token.replace("JWT", "");
						token=token.replace(" ", "");
						//var productId=req.body.productId;
						//console.log(productId);
						//console.log(decoded);
		
						//TODO Extract user-id from token.
						//TODO Create like in database.
					}
	
}