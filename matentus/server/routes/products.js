// -----------------------------------------------------
// Require modules and setup router
// -----------------------------------------------------
var express = require('express');
var models = require('../models');
var router = express.Router();
var productController = require('../controllers/productController');
var likeController = require('../controllers/likeController');
var loginController=require('../controllers/loginController.js')
var commentController = require('../controllers/commentController');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var multer = require('multer');
var upload = multer({ dest: 'images/'});

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

router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
	productController.get(req, res);
});


// --> Tillfälligt för att testa hämta produkter utan autentisering
//router.get('/:id', function(req, res) {
//	productController.get(req, res);
//});

router.get('/:id/likes',  passport.authenticate('jwt', { session: false }), function(req, res) {
	likeController.getAllLikesOfProduct(req, res);
});

router.post('/postproduct',  passport.authenticate('jwt', { session: false }), function(req, res){
	productController.createProduct(req, res);
});

router.get('/',  function(req, res){
	productController.getAll(req, res);
});

// Ladda upp ny produkt med bildfil -> Bilden lagras i /images

router.post('/upload', upload.single('image'), function(req, res) {
	console.log(req.body);
	console.log(req.file);
	productController.createProduct(req, res);
});


// -----------------------------------------------------
// Local exports
// -----------------------------------------------------
module.exports = router;
