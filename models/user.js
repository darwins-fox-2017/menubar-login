'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail:true,
        isUnique:function(value, next){
          User.find({
            where:{
              email:value
            },attributes:["id"]
          }).done(function(user){
            if (user) {
              return next(`Email address already in use`)
            }
            next()
          })
        }
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
