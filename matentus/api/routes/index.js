var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController');
var subcategoryController = require('../controllers/subcategoryController');
var productController = require('../controllers/productController');
var commentController = require('../controllers/commentController');
var userController = require('../controllers/userController');
var likeController = require('../controllers/likeController');



/* GET home page. */
router.get('/categories', function(req, res) {
	categoryController.getAll(req, res);
});

router.get('/categories/:id', function(req, res) {
	categoryController.get(req, res);
});

router.get('/categories/:id/subcategories', function(req, res) {
	subcategoryController.getAll(req, res);
});

router.get('/subcategories/:id', function(req, res) {
	subcategoryController.get(req, res);
});

router.get('/products/:id', function(req, res) {
	productController.get(req, res);
});

router.get('/subcategories/:id/products', function(req, res) {
	productController.getAll(req, res);
});

router.get('/comments/:id', function(req, res) {
	commentController.get(req, res);
});

router.get('/products/:id/comments', function(req, res) {
	commentController.getAllCommentsOfProduct(req, res);
});

router.get('/users/:id/comments', function(req, res) {
	commentController.getAllCommentsOfUser(req, res);
});

router.get('/users/:id', function(req, res) {
	userController.get(req, res);
});

router.get('/users', function(req, res) {
	userController.getAll(req, res);
})

router.get('/users/:id/likes', function(req, res) {
	likeController.getAllLikesOfUser(req, res);
});

router.get('/products/:id/likes', function(req, res) {
	likeController.getAllLikesOfProduct(req, res);
});

module.exports = router;
