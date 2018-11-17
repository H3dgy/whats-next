const request = require('supertest');
const app = require('../server');
const db = require('../models');
const trackingSeeder = require('../testSeeding/trackingSeeders');

/**
 * Test: Check if the interaction is correct and tracking is being called when necessary
 * Test: Check if the right item gets the review/ status and or rating
 * Test: Check the output
 * Test: Check for incorrect input
 */

describe('testing the tracking Controller: create status', () => {
  beforeEach(async () => {
   await trackingSeeder.upShows(db.sequelize.queryInterface);
   await trackingSeeder.upUsers(db.sequelize.queryInterface);
  })
  afterEach(async () => {
   await trackingSeeder.downTracking(db.sequelize.queryInterface);
   await trackingSeeder.downShows(db.sequelize.queryInterface);
   await trackingSeeder.downUsers(db.sequelize.queryInterface);
  })
  it('respond with the movie object which includes the tracking', async () => {
    const response = await request(app)
      .post('/user/100/status')
      .send({
        status: 'seen',
        userId: 1
      })
      .set('Content-Type', 'application/json');
    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject({
      name: "I Am Not an Animal",
      tracking: {rating: null, review: null, status: 'seen'}
    });
  });
  it('respond with status 400 if given incorrect userId', async () => {
    const response = await request(app)
      .post('/user/100/status')
      .send({
        status: 'test',
        userId: 200
      })
      .set('Content-Type', 'application/json');
    expect(response.status).toEqual(400);
  });
  it('respond with status 400 if given incorrect movieId', async () => {
    const response = await request(app)
      .post('/user/20003030303/status')
      .send({
        status: 'test',
        userId: 1
      })
    expect(response.status).toEqual(400);
  });
  it('respond with status 400 if given incorrect status', async () => {
    const response = await request(app)
      .post('/user/100/status')
      .send({
        status: 'test',
        userId: 1
      })
    expect(response.status).toEqual(400);
  });
});

/**
 * Test: Check if the interaction is correct and tracking is being called when necessary
 * Test: Check if the right item gets the review/ status and or rating
 * Test: Check the output
 * Test: Check for incorrect input
 */

describe('testing the tracking Controller: create review', () => {
  beforeEach(async () => {
   await trackingSeeder.upShows(db.sequelize.queryInterface);
   await trackingSeeder.upUsers(db.sequelize.queryInterface);
  })
  afterEach(async () => {
   await trackingSeeder.downTracking(db.sequelize.queryInterface);
   await trackingSeeder.downShows(db.sequelize.queryInterface);
   await trackingSeeder.downUsers(db.sequelize.queryInterface);
  })
  it('respond with the movie object which includes the tracking', async () => {
    const response = await request(app)
      .post('/user/100/review')
      .send({
        review: 'Great',
        userId: 1
      })
      .set('Content-Type', 'application/json');
    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject({
      name: "I Am Not an Animal",
      tracking: {rating: null, review: 'Great', status: 'none'}
    });
  });
  it('respond with status 400 if given incorrect userId', async () => {
    const response = await request(app)
      .post('/user/100/review')
      .send({
        status: 'test',
        userId: 200
      })
      .set('Content-Type', 'application/json');
    expect(response.status).toEqual(400);
  });
  it('respond with status 400 if given incorrect movieId', async () => {
    const response = await request(app)
      .post('/user/20003030303/review')
      .send({
        review: 'Great',
        userId: 1
      })
    expect(response.status).toEqual(400);
  });
});


describe('testing the tracking Controller: create rating', () => {
  beforeEach(async () => {
   await trackingSeeder.upShows(db.sequelize.queryInterface);
   await trackingSeeder.upUsers(db.sequelize.queryInterface);
  })
  afterEach(async () => {
   await trackingSeeder.downTracking(db.sequelize.queryInterface);
   await trackingSeeder.downShows(db.sequelize.queryInterface);
   await trackingSeeder.downUsers(db.sequelize.queryInterface);
  })
  it('respond with the movie object which includes the tracking', async () => {
    await request(app)
    .post('/user/100/rate')
    .send({
      review: 'Great',
      userId: 1
    })
    .set('Content-Type', 'application/json');
    
    const response = await request(app)
      .post('/user/100/rate')
      .send({
        rating: 5,
        userId: 1
      })
    .set('Content-Type', 'application/json');
    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject({
      name: "I Am Not an Animal",
      tracking: {rating: 5, review: null, status: 'none'}
    });
  });
  it('respond with status 400 if given incorrect userId', async () => {
    const response = await request(app)
      .post('/user/100/rate')
      .send({
        rating: 10,
        userId: 200
      })
      .set('Content-Type', 'application/json');
    expect(response.status).toEqual(400);
  });
  it('respond with status 400 if given incorrect movieId', async () => {
    const response = await request(app)
      .post('/user/20003030303/rate')
      .send({
        rating: 10,
        userId: 1
      })
    expect(response.status).toEqual(400);
  });
  it('respond with status 400 if rating is NaN', async () => {
    const response = await request(app)
      .post('/user/20003030303/rate')
      .send({
        rating: 'seven',
        userId: 1
      })
    expect(response.status).toEqual(400);
  });
  it('respond with status 400 if rating is undefined', async () => {
    const response = await request(app)
      .post('/user/20003030303/rate')
      .send({
        rating: 10,
        userId: 1
      })
    expect(response.status).toEqual(400);
  });
  it('respond with status 400 if rating is out of bounds', async () => {
    const response = await request(app)
      .post('/user/20003030303/rate')
      .send({
        rating: 100,
        userId: 1
      })
    expect(response.status).toEqual(400);
  });
});