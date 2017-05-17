// -----------------------------------------------------
// Require modules and setup router
// -----------------------------------------------------
var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var likeController = require('../controllers/likeController');
var passport = require('passport');
// -----------------------------------------------------
// Define API routes
// -----------------------------------------------------

router.get('/:id',passport.authenticate('jwt', { session: false }), function(req, res) {
	userController.get(req, res);
});

router.get('/',passport.authenticate('jwt', { session: false }), function(req, res) {
	userController.getAll(req, res);
});

//TODO
router.get('/:id/likes',passport.authenticate('jwt', { session: false }), function(req, res) {
	likeController.getAllLikesOfUser(req, res);
});

// -----------------------------------------------------
// Local exports
// -----------------------------------------------------
module.exports = router;
