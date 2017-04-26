var express = require('express');
var router = express.Router();
var subcategoryController = require('../controllers/subcategoryController');


router.get('/:id', function(req, res) {
	subcategoryController.get(req, res);
});

router.get('/:id/products', function(req, res) {
	productController.getAll(req, res);
});

module.exports = router;
