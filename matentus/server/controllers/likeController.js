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

	getAllLikesOfProduct: 		function(req, res) {
        console.log("TESTAAAAR");
        var productId = req.body.productId;
        console.log(productId);
		var productId = req.params.id;
        console.log(productId);
		models.Like.findAll( {
<<<<<<< HEAD
			where: {product_id: 78}
=======
			where: {product_id: productId}
>>>>>>> 6f6fcefce67cb730d95755a369d37db7c6eb340c
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
				})
			}
			else if(like){
				like.destroy();
				res.sendStatus(201);
			}
		});

	},

	createEmailList:	function(req,res){					
		var productId = req.params.id;
		var emailList='[ ';
		var count=0;
		models.Like.findAll( {
			where: {product_id: productId}
		}).then(function(likes) {
			if (!likes){
				res.sendStatus()
			}
			else if(likes) { 
				for (var i = 0; i < likes.length; i++) {
					models.User.find( {
						where: {id: likes[i].user_id}
					}).then(function(user) {
						if (!user){
							res.sendStatus()
						}
						else if (user){
							if(count==0){
								emailList=emailList+'{"email":"'+user.email+'"}';
								count++;
							}
							else if (count>0){
								emailList=emailList+',{"email":"'+user.email+'"}';
								count++;
								if (count==likes.length){
									emailList=emailList+' ]';
									var obj = JSON.parse(emailList);
									var fields = ['email'];
									var csv = json2csv({ data: obj, fields: ['email']});
									var file='admin/emaillists/emailList_'+productId+'.csv';
									fs.writeFile(file, csv, function(err) {
										if (err) throw err;
										console.log('file saved');
									})
									res.json(file);
								}
							}
						}
					});
				}
			}
		});


	}

}
