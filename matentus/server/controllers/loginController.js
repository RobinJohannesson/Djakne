var models  = require('../models');
var express = require('express');
var router  = express.Router();

module.exports = {

	login: 	function(req, res) {

				// authenticate to facebook api





				models.Category.findAll().then(function(categories) {
					res.json(categories);
				});
			}
}

var authenticate = new Promise(function() {

});