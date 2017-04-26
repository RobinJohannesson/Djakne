var models  = require('../models');
var express = require('express');
var router  = express.Router();

module.exports = {

  getAll:   function(req, res) {
              models.User.findAll()
              .then(function(users) {
                res.json(users);
              });
            },

  get:    function(req, res) {
            var id = req.params.id;
            models.User.find( {
              where: {id: id}
            })
            .then(function(user) {
              res.json(user);
            });
        }
}