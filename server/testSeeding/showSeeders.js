module.exports = {
  down: queryInterface => queryInterface.bulkDelete('Shows', null, {}),
  up: queryInterface => {
    return queryInterface.bulkInsert('Shows', [
      {
        id: 1,
        name: 'Test show',
        backdrop_path: 'backdrop_test',
        poster_path: 'poster_test',
        number_of_seasons: 5,
        vote_average: 8,
        overview: 'Great show',
        genre_ids: [1,2,3],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Test show 2',
        backdrop_path: 'backdrop_test 2',
        poster_path: 'poster_test 2',
        number_of_seasons: 6,
        vote_average: 9,
        overview: 'Great show 2',
        genre_ids: [1,2,3,4],
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ])
  }
};