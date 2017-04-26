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
var BearerStrategy = require('passport-http-bearer').Strategy
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

app.get("/up", function(req, res) {
  res.json({message: "Express is up!"});
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

 //facebook auth setup
    options = {
        clientID: "1960319234199009",
        clientSecret: "c56e85a4ea9a2b98303a6518d882b417",
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    };

    passport.use(
        new FacebookStrategy(
            options,
            function(accessToken, refreshToken, profile, done) {
                models.User.findOrCreate(
                    { fbid: profile.id },
                    function (err, result) {
                        if(result) {
                            result.access_token = accessToken;
                            result.save(function(err, doc) {
                                done(err, doc);
                            });
                        } else {
                            done(err, result);
                        }
                    }
                );
            }
        )
    );

 app.get(
        '/auth/facebook',
        passport.authenticate('facebook', { session: false, scope: [] })
    );

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { session: false, failureRedirect: "/" }),
        function(req, res) {
            res.redirect("/profile?access_token=" + req.user.access_token);
        }
    );

    //token auth setup
    passport.use(
        new BearerStrategy(
            function(token, done) {
                models.User.findOne({ access_token: token },
                    function(err, user) {
                        if(err) {
                            return done(err)
                        }
                        if(!user) {
                            return done(null, false)
                        }

                        return done(null, user, { scope: 'all' })
                    }
                );
            }
        )
    );



app.get(
    '/',
    function(req, res) {
        res.send('<a href="/auth/facebook">Log in</a>');
    }
);

app.get(
    '/profile',
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
        res.send("LOGGED IN as " + req.user.facebookId + " - <a href=\"/logout\">Log out</a>");
    }
);

module.exports = router;

app.listen(3000, function() {
  console.log("Express running");
});

