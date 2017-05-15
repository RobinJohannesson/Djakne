var models  = require('../models');
var express = require('express');
var router  = express.Router();

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
						var userId = req.params.id;
						var productId=req.params.productId;
					}
	
}