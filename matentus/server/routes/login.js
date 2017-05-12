// -----------------------------------------------------
// Require modules and setup router
// -----------------------------------------------------

var express = require('express');
var router = express.Router();
var loginController = require('../controllers/loginController');

// -----------------------------------------------------
// Facebook Login Route
// -----------------------------------------------------

router.post('/facebook', function(req, res) {
	loginController.fblogin(req, res);
});

// -----------------------------------------------------
// Local Login Route
// -----------------------------------------------------

router.post('/email', function(req, res) {
	loginController.locallogin(req, res);
});

// -----------------------------------------------------
// Google Login Routee
// -----------------------------------------------------

router.post('/google', function(req, res) {
	loginController.googlelogin(req, res);
});

router.post('/status', function(req, res) {
	loginController.checkStatusLogin(req, res);
});

// -----------------------------------------------------
// Local exports
// -----------------------------------------------------

module.exports = router;