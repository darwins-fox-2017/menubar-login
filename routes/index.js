var express = require('express');
var router = express.Router();
let models = require('../models')
const crypto = require('crypto')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ei Corps' });
});

router.post('/', function(req, res){
  models.User.findOne({
    where:{email:req.body.username}
  }).then(function(users){
    if (users) {
      const hash = crypto.createHmac('sha512', users.salt)
                         .update('password')
                         .digest('hex')

      // console.log(`--------------- password ${users.salt}`);
      if (hash == users.password) {
        res.redirect('/users/')
        console.log(`------------------ password true`);
      }
    }else {
      res.send(`Sorry bos, username tidak tersedia`)
    }
  })
})

module.exports = router;
