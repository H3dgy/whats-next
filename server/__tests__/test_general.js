const request = require('supertest');
const app = require('../server');
const db = require('../models');
const trackingSeeder = require('../testSeeding/trackingSeeders');
const trackingController = require('../controllers/trackingController');
const helpersShows = require('../controllers/helpersShows');
const showSeeder = require('../testSeeding/showSeeders');
const mock = require('../mock_tests/mock');

/**
 * In order to test the creation of the user the database needs to be reset
 */

describe('testing the user controller: creating user', () => {
  beforeAll(async () => {
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  });
  afterEach(async () => {
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  });
  afterAll(async () => {
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  });
  it('respond with the user object', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'test1',
        password: 'password01',
        email: 'test1@hotmail.com',
        avatar: 'test'
      })
      .set('Content-Type', 'application/json');
    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject({
      name: 'test1',
      password: 'password01',
      email: 'test1@hotmail.com',
      avatar: 'test'
    });
  });
  it('Empty body should return 400', done => {
    return request(app)
      .post('/user')
      .send({})
      .set('Content-Type', 'application/json')
      .expect(400, done);
  });
  it('Empty name should return 400', done => {
    return request(app)
      .post('/user')
      .send({
        name: '',
        password: 'password01',
        email: 'test3@hotmail.com',
        avatar: 'test'
      })
      .set('Content-Type', 'application/json')
      .expect(400, done);
  });

  it('Empty password should return 400', done => {
    return request(app)
      .post('/user')
      .send({
        name: 'test5',
        password: '',
        email: 'test5@hotmail.com',
        avatar: 'test'
      })
      .set('Content-Type', 'application/json')
      .expect(400, done);
  });
  it('Empty email should return 400', done => {
    return request(app)
      .post('/user')
      .send({
        name: 'test6',
        password: 'password01',
        email: '',
        avatar: 'test'
      })
      .set('Content-Type', 'application/json')
      .expect(400, done);
  });
  it('Wrong email format should return 400', done => {
    return request(app)
      .post('/user')
      .send({
        name: 'test7',
        password: 'password01',
        email: 'testtest',
        avatar: 'test'
      })
      .set('Content-Type', 'application/json')
      .expect(400, done);
  });

  it('Empty profile picture should return 201 with standard picture', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'test9',
        password: 'password01',
        email: 'test9@hotmail.com',
        avatar: ''
      })
      .set('Content-Type', 'application/json');
    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject({
      name: 'test9',
      password: 'password01',
      email: 'test9@hotmail.com',
      avatar:
        'https://res.cloudinary.com/diek0ztdy/image/upload/v1541756897/samples/sheep.jpg'
    });
  });
});

describe('test the user controller: create user duplicate entries', () => {
  beforeAll(async () => {
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  });
  afterAll(async () => {
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  });

  beforeEach(async () => {
    await trackingSeeder.upUsers(db.sequelize.queryInterface);
  });

  afterEach(async () => {
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  });

  it('Duplicate email format should return 400', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'test8',
        password: 'password01',
        email: 'alice@example.com',
        avatar: 'test'
      })
      .set('Content-Type', 'application/json');
      expect(response.status).toEqual(400);
  });

  it('Duplicate username should return 400', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'Alice',
        password: 'password01',
        email: 'test4@hotmail.com',
        avatar: 'test'
      })
      .set('Content-Type', 'application/json');
      expect(response.status).toEqual(400);
  });
});

/**
 * Assumes tests on create user have been run, therefor there should be users in the db
 */

describe('testing the user controller: get user', () => {
  beforeAll(async () => {
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  });
  afterAll(async () => {
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  });

  beforeEach(async () => {
    await trackingSeeder.upUsers(db.sequelize.queryInterface);
  });

  afterEach(async () => {
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  });
  it('should return user with id 1', async () => {
    const response = await request(app).get('/user/1');
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      name: 'Alice',
      password: 'password01',
      email: 'alice@example.com',
      avatar: 'test'
    });
  });
  it('Out of bounds id should return 400', async () => {
    const response = await request(app).get('/user/1000');
    expect(response.status).toEqual(400);
  });
  it('No id should return 400', async () => {
    const response = await request(app).get('/user/test');
    expect(response.status).toEqual(400);
  });
});

/**
 * Test: Check if the interaction is correct and tracking is being called when necessary
 * Test: Check if the right item gets the review/ status and or rating
 * Test: Check the output
 * Test: Check for incorrect input
 */

