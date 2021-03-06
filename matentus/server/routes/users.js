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

router.get('/me', passport.authenticate('jwt', { session: false }), function(req, res) {
	userController.getThisUser(req, res);
});

router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
	userController.get(req, res);
});

router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
	userController.getAll(req, res);
});

router.put('/', passport.authenticate('jwt', { session: false }), function(req, res) {
	userController.updateByUser(req, res);
});

router.get('/:id/likes', passport.authenticate('jwt', { session: false }), function(req, res) {
	likeController.getAllLikesOfUser(req, res);
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
	userController.delete(req, res);
});

router.put('/:id/admin', passport.authenticate('jwt', { session: false }), function(req, res) {
	userController.updateByAdmin(req, res);
});

// -----------------------------------------------------
// Local exports
// -----------------------------------------------------
module.exports = router;
