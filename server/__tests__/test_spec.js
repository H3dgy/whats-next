const request = require('supertest');
const app = require('../server');
const db = require('../models/index');
const userSeeder = require('../testSeeding/userSeeders');

/**
 * In order to test the creation of the user the database needs to be reset
 */
describe('testing the user controller: creating user', () => {
  beforeEach(async () => {
    await userSeeder.down(db.sequelize.queryInterface);
    // db.sequelize.queryInterface.bulkDelete('Users', null, {});
  });
  afterAll(async () => {
    await userSeeder.down(db.sequelize.queryInterface);
    // db.sequelize.queryInterface.bulkDelete('Users', null, {});
  });

  xit('respond with the user object', async () => {
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
  xit('Empty body should return 400', done => {
    return request(app)
      .post('/user')
      .send({})
      .set('Content-Type', 'application/json')
      .expect(400, done);
  });
  xit('Empty name should return 400', done => {
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

  xit('Empty password should return 400', done => {
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
  xit('Empty email should return 400', done => {
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
  xit('Wrong email format should return 400', done => {
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

  xit('Empty profile picture should return 201 with standard picture', async () => {
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
  beforeEach(async () => {
    await db.sequelize.queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        password: 'password01',
        avatar: 'test',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  });

  afterEach(async () => {
    db.sequelize.queryInterface.bulkDelete('Users', null, {});
  });

  xit('Duplicate email format should return 400', async () => {
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

  xit('Duplicate username should return 400', async () => {
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
  beforeEach(async () => {
    await userSeeder.up(db.sequelize.queryInterface);

    // await db.sequelize.queryInterface.bulkInsert('Users', [
    //   {
    //     id: 1,
    //     name: 'Alice',
    //     email: 'alice@example.com',
    //     password: 'password01',
    //     avatar: 'test',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    // ]);
  });

  afterEach(async () => {
    await userSeeder.down(db.sequelize.queryInterface);
    //db.sequelize.queryInterface.bulkDelete('Users', null, {});
  });

  xit('should return user with id 1', async () => {
    const response = await request(app).get('/user/1');
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      name: 'Alice',
      password: 'password01',
      email: 'alice@example.com',
      avatar: 'test'
    });
  });

  xit('Out of bounds id should return 400', async () => {
    const response = await request(app).get('/user/1000');
    expect(response.status).toEqual(400);
  });

  xit('No id should return 400', async () => {
    const response = await request(app).get('/user/test');
    expect(response.status).toEqual(400);
  });

});
