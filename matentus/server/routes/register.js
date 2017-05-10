// -----------------------------------------------------
// Require modules and setup router
// -----------------------------------------------------
var express = require('express');
var router = express.Router();



var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

// -----------------------------------------------------
// Register User route
// -----------------------------------------------------
router.post('/newuser', function(req, res) {
    userController.createEmailUser(req, res);
});

module.exports = router;