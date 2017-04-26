var express = require('express');
var router = express.Router();
var models  = require('../models');
var _ = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var models  = require('../models');

var passport = require("passport");
var passportJWT = require("passport-jwt");
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var FacebookStrategy = require('passport-facebook').Strategy;


var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

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

passport.use(strategy);

var app = express();
app.use(passport.initialize());

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse application/json
app.use(bodyParser.json())

app.get("/", function(req, res) {
    res.json({message: "Express is up!"});
});


app.post("/register",function(req, res){
});

app.post("/login", function(req, res) {
    if(req.body.name && req.body.password){
        var name = req.body.name;
        var password = req.body.password;
    }
    // usually this would be a database call:
    var user = models.User.find( {
        where: {username: name}
    })
    .then(function(user) {
        if (!user) {
            res.status(401).json({message:"no such user found"});;
        } 
        if(user.password === req.body.password) {
            // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
            var payload = {id: user.id};
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({message: "ok", token: token});
        } else {
            res.status(401).json({message:"passwords did not match"});
        } 
    });
});

app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
    res.json({message: "Success! You can not see this without a token"});
});

app.get("/secretDebug",
        function(req, res, next){
    console.log(req.get('Authorization'));
    next();
}, function(req, res){
    res.json("debugging");
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/userss', function(req, res) {
    models.User.findAll({
    }).then(function(users) {
        res.json(users)
    });
});



//Facebook Login

passport.use(new FacebookStrategy({
    clientID: "1960319234199009",
    clientSecret: "c56e85a4ea9a2b98303a6518d882b417",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
},
                                  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken)
    var user = models.User.find( {
        where: {googleid: profile.id}
    })
    .then(function(user) {
        if (!user) {
            var userX = models.User.create({ username: profile.displayName, email: profile._json.email, password: null , fbid: profile.id}).then(function(){return cb(null,userX)});

        } 
        if(user) {
            var payload = {id: profile.id};
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            console.log(token);
        } else {
            //res.json({message:"passwords did not match"});
        } 
    });
}
                                 ));

app.get('/auth/facebook', passport.authenticate('facebook',{session: false, scope: ['email']}));  

app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {session: false, failureRedirect: '/test' }),
        function(req, res, userX) {
    var payload = {id: userX.id};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.redirect('http://localhost:9000/token='+token);
});

router.get('/test'), function(req, res){
    console.log("/test");
}

//Google Login

passport.use(new GoogleStrategy({
    clientID: "1062166543636-m8nnt9b73m9o566ohuqtrsp32c7dvq5a.apps.googleusercontent.com",
    clientSecret: "IGnFuF0KUav4k72oPfdlrkbn",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
   console.log(accessToken)
    var user = models.User.find( {
        where: {googleid: profile.id}
    })
    .then(function(user) {
        if (!user) {
            var userX = models.User.create({ username: profile.displayName, email: profile._json.email, password: null , googleid: profile.id}).then(function(){return cb(null,userX)});

        } 
        if(user) {
            var payload = {id: profile.id};
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            cb(null,user);
        } else {
            //res.json({message:"passwords did not match"});
        } 
    });
}));


app.get('/auth/google',
  passport.authenticate('google',{session: false, scope: ['email']}));

app.get('/auth/google/callback', 
   passport.authenticate('google', {session: false, failureRedirect: '/test' }),
        function(req, res, userX) {
    var payload = {id: userX.id};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json(token);
    res.redirect('/');
});

module.exports = router;

app.listen(3000, function() {
    console.log("Express running");
});

