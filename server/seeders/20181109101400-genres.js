'use strict';
const genresList = require('../data.json').genres;

module.exports = {
  up: async queryInterface => {
    const genres = genresList.map(genre => ({
      id: genre.id,
      name: genre.name
    }));
    return queryInterface.bulkInsert('Genres', genres);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
