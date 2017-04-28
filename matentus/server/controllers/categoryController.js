var models  = require('../models');
var express = require('express');
var router  = express.Router();

module.exports = {
	getAll: 	function(req, res) {
					models.Category.findAll().then(function(categories) {
						res.json(categories);
					});
				},

	get: 		function(req, res) {
					var id = req.params.id;
					models.Category.find( {
						where: {id: id}
					})
					.then(function(category) {
						res.json(category);
					});
				},
	
	createCategory:		function(req, res){
							models.Category.create({title: req.body.title});
	}
	
}

// router.get('/', function(req, res) {
//   models.Category.findAll({
//     include: [ models.Task ]
//   }).then(function(users) {
//     res.render('index', {
//       title: 'Sequelize: Express Example',
//       users: users
//     });
//   });
// });

// module.exports = router;