var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next){
  res.render('auth/register')
})

router.get('/login', function(req, res, next){
  res.render('auth/login')
})

module.exports = router;
