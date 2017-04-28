// -----------------------------------------------------
// Require modules and setup router
// -----------------------------------------------------
var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');
var likeController = require('../controllers/likeController');
var commentController = require('../controllers/commentController');


// -----------------------------------------------------
// Define API routes
// -----------------------------------------------------
router.get('/:id', function(req, res) {
	productController.get(req, res);
});
router.get('/:id/comments', function(req, res) {
	commentController.getAllCommentsOfProduct(req, res);
});

router.get('/:id/likes', function(req, res) {
	likeController.getAllLikesOfProduct(req, res);
});


// -----------------------------------------------------
// Local exports
// -----------------------------------------------------
module.exports = router;
