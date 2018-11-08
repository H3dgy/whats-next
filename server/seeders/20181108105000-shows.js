'use strict';
const data = require('../data.json');

module.exports = {
  up: async queryInterface => {
    const shows = data.recommendations.map(show => ({
      tmbdId: show.id,
      name: show.name,
      backdrop_path: show.backdrop_path,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('Shows', shows);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Shows', null, {});
  }
};
