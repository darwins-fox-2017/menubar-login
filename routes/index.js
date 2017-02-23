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


var sess;

router.get('/dashboard', function(req, res, next){
  sess = req.session;
  sess.email; 
  sess.username;
  res.render('dashboard/index')
})

module.exports = router;