describe('testing the tracking Controller: create status', () => {
  beforeAll(async () => {
    await trackingSeeder.downTracking(db.sequelize.queryInterface);
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
    await trackingSeeder.downShows(db.sequelize.queryInterface);
  });

  beforeEach( async () => {
    await trackingSeeder.upShows(db.sequelize.queryInterface);
    await trackingSeeder.upUsers(db.sequelize.queryInterface);
  })

  afterEach( async () => {
    await trackingSeeder.downTracking(db.sequelize.queryInterface);
    await trackingSeeder.downShows(db.sequelize.queryInterface);
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  })

  afterAll(async () => {
    await trackingSeeder.downTracking(db.sequelize.queryInterface);
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
    await trackingSeeder.downShows(db.sequelize.queryInterface);
  });

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
  beforeAll(async () => {
    await trackingSeeder.downTracking(db.sequelize.queryInterface);
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
    await trackingSeeder.downShows(db.sequelize.queryInterface);
  });

  beforeEach( async () => {
    await trackingSeeder.upShows(db.sequelize.queryInterface);
    await trackingSeeder.upUsers(db.sequelize.queryInterface);
  })

  afterEach( async () => {
    await trackingSeeder.downTracking(db.sequelize.queryInterface);
    await trackingSeeder.downShows(db.sequelize.queryInterface);
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  })

  afterAll(async () => {
    await trackingSeeder.downTracking(db.sequelize.queryInterface);
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
    await trackingSeeder.downShows(db.sequelize.queryInterface);
  });

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

/**
 * Test: Check if the interaction is correct and tracking is being called when necessary
 * Test: Check if the right item gets the review/ status and or rating
 * Test: Check the output
 * Test: Check for incorrect input
 */

describe('testing the tracking Controller: create rating', () => {
  beforeAll(async () => {
    await trackingSeeder.downTracking(db.sequelize.queryInterface);
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
    await trackingSeeder.downShows(db.sequelize.queryInterface);
  });

  beforeEach( async () => {
    await trackingSeeder.upShows(db.sequelize.queryInterface);
    await trackingSeeder.upUsers(db.sequelize.queryInterface);
  })

  afterEach( async () => {
    await trackingSeeder.downTracking(db.sequelize.queryInterface);
    await trackingSeeder.downShows(db.sequelize.queryInterface);
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  })

  afterAll(async () => {
    await trackingSeeder.downTracking(db.sequelize.queryInterface);
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
    await trackingSeeder.downShows(db.sequelize.queryInterface);
  });

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

/**
 * Test: helpers
 */

describe('testing the tracking Controller: create status', () => {
  beforeAll (async () => {
    await trackingSeeder.downShows(db.sequelize.queryInterface);
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  })
  beforeEach(async () => {
   await trackingSeeder.upShows(db.sequelize.queryInterface);
   await trackingSeeder.upUsers(db.sequelize.queryInterface);
  })
  afterEach(async () => {
   await trackingSeeder.downShows(db.sequelize.queryInterface);
   await trackingSeeder.downUsers(db.sequelize.queryInterface);
  })
  it('should response with an object with all movies unwrapped', async () => {
    const res = await trackingController._unwrapSimilar(100,1);
    expect(res).toMatchObject({
      similar: [{id: 125}, {id: 135}]
    });
  });
});

/**
 * Test: the show helper function
 */


describe('testing the helper shows: getShowForUser', () => {

  beforeAll(async () => {
    await trackingSeeder.downShows(db.sequelize.queryInterface);
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  });
  beforeEach(async () => {
    await trackingSeeder.upShows(db.sequelize.queryInterface);
    await trackingSeeder.upUsers(db.sequelize.queryInterface);
  });
  afterEach(async () => {
    await trackingSeeder.downShows(db.sequelize.queryInterface);
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  });
  afterAll(async () => {
    await trackingSeeder.downShows(db.sequelize.queryInterface);
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  });

  it('gets show when provided correct inputs', async () => {
    const response = await helpersShows.getShowForUser(100,1);
    expect(response.dataValues).toMatchObject(mock.getShowForUserCorrect)
  });

  it('throw error when given incorrect inputs - 1', async () => {
    let message = false;
    try {
      await await helpersShows.getShowForUser(100,'test')
    }
    catch (err) {
      message = err.message;
    }
    expect(message).toBeTruthy();
  });

  it('throw error when given incorrect inputs - 2', async () => {
    let message = false;
    try {
      await helpersShows.getShowForUser('test',1)
    }
    catch (err) {
      message = err.message;
    }
    expect(message).toBeTruthy();
  });
});

describe('testing the helper shows: createOrUpdateShow', () => {

  beforeAll(async () => {
    await trackingSeeder.downShows(db.sequelize.queryInterface);
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  });
  beforeEach(async () => {
    await trackingSeeder.upShows(db.sequelize.queryInterface);
    await trackingSeeder.upUsers(db.sequelize.queryInterface);
  });
  afterEach(async () => {
    await trackingSeeder.downShows(db.sequelize.queryInterface);
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  });
  afterAll(async () => {
    await trackingSeeder.downShows(db.sequelize.queryInterface);
    await trackingSeeder.downUsers(db.sequelize.queryInterface);
  });

  it('gets show when provided correct and complete inputs - third condition', async () => {
    const response = await helpersShows.createOrUpdateShow(100,mock.findShowByIdComplete);
    expect(response).toMatchObject(mock.findShowByIdComplete());
  });
  it('gets show when provided incomplete show - second condition', async () => {
    const response = await helpersShows.createOrUpdateShow(100,
    mock.findShowByIdIncomplete,mock.fetchCallback(100));
    expect(response).toMatchObject({similar:[125,135],recommendations:[145,155]});
  });
  it('gets show when provided show not on database - first condition', async () => {
    const response = await helpersShows.createOrUpdateShow(2000,
    undefined,mock.fetchCallback(2000));
    expect(response).toMatchObject({id:2000,name:'Test show 2000', similar:[125,135]});
  });
  it('gets show when provided correct and complete inputs - third condition', async () => {
    const response = await helpersShows.createOrUpdateShow(1,mock.findShowByIdComplete);
    expect(response).toMatchObject(mock.findShowByIdComplete());
  });
});
