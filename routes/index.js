var express = require('express');
var router = express.Router();
const models = require('../models')
const crypto = require('crypto')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', {})
})

router.get('/login', function(req, res, next) {
  res.render('login', {msg: ''})
})

router.get('/dashboard', function(req, res, next) {
  if(!req.session.user || !req.session.role) {
    res.render('index', {title: "GAK BOLEH MASUK SITU BOS"})
  } else if (req.session.user !== null) {
    res.render('index', {title: `Hai ${req.session.user.username}`})
  }
})

router.post('/login', function(req, res, next) {
  models.User.findOne({
    where: {
      username: req.body.username
    }
  }).then(function(user) {
    console.log(user);
    if(user) {
      let hmac = crypto.createHmac('sha512', user.key)
      hmac.update(req.body.password)
      if(user.password == hmac.digest('hex')) {
        req.session.user = user
        req.session.role = "admin"
        res.render('index', {title: "MASUK BOS"})
      }
      else {
        res.render('login', {msg: "SALAH PASSWORD BOS"})
      }
    } else {
      res.render('login', {msg: "USER NOT FOUND BOS"})
    }
  })
})

router.post('/create', function(req, res, next) {
  models.User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).then(function() {
    res.redirect('/')
  })
})



module.exports = router;
