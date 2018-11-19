const mock = {};

mock.getShowForUserCorrect = {
  id: 1,
  name: 'Test show',
  backdrop_path: 'backdrop_test',
  poster_path: 'poster_test',
  number_of_seasons: 5,
  vote_average: 8,
  overview: 'Great show',
  similar: [],
  recommendations: [],
  genre_ids: [ 1, 2, 3 ],
  tracking: null
};

mock.findShowByIdComplete = () => {
  return {
    id: 1,
    name: 'Test show',
    backdrop_path: 'backdrop_test',
    poster_path: 'poster_test',
    number_of_seasons: 5,
    vote_average: 8,
    overview: 'Great show',
    genre_ids: [1,2,3],
    similar: [1,2,3,4],
    recommendations: [4,3,2,1],
  };
};

mock.findShowByIdIncomplete = () => {
  return {
    id: 2,
    name: 'Test show 2',
    backdrop_path: 'backdrop_test 2',
    poster_path: 'poster_test 2',
    number_of_seasons: 6,
    vote_average: 9,
    overview: 'Great show 1234',
    similar: [],
    recommendations: [],
    genre_ids: [1,2,3,4],
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

mock.fetchCallback = (id) => {
  return (idTest) => {
    if (idTest === id) {
      return {
        id: id,
        name: 'Test show ' + id,
        backdrop_path: 'backdrop_test ' + id,
        poster_path: 'poster_test ' + id,
        number_of_seasons: id,
        vote_average: 8,
        overview: 'Great show ' + id,
        genre_ids: [1,2,3,4,5],
        createdAt: new Date(),
        updatedAt: new Date(),
        similar: {results:[{id:2*id},{id:4*id}]},
        recommendations: {results:[{id:3*id},{id:6*id}]}
      }
    }
  }
}

module.exports = mock;