// -----------------------------------------------------
// Require modules and setup router
// -----------------------------------------------------

var express = require('express');
var router = express.Router();
var cityController = require('../controllers/cityController');
var passport = require('passport');

// -----------------------------------------------------
// Define API routes
// -----------------------------------------------------

router.get('/', function(req, res) {
	cityController.getAll(req, res);
});


// -----------------------------------------------------
// Local exports
// -----------------------------------------------------

module.exports = router;
