const request = require('supertest');
const app = require('../server');

/**
 * In order to test the creation of the user the database needs to be reset
 */
describe('testing the user controller: creating user', () => {
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
  it('Duplicate username should return 400', done => {
    return request(app)
      .post('/user')
      .send({
        name: 'test1',
        password: 'password01',
        email: 'test4@hotmail.com',
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
  it('Duplicate email format should return 400', done => {
    return request(app)
      .post('/user')
      .send({
        name: 'test8',
        password: 'password01',
        email: 'test1@hotmail.com',
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

/**
 * Assumes tests on create user have been run, therefor there should be users in the db
 */
describe('testing the user controller: get user', () => {
  it('should return user with id 1', async () => {
    const response = await request(app)
      .get('/user/1')
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      name: 'test1',
      password: 'password01',
      email: 'test1@hotmail.com',
      avatar: 'test'
    })
  });
  it('Out of bounds id should return 400', async () => {
    const response = await request(app)
      .get('/user/1000')
    console.log(response.body);
    expect(response.status).toEqual(400);
  });
  it('No id should return 400', async () => {
    const response = await request(app)
      .get('/user/test')
    expect(response.status).toEqual(400);
  });
});
