// -----------------------------------------------------
// Require modules and setup router
// -----------------------------------------------------
var express = require('express');
var router = express.Router();



var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var loginController = require('../controllers/loginController');
// -----------------------------------------------------
// Register User route
// -----------------------------------------------------
router.post('/newuser', function(req, res) {
    loginController.createEmailUser(req, res);
});

module.exports = router;