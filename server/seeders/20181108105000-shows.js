'use strict';
const data = require('../data.json');

module.exports = {
  up: async queryInterface => {
    const shows = data.recommendations.map(show => ({
      tmdbId: show.id,
      name: show.name,
      backdrop_path: show.backdrop_path,
      number_of_seasons: show.number_of_seasons,
      vote_average: show.vote_average,
      overview: show.overview,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    return queryInterface.bulkInsert('Shows', shows);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Shows', null, {});
  }
};
