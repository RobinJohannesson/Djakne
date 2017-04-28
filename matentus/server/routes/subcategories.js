// -----------------------------------------------------
// Require modules and setup router
// -----------------------------------------------------
var express = require('express');
var router = express.Router();
var subcategoryController = require('../controllers/subcategoryController');
var productController = require('../controllers/productController');



// -----------------------------------------------------
// Define API routes
// -----------------------------------------------------
router.get('/:id', function(req, res) {
	subcategoryController.get(req, res);
});

router.get('/:id/products', function(req, res) {
	productController.getAll(req, res);
});

router.get('/', function(req, res) {
	subcategoryController.getAll(req, res);
});

router.post('/create', function (req, res){
	subcategoryController.create(req, res);
});

// -----------------------------------------------------
// Local exports
// -----------------------------------------------------
module.exports = router;
