var express = require('express');
var router = express.Router();
var help = require('../helper/help')
var model = require('../models')
var Salt = require('shortid')
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/register/new', function(req, res, next) {
    res.render('user/register')
});

router.post('/insert', function(req, res, next) {
    let salt = Salt.generate();
    let hasedPswd = help.hasedPswd(req.body.password, salt);
    model.User.create({
            username: req.body.username,
            email: req.body.email,
            password: hasedPswd,
            role: req.body.role,
            salt: salt
        })
        .then(function() {
            res.redirect('/')
        });
});


router.post('/login', function(req, res, next) {
    model.User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(function(user) {
            if (user != null) {
                if (help.isAuthenticated(user, req.body.password)) {
                    req.session.username = user.username;
                    req.session.password = user.password;
                    req.session.email = user.email;
                    req.session.role = user.role;
                    req.session.id = user.id;
                    req.session.salt = user.salt;
                    req.session.menu = help.rolemenu(req.session.role);
                    //console.log(user);
                    console.log('masuk');
                    next();

                } else {
                    res.redirect('/users')
                }
            } else {
                res.redirect('/users')
            }
        }).catch(function(err) {
            next(err)
        })
}, function(req, res, next) {
    res.redirect('/users/dasboard');
});


router.get('/dasboard', function(req, res, next) {
    if (req.session.username) {
        //console.log('masuk dasboard');
        next();
    } else {
        res.redirect('/users')
    }
}, function(req, res, next) {
    res.render('user/dasboard', {
        menu: req.session.menu,
        username: req.session.username
    })
})


router.get('/manageuser', function(req, res, next) {
    if (req.session.role == 'admin') {
        next()
    } else if (req.session.role == 'user') {
        res.redirect('/users/dasboard')
    } else {
        res.redirect('/users')
    }
}, function(req, res, next) {
    model.User.findAll()
        .then(function(user) {
            res.render('user/manageuser', {
                dataUsers: user,
                menu: req.session.menu,
                username: req.session.username
            })
        })
})

router.get('/delete/:id', function(req, res, next) {
    if (req.session.role == 'admin') {
        next()
    } else if (req.session.role == 'user') {
        res.redirect('/users/dasboard')
    } else {
        res.redirect('/users')
    }
}, function(req, res, next) {
    model.User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function() {
            res.redirect('/users/manageuser')
        })
})

router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/users')
        }
    })
})

router.get('/edit', function(req, res, next) {
    if (req.session.role == 'user') {
        next()
    } else if (req.session.role == 'admin') {
        res.redirect('/users/dasboard')
    } else {
        res.redirect('/users')
    }
}, function(req, res, next) {
    model.User.findOne({
            where: {
                username: req.session.username
            }
        })
        .then(function(user) {
            res.render('user/edit', {
                dataUsers: user,
                menu: req.session.menu,
                username: req.session.username
            })
        })
})


router.post('/insertedit', function(req, res, next) {
    if (req.session.role == 'user') {
        next()
    } else if (req.session.role == 'admin') {
        res.redirect('/users/dasboard')
    } else {
        res.redirect('/users')
    }
}, function(req, res, next) {
  let newpassword;
  let salt;
  if (req.body.password) {
     salt=Salt.generate();
    newpassword = help.hasedPswd(req.body.password, salt);
  }else {
    console.log(req.session.salt);
    salt=req.session.salt;
    newpassword = req.session.password;
    console.log(newpassword);
  }
    model.User.update({
            username: req.body.username,
            email: req.body.email,
            role: req.body.role,
            password: newpassword,
            salt:salt
        }, {
            where: {
                username: req.session.username
            }
        })
        .then(function() {
            res.redirect('/users/dasboard')
        }).catch(function(err){console.log(err);})
})


module.exports = router;
