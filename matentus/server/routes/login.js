// -----------------------------------------------------
// Require modules and setup router
// -----------------------------------------------------

var express = require('express');
var router = express.Router();
var loginController = require('../controllers/loginController');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

// -----------------------------------------------------
// Authentication
// -----------------------------------------------------

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
	console.log('payload received', jwt_payload);
	var user =  models.User.find( {
		where: {id: jwt_payload.id}
	})
	.then(function(user) {
		if (user) {
			next(null, user);
		} else {
			next(null, false);
		}
	});
});
passport.initialize();
passport.use(strategy);



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
// Google Login Route
// -----------------------------------------------------

router.post('/google', function(req, res) {
	loginController.googlelogin(req, res);
});


// -----------------------------------------------------
// Token Status Route
// -----------------------------------------------------
router.get('/status', passport.authenticate('jwt', { session: false }), function(req, res) {
});


// -----------------------------------------------------
// Local exports
// -----------------------------------------------------

module.exports = router;