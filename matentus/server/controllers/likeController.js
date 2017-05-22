var models  = require('../models');
var express = require('express');
var router  = express.Router();
var jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');
var json2csv = require('json2csv');
var fs = require('fs');

module.exports = {

	getAllLikesOfUser: 			function(req, res) {
		token=req.headers.authorization;
		token=token.replace("JWT", "");
		token=token.replace(" ", "");
		var decoded = jwtDecode(token);
		userId=decoded.id;
		models.Like.findAll( {
			where: {user_id: userId}
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
					res.sendStatus(200);
				}).then (function(){
					models.Product.find({
						where:{id: productId}
					}).then(function(product){
						return product.increment('likeAmount', {by: 1})
					}).then(function(){
						res.sendStatus(200);
					})

				});
			}
			else if(like){
				models.Product.find({
						where:{id: productId}
					}).then(function(product){
						return product.decrement('likeAmount', {by: 1})
					}).then(function(){
						like.destroy();
						res.sendStatus(201);
					})
				
				
				}
			})

		},

				  createEmailList:	function(req,res){					
			var productId = req.params.id;
			var emailList='[ ';
			var count=0;
			models.Like.findAll( {
				where: {product_id: productId}
			}).then(function(likes) {
				if (!likes){
					res.sendStatus(300)
				}
				else if(likes) {
					for (var i = 0; i <= likes.length-1; i++) {
						models.User.find( {
							where: {id: likes[i].user_id}
						}).then(function(user) {
							if (!user){
								res.sendStatus(300);
							}
							else if (user){
								if(count==0&&likes.length!=1){
									emailList=emailList+'{"email":"'+user.email+'"}';
									count=count+1;
								}
								else if (count>0&&likes.length!=1){
									emailList=emailList+',{"email":"'+user.email+'"}';
									count=count+1;
									if (count==likes.length){
										emailList=emailList+' ]';
										var obj = JSON.parse(emailList);
										var fields = ['email'];
										var csv = json2csv({ data: obj, fields: ['email']});
										var file='public/emaillists/emailList_'+productId+'.csv';
										fs.writeFile(file, csv, function(err) {
											if (err) throw err;
											console.log('file saved');
										})
										res.json(file);
									}
								}
								else if(likes.length==1){
									emailList=emailList+'{"email":"'+user.email+'"}';
									emailList=emailList+' ]';
									var obj = JSON.parse(emailList);
									var fields = ['email'];
									var csv = json2csv({ data: obj, fields: ['email']});
									var file='public/emaillists/emailList_'+productId+'.csv';
									fs.writeFile(file, csv, function(err) {
										if (err) throw err;
										console.log('file saved');
									})
									res.json(file);

								}
							}
						});
					}
				}
			});


		}

	}
