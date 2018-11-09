'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Shows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tmdbId: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      backdrop_path: {
        type: Sequelize.STRING
      },
      poster_path: {
        type: Sequelize.STRING
      },
      number_of_seasons: {
        type: Sequelize.INTEGER
      },
      vote_average: {
        type: Sequelize.FLOAT
      },
      overview: {
        type: Sequelize.TEXT
      },
      similar: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
        defaultValue: []
      },
      genre_ids: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
        defaultValue: []
      },
      tmdbBlob: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('Shows');
  }
};
