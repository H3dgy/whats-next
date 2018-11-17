const request = require('supertest');
const helpersShows = require('../controllers/helpersShows');
const db = require('../models');
const showSeeder = require('../testSeeding/showSeeders');
const userSeeder = require('../testSeeding/userSeeders');

describe('testing the helper shows: getShowForUser', () => {
  beforeAll(async () => {
    await showSeeder.down(db.sequelize.queryInterface);
    await userSeeder.down(db.sequelize.queryInterface);
  });
  beforeEach(async () => {
    await showSeeder.up(db.sequelize.queryInterface);
    await userSeeder.up(db.sequelize.queryInterface);
  });
  afterEach(async () => {
    await showSeeder.down(db.sequelize.queryInterface);
    await userSeeder.down(db.sequelize.queryInterface);
  });
  afterAll(async () => {
    await showSeeder.down(db.sequelize.queryInterface);
  });
  it('gets show when provided correct inputs', async () => {
    const response = await helpersShows.getShowForUser(1,2);
    expect(response.dataValues).toMatchObject({
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
    })
  });
  it('throw error when given incorrect inputs - 1', async () => {
    let message = false;
    try {
      await await helpersShows.getShowForUser(1,'test')
    }
    catch (err) {
      message = err.message;
    }
    expect(message).toBeTruthy();
  });
  it('throw error when given incorrect inputs - 1', async () => {
    let message = false;
    try {
      await await helpersShows.getShowForUser('test',1)
    }
    catch (err) {
      message = err.message;
    }
    expect(message).toBeTruthy();
  });
});

describe('testing the helper shows: createOrUpdateShow', () => {
  beforeAll(async () => {
    await showSeeder.down(db.sequelize.queryInterface);
    await userSeeder.down(db.sequelize.queryInterface);
  });
  beforeEach(async () => {
    await showSeeder.up(db.sequelize.queryInterface);
    await userSeeder.up(db.sequelize.queryInterface);
  });
  afterEach(async () => {
    await showSeeder.down(db.sequelize.queryInterface);
    await userSeeder.down(db.sequelize.queryInterface);
  });
  afterAll(async () => {
    await showSeeder.down(db.sequelize.queryInterface);
  });
  it('gets show when provided correct and complete inputs', async () => {
    findShowByIdLocal = () => {
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
      }
    }
    const response = await helpersShows.createOrUpdateShow(1,findShowByIdLocal);
    expect(response).toMatchObject(findShowByIdLocal());
  });
  it('gets show when provided correct and incomplete', async () => {
    findShowByIdLocal = () => {
      return {
        id: 1,
        name: 'Test showaaaaaa',
        backdrop_path: 'backdrop_test',
        poster_path: 'poster_test',
        number_of_seasons: 5,
        vote_average: 8,
        overview: 'Great show',
        genre_ids: [],
        similar: [],
        recommendations: [],
      }
    }
    const response = await helpersShows.createOrUpdateShow(2,findShowByIdLocal);
    expect(response).toMatchObject(findShowByIdLocal());
  });
});





