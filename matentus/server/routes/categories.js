// -----------------------------------------------------
// Require modules and setup router
// -----------------------------------------------------
var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController');
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
// Define API routes
// -----------------------------------------------------
router.get('/', function(req, res) {
	categoryController.getAll(req, res);
});

router.get('/:id', function(req, res) {
	categoryController.get(req, res);
});

router.get('/:id/subcategories', function(req, res) {
	subcategoryController.getAll(req, res);
});

router.post('/createcategory', function (req, res){
	categoryController.createCategory(req, res);
});


// -----------------------------------------------------
// Local exports
// -----------------------------------------------------
module.exports = router;
