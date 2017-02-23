var express = require('express');
var router = express.Router();
var db = require('../models');
const crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.post('/', function(req, res, next) {
  db.Login.findOne({
    where: {
      username: req.body.username
    }
  }).then(function(user) {
    if(user) {
      let hmac = crypto.createHmac('sha512', user.salt)
                       .update(user.salt)
                       .digest('hex')
      if(user.hashpwd == hmac) {
        // req.session.user = user
        // req.session.role = "admin"
        res.render('home', {title: 'you are logged in'})
      }
    } else {
      res.render('index', {message: 'username & password not found'})
    }
  })
})

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'REGISTER' });
});

router.post('/register', function(req, res, next) {
  db.Login.create({
    username: req.body.username,
    email: req.body.email,
    hashpwd: req.body.hashpwd,
    role: req.body.role
  }).then(function(result) {
    res.redirect('/')
  })
});

router.get('/home', function(req, res, next) {

  res.render('home', { title: 'Home' });
});



module.exports = router;
