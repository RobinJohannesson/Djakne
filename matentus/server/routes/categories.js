// -----------------------------------------------------
// Require modules and setup router
// -----------------------------------------------------

var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController');
var passport = require('passport');

// -----------------------------------------------------
// Define API routes
// -----------------------------------------------------

router.get('/', function(req, res) {
	categoryController.getAll(req, res);
});

router.get('/:id', function(req, res) {
	categoryController.get(req, res);
});

router.post('/',passport.authenticate('jwt', { session: false }), function (req, res) {
	categoryController.create(req, res);
});

router.put('/:id',passport.authenticate('jwt', { session: false }), function(req, res) {
	categoryController.update(req, res);
});

router.delete('/:id',passport.authenticate('jwt', { session: false }), function(req, res) {
	categoryController.delete(req, res);
});

// -----------------------------------------------------
// Local exports
// -----------------------------------------------------

module.exports = router;
