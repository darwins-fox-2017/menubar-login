var express = require('express');
var router = express.Router();
let models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign-up', { title: 'Ei Corps' });
});

router.post('/create', function(req, res){
  models.User.create({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password,
    role:req.body.roles
  }).then(function(users){
    res.redirect('/')
  })
})

module.exports = router;
