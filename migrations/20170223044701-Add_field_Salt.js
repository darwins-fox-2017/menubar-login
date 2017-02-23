'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("Users","salt",{type:Sequelize.STRING})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Users","salt",{type:Sequelize.STRING})
  }
};
