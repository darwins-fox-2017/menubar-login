'use strict';
var express       = require('express');
var router        = express.Router();
var models        = require('../models')
var app           = express();
var passwordHash  = require('password-hash');
var session       = require('express-session');

/* GET users listing. */
router.get('/', function(req, res) {
  models.User.findAll({raw:true}).then(function(find){
    res.render("pages/menu", {data:find})
  })
});

router.get('/register', function(req, res, next) {
    res.render("pages/register")
});

router.post('/register', function(req, res, next) {
  var hashed = passwordHash.generate(req.body.password);
  models.User.create({username: req.body.username, email: req.body.email, password:hashed, role:req.body.role, createdAt: new Date()})
  .then(function (data) {
    res.redirect('/users')
    })
});

router.post('/login', function(req, res, next) {
  var pwd = req.body.password
  var mail = req.body.email
  // console.log("MASUK SATU");
  models.User.find({where:{email: mail}})
  .then(function (data) {
    if(passwordHash.verify(pwd, data.password)) {
        res.render("pages/home", {session: req.session})
      // console.log("MASUK");
    } else {
      res.redirect('/users')
    }
  })
});

router.get('/out', function(req, res, next) {
    res.redirect('/users')
});

module.exports = router;
