// -----------------------------------------------------
// Require modules and setup router
// -----------------------------------------------------

var express = require('express');
var passport=require('passport');
var router = express.Router();
var loginController = require('../controllers/loginController');

// -----------------------------------------------------
// Facebook Login Route
// -----------------------------------------------------

router.post('/facebook', function(req, res) {
	loginController.facebookLogin(req, res);
});

// -----------------------------------------------------
// Local Login Route
// -----------------------------------------------------

router.post('/email', function(req, res) {
	loginController.localLogin(req, res);
});

// -----------------------------------------------------
// Google Login Routee
// -----------------------------------------------------

router.post('/google', function(req, res) {
	loginController.googleLogin(req, res);
});

// -----------------------------------------------------
// Login Status Route
// -----------------------------------------------------
router.get('/status', passport.authenticate('jwt', { session: false }), function(req, res) {
	console.log("STATUS");
	loginController.getLoginStatus(req, res);
});

// -----------------------------------------------------
// Local exports
// -----------------------------------------------------

module.exports = router;