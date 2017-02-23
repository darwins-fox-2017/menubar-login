var express = require('express');
var router = express.Router();

let db = require('../models')

const crypto = require('crypto');
const shortid = require('shortid');



/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');
});

router.post('/create', function(req, res, next){
  console.log(req.body);
  const secret = shortid.generate();
  const hash = crypto.createHmac('sha256', secret)
                     .update(req.body.password)
                     .digest('hex');
   db.User.create({
     username: req.body.username,
     email: req.body.email,
     password: hash,
     salt: secret,
     role: 'client'
   }).then(() => {
     res.redirect('/dashboard')
   })
})

router.post('/login', function(req, res, next){
  db.User.find({
    where: {
      email: req.body.email
    }
  }).then((user) => {
    const hash = crypto.createHmac('sha256', user.salt)
                       .update(req.body.password)
                       .digest('hex');
    if (user.password == hash) {
      console.log('Authentication success');
      res.redirect('/dashboard')
    } else{
      console.log('Authentication fail');
      res.redirect('/login')

    }
  })
})

module.exports = router;
