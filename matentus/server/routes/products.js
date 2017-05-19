// -----------------------------------------------------
// Require modules and setup router
// -----------------------------------------------------
var express = require('express');
var models = require('../models');
var router = express.Router();
var productController = require('../controllers/productController');
var likeController = require('../controllers/likeController');
var loginController=require('../controllers/loginController.js')
var multer = require('multer');
var upload = multer({ dest: 'public/images/'});
var passport=require('passport');


// -----------------------------------------------------
// Define API routes
// -----------------------------------------------------


router.put('/', upload.single('file'),passport.authenticate('jwt', { session: false }), function(req, res) {
	productController.updateProduct(req, res);
});

router.get('/suppliers',passport.authenticate('jwt', { session: false }), function(req, res) {
	productController.getAllSuppliers(req, res);
});

router.get('/userlikes',passport.authenticate('jwt', { session: false }), function(req, res) {
	console.log("Test111");
	likeController.getAllLikesOfUser(req, res);
});

router.get('/productlikes',passport.authenticate('jwt', { session: false }), function(req, res) {
	likeController.getAllLikesOfProduct(req, res);
});

router.get('/keywords',passport.authenticate('jwt', { session: false }), function(req, res) {
	productController.getAllKeywords(req, res);
});

router.get('/suggestions',passport.authenticate('jwt', { session: false }), function(req, res) {
	productController.getAllSuggestions(req, res);
});

router.get('/suggestions/:id',passport.authenticate('jwt', { session: false }), function(req, res) {
	productController.getSuggestion(req, res);
});

router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
	productController.getApproved(req, res);
});

router.delete('/:id',passport.authenticate('jwt', { session: false }), function(req, res){
	productController.deleteProduct(req, res);
});

router.get('/',  function(req, res){
	productController.getAllApproved(req, res);
});

router.post('/', upload.single('file'),passport.authenticate('jwt', { session: false }), function(req, res) {
	productController.createProduct(req, res);
});

router.get('/:id/likes',  passport.authenticate('jwt', { session: false }), function(req, res) {
	likeController.getAllLikesOfProduct(req, res);
});

router.post('/postlike',passport.authenticate('jwt', { session: false }), function(req, res){
	console.log("test");
    likeController.postLike(req, res);
});


// -----------------------------------------------------
// Local exports
// -----------------------------------------------------
module.exports = router;
