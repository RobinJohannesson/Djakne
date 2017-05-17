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


router.put('/', upload.single('file'), function(req, res) {
	productController.updateProduct(req, res);
});

router.get('/suppliers', function(req, res) {
	productController.getAllSuppliers(req, res);
});

router.get('/keywords', function(req, res) {
	productController.getAllKeywords(req, res);
});

router.get('/suggestions', function(req, res) {
	productController.getAllSuggestions(req, res);
});

router.get('/suggestions/:id', function(req, res) {
	productController.getSuggestion(req, res);
});

//router.get('/:id', function(req, res) {
//	productController.getApproved(req, res);
//});

router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
	productController.getApproved(req, res);
});

router.get('/:id/likes',  passport.authenticate('jwt', { session: false }), function(req, res) {
	likeController.getAllLikesOfProduct(req, res);
});

router.post('/postproduct',  passport.authenticate('jwt', { session: false }), function(req, res){
	productController.createProduct(req, res);
});

//Lägg till auth.
router.post('/editproduct', function(req, res){
	productController.editProduct(req, res);
});

//Lägg till auth.
router.delete('/:id', function(req, res){
	productController.deleteProduct(req, res);
});

router.get('/',  function(req, res){
	productController.getAllApproved(req, res);
});

router.post('/', upload.single('file'), function(req, res) {
	productController.createProduct(req, res);
});

router.post('/postlike', function(req, res){
    likeController.postLike(req, res);
})


// -----------------------------------------------------
// Local exports
// -----------------------------------------------------
module.exports = router;
