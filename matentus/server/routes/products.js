// -----------------------------------------------------
// Require modules and setup router
// -----------------------------------------------------

var express = require('express');
var models = require('../models');
var router = express.Router();
var productController = require('../controllers/productController');
var likeController = require('../controllers/likeController');
var multer = require('multer');
var upload = multer({ dest: 'public/images/'});
var passport = require('passport');


// -----------------------------------------------------
// Define API routes
// -----------------------------------------------------

router.get('/',  function(req, res){
	productController.getAllApproved(req, res);
});

router.get('/suppliers', function(req, res) {
	productController.getAllSuppliers(req, res);
});

router.get('/keywords', function(req, res) {
	productController.getAllKeywords(req, res);
});

router.get('/suggestions', passport.authenticate('jwt', { session: false }), function(req, res) {
	productController.getAllSuggestions(req, res);
});

router.get('/suggestions/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
	productController.getSuggestion(req, res);
});

router.get('/userlikes', passport.authenticate('jwt', { session: false }), function(req, res) {
	likeController.getAllLikesOfUser(req, res);
});

router.get('/productlikes', passport.authenticate('jwt', { session: false }), function(req, res) {
	likeController.getAllLikesOfProduct(req, res);
});

router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
	productController.getApproved(req, res);
});

router.post('/', upload.single('file'), passport.authenticate('jwt', { session: false }), function(req, res) {
	productController.createProduct(req, res);
});

router.post('/suggestions', upload.single('file'), passport.authenticate('jwt', { session: false }), function(req, res) {
	productController.createSuggestion(req, res);
});

router.put('/:id', upload.single('file'), passport.authenticate('jwt', { session: false }), function(req, res) {
	productController.update(req, res);
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), function(req, res){
	productController.delete(req, res);
});

router.get('/emaillist', passport.authenticate('jwt', { session: false }), function(req, res) {
	likeController.createEmailList(req, res);
});

router.post('/postlike', passport.authenticate('jwt', { session: false }), function(req, res){
    likeController.postLike(req, res);
});


// -----------------------------------------------------
// Local exports
// -----------------------------------------------------
module.exports = router;
