'use strict';
const data = require('../data.json');

module.exports = {
  up: async queryInterface => {
    const shows = data.recommendations.map(show => ({
      id: show.id,
      name: show.name,
      backdrop_path: show.backdrop_path,
      poster_path: show.poster_path,
      number_of_seasons: show.number_of_seasons,
      vote_average: show.vote_average,
      overview: show.overview,
      genre_ids: show.genre_ids,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    return queryInterface.bulkInsert('Shows', shows);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Shows', null, {});
  }
};
