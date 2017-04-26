// -----------------------------------------------------
// Require modules and setup router
// -----------------------------------------------------
var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController');


// -----------------------------------------------------
// Define API routes
// -----------------------------------------------------
router.get('/', function(req, res) {
	console.log('Origin: ' + req.get('origin'));
	console.log('Host: ' + req.get('host'));

	categoryController.getAll(req, res);
});

router.get('/:id', function(req, res) {
	categoryController.get(req, res);
});

router.get('/:id/subcategories', function(req, res) {
	subcategoryController.getAll(req, res);
});


// -----------------------------------------------------
// Local exports
// -----------------------------------------------------
module.exports = router;
