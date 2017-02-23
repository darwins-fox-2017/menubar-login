'use strict';
const crypto = require('crypto')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: {type: DataTypes.STRING,
            validate: {
              isEmail: true,
              isUnique: function(value, next) {
                  User.find({
                    where: {email: value},
                    attributes: ['id']
                  }).then(function(user, error) {
                    if(error) return next(error)

                    if(user) return next('Email address already in use')

                    next()
                  })
            }
          }
    },
    password: DataTypes.STRING,
    key: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks: {
      beforeCreate: function(user, options) {
        let key = Math.floor(Math.random()*10000)
        user.key = key.toString()

        let hmac = crypto.createHmac('sha512', user.key)
        hmac.update(user.password)
        user.password = hmac.digest('hex')
      }
    }
  });
  return User;
};
