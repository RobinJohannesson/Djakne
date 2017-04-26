var models  = require('../models');
var express = require('express');
var router  = express.Router();

module.exports = {

	getAllCommentsOfProduct: 	function(req, res) {
									var productId = req.params.id;
									models.Comment.findAll({
										where: {ProductId: productId}
									}).then(function(comments) {
										res.json(comments);
									});
								},

	getAllCommentsOfUser: 		function(req, res) {
									var userId = req.params.id;
									models.Comment.findAll({
										where: {UserId: userId}
									}).then(function(comments) {
										res.json(comments);
									});
								},

	get: 		function(req, res) {
					var id = req.params.id;
					models.Comment.find( {
						where: {id: id}
					})
					.then(function(comment) {
						res.json(comment);
					});
				}
}