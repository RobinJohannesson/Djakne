// -----------------------------------------------------
// Require modules and setup router
// -----------------------------------------------------
var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var likeController = require('../controllers/likeController');
var commentController = require('../controllers/commentController');


// -----------------------------------------------------
// Define API routes
// -----------------------------------------------------
router.get('/:id/comments', function(req, res) {
	commentController.getAllCommentsOfUser(req, res);
});

router.get('/:id', function(req, res) {
	userController.get(req, res);
});

router.get('/', function(req, res) {
	userController.getAll(req, res);
})

router.get('/:id/likes', function(req, res) {
	likeController.getAllLikesOfUser(req, res);
});


// -----------------------------------------------------
// Local exports
// -----------------------------------------------------
module.exports = router;
