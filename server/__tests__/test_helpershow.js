const request = require('supertest');
const helpersShows = require('../controllers/helpersShows');
const db = require('../models');
const showSeeder = require('../testSeeding/showSeeders');
const userSeeder = require('../testSeeding/userSeeders');
const mock = require('../mock_tests/mock');

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
    expect(response.dataValues).toMatchObject(mock.getShowForUserCorrect)
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
  it('throw error when given incorrect inputs - 2', async () => {
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
  it('gets show when provided correct and complete inputs - third condition', async () => {
    const response = await helpersShows.createOrUpdateShow(1,mock.findShowByIdComplete);
    expect(response).toMatchObject(mock.findShowByIdComplete());
  });
  it('gets show when provided incomplete show - second condition', async () => {
    const response = await helpersShows.createOrUpdateShow(2,
    mock.findShowByIdIncomplete,mock.fetchCallback(2));
    expect(response).toMatchObject({similar:[4,8],recommendations:[6,12]});
  });
  it('gets show when provided show not on database - first condition', async () => {
    const response = await helpersShows.createOrUpdateShow(3,
    undefined,mock.fetchCallback(3));
    expect(response).toMatchObject({id:3,name:'Test show 3', similar:[6,12]});
  });
  it('gets show when provided correct and complete inputs - third condition', async () => {
    const response = await helpersShows.createOrUpdateShow(1,mock.findShowByIdComplete);
    expect(response).toMatchObject(mock.findShowByIdComplete());
  });
});

