var express = require('express');
var router = express.Router();
let models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ei Corps' });
});

router.post('/new', function(req, res){
  models.User.create(req.body).then(function(users){
    res.render('user')
  })
})

module.exports = router;
