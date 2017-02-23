'use strict';

const crypto = require('crypto');


module.exports = function(sequelize, DataTypes) {
  var Login = sequelize.define('Login', {
    email: DataTypes.STRING,
    hashpwd: DataTypes.STRING,
    salt: DataTypes.STRING,
    username: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },

    hooks: {
      beforeCreate: function(pwd, option) {
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var secret = '';
        for( var i=0; i < 5; i++ ){
            secret += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }

        const hashpassword = crypto.createHmac('sha512', secret)
                           .update(secret)
                           .digest('hex');

        pwd.hashpwd = hashpassword
        pwd.salt = secret

        // console.log(secret);
        // console.log(hashpassword);


      }
    }
  });
  return Login;
};
