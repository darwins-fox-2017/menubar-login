var express = require('express');
var router = express.Router();

let model = require('../models')

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');
});

router.post('/create', function(res, req, next){
  console.log(res.body);

})

module.exports = router;
