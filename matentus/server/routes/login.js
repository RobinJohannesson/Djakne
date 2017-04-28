// -----------------------------------------------------
// Require modules and setup router
// -----------------------------------------------------

var express = require('express');
var router = express.Router();
var loginController = require('../controllers/loginController');



// -----------------------------------------------------
// Define API routes
// -----------------------------------------------------

router.post('/facebook' function(req, res) {
	loginController.login(req, res);
});


// -----------------------------------------------------
// Local exports
// -----------------------------------------------------

module.exports = router;