'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UsersShows', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      ShowId: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      rating: {
        type: Sequelize.INTEGER
      },
      seen: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('UsersShows');
  }
};
