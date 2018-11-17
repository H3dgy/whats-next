const request = require('supertest');
const app = require('../server');
const db = require('../models/index');
const showSeeder = require('../testSeeding/showSeeders');
const userSeeder = require('../testSeeding/userSeeders');

describe('testing the show controller: search', () => {
  beforeEach(async () => {
    await showSeeder.down(db.sequelize.queryInterface);
    // db.sequelize.queryInterface.bulkDelete('Users', null, {});
  });
  afterAll(async () => {
    await showSeeder.down(db.sequelize.queryInterface);
    // db.sequelize.queryInterface.bulkDelete('Users', null, {});
  });
  it('recommended - to be implementeded', async () => {
    return await request(app)
      .post('/shows/search')
      .send({
        term: 'peep show'
      })
      .set('Content-Type', 'application/json')
      .expect(
        200,
        [{ id: 815,
          name: 'Peep Show'},
          {
          id: 12063,
          name: 'Peep Show'
        }]
      );
  });
  it('should be case insensitive', done => {
    return request(app)
      .post('/shows/search')
      .send({
        term: 'peEp sHow'
      })
      .set('Content-Type', 'application/json')
      .expect(
        200,
        [{ id: 815,
          name: 'Peep Show'},
          {
          id: 12063,
          name: 'Peep Show'
        }],
        done
      );
  });
  it('should return 400 for empty requests', done => {
    return request(app)
      .post('/shows/search')
      .send({
        term: ''
      })
      .set('Content-Type', 'application/json')
      .expect(
        400,
        done
      );
  });
  it('should only return the first 20 results', async () => {
    const response = await request(app)
      .post('/shows/search')
      .send({
        term: 'a'
      })
      .set('Content-Type', 'application/json')
      expect(response.body).toHaveLength(20)

  });

});

describe('testing the show controller: id', () => {
  beforeEach(async () => {
    await showSeeder.up(db.sequelize.queryInterface);
    await userSeeder.up(db.sequelize.queryInterface);
  });
  afterEach(async () => {
    await userSeeder.down(db.sequelize.queryInterface);
    await showSeeder.down(db.sequelize.queryInterface);
  });
  afterAll(async () => {
    await showSeeder.down(db.sequelize.queryInterface);
  });
  it('responds with json containing recommended tv shows when given show name', async () => {
    const response = await request(app)
      .get('/shows/815')
      .set('Content-Type', 'application/json')
      .set('userId',1)
      .expect(200);
    expect(response.body.id.toString()).toMatch('815')
    const listOfRecommendedIds = response.body.recommendations.map(obj => obj.id).every( number => number > 0);
    expect(listOfRecommendedIds).toEqual(true);
  });
  it('responds with json containing recommended tv shows when given show name -2 ', async () => {
    const response = await request(app)
      .get('/shows/815')
      .set('Content-Type', 'application/json')
      .set('userId',1)
      .expect(200);
    expect(response.body.id.toString()).toMatch('815')
    const listOfRecommendedIds = response.body.recommendations.map(obj => obj.id).every( number => number > 0);
    expect(listOfRecommendedIds).toEqual(true);
  });
  it('responds with 400 when given incorrect type show id', async () => {
    return request(app)
      .get('/shows/test')
      .set('Content-Type', 'application/json')
      .set('userId',1)
      .expect(400);
  });
  it('responds with 400 when given incorrect number show id', async () => {
    return request(app)
      .get('/shows/222222222')
      .set('Content-Type', 'application/json')
      .set('userId',1)
      .expect(400);
  });
  it('responds with 400 when given incorrect input', async () => {
    return request(app)
      .get('/shows/2-2')
      .set('Content-Type', 'application/json')
      .set('userId',1)
      .expect(400);
  });
});



